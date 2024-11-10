const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create a model using the schema
const User = mongoose.model('EMP', userSchema);

// Export the model to be used in other files
module.exports = User;
