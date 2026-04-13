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

const normalizePhotoPath = (value) => {
  const normalized = toNull(value);
  if (normalized === null) return null;

  if (typeof normalized === "string") {
    return normalized.trim() || null;
  }

  try {
    return JSON.stringify(normalized);
  } catch (_error) {
    return null;
  }
};

const getAgeFromDob = (dob) => {
  if (!dob) return null;

  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age >= 0 ? age : null;
};

const pickValue = (body, primaryKey, alternateKey) => {
  if (Object.prototype.hasOwnProperty.call(body, primaryKey)) {
    return body[primaryKey];
  }

  if (alternateKey && Object.prototype.hasOwnProperty.call(body, alternateKey)) {
    return body[alternateKey];
  }

  return undefined;
};

const normalizePayload = (body = {}, { useNullDefaults = false } = {}) => {
  const mapValue = (value, formatter) => {
    if (value === undefined) {
      return useNullDefaults ? null : undefined;
    }

    return formatter(value);
  };

  const dobValue = pickValue(body, "DOB", "dob");
  const dob = mapValue(dobValue, toNull);
  const ageValue = pickValue(body, "Age", "age");
  const age = mapValue(ageValue, toInteger);

  return {
    MRIId: mapValue(pickValue(body, "MRIId", "mriId"), toNull),
    TokenNo: mapValue(pickValue(body, "TokenNo", "tokenNo"), toNull),
    UHId: mapValue(pickValue(body, "UHId", "uhId") ?? pickValue(body, "uhid"), toInteger),
    RegDate: mapValue(pickValue(body, "RegDate", "regDate"), toNull),
    PatientName: mapValue(pickValue(body, "PatientName", "patientName"), toNull),
    CareOf: mapValue(pickValue(body, "CareOf", "careOf"), toNull),
    Relationship: mapValue(pickValue(body, "Relationship", "relationship"), toNull),
    Religion: mapValue(pickValue(body, "Religion", "religion"), toNull),
    Age: age ?? (dob ? getAgeFromDob(dob) : useNullDefaults ? null : undefined),
    Gender: mapValue(pickValue(body, "Gender", "gender"), toNull),
    PatientType: mapValue(pickValue(body, "PatientType", "patientType"), toNull),
    DOB: dob,
    Address: mapValue(pickValue(body, "Address", "address"), toNull),
    AadharCard: mapValue(pickValue(body, "AadharCard", "aadharCard"), toNull),
    PanCard: mapValue(pickValue(body, "PanCard", "panCard"), toNull),
    StateId: mapValue(pickValue(body, "StateId", "stateId"), toInteger),
    CityId: mapValue(pickValue(body, "CityId", "cityId"), toInteger),
    DiagnosisId: mapValue(pickValue(body, "DiagnosisId", "diagnosisId"), toInteger),
    Company: mapValue(pickValue(body, "Company", "company"), toNull),
    Pincode: mapValue(pickValue(body, "Pincode", "pincode"), toNull),
    Phone: mapValue(pickValue(body, "Phone", "phone"), toNull),
    DepartmentId: mapValue(pickValue(body, "DepartmentId", "departmentId"), toInteger),
    DesignationId: mapValue(pickValue(body, "DesignationId", "designationId"), toInteger),
    ConsultationCodeId: mapValue(
      pickValue(body, "ConsultationCodeId", "consultationCodeId"),
      toInteger
    ),
    PhotoPath: mapValue(pickValue(body, "PhotoPath", "photoPath"), normalizePhotoPath),
  };
};

const removeUndefinedValues = (payload) =>
  Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined)
  );

exports.create = async (req, res) => {
  try {
    const payload = normalizePayload(req.body, { useNullDefaults: true });

    if (!payload.UHId) {
      return res.status(400).json({ message: "UHId is required" });
    }

    if (!payload.PatientName) {
      return res.status(400).json({ message: "PatientName is required" });
    }

    const existing = await PatientDetails.findOne({
      where: { UHId: payload.UHId },
      order: [["PatientId", "DESC"]],
    });

    if (existing) {
      await existing.update(payload);
      return res
        .status(200)
        .json({ message: "Patient details updated", data: existing });
    }

    const data = await PatientDetails.create(payload);
    res.status(201).json({ message: "Patient details created", data });
  } catch (error) {
    console.error("CREATE PATIENT DETAILS ERROR:", error);
    res.status(500).json({ message: "Create failed", error: error.message });
  }
};

exports.getAll = async (_req, res) => {
  try {
    const data = await PatientDetails.findAll({
      order: [["PatientId", "DESC"]],
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("GET ALL PATIENT DETAILS ERROR:", error);
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await PatientDetails.findByPk(id);

    if (!data) {
      return res.status(404).json({ message: "Patient details not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("GET PATIENT DETAILS BY ID ERROR:", error);
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

exports.getByUHId = async (req, res) => {
  try {
    const { uhid } = req.params;
    const parsedUHId = toInteger(uhid);

    if (!parsedUHId) {
      return res.status(400).json({ message: "Valid UHId is required" });
    }

    const data = await PatientDetails.findAll({
      where: { UHId: parsedUHId },
      order: [["PatientId", "DESC"]],
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("GET PATIENT DETAILS BY UHID ERROR:", error);
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await PatientDetails.findByPk(id);

    if (!data) {
      return res.status(404).json({ message: "Patient details not found" });
    }

    const payload = removeUndefinedValues(normalizePayload(req.body));

    if (!Object.keys(payload).length) {
      return res.status(400).json({ message: "No valid fields provided for update" });
    }

    await data.update(payload);
    res.status(200).json({ message: "Patient details updated", data });
  } catch (error) {
    console.error("UPDATE PATIENT DETAILS ERROR:", error);
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await PatientDetails.findByPk(id);

    if (!data) {
      return res.status(404).json({ message: "Patient details not found" });
    }

    await data.destroy();
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.error("DELETE PATIENT DETAILS ERROR:", error);
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};
