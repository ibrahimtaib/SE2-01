// Configure Express App Instance
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const router = require("./routes/router");
const app = express();

const dotenv = require('dotenv');
dotenv.config(); // Load the environment variables


app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
// Assign routes
app.use("/", router);

module.exports = app;
