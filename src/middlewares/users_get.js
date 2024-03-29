'use strict';

const { transaction } = require('../db/transacting');
const { KNEX } = require('../db/connexion');

async function getAllUsers(req, res) {
	const result = await getUsers();
	console.log('get All Users', { result });
	if (result && result.length > 0) {
		res.send(result);
	} else {
		res.sendStatus(404);
	}
}

function getUsers() {
	return transaction(KNEX, ({ user }) => user.findAll());
}

async function getUserById(req, res) {
	const id = decodeURIComponent(req.params.userId);
	const result = await getUser(id);
	console.log('get User By id', { result });
	if (result && result.length > 0) {
		res.send(result);
	} else {
		res.sendStatus(404);
	}
}

function getUser(id) {
	return transaction(KNEX, ({ user }) => user.findById(id));
}

module.exports = Object.freeze({
	getAllUsers, getUserById, getUsers, getUser
});
