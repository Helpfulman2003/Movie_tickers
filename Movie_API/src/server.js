import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import connectMongoDB from "./config/dbconfig.js";
import cors from "cors";


// Load biến môi trường
dotenv.config();

const app = express();
app.use(cors('*'));
const port = process.env.PORT || 8080;
const dbUrl = process.env.DB_URL;

// Kiểm tra nếu thiếu DB_URL
if (!dbUrl) {
    console.error("❌ Lỗi: Thiếu biến môi trường DB_URL");
    process.exit(1);
}


// Kết nối MongoDB
connectMongoDB(dbUrl);

// handle error
app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Something went wrong!";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });

// Middleware xử lý JSON
app.use(express.json());

// Khai báo routes
routes(app);

app.listen(port, () => console.log(`🚀 Server running on port: ${port}`));
