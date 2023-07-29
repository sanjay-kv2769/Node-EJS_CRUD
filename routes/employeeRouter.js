const express = require('express');
const employeeRouter = express.Router();
const Employee = require('../models/Employee');

// Add Employee
employeeRouter.post('/add-employee', (req, res) => {
  // res.send('Added');
  // res.send(req.body);
  // res.send(req.body.name);
  const Data = new Employee({
    name: req.body.name,
    position: req.body.position,
    email: req.body.email,
    phone: req.body.phone,
    bio: req.body.bio,
    createdAt: req.body.createdAt,
  });
  Data.save()
    .then(() => {
      res.redirect('/api/employee/view-employee');
    })
    .catch((err) => console.log(err));
});

employeeRouter.get('/view-employee', (req, res) => {
  Employee.find()
    .then((data) => {
      res.render('employee', { data: data });
      // console.log(data);
    })
    .catch((err) => console.log(err));
});

employeeRouter.get('/edit-employee/:id', (req, res) => {
  Employee.findOne({
    _id: req.params.id,
  })
    .then((data) => {
      res.render('editemployee', { data: data });
    })
    .catch((err) => console.log(err));
});

employeeRouter.post('/update-employee/:id', (req, res) => {
  Employee.findOne({
    _id: req.params.id,
  })
    .then((data) => {
      data.name = req.body.name;
      data.position = req.body.position;
      data.email = req.body.email;
      data.phone = req.body.phone;
      data.bio = req.body.bio;

      data
        .save()
        .then(() => {
          res.redirect('/api/employee/view-employee');
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

employeeRouter.get('/delete-employee/:id', (req, res) => {
  Employee.deleteOne({
    _id: req.params.id,
  })
    .then(() => {
      res.redirect('/api/employee/view-employee');
    })
    .catch((err) => console.log(err));
});

module.exports = employeeRouter;

// employeeRouter.post('/update-employee', (req, res) => {
//   var data = {
//     name: req.body.name,
//     position: req.body.position,
//     email: req.body.email,
//     phone: req.body.phone,
//     bio: req.body.bio,
//     id: req.body.id,
//   };

//   Employee.updateOne({ _id: items.id }, { $set: data })
//     .then(function () {
//       Employee.find().then(function (bin) {
//         res.status(200).json({
//           success: true,
//           error: false,
//           message: 'Employee Details updated!',
//         });
//       });
//     })
//     .catch((err) => {
//       return res.status(401).json({
//         message: 'Something went Wrong!',
//       });
//     });
// });
