'use strict';

const pizzaFutar = require('./pizza-futar');
const pizzaTorony = require('./pizza-torony');
const pizzaForte = require('./pizza-forte');
const margaretaPizza = require('./margareta-pizza');

module.exports = {
	['pizza-futar']: pizzaFutar,
	['pizza-torony']: pizzaTorony,
	['pizza-forte']: pizzaForte,
	['margareta-pizza']: margaretaPizza,
};
