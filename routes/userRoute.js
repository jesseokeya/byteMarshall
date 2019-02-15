const Router = require('koa-router')
const IO = require('koa-socket-2')

/**
 * Class Defines and associates user functions to specific user routes.
 * @constructor Initializes the cache route
 * @param {Object} options - Options passed into the class constructor
 */
class UserRouter extends Router {
    constructor(options = {}) {
        super()
        this.options = options
        this.userService = options.userService
    }

    /**
     * Initializes routes for userRoute Class
     * @param {Object} app - Koa app object
     * @throws {Error} throws an error if one occurs while running
     */
    init(app) {
        try {
            const io = new IO()
            this.prefix(process.env.PREFIX)
            this.get('/users/', ctx => this.getUsers(ctx))
            this.get('/user/:id', ctx => this.getUsers(ctx))
            this.post('/login/', ctx => this.login(ctx))
            this.post('/signup/', ctx => this.signup(ctx))
            this.post('/users/', ctx => this.createUser(ctx))
            this.patch('/users/', ctx => this.updateUser(ctx))
            this.delete('/users/:id', ctx => this.deleteUser(ctx))
            app.use(this.routes())
            app.use(this.allowedMethods())
            app = io.attach(app)
            this._handleEvents(io)
        } catch (err) {
            throw err
        }
    }

    async login(ctx) {
        try {

        } catch (err) {
            throw errr
        }
    }

    async signup(ctx) {
        try {

        } catch (err) {
            throw errr
        }
    }

    /**
     * Retrieves a user object
     * @param {Object} ctx - Koa context object
     * @returns {Promise<Object>} Retrieved user Object
     * @throws {Error} Throws an error if one occurs while running
     */
    async getUser(ctx) {
        try {

        } catch (err) {
            throw errr
        }
    }

    /**
     * Retrieves all user objects
     * @param {Object} ctx - Koa context object
     * @returns {Promise<[Object]>} List of user objects
     * @throws {Error} Throws an error if one occurs while running
     */
    async getUsers(ctx) {
        try {

        } catch (err) {
            throw errr
        }
    }

    /**
     * Creates a user object
     * @param {Object} ctx - Koa context object
     * @returns {Promise<[Object]>} Created user object
     * @throws {Error} Throws an error if one occurs while running
     */
    async createUser(ctx) {
        try {

        } catch (err) {
            throw errr
        }
    }

    /**
     * Updates a user object
     * @param {Object} ctx - Koa context object
     * @returns {Promise<[Object]>} Updated user object
     * @throws {Error} Throws an error if one occurs while running
     */
    async updateUser(ctx) {
        try {

        } catch (err) {
            throw errr
        }
    }

    /**
     * Deletes a user object
     * @param {Object} ctx - Koa context object
     * @returns {Promise<[Object]>} Deleted user object
     * @throws {Error} Throws an error if one occurs while running
     */
    async deleteUser(ctx) {
        try {

        } catch (err) {
            throw errr
        }
    }

    /**
     * Helper functio  to Handle real-time websocket connections between users
     * @param {Object} io - socket.io context object
     * @throws {Error} Throws an error if one occurs while running
     */
    async _handleEvents(io) {
        try {
            io.on('connection', ctx => {
                ctx.socket.emit('connected', { msg: 'socket connection was established' })
                ctx.socket.on('stateChanged', state => {
                    ctx.socket.broadcast.emit('updateState', { ...state })
                })
            })
        } catch (err) {
            throw err
        }
    }
}

module.exports = UserRouter