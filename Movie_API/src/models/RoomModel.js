import mongoose from "mongoose"
const Schema = mongoose.Schema;

const RoomSchema = new Schema(
    {
        tenPhong: {
            type: String,
            required: true
        },
        sucChua: {
            type: Number
        },
        loaiPhong: {
            type: String
        },
        trangThaiHoatDong: {
            type: Boolean
        }

    }, {
        timestamps: true,
        versionKey: false
    }
)

const Room = mongoose.model("Room", RoomSchema)

export default Room;