const sequelize = require("../config/sequelize");
const dayjs = require("dayjs"); 

//  DateTime  Function
function convertSqlDateTime(dateObj) {
  if (typeof dateObj === "string" || dateObj instanceof String) {
    dateObj = new Date(dateObj);
  }

  if (dateObj instanceof Date && !isNaN(dateObj.getTime())) {
    return sequelize.literal(
      `CONVERT(DATETIME, '${dayjs(dateObj).format("YYYY-MM-DD HH:mm:ss")}')`
    );
  }

  return null;
}

//  Date Only Function
function convertSqlDate(dateObj) {
  if (typeof dateObj === "string" || dateObj instanceof String) {
    dateObj = new Date(dateObj);
  }

  if (dateObj instanceof Date && !isNaN(dateObj.getTime())) {
    return sequelize.literal(
      `CONVERT(DATETIME, '${dayjs(dateObj).format("YYYY-MM-DD")}')`
    );
  }

  return null;
}

//  Time Only Function
function convertSqlTime(dateObj) {
  if (typeof dateObj === "string" || dateObj instanceof String) {
    // If input is a time string (HH:mm or HH:mm:ss), prefix with a dummy date
    if (/^\d{2}:\d{2}(:\d{2})?$/.test(dateObj)) {
      dateObj = `1970-01-01 ${dateObj}`;
    }
    dateObj = new Date(dateObj);
  }

  if (dateObj instanceof Date && !isNaN(dateObj.getTime())) {
    return sequelize.literal(
      `CONVERT(DATETIME, '${dayjs(dateObj).format("HH:mm:ss")}')`
    );
  }

  return null;
}

module.exports= {convertSqlDateTime,convertSqlDate,convertSqlTime}; 