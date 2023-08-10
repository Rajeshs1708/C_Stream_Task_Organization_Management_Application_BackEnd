const Organization = require("../models/organization_model");
const Employee = require("../models/empolyee_model");

exports.createOrganization = async (req, res) => {
  try {
    const { name, registrationDate, address } = req.body;
    const organization = await Organization.create({
      name,
      registrationDate,
      address,
      employees: [],
    });
    res.status(201).json(organization);
  } catch (error) {
    res.status(500).json({ error: "Failed to create organization" });
  }
};

exports.getAllOrganization = async (req, res) => {
  try {
    const organizations = await Organization.find().populate("employees");
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ status: "fail", messgae: error.message });
  }
};

exports.getAllOrganizationWithUniqueValue = async (req, res) => {
  try {
    const organizations = await Organization.find(
      { $or: [{ name: "Microsoft" }, { address: "No 5, USA" }] },
      { _id: false, name: true, employees: true, address: true }
    );
    // .populate("Employees")
    if (organizations.length == 0) {
      res.json("Can't Find the Document");
    }
    res.json(organizations);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getSingleOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id).populate(
      "employees"
    );
    // .populate(
    //   "Employees"
    // );
    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }
    res.json(organization);
  } catch (error) {
    res.status(500).json(error);
  }
};
