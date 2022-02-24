var express = require('express');
var router = express.Router();

const employeeController = require('../controllers/employeeController');

// TODO : add key based authentication
router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.post('/', employeeController.addNewEmployee);
router.delete('/:id', employeeController.deleteEmployeeById);
router.put('/:id', employeeController.updateEmployeeDetailsById);

module.exports = router;
