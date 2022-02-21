const mongoose = require('mongoose');
const connectionURI = 'Connection string here';
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
