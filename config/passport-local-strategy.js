const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");
const mongoose = require("mongoose");

//Using passport to authenticate

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async function (res, email, password, done) {
      try {
        // Finding user in the database
        const user = await User.findOne({ email: email });
        if (!user || user.password != password) {
          return done(null, false);
        }

        console.log(user.name);

        return done(null, user);
      } catch (err) {
        console.log("Error in passport-local-strategy file");
        return res.redirect("back");
      }
    }
  )
);

// Seriallize user using userid

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deseriallize user using the key in the cookie

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (error) {
    console.log("Error in finding the user ===> passport");
    return done(error);
  }
});

// Sending data of the current logged in user to the views

//Steps

//1: Check if user is authenticated

passport.checkAuthentication = function (req, res, next) {
  //If the user is signed in then pass request to next function (controller's action).
  if (req.isAuthenticated()) {
    return next();
  }

  // If the user is not signed in then redirect to sign in page
  console.log("User is not authenticated!");
  return res.redirect("/users/signin/");
};

//2: If user is authenticated then, just send user data to the views

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in users data from session's cookie
    // We are just sending it to locals for the views
    // const user = await User.findOne({ id: req.user });
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
