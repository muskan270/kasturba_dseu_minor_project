const express = require("express");
const router = express.Router();
const User = require("../models/user"); // Assuming you have a User model in '../models/user.js'
const { sendOtp, verifyOtp } = require("../controllers/emailController");

// Route to send OTP
router.post("/send-otp", sendOtp);

// Route to verify OTP
router.post("/verify-otp", verifyOtp);
// Example route: Create a new user (employee)
router.post("/employee", async (req, res) => {
  try {
    const newUser = new User(req.body); // Assuming req.body contains necessary fields like name, email, etc.
    await newUser.save(); // Save the new user to the database
    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding employee: " + error.message });
  }
});

// Example route: Fetch all employees (users)
router.get("/employees", async (req, res) => {
  try {
    const employees = await User.find(); // Fetch all users from the database
    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching employees: " + error.message });
  }
});

// Example route: Get a specific employee by ID
router.get("/employee/:id", async (req, res) => {
  try {
    const employee = await User.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching employee: " + error.message });
  }
});

// Example route: Delete an employee by ID
router.delete("/employee/:id", async (req, res) => {
  try {
    const employee = await User.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting employee: " + error.message });
  }
});

module.exports = router;
