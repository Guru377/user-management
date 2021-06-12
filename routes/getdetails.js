const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");

// router.get('/', verify, (req, res) => {
//     res.send(req.user);
// });

router.post("/user", verify, async (req, res) => {
    var userName = req.body.name;
    var userContact = req.body.contact;
    var users;

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
    if (users != null) {
        res.status(200).send(users);
        return;
    }

    res.status(404).send("user not found!");
    return;
});

module.exports = router;