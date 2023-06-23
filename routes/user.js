const express = require("express");

const { authenticate } = require("passport");
const passport = require("passport");

const router = express.Router();

const userController = require("../controllers/userController");
// router.get("/", userController.signin);
router.get("/signin/", userController.signin);
router.get("/signup/", userController.signup);
router.post("/create/", userController.create);

router.post(
  "/create-session/",
  passport.authenticate("local", { failureRedirect: "/users/signin/" }),
  userController.createSession
);

// Destroy session
router.get("/sign-out", userController.destroySession);

module.exports = router;
