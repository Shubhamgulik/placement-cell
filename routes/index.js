const express = require("express");
const passport = require("passport");

const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const csvController = require("../controllers/csvController");

router.get("/", passport.checkAuthentication, dashboardController.dashboard);
router.get(
  "/download",
  passport.checkAuthentication,
  csvController.downloadCsv
);
router.use("/users", require("./user"));
router.use("/interview", passport.checkAuthentication, require("./interview"));
router.use("/student", passport.checkAuthentication, require("./student"));
module.exports = router;
