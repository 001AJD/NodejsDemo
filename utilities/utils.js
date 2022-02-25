require('dotenv').config(); // loads .env file into process env
exports.validateApiKey = (req, res, next)=>{
	let apiKey = req.get('x-api-key') || '';
	console.log('apiKey ==> '+apiKey);
	console.log('internal secret key => '+process.env.ApiKey)
	if(apiKey !== process.env.ApiKey)
	{
		res.sendStatus(403);
	}
	else
	{
		next();
	}
}

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