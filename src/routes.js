'use strict';

const express = require('express');

const { getAllUsers, getUserById } = require('./middlewares/users_get');
const { createUser } = require('./middlewares/users_add');
const { deleteUserById } = require('./middlewares/users_delete');

const router = express.Router();

router.get('/users', getAllUsers);

router.get('/users/:userId', getUserById);

router.post('/users', createUser);

router.delete('/users/:userId', deleteUserById);

module.exports = router;
