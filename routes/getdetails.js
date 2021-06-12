const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");

// router.get('/', verify, (req, res) => {
//     res.send(req.user);
// });

router.get("/name", verify, async (req, res) => {
    var userName = req.query.name;
    console.log(userName);
    const user = await User.findOne({ name: userName });

    if (user != null) {
        res.status(200).send(user);
        return;
    }

    res.status(404).send("user not found!");
    return;
});

router.get("/contact", verify, async (req, res) => {
    var userContact = req.query.contact;

    const user = await User.findOne({ contact: userContact });

    if (user != null) {
        res.status(200).send(user);
        return;
    }

    res.status(404).send("user not found!");

});

module.exports = router;