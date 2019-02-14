/* Routes */
const CompileRoute = require('./compileRoute')
const UserRoute = require('./userRoute')
const CacheRoute = require('./cacheRoute')

/* Daos */
const { UserDao, CacheDao } = require('../dao')

/* Services */
const { CompileService, UserService, CacheService } = require('../services')
const userService = new UserService({ userDao: new UserDao() })
const compileService = new CompileService()
const caheService = new CacheService({ cacheDao: new CacheDao() })

module.exports = (app) => {
    const handlers = [
        new CompileRoute({ compileService }),
        new UserRoute({ userService }),
        new CacheRoute({ caheService })
    ]
    handlers.forEach(handler => handler.init(app))
} 