const { logger } = require('./logger');
exports.FrameAndSendErrorResponse = (errorObject, req, res, next)=>{
	let errCode = errorObject.errorCode || 500;
	if(errCode === 404)
	{
		res.sendStatus(errCode);
	}
	if(errCode === 500)
	{
		res.sendStatus(errCode);
	}
}

exports.addLog = (req,message)=>{
 const logObject = {
	 path : req,
	 message: message
 };
 logger.error(logObject);
}