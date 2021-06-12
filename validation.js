const Joi = require("joi");
const country = require("country-list");

const registerValidation = async userDetails => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        contact: Joi.string().min(10).required(),
        address: Joi.string().required(),
        password: Joi.string().min(8).required(),
        gender: Joi.string().min(1).required(),
        country: Joi.string().min(1).required()

    });

    return schema.validate(userDetails, {
        abortEarly: false
    });

};

const loginValidation = async userDetails => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(userDetails, {
        abortEarly: false
    });

};

const logoutValidation = userDetails => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email()
    });
    return schema.validate(userDetails, {
        abortEarly: false
    });

};


const countryValidation = (userDetails) => {
    let countries = country.getData();
    let countryFound = countries.some(country => country.name === userDetails.country) || countries.some(country => country.code === userDetails.country);
    return countryFound;
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.countryValidation = countryValidation;
module.exports.logoutValidation = logoutValidation;