import Employee from '../models/EmployeeModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '../utils/redis.js';
import createError from '../error.js';
import util from 'util';

const jwtVerify = util.promisify(jwt.verify);
const jwtSign = util.promisify(jwt.sign);

const authController = {
  login: async (req, res, next) => {
    try {
      const { tenDangNhap, matKhau } = req.body;
      console.log(tenDangNhap, matKhau);
      
      // Kiểm tra trong Redis
      let redisEmployee = await client.get('employee');
      if (redisEmployee) {
        const employee = JSON.parse(redisEmployee);
        if (employee.tenDangNhap !== tenDangNhap) {
          return next(createError(400, 'Incorrect username or password'));
        }
        const validPassword = bcrypt.compareSync(matKhau, employee.matKhau);
        if (!validPassword) {
          return next(createError(400, 'Incorrect username or password'));
        }
        const accessToken = jwt.sign(
          {
            employeeId: employee._id,
            role: employee.role,
            email: employee.email,
          },
          process.env.ACCESSTOKEN,
          { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
          {
            employeeId: employee._id,
            role: employee.role,
            email: employee.email,
          },
          process.env.REFRESHTOKEN,
          { expiresIn: '3600h' }
        );
        await client.set(`refreshToken:${employee._id}`, refreshToken);
        return res
          .status(200)
          .json({ success: true, employee, accessToken, refreshToken });
      }

      // Kiểm tra trong MongoDB
      const employee = await Employee.findOne({tenDangNhap});
      console.log(employee);
      if (!employee) {
        return next(createError(400, 'Incorrect username or password'));
      }
      const validPassword = bcrypt.compareSync(matKhau, employee.matKhau);
      if (!validPassword) {
        return next(createError(400, 'Incorrect username or password'));
      }

      const accessToken = jwt.sign(
        {
          employeeId: employee._id,
          role: employee.role,
          email: employee.email,
        },
        process.env.ACCESSTOKEN,
        { expiresIn: '30s' }
      );
      const refreshToken = jwt.sign(
        {
          employeeId: employee._id,
          role: employee.role,
          email: employee.email,
        },
        process.env.REFRESHTOKEN,
        { expiresIn: '3600h' }
      );
      await client.set(`refreshToken:${employee._id}`, refreshToken);
      await client.setEx('employee', 3600, JSON.stringify(employee));

      return res
        .status(200)
        .json({ success: true, employee, accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  },

  register: async (req, res, next) => {
    try {
      const { tenDangNhap, matKhau, email, soDienThoai, role } =
        req.body;

      // Kiểm tra email đã tồn tại
      const checkEmployee = await Employee.findOne({ email });
      if (checkEmployee) {
        return next(createError(403, 'The email is already in use'));
      }

      // Mã hóa mật khẩu
      const hash = bcrypt.hashSync(matKhau, 10);
      const newEmployee = await Employee.create({
        tenDangNhap,
        matKhau: hash,
        email,
        soDienThoai,
        role: role || 0, // Mặc định là người dùng thông thường
      });

      return res.status(201).json({ success: true, newEmployee });
    } catch (error) {
      next(error);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { id } = req.body;
      const token = await client.get(`refreshToken:${id}`);
      if (!token) {
        return next(createError(404, 'Refresh token not found'));
      }

      let employee = await jwtVerify(token, process.env.REFRESHTOKEN);
      if ('exp' in employee) {
        delete employee.exp;
      }
      employee = { ...employee, iat: Math.floor(Date.now() / 1000) };

      const accessToken = await jwtSign(employee, process.env.ACCESSTOKEN, {
        expiresIn: '60s',
      });
      const refreshToken = await jwtSign(employee, process.env.REFRESHTOKEN, {
        expiresIn: '3600h',
      });

      await client.set(`refreshToken:${id}`, refreshToken);

      return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res, next) => {
    try {
      const { employeeId } = req.employee;
      await client.del(`refreshToken:${employeeId}`);
      res.json({ status: 'OK', message: 'Logged out!' });
    } catch (error) {
      next(error);
    }
  },

  updateEmployee: async (req, res, next) => {
    try {
      const { employeeId } = req.employee;
      const { tenDangNhap, email, soDienThoai, diaChi } = req.body;

      const employee = await Employee.findById(employeeId);
      if (!employee) {
        return next(createError(404, 'Employee not found'));
      }

      employee.tenDangNhap = tenDangNhap || employee.tenDangNhap;
      employee.email = email || employee.email;
      employee.soDienThoai = soDienThoai || employee.soDienThoai;
      employee.diaChi = diaChi || employee.diaChi;

      await employee.save();

      return res
        .status(200)
        .json({ success: true, message: 'Update success', employee });
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
