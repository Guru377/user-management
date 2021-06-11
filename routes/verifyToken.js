const { required } = require("joi");
const jwt = require("jsonwebtoken");
const Token = require("../model/Token");

module.exports = async function (req, res, next) {
    const token = req.header("auth");

    if (!token) {
        res.status(401).send("Access Denied");
    }

    try {

        const tokenExist = await Token.findOne({ auth: token });

        if (tokenExist) {
            res.status(400).send("Token expired");
            return next(new Error("oken expired"));
        }
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send("Invalid Token");
    }

}