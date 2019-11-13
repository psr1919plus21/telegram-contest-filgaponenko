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
      js_bundle: 'login',
      css_bundle: 'login',
      breadcrumbs: 'Welcome :)'
    });
  });

  server.get('/code', function (req, res) {
    const user = currentUser.getUser();

    res.render('code', { 
      js_bundle: 'code',
      css_bundle: 'login',
      breadcrumbs: 'Enter SMS code',
      phone_number: user.phone_number,
      logo_mod: 'monkey'
    });
  });

  server.get('/feed', function (req, res) {
    const user = currentUser.getUser();
    const contacts = currentUser.getContacts();

    res.render('feed', { 
      js_bundle: 'feed',
      css_bundle: 'feed',
      breadcrumbs: 'Feed'
    });
  });

  server.listen(port, function() {
    console.log('Express server listen port: ', port);
    new Api({ server });
  });
}

