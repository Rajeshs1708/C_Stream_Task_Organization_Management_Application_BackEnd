const express = require("express");
const router = express.Router();
const {
  createEmployee,
  getAllEmployees,
  getSingleEmployee,
  updateSingleEmployee,
  deleteEmployee,
  getAllEmployeesWithUniqueData,
} = require("../controllers/employee_controller");

router.post("/create", createEmployee);
router.get("/getAll", getAllEmployees);
router.get("/getAllWithUniqueValue", getAllEmployeesWithUniqueData);
router.get("/getSingle/:id", getSingleEmployee);
router.put("/updateSingle/:id", updateSingleEmployee);
router.delete("/deleteSingle/:id", deleteEmployee);

module.exports = router;
