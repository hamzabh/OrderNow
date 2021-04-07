'use strict';

const { transaction } = require('../db/transacting');
const { KNEX } = require('../db/connexion');

async function deleteUserById(req, res) {
	const id = decodeURIComponent(req.params.userId);
	console.log('delete User By id', { id });
	const result = await transaction(KNEX, ({ user }) => user.deleteById(id));
	res.sendStatus(204);
}

module.exports = Object.freeze({
	deleteUserById
});