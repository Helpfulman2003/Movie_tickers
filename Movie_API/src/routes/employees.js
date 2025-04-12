import express from "express";
import EmployeeController from "../controller/employees.js"


const EmployeeRouter = express.Router();

const employeeController = new EmployeeController()
EmployeeRouter.get("/", employeeController.getAllemployee)

EmployeeRouter.get("/:id", employeeController.getEmployeeDetails)

EmployeeRouter.post("/", employeeController.createEmployee)

EmployeeRouter.put("/:id", employeeController.updateEmployee)

EmployeeRouter.delete("/:id", employeeController.deleteEmployee)

export default EmployeeRouter;