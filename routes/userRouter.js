const express = require('express');
const userRouter = express.Router();
const UsersDB = require('../models/User');
const bcrypt = require('bcryptjs');

// userRouter.post('/signup', async (req, res) => {
//   // const data = new User({
//   //     email: req.body.email,
//   //     password: req.body.password
//   // })
//   // await data.save()

//   const data = {
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 8),
//   };

//   if ((req.body.email && req.body.password) !== '') {
//     try {
//       const check = await User.findOne({ email: req.body.email });
//       if (check) {
//         res.send('user details already exists');
//         //   console.log('check already');
//       } else {
//         await User.insertMany([data]);
//         res.send(data);
//         console.log('Data Added');
//       }
//     } catch {
//       res.send('wrong inputs');
//     }
//   } else {
//     res.send('Enter email & password');
//   }
// });

// userRouter.post('/login', async (req, res) => {
//   if ((req.body.email && req.body.password) !== '') {
//     try {
//       const check = await User.findOne({ email: req.body.email });

//       if (check.password === req.body.password) {
//         res.status(201).json({
//           success: true,
//           error: false,
//           message: 'Login Successful',
//         });
//       } else {
//         res.send('incorrect password');
//       }
//     } catch (e) {
//       res.send('Wrong details');
//     }
//   } else {
//     res.send('Enter Email and Password');
//   }
// });

userRouter.post('/register', async (req, res) => {
  if ((req.body.email && req.body.password) !== '') {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = { email: req.body.email, password: hashedPassword };
      const check = await UsersDB.findOne({ email: req.body.email });
      if (check) {
        res.send('User already exists');
        // console.log('check already');
      } else {
        UsersDB.insertMany(user);
        res.status(201).send('Registration Successful');
      }
    } catch (error) {
      res.send('Wrong details');
    }
  } else {
    res.send('Enter email and password');
  }
});

userRouter.post('/login', async (req, res) => {
  const user = await UsersDB.findOne({ email: req.body.email });
  if (user == null) {
    return res.status(400).send('Cannot find user');
  } else {
    try {
      const pass = await bcrypt.compare(req.body.password, user.password);
      if (pass) {
        res.send('Login Successful');
      } else {
        res.send('Incorrect Password');
      }
    } catch {
      res.status(500).send();
    }
  }
});

module.exports = userRouter;
