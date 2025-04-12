import Ticket from '../models/TicketModel.js';

class TicketController {
  async thuVe(req, res, next) {
    try {
      const maVe = req.params.id; // Lấy mã vé từ tham số URL
      //const trangThai  = req.body ?? "Đã sử dụng"; // Lấy trạng thái mới từ body request
      const trangThai = "Đã sử dụng"; // Trạng thái mới được gửi từ client
      // Tìm vé theo mã vé
      const ticket = await Ticket.findById(maVe);
      if (!ticket) {
        return next(createError(404, 'Vé không tồn tại'));
      }
  
      // Kiểm tra trạng thái hiện tại của vé
      if (ticket.trangThai === 'Đã sử dụng' && trangThai === 'Đã sử dụng') {
        return next(createError(400, 'Vé đã được sử dụng'));
      }
      if (ticket.trangThai === 'Hủy' && trangThai === 'Hủy') {
        return next(createError(400, 'Vé đã bị hủy'));
      }
  
      // Cập nhật trạng thái vé
      ticket.trangThai = trangThai; // Trạng thái mới được gửi từ client
      await ticket.save();
  
      return res.status(200).json({
        success: true,
        message: `Vé đã được cập nhật trạng thái thành "${trangThai}"`,
        data: ticket,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllTickets(req, res) {
    try {
      const tickets = await Ticket.find()
        .populate({
          path: "maSuatChieu", // Lấy dữ liệu từ MovieScreenings
          populate: [
            { path: "maPhim", model: "Movie" }, // Lấy dữ liệu từ MovieModel
            { path: "maPhong", model: "Room" }, // Lấy dữ liệu từ RoomModel
          ],
        })
        .populate("maNhanVien"); // Lấy dữ liệu từ EmployeeModel

      res.status(200).json({
        message: "GET ALL tickets DONE",
        data: tickets,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async getTicketDetails(req, res) {
    try {
      const ticket = await Ticket.findById(req.params.id)
        .populate('maSuatChieu') // Lấy dữ liệu từ MovieScreenings
        .populate('maNhanVien'); // Lấy dữ liệu từ Employees

      if (!ticket) {
        return res.status(404).json({
          message: 'Ticket not found',
        });
      }

      res.status(200).json({
        message: 'GET ticket details DONE',
        data: ticket,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async createTicket(req, res) {
    const newTicket = new Ticket(req.body);
    const saveTicket = await newTicket.save();
    res.status(201).json({
      message: 'create ticket successfull',
      data: saveTicket,
    });
  }

  async updateTicket(req, res) {
    try {
      const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body);
      if (!ticket) {
        return res.status(404).json({
          message: 'ticket not found',
        });
      }
      const updateTicket = await Ticket.findById(req.params.id);
      res.status(200).json({
        message: 'UPDATE ticket SUCCESFULL',
        data: updateTicket,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async deleteTicket(req, res) {
    try {
      const ticket = await Ticket.findByIdAndDelete(req.params.id);
      if (!ticket) {
        return res.status(404).json({
          message: 'ticket not found',
        });
      }
      res.status(200).json({
        message: 'DELETE ticket DONE',
        data: ticket,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default TicketController;
