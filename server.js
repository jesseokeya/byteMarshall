require('dotenv').config()

/* Register Monggose Models */

const Koa = require('koa')
const mongoose = require('mongoose')
const logger = require('koa-logger')
const json = require('koa-json')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')

const router = require('./routes')
const { MiddlewareService } = require('./services')

const PORT = process.env.PORT || 8080
const environment = process.env.NODE_ENV || 'Production'

const middleware = new MiddlewareService()

mongoose.connect(process.env.MONGO_URI, { useCreateIndex: true, useNewUrlParser: true })
mongoose.Promise = global.Promise;

const app = new Koa()

app.use(logger())
app.use(cors())

app.use(json())
app.use(bodyParser())
router(app)


const message = `🚀  ${environment} server ready at http://localhost:${PORT}`
app.listen(PORT, _ => console.log(message))