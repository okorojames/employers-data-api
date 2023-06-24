const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const db = require("./config/dbConfig");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/employee_routes");
const adminRoutes = require("./routes/authRoutes");

// middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/employees", routes);
app.use("/api/auth", adminRoutes);

// app listening
app.listen(PORT, () => {
  db.connectDB();
});
