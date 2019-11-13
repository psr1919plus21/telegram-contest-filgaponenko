const TelegramApp = require('../TelegramApp');
const currentUser = require('../Store/User');

class Api {
    constructor({ server }) {
        this.server = server;
        this.telegramApp = new TelegramApp();

        this.initSendPhone(); 
        this.initLogin();
        this.initGetContacts();
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
                result.user = currentUser.getUser();
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

    initLogin() {
        const self = this;

        this.server.post('/api/login', function (req, res) {
            if (!req.body) {
                console.log('Error! req.body: ', req.body);
                return;
            }
           
            const phone_number = req.body.phone_number;
            const phone_code_hash = req.body.phone_code_hash;
            const code = req.body.code;

            self.telegramApp.login({ 
                phone_number,
                phone_code_hash,
                code,
            }).then((result) => {
                self.telegramApp.getContacts()
                    .then((userContacts) => {
                        const fakeContacts = [
                            {
                                first_name: 'Kondo',
                                last_name: 'Ieuasu'
                            },
                            {
                                first_name: 'Rustem',
                                last_name: 'Tolstobrov'
                            },
                            {
                                first_name: 'Bartolomej',
                                last_name: 'Dohnal'
                            }
                        ];
                        currentUser.setContacts(fakeContacts);    
                        res.send(result);  
                    });  
            }).catch((error) => {
                res.statusCode = error.error_code;
                res.send({
                    error_code: error.error_code,
                    error_message: error.error_message
                });
            })
          });
    }

    initGetContacts() {
        const self = this;

        this.server.get('/api/contacts', function (req, res) {
            const contacts = currentUser.getContacts();
            res.send(contacts);
        });
    }
}

module.exports = Api;