const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const path = require('path');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000 ; // add this to Dockerfile

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';

//connect to the database
mongoose.connect(mongoDB, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));

  //since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

// handle CORS related issues if trying to acces this API from a different domain
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "+");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next(); // invoke the next middleware in the stack
});

app.use(bodyParser.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
	console.log('Shopping List Server running on port', port)
});

