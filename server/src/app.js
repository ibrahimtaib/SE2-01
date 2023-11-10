// Configure Express App Instance
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const router = require("./routes/router.js");
const app = express();

app.use(cors({origin:'http://127.0.0.1:5174', credentials:true}));

app.use(helmet());
app.use(express.json({ limit: "50mb" }));
// Assign routes
app.use("/", router);

module.exports = app;
