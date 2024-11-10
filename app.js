const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const apiRoutes = require("./routes/api");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

// MongoDB connection (using environment variable)
const uri = process.env.MONGODB_URI || 'mongodb+srv://Muskan27:Msaroj27%40@cluster0.7gae2.mongodb.net/Kasturba_dseu?retryWrites=true&w=majority';

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB '))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use("/api", apiRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
