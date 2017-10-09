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
const port = 3000;

let corsOptions = {
    origin: 'http://my-weather-app.com',
    optionsSuccessStatus: 200, 
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'dist')));

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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, ()=>{
  console.log('Server started listen on port: ' + port);
});