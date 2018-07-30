'use strict';

const inquirer = require('inquirer');
const mongoose = require('mongoose');
const config = require('config');
const shutdown = require('../shutdown');

const utils = require('../utils/utils');
const PizzaPlaceModel = require('../models/pizza-place-model');

shutdown.registerListeners();

const prompts = [
	{
		type: 'input',
		name: 'name',
		message: 'Name of the pizza place',
	},
	{
		type: 'input',
		name: 'city',
		message: 'City?',
		default: 'Szeged',
	},
	{
		type: 'input',
		name: 'street',
		message: 'Street?',
	},
	{
		type: 'input',
		name: 'houseNumber',
		message: 'House Number?',
	},
	{
		type: 'input',
		name: 'phoneNumbers',
		message: 'Phone number(s)? (If multiple, separate with a comma)',
	},
	{
		type: 'input',
		name: 'website',
		message: 'Website?',
	},
	{
		type: 'input',
		name: 'handler',
		message: 'The name of the scraper file?',
	},
];

const run = async () => {
	try {
		await mongoose.connect(
			config.get('database.url'),
			{
				useNewUrlParser: true,
			}
		);

		const answers = await inquirer.prompt(prompts);

		const phoneNumbers = answers.phoneNumbers.split(',').map(number => {
			return utils.removeAllWhiteSpace(number);
		});

		const pizzaPlace = new PizzaPlaceModel({
			name: answers.name,
			city: answers.city,
			street: answers.street,
			houseNumber: answers.houseNumber,
			website: answers.website,
			phoneNumbers: phoneNumbers,
			handler: answers.handler,
		});

		const result = await pizzaPlace.save();
		console.log(result);
		return result;
	} catch (e) {
		console.error(e);
	}
};

run()
	.then(() => shutdown.shutdownDatabase())
	.then(() => process.exit())
	.catch(err => {
		console.error(err);
		process.exit();
	});
