const db = require("../../models");
const router = require("express").Router();

/**
 * Activity - Read All
 */
router.get("/", function (req, res) {
    db.Activity.findAll(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * Activity - Read One
 */
router.get("/:id", function (req, res) {
    db.Activity.findByPk(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/** 
 * Activity - Create
 * Notice how we are also taking in the User Id! Important!
 */
router.post("/", function (req, res) {
    db.Activity.create({
        UserId: req.user.id,
        ...req.body
    })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * Activity - Update
 */
router.put("/:id", function (req, res) {
    db.Activity.update(req.body, { where: { id: req.params.id } })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * Activity - Delete
 */
router.delete("/:id", function (req, res) {
    db.Activity.destroy({ where: { id: req.params.id } })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});


module.exports = router;
