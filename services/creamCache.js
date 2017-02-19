const redis = require('redis');
const client = redis.createClient();

module.exports = (() => {

	function cache() {
	}

	function init() {
		return (req, res, next) => {
			client.get(req.originalUrl, (err, reply) => {
				if(reply !== null) {
					res.send(reply);
				}else{
					let _send = res.send;
					res.send = function(data) {
						client.setex(req.originalUrl, 60, data);
						_send.call(this, data);
					}
					next();
				}
			});
		}
	}

	return { init };

})();
