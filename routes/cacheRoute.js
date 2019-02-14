const Router = require('koa-router')

class CacheRoute extends Router {
    constructor(options = {}) {
        super()
        this.options = options
        this.cacheService = options.cacheService
    }

    init(app) {
        this.prefix(process.env.PREFIX)
        this.get('/caches/', ctx => this.getCaches(ctx))
        this.get('/caches/:id', ctx => this.getCache(ctx))
        this.post('/caches/', ctx => this.createCache(ctx))
        this.patch('/caches/', ctx => this.updateCache(ctx))
        this.delete('/caches/:id', ctx => this.deleteCache(ctx))
        app.use(this.routes())
        app.use(this.allowedMethods())
    }

    async getCaches(ctx) {}

    async getCache(ctx) {}

    async createCache(ctx) {}

    async updateCache(ctx) {}
    
    async deleteCache(ctx) {}
}

module.exports = CacheRoute