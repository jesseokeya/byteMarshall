const Router = require('koa-router')
const _ = require('lodash')

/**
 * Class Defines and associates cache functions to specific cache routes.
 * @constructor Initializes the cache route
 * @param {Object} options - Options passed into the class constructor
 */
class CacheRoute extends Router {
    constructor(options = {}) {
        super()
        this.options = options
        this.cacheService = options.cacheService
    }

    /**
     * Initializes routes for CacheRoute Class
     * @param {Object} app - Koa app object
     * @throws {Error} throws an error if one occurs while running
     */
    init(app) {
        try {
            this.prefix(process.env.PREFIX)
            this.get('/caches/', ctx => this.getCaches(ctx))
            this.get('/caches/:id', ctx => this.getCache(ctx))
            this.post('/caches/', ctx => this.createCache(ctx))
            this.patch('/caches/', ctx => this.updateCache(ctx))
            this.delete('/caches/:id', ctx => this.deleteCache(ctx))
            app.use(this.routes())
            app.use(this.allowedMethods())
        } catch (err) {
            throw err
        }
    }

    /**
     * Retrieves all cache objects
     * @param {Object} ctx - Koa context object
     * @returns {Promise<[Object]>} List of cache objects
     * @throws {Error} Throws an error if one occurs while running
     */
    async getCaches(ctx) {
        try {

        } catch (err) {
            throw errr
        }
    }

    /**
     * Retrieves a cahe object
     * @param {Object} ctx - Koa context object
     * @returns {Promise<Object>} A cache object
     * @throws {Error} Throws an error if one occurs while running
     */
    async getCache(ctx) {
        try {

        } catch (err) {
            throw err
        }
    }

    /**
     * Creates a cache object
     * @param {Object} ctx - Koa context object
     * @returns {Promise<Object>} Created cache object
     * @throws {Error} Throws an error if one occurs while running
     */
    async createCache(ctx) {
        try {

        } catch (err) {
            throw err
        }
    }

    /**
     * Updates a cache object
     * @param {Object} ctx - Koa context object
     * @returns {Promise<Object>} Updated cache object
     * @throws {Error} Throws an error if one occurs while running
     */
    async updateCache(ctx) {
        try {

        } catch (err) {
            throw err
        }
    }

    /**
     * Deletes a cache object
     * @param {Object} ctx - Koa context object
     * @returns {Promise<Object>} Deleted cache object
     * @throws {Error} Throws an error if one occurs while running
     */
    async deleteCache(ctx) {
        try {

        } catch (err) {
            throw err
        }
    }
}

module.exports = CacheRoute