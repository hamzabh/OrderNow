'use strict';

const Joi = require('@hapi/joi');

const schemas = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		email: Joi.string().required()
	}),
	params: Joi.object().keys({
		userId: Joi.number().required()
	})
};

module.exports = schemas;
