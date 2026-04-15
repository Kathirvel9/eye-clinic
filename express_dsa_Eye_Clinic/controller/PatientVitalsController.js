const PatientVitals = require("../models/PatientVitals");
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

const normalizePayload = (body = {}) => ({
  UHId: toInteger(body.UHId ?? body.uhid),
  PatientId: toInteger(body.PatientId ?? body.patientId),
  BP: toNull(body.BP ?? body.bp),
  Sugar: toNull(body.Sugar ?? body.sugar),
  Pulse: toNull(body.Pulse ?? body.pulse),
  Temp: toNull(body.Temp ?? body.temp),
  Height: toNull(body.Height ?? body.height),
  SpOp: toNull(body.SpOp ?? body.spop),
  Weight: toNull(body.Weight ?? body.weight),
});

const enrichPatientVitalsPayload = async (body = {}) => {
  const payload = normalizePayload(body);

  if (!payload.UHId) {
    return payload;
  }

  if (payload.PatientId) {
    return payload;
  }

  const patient = await PatientDetails.findOne({
    where: { UHId: payload.UHId },
    order: [["PatientId", "DESC"]],
  });

  if (patient) {
    payload.PatientId = patient.PatientId;
  }

  return payload;
};

exports.create = async (req, res) => {
  try {
    const payload = await enrichPatientVitalsPayload(req.body);

    if (!payload.UHId) {
      return res.status(400).json({ message: "UHId is required" });
    }

    if (!payload.PatientId) {
      return res.status(400).json({ message: "Patient details not found for this UHId" });
    }

    const data = await PatientVitals.create(payload);
    res.status(201).json({ message: "Patient vitals created", data });
  } catch (error) {
    res.status(500).json({ message: "Create failed", error: error.message });
  }
};

exports.getAll = async (_req, res) => {
  try {
    const data = await PatientVitals.findAll({ order: [["VitalId", "DESC"]] });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

exports.getByUHId = async (req, res) => {
  try {
    const parsedUHId = toInteger(req.params.uhid);

    if (!parsedUHId) {
      return res.status(400).json({ message: "Valid UHId is required" });
    }

    const data = await PatientVitals.findAll({
      where: { UHId: parsedUHId },
      order: [["VitalId", "DESC"]],
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await PatientVitals.findByPk(id);
    if (!data) return res.status(404).json({ message: "Not found" });
    await data.update(await enrichPatientVitalsPayload(req.body));
    res.status(200).json({ message: "Patient vitals updated", data });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await PatientVitals.findByPk(id);
    if (!data) return res.status(404).json({ message: "Not found" });
    await data.destroy();
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};
