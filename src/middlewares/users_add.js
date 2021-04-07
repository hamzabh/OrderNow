'use strict';

const { transaction } = require('../db/transacting');
const { KNEX } = require('../db/connexion');

async function createUser(req, res) {
	const body = req.body;
	const result = await transaction(KNEX, ({ user }) => user.insert([body]));
	if (result) {
		console.log('User created ', body);
		res.sendStatus(200);
	} else {
		res.sendStatus(409);
	}
}
module.exports = Object.freeze({
	createUser
});