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
	
	const callback = (evt, error) => {
		console.log(`Running shutdown after event ${evt}`);
		if (error) {
			console.error(error);
		}
		shutdownAll(server).then(() => {
			console.log(`Shutdown finished after ${evt}`);
			process.kill(process.pid, evt);
		}).catch(err => {
			console.error(`An error occured during shutdown from event ${evt}`);
			console.error(err);
			process.kill(process.pid, evt);
		});
	};

	process.on('SIGTERM', err => callback('SIGTERM', err));
	process.on('SIGINT', err => callback('SIGINT', err));
	process.on('uncaughtException', err => callback('uncaughtException', err));
	process.on('unhandledRejection', err => callback('unhandledRejection', err));
	process.once('SIGUSR2', err => callback('SIGUSR2', err));

};

module.exports = {
	registerListeners,
	shutdownAll,
	shutdownDatabase,
	shutdownServer
};
