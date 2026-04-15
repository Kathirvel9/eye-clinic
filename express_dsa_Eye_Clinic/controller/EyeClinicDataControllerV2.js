const sequelize = require("../config/sequelize");
const ClinicalExaminationModel = require("../models/ClinicalExamination");
const ClinicalPrescriptionDetails = require("../models/ClinicalPrescriptionDetails");
const NewOpReg = require("../models/NewOpReg");

const ClinicalExamination = ClinicalExaminationModel(sequelize, require("sequelize").DataTypes);

let prescriptionTableReadyPromise = null;

const ensurePrescriptionTable = () => {
  if (!prescriptionTableReadyPromise) {
    prescriptionTableReadyPromise = ClinicalPrescriptionDetails.sync();
  }

  return prescriptionTableReadyPromise;
};

const normalizePrescriptionRow = (row = {}) => ({
  eye: String(row.eye ?? "").trim(),
  medicine: String(row.medicine ?? "").trim(),
  form: String(row.form ?? "").trim(),
  fromDate: row.fromDate ? String(row.fromDate).slice(0, 10) : "",
  toDate: row.toDate ? String(row.toDate).slice(0, 10) : "",
  frequency: String(row.frequency ?? "").trim(),
  duration: String(row.duration ?? "").trim(),
  remarks: String(row.remarks ?? "").trim(),
});

const hasPrescriptionValue = (row = {}) =>
  [
    row.eye,
    row.medicine,
    row.form,
    row.fromDate,
    row.toDate,
    row.frequency,
    row.duration,
    row.remarks,
  ].some((value) => String(value ?? "").trim() !== "");

const getPrescriptionRowsFromPayload = (data = {}) => {
  const rows = Array.isArray(data.prescriptions) ? data.prescriptions : [];
  const normalizedRows = rows.map(normalizePrescriptionRow).filter(hasPrescriptionValue);

  if (normalizedRows.length > 0) {
    return normalizedRows;
  }

  const fallbackRow = normalizePrescriptionRow({
    eye: data.PR_Eye,
    medicine: data.PR_Medicine,
    form: data.PR_Form,
    fromDate: data.PR_FromDate,
    toDate: data.PR_ToDate,
    frequency: data.PR_Frequency,
    duration: data.PR_Duration,
    remarks: data.PR_Remarks,
  });

  return hasPrescriptionValue(fallbackRow) ? [fallbackRow] : [];
};

const applyPrimaryPrescriptionFields = (data = {}, rows = []) => {
  const primaryRow = rows[0] || {};
  data.PR_Eye = primaryRow.eye || "";
  data.PR_Medicine = primaryRow.medicine || "";
  data.PR_Form = primaryRow.form || "";
  data.PR_FromDate = primaryRow.fromDate || null;
  data.PR_ToDate = primaryRow.toDate || null;
  data.PR_Frequency = primaryRow.frequency || "";
  data.PR_Duration = primaryRow.duration || "";
  data.PR_Remarks = primaryRow.remarks || "";
};

const replacePrescriptionRows = async (examId, opRefNo, rows = [], transaction) => {
  await ensurePrescriptionTable();

  await ClinicalPrescriptionDetails.destroy({
    where: { Exam_Id: examId },
    transaction,
  });

  if (!rows.length) return;

  await ClinicalPrescriptionDetails.bulkCreate(
    rows.map((row) => ({
      Exam_Id: examId,
      OPRefNo: String(opRefNo),
      Eye: row.eye,
      Medicine: row.medicine,
      Form: row.form,
      FromDate: row.fromDate || null,
      ToDate: row.toDate || null,
      Frequency: row.frequency,
      Duration: row.duration,
      Remarks: row.remarks,
    })),
    { transaction }
  );
};

const attachPrescriptionRows = async (records) => {
  await ensurePrescriptionTable();

  if (!records.length) return records;

  const examIds = records.map((record) => record.Exam_Id).filter(Boolean);
  if (!examIds.length) return records;

  const rows = await ClinicalPrescriptionDetails.findAll({
    where: { Exam_Id: examIds },
    order: [["PrescriptionRowId", "ASC"]],
  });

  const rowsByExamId = new Map();
  rows.forEach((row) => {
    const list = rowsByExamId.get(row.Exam_Id) || [];
    list.push({
      id: row.PrescriptionRowId,
      eye: row.Eye || "",
      medicine: row.Medicine || "",
      form: row.Form || "",
      fromDate: row.FromDate || "",
      toDate: row.ToDate || "",
      frequency: row.Frequency || "",
      duration: row.Duration || "",
      remarks: row.Remarks || "",
    });
    rowsByExamId.set(row.Exam_Id, list);
  });

  return records.map((record) => ({
    ...record,
    prescriptionRows: rowsByExamId.get(record.Exam_Id) || getPrescriptionRowsFromPayload(record),
  }));
};

