const mongoose = require('mongoose')
const User = mongoose.model('User')

/**
 * Class access the database and performs CRUD operations on the user
 * @constructor
 * @param {Object} options - Options passed into the class constructor
 */
class UserDao {
    constructor(options = {}) {
        this.options = options
        this.user = User
    }

    /**
     * Creates a new user
     * @param {Object} context - Fields passed in used in creating a new user
     * @returns {Promise<Object>} New user objects
     * @throws {Error} Throws an error if one occurs while running 
     */
    async createUser(ctx) {
        try {
            let newUser = new this.user(ctx)
            return newUser.save()
        } catch (err) {
            throw err
        }
    }

    /**
     * Retrieves all users
     * @returns {Promise<Object>} List of all users
     * @throws {Error} Throws an error if one occurs while running 
     */
    async users() {
        try {
            return this.user.find()
        } catch (err) {
            throw err
        }
    }

    /**
     * Retrieves a particular user by id
     * @param {String} id - Unique id for a specific user object
     * @returns {Promise<Object>} A user object
     * @throws {Error} Throws an error if one occurs while running 
     */
    async user(id) {
        try {
            return this.user.findById(id)
        } catch (err) {
            throw err
        }
    }

    /**
     * Updates a particular user by id
     * @param {Object} context - User fields to be updated
     * @returns {Promise<Object>} A user object
     * @throws {Error} Throws an error if one occurs while running 
     */
    async updateUser(context) {
        try {
            return this.user.findOneAndUpdate({ _id: context.id }, context, { new: true })
        } catch (err) {
            throw err
        }
    }

    /**
     * Deletes a user
     * @param {String} id - Unique id for a specific user object
     * @returns {Promise<Object>} A user object
     * @throws {Error} Throws an error if one occurs while running 
     */
    async deleteUser(id) {
        try {
            return this.user.findOneAndRemove({ _id: id })
        } catch (err) {
            throw err
        }
    }

}

module.exports = UserDao