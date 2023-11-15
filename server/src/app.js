// Configure Express App Instance
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const router = require("./routes/router");
const app = express();

const dotenv = require('dotenv');
dotenv.config(); // Load the environment variables

const allowedOrigins = ['http://127.0.0.1:5173', 'http://localhost:5174']; //Changed it to make it work

app.use(cors({origin: allowedOrigins, credentials:true}));

app.use(helmet());
app.use(express.json({ limit: "50mb" }));
// Assign routes
app.use("/", router);

module.exports = app;
