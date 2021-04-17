'use strict';

const app = require('./src/app');
require('dotenv').config({ path: './config/.env' });

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log('Server is listening', { PORT });
});
