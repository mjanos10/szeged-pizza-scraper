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
	price: {
		type: Number,
		required: true,
		default: 0,
	},
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
