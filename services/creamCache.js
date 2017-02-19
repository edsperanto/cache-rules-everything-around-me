const redis = require('redis');
const client = redis.createClient();

module.exports = (() => {

	function cache() {
	}

	function init() {
		return (req, res, next) => {
		// do stuff here
			client.get(req.path, (err, reply) => {
				if(reply === null) {
					next();
				}else{
					res.send(reply);
				}
			});
		}
	}

	return { init };

})();
