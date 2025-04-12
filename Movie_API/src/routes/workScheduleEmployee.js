import express from "express";
import WorkScheduleEmployeeController from "../controller/workScheduleEmployee.js"


const WorkScheduleEmployeeRouter = express.Router();

const workScheduleEmployeeController = new WorkScheduleEmployeeController()
WorkScheduleEmployeeRouter.get("/", workScheduleEmployeeController.getAllWorkScheduleEmployee)

WorkScheduleEmployeeRouter.get("/:id", workScheduleEmployeeController.getWorkScheduleEmployeeDetails)

WorkScheduleEmployeeRouter.post("/", workScheduleEmployeeController.createWorkScheduleEmployee)

WorkScheduleEmployeeRouter.put("/:id", workScheduleEmployeeController.updateWorkScheduleEmployee)

WorkScheduleEmployeeRouter.delete("/:id", workScheduleEmployeeController.deleteWorkScheduleEmployee)

export default WorkScheduleEmployeeRouter;