import express from "express";
import WorkScheduleController from "../controller/workSchedule.js"


const WorkScheduleRouter = express.Router();

const workScheduleController = new WorkScheduleController()
WorkScheduleRouter.get("/", workScheduleController.getAllWorkSchedules)

WorkScheduleRouter.get("/:id", workScheduleController.getWorkScheduleDetails)

WorkScheduleRouter.post("/", workScheduleController.createWorkSchedule)

WorkScheduleRouter.put("/:id", workScheduleController.updateWorkSchedule)

WorkScheduleRouter.delete("/:id", workScheduleController.deleteWorkSchedule)

export default WorkScheduleRouter;