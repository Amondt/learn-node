var express = require('express')
var morgan = require('morgan')
var favicon = require('serve-favicon')

var app = express()

app.use(morgan('combined'))
.use(express.static(__dirname + '/public'))
.use(favicon(__dirname + '/public/favicon.ico'))

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.send('You are on the homepage')
})
.get('/upstairs/:roomNbr', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    if (Number(req.params.roomNbr)) {
        res.render('roomHtml.ejs', { roomNbr: req.params.roomNbr })
    } else {
        res.status(404).send('Not found')
    }
})
.get('/downstairs', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.send('You are downstairs')
})
.get('/count/:number', (req, res) => {
    var names = ['Alex', 'Oli', 'Arthur', 'Philippe']
    res.render('count.ejs', { number: req.params.number, names })
})
.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html')
})

app.listen(8080)