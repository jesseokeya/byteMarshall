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
        this.post('/login', ctx => this.login(ctx))
        this.post('/signup', ctx => this.signup(ctx))
        this.post('/cache', ctx => this.createCache(ctx))
        this.put('/cache', ctx => this.updateCache(ctx))
        this.get('/cache/:id', ctx => this.getCache(ctx))
        app.use(this.routes())
        app.use(this.allowedMethods())
        app = io.attach(app)
        this._handleEvents(io)
    }

    async login(ctx) {}

    async signup(ctx) {}

    async getCache(ctx) {}

    async createCache(ctx) {}

    async updateCache(ctx) {}

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