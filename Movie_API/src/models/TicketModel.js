import mongoose from "mongoose";

const { Schema } = mongoose;

const TicketSchema = new Schema(
  {
    maSuatChieu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MovieScreening", // Tham chiếu đến collection MovieScreenings
      required: true,
    },
    maNhanVien: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee", // Tham chiếu đến collection Employees
      required: true,
    },
    gia: {
      type: Number,
    },
    trangThai: {
      type: String,
      enum: ["Chưa sử dụng", "Đã sử dụng", "Hủy"],
      default: "Chưa sử dụng",
    },
    ngayBan: {
      type: Date,
    },
    ghe: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Ticket", TicketSchema);