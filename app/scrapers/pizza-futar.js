'use strict';

const axios = require('axios');
const cheerio = require('cheerio');

const config = require('config');
const pizzaPlaceConfig = config.util.toObject(config.get('pizzaPlaces.pizzaFutar'));

const getCountOf = ($, selector) => $(selector).length;

const getFood = $el => {
	const fullText = $el.find(pizzaPlaceConfig.foodSelector).text();
	const split = fullText.split('\t');
	const foods = split[0];
	const base = split[split.length - 1].split('Alap:')[1];
	return {
		foods: foods.split(',').map(food => food.trim()),
		base
	};
};

const getDataFromOnePizza = $el => {
	const foodsAndBase = getFood($el);
	const name = $el.find(pizzaPlaceConfig.nameSelector).text();
	const price = $el.find(pizzaPlaceConfig.priceSelector).text().replace(/\D/g,'');
	return {
		name: name.trim(),
		prices: [{
			size: name.includes('60 cm') ? 60 : 28,
			price: Number(price) || 0,
		}],
		imgUrl: pizzaPlaceConfig.baseUrl + $el.find(pizzaPlaceConfig.imgSelector).attr('src'),
		toppings: foodsAndBase.foods,
		base: foodsAndBase.base
	};
};

const getPizzasFromOneIteration = async link => {
	try {
		const { data: body } = await axios.get(link);
		const $ = cheerio.load(body);
		const pizzaElems = $(pizzaPlaceConfig.elemSelector);
		const pizzaData = [];
		pizzaElems.each((i, el) => {
			pizzaData.push(getDataFromOnePizza($(el)));
		});
		return pizzaData;
	} catch (error) {
		console.error(error);
	}
};

const buildPizzaData = async ($, shownPerPage) => {
	const listElems = $(pizzaPlaceConfig.listSelector);
	let visited = 1;
	const linksToVisit = [];
	listElems.each((i, el) => {
		if (i + 1 === visited + shownPerPage) {
			const link = $(el).find('a').attr('href');
			linksToVisit.push(`${pizzaPlaceConfig.baseUrl}${link}`);
			visited += shownPerPage;
		}
	});
	const data = await Promise.all(linksToVisit.map(getPizzasFromOneIteration));
	return data.reduce((accumulator, currentvalue) => {
		return accumulator.concat(currentvalue);
	}, []);
};

const scrape = async () => {
	try {
		const { data: body } = await axios.get(pizzaPlaceConfig.baseUrl);
		const $ = cheerio.load(body);
		const shownPerPage = getCountOf($, pizzaPlaceConfig.elemSelector);
		const data = await buildPizzaData($, shownPerPage);
		return data;

	} catch (error) {
		console.error(error);
	}
};

module.exports = scrape;
