'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

app.disable('x-powered-by');

module.exports = app;
