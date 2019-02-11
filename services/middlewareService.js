const { isEmpty } = require('lodash')
const jwtDecode = require('jwt-decode')

class MiddlewareService {
    constructor(options = {}) {
        this.options = options
    }
}

module.exports = MiddlewareService