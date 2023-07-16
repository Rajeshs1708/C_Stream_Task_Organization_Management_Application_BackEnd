require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { db } = require("./db/index");
const organizationRoutes = require("./routes/organization_route");
const employeeRoutes = require("./routes/employee_route");

db();
app.use(cors());
app.use(express.json());

app.use("/api/organizations", organizationRoutes);
app.use("/api/employees", employeeRoutes);
app.get("/", (req, res) => {
  res.send("<h2>Organization and Empolyee Management Application</h2>");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening to localhost ${PORT}`);
});
