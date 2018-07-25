'use strict';

const axios = require('axios');
const cheerio = require('cheerio');

const config = require('../config').pizzaPlaces.pizzaForte;
const { toTitleCase } = require('../utils/utils');

const getPrice = priceString => {
	return priceString.replace(/\D/g,'');
};

const getPriceAndSize = ($, buttons) => {
	const prices = [];

	$(buttons).each((i, button) => {
		prices.unshift({
			size: $(button).html().split('CM')[0].trim(),
			price: getPrice($(button).find('b').text())
		});
	});

	return prices;
};

const getName = nameString => {
	return nameString.trim();
};

const getToppingsAndBase = toppingsAndBaseString => {
	const [base, ...toppings] = toppingsAndBaseString.replace('(', '').replace(')', '').split(', ');
	return {
		toppings: toppings.map(topping => topping.trim()),
		base: toTitleCase(base.trim()),
	};
};

const getDataFromOnePizzaElement = ($, el) => {
	const $el = $(el);
	const sizeAndPriceButtons = $el.find(config.priceAndSizeSelector);
	const prices = getPriceAndSize($, sizeAndPriceButtons);
	const name = getName($el.find(config.nameSelector).text());
	const { toppings, base } = getToppingsAndBase($el.find(config.toppingsSelector).text());
	return {
		name: name.trim(),
		prices: prices,
		imgUrl: $el.find(config.imgSelector).attr('src'),
		toppings: toppings,
		base: base
	};
};

const buildPizzaData = $ => {
	const pizzaElems = $(config.elemSelector);
	const pizzaData = [];
	pizzaElems.each((i, el) => {
		pizzaData.push(getDataFromOnePizzaElement($, el));
	});
	return pizzaData;
};

const scrape = async () => {
	try {
		console.log(`Loading site at ${config.baseUrl}`);
		const { data: body } = await axios.get(config.baseUrl);
		
		console.log(`Site loaded`);
		const $ = cheerio.load(body);
		
		console.log(`Building pizza data`);
		const data = buildPizzaData($);
		
		console.log(`Scraping finished for Pizza Forte`);
		console.log(JSON.stringify(data, null, 2));
		return data;
	} catch (error) {
		console.error(error);
	}
};

module.exports = scrape;
// scrape();
