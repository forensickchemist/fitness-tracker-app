const express = require("express");
const { register, login, getUserDetails } = require("../controllers/user");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/details", protect, getUserDetails);

module.exports = router;
