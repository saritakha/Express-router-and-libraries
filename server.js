const express = require('express');
const moment = require('moment');
const errorhandler = require('errorhandler');
const notifier = require('node-notifier');

//init app
const app = express();

//assignment3: error handling
///////////////////////////////////////////////////////
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!');
  res.status(404).send('resource cannot be found');
})

  //assignment4
  ////////////////////////////////////////////////////
  // I am using error handle to tackle the error
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler({log: errorNotification}))
}

function errorNotification (err, str, req) {
  var title = 'Error in ' + req.method + ' ' + req.url

  notifier.notify({
    title: title,
    message: str
  })
}

//assignment5 - routes in separate modules
app.use('/users', require('./routes/users'));

app.get('/', (req,res,next) => {
res.send('Hello World');
next();
})

// assignment 1:Rest revisited
/////////////////////////////////////////////////////////
// get user by id
app.get('/user/:id', (req, res, next) => {
    res.send('User' +req.params.id);
    next();
})

//update user
app.put('/user/:id', (req, res, next) => {
  res.send('User' +req.params.id+ 'is edited');
  next();
})

//post
app.put('/user', (req, res, next) => {
  res.send('User added');
  next();
})
  
//delete
app.delete('/user/:id', (req, res, next) => {
  res.send('User' +req.params.id+ 'deleted');
  next();
})


// assignment 2: middleware
/////////////////////////////////////////////////////////
app.get('/*', (req, res) => {
  const path = req.path;
  const Time = moment(Date.now()).format('LLLL');
  //ip
  const ip = req.headers['x-forwarded-for'] ||
             req.connection.remoteAddress  ||
             req.socket.remoteAddress;

  console.log('Time: '+Time);
  console.log('Path: '+path);
  console.log('IP: '+ip);
  console.log('Browser: '+(req.headers['user-agent']) );
});

  app.listen(3000);