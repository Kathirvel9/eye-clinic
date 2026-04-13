const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
// models/ClinicalExamination.js

module.exports = (sequelize) => {
  const ClinicalExamination = sequelize.define("ClinicalExamination", {
    
    Exam_Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    OPRefNo: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // ===== SLIT EXAM OD =====
    SE_OD_Lids: DataTypes.STRING,
    SE_OD_Conjunctiva: DataTypes.STRING,
    SE_OD_Cornea: DataTypes.STRING,
    SE_OD_Sclera: DataTypes.STRING,
    SE_OD_AC: DataTypes.STRING,
    SE_OD_Iris: DataTypes.STRING,
    SE_OD_Lens: DataTypes.STRING,
    SE_OD_NAD: DataTypes.STRING,

    // ===== SLIT EXAM OS =====
    SE_OS_Lids: DataTypes.STRING,
    SE_OS_Conjunctiva: DataTypes.STRING,
    SE_OS_Cornea: DataTypes.STRING,
    SE_OS_Sclera: DataTypes.STRING,
    SE_OS_AC: DataTypes.STRING,
    SE_OS_Iris: DataTypes.STRING,
    SE_OS_Lens: DataTypes.STRING,
    SE_OS_NAD: DataTypes.STRING,

    // ===== FUNDUS EXAM OD =====
    FE_OD_VitreousMedia: DataTypes.STRING,
    FE_OD_Disc: DataTypes.STRING,
    FE_OD_Macula: DataTypes.STRING,
    FE_OD_RetinalVessels: DataTypes.STRING,
    FE_OD_RetinalPeriphery: DataTypes.STRING,
    FE_OD_Choroid: DataTypes.STRING,
    FE_OD_NAD: DataTypes.STRING,

    // ===== FUNDUS EXAM OS =====
    FE_OS_VitreousMedia: DataTypes.STRING,
    FE_OS_Disc: DataTypes.STRING,
    FE_OS_Macula: DataTypes.STRING,
    FE_OS_RetinalVessels: DataTypes.STRING,
    FE_OS_RetinalPeriphery: DataTypes.STRING,
    FE_OS_Choroid: DataTypes.STRING,
    FE_OS_NAD: DataTypes.STRING,

    // ===== IOP =====
    IM_Method: DataTypes.STRING,

    // 🔥 FIX HERE (IMPORTANT)
    IM_ActualTime: DataTypes.STRING,

    IM_OD: DataTypes.STRING,
    IM_OS: DataTypes.STRING,
    IM_Username: DataTypes.STRING,

    // ===== GONIOSCOPY =====
    Gonio_OpenAngle: DataTypes.STRING,
    Gonio_ClosedAngle: DataTypes.STRING,
    Gonio_TargetIOP: DataTypes.STRING,

    // ===== EXTRA =====
    EE_CoverTest: DataTypes.STRING,
    EE_Pupil: DataTypes.STRING,
    EE_FaceEye: DataTypes.STRING,

    // ===== PLAN =====
    PA_SurgeryAdvice: DataTypes.STRING,
    PA_DiagnosticProcedure: DataTypes.STRING,
    PA_ProcedureRemarks: DataTypes.TEXT,

    // ===== GLASS =====
    GP_Bifocal: DataTypes.STRING,
    GP_SingleVision: DataTypes.STRING,
    GP_Reading: DataTypes.STRING,
    GP_Progressive: DataTypes.STRING,

    // ===== PROCEDURE =====
    SP_ProcedureName: DataTypes.STRING,
    SP_ProcedureEye: DataTypes.STRING,
    SP_ProcedureParams: DataTypes.TEXT,

    // ===== FOLLOW UP =====
    FollowUpNotes: DataTypes.TEXT,

    // 🔥 FIX HERE
    FollowUpTime: DataTypes.STRING,

    // 🔥 FIX HERE
    CreatedAt: {
      type: DataTypes.STRING,
      defaultValue: () => {
        return new Date().toISOString().slice(0, 19).replace("T", " ");
      }
    }

  }, {
    tableName: "ClinicalExamination",
    timestamps: false
  });

  return ClinicalExamination;
};