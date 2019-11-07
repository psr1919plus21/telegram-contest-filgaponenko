const path = require('path');
const os = require('os');
const express = require('express');
const bodyParser = require('body-parser');
const server = express();

const Api = require('./Api');

initServer({ server, port: 3000 });

function initServer({ server, port }) {

  server.use(bodyParser.json()); 
  server.use('/static', express.static('dist'));

  server.get('/', function (req, res) {
    res.send('Hello World!');
  });

  server.get('/login', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../templates/login.html'));
  });

  server.listen(port, function() {
    console.log('Express server listen port: ', port);
    new Api({ server });
  });
}

function onPhoneNumber(phone, client) {
  console.log('Checking your phone number with Telegram...')
  client.auth.sendCode(phone, APP_ID, APP_HASH, function(result){
    if(result.instanceOf('mtproto.type.Rpc_error')){

      console.log('Result: ', result);

      // if(result.error_code === 303){ // PHONE_MIGRATE_X error (wrong datacenter)
      //   console.log('Finding Datacenter...')
      //   data.useDatacenter('DC_'+result.error_message.slice(-1),function(dc){
      //     client.end(function(){
      //       console.log('rexonect');
      //     })
      //   })
      // } else {
      //   data.switchToBox(data.statusWindow)
      //   data.log('Errors:',result.error_code,result.error_message)
      // }
    } else { // NO ERROR
      console.log('USER REGISTRED!:',JSON.stringify(result))
      // data.user.registered = result.phone_registered
      // data.user.phoneCodeHash = result.phone_code_hash
      // var msg
      // if(!data.user.registered){
      //   msg = "Your number ("+data.user.phone+") is not registered.\nTelecommander will register your account with the Telegram service."
      // } else {
      //   msg = "Your number ("+data.user.phone+") is already assigned to a Telegram account.\nTelecommander will log you in."
      // }
      // msg += "\nPress ESC to exit now, or enter to continue"
      // data.popup.display(msg,0,function(){
      //   data.popup.hide()
      //   data.promptBox.input('Your telegram code:','',data.onPhoneCode)
      // })
    }
  })
}