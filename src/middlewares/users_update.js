'use strict';

const { transaction } = require('../db/transacting');
const { KNEX } = require('../db/connexion');

async function putUser(req, res) {
	const id = decodeURIComponent(req.params.userId);
	const body = req.body;
	const result = await updateUser(id, body);
	if (result) {
		console.log('User updated ', body);
		res.sendStatus(200);
	} else {
		res.sendStatus(409);
	}
}

async function updateUser(id, userToUpdate) {
	return await transaction(KNEX, ({ user }) => user.updateUser(id, userToUpdate));
}

module.exports = Object.freeze({
	putUser, updateUser
});
