const Router = require('koa-router');

class UserRouter extends Router {
    constructor(options = {}) {
        super()
        this.options = options
        this.userService = new options.UserService()
    }

    init(app) {
        this.prefix(process.env.PREFIX)
        app.use(this.routes())
        app.use(this.allowedMethods())
    }

    async home(ctx) {

    }
}

module.exports = UserRouter