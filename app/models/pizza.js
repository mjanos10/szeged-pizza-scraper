'use strict';

const mongoose = require('mongoose');

const PizzaSchema = new mongoose.Schema({
	pizzaPlace: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'PizzaPlace',
		required: true
	},
	name: {
		type: String,
		required: true,
	},
	prices: [
		{
			size: {
				type: Number,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			}
		}
	],
	imgUrl: {
		type: String,
	},
	toppings: {
		type: [String]
	},
	base: {
		type: String,
	},
}, {
	timestamps: true,
});

const PizzaModel = mongoose.model('Pizza', PizzaSchema);

module.exports = PizzaModel;
