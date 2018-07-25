'use strict';

const xmlToJs = require('xml-js');
const axios = require('axios');

const config = require('../config');

const scrape = async () => {
	try {
		
		const { data } = await axios.get(config.pizzaPlaces.margaretaPizza.sitemapUrl);
		const result = xmlToJs.xml2js(data, { compact: true, ignoreAttributes: true, ignoreDeclaration: true });
		const pizzaUrls = result.urlset.url.map(url => {
			return {
				loc: url.loc._text,
				priority: url.priority._text,
			};
		}).filter(url => {
			return url.priority === '0.6' && url.loc.split('.hu/')[1].includes('pizza');
		});
		return pizzaUrls;
	} catch (error) {
		console.error(error);
	}
};

module.exports = scrape;
