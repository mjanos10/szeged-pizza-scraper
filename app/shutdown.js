'use strict';

const mongoose = require('mongoose');

const shutdownDatabase = () => {
	return new Promise(resolve => {
		mongoose.connection.close(() => {
			console.log('DB connection closed');
			resolve();
		});
	});
};

const shutdownServer = server => {
	return new Promise(resolve => {
		if (server) {
			server.terminate(() => {
				console.log(`App server shutdown finished`);
				resolve();
			});
		} else {
			resolve();
		}
	});
};

const shutdownAll = server => {
	return Promise.all([shutdownServer(server), shutdownDatabase()]);
};

const registerListeners = server => {
	
	const callback = evt => {
		console.log(`Running shutdown after event ${evt}`);
		shutdownAll(server).then(() => {
			console.log(`Shutdown finished after ${evt}`);
		}).catch(err => {
			console.error(`An error occured during shutdown from event ${evt}`);
		});
	};

	process.on('SIGTERM', () => callback('SIGTERM'));
	process.on('SIGINT', () => callback('SIGINT'));
	process.on('uncaughtException', () => callback('uncaughtException'));
	process.on('unhandledRejection', () => callback('unhandledRejection'));
};

module.exports = {
	registerListeners,
	shutdownAll,
	shutdownDatabase,
	shutdownServer
};
