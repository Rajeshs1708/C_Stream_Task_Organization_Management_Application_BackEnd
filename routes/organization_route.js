const express = require("express");
const router = express.Router();
const {
  createOrganization,
  getAllOrganization,
  getSingleOrganization,
  getAllOrganizationWithUniqueValue,
} = require("../controllers/organization_controller");

router.post("/create", createOrganization);
router.get("/getAll", getAllOrganization);
router.get("/getAllWithUnique", getAllOrganizationWithUniqueValue);
router.get("/getSingle/:id", getSingleOrganization);

module.exports = router;
