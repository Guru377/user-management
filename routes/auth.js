const router = require('express').Router();
const authSevice = require("../services/authService");
const verify = require("./verifyToken");

router.post('/register', async (req, res, next) => {
    try {
        let response = await authSevice.register(req.body);
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

router.post('/login', async (req, res) => {
    try {
        let response = await authSevice.login(req.body);
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


router.delete('/logout', verify, async (req, res) => {
    try {
        const authHeader = req.header("Authorization");
        const token = authHeader && authHeader.split(' ')[1]
        await authSevice.logout(token);
        return res.status(200).send("logged off!");

    } catch (error) {
        return res.status(500).send("request failed");
    }
});

module.exports = router;
