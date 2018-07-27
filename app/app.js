'use strict';

process.env['NODE_CONFIG_DIR'] = __dirname + '/config';

const express = require('express');
const mongoose = require('mongoose');
const GracefulShutdownManager = require('@moebius/http-graceful-shutdown').GracefulShutdownManager;
const shutdown = require('./shutdown');
const config = require('config');
const { validateScraper } = require('./middlewares');
const scrapers = require('./scrapers');

const app = express();

mongoose.connect(config.get('database.url'), { useNewUrlParser: true });

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/scrape/:scraper', validateScraper, async (req, res) => {
	
	try {
		const result = await scrapers[req.params.scraper]();
		return res.json(result);
	} catch (e) {
		console.error(e);
		return res.json(e);
	}
});

const server = app.listen(3000, () => console.log('Example app listening on port 3000!'));

const shutdownManager = new GracefulShutdownManager(server);

shutdown.registerListeners(shutdownManager);
