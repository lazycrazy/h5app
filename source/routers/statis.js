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
    ctx.body = { status: 1, count }
})

router.get('/userCount', async(ctx, next) => {
    let [err, user] = await User.modify({ id: ctx.state.user.id }, { $unset: { token: 1 } })
    if (err) {
        log.error('signout:' + err)
        ctx.body = { status: 0 }
        return
    }
    ctx.body = { status: 1 }
})

router.get('/orderCount', async(ctx, next) => {
    let [err, user] = await User.modify({ id: ctx.state.user.id }, { $unset: { token: 1 } })
    if (err) {
        log.error('signout:' + err)
        ctx.body = { status: 0 }
        return
    }
    ctx.body = { status: 1 }
})

router.get('/apiAllCount', async(ctx, next) => {
    let [err, count] = await to(User.count())
    if (err) {
        log.error('apiAllCount:' + err)
        ctx.body = { status: 0, message: '获取API请求次数失败' }
        return
    }
    ctx.body = { status: 1, count }
})
router.get('/getUserCount', async(ctx, next) => {
    let [err, user] = await User.modify({ id: ctx.state.user.id }, { $unset: { token: 1 } })
    if (err) {
        log.error('signout:' + err)
        ctx.body = { status: 0 }
        return
    }
    ctx.body = { status: 1 }
})
router.get('/getOrderCount', async(ctx, next) => {
    let [err, user] = await User.modify({ id: ctx.state.user.id }, { $unset: { token: 1 } })
    if (err) {
        log.error('signout:' + err)
        ctx.body = { status: 0 }
        return
    }
    ctx.body = { status: 1 }
})
router.get('/adminDayCount', async(ctx, next) => {
    let [err, user] = await User.modify({ id: ctx.state.user.id }, { $unset: { token: 1 } })
    if (err) {
        log.error('signout:' + err)
        ctx.body = { status: 0 }
        return
    }
    ctx.body = { status: 1 }
})
router.get('/adminCount', async(ctx, next) => {
    let [err, user] = await User.modify({ id: ctx.state.user.id }, { $unset: { token: 1 } })
    if (err) {
        log.error('signout:' + err)
        ctx.body = { status: 0 }
        return
    }
    ctx.body = { status: 1 }
})

export default router
