const ConsultationFee = require("../models/ConsultationFee");
const PatientDetails = require("../models/PatientDetails");

const toNull = (value) => {
  if (value === undefined || value === null) return null;
  if (typeof value === "string" && value.trim() === "") return null;
  return value;
};

const toInteger = (value) => {
  const normalized = toNull(value);
  if (normalized === null) return null;
  const parsed = Number.parseInt(normalized, 10);
  return Number.isNaN(parsed) ? null : parsed;
};

const toDecimal = (value) => {
  const normalized = toNull(value);
  if (normalized === null) return null;
  const parsed = Number.parseFloat(normalized);
  return Number.isNaN(parsed) ? null : parsed;
};

const normalizePayload = (body = {}) => ({
  PatientId: toInteger(body.PatientId ?? body.patientId),
  UHId: toInteger(body.UHId ?? body.uhid),
  DoctorId: toInteger(body.DoctorId ?? body.doctorId),
  DoctorName: toNull(body.DoctorName ?? body.doctorName),
  ConsultationId: toInteger(body.ConsultationId ?? body.consultationId),
  ConsultationCode: toNull(body.ConsultationCode ?? body.consultationCode),
  ConsultFee: toDecimal(body.ConsultFee ?? body.consultFee),
  Designation: toNull(body.Designation ?? body.designation),
  Concession: toDecimal(body.Concession ?? body.concession) ?? 0,
  Total: toDecimal(body.Total ?? body.total),
  PatientType: toNull(body.PatientType ?? body.patientType),
  BillNo: toNull(body.BillNo ?? body.billNo),
});

const removeUndefinedValues = (payload) =>
  Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined)
  );

const enrichPayload = async (body = {}, { useNullDefaults = false } = {}) => {
  const payload = normalizePayload(body);
  const sanitized = useNullDefaults ? payload : removeUndefinedValues(payload);

  if (sanitized.PatientId && !sanitized.UHId) {
    const patient = await PatientDetails.findByPk(sanitized.PatientId);
    if (patient) {
      sanitized.UHId = patient.UHId;
      if (!sanitized.PatientType) {
        sanitized.PatientType = patient.PatientType;
      }
    }
  }

  if (!sanitized.PatientId && sanitized.UHId) {
    const patient = await PatientDetails.findOne({
      where: { UHId: sanitized.UHId },
      order: [["PatientId", "DESC"]],
    });

    if (patient) {
      sanitized.PatientId = patient.PatientId;
      sanitized.UHId = patient.UHId;
      if (!sanitized.PatientType) {
        sanitized.PatientType = patient.PatientType;
      }
    }
  }

  if (sanitized.Total === null || sanitized.Total === undefined) {
    const consultFee = sanitized.ConsultFee ?? 0;
    const concession = sanitized.Concession ?? 0;
    sanitized.Total = Math.max(consultFee - concession, 0);
  }

  return sanitized;
};

exports.create = async (req, res) => {
  try {
    const payload = await enrichPayload(req.body, { useNullDefaults: true });

    if (!payload.PatientId) {
      return res.status(400).json({ message: "PatientId or valid UHId is required" });
    }

    if (!payload.UHId) {
      return res.status(400).json({ message: "UHId could not be resolved for this patient" });
    }

    const data = await ConsultationFee.create(payload);

    return res.status(201).json({ message: "Consultation fee created", data });
  } catch (error) {
    console.error("CREATE CONSULTATION FEE ERROR:", error);
    return res.status(500).json({ message: "Create failed", error: error.message });
  }
};

exports.getAll = async (_req, res) => {
  try {
    const data = await ConsultationFee.findAll({
      order: [["ConsultationFeeId", "DESC"]],
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error("GET ALL CONSULTATION FEE ERROR:", error);
    return res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

exports.getByPatientId = async (req, res) => {
  try {
    const patientId = toInteger(req.params.patientId);

    if (!patientId) {
      return res.status(400).json({ message: "Valid PatientId is required" });
    }

    const data = await ConsultationFee.findAll({
      where: { PatientId: patientId },
      order: [["ConsultationFeeId", "DESC"]],
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error("GET CONSULTATION FEE BY PATIENT ID ERROR:", error);
    return res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

exports.getByUHId = async (req, res) => {
  try {
    const uhid = toInteger(req.params.uhid);

    if (!uhid) {
      return res.status(400).json({ message: "Valid UHId is required" });
    }

    const data = await ConsultationFee.findAll({
      where: { UHId: uhid },
      order: [["ConsultationFeeId", "DESC"]],
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error("GET CONSULTATION FEE BY UHID ERROR:", error);
    return res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ConsultationFee.findByPk(id);

    if (!data) {
      return res.status(404).json({ message: "Consultation fee not found" });
    }

    const payload = await enrichPayload(req.body);

    if (!Object.keys(payload).length) {
      return res.status(400).json({ message: "No valid fields provided for update" });
    }

    await data.update(payload);

    return res.status(200).json({ message: "Consultation fee updated", data });
  } catch (error) {
    console.error("UPDATE CONSULTATION FEE ERROR:", error);
    return res.status(500).json({ message: "Update failed", error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ConsultationFee.findByPk(id);

    if (!data) {
      return res.status(404).json({ message: "Consultation fee not found" });
    }

    await data.destroy();
    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.error("DELETE CONSULTATION FEE ERROR:", error);
    return res.status(500).json({ message: "Delete failed", error: error.message });
  }
};
