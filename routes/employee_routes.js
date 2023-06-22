const express = require("express");
const router = express.Router();
const {
  postEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
} = require("../controller/employee_controller");
router.post("/post-employee", postEmployee);
router.get("/get-employees", getEmployees);
router.get("/get-employee/:id", getEmployee);
router.patch("/update-employee/:id", updateEmployee);
module.exports = router;
