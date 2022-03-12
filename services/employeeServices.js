const dbFunctions = require('../dbFunctions/dbFunctions');
const utils = require('../utilities/utils');
exports.getAllEmployees = (req, callback) => {
  const query = {};
  dbFunctions.getAllEmployeesDbQuery(req, query, (error, response) => {
    if (error) {
      utils.addLog(req,"employeeServices=>getAllEmployees");
      return callback(error);
    } else {
      utils.addLog(req,"employeeServices=>getAllEmployees");
      return callback(null, response);
    }
  });
};
const mapEmployeeResponse = (response) =>{
  return {
    'employeeId': response[0].empid || '',
    'employeeName': response[0].name || '',
    'workLocation': response[0].city || '',
  };
}

exports.getEmployeeById = (req, employeeId, callback) => {
	console.log('employee service');
	const query = {empid : employeeId};
	dbFunctions.getEmployeeByIdDbQuery(req, query, (error, response) => {
	  if (error) {
		return callback(error);
	  } else {
		return callback(null, mapEmployeeResponse(response));
	  }
	});
  };

exports.deleteEmployeeById = (req, employeeId, callback) => {
console.log('employee service');
const query = {empid : employeeId};
dbFunctions.deleteEmployeeByIdDbQuery(req, query, (error, response) => {
	if (error) {
	return callback(error);
	} else {
	return callback(null, response);
	}
});
};

exports.addNewEmployee = (req, newEmployee, callback) => {
  dbFunctions.addNewEmployeeDbQuery(req, newEmployee, (error, response) => {
    if (error) {
      return callback(error);
    } else {
      return callback(null, response);
    }
  });
};

exports.updateEmployeeDetailsById = (req, employeeId,  newEmployeeObj, callback) => {
  const query = { empid: employeeId };
  dbFunctions.updateEmployeeByIdDbQuery(req, query, newEmployeeObj, (error, response) => {
    if (error) {
      return callback(error);
    } else {
      return callback(null, response);
    }
  });
};
