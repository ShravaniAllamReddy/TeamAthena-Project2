// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const router = require("express").Router();

router.post("/login", passport.authenticate("local"), function (req, res) {
  // Sending back a password, even a hashed password, isn't a good idea
  res.json({
    email: req.user.email,
    id: req.user.id,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    gender: req.user.gender,
    phone: req.user.phone,
    age: req.user.age
  });
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/signup", function (req, res) {
  db.User.create(req.body)
    .then(function () {
      res.redirect(307, "/auth/login");
    })
    .catch(function (err) {
      res.status(401).json(err);
    });
});

// Route for logging user out
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

// Route for getting some data about our user to be used client side
router.get("/user_data", function (req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      gender: req.user.gender,
      phone: req.user.phone,
      age: req.user.age
    });
  }
});

module.exports = router;
