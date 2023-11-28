const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const saml = require('passport-saml');
const passport = require('passport');

const cors = require("cors");
const helmet = require("helmet");
const router = require("./routes/router");
const app = express();


const dotenv = require('dotenv');
dotenv.config(); 

const allowedOrigins = ['http://127.0.0.1:5173', 'http://localhost:5174', 'http://localhost:5173']; 

app.use(cors({origin: allowedOrigins, credentials:true}));

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({secret: 'iej3d213ode31dncjd', 
                 resave: false, 
                 saveUninitialized: true,}));

app.use(express.json({ limit: "50mb" }));

app.use(passport.initialize());
app.use(passport.session());

// Assign routes
app.use("/", router);


module.exports = app;
