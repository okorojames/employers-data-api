const AdminSchema = require("../model/employee_model");
const bcrypt = require("bcrypt");

// reg controller
const registerController = async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;
  try {
    if (!firstName || !lastName || !phone || !email || !password) {
      return res.status(400).json({ msg: "Please, input all details" });
    } else {
      const adminInfo = new AdminSchema({
        firstName,
        lastName,
        phone,
        email,
        password,
      });

      const adminEmail = AdminSchema.findOne({ email });
      if (adminEmail)
        return res.status(400).json({ msg: "Email already exist" });
      // else
      const salt = await bcrypt.genSalt(10);
      adminInfo.password = await bcrypt.hash(password, salt);
      await adminInfo.save();
      return res.status(201).json(adminInfo);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err });
  }
};

//login auth
const loginAuth = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminSchema.findOne({ email });
    if (!admin)
      return res.status(400).json({ msg: "Login credentials not valid" });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      return res.status(200).json(admin);
    } else {
      return res.status(400).json({ msg: "Login credentials no valid" });
    }
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

//
module.exports = { registerController, loginAuth };
