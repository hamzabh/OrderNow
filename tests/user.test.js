'use strict';

const chai = require('chai');

const { getUsers, getUser } = require('../src/middlewares/users_get');
const { insertUser } = require('../src/middlewares/users_add');
const { deleteUser } = require('../src/middlewares/users_delete');


const { KNEX } = require('./../src/db/connexion');
const schema = require('./schema');

const expect = chai.expect;

describe('Users', () => {

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

    describe('Get Users', () => {
        beforeEach(async () => {
            const connexion = await knex;

            await connexion('user').insert([
                {
                    id: 1,
                    name: 'Jean',
                    email: 'jean@mail.fr'
                },
                {
                    id: 2,
                    name: 'Michel',
                    email: 'michel@mail.fr'
                },
                {
                    id: 3,
                    name: 'Anna',
                    email: 'anna@mail.fr'
                }
            ]);
        });

        it('Get All users', async () => {
            const result = await getUsers()
            expect(result).to.have.length(3);
        });
        it('Get User by Id - 3/Anna', async () => {
            const result = await getUser(3)
            expect(result).to.deep.equal([{
                name: 'Anna',
                email: 'anna@mail.fr'
            }]);
        });
    });
    describe('Create User', () => {
        const user = {
            name: 'Pierre',
            email: 'pierre@mail.fr'
        }
        beforeEach(async () => {
            await insertUser(user);
        });
        it('Get User Added - 1/Pierre', async () => {
            const result = await getUser(1)
            expect(result).to.deep.equal([user]);
        });
    });
    describe('Delete User', () => {

        const user = {
            id: 1,
            name: 'Pierre',
            email: 'pierre@mail.fr'
        }
        let connexion;
        beforeEach(async () => {
            connexion = await knex;
            await connexion('user').insert(user);
            await deleteUser(1);
        });
        it('Delete User - 1/Pierre Not found', async () => {
            const result = await connexion('user').where(user)
            expect(result).to.have.length(0);
        });
    });
});
