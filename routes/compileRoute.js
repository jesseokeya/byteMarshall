const Router = require('koa-router');

class CompileRouter extends Router {
    constructor(options = {}) {
        super()
        this.options = options
        this.compileService = new options.CompileService()
    }

    init(app) {
        this.prefix(process.env.PREFIX)
        this.post('/compile', ctx => this.compile(ctx))
        app.use(this.routes())
        app.use(this.allowedMethods())
    }

    async compile(ctx) {
        try {
            console.log(ctx.body)
            const response = await this.compileService.compile(ctx.request.body)
            console.log(ctx)
        } catch (err) {
            throw err
        }
    }
}

module.exports = CompileRouter