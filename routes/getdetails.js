const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");

// router.get('/', verify, (req, res) => {
//     res.send(req.user);
// });

router.get("/name", verify, async (req, res) => {
    var userName = req.query.name;
    var userContact = req.query.contact;
    console.log(userName);
    const user = await User.findOne({ name: userName });
    res.status(400).send(user);



});

router.get("/contact", verify, async (req, res) => {
    var userName = req.query.name;
    var userContact = req.query.contact;

    console.log("-----------------------------------------");
    console.log(userName);
    const user = await User.findOne({ contact: userContact });
    console.log("-----------------------------");
    console.log(user);

    res.status(400).send(user);



});

module.exports = router;