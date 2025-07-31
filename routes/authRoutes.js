const express = require("express");
const { signup, login, profile } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router()

router.post('/signup', signup)
router.post('/auth', login)
router.get('/profile', verifyToken, profile)

module.exports = router
