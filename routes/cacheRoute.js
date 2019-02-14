const Router = require('koa-router')

class CacheRoute extends Router {
    constructor(options = {}) {
        super()
        this.options = options
        this.cacheService = options.cacheService
    }

    init(app) {}
}

module.exports = CacheRoute