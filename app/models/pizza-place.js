'use strict';

const mongoose = require('mongoose');

const PizzaPlaceSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	city: {
		type: String,
		required: true,
		default: 'Szeged'
	},
	street: {
		type: String,
		required: true,
	},
	houseNumber: {
		type: String,
		required: true,
	},
	phoneNumbers: {
		type: [String],
		required: true,
	},
	website: {
		type: String,
		required: true,
	},
	handler: {
		type: String,
		required: true,
	},
	pizzaSizes: {
		type: [Number],
		required: true,
	},
	lastScraped: {
		type: Date,
	}
}, {
	timestamps: true
});

const PizzaPlaceModel = mongoose.model('PizzaPlace', PizzaPlaceSchema);

module.exports = PizzaPlaceModel;
