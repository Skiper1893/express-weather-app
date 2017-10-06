const express = require('express');
const passport = require('passport');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');
const config = require('./server/config/db');

mongoose.Promise = global.Promise;
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
  console.log('connected to database: ' + config.database);  
});

mongoose.connection.on('error', (err) => {
  console.log('Error: ' + err);
});

const app = express();
const port = 4000;

app.use(cors());

app.use(express.static(__dirname + 'src'));

//router middleware
const users = require('./server/routes/index');

//bodyparser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./server/config/passport')(passport);

//routes
app.use('/api', users);

app.listen(port, ()=>{
  console.log('Server started listen on port: ' + port);
});