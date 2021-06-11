const Joi = require("joi");
const country = require("country-list");

const registerValidation = userDetails => {
    console.log(userDetails);
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        contact: Joi.string().required(),
        address: Joi.string().required(),
        password: Joi.string().min(8).required(),
        gender: Joi.string().min(1).required(),
        country: Joi.string().min(1).required()

    });

    return schema.validate(userDetails);

};

const loginValidation = userDetails => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(userDetails);

};

const logoutValidation = userDetails => {
    const schema = Joi.object({
        auth: Joi.string().required(),
        email: Joi.string().min(6).required().email(),
    });
    return schema.validate(userDetails);

};


const countryValidation = (userDetails) => {
    var countries = country.getData();
    var countryFound = countries.some(country => country.name === userDetails.country) || countries.some(country => country.code === userDetails.country);
    return countryFound;
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.countryValidation = countryValidation;
module.exports.logoutValidation = logoutValidation;