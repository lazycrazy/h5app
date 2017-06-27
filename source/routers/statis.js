import Router from 'koa-router'

import debug from 'debug'
import User from '../common/models/user'
import log from '../common/logger'
import to from 'await-to-js'
import moment from 'moment'

const router = new Router()
router.prefix('/statis')
router.get('/api/:date/count', async(ctx, next) => {
    let date = ctx.params.date
    let [err, count] = await to(User.count({ createdAt: { $gte: date, $lt: moment(date).add(1, 'days').format('l') } }))
    if (err) {
        log.error('/api/:date/count:' + err)
        ctx.body = { status: 0, message: '获取某天API请求次数失败' }
        return
    }
    count = parseInt(Math.random() * 10000 + 11800, 10)
    ctx.body = { status: 1, count }
})


router.get('/api/count', async(ctx, next) => {
    let [err, count] = await to(User.count())
    if (err) {
        log.error('apiAllCount:' + err)
        ctx.body = { status: 0, message: '获取API请求次数失败' }
        return
    }
    count = parseInt(Math.random() * 10000 + 11800, 10)
    ctx.body = { status: 1, count }
})

export default router
