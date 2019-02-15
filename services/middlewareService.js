 /**
  * Class Middleware Service
  * @constructor Initializes the middleware service
  * @param {Object} options - Options passed into the class constructor
  */
class MiddlewareService {
    constructor(options = {}) {
        this.options = options
    }
    
    /**
     * Handles security by verifying jwt token in the request authorization header
     * @param {Object} ctx- Koa context object contains { req, res }
     * @param {Function} next - Koa next function
     * @throws {Error} Throws an error if one occurs while running
     */
    async handleAuth(ctx, next) {
        try {
            ctx.state.user = {}
            const url = ctx.request.url.toLowerCase()
            if (url.includes('/editor')) {
                return ctx.response.redirect(`/?to=${url}`)
            } else {
                await this._decodeToken(ctx)
                await next()
            }
        } catch (err) {
            throw err
        }
    }

    /**
     * Decodes jwt token in request authorization header
     * @param {Object} ctx- Koa context object contains { req, res }
     * @throws {Error} Throws an error if one occurs while running
     */
    async _decodeToken(ctx) {
        try {
            const headers = ctx.request.header
        } catch (err) {
            throw err
        }
    }

}

module.exports = MiddlewareService