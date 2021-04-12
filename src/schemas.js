const Joi = require('joi');

const schema = {
    body: {
        name: Joi.string().required(),
        email: Joi.string().required()
    },
    params: {
        userId: Joi.number().required()
    }
};

module.exports = {
    schema
}