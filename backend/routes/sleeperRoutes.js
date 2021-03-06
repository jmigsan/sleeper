const express = require("express");
const router = express.Router();

const { test, test2, createSleepLog, getSleepLogs, getIfUserPublic, changeIfUserPublic, initSleeper, getPublicSleepersInfo, getSleeperName, getUserCash, investInSleeper, getUserPortfolio, sellSleeper, getUserPortfolioForOne } = require("../controllers/sleeperController");

router.get("/test1", test);
router.post("/test2", test2);

// router.get("/getPublicSleepers", getPublicSleepers);
router.get("/getPublicSleepersInfo", getPublicSleepersInfo);

router.post("/getSleepLogs", getSleepLogs);
router.post("/getIfUserPublic", getIfUserPublic);
// router.post("/getLastSleeperValue", getLastSleeperValue);
router.post("/getSleeperName", getSleeperName);
router.post("/getUserCash", getUserCash);
router.post("/getUserPortfolio", getUserPortfolio);
router.post("/getUserPortfolioForOne", getUserPortfolioForOne);

router.post("/createSleepLog", createSleepLog);
router.post("/changeIfUserPublic", changeIfUserPublic);
router.post("/initSleeper", initSleeper);
router.post("/investInSleeper", investInSleeper);
router.post("/sellSleeper", sellSleeper);

module.exports = router;