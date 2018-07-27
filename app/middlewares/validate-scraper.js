'use strict';

const config = require('config');

module.exports = (req, res, next) => {
	if (config.get('availableScrapers').includes(req.params.scraper)) {
		return next();
	}
	return res.send('scaper not available');
};
