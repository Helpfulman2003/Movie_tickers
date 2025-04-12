import jwt from 'jsonwebtoken';
import createError from '../error.js';
import util from 'util';

const jwtVerify = util.promisify(jwt.verify);

const middleware = {
  // Xác thực token
  verifyToken: async (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      // Tách token từ chuỗi "Bearer <token>"
      const accessToken = token.split(' ')[1];
      try {
        const employee = await jwtVerify(accessToken, process.env.ACCESSTOKEN);
        req.employee = employee; // Gắn thông tin nhân viên vào request
        next();
      } catch (error) {
        next(createError(403, 'Token is not valid'));
      }
    } else {
      next(createError(401, 'You are not authenticated'));
    }
  },

  // Xác thực quyền admin
  verifyAdmin: async (req, res, next) => {
    try {
      const { role } = req.employee;
      if (role === 1) {
        // 1: Admin
        next();
      } else {
        next(createError(403, 'You do not have admin privileges'));
      }
    } catch (error) {
      next(createError(403, 'Authorization failed'));
    }
  },
};

export default middleware;
