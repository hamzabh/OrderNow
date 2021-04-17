'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const { KNEX } = require('../src/db/connexion');
const schema = require('./schema');

const app = require('../src/app');

const { expect } = chai;
chai.use(chaiHttp);

describe('routes', () => {
	let knex;

	before(async () => {
		knex = await KNEX;
	});

	afterEach(async () => {
		const connexion = await knex;
		await schema.down(connexion);
	});

	beforeEach(async () => {
		const connexion = await knex;
		await schema.up(connexion);
	});

	describe('/users - GET', () => {
		const users = [
			{
				id: 1,
				name: 'Idriss',
				email: 'idriss@mail.fr'
			},
			{
				id: 2,
				name: 'Toto',
				email: 'toto@mail.fr'
			},
			{
				id: 3,
				name: 'Momo',
				email: 'momo@mail.fr'
			}
		];
		beforeEach(async () => {
			const connexion = await knex;
			await connexion('user').insert(users);
		});

		it('Get All Users', async () => {
			const response = await chai.request(app).get('/users');
			expect(response).to.have.status(200);
			expect(response).to.be.json;
			expect(response.body).to.deep.equal(users);
		});

		it('Get User by Id - 1/Idriss', async () => {
			const response = await chai.request(app).get('/users/1');
			expect(response).to.have.status(200);
			expect(response).to.be.json;
			expect(response.body).to.deep.equal([{ name: 'Idriss', email: 'idriss@mail.fr' }]);
		});
	});
	describe('/users - POST', () => {
		let response;
		const user = {
			id: 10,
			name: 'Hamza',
			email: 'hamza@mail.fr'
		};
		beforeEach(async () => {
			const connexion = await knex;
			await connexion('user').insert(user);
			response = await chai.request(app).delete('/users/10');
		});
		it('User should be deleted and response 204', async () => {
			expect(response).to.have.status(204);
		});
		it('User should not exist - 10/Hamza', async () => {
			const result = await chai.request(app).get('/users/10');
			expect(result).to.have.status(204);
		});
	});
	describe('/users - DELETE', () => {
		let response;
		const body = {
			name: 'Hamza',
			email: 'hamza@mail.fr'
		};
		beforeEach(async () => {
			response = await chai.request(app).post('/users').send(body);
		});

		it('User should be created', async () => {
			expect(response).to.have.status(200);
		});
		it('Get User create by Id - 1/Hamza', async () => {
			const result = await chai.request(app).get('/users/1');
			expect(result).to.have.status(200);
			expect(result).to.be.json;
			expect(result.body).to.deep.equal([{ name: 'Hamza', email: 'hamza@mail.fr' }]);
		});
	});
});
