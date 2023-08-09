const Organization = require("../models/organization_model");
const Employee = require("../models/empolyee_model");
const mongoose = require("mongoose");

exports.createEmployee = async (req, res) => {
  const { name, dob, phoneNumber, address, organization } = req.body;
  let existingOrganization;
  try {
    existingOrganization = await Organization.findById(organization);
  } catch (error) {
    return console.log(error);
  }
  if (!existingOrganization) {
    return res
      .status(400)
      .send({ message: "Unable to Find Organization by This Id" });
  }
  const employee = new Employee({
    name,
    dob,
    phoneNumber,
    address,
    organization,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await employee.save({ session });
    existingOrganization.employees.push(employee);
    await existingOrganization.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
  return res.status(200).send({ employee });
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("organization");
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve Employees" });
  }
};
exports.getAllEmployeesWithUniqueData = async (req, res) => {
  try {
    const employees = await Employee.find(
      { name: { $nin: ["Rajesh", "Manikandan"] } },
      { _id: 0, name: 1, organization: 1 }
    );
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve Employees" });
  }
};

exports.getSingleEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve Employee" });
  }
};

exports.updateSingleEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json("Updated Successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to Update Employee" });
  }
};
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json("Deleted Successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to Delete Employee" });
  }
};
