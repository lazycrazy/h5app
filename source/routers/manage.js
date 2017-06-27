import Router from 'koa-router'

import debug from 'debug'
import User from '../common/models/user'
import log from '../common/logger'
import to from 'await-to-js'

const router = new Router()
const routerAuth = new Router()


router.post('/admin/signup', async(ctx, next) => {
    let { body, files } = ctx.request
    let user

    try {
        user = JSON.parse(body.json)
    } catch (err) {
        log.error(err)
        ctx.body = {
            status: 0,
            type: 'FORM_DATA_ERROR',
            message: '表单信息错误'
        }
        return
    }
    if (!user.username || !user.password) {
        ctx.body = {
            status: 0,
            type: 'FORM_DATA_ERROR',
            message: '邮箱或密码不能为空'
        }
        return
    }
    let res = await User.signup(user)
    if (res.status) {

        ctx.body = {
            status: 1,
            message: res.message,
            token: res.user.token
        }
    } else {
        log.error(res.message)
        ctx.body = {
            status: 0,
            type: 'FORM_DATA_ERROR',
            message: res.message
        }

    }

})

router.post('/admin/login', async(ctx, next) => {
    let { body, files } = ctx.request
    let user

    try {
        user = JSON.parse(body.json)
    } catch (err) {
        log.error(err)
        ctx.body = {
            status: 0,
            type: 'FORM_DATA_ERROR',
            message: '表单信息错误'
        }
        return
    }
    if (!user.username || !user.password) {
        ctx.body = {
            status: 0,
            type: 'FORM_DATA_ERROR',
            message: '邮箱或密码不能为空'
        }
        return
    }
    let res = await User.login(user)
    if (res) {
        ctx.body = {
            status: 1,
            success: '登录成功',
            token: res.token
        }
    } else {
        ctx.body = {
            status: 0,
            type: 'FORM_DATA_ERROR',
            message: '用户名或密码错误'
        }

    }

})

routerAuth.get('/admin/signout', async(ctx, next) => {
    let [err, user] = await User.modify({ _id: ctx.state.user.id }, { $unset: { token: 1 } })
    if (err) {
        log.error('signout:' + err)
        ctx.body = { status: 0 }
        return
    }
    ctx.body = { status: 1 }
})

routerAuth.get('/admin/info', async(ctx, next) => {
    let users
    try {
        users = await User.search({ _id: ctx.state.user.id })
    } catch (err) {
        log.error('/admin/info:' + err)
        ctx.body = { status: 0, message: '查询管理员信息失败' }
        return
    }
    // console.log(123,user)
    ctx.body = { status: 1, user: users && users[0] }
})

routerAuth.get('/admin', async(ctx, next) => {
    let { limit = 20, page = 1 } = ctx.query
    let users
    try {
        users = await User.search({}, limit, page)
    } catch (err) {
        log.error('/admin:' + err)
        ctx.body = { status: 0, message: '查询管理员列表信息失败' }
        return
    }
    // console.log(123,user)
    ctx.body = { status: 1, users }
})

routerAuth.get('/admin/count', async(ctx, next) => {
    let [err, count] = await to(User.count())
    if (err) {
        log.error('/admin/count:' + err)
        ctx.body = { status: 0, message: '获取用户数失败' }
        return
    }
    ctx.body = { status: 1, count }
})


export default { router, routerAuth }
