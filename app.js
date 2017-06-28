var express = require('express');
var privyController = require('privy/privyController');
var todoController = require('./controllers/todoController');


var app = express();

//setup template engine.

app.set('view engine', 'ejs');

//static file setup
app.use(express.static('./public'));

//port listening
app.listen(3000);
console.log("listening to port 3000");

//fire controllers
todoController(app);