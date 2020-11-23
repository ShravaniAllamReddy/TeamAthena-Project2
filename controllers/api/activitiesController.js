const db = require("../../models");
const router = require("express").Router();
const axios = require("axios");


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
    // console.log(req.body, req.user.id);
    //get lat long from zip
    let geoURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + req.body.zip + ",us&appid=93d3ded8310f4bcd0816861f0428d0f8";

    axios.get(geoURL).then(response => {
        // get lat long from data
        const data = response.data;
        console.log(data);
        const lat = data.coord.lat;
        const lon = data.coord.lon;
        req.body.UserId = req.user.id;
        req.body.lat = lat;
        req.body.lon = lon;
        console.log(req.body);

        db.Activity.create(req.body)
            .then(dbModel => {
                console.log(dbModel);
                res.json(dbModel)
            })
            .catch(err => res.status(422).json(err));

    })
})

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
