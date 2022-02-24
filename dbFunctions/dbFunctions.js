const employee = require('../mongo/Employee');
exports.getAllEmployeesDbQuery = (req, query, callback) => {
  employee.find(query, (error, dbResponse) => {
    if (error) {
      return callback(error);
    } else {
      console.log(dbResponse);
      // check if db response has data
      if (dbResponse.length === 0) {
        return callback(error);
      } else {
        return callback(null, dbResponse);
      }
    }
  });
};

exports.getEmployeeByIdDbQuery = (req, query, callback) => {
  employee.find(query, (error, dbResponse) => {
    if (error) {
      return callback(error);
    } else {
      console.log(dbResponse);
      // check if db response has data
      if (dbResponse.length === 0) {
        return callback({'errStatusCode':404,'errMsg':'No Data found'});
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
