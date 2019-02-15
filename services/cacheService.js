/**
 * Class Cache Service
 * @constructor Initializes the cache service
 * @param {Object} options - Options passed into the class constructor
 */
class CacheService {
    constructor(options = {}) {
        this.options = options
        this.cacheDao = options.cacheDao
    }

    /**
     * Creates a new cache
     * @param {Object} context - Fields used to create cache
     * @returns {Promise<Object>} Created Cache
     * @throws {Error} Throws an error if one occurs while running
     */
    async createCache(context) {
        try {

        } catch (err) {
            throw err
        }
    }

    /**
     * Retrieves all caches
     * @returns {Promise<[Object]>} List of caches
     * @throws {Error} Throws an error if one occurs while running
     */
    async getCaches() {
        try {

        } catch (err) {
            throw err
        }
    }

    /**
     * Retrieve cache by id
     * @param {String} id - Unique identification for a particular cache object
     * @returns {Promise<Object>} Cache object
     * @throws {Error} Throws an error if one occurs while running
     */
    async getCache(id) {
        try {

        } catch (err) {
            throw err
        }
    }

    /**
     * Updates a cache
     * @param {Object} context - Fields used to update cache
     * @returns {Promise<Object>} Updated Cache
     * @throws {Error} Throws an error if one occurs while running
     */
    async updateCache(context) {
        try {

        } catch (err) {
            throw err
        }
    }

    /**
     * Deletes cache by id
     * @param {String} id - Unique identification for a particular cache object
     * @returns {Promise<Object>} Deleted cache object
     * @throws {Error} Throws an error if one occurs while running
     */
    async deleteCache(id) {
        try {

        } catch (err) {
            throw err
        }
    }
}

module.exports = CacheService