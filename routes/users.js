var express = require('express');
var router = express.Router();
const employee = require('../mongo/Employee');
var employeeArray = [
  {
    empid: '1',
    name: 'ABC',
    city: 'xyz',
  },
  {
    empid: '2',
    name: 'ABC',
    city: 'xyz',
  },
];
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(employeeArray);
  // employee.find({},(error,response)=>{
  //   if(error)
  //   {
  //     res.send({'error':err});
  //   }
  //   else
  //   {
  //     console.log(response);
  //     res.send(response);
  //   }
  // });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const response = employeeArray.filter((emp) => {
    if (emp.empid === id) {
      return emp;
    }
  });
  if (response.length === 0) {
    res.sendStatus(404);
  } else {
    res.send(response);
  }
});

router.post('/', (req, res, next) => {
  const newEmployee = {
    name: req.body.name,
    city: req.body.city,
    empid: req.body.empid,
  };
  employeeArray.push(newEmployee);
  console.log(newEmployee);
  const empObj = {
    empid: '3',
    name: 'ABC',
    city: 'xyz',
  };
  employee.create(empObj, (err, dbResponse) => {
    if (err) {
      res.send({ error: err });
    } else {
      console.log(dbResponse);
      res.send(dbResponse);
    }
  });
  // res.sendStatus(201);
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  employeeArray.filter((item) => {
    if (item.empid === id) {
      delete employeeArray[0];
      res.sendStatus(204);
    }
  });
});

// TODO PUT
// update data based on emp id
// using findIndex method
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const name = req.body.name;
  const city = req.body.city;
  let index = employeeArray.findIndex((item) => item.empid === id); // find the index of element based on empid
  console.log(index);
  if (name !== undefined) {
    // check if name is provided in the API request if not keep as is
    employeeArray[index].name = name;
  }
  if (city !== undefined) {
    // check if city is provided in the API request if not keep as is
    employeeArray[index].city = city;
  }
  if (index === -1) {
    res.sendStatus(404);
  } else {
    // if empid does not exists in the array return 404 data not found response code
    res.send(204);
  }
});


// using forEach loop
// router.put('/:id', (req, res, next) => {
//   const id = req.params.id;
//   console.log(id);
//   const name = req.body.name;
//   const city = req.body.city;
//   let index = employeeArray.forEach((item, index, arr) => {
//     if (item.empid === id) {
//       if (name !== undefined) {
//         // check if name is provided in the API request if not keep as is
//         arr[index].name = name;
//       }
//       if (city !== undefined) {
//         // check if city is provided in the API request if not keep as is
//         arr[index].city = city;
//       }
//       res.sendStatus(204);
//     }
//   }); // find the index of element based on empid
//   res.sendStatus(404);  
// });

//TODO search based on name
module.exports = router;
