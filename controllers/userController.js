const User = require("../models/user");
// Load Sign Up page
module.exports.signup = function (req, res) {
  // if(req.isAuthenticated()){
  //     return res.redirect('/users/profile/');
  // }
  return res.render("signup", {
    title: "Sign Up",
  });
};

// Load Sign In page
module.exports.signin = function (req, res) {
  // if(req.isAuthenticated()){
  //     return res.redirect('/users/profile/');
  // }

  return res.render("signin", {
    title: "Sign In",
  });
};

// Four Steps of authentication

// 1: Create User (Sign UP) / Get the signUp data
module.exports.create = async function (req, res) {
  console.log("Body : ", req.body);
  try {
    if (req.body.password != req.body.confirm_password) {
      console.log(req.body.password != req.body.confirm_password);
      console.log("Passwords are not matching...");
      return res.redirect("back");
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      await User.create(req.body);
      return res.redirect("/users/signin/");
    } else {
      console.log("User Already Exists.");
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Error in sign up : ", error);
    return;
  }
};

// 2: Create Session (Sign In)
module.exports.createSession = function (req, res) {
  // req.flash("success", "Logged in successfully!!");
  return res.redirect("/");
};

// 3: Show details of signed in user on profile page

// 4: Sign out

module.exports.destroySession = function (req, res) {
  // This function is made Asynchrous in latest Release.
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect("/");
  });

  // req.logout();
  // return res.redirect('/');
};