exports.createEyeClinicData = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const data = req.body;
    const prescriptionRows = getPrescriptionRowsFromPayload(data);
    applyPrimaryPrescriptionFields(data, prescriptionRows);
    delete data.prescriptions;

    if (data.IM_ActualTime) {
      data.IM_ActualTime = new Date(data.IM_ActualTime).toISOString().slice(0, 19).replace("T", " ");
    }

    if (data.FollowUpTime) {
      data.FollowUpTime = new Date(data.FollowUpTime).toISOString().slice(0, 19).replace("T", " ");
    }

    const result = await ClinicalExamination.create(data, { transaction });
    await replacePrescriptionRows(result.Exam_Id, data.OPRefNo, prescriptionRows, transaction);

    if (data?.OPRefNo) {
      await NewOpReg.update(
        { ToBeSeen: "Y" },
        { where: { OPRefNo: data.OPRefNo }, transaction }
      );
    }

    await transaction.commit();

    res.status(201).json({
      message: "Data inserted successfully",
      data: {
        ...result.toJSON(),
        prescriptionRows,
      },
    });
  } catch (error) {
    await transaction.rollback();
    console.error("CREATE EYE CLINIC DATA ERROR:", error);
    res.status(500).json({ error: "Insert failed" });
  }
};

exports.getAllEyeClinicData = async (_req, res) => {
  try {
    const data = await ClinicalExamination.findAll();
    const rowsWithPrescriptions = await attachPrescriptionRows(
      data.map((record) => record.toJSON())
    );

    res.status(200).json(rowsWithPrescriptions);
  } catch (error) {
    console.error("GET ALL ERROR:", error);
    res.status(500).json({ error: "Fetch failed" });
  }
};

exports.getEyeClinicDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ClinicalExamination.findByPk(id);

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    const [rowWithPrescriptions] = await attachPrescriptionRows([data.toJSON()]);
    res.status(200).json(rowWithPrescriptions);
  } catch (error) {
    console.error("GET BY ID ERROR:", error);
    res.status(500).json({ error: "Fetch failed" });
  }
};

exports.updateEyeClinicData = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const updatedData = req.body;
    const prescriptionRows = getPrescriptionRowsFromPayload(updatedData);
    applyPrimaryPrescriptionFields(updatedData, prescriptionRows);
    delete updatedData.prescriptions;

    const data = await ClinicalExamination.findByPk(id, { transaction });

    if (!data) {
      await transaction.rollback();
      return res.status(404).json({ message: "Data not found" });
    }

    await data.update(updatedData, { transaction });
    await replacePrescriptionRows(data.Exam_Id, data.OPRefNo, prescriptionRows, transaction);

    if (data.OPRefNo) {
      await NewOpReg.update(
        { ToBeSeen: "Y" },
        { where: { OPRefNo: data.OPRefNo }, transaction }
      );
    }

    await transaction.commit();

    res.status(200).json({
      message: "Updated successfully",
      data: {
        ...data.toJSON(),
        prescriptionRows,
      },
    });
  } catch (error) {
    await transaction.rollback();
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ error: "Update failed" });
  }
};

exports.deleteEyeClinicData = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ClinicalExamination.findByPk(id);

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    await ensurePrescriptionTable();
    await ClinicalPrescriptionDetails.destroy({ where: { Exam_Id: data.Exam_Id } });
    await data.destroy();

    res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ error: "Delete failed" });
  }
};

exports.getHistoryByOPRefNo = async (req, res) => {
  try {
    const { opRefNo } = req.params;
    const history = await ClinicalExamination.findAll({
      where: { OPRefNo: opRefNo },
      order: [["CreatedAt", "DESC"]],
    });
    const rowsWithPrescriptions = await attachPrescriptionRows(
      history.map((record) => record.toJSON())
    );
    res.status(200).json(rowsWithPrescriptions);
  } catch (error) {
    console.error("GET HISTORY ERROR:", error);
    res.status(500).json({ error: "Fetch history failed" });
  }
};
