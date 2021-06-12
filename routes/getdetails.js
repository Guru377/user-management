const router = require("express").Router();
const verify = require("./verifyToken");
const userService = require("../services/userService");

router.post("/searchUser", verify, async (req, res) => {
    try {
        let response = await userService.searchUser(req.body);
        if (response.status === "error") {
            return res.status(400).send(response.response);
        }
        else {
            return res.status(200).send(response.response);
        }

    } catch (error) {
        return res.status(500).send("request failed");
    }
});

module.exports = router;