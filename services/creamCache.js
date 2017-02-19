const redis = require('redis');
const client = redis.createClient();

module.exports = (() => {

	function cache() {
	}

	function init() {
		return (req, res, next) => {
			client.get(req.path, (err, reply) => {
				if(reply !== null) {
					res.send(reply);
				}else{
					let _render = res.render;
					res.render = function(view, options, cb) {
						console.log(view);
						_render.call(this, view, options, (err, data) => {
							client.set(req.path, data);
							_render.call(this, view, options, cb);
						});
					}
					next();
				}
			});
		}
	}

	return { init };

})();
