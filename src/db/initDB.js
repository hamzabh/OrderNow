'use strict';

const { KNEX } = require('./connexion');

async function initDB() {
	const connexion = await KNEX;
	if (!await connexion.schema.hasTable('user')) {
		console.log('initDB');
		await connexion.schema.createTable('user', table => {
			table.increments('id');
			table.string('name');
			table.string('email');
			table.unique('id');
		});
	} else {
		console.log('Table user already exist');
	}
}

module.exports = {
	initDB
};
