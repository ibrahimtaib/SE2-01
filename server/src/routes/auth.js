const router = require("express").Router();
const { generateToken } = require("../controllers/token.js");

router.post("/login", async (req, res) => {
  const { email, id } = req.body;
  const token = await generateToken(email, id);
  if (!token) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  return res.status(200).json({ token: token });
});

module.exports = router;
