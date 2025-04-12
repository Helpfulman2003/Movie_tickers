import Movie from '../models/MovieModel.js'

class MovieController {
    async getAllMovies(req, res) {
        try {
            const movies = await Movie.find();
            res.status(200).json({
                message: "GET ALL MOVIES DONE",
                data: movies
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
    async getMovieDetails(req, res) {
        try {
            const movie = await Movie.findById(req.params.id);
            if(!movie) {
                return res.status(404).json({
                    message: 'Movie not found'
                })
            }
            res.status(200).json({
                message: "GET ALL DETAIL DONE",
                data: movie
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

    async createMovie(req, res) {
        const newMovie = new Movie(req.body);
        const saveMovie = await newMovie.save()
        // Movie.create({
        //     tenPhim: "One piece"
        // })
        res.status(201).json({
            message: 'create movie successfull',
            data: saveMovie
        })
    }

    async updateMovie(req, res) {
        try {
            const movie = await Movie.findByIdAndUpdate(req.params.id, req.body);
            if(!movie) {
                return res.status(404).json({
                    message: 'Movie not found'
                })
            }
            const updateMovie = await Movie.findById(req.params.id);
            res.status(200).json({
                message: "UPDATE MOVIE SUCCESFULL",
                data: updateMovie
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

    async deleteMovie(req, res) {
        try {
            const movie = await Movie.findByIdAndDelete(req.params.id);
            if(!movie) {
                return res.status(404).json({
                    message: 'Movie not found'
                })
            }
            res.status(200).json({
                message: "DELETE MOVIE DONE",
                data: movie
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

}

export default MovieController