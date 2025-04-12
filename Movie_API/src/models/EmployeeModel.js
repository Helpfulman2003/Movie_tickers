import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema(
  {
    tenDangNhap: {
      type: String,
      required: true,
    },
    matKhau: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    soDienThoai: {
      type: String,
    },
    ngaySinh: {
      type: Date,
    },
    diaChi: {
      type: String,
    },
    role: {
      type: Number,
      default: 0, // 0: Người dùng thông thường, 1: Admin
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Employee = mongoose.model('Employee', EmployeeSchema);

export default Employee;
