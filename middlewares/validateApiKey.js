exports.validateApiKey = (req, res, next)=>{
	let apiKey = req.get('x-api-key') || '';
	if(apiKey !== process.env.ApiKey)
	{
		res.sendStatus(403);
	}
	else
	{
		next();
	}
}