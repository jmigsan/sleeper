const express = require("express");
const router = express.Router();

const { test } = require("../controllers/sleeperController");

router.get("/", test);

module.exports = router;