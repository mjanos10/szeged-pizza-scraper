'use strict';

const xmlToJs = require('xml-js');
const axios = require('axios');

const config = require('config');
const pizzaPlaceConfig = config.util.toObject(config.get('pizzaPlaces.margaretaPizza'));

const hasPizzaWordInUrl = str => str.split('.hu/')[1].includes('pizza');

const getListOfPizzaUrls = xmlAsArray => {
	return xmlAsArray.urlset.url.reduce((allUrls, url) => {
		if (url.priority._text === '0.6' && hasPizzaWordInUrl(url.loc._text)) {
			allUrls.push(url.loc._text);
		}
		return allUrls;
	}, []);
};

const scrape = async () => {
	try {
		
		const { data } = await axios.get(pizzaPlaceConfig.sitemapUrl);
		const result = xmlToJs.xml2js(data, { compact: true, ignoreAttributes: true, ignoreDeclaration: true });
		const pizzaUrls = getListOfPizzaUrls(result);
		return pizzaUrls;
	} catch (error) {
		console.error(error);
	}
};

module.exports = scrape;
