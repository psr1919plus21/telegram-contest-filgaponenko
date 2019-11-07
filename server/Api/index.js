const TelegramApp = require('../TelegramApp');

const store = {
    user: {},
}
class Api {
    constructor({ server }) {
        const self = this;
        this.server = server;
        this.telegramApp = new TelegramApp();

        this.server.post('/api/send_phone', function (req, res) {
            if (!req.body) {
                console.log('Error! req.body: ', req.body);
                return;
            }
            // Получить телефон от пользователя 
            const phone_number = req.body.phone_number;
            store.user.phone = phone_number;

            // Отправить код на телефон
            self.telegramApp.sendSMSCode({ phone: store.user.phone });

            res.send({req_body_was: req.body});
          });
    }
}

module.exports = Api;