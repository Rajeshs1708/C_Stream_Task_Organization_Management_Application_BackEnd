const express = require("express");
const router = express.Router();
const {
  createEmployee,
  getAllEmployees,
  getSingleEmployee,
} = require("../controllers/employee_controller");

router.post("/create", createEmployee);
router.get("/getAll", getAllEmployees);
router.get("/getSingle/:id", getSingleEmployee);

module.exports = router;
