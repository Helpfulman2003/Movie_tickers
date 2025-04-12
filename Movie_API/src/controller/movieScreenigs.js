import mongoose from 'mongoose';
import MovieScreening from '../models/MovieScreeningsModel.js';

class MovieScreeningController {
  async getAllMovieScreenigs(req, res) {
    try {
      let { movieId } = req.query; // Sử dụng let thay vì const để có thể gán lại giá trị
      let movieScreenings;


      if (movieId) {
        // Kiểm tra và chuyển đổi movieId thành ObjectId
        if (!mongoose.Types.ObjectId.isValid(movieId)) {
          return res.status(400).json({
            message: 'Invalid movieId',
          });
        }

        movieScreenings = await MovieScreening.find({
          maPhim:new mongoose.Types.ObjectId(movieId)
        });
      } else {
        movieScreenings = await MovieScreening.find();
      }

      res.status(200).json({
        message: 'GET MovieScreenings DONE',
        data: movieScreenings,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async getMovieScreenigDetails(req, res) {
    try {
      const movieScreening = await MovieScreening.findById(req.params.id);

      if (!movieScreening) {
        return res.status(404).json({
          message: 'MovieScreening not found',
        });
      }

      res.status(200).json({
        message: 'GET ALL MovieScreening DONE',
        data: movieScreening,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async createMovieScreenig(req, res) {
    const newMovieScreening = new MovieScreening(req.body);
    const saveMovieScreening = await newMovieScreening.save();
    res.status(201).json({
      message: 'create MovieScreening successfull',
      data: saveMovieScreening,
    });
  }

  async updateMovieScreening(req, res) {
    try {
      const movieScreening = await MovieScreening.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (!movieScreening) {
        return res.status(404).json({
          message: 'MovieScreening not found',
        });
      }
      const updateMovieScreening = await MovieScreening.findById(req.params.id);
      res.status(200).json({
        message: 'UPDATE MovieScreening SUCCESFULL',
        data: updateMovieScreening,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async deleteMovieScreening(req, res) {
    try {
      const movieScreening = await MovieScreening.findByIdAndDelete(
        req.params.id
      );
      if (!movieScreening) {
        return res.status(404).json({
          message: 'MovieScreening not found',
        });
      }
      res.status(200).json({
        message: 'DELETE MovieScreening DONE',
        data: movieScreening,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default MovieScreeningController;
