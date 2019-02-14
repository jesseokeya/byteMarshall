class UserService {
    constructor(options = {}) {
        this.options = options
        this.userDao = options.userDao
    }
}

module.exports = UserService