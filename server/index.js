const path = require('path');
const os = require('os');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const server = express();

const Api = require('./Api');

initServer({ server, port: 3000 });

function initServer({ server, port }) {

  server.engine('handlebars', exphbs());
  server.set('view engine', 'handlebars');
  server.use(bodyParser.json()); 
  server.use('/static', express.static('dist'));

  server.get('/', function (req, res) {
    res.render('home', { foo: 'bar'});
  });

  server.get('/login', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../templates/login.html'));
  });

  server.get('/code', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../templates/code.html'));
  });

  server.listen(port, function() {
    console.log('Express server listen port: ', port);
    new Api({ server });
  });
}

