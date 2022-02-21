var express = require('express');
var router = express.Router();
const employee = require('../mongo/Employee');
var employeeArray = [
  {
    'empid':'1',
    'name': 'ABC',
    'city': 'xyz',
  },
  {
    'empid':'2',
    'name': 'ABC',
    'city': 'xyz',
  },
];
/* GET users listing. */
router.get('/', function (req, res, next) {
  // res.send(employee);
  employee.find({},(error,response)=>{
    if(error)
    {
      res.send({'error':err});
    }
    else
    {
      console.log(response);
      res.send(response);
    }
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const response = employeeArray.filter((emp)=>{if(emp.empid === id){return emp}});
  if(response.length === 0){
    res.sendStatus(404);
  }else{
    res.send(response);
  }
});

router.post('/', (req, res, next) => {
  const newEmployee = { 'name': req.body.name, 'city': req.body.city, 'empid': req.body.empid };
  employeeArray.push(newEmployee);
  console.log(newEmployee);
  const empObj = {
    'empid':'3',
    'name': 'ABC',
    'city': 'xyz',
  }
  employee.create(empObj,(err,dbResponse)=>{
    if(err){
      res.send({'error':err});
    }
    else
    {
      console.log(dbResponse);
      res.send(dbResponse);
    }
  });
  // res.sendStatus(201);
});

router.delete('/:id',(req,res,next)=>{
  const id = req.params.id;
  employeeArray.filter((item)=>{
    if(item.empid === id){
      delete employeeArray[0];
      res.sendStatus(204);
    }
  });
});

// TODO PUT
// update data based on emp id

//TODO search based on name
module.exports = router;
