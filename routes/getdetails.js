const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");

router.post("/", verify, async (req, res) => {
    var userName = req.body.name;
    var userContact = req.body.contact;
    var users;

    try {
        if ((!userName || userName === "") && (!userContact || userContact === "")) {
            res.status(400).send("user name or contact is require");
            return;
        }
        if (userName && userContact) {
            var searchKey = new RegExp(userName, 'i')
            users = await User.find({ name: searchKey, contact: userContact });
        }
        else if (userName) {
            var searchKey = new RegExp(userName, 'i')
            users = await User.find({ name: searchKey });
        }
        else if (userContact) {
            users = await User.find({ contact: userContact });
        }
        res.status(200).send({ users: users });
        return;
    } catch (error) {
        res.status(400).send(error);

    }
});

module.exports = router;