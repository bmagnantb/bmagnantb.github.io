var express = require('express')
var http = require('http')
var path = require('path')

var app = express()


app.set('port', process.argv[3] || process.env.PORT || 3000)

app.use(express.static(path.join(__dirname, '')))

app.listen(app.get('port'))