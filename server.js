const express = require('express');
// const mustache = require('mustache');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var server = express();

server.engine('mustache', mustacheExpress());
server.set('views', './views');
server.set('view engine', 'mustache');
server.use(express.static('public'));
server.use(bodyParser.urlencoded());
server.use(expressValidator());

var todos = [];

server.get('/', (request, response) => {
    response.render('todoList', { todos });
});
server.post('/', (request, response) => {
    var todo = {};
    todo.name = request.body.name;
    todo.complete = false;
    todo.id = todos.length;
    todos.push(todo);
    response.render('todoList', { todos });
    // response.render('todoList', todos);
    // console.log('listItem', listItem);
});
server.post('/:id', (request, response) => {
    var todoId = parseInt(request.params.id);
    var todo = todos.find(q=> q.id === todoId);
    todo.complete = true;
    response.render('todoList', { todos });
    console.log('post 2');
});
server.listen(3000, function () {
    console.log('im working');
});