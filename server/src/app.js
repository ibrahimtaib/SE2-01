// Configure Express App Instance
const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const saml = require('@node-saml/passport-saml');
const passport = require('passport');
const fs = require('fs');
const cors = require("cors");
const helmet = require("helmet");
const router = require("./routes/router");
const app = express();

//TODO: Put them in routes, for now trying to see if SAML2.0 auth works

const dotenv = require('dotenv');
dotenv.config(); // Load the environment variables

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

// Assign routes
app.use("/", router);



///** Login functions */
const samlStrategy = new saml.Strategy({
    entryPoint: "https://thesis-managment-01.eu.auth0.com/samlp/3FKY3CY8ZT5RpeywuUnpoexaqFdO9dup",
    path: "/login",
    issuer: "urn:thesis-managment-01.eu.auth0.com",
    cert: "MIIDGzCCAgOgAwIBAgIJMtT8gPeh5+BdMA0GCSqGSIb3DQEBCwUAMCsxKTAnBgNVBAMTIHRoZXNpcy1tYW5hZ21lbnQtMDEuZXUuYXV0aDAuY29tMB4XDTIzMTEyMzIyMDMwNVoXDTM3MDgwMTIyMDMwNVowKzEpMCcGA1UEAxMgdGhlc2lzLW1hbmFnbWVudC0wMS5ldS5hdXRoMC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC4pJWqPcVKeTneVx9D6cbUCllwlS1ySVUEhTz/bPGcPJyB+Oupd6CM8bpw8zpbEUwMdpOgFjKzVbHnBB07uTusX7QZthjlApRuwoScv0M/RUKDCQepaKD/s2USymdxGT4hr/BMfjW/edR2VZPbdlcqWRZIw3NTVXDaIR9tWwo2P+K8sv8KT5OtQpSQagsor/90xGaik2/xcIpYNuWrFva1pJUxyp95PzU+NKV9C5SqSIbnPntrI+F+HYL1diy1JaXmwEKDZzCBnhZZs9mUXddneEVol8pb9VSveAryANguyHzxFgafB4GLKBN/oqihaRA8oN1CJyjWbZGiSkvACQvZAgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFLmcU99dv82R5msXbeSz4fEoHlDGMA4GA1UdDwEB/wQEAwIChDANBgkqhkiG9w0BAQsFAAOCAQEAWnyOjbALyCmjyWXW+5KE9x+YjNwRiJJDYOy13d5Wcn2pV94w3E8//0iqxH4Z7UGq2bHxvP873bkXQAocLQ1wiNRcUn16wmm6eIM1WeubgVJdsehSpW8/Gpvk/4EvFH8adVQFrjPjiq6QKq0DQA2ptrB7GCK1SU9y9Ty99hxNb/d7uuCynr6NQTknAR8Ap7gyTuhisjq78sJjq93ecSfFMSRVzr6dI6fgT+O9sETCaTkz4nWl8O0fMcVPEjrucIrh60tksFTIYajCYHNybpJCsP/YlV+ybtFm4U2bBGAuyKn1HeUTN9BtbU0Pd1DbZvS/j1al7vFqW+sYzFOCR03GQw=="
  }, function(profile, done) {
      return done(null, profile);
  });



passport.serializeUser(function(user, done) {
    console.log('-----------------------------');
    console.log('serialize user');
    console.log(user);
    console.log('-----------------------------');
    done(null, user);
});passport.deserializeUser(function(user, done) {
    console.log('-----------------------------');
    console.log('deserialize user');
    console.log(user);
    console.log('-----------------------------');
    done(null, user);
});

app.get('/login/idp', passport.authenticate('saml2'));

app.post('/assert', 
  passport.authenticate('saml2', 
    { failureRedirect: `http://localhost:3000/?error=unauthenticated` } ),
    function(req, res) {
      const token = createToken(req.user)
      res.redirect(`http://localhost:3000/signinOK?token=${token}`);
    });

module.exports = app;
