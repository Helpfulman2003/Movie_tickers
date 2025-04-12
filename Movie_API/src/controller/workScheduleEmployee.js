import WorkScheduleEmployee from '../models/WorkScheduleEmployeeModel.js';

class WorkScheduleEmployeeController {
    async getAllWorkScheduleEmployee(req, res) {
        try {
            const workScheduleEmployees = await WorkScheduleEmployee.find()
                .populate("maNhanVien", "maNhanVien tenDangNhap") // Chỉ lấy mã & tên nhân viên
                .populate("maLichLamViec", "loaiCaTruc ngayLam gioBatDau gioKetThuc"); // Chỉ lấy loại ca & ngày làm

            res.status(200).json({
                message: "GET ALL workScheduleEmployees DONE",
                data: workScheduleEmployees
            });
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }

    async getWorkScheduleEmployeeDetails(req, res) {
        try {
            const workScheduleEmployee = await WorkScheduleEmployee.findById(req.params.id)
                .populate("maNhanVien", "maNhanVien tenDangNhap")
                .populate("maLichLamViec", "loaiCaTruc ngayLam gioBatDau gioKetThuc");

            if (!workScheduleEmployee) {
                return res.status(404).json({
                    message: 'WorkScheduleEmployee not found'
                });
            }

            res.status(200).json({
                message: "GET WorkScheduleEmployee DONE",
                data: workScheduleEmployee
            });
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }

    async createWorkScheduleEmployee(req, res) {
        try {
            const { maNhanVien, maLichLamViec } = req.body;

            // Kiểm tra nếu đã tồn tại dữ liệu tránh trùng lặp
            const existingEntry = await WorkScheduleEmployee.findOne({ maNhanVien, maLichLamViec });
            if (existingEntry) {
                return res.status(400).json({
                    message: "Nhân viên này đã có trong ca làm việc này!"
                });
            }

            const newWorkScheduleEmployee = new WorkScheduleEmployee({ maNhanVien, maLichLamViec });
            const saveWorkScheduleEmployee = await newWorkScheduleEmployee.save();

            res.status(201).json({
                message: 'Create WorkScheduleEmployee successful',
                data: saveWorkScheduleEmployee
            });
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }

    async updateWorkScheduleEmployee(req, res) {
        try {
            const workScheduleEmployee = await WorkScheduleEmployee.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true } // Trả về dữ liệu đã cập nhật
            );

            if (!workScheduleEmployee) {
                return res.status(404).json({
                    message: 'WorkScheduleEmployee not found'
                });
            }

            res.status(200).json({
                message: "UPDATE WorkScheduleEmployee SUCCESSFUL",
                data: workScheduleEmployee
            });
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }

    async deleteWorkScheduleEmployee(req, res) {
        try {
            const workScheduleEmployee = await WorkScheduleEmployee.findByIdAndDelete(req.params.id);

            if (!workScheduleEmployee) {
                return res.status(404).json({
                    message: 'WorkScheduleEmployee not found'
                });
            }

            res.status(200).json({
                message: "DELETE WorkScheduleEmployee DONE",
                data: workScheduleEmployee
            });
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }
}

export default WorkScheduleEmployeeController;
