import Employee from '../models/EmployeeModel.js';

class EmployeeController {
    async getAllemployee(req, res) {
        try {
            const employees = await Employee.find();
            res.status(200).json({
                message: "GET ALL employees DONE",
                data: employees
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
    async getEmployeeDetails(req, res) {
        try {
            const employee = await Employee.findById(req.params.id)
            
            if(!employee) {
                return res.status(404).json({
                    message: 'employee not found'
                })
            }
            res.status(200).json({
                message: "GET ALL employee DONE",
                data: employee
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

    async createEmployee(req, res) {
        const newEmployee = new Employee(req.body);
        const saveEmployee = await newEmployee.save()
        res.status(201).json({
            message: 'create employee successfull',
            data: saveEmployee
        })
    }

    async updateEmployee(req, res) {
        try {
            const employee = await Employee.findByIdAndUpdate(req.params.id, req.body);
            if(!employee) {
                return res.status(404).json({
                    message: 'employee not found'
                })
            }
            const updateEmployee = await Employee.findById(req.params.id);
            res.status(200).json({
                message: "UPDATE employee SUCCESFULL",
                data: updateEmployee
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

    async deleteEmployee(req, res) {
        try {
            const employee = await Employee.findByIdAndDelete(req.params.id);
            if(!employee) {
                return res.status(404).json({
                    message: 'employee not found'
                })
            }
            res.status(200).json({
                message: "DELETE employee DONE",
                data: employee
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

}

export default EmployeeController