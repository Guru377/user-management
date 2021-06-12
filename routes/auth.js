const router = require('express').Router();
const User = require("../model/User");
const Token = require("../model/Token");
const { registerValidation, countryValidation, logoutValidation } = require('../validation');
const { loginValidation } = require("../validation");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { required } = require('joi');
const verify = require("./verifyToken");

router.post('/register', async (req, res, next) => {

    const { error } = await registerValidation(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return next(new Error(error));
    }

    const validCountry = countryValidation(req.body);

    if (!validCountry) {
        res.status(400).send("Invalid county name!");
        return next(new Error("Invalid county name"));
    }

    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist) {
        res.status(400).send("User already exists")
        return next(new Error("User already exists"));
    }

    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        address: req.body.address,
        contact: req.body.contact,
        gender: req.body.gender,
        country: req.body.country


    });

    try {
        const savedUser = await user.save();
        res.send({ user: user.name, message: "user rigiseterd" });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).send("Invalid user credentials");
    }

    const validPassword = await bycrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send("Invalid user credentials");
    }

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: "1h" });

    const existingToken = await Token.findOne({ email: req.body.email });

    try {

        if (!existingToken) {

            const tokenTosave = new Token({
                email: req.body.email,
                auth: token
            });

            await tokenTosave.save();
        }
        else {
            existingToken.auth = token;
            await existingToken.save();
        }
        res.header("auth", token).send({ "token": token, "message": "user logged in!" });

    } catch (error) {
        res.status(400).send(error);

    }
});


router.post('/logout', verify, async (req, res) => {
    const authHeader = req.header("Authorization");
    const auth = authHeader && authHeader.split(' ')[1]
    const token = await Token.findOne({ auth: auth});
    try {
        await token.remove();
        res.send({ user: req.body.email, message: "logged off!" });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});




module.exports = router;
