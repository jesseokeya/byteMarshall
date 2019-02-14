const mongoose = require('mongoose')
const Cache = mongoose.model('Cache')

class CacheDao {
    constructor(options = {}) {
        this.options = options
    }
}

module.exports = CacheDao