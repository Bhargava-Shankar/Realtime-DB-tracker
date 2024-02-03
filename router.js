const mongoose = require('mongoose');
const Router = require('express');
const User = require('./models/model');
User

const router = new Router();

router.post("/update-database", (req, res) => {
    User.insertMany([req.body]).then(() => {
        res.send("RECORD ADDED TO DATABASE");
    })
})


module.exports = router;