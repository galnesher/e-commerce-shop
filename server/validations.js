//Validation
const Joi = require('joi');


//Register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string()
            .min(2).
            required(),
        lastName: Joi.string()
            .min(2)
            .required(),
        emailAddress: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
        role: Joi.string()
            .required(),

    });
    return schema.validate(data)
}


//Login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        emailAddress: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()

    });
    return schema.validate(data)

}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;