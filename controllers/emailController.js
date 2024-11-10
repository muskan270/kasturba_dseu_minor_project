const sgMail = require("../config/sendGrid");
const crypto = require("crypto"); // For generating a random OTP
const OTP_STORE = {}; // Temporary storage for OTPs (use a database in production)

// Send OTP to email
const sendOtp = async (req, res) => {
  const { email } = req.body;

  // Generate a random OTP
  const otp = crypto.randomInt(100000, 999999).toString();
  OTP_STORE[email] = otp; // Store the OTP temporarily

  const msg = {
    to: email,
    from: "khushi2006k@gmail.com",
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
    html: `<strong>Your OTP code is ${otp}. It is valid for 10 minutes.</strong>`,
  };

  try {
    await sgMail.send(msg);
    res.send("OTP sent to your email!");
  } catch (error) {
    console.error(error); // Log error for debugging
    if (error.response) {
      console.error(error.response.body); // Log specific SendGrid error
    }
    res.status(500).send("Failed to send OTP.");
  }
};

// Verify OTP
const verifyOtp = (req, res) => {
  const { otp } = req.body;
  const email = Object.keys(OTP_STORE).find(
    (email) => OTP_STORE[email] === otp
  );

  if (email) {
    delete OTP_STORE[email]; // Remove the OTP after verification
    res.send("OTP verified successfully!");
  } else {
    res.send("Invalid OTP. Please try again.");
  }
};

module.exports = { sendOtp, verifyOtp };
