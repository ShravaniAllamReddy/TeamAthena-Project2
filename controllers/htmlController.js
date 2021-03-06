// Requiring path to so we can use relative routes to our HTML files
const router = require("express").Router();
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

/**
 * Home Page
 */
router.get("/", function(req, res) {
  res.render("login", { user: req.user });
});

/**
 * Home Page, again 
 */
router.get("/home", function(req, res) {
  res.render("login", { user: req.user });
});

/** 
 * Signup page
 */
router.get("/signup", function(req, res) {
  if (req.user) {
    res.redirect("/user");
  } else {
    res.render("signup", { user: req.user });
  }
});

/**
 * Login page
 */
router.get("/login", function(req, res) {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("login", { user: req.user });
  }
});

/**
 * Activity Page - 
 * Notice loading our Activities, with that include!
 */
router.get("/activity", isAuthenticated, function(req, res) {
  db.Activity.findAll({ raw: true, include: [db.User] }) // Joins User to Activities! And scrapes all the seqeulize stuff off
    .then(dbModel => {
      res.render("activity", { user: req.user, activities: dbModel });
    })
    .catch(err => res.status(422).json(err));
});

// to get the user profile information
router.get("/user",isAuthenticated, function(req, res) {
  
    res.render("user", { user: req.user });
  
});

// to get the all the activities posted by different users
router.get("/current", isAuthenticated, function(req, res) {
  db.Activity.findAll({ raw: true, include: [db.User] }) // Joins User to Activities! And scrapes all the seqeulize stuff off
    .then(dbModel => {
      res.render("current", { user: req.user, activities: dbModel });
    })
    .catch(err => res.status(422).json(err));
});
/**
 * Generic Error Page
 */
router.get("*", function(req, res) {
  res.render("errors/404", { user: req.user });
});

module.exports = router;
