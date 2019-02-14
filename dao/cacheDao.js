const mongoose = require('mongoose')
const Cache = mongoose.model('Cache')

class CacheDao {
    constructor(options = {}) {
        this.options = options
        this.cache = Cache
    }

    async createCache(ctx) {
        try {
            let newCache = new this.cache(ctx)
            return newCache.save()
        } catch (err) {
            throw err
        }
    }

    async caches() {
        try {
            return this.cache.find()
        } catch (err) {
            throw err
        }
    }

    async cache(id) {
        try {
            return this.cache.findById(id)
        } catch (err) {
            throw err
        }
    }

    async updateCache(context) {
        try {
            return this.cache.findOneAndUpdate({ _id: context.id }, context, { new: true })
        } catch (err) {
            throw err
        }
    }

    async deleteCache(id) {
        try {
            return this.cache.findOneAndRemove({ _id: id })
        } catch (err) {
            throw err
        }
    }
}

module.exports = CacheDao