'use strict';

const { transaction } = require('../db/transacting');
const { KNEX } = require('../db/connexion');

async function getAllUsers(req, res) {
	const result = await transaction(KNEX, ({ user }) => user.findAll());
	console.log('get All Users', { result });
	if (result && result.length > 0) {
		res.send(result);
	} else {
		res.sendStatus(204);
	}
}

async function getUserById(req, res) {
	const id = decodeURIComponent(req.params.userId);
	const result = await transaction(KNEX, ({ user }) => user.findById(id));
	console.log('get User By id', { result });
	if (result && result.length > 0) {
		res.send(result);
	} else {
		res.sendStatus(204);
	}
}

module.exports = Object.freeze({
	getAllUsers, getUserById
});