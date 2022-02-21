const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
	'empId': {type : String},
	'name':{type : String},
	'city':{type : String}
});

module.exports = mongoose.model('Employee',employeeSchema,'Employee');