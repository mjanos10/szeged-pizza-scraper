'use strict';

const axios = require('axios');
const cheerio = require('cheerio');

const config = require('../config').pizzaPlaces.pizzaTorony;
const { toTitleCase } = require('../utils/utils');

const getPrice = priceString => {
	return priceString.replace(/\D/g,'');
};

const getName = nameString => {
	const name = nameString.split('. ')[1].split('(')[0].toLowerCase();
	return toTitleCase(name);
};

const getToppingsAndBase = toppingsAndBaseString => {
	const [base, ...toppings] = toppingsAndBaseString.split(', ');
	return {
		toppings: toppings.map(topping => topping.trim()),
		base: base.trim(),
	};
};

const getDataFromOnePizzaElement = $el => {
	const price = getPrice($el.find(config.priceSelector).text());
	const name = getName($el.find(config.nameSelector).text());
	const { toppings, base } = getToppingsAndBase($el.find(config.toppingsSelector).text());
	return {
		name: name.trim(),
		price: Number(price) || 0,
		imgUrl: $el.find(config.imgSelector).attr('src'),
		toppings: toppings,
		base: base
	};
};

const buildPizzaData = $ => {
	const pizzaElems = $(config.elemSelector);
	const pizzaData = [];
	pizzaElems.each((i, el) => {
		pizzaData.push(getDataFromOnePizzaElement($(el)));
	});
	return pizzaData;
};

const processOnePage = async (size, url) => {
	const { data: body } = await axios.get(url);

	const $ = cheerio.load(body);

	const data = buildPizzaData($);

	return {
		pizzaList: data,
		size
	};
};

const scrape = async () => {
	try {

		const results = await Promise.all(
			config.urls.map(site => processOnePage(site.size, site.url))
		);

		const data = [];

		results.map(oneSize => {
			oneSize.pizzaList.map(onePizza => {
				const foundPizza = data.find(pizza => pizza.name === onePizza.name);
				if (foundPizza) {
					foundPizza.prices.push({ size: oneSize.size, price: onePizza.price });
				} else {
					const price = onePizza.price;
					delete onePizza.price;
					onePizza.prices = [{ size: oneSize.size, price }];
					data.push(onePizza);
				}
			});
		});

		// const data = results.reduce((allPizzas, oneSize) => {
		// 	return allPizzas.find(pizza => pizza.name === oneSize)
		// }, []);

		return data;
	} catch (error) {
		console.error(error);
	}
};

module.exports = scrape;

