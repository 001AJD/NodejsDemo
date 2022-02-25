const employeeServices = require('../services/employeeServices');
const utils = require('../utilities/utils');
// implement frameError function to handle error scenarios
// add security headers in the response

exports.getAllEmployees = (req, res, next) => {
  employeeServices.getAllEmployees(req, (error, response) => {
    if (error) {
      res.send({ err: error });
    } else {
		//TODO limit the number of employee returned to 10
      res.send(response);
    }
  });
};

exports.getEmployeeById = (req, res, next) => {
  const employeeId = req.params.id; //TODO validate/sanitize input params, if invalid params response with bad request status code
  employeeServices.getEmployeeById(req, employeeId, (error, response) => {
    if (error) {
      utils.FrameAndSendErrorResponse(error, req, res, next);
    } else {
      res.send(response);
    }
  });
};

exports.addNewEmployee = (req, res, next) => {
	//TODO validate/sanitize input params, if invalid params response with bad request status code
  const newEmployee = {
    name: req.body.name,
    city: req.body.city,
    empid: req.body.empid,
  };
  console.log(newEmployee);
  employeeServices.addNewEmployee(req, newEmployee, (error, response) => {
    if (error) {
      res.send({ err: error });
    } else {
      res.send(response);
    }
  });
};

exports.deleteEmployeeById = (req, res, next) => {
  const employeeId = req.params.id;
  employeeServices.deleteEmployeeById(req, employeeId, (error, response) => {
    if (error) {
      res.send({ err: error });
    } else {
      res.send(response);
    }
  });
};

exports.updateEmployeeDetailsById = (req, res, next) => {
	// extract details from the request
	const employeeId = req.params.id;
	let newEmployeeObj = {};
	if(req.body.name !== null)
	{
		newEmployeeObj.name = req.body.name;
	}
	if(req.body.city !== null)
	{
		newEmployeeObj.city = req.body.city;
	}
	employeeServices.updateEmployeeDetailsById(req, employeeId, newEmployeeObj, (error, response) => {
	  if (error) {
		res.send({ err: error });
	  } else {
		res.send(response);
	  }
	});
  };
