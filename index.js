const PORT = process.env.PORT || 3000;
const server = require('./server');

server.listen(PORT, _ => {
	console.log('Server listening on', PORT);
});
