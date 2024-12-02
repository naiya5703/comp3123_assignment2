const Employee = require('../models/Employee');

// Add Employee
exports.addEmployee = async (req, res) => {
  const { firstName, lastName, email, department, position } = req.body;

  try {
    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      department,
      position,
    });
    await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully', newEmployee });
  } catch (error) {
    res.status(500).json({ message: 'Error adding employee', error });
  }
};

// Get All Employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error });
  }
};

// Get Employee by ID
exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error });
  }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, department, position } = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { firstName, lastName, email, department, position },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee updated successfully', updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error });
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error });
  }
};