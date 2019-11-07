const os = require('os');
const telegramLink = require('telegram.link')();

const CONSTANTS = require('./constants');

class TelegramApp {
    constructor() {
        const appSettings = {
            APP_ID: CONSTANTS.APP_ID,
            APP_HASH: CONSTANTS.APP_HASH,
            version: require('../../package.json').version,
            lang: 'en',
            deviceModel: os.type(),
            systemVersion: os.platform()+'/'+os.release()
        };

        const client = telegramLink.createClient(appSettings, telegramLink.TEST_PRIMARY_DC, () => {
            if(!appSettings.authKey){
                console.log('Downloading Authorization Key...')
                client.createAuthKey(function(auth){
                    appSettings.authKey = auth.key.encrypt('password');
                    // TODO: Writes the new encrypted key to disk

                    client.auth.sendCode('79780987058', appSettings.APP_ID, appSettings.APP_HASH, () => {
                        console.log('\n\n\n\n\nsent\n\n\n\n');
                    });
            })
            } else {
                console.log('logged');
            }
        })
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

                    self.client.auth.sendCode('79780987058', APP_ID, APP_HASH, () => {
                        console.log('\n\n\n\n\nsent\n\n\n\n');
                    });
            })
            } else {
                console.log('logged');
            }
            
        } else {
            console.log('error: ', error);
        }
    }

    sendSMSCode({ phone }) {
        const { APP_ID, APP_HASH } = this.appSettings;

        console.log('phone: ', phone);
        console.log('APP_ID: ', APP_ID);
        console.log('APP_HASH: ', APP_HASH);

        this.client.auth.sendCode('+79780987058', APP_ID, APP_HASH
            // if(result.instanceOf('mtproto.type.Rpc_error')) {
            //   if(result.error_code === 303){ // PHONE_MIGRATE_X error (wrong datacenter)
            //     console.log('Something with DC');
            //     // data.load('Finding Datacenter...')
            //     // data.useDatacenter('DC_'+result.error_message.slice(-1),function(dc){
            //     //   data.client.end(function(){
            //     //     data.connect(true)
            //     //   })
            //     // })
            //   } else {
            //     console.log('Errors:',result.error_code,result.error_message)
            //   }
            // } else { // NO ERROR
            //   //data.log('Res:',JSON.stringify(result))
            // //   data.user.registered = result.phone_registered
            // //   data.user.phoneCodeHash = result.phone_code_hash

            // console.log('Code was sent.\nResult: ', result);
            // }
              
          )
    }

    
}

module.exports = TelegramApp;


