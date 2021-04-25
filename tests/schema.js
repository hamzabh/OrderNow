'use strict';

exports.up = async function up(knex) {
	await knex.schema.createTable('user', table => {
		table.increments('id');
		table.string('name');
		table.string('email');
		table.unique('id');
	});
};

exports.down = async function down(knex) {
	await knex.schema.dropTableIfExists('user');
};
