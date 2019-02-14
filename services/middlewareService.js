class MiddlewareService {
    constructor(options = {}) {
        this.options = options
    }

    async handleAuth(ctx, next) {
        try {
            const url = ctx.request.url.toLowerCase()
            if (url.includes('/editor')) {
                return ctx.response.redirect('/?to=editor')
            } else {
                await this._decodeToken(ctx)
                await next()
            }
        } catch (err) {
            throw err
        }
    }

    async _decodeToken(ctx) { 
        try {

        } catch(err) {
            throw err
        }
    }

}

module.exports = MiddlewareService