const mongoose = require('mongoose');
const Router = require('express');
const cors = require('cors');
const User = require('./models/model');
const { deleteAll } = require('./models/controller');
User

const router = new Router();
router.use(cors({
    origin: "*"
}))
router.post("/update-database", (req, res) => {
    // console.log(req.body);
    User.insertMany(req.body).then(() => {
        res.send("RECORD ADDED TO DATABASE");
    })
})

router.put('/delete-all', (req, res) => {
    deleteAll();
    res.send("All Records Deleted");
})

router.get("/get-all", (req, res) => {
    User.find().then((data) => {
        res.send(data);
    })
})

module.exports = router;