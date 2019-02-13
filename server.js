require('dotenv').config()

/* Register Monggose Models */
require('./models/userModel')
require('./models/cacheModel')

const Koa = require('koa')
const mongoose = require('mongoose')
const logger = require('koa-logger')
const json = require('koa-json')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const send = require('koa-send')

const router = require('./routes')

const PORT = process.env.PORT || 8080
const environment = process.env.NODE_ENV || 'Production'

mongoose.connect(process.env.MONGO_URI, { useCreateIndex: true, useNewUrlParser: true })
mongoose.Promise = global.Promise;

const app = new Koa()

app.use(logger())
app.use(cors())

app.use(json())
app.use(bodyParser())
router(app)

app.use(async (ctx, next) => {
    const validRoutes = ['/', '/editor']
    const url = ctx.request.url.toLowerCase()
    if (url.includes('/editor')) {
        return ctx.response.redirect('/?to=editor')
    } else {
        await next()
    }
})

app.use(serve(__dirname + '/client/build/'))
app.use(async ctx => await send(ctx, ctx.path, { root: __dirname + '/client/build/' }))


const message = `🚀  ${environment} server ready at http://localhost:${PORT}`
app.listen(PORT, _ => console.log(message))