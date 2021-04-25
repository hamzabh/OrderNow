'use strict';

const { transaction } = require('../db/transacting');
const { KNEX } = require('../db/connexion');

async function getAllUsers(req, res) {
	const result = await getUsers();
	console.log('get All Users', { result });
	if (result && result.length > 0) {
		res.send(result);
	} else {
		res.sendStatus(204);
	}
}

async function getUsers() {
	return await transaction(KNEX, ({ user }) => user.findAll());
}

async function getUserById(req, res) {
	const id = decodeURIComponent(req.params.userId);
	const result = await getUser(id);
	console.log('get User By id', { result });
	if (result && result.length > 0) {
		res.send(result);
	} else {
		res.sendStatus(204);
	}
}

async function getUser(id) {
	return await transaction(KNEX, ({ user }) => user.findById(id));
}

module.exports = Object.freeze({
	getAllUsers, getUserById, getUsers, getUser
});
