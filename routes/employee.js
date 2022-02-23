var express = require('express');
var router = express.Router();
const employee = require('../mongo/Employee');

/* GET list of all employees */
router.get('/', function (req, res, next) {
  employee.find({},(error,response)=>{
    if(error)
    {
      res.send({'error':err});
    }
    else
    {
      console.log(response);
      // check if db response has data
      if(response.length === 0)
      {
        res.sendStatus(404); // 404 indicates data not found
      }
      else
      {
        res.send(response); // returns db response
      }
    }
  });
});

/*GET employee details based on employee id */
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  employee.find({empid: id},(error,response)=>{
    if(error)
    {
      res.sendStatus(500);
    }
    else
    {
      console.log('dbResponse ===>  '+response);
      if(response.length === 0)
      {
        res.sendStatus(404);
      }
      else
      {
        res.send(response);
      }
    }
  });
});

/*POST add new employee */
router.post('/', (req, res, next) => {
  // constructing Employee object to be inserted into DB
  const newEmployee = {
    name: req.body.name,
    city: req.body.city,
    empid: req.body.empid,
  };
  console.log('Object to be loaded into db '+newEmployee);
  // mongo query to create(insert) new document into DB
  employee.create(newEmployee, (err, dbResponse) => {
    if (err) {
      console.log(err);
      res.send({ error: err });
    } else {
      console.log(dbResponse);
      res.sendStatus(201); // 201 indicates the new resource has been created
    }
  });
});

/*DELETE employee based on employee id */
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  employee.deleteOne({empid : id},(error,dbResponse)=>{
    if(error)
    {
      console.log('error occurred whille querying mongodb => '+error);
      res.sendStatus(500);
    }
    else
    {
      console.log('response from mongodb  '+ dbResponse);
      res.sendStatus(204);
    }
  });
});

/* PUT update employee name or city based on empid */
router.put('/:id',(req,res,next)=>{
  // extract details from the request
  const empId = req.params.id;
  const name = req.body.name;
  const city = req.body.city;

  let updateObj = {};
  if(name !== '')
  {
    // add name in the update query if provided in the request
    updateObj.name = name;
  }
  if(city !== '')
  {
    // add city in the udpate query if provided in the request
    updateObj.city = city;
  }
  console.log('update query => '+ updateObj);
  // mongodb query to update one document based on filter condition
  employee.findOneAndUpdate({empid:empId},updateObj,(error,dbResponse)=>{
    if(error)
    {
      console.log('error occurred while querying mongodb =>'+ error);
      res.sendStatus(500);
    }
    else
    {
      if(dbResponse === null)
      {
        res.sendStatus(404); // update query did not match any document in DB
      }
      else
      {
        console.log(dbResponse);
        res.sendStatus(204); // 204 status code indicates that the operation was successful
      }
    }
  });
});

module.exports = router;
