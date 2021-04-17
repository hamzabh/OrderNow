'use strict';

const { transaction } = require('../db/transacting');
const { KNEX } = require('../db/connexion');

async function deleteUserById(req, res) {
	const id = decodeURIComponent(req.params.userId);
	console.log('delete User By id', { id });
	await deleteUser(id);
	res.sendStatus(204);
}

async function deleteUser(id) {
	return await transaction(KNEX, ({ user }) => user.deleteById(id));
}

module.exports = Object.freeze({
	deleteUserById, deleteUser
});
