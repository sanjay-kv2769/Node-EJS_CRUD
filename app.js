const express = require('express');
const app = express();
const { mongoose } = require('mongoose');
require('dotenv').config();
const employeeRouter = require('./routes/employeeRouter');
const bodyParser = require('body-parser');
const Employee = require('./models/Employee');
const methodOverride = require('method-override');

// serving static files
app.use(express.static('public'));

//midlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json())

// ejs config
app.set('view engine', 'ejs');
app.set('views', './views/pages');

// db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('Connected to database'))
  .catch('error', () => console.log(error));

// routes
app.use('/api/employee', employeeRouter);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/addemployee', (req, res) => {
  res.render('addemployee');
});
app.get('/editemployee', (req, res) => {
  res.render('editemployee');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/about', (req, res) => {
  res.render('about');
});

// Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on: ${process.env.PORT}`);
});
