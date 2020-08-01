const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const bcrypt = require("bcrypt");

router.get("/auth", auth, (req, res) => {});

router.post("/register", (req, res) => {});

router.post("/login", (req, res) => {});

router.get("/logout", auth, (req, res) => {});

module.exports = router;
