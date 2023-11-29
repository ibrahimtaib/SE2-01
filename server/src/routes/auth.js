const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const saml = require("passport-saml");
const app = require("../app")
const authController = require("../controllers/auth.js")


const samlStrategy = new saml.Strategy({
    entryPoint: "https://thesis-managment-01.eu.auth0.com/samlp/3FKY3CY8ZT5RpeywuUnpoexaqFdO9dup",
    path: "/login",
    issuer: "urn:thesis-managment-01.eu.auth0.com",
    acceptedClockSkewMs: 1000, //FIXME: I thought this opened up a possibility of replay attack but it seems it doesn't,it's needed because of unexpected timestamp synchronization errors on the server.
    cert: "MIIDGzCCAgOgAwIBAgIJMtT8gPeh5+BdMA0GCSqGSIb3DQEBCwUAMCsxKTAnBgNVBAMTIHRoZXNpcy1tYW5hZ21lbnQtMDEuZXUuYXV0aDAuY29tMB4XDTIzMTEyMzIyMDMwNVoXDTM3MDgwMTIyMDMwNVowKzEpMCcGA1UEAxMgdGhlc2lzLW1hbmFnbWVudC0wMS5ldS5hdXRoMC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC4pJWqPcVKeTneVx9D6cbUCllwlS1ySVUEhTz/bPGcPJyB+Oupd6CM8bpw8zpbEUwMdpOgFjKzVbHnBB07uTusX7QZthjlApRuwoScv0M/RUKDCQepaKD/s2USymdxGT4hr/BMfjW/edR2VZPbdlcqWRZIw3NTVXDaIR9tWwo2P+K8sv8KT5OtQpSQagsor/90xGaik2/xcIpYNuWrFva1pJUxyp95PzU+NKV9C5SqSIbnPntrI+F+HYL1diy1JaXmwEKDZzCBnhZZs9mUXddneEVol8pb9VSveAryANguyHzxFgafB4GLKBN/oqihaRA8oN1CJyjWbZGiSkvACQvZAgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFLmcU99dv82R5msXbeSz4fEoHlDGMA4GA1UdDwEB/wQEAwIChDANBgkqhkiG9w0BAQsFAAOCAQEAWnyOjbALyCmjyWXW+5KE9x+YjNwRiJJDYOy13d5Wcn2pV94w3E8//0iqxH4Z7UGq2bHxvP873bkXQAocLQ1wiNRcUn16wmm6eIM1WeubgVJdsehSpW8/Gpvk/4EvFH8adVQFrjPjiq6QKq0DQA2ptrB7GCK1SU9y9Ty99hxNb/d7uuCynr6NQTknAR8Ap7gyTuhisjq78sJjq93ecSfFMSRVzr6dI6fgT+O9sETCaTkz4nWl8O0fMcVPEjrucIrh60tksFTIYajCYHNybpJCsP/YlV+ybtFm4U2bBGAuyKn1HeUTN9BtbU0Pd1DbZvS/j1al7vFqW+sYzFOCR03GQw==",
}, function (profile, done) {
    return done(null, profile);
});
passport.use("samlStrategy", samlStrategy);

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        return next();

    return res.status(401).json({ error: 'Not authenticated' });
}

    router.post(
        "/checkAuth", async (req, res) => {
            //TODO: Substitute it with the userID passed after SAML authentication
            authController.
                checkUser(req.body.id)
                .then((obj) => {
                    res.status(200).json(obj)
                })
                .catch((error) => {
                    res.status(418).json(error) 
                });
        }
    );


router.get(
    "/login",
    function (req, res, next) {
        console.log("-----------------------------");
        console.log("/Start login handler");
        next();
    },
    passport.authenticate("samlStrategy")
);

router.get('/sessions/current', (req, res) => {
    if (req.isAuthenticated()) {
        authController.
        checkUser(req.user.attributes['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])
        .then((obj) => {
            res.status(200).json(obj)
        })
        .catch((error) => {
            res.status(402).json(error) 
        });
    }
    else
      res.status(401).json({ error: 'Unauthenticated user!' });;
  });


router.post(
    "/login",
    function (req, res, next) {
        console.log("-----------------------------");
        console.log("/Start login callback");
        next();
    },
    passport.authenticate("samlStrategy"),
    function (req, res) {
        console.log("-----------------------------");
        console.log("login call back dumps");
        console.log(req.user);
        console.log("-----------------------------");
        res.redirect('http://localhost:5173/idp/profile/SAML2/Redirect?user=' + encodeURIComponent(req.user.attributes['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']) + '&&userID=' + encodeURIComponent(req.user.attributes['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']));
    }
);



router.get('/authenticated-test-route', isLoggedIn, (req, res) => {
    res.send('Authenticated Route');
});

// Send the logout response to the Identity Provider
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.end();
    });
});

passport.serializeUser(function (user, done) {
    console.log("-----------------------------");
    console.log("serialize user");
    console.log(user);
    console.log("-----------------------------");
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    console.log("-----------------------------");
    console.log("deserialize user");
    console.log(user);
    console.log("-----------------------------");
    done(null, user);
});

module.exports = router;
