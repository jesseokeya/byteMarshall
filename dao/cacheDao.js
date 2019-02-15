const mongoose = require('mongoose')
const Cache = mongoose.model('Cache')

/**
 * Class access the database and performs CRUD operations for the cache model
 * @constructor
 * @param {Object} options - Options passed into the class constructor
 */
class CacheDao {
    constructor(options = {}) {
        this.options = options
        this.cache = Cache
    }
    
   /**
    * Creates a new cache
    * @param {Object} context - Fields passed in used in creating a new cache
    * @returns {Promise<Object>} Returns the cache object crated
    * @throws {Error} Throws an error if one occurs while running 
    */
    async createCache(ctx) {
        try {
            let newCache = new this.cache(ctx)
            return newCache.save()
        } catch (err) {
            throw err
        }
    }

    /**
     * Retrieves all caches
     * @returns {Promise<[Object]>} List of all cache objects
     * @throws {Error} Throws an error if one occurs while running 
     */
    async caches() {
        try {
            return this.cache.find()
        } catch (err) {
            throw err
        }
    }

    /**
     * Retrieves a particular cache by id
     * @param {String} id - Unique id for a specific cache object
     * @returns {Promise<Object>} A cache object
     * @throws {Error} Throws an error if one occurs while running 
     */
    async cache(id) {
        try {
            return this.cache.findById(id)
        } catch (err) {
            throw err
        }
    }

    /**
     * Updates a particular cache by id
     * @param {Object} context - Cache fields to be updated
     * @returns {Promise<Object>} A cache object
     * @throws {Error} Throws an error if one occurs while running 
     */
    async updateCache(context) {
        try {
            return this.cache.findOneAndUpdate({ _id: context.id }, context, { new: true })
        } catch (err) {
            throw err
        }
    }

    /**
     * Deletes a cache
     * @param {String} id - Unique id for a specific cache object
     * @returns {Promise<Object>} A cache object
     * @throws {Error} Throws an error if one occurs while running 
     */
    async deleteCache(id) {
        try {
            return this.cache.findOneAndRemove({ _id: id })
        } catch (err) {
            throw err
        }
    }
}

module.exports = CacheDao