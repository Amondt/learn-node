var express = require('express')
var session = require('cookie-session')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express()

app.use(session({ 
    secret: 'azerty'
}))

.use((req, res, next) => {
    if (!req.session.todos) {
        req.session.todos = [
            { id: 1, todo: 'Manger'},
            { id: 2, todo: 'Boire'},
            { id: 3, todo: 'Dormir'},
            { id: 4, todo: 'Coder'},
        ]
    }
    next()
})

.get('/', (req, res) => {
    res.status(200)
    res.setHeader('Content-Type', 'text/html')
    res.render('main.ejs', { todos: req.session.todos })
})

.post('/add', urlencodedParser, (req, res) => {
    if (req.body.todoInput != '') {
        req.session.todos.push({ id: Math.random() * 1000000 | 0, todo: req.body.todoInput })
    }
    console.log(req.session.todos)
    res.redirect('/')
})

.get('/del/:todoId', (req, res) => {
    req.session.todos = req.session.todos.filter(todo => todo.id != req.params.todoId)
    console.log(req.params.todoId)
    console.log(req.session.todos)
    res.redirect('/')
})

.get('**', (req, res) => {
    res.status(404)
    res.setHeader('Content-Type', 'text/html')
    res.send('Wrong path...')
})

.listen(8080)