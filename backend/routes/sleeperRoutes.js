const express = require("express");
const router = express.Router();

const { test, test2, createSleepLog, createEmptySleepLog, getSleepLogs } = require("../controllers/sleeperController");

router.get("/", test);

router.post("/getSleepLogs", getSleepLogs)

router.post("/createSleepLog", createSleepLog);
router.post("/createEmptySleepLog", createEmptySleepLog);

module.exports = router;