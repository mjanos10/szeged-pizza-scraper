'use strict';

const express = require('express');
const mongoose = require('mongoose');
const GracefulShutdownManager = require('@moebius/http-graceful-shutdown').GracefulShutdownManager;
const shutdown = require('./shutdown');
const config = require('./config');

const app = express();
const shutdownManager = new GracefulShutdownManager(app);

shutdown.registerListeners(shutdownManager);

mongoose.connect(config.database.url, { useNewUrlParser: true });

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
