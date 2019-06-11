// import http from 'http'
var http = require('http')
var url = require('url')
var querystring = require('querystring')
var EventEmitter = require('events').EventEmitter

// external modules test
var test = require('./test')
var markdown = require('markdown').markdown

console.log(markdown.toHTML('Un *super* paragraphe en **markdown** !'))

test.welcome('Alex')

var jeu = new EventEmitter()

jeu.on('gameover', (msg) => {
    console.log(msg)
})

jeu.on('newplayer', (name, age) => {
    console.log(name, age)
})

jeu.emit('newplayer', 'Alex', 20)
jeu.emit('gameover', 'You lose !')

var server = http.createServer((req, res) => {

    var page = url.parse(req.url).pathname
    var params = querystring.parse(url.parse(req.url).query)
    console.log(page)
    console.log(params)

    res.writeHead(
        200,
        {"Content-Type": "text/plain"}
    )

    if (page === '/') {
        res.write('Bienvenue sur la page d\'accueil !')
        if ('name' in params && 'age' in params) {
            res.write('\nYour name is ' + params['name'] + ' and you are ' + params['age'] + ' years old')
        }
    } else if (page === '/etage') {
        res.write('vous vous situez à l\'etage')
    } else if (page === '/sous-sol') {
        res.write('Vous vous situez au sous-sol')
    } else {
        res.writeHead(400)
        res.write('Mauvais chemin, faites demi-tour')
    }

    res.end()

    // res.write(
    //     '<!DOCTYPE html>'+
    //     '<html>'+
    //     '    <head>'+
    //     '        <meta charset="utf-8" />'+
    //     '        <title>Ma page Node.js !</title>'+
    //     '    </head>'+ 
    //     '    <body>'+
    //     '        <p>Mon premier paragraphe <strong>HTML</strong> sent via node server!</p>'+
    //     '    </body>'+
    //     '</html>'
    // )
})

server.on('close', () => {
    console.log('bye !')
})

server.listen(8080)