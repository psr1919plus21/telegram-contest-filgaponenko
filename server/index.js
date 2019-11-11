const path = require('path');
const os = require('os');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const server = express();

const Api = require('./Api');
const currentUser = require('./Store/User');

initServer({ server, port: 3000 });

function initServer({ server, port }) {

  server.engine('handlebars', exphbs());
  server.set('view engine', 'handlebars');
  server.use(bodyParser.json()); 
  server.use('/static', express.static('dist'));

  server.get('/', function (req, res) {
    res.render('login', { 
      page: 'login',
      breadcrumbs: 'Welcome :)'
    });
  });

  server.get('/code', function (req, res) {
    const user = currentUser.getUser();

    res.render('code', { 
      page: 'login',
      breadcrumbs: 'Enter SMS code',
      phone_number: user.phone_number
    });
  });

  server.listen(port, function() {
    console.log('Express server listen port: ', port);
    new Api({ server });
  });
}

