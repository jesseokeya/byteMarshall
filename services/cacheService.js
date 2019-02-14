class CacheService {
    constructor(options = {}) {
        this.options = options
        this.cacheDao = options.cacheDao
    }
}

module.exports = CacheService