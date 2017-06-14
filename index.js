import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import config from './source/config'
import routers from './source/routers'
import formidable from './source/common/koa-formidable'
import db from './source/common/db'
import jwt from 'koa-jwt'
import serve from 'koa-static'
import opn from 'opn'
import cors from 'kcors'
import logger from 'koa-logger'
import json from 'koa-json'

import log from './source/common/logger'



const app = new Koa()
app.keys = [config.appkey]


app.context.db = db
app.use(bodyParser())
app.use(formidable())
app.use(json())
app.use(logger())
    //app.context.db=mongodb
    //
app.use(cors())
app.use(async function(ctx, next) {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(serve('./static'))
    // Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function(ctx, next) {
        return next().catch((err) => {
            if (401 == err.status) {
                ctx.status = 401
                ctx.body = err
            } else {
                throw err
            }
        })
    })
    // app.use(async ctx => {
    //     // the parsed body will store in ctx.request.body
    //     // if nothing was parsed, body will be an empty object {}
    //     ctx.body = ctx.request.body
    // })

routers(app)
app.use(ctx => {
     ctx.throw(404,'未找到')
    // ctx.throw(401,'User not found. Please login!')
    // ctx.assert(ctx.state.user, 401, 'User not found. Please login!')
    ctx.body = 'Hello Koa'
})

app.on('error', err =>
    log.error(err)
    // console.error('server error', err)
)
const port = config.port
app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    var uri = 'http://localhost:' + port
    console.log('Listening at ' + uri + '\n')

    // when env is testing, don't need open it
    if (process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
})
