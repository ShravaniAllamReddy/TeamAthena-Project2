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

    //get lat long from zip
    let geoURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + req.body.zip + ",us&appid=93d3ded8310f4bcd0816861f0428d0f8";

    axios.get(geoURL).then(response => {
        // get lat long from data
        const data = response.data;
        console.log(data);
        const lat = data.coord.lat;
        const lon = data.coord.lon;
        db.Activity.create({
            UserId: req.user.id,
            lat: lat,
            lon: lon,
            ...req.body
        })
            .then(dbModel => res.json(dbModel))
            .catch(err =>
                res.status(422).json(err.response)
            );


    }).catch(err => {
        if (err.response) {
            // client received an error response 
        } else if (err.request) {
            // client never received a response, or request never left
        } else {
            // anything else
        }
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
