const Router = require('koa-router')
const IO = require('koa-socket-2')

class UserRouter extends Router {
    constructor(options = {}) {
        super()
        this.options = options
        // this.userService = new options.UserService()
    }

    init(app) {
        const io = new IO()
        this.prefix(process.env.PREFIX)
        app.use(this.routes())
        app.use(this.allowedMethods())
        app = io.attach(app)
        this._handleEvents(io)
    }

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