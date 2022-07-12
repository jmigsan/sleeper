const express = require("express");
const router = express.Router();

const { test, test2, createSleepLog, getSleepLogs } = require("../controllers/sleeperController");

router.get("/test1", test);
router.post("/test2", test2);

router.post("/getSleepLogs", getSleepLogs)

router.post("/createSleepLog", createSleepLog);

module.exports = router;