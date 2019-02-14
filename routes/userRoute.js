const Router = require('koa-router')
const IO = require('koa-socket-2')

class UserRouter extends Router {
    constructor(options = {}) {
        super()
        this.options = options
        this.userService = options.userService
    }

    init(app) {
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
    }

    async login(ctx) {}

    async signup(ctx) {}

    async getUser(ctx) {}

    async getUsers(ctx) {}

    async createUser(ctx) {}

    async updateUser(ctx) {}

    async _handleEvents(io) {
        io.on('connection', ctx => {
            ctx.socket.emit('connected', { msg: 'socket connection was established' })
            ctx.socket.on('stateChanged', state => {
                ctx.socket.broadcast.emit('updateState', { ...state })
            })
        })
    }
}

module.exports = UserRouter