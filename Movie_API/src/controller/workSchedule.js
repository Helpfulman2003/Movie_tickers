import WorkSchedule from '../models/WorkScheduleModel.js';
import moment from "moment-timezone";

class WorkScheduleController {
    async getAllWorkSchedules(req, res) {
        try {
            let { day, month, year } = req.query;
    
            // Chuyển đổi sang số nguyên nếu có giá trị
            day = day ? parseInt(day) : null;
            month = month ? parseInt(month) : null;
            year = year ? parseInt(year) : null;
    
            let filter = {};
    
            // Nếu có giá trị year thì lọc theo năm
            if (year) {
                const startOfYear = moment.tz([year], "Asia/Ho_Chi_Minh").startOf("year").toDate();
                const endOfYear = moment.tz([year], "Asia/Ho_Chi_Minh").endOf("year").toDate();
                filter.ngayLam = { $gte: startOfYear, $lt: endOfYear };
            }
    
            // Nếu có giá trị month thì lọc thêm tháng
            if (month) {
                const startOfMonth = moment.tz([year, month - 1], "Asia/Ho_Chi_Minh").startOf("month").toDate();
                const endOfMonth = moment.tz([year, month - 1], "Asia/Ho_Chi_Minh").endOf("month").toDate();
                filter.ngayLam = { $gte: startOfMonth, $lt: endOfMonth };
            }
    
            // Nếu có giá trị day thì lọc thêm ngày
            if (day) {
                const startOfDay = moment.tz([year, month - 1, day], "Asia/Ho_Chi_Minh").startOf("day").toDate();
                const endOfDay = moment.tz([year, month - 1, day], "Asia/Ho_Chi_Minh").endOf("day").toDate();
                filter.ngayLam = { $gte: startOfDay, $lt: endOfDay };
            }
    
            // Tìm kiếm với điều kiện filter
            const workSchedules = await WorkSchedule.find(filter);
    
            res.status(200).json({
                message: "Lấy danh sách lịch làm việc thành công",
                data: workSchedules
            });
    
        } catch (error) {
            res.status(500).json({
                message: "Lỗi khi lấy lịch làm việc",
                error: error.message
            });
        }
    }
    
    async getWorkScheduleDetails(req, res) {
        try {
            const workSchedule = await WorkSchedule.findById(req.params.id)
            
            if(!workSchedule) {
                return res.status(404).json({
                    message: 'workSchedule not found'
                })
            }
            res.status(200).json({
                message: "GET ALL workSchedule DONE",
                data: workSchedule
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

    // async createWorkSchedule(req, res) {
    //     const newWorkSchedule = new WorkSchedule(req.body);
    //     const saveWorkSchedule = await newWorkSchedule.save()
    //     res.status(201).json({
    //         message: 'create workSchedule successfull',
    //         data: saveWorkSchedule
    //     })
    // }
    async createWorkSchedule(req, res) {
        try {
            const { ngayLam, gioBatDau, gioKetThuc, loaiCaTruc } = req.body;
    
            // Chuyển đổi thời gian thành Date hợp lệ
            const startTime = new Date(`${ngayLam}T${gioBatDau}:00`);
            const endTime = new Date(`${ngayLam}T${gioKetThuc}:00`);
    
            if (isNaN(startTime) || isNaN(endTime)) {
                return res.status(400).json({ message: "Giờ bắt đầu hoặc giờ kết thúc không hợp lệ!" });
            }
    
            const newWorkSchedule = new WorkSchedule({
                ngayLam: new Date(ngayLam), // Đảm bảo ngày làm việc đúng định dạng
                gioBatDau: startTime,
                gioKetThuc: endTime,
                loaiCaTruc
            });
    
            const saveWorkSchedule = await newWorkSchedule.save();
            res.status(201).json({
                message: "Tạo lịch làm việc thành công",
                data: saveWorkSchedule
            });
        } catch (error) {
            console.error("Lỗi khi tạo lịch làm việc:", error);
            res.status(500).json({ message: "Lỗi server", error: error.message });
        }
    }
    

    // async updateWorkSchedule(req, res) {
    //     try {
    //         const workSchedule = await WorkSchedule.findByIdAndUpdate(req.params.id, req.body);
    //         if(!workSchedule) {
    //             return res.status(404).json({
    //                 message: 'workSchedule not found'
    //             })
    //         }
    //         const updateWorkSchedule = await WorkSchedule.findById(req.params.id);
    //         res.status(200).json({
    //             message: "UPDATE workSchedule SUCCESFULL",
    //             data: updateWorkSchedule
    //         })
    //     } catch (error) {
    //         res.status(400).json({
    //             message: error.message
    //         })
    //     }
    // }

    // async updateWorkSchedule(req, res) {
    //     try {
    //         // Chuyển đổi ngày và giờ thành đối tượng Date
    //         let { maNhanVien, ngayLam, gioBatDau, gioKetThuc, loaiCaTruc } = req.body;
    
    //         if (gioBatDau) {
    //             gioBatDau = new Date(`${ngayLam}T${gioBatDau}:00Z`); // Tạo Date với ngày + giờ bắt đầu
    //         }
    //         if (gioKetThuc) {
    //             gioKetThuc = new Date(`${ngayLam}T${gioKetThuc}:00Z`); // Tạo Date với ngày + giờ kết thúc
    //         }
    
    //         // Tìm và cập nhật
    //         const workSchedule = await WorkSchedule.findByIdAndUpdate(
    //             req.params.id,
    //             { maNhanVien, ngayLam, gioBatDau, gioKetThuc, loaiCaTruc },
    //             { new: true } // Trả về bản ghi mới sau khi cập nhật
    //         );
    
    //         if (!workSchedule) {
    //             return res.status(404).json({ message: 'WorkSchedule not found' });
    //         }
    
    //         res.status(200).json({
    //             message: "UPDATE WorkSchedule SUCCESSFUL",
    //             data: workSchedule
    //         });
    
    //     } catch (error) {
    //         res.status(400).json({ message: error.message });
    //     }
    // }

    async updateWorkSchedule(req, res) {
        try {
            let { ngayLam, gioBatDau, gioKetThuc, loaiCaTruc } = req.body;
    
            // Kiểm tra nếu `gioBatDau` và `gioKetThuc` tồn tại mới chuyển đổi
            if (gioBatDau && ngayLam) {
                gioBatDau = new Date(`${ngayLam}T${gioBatDau}:00`);
            }
            if (gioKetThuc && ngayLam) {
                gioKetThuc = new Date(`${ngayLam}T${gioKetThuc}:00`);
            }
    
            // Tìm và cập nhật
            const workSchedule = await WorkSchedule.findByIdAndUpdate(
                req.params.id,
                { ngayLam, gioBatDau, gioKetThuc, loaiCaTruc },
                { new: true }
            );
    
            if (!workSchedule) {
                return res.status(404).json({ message: 'WorkSchedule not found' });
            }
    
            res.status(200).json({
                message: "UPDATE WorkSchedule SUCCESSFUL",
                data: workSchedule
            });
    
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    
    
    
    async deleteWorkSchedule(req, res) {
        try {
            const workSchedule = await WorkSchedule.findByIdAndDelete(req.params.id);
            if(!workSchedule) {
                return res.status(404).json({
                    message: 'workSchedule not found'
                })
            }
            res.status(200).json({
                message: "DELETE workSchedule DONE",
                data: workSchedule
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

}

export default WorkScheduleController