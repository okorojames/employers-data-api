const mongoose = require("mongoose");
const EmployeeSchema = require("../model/employee_model");

//post employe controller
const postEmployee = async (req, res) => {
  const { firstName, lastName, phone, email } = req.body;
  const email_regex =
    /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+\.([a-zA-Z0-9-]{1,5})$/;
  try {
    if (!firstName || !lastName || !phone || !email) {
      return res.status(400).json({ msg: "please fill in all details" });
    } else if (!email_regex.test(email)) {
      return res
        .status(400)
        .json({ msg: "Please make sure email is valid..." });
    } else {
      const employee = new EmployeeSchema({
        firstName,
        lastName,
        phone,
        email,
      });
      await employee.save();
      return res.status(201).json({ employee });
    }
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

// getting all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await EmployeeSchema.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: "Success",
      results: employees.length,
      data: employees,
    });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

// getting single employee
const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    if ((await EmployeeSchema.findById(id)) === null) {
      return res.status(400).json({ msg: "Please enter a valid id" });
    } else if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ json: "please enter a valid id" });
    } else {
      const employee = await EmployeeSchema.findById(id);
      res.status(200).json(employee);
    }
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

// deleting employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await EmployeeSchema.findByIdAndDelete(id);
    return res.status(200).json({ msg: "employee info deleted." });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

//updating employee
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const updated_emplyee = await EmployeeSchema.findByIdAndUpdate(id, {
      ...req.body,
      new: true,
    });
    return res.status(200).json(updated_emplyee);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

// export the controllers
module.exports = {
  postEmployee,
  getEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
};
