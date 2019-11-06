const os = require('os');
const telegramLink = require('telegram.link')();

const CONSTANTS = require('./constants');

class TelegramApp {
    constructor() {
        this.appSettings = {
            APP_ID: CONSTANTS.APP_ID,
            APP_HASH: CONSTANTS.APP_HASH,
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
        if (!error) {
            if(!this.appSettings.authKey){
                console.log('Downloading Authorization Key...')
                this.client.createAuthKey(function(auth){
                this.appSettings.authKey = auth.key.encrypt('password');
                // TODO: Writes the new encrypted key to disk

                // Показать форму ввода телефона
            })
            } else {
                console.log('ready');
            }
            
        } else {
            console.log('error: ', error);
        }
    }

    onPhoneNumberEnter() {
        console.log('enter phone number');
    }

    
}

module.exports = {
    TelegramApp,
}


