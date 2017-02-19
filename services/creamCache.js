module.exports = (() => {

	function init() {
		return (req, res, next) => {
			// do stuff here
			
			next();
		}
	}

	return { init };

})();
