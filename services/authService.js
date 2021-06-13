const User = require("../model/User");
const Token = require("../model/Token");
const { loginValidation } = require("../validation");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerValidation, countryValidation, logoutValidation } = require('../validation');

const register = async function (userDetails) {
    let validationErrors = [];
    const validationMessage = await registerValidation(userDetails);
    if (validationMessage.error) {
        validationMessage.error.details.forEach(element => {
            validationErrors.push(element.message);
        });
    }
    const validCountry = countryValidation(userDetails);

    if (!validCountry) {
        validationErrors.push("Invalid county name");
    }

    if (validationErrors.length != 0) {
        return { "status": "error", response: { "message": validationErrors } };
    }

    const emailExist = await User.findOne({ email: userDetails.email });

    if (emailExist) {
        return { "status": "error", response: { "message": "User already exists" } };
    }

    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(userDetails.password, salt);

    const user = new User({
        name: userDetails.name,
        email: userDetails.email,
        password: hashedPassword,
        address: userDetails.address,
        contact: userDetails.contact,
        gender: userDetails.gender,
        country: userDetails.country
    });
    const savedUser = await user.save();
    return {
        status: "success",
        response: {
            user: user.name,
            message: "user rigiseterd"
        }
    };
}

const login = async function (userDetails) {
    let validationErrors = [];
    const validationMessage = await loginValidation(userDetails);
    if (validationMessage && validationMessage.error) {
        validationMessage.error.details.forEach(element => {
            validationErrors.push(element.message);
        });
    }
    if (validationErrors.length != 0) {
        return { "status": "error", response: { "message": validationErrors } };
    }
    const user = await User.findOne({ email: userDetails.email });

    if (!user) {
        return { "status": "error", response: { "message": "Invalid user credentials" } };
    }

    const validPassword = await bycrypt.compare(userDetails.password, user.password);
    if (!validPassword) {
        return { "status": "error", response: { "message": "Invalid user credentials" } };
    }

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: "1h" });

    const existingToken = await Token.findOne({ email: userDetails.email });

    if (!existingToken) {

        const tokenTosave = new Token({
            email: userDetails.email,
            auth: token
        });

        await tokenTosave.save();
    }
    else {
        existingToken.auth = token;
        await existingToken.save();
    }
    return { "status": "success", "response": { "token": token, "message": "user logged in!" } };
}

const logout = async function (token) {
    const tokenFromDB = await Token.findOne({ auth: token });
    await tokenFromDB.remove();
}

const verifyToken = async function (token) {
    const tokenFromDB = await Token.findOne({ auth: token });
    if (!tokenFromDB) {
        return { "status": "error", "response": { "message": "Token expired" } };
    }
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (verified) {
        const response = { "status": "success" };
        response.response = {};
        response.response.token = tokenFromDB;
        return response;

    }
    else {
        return {
            "status": "error", "response": { "message": "Token expired" }
        };
    }
}
module.exports.register = register;
module.exports.login = login;
module.exports.logout = logout;
module.exports.verifyToken = verifyToken;