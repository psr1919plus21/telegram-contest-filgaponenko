class User {
    constructor() {
        this.user = {};
        this.contacts = {};
    }

    setUser(user) {
        this.user = user;
    };

    getUser() {
        return this.user;
    }

    setContacts(contacts) {
        this.contacts = contacts;
    }

    getContacts() {
        return this.contacts;
    }
};

User.user = User.user || new User();

module.exports = User.user;