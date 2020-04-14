'use strict';
const SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const log4js = require('log4js');

//to save logs in file uncomment following code.
// log4js.configure({
//   appenders: { action: { type: 'file', filename: 'logs/action.log' } },
//   categories: { default: { appenders: ['action'], level: 'all' } }
// });
global.logger = log4js.getLogger();

let mongoUrl;
if (process.env.MONGO_URL && process.env.MONGO_USER && process.env.MONGO_PWD)
	mongoUrl = 'mongodb://' + process.env.MONGO_USER + ':' + process.env.MONGO_PWD + '@' + process.env.MONGO_URL;
else if (process.env.MONGO_URL && !process.env.MONGO_USER && !process.env.MONGO_PWD)
	mongoUrl = 'mongodb://' + process.env.MONGO_URL;
else
	mongoUrl = 'mongodb://localhost:27017/signzy-db';

let options = {
	reconnectTries: parseInt(process.env.MONGO_RECONN_TRIES) || 3,
	reconnectInterval: parseInt(process.env.MONGO_RECONN_TIME) || 500
};

mongoose.connect(mongoUrl, options, err => {
	if (err) {
		logger.info(err);
	} else {
		logger.info('connected to DB');
	}
});

mongoose.connection.on('connecting', () => { logger.info('-------------------------MONGODB CONNECTING-------------------------'); });
mongoose.connection.on('disconnected', () => { logger.error('-------------------------MONGODB LOST CONNECTION-------------------------'); });
mongoose.connection.on('reconnect', () => { logger.info('-------------------------MONGODB RECONNECTED-------------------------'); });
mongoose.connection.on('connected', () => { logger.info('-------------------------MONGODB CONNECTED-------------------------'); });
mongoose.connection.on('reconnectFailed', () => { logger.error('-------------------------MONGODB FAILED TO RECONNECT-------------------------'); });

if (process.env.MONGOOSE_DEBUG && (process.env.MONGOOSE_DEBUG).toLowerCase() == 'true') {
	mongoose.set('debug', true);
}


let limit = process.env.PAYLOAD_SIZE_LIMIT ? process.env.PAYLOAD_SIZE_LIMIT : (100 * 1024 * 1024); //default 100MB

app.use(express.json({ limit: limit }));

var config = {
	appRoot: __dirname
};
let port = process.env.PORT || 11000;
SwaggerExpress.create(config, function (err, swaggerExpress) {
	if (err) { throw err; }

	swaggerExpress.register(app);
	app.listen(port, (err) => {
		if (!err) {
			logger.info('Server started on port ' + port);
		}
		else {
			logger.error(err);
		}
	});
});

