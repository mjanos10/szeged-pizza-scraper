'use strict';

const inquirer = require('inquirer');
const mongoose = require('mongoose');
const config = require('config');
const shutdown = require('../shutdown');
const scrapers = require('../scrapers');

const PizzaPlaceModel = require('../models/pizza-place');
const PizzaModel = require('../models/pizza');

shutdown.registerListeners();

const prompts = [
	{
		type: 'list',
		name: 'oneOrAll',
		message: 'Should scrape one or all pizza places?',
		choices: ['one', 'all']
	}, 
	{
		type: 'list',
		name: 'selectedPlace',
		message: 'Which pizzaPlace?',
		when (answers) {
			return answers.oneOrAll === 'one';
		}
	},
];

const scrapeAndSaveOnePizzaPlace = async pizzaPlace => {
	console.log(`Running scraper for ${pizzaPlace.name}`);
	const handler = scrapers[pizzaPlace.handler];
	if (!handler) {
		throw new Error(`The handler for the given pizza place doesn't exists!`);
	}

	const scrapedPizzas = await handler();
	
	console.log(`Got results from scraper for pizza place ${pizzaPlace.name}.`);
	const pizzasToSave = scrapedPizzas.map(pizza => {
		pizza.pizzaPlace = pizzaPlace._id;
		return pizza;
	});
	
	console.log(`Removing pizzas for pizza place ${pizzaPlace.name}.`);
	await PizzaModel.deleteMany({ pizzaPlace: pizzaPlace._id });

	console.log(`Adding newly scraped pizzas for pizza place ${pizzaPlace.name}.`);
	await PizzaModel.insertMany(pizzasToSave);
};

const handleAnswers = async ({ oneOrAll, selectedPlace }) => {
	if (oneOrAll === 'one') {
		return scrapeAndSaveOnePizzaPlace(selectedPlace);
	} else {
		// run all scrapers
	}
};

const run = async () => {
	try {
		await mongoose.connect(config.get('database.url'), { useNewUrlParser: true });

		const allPizzaPlaces = await PizzaPlaceModel.find();
		const pizzaPlaceNames = allPizzaPlaces.map(place => {
			return {
				name: place.name,
				value: place
			};
		});

		prompts[1].choices = pizzaPlaceNames;

		const answers = await inquirer.prompt(prompts);
		await handleAnswers(answers);
		
	} catch (e) {
		console.error(e);
	}
};


run().then(() => shutdown.shutdownDatabase()).then(() => process.exit()).catch(err => {
	console.error(err);
	process.exit();
});
