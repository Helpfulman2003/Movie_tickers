import express from "express";
import MovieController from "../controller/movies.js"


const moviesRouter = express.Router();

const movieController = new MovieController()
moviesRouter.get("/", movieController.getAllMovies)

moviesRouter.get("/:id", movieController.getMovieDetails)

moviesRouter.post("/", movieController.createMovie)

moviesRouter.put("/:id", movieController.updateMovie)

moviesRouter.delete("/:id", movieController.deleteMovie)

export default moviesRouter;