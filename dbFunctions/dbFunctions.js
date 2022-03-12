const employee = require('../mongo/Employee');
const utils = requires('../utilities/utils.js');
exports.getAllEmployeesDbQuery = (req, query, callback) => {
  employee.find(query, (error, dbResponse) => {
    if (error) {
      utils.addLog(req,"dbFunctions=>getAllEmployeesDbQuery");
      return callback(error);
    } else {
      // check if db response has data
      if (dbResponse.length === 0) {
        utils.addLog(req,"dbFunctions=>getAllEmployeesDbQuery");
        return callback(error);
      } else {
        utils.addLog(req,"dbFunctions=>getAllEmployeesDbQuery");
        return callback(null, dbResponse);
      }
    }
  });
};

exports.getEmployeeByIdDbQuery = (req, query, callback) => {
  employee.find(query, (error, dbResponse) => {
    if (error) {
      return callback({'errorCode' : 500, 'errorMsg' : 'Internal Server Error'});
    } else {
      console.log(dbResponse);
      // check if db response has data
      if (dbResponse.length === 0) {
        return callback({'errorCode':404,'errorMsg':'No Data found'});
      } else {
        return callback(null, dbResponse);
      }
    }
  });
};

exports.addNewEmployeeDbQuery = (req, newEmployee, callback) => {
  // mongo query to create(insert) new document into DB
  employee.create(newEmployee, (err, dbResponse) => {
    if (err) {
      callback(error);
    } else {
      callback(null, dbResponse);
    }
  });
};

exports.updateEmployeeByIdDbQuery = (req, query, newEmployeeObj, callback) => {
  employee.findOneAndUpdate(query, newEmployeeObj, (error, dbResponse) => {
    if (error) {
      console.log('error occurred while querying mongodb =>' + error);
      callback(error);
    } else {
      if (dbResponse === null) {
        callback({ errCode: 404 }); // update query did not match any document in DB
      } else {
        console.log(dbResponse);
        callback(dbResponse); // 204 status code indicates that the operation was successful
      }
    }
  });
};

exports.deleteEmployeeByIdDbQuery = (req, query, callback) =>{
	employee.deleteOne(query,(error, response)=>{
		if(error)
		{
			callback(error);
		}
		else
		{
			callback(response);
		}
	});
}
