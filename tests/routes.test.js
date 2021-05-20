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
			expect(result).to.have.status(404);
		});
	});
	describe('/users - DELETE', () => {
		let response;
		const body = {
			name: 'Hamza',
			email: 'hamza@mail.fr'
		};
		beforeEach(async () => {
			await chai.request(app).post('/users').send(body);
			response = await chai.request(app).delete('/users/1')
		});


		it('User should be deleted', async () => {
			expect(response).to.have.status(204);
		});
		it('User - 1/Hamza not found', async () => {
			const result = await chai.request(app).get('/users/1');
			expect(result).to.have.status(404);

		});
	});
	describe('/users - PUT', () => {
		let response;
		
		const user = {
			name: 'user',
			email: 'user@mail.fr'
		};
		beforeEach(async () => {
			response = await chai.request(app).post('/users').send(user);

		});

		it('User should be updated', async () => {
			const body = {
				name: 'putUser',
				email: 'putUser@mail.fr'
			};
			response = await chai.request(app).put('/users/1').send(body);

			const result = await chai.request(app).get('/users/1');

			expect(response).to.have.status(200);

			expect(result).to.have.status(200);
			expect(result).to.be.json;
			expect(result.body).to.deep.equal([body]);
		});
	});
});
