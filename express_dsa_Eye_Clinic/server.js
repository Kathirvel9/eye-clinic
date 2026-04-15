const express = require("express");
const cors = require("cors");
const http = require("http");
require("dotenv").config();
const sequelize = require("./config/sequelize");
const DoctorMaster = require("./models/DoctorMaster");
const CityMaster = require("./models/CityMaster");
const StateMaster = require("./models/StateMaster");
const DepartmentMaster = require("./models/DepartmentMaster");
const ConsultationCodeMaster = require("./models/ConsultationCodeMaster");
const DesignationMaster = require("./models/DesignationMaster");
const DiagnosisMaster = require("./models/DiagnosisMaster");
const PatientDetails = require("./models/PatientDetails");
const PatientVitals = require("./models/PatientVitals");
const ConsultationFee = require("./models/ConsultationFee");
const NewOpReg = require("./models/NewOpReg");

const authRoutes = require("./routes/authRoutes");
const eyeClinicDataRoutes = require("./routes/EyeClinicDataRoutes");
const refractionRoutes = require("./routes/RefractionDetailsRoutes");
const newOpRegRoutes = require("./routes/NewOpRegRoutes");
const doctorMasterRoutes = require("./routes/DoctorMasterRoutes");
const cityMasterRoutes = require("./routes/CityMasterRoutes");
const stateMasterRoutes = require("./routes/StateMasterRoutes");
const departmentMasterRoutes = require("./routes/DepartmentMasterRoutes");
const consultationCodeMasterRoutes = require("./routes/ConsultationCodeMasterRoutes");
const designationMasterRoutes = require("./routes/DesignationMasterRoutes");
const diagnosisMasterRoutes = require("./routes/DiagnosisMasterRoutes");
const patientDetailsRoutes = require("./routes/PatientDetailsRoutes");
const patientVitalsRoutes = require("./routes/PatientVitalsRoutes");
const consultationFeeRoutes = require("./routes/ConsultationFeeRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const shouldSyncSchema = process.env.SEQUELIZE_SYNC === "true";
let httpServer = null;
const modelsToSync = [
  ["DoctorMaster", DoctorMaster],
  ["CityMaster", CityMaster],
  ["StateMaster", StateMaster],
  ["DepartmentMaster", DepartmentMaster],
  ["ConsultationCodeMaster", ConsultationCodeMaster],
  ["DesignationMaster", DesignationMaster],
  ["DiagnosisMaster", DiagnosisMaster],
  ["PatientDetails", PatientDetails],
  ["PatientVitals", PatientVitals],
  ["ConsultationFee", ConsultationFee],
  ["NewOpReg", NewOpReg],
];

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize connected");

    if (shouldSyncSchema) {
      console.log("Schema sync started");
      for (const [name, model] of modelsToSync) {
        await model.sync({ alter: true });
        console.log(`${name} synced`);
      }
      console.log("Schema sync completed");
    }

    httpServer = http.createServer(app);

    httpServer.on("error", (error) => {
      console.error("HTTP server error:", error.message);
    });

    httpServer.on("close", () => {
      console.error("HTTP server closed");
    });

    httpServer.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
});

process.on("SIGINT", () => {
  if (httpServer) {
    httpServer.close(() => {
      console.log("Server stopped");
      process.exit(0);
    });
    return;
  }

  process.exit(0);
});

app.use(cors());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/eye-clinic-data", eyeClinicDataRoutes);
app.use("/api/refraction", refractionRoutes);
app.use("/api/patient", newOpRegRoutes);
app.use("/api/master/doctor", doctorMasterRoutes);
app.use("/api/master/city", cityMasterRoutes);
app.use("/api/master/state", stateMasterRoutes);
app.use("/api/master/department", departmentMasterRoutes);
app.use("/api/master/consultation-code", consultationCodeMasterRoutes);
app.use("/api/master/designation", designationMasterRoutes);
app.use("/api/master/diagnosis", diagnosisMasterRoutes);
app.use("/api/patient-details", patientDetailsRoutes);
app.use("/api/patient-vitals", patientVitalsRoutes);
app.use("/api/consultation-fee", consultationFeeRoutes);


// TEST ROUTES
app.get("/", (req, res) => {
  res.json({ message: "API Running" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

startServer();
