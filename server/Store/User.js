class User {
    constructor() {
        this.user = {

        };
    }

    setUser(user) {
        this.user = user;
    };

    getUser() {
        return this.user;
    }
};

User.user = User.user || new User();

module.exports = User.user;