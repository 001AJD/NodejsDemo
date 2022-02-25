var express = require('express');
var router = express.Router();
const utils = require('../utilities/utils');
const employeeController = require('../controllers/employeeController');

// TODO : add key based authentication
router.get('/', utils.validateApiKey, employeeController.getAllEmployees);
router.get('/:id',utils.validateApiKey, employeeController.getEmployeeById);
router.post('/', employeeController.addNewEmployee);
router.delete('/:id', employeeController.deleteEmployeeById);
router.put('/:id', employeeController.updateEmployeeDetailsById);

module.exports = router;
