'use strict';

const knex = require('knex');

async function getConnectionInfo() {
	return {
		host: 'localhost',
		user: 'postgres',
		password: 'postgres',
		database: 'ordernow'
	};
}

async function getConnection() {
	if (process.env.NODE_ENV === 'test') {
		return knex({
			client: 'sqlite3',
			connection: ':memory:'
		});
	}
	const infos = await getConnectionInfo();
	return knex({
		client: 'pg',
		connection: infos,
		pool: { min: 2, max: 20 }
	});
}

const KNEX = getConnection();

module.exports = Object.freeze({
	KNEX
});
