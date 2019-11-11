const TelegramApp = require('../TelegramApp');
const currentUser = require('../Store/User');

class Api {
    constructor({ server }) {
        this.server = server;
        this.telegramApp = new TelegramApp();

        this.initSendPhone(); 
    }

    initSendPhone() {
        const self = this;

        this.server.post('/api/send_phone', function (req, res) {
            if (!req.body) {
                console.log('Error! req.body: ', req.body);
                return;
            }
           
            const phone_number = req.body.phone_number;
            self.telegramApp.sendSMSCode({ phone: phone_number }).then((result) => {
                currentUser.setUser({
                    phone_registered: result.phone_registered,
                    phone_code_hash: result.phone_code_hash,
                    phone_number: phone_number
                });
                res.send(result);
            }).catch((error) => {
                res.statusCode = error.error_code;
                res.send({
                    status: error.error_code,
                    message: error.error_message
                });
            })
          });
    }
}

module.exports = Api;