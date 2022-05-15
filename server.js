/*
 * name: Jackson Hart
 * email: hartjack@oregonstate.edu
 */

const http = require('http')
const fs = require('fs')
const PORT = process.env.PORT || 3000

var index_html
var index_css
var index_js
var err_html

function serveJS(response) {
    response.setHeader('Content-Type', 'application/javascript')

    console.log('Writing JS...')
    fs.readFile('./public/index.js', 'utf-8', (err, js) => {
        if (err) {
            response.statusCode = 404
            throw err
        } else {
            response.write(js)
            response.statusCode = 200
        }

        response.end()
        index_js = js
    })
}


function serveCSS(response) {
    response.setHeader('Content-Type', 'text/css')

    console.log('Writing CSS...')
    fs.readFile('./public/style.css', 'utf-8', (err, css) => {
        if (err) {
            response.statusCode = 404
            throw err
        } else {
            response.write(css)
            response.statusCode = 200
        }

        response.end()
        index_css = css
    })
}

function serveHTML(response) {
    response.setHeader('Content-Type', 'text/html')

    console.log('Writing HTML...')
    fs.readFile('./public/index.html', 'utf-8', (err, html) => {
        if (err) {
            response.statusCode = 404
            throw err
        } else {
            response.write(html)
            response.statusCode = 200
        }

        response.end()
        index_html = html
    })
}

function serveErr(response) {
    response.setHeader('Content-Type', 'text/html')

    console.log('Writing 404.html...')
    fs.readFile('./public/404.html', 'utf-8', (err, html) => {
        if (err) {
            response.statusCode = 404
            throw err
        } else {
            response.write(html)
            response.statusCode = 404
        }

        response.end()
        err_html = html
    })
}

var server = http.createServer((req, res) => {
    if (process.env.PORT) {
        port = process.env.PORT
    }

    if (req.url === '/index.html' || req.url === '/') {
        if (index_html) {
            res.setHeader('Content-Type', 'text/html')
            res.write(index_html)
            res.end()
        } else {
            serveHTML(res)
        }
    } else if (req.url === '/style.css') {
        if (index_css) {
            res.setHeader('Content-Type', 'text/css')
            res.write(index_css)
            res.end()
        } else {
            serveCSS(res)
        }
    } else if (req.url === '/index.js') {
        if (index_js) {
            res.setHeader('Content-Type', 'application/javascript')
            res.write(index_js)
            res.end()
        } else {
            serveJS(res)
        }
    } else if (req.url != '/favicon.ico' || res.statusCode == 404) {
        if (err_html) {
            res.setHeader('Content-Type', 'text/html')
            res.write(err_html)
            res.end()
        } else {
            serveErr(res)
        }
    }
})

server.listen(PORT)