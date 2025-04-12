import mongoose from "mongoose"
const Schema = mongoose.Schema;

const MovieSchema = new Schema(
    {
        tenPhim: {
            type: String,
            required: true
        },
        theLoai: {
            type: String,
            // required: true
        },
        thoiLuong: {
            type: Number,
            // required: true
        },
        daoDien: {
            type: String,
            // required: true
        },
        namSanXuat: {
            type: Number,
            // required: true
        },
        moTa: {
            type: String,
            // required: true
        },
        ngayCongChieu: {
            type: Date,
            // required: true
        },
        anhBia: {
            type: String,
            // required: true
        },
        trangThai: {
            type: Boolean,
            // required: true
        }

    }, {
        timestamps: true,
        versionKey: false
    }
)

const Movie = mongoose.model("Movie", MovieSchema)

export default Movie;