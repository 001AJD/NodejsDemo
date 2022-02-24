const dbFunctions = require('../dbFunctions/dbFunctions');
exports.getAllEmployees = (req, callback) => {
  console.log('employee service');
  const query = {};
  dbFunctions.getAllEmployeesDbQuery(req, query, (error, response) => {
    if (error) {
      return callback(error);
    } else {
      return callback(null, response);
    }
  });
};

exports.getEmployeeById = (req, employeeId, callback) => {
	console.log('employee service');
	const query = {empid : employeeId};
	dbFunctions.getEmployeeByIdDbQuery(req, query, (error, response) => {
	  if (error) {
		return callback(error);
	  } else {
		return callback(null, response);
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