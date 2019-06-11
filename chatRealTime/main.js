var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var ent = require('ent')

io.sockets.on('connection', socket => {
    console.log('new client connected')

    socket.on('newUser', user => {
        socket.user = user
        socket.broadcast.emit('newUser', user)
    })

    socket.on('newMsg', (user, message) => {
        socket.broadcast.emit('newMsg', user, message)
    })
})

app
.get('/', (req, res) => {
    res.status(200)
    res.setHeader('Content-Type', 'text/html')
    res.render('index.ejs')
})

.get('**', (req, res) => {
    res.send('Page not found')
})

server.listen(8080)