 /**
  * Class User Service
  * @constructor Initializes the user service
  * @param {Object} options - Options passed into the class constructor
  */
class UserService {
    constructor(options = {}) {
        this.options = options
        this.userDao = options.userDao
    }

    /**
     * Creates a new user
     * @param {Object} context - Fields used to create user
     * @returns {Promise<Object>} Created user
     * @throws {Error} Throws an error if one occurs while running
     */
    async createUser(context) {
        try {

        } catch (err) {
            throw err
        }
    }

    /**
     * Retrieves all users
     * @returns {Promise<[Object]>} List of users
     * @throws {Error} Throws an error if one occurs while running
     */
    async getUsers() {
        try {

        } catch (err) {
            throw err
        }
    }

    /**
     * Retrieve user by id
     * @param {String} id - Unique identification for a particular user object
     * @returns {Promise<Object>} User object
     * @throws {Error} Throws an error if one occurs while running
     */
    async getUser(id) {
        try {

        } catch (err) {
            throw err
        }
    }

    /**
     * Updates a user
     * @param {Object} context - Fields used to update user
     * @returns {Promise<Object>} Updated user
     * @throws {Error} Throws an error if one occurs while running
     */
    async updateUser(context) {
        try {

        } catch (err) {
            throw err
        }
    }

    /**
     * Deletes user by id
     * @param {String} id - Unique identification for a particular user object
     * @returns {Promise<Object>} Deleted user object
     * @throws {Error} Throws an error if one occurs while running
     */
    async deleteUser(id) {
        try {

        } catch (err) {
            throw err
        }
    }
}

module.exports = UserService