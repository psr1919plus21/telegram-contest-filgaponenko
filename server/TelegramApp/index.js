const os = require('os');
const telegramLink = require('telegram.link')();

const CONSTANTS = require('./constants');

class TelegramApp {
    constructor() {
        this.appSettings = {
            id: CONSTANTS.APP_ID,
            hash: CONSTANTS.APP_HASH,
            version: require('../../package.json').version,
            lang: 'en',
            deviceModel: os.type(),
            systemVersion: os.platform()+'/'+os.release()
        };

        this.client = this.createClient(this.onClientReady);
    }

    createClient(cb) {
        return telegramLink.createClient(this.appSettings, telegramLink.TEST_PRIMARY_DC, cb.bind(this));
    }

    onClientReady(error) {
        const { APP_ID, APP_HASH } = this.appSettings;
        if (!error) {
            if(!this.appSettings.authKey){
                console.log('Downloading Authorization Key...')
                const self = this;
                this.client.createAuthKey(function(auth){
                    self.appSettings.authKey = auth.key.encrypt('password');
                    // TODO: Writes the new encrypted key to disk
            })
            } else {
                console.log('logged');
            }
            
        } else {
            console.log('error: ', error);
        }
    }

    sendSMSCode({ phone }) {
        return new Promise((resolve, reject) => {
            this.client.auth.sendCode(phone, this.appSettings.id, this.appSettings.hash, function(result) {
                if(result.instanceOf('mtproto.type.Rpc_error')) {
                    if(result.error_code === 303){ // PHONE_MIGRATE_X error (wrong datacenter)
                      console.log('Something with DC');
                      // data.load('Finding Datacenter...')
                      // data.useDatacenter('DC_'+result.error_message.slice(-1),function(dc){
                      //   data.client.end(function(){
                      //     data.connect(true)
                      //   })
                      // })
                    } else {
                      console.log('Errors:',result.error_code,result.error_message);
                      reject(result);
                    }
                  } else { // NO ERROR
                    //data.log('Res:',JSON.stringify(result))
                  //   data.user.registered = result.phone_registered
                  //   data.user.phoneCodeHash = result.phone_code_hash
                    console.log('Code was sent.\nResult: ', result);
                    resolve(result);
                  }
            });
        }); 
    }

    login({ phone_number, phone_code_hash, code }) {
        console.log('\n\n\n\n\n\n++++++++++++++++++++++++phone_number: ', phone_number);
        console.log('phone_code_hash: ', phone_code_hash);
        console.log('code: ', code);
        
        return new Promise((resolve, reject) => {
            this.client.auth.signIn(phone_number, phone_code_hash, code, function(result) {
                if(result.error_code) {
                      reject(result);
                } else { 
                    console.log('!!!!!!!!!!!!!loged in!!!!: ', result);
                    resolve(result);
                }
            });
        }); 
    }

    
}

module.exports = TelegramApp;


