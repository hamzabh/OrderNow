'use strict';

const { transaction } = require('../db/transacting');
const { KNEX } = require('../db/connexion');

async function createUser(req, res) {
	const body = req.body;
	const result = await insertUser(body);
	if (result) {
		console.log('User created ', body);
		res.sendStatus(200);
	} else {
		res.sendStatus(409);
	}
}

async function insertUser(userToCreate){
	return await transaction(KNEX, ({ user }) => user.insert([userToCreate]));
}

module.exports = Object.freeze({
	createUser, insertUser
});
