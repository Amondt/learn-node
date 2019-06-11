var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var urlencodedParser = require('body-parser').urlencoded({ extended: false })

var todos = [
    { id: 1, user: 'Alex', content: 'buy eggs' },
    { id: 2, user: 'Arthur', content: 'clean bathroom' }
]

io.sockets.on('connection', socket => {

    // New client connection
    console.log('New client connection request')
    socket.emit('connectReq')
    socket.on('connectReq', user => {
        socket.user = user
        console.log(socket.user)
    })

    // Add todo event
    // Receive from a client > broadcast to others
    socket.on('addTodo', (user, content, id) => {
        todos.push({ id, user, content })
        console.log('-----Todo Added-----')
        console.log(todos)
        socket.broadcast.emit('addTodo', user, content, id)
    })

    // Del todo event
    // Receive from a client > broadcast to others
    socket.on('delTodo', id => {
        var servId = id.slice(4)
        todos = todos.filter(todo =>  todo.id != servId)
        console.log('-----Todo Removed-----')
        console.log(todos)
        socket.broadcast.emit('delTodo', id)
    })
})

app
.get('/', (req, res) => {
    res.status(200)
    res.setHeader('Content-Type', 'text/html')
    res.render('index.ejs', { todos })
    console.log(todos)
})

.get('**', (req, res) => {
    res.status(404)
    res.send('Page not found...')
})

server.listen(8080)