var http = require('http')
var fs = require('fs')

var server = http.createServer((req, res) => {
    fs.readFile('./index.html', 'utf-8', (error, content) => {
        res.writeHead(200, {"Content-Type": "text/html" })
        res.end(content)
    })
})

var io = require('socket.io').listen(server)

io.sockets.on('connection', socket => {

    socket.on('newPlayer', pseudo => {
        socket.pseudo = pseudo
    })

    socket.on('message', message => {
        console.log(socket.pseudo + ': ' + message)
        socket.emit('message', 'Server: Hi ' + socket.pseudo + ', I\'m the server !')
    })

    // socket.emit('message', 'You are connected !')
    // console.log('New client connected')
    // socket.broadcast.emit('message', 'Another client has just connected')

    // socket.on('message', (message) => {
    //     console.log('Client: ' + message)
    //     
    // })
})

server.listen(8080)