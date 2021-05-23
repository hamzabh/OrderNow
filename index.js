'use strict';

require('dotenv').config({ path: './config/.env' });
const { initDB } = require('./src/db/initDB');

const app = require('./src/app');

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log('Server is listening', { PORT });
	initDB();
});
