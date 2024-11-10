const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let otp = ""; // Variable to store the generated OTP

// Route to send OTP
app.post("/api/send-otp", (req, res) => {
    const { email } = req.body;
    
    // Generate OTP
    otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Nodemailer transport configuration
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "your-email@gmail.com", // Your Gmail address
            pass: "your-app-password",    // App password for your Gmail account (make sure to use 2FA)
        },
    });

    // Mail options
    const mailOptions = {
        from: "your-email@gmail.com",
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is: ${otp}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: "Failed to send OTP" });
        }
        res.json({ otp: otp }); // Send OTP back to client for comparison
    });
});

// Route to verify OTP (optional if needed)
app.post("/api/verify-otp", (req, res) => {
    const { enteredOtp } = req.body;

    if (enteredOtp === otp) {
        res.json("OTP verified successfully!");
    } else {
        res.status(400).json("Incorrect OTP");
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
document.getElementById("registerButton").addEventListener("click", function () {
    window.location.href = "home.html"; // Redirect to home.html
});
