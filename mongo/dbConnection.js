const mongoose = require('mongoose');
require('dotenv').config(); // loads .env file into process env
const connectionURI = process.env.MONGO_CONNECTION_STRING;
exports.createConnection = ()=>{
	mongoose.connect(connectionURI,(err)=>{
		if(err)
		{
			console.log('error connecting to database', err);
		}
		else
		{
			console.log('connected to database');
		}
	});
}
