var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var privyController = require('../privy/privyController')
//Connect to DB
var conn = DBC;
//Create a data schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
var urlencodedParser = bodyParser.urlencoded({ extended: false});

module.exports = function(app){

    app.get('/todo', (req, res) =>{
        //get data from DB and render to view
        Todo.find({}, function(error, data){
            if(error) throw error;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, (req, res) =>{
        //get data from view and add to mongoDB
        var newTodo = Todo(req.body).save((error, data)=>{
            if (error) throw error;
            res.json(data);
        })
    });

    app.delete('/todo/:item', (req, res) =>{
        //delete the requested item from database
        Todo.find({item: req.params.item.replace(/\-/g, " ")})
            .remove((error, data) =>{
                if (error) throw error;
                res.json(data);        
            });
    });


};