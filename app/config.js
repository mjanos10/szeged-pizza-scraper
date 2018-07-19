'use strict';

module.exports = {
	database: {
		url: 'mongodb://localhost:27017/szeged-pizza'
	},
	pizzaPlaces: {
		pizzaFutar: {
			baseUrl: 'http://www.pizzafutar.co.hu/',
			listSelector: '.pizza_arlista li',
			elemSelector: '.pizza_main',
			nameSelector: '.pizza_name',
			priceSelector: '.pizza_price',
			imgSelector: 'img',
			foodSelector: '.feltet_lista'
		},
		pizzaTorony: {
			baseUrl: 'http://www.pizzatoronyszeged.hu/webshop/Pizza_30_cm',
			elemSelector: '.product_box',
			nameSelector: '.product_name',
			priceSelector: '.product_price',
			imgSelector: 'img',
			toppingsSelector: '.product_price + p'
		},
		pizzaForte: {
			baseUrl: 'https://pizzaforte.hu/pizzak.php',
			listSelector: '.product_list',
			elemSelector: 'td .product_info_panel',
			nameSelector: 'h3',
			toppingsSelector: 'h3 + p',
			priceSelector: '.pizza_size_button:last-of-type b'
		}
	}
};
