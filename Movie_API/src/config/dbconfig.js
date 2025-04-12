import mongoose from "mongoose";

export default async function connectMongoDB(dbUrl) {
    try {
        await mongoose.connect(dbUrl); // Không cần các option bị deprecated
        console.log("✅ Kết nối MongoDB thành công!");
    } catch (error) {
        console.error("❌ Kết nối MongoDB thất bại!", error.message);
        process.exit(1); // Dừng server nếu kết nối lỗi
    }
}
