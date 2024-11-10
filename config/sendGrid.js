const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SAND_GRID_API_KEY);

module.exports = sgMail;
