const router = require("express").Router();
// Import our controllers

const userRoutes = require("./usersController");
const activityRoutes = require("./activitiesController");

// Hook up to the router

router.use("/users", userRoutes);
router.use("/activities", activityRoutes);

// Export the router
module.exports = router;
