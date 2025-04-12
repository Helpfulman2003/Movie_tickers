import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MovieScreeningsSchema = new Schema(
  {
    maPhim: {
      type: mongoose.Schema.Types.ObjectId, // Tham chiếu đến MovieModel
      ref: 'Movie',
      required: true,
    },
    maPhong: {
      type: mongoose.Schema.Types.ObjectId, // Tham chiếu đến RoomModel
      ref: 'Room',
      required: true,
    },
    gioBatDau: {
      type: Date,
    },
    gioKetThuc: {
      type: Date,
    },
    tranThai: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const MovieScreening = mongoose.model('MovieScreening', MovieScreeningsSchema);

export default MovieScreening;
