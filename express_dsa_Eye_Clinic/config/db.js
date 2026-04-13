import sql from "mssql";

const config = {
  server: "Z14-55N",
  database: "EyeClinic",
  options: {
    trustedConnection: true,   // 🔥 THIS FIXES YOUR ISSUE
    encrypt: false,
    trustServerCertificate: true,
  },
};

export const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log("✅ MSSQL Connected");
  } catch (err) {
    console.log("❌ DB Error:", err.message);
  }
};

export default sql;