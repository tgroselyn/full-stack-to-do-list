//array for tests
let testArray = [];

//requires
const express = require('express');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/tasks.router.js');

//create app and set PORT
const app = express();
const PORT = 5500;

//middleware
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended:true}));

//routes
app.use('/tasks', tasksRouter);

//spin up server
app.listen(PORT, ()=> {
    console.log('App running on PORT:', PORT);
});