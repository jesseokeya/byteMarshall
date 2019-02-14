const mongoose = require('mongoose')
const User = mongoose.model('User')

class UserDao {
    constructor(options = {}) {
        this.options = options
        this.user = User
    }

    async createUser(ctx) {
        try {
            let newUser = new this.user(ctx)
            return newUser.save()
        } catch (err) {
            throw err
        }
    }

    async users() {
        try {
            return this.user.find()
        } catch (err) {
            throw err
        }
    }

    async user(id) {
        try {
            return this.user.findById(id)
        } catch (err) {
            throw err
        }
    }

    async updateUser(context) {
        try {
            return this.user.findOneAndUpdate({ _id: context.id }, context, { new: true })
        } catch (err) {
            throw err
        }
    }

    async deleteUser(id) {
        try {
            return this.user.findOneAndRemove({ _id: id })
        } catch (err) {
            throw err
        }
    }

}

module.exports = UserDao