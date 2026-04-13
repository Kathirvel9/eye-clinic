const { Op, QueryTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const NewOpReg = require("../models/NewOpReg");

const normalizeDate = (value) => {
  if (!value) return new Date().toISOString().slice(0, 10);
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
};

const normalizeSeenStatus = (value) => {
  if (value === undefined || value === null || value === "") return null;
  const normalized = String(value).trim().toUpperCase();
  return normalized === "Y" || normalized === "N" ? normalized : null;
};

const normalizePayload = (body = {}) => ({
  UHId: body.UHId ?? body.uhid ?? null,
  PatientName: body.PatientName ?? body.patientName ?? null,
  PatMobileNo: body.PatMobileNo ?? body.patMobileNo ?? null,
  RegDate: normalizeDate(body.RegDate ?? body.regDate),
  ToBeSeen: normalizeSeenStatus(body.ToBeSeen ?? body.toBeSeen),
});

const buildQueueStatusCondition = (tab) => {
  if (tab === "alreadyseen") {
    return `
      n.ToBeSeen = 'Y'
      AND hr.OPRefNo IS NOT NULL
      AND hc.OPRefNo IS NOT NULL
    `;
  }

  if (tab === "tobeseen") {
    return `
      n.ToBeSeen = 'N'
      AND hr.OPRefNo IS NOT NULL
    `;
  }

  if (tab === "all") return "n.ToBeSeen IN ('N', 'Y')";
  return "n.ToBeSeen = 'N'";
};

exports.create = async (req, res) => {
  try {
    const payload = normalizePayload(req.body);

    if (!payload.UHId || !payload.PatientName) {
      return res.status(400).json({ message: "UHId and PatientName are required" });
    }

    const data = await NewOpReg.create(payload);
    res.status(201).json(data);
  } catch (error) {
    console.error("CREATE NEW OP REG ERROR:", error);
    res.status(500).json({ message: "Create failed", error: error.message });
  }
};

exports.getAll = async (_req, res) => {
  try {
    const data = await NewOpReg.findAll({ order: [["OPRefNo", "DESC"]] });
    res.status(200).json(data);
  } catch (error) {
    console.error("GET ALL NEW OP REG ERROR:", error);
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

exports.getPatientByOPRefNo = async (req, res) => {
  try {
    const { opRefNo } = req.params;
    const patient = await NewOpReg.findByPk(opRefNo);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error("GET PATIENT ERROR:", error);
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

exports.searchPatients = async (req, res) => {
  try {
    const searchTerm = String(req.query.q || "").trim();

    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required" });
    }

    const orConditions = [
      { PatientName: { [Op.like]: `%${searchTerm}%` } },
      { PatMobileNo: { [Op.like]: `%${searchTerm}%` } },
    ];

    if (/^\d+$/.test(searchTerm)) {
      orConditions.unshift({ OPRefNo: Number(searchTerm) });
      orConditions.push({ UHId: Number(searchTerm) });
    }

    const data = await NewOpReg.findAll({
      where: { [Op.or]: orConditions },
      order: [["OPRefNo", "DESC"]],
      limit: 25,
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("SEARCH NEW OP REG ERROR:", error);
    res.status(500).json({ message: "Search failed", error: error.message });
  }
};

exports.getByUHId = async (req, res) => {
  try {
    const { uhid } = req.params;
    const data = await NewOpReg.findAll({
      where: { UHId: uhid },
      order: [["OPRefNo", "DESC"]],
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("GET BY UHID NEW OP REG ERROR:", error);
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

exports.getDoctorQueue = async (req, res) => {
  try {
    const tab = String(req.query.tab || "tobeseen").trim().toLowerCase();
    const date = normalizeDate(req.query.date);
    const statusCondition = buildQueueStatusCondition(tab);

    const query = `
      WITH LatestPatientDetails AS (
        SELECT *,
               ROW_NUMBER() OVER (PARTITION BY UHId ORDER BY PatientId DESC) AS rn
        FROM PatientDetails
      ),
      LatestPatientVitals AS (
        SELECT *,
               ROW_NUMBER() OVER (PARTITION BY UHId ORDER BY VitalId DESC) AS rn
        FROM PatientVitals
      ),
      HasRefraction AS (
        SELECT DISTINCT OPRefNo
        FROM RefractionDetails
      ),
      HasClinicalExamination AS (
        SELECT DISTINCT OPRefNo
        FROM ClinicalExamination
      )
      SELECT
        n.OPRefNo,
        n.UHId,
        n.PatientName,
        n.PatMobileNo,
        n.RegDate,
        n.ToBeSeen,
        pd.Address,
        pd.Phone,
        pv.BP,
        pv.Sugar,
        dm.DiagnosisName
      FROM newOpReg n
      LEFT JOIN LatestPatientDetails pd ON pd.UHId = n.UHId AND pd.rn = 1
      LEFT JOIN LatestPatientVitals pv ON pv.UHId = n.UHId AND pv.rn = 1
      LEFT JOIN DiagnosisMaster dm ON dm.DiagnosisId = pd.DiagnosisId
      LEFT JOIN HasRefraction hr ON hr.OPRefNo = n.OPRefNo
      LEFT JOIN HasClinicalExamination hc ON hc.OPRefNo = n.OPRefNo
      WHERE ${statusCondition}
        AND CAST(COALESCE(n.RegDate, pd.RegDate, GETDATE()) AS date) = :selectedDate
      ORDER BY n.OPRefNo DESC;
    `;

    const rows = await sequelize.query(query, {
      replacements: { selectedDate: date },
      type: QueryTypes.SELECT,
    });

    res.status(200).json(rows);
  } catch (error) {
    console.error("GET DOCTOR QUEUE ERROR:", error);
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

exports.updateSeenStatus = async (req, res) => {
  try {
    const { opRefNo } = req.params;
    const nextStatus = normalizeSeenStatus(req.body?.ToBeSeen ?? req.body?.toBeSeen);

    if (!nextStatus) {
      return res.status(400).json({ message: "Valid ToBeSeen status is required" });
    }

    const data = await NewOpReg.findByPk(opRefNo);

    if (!data) {
      return res.status(404).json({ message: "Patient not found" });
    }

    await data.update({
      ToBeSeen: nextStatus,
      RegDate: data.RegDate || normalizeDate(new Date()),
    });

    res.status(200).json({ message: "Status updated", data });
  } catch (error) {
    console.error("UPDATE TOBESEEN STATUS ERROR:", error);
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { opRefNo } = req.params;
    const data = await NewOpReg.findByPk(opRefNo);

    if (!data) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const payload = normalizePayload(req.body);
    await data.update(payload);
    res.status(200).json(data);
  } catch (error) {
    console.error("UPDATE NEW OP REG ERROR:", error);
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { opRefNo } = req.params;
    const data = await NewOpReg.findByPk(opRefNo);

    if (!data) {
      return res.status(404).json({ message: "Patient not found" });
    }

    await data.destroy();
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE NEW OP REG ERROR:", error);
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};
