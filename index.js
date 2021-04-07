'use strict';

const app = require('./src/app');

const PORT = 5500;

app.listen(PORT, () => {
	console.log('Server is listening', { PORT });

});
