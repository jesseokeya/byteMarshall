const Router = require('koa-router')

/**
 * Class Defines and associates compile functions to specific compile route
 * @constructor Initializes the compile route
 * @param {Object} options - Options passed into the class constructor
 */
class CompileRouter extends Router {
    constructor(options = {}) {
        super()
        this.options = options
        this.compileService = options.compileService
    }

    /**
     * Initializes routes for CompileRoute Class
     * @param {Object} app - Koa app object
     * @throws {Error} throws an error if one occurs while running
     */
    init(app) {
        try {
            this.prefix(process.env.PREFIX)
            this.post('/compile', ctx => this.compile(ctx))
            app.use(this.routes())
            app.use(this.allowedMethods())
        } catch (err) {
            throw err
        }
    }

    /**
     * Compiles syntax for various programming languages
     * @param {Object} ctx - Koa context object
     * @returns {Promise<Object>} Compile code
     * @throws {Error} Throws an error if one occurs while running
     */
    async compile(ctx) {
        try {
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