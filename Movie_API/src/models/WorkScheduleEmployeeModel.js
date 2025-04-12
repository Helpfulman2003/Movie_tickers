import mongoose from "mongoose"
const Schema = mongoose.Schema;

const WorkScheduleEmployeeSchema = new Schema(
    {
        maNhanVien: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
            required: true
        },
        maLichLamViec: {
            type: Schema.Types.ObjectId,
            ref: "WorkSchedule",
            required: true
        }

    }, {
        timestamps: true,
        versionKey: false
    }
)

const WorkScheduleEmployee = mongoose.model("WorkScheduleEmployee", WorkScheduleEmployeeSchema)

export default WorkScheduleEmployee;