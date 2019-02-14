const mongoose = require('mongoose')
const User = mongoose.model('User')

class UserDao {
    constructor(options = {}) {
        this.options = options
    }
}

module.exports = UserDao