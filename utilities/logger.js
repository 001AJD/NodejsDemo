const winston = require('winston');
const logConfiguration = {
	level: 'info',
	format: winston.format.combine(
		winston.format.simple(),
		winston.format.json()
		),
	'transports' : [ new winston.transports.Console() ]
};
exports.logger = winston.createLogger(logConfiguration);
