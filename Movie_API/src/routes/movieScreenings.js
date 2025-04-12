import express from "express";
import MovieScreeningController from "../controller/movieScreenigs.js"


const MovieScreeningRouter = express.Router();

const movieScreeningController = new MovieScreeningController()
MovieScreeningRouter.get("/", movieScreeningController.getAllMovieScreenigs)

MovieScreeningRouter.get("/:id", movieScreeningController.getMovieScreenigDetails)

MovieScreeningRouter.post("/", movieScreeningController.createMovieScreenig)

MovieScreeningRouter.put("/:id", movieScreeningController.updateMovieScreening)

MovieScreeningRouter.delete("/:id", movieScreeningController.deleteMovieScreening)

export default MovieScreeningRouter;