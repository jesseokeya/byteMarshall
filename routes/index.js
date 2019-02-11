/* Routes */
const CompileRoute = require('./compileRoute')
const UserRoute = require('./userRoute')

/* Services */
const { CompileService } = require('../services')

module.exports = (app) => {
   const handlers = [
       new CompileRoute({ CompileService })
   ]
   handlers.forEach(handler => handler.init(app))
} 