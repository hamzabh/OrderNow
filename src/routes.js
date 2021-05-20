'use strict';

const express = require('express');

const { getAllUsers, getUserById } = require('./middlewares/users_get');
const { createUser } = require('./middlewares/users_add');
const { deleteUserById } = require('./middlewares/users_delete');
const { putUser } = require('./middlewares/users_update');

const schemas = require('./schemas');
const { validatorBody, validatorParams } = require('./middlewares/validator');

const router = express.Router();

router.get('/users', getAllUsers);

router.get('/users/:userId', validatorParams(schemas.params), getUserById);

router.post('/users', validatorBody(schemas.body), createUser);

router.delete('/users/:userId', validatorParams(schemas.params), deleteUserById);

router.put('/users/:userId', validatorParams(schemas.params), validatorBody(schemas.body), putUser);

module.exports = router;
