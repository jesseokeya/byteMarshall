const Router = require('koa-router')

class CompileRouter extends Router {
    constructor(options = {}) {
        super()
        this.options = options
        this.compileService = options.compileService
    }

    init(app) {
        this.prefix(process.env.PREFIX)
        this.post('/compile', ctx => this.compile(ctx))
        app.use(this.routes())
        app.use(this.allowedMethods())
    }

    async compile(ctx) {
        try {
            console.log(ctx.state.user)
            const response = await this.compileService.compile(ctx.request.body)
            ctx.body = { 
                stdout: response.stdout,
                stderr: response.stderr || '',
                code: response.code || 1
            }
        } catch (err) {
            ctx.body = {
                code: 0,
                stderr: err.toString() || ''
            }
            throw err
        }
    }
}

module.exports = CompileRouter