const sequelize = require("../config/sequelize");
const { DataTypes } = require("sequelize");

// models/ClinicalExamination.js
module.exports = (sequelize) => {
  return sequelize.define("RefractionDetails", {

    Exam_Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    OPRefNo: DataTypes.INTEGER,

    VA_WithoutGlass_OD1: DataTypes.STRING,
    VA_WithoutGlass_OD2: DataTypes.STRING,
    VA_WithGlass_OD1: DataTypes.STRING,
    VA_WithGlass_OD2: DataTypes.STRING,
    VA_ContactLens_OD1: DataTypes.STRING,
    VA_ContactLens_OD2: DataTypes.STRING,

    VA_WithoutGlass_OS1: DataTypes.STRING,
    VA_withoutGlass_OS2: DataTypes.STRING,
    VA_WithGlass_OS1: DataTypes.STRING,
    VA_WithGlass_OS2: DataTypes.STRING,
    VA_ContactLens_OS1: DataTypes.STRING,
    VA_ContactLens_OS2: DataTypes.STRING,

    DistanceChart: DataTypes.STRING,
    NearVisionChart: DataTypes.STRING,

    RR_DSph_OD: DataTypes.STRING,
    RET_DCyl_OD: DataTypes.STRING,
    RET_Axis_OD: DataTypes.STRING,
    RET_Reflex_OD: DataTypes.STRING,
    RET_Quality_OD: DataTypes.STRING,

    RET_DSph_OS: DataTypes.STRING,
    RET_DCyl_OS: DataTypes.STRING,
    RET_Axis_OS: DataTypes.STRING,
    RET_Reflex_OS: DataTypes.STRING,
    RET_Quality_OS: DataTypes.STRING,

    RC_Type_OD: DataTypes.STRING,
    RC_DSph_OD: DataTypes.STRING,
    RC_Type_OS: DataTypes.STRING,
    RC_DSph_OS: DataTypes.STRING,

    AC_DSph_OD: DataTypes.STRING,
    AC_DCyl_OD: DataTypes.STRING,
    AC_Axis_OD: DataTypes.STRING,
    AC_Vision_OD: DataTypes.STRING,
    AC_Near_OD: DataTypes.STRING,
    AC_Add_OD: DataTypes.STRING,
    AC_Remarks_OD: DataTypes.STRING,
    AC_Cm_OD: DataTypes.STRING,

    AC_DSph_OS: DataTypes.STRING,
    AC_DCyl_OS: DataTypes.STRING,
    AC_Axis_OS: DataTypes.STRING,
    AC_Vision_OS: DataTypes.STRING,
    AC_Near_OS: DataTypes.STRING,
    AC_Add_OS: DataTypes.STRING,
    AC_Remarks_OS: DataTypes.STRING,
    AC_Cm_OS: DataTypes.STRING,

    GPD_DSph_OD: DataTypes.STRING,
    GPD_DCyl_OD: DataTypes.STRING,
    GPD_Axis_OD: DataTypes.STRING,
    GPD_BCVA_OD: DataTypes.STRING,

    GPD_DSph_OS: DataTypes.STRING,
    GPD_DCyl_OS: DataTypes.STRING,
    GPD_Axis_OS: DataTypes.STRING,
    GPD_BCVA_OS: DataTypes.STRING,

    GPN_Add_OD: DataTypes.STRING,
    GPN_BCVA_OD: DataTypes.STRING,
    GPN_Cm_OD: DataTypes.STRING,

    GPN_Add_OS: DataTypes.STRING,
    GPN_BCVA_OS: DataTypes.STRING,
    GPN_Cm_OS: DataTypes.STRING,

    CreatedAt: {
      type: DataTypes.STRING,
      defaultValue: () => {
        return new Date().toISOString().slice(0, 19).replace("T", " ");
      }
    }

  }, {
    tableName: "RefractionDetails",
    timestamps: false
  });
};
