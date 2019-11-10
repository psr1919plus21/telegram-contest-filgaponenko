const TelegramApp = require('../TelegramApp');

class Api {
    constructor({ server }) {
        this.store = {
            user: {}
        }
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
            // Получить телефон от пользователя 
            const phone_number = req.body.phone_number;
            self.store.user.phone = phone_number;

            // Отправить код на телефон
            self.telegramApp.sendSMSCode({ phone: self.store.user.phone }).then((result) => {
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