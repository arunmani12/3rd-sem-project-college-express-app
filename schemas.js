const Joi = require('joi');

module.exports.mailSchema = Joi.object({
        email: Joi.string().required(),
        subject: Joi.string().required(),
        text: Joi.string().required(),   
});