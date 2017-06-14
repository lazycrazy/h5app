import Router from 'koa-router'

import debug from 'debug'
import User from '../common/models/user'
import log from '../common/logger'

const router = new Router()
const routerAuth = new Router()


router.post('/admin/signup', async(ctx, next) => {
    let { body, files } = ctx.request
    let user

    try {
        user = JSON.parse(body.json)
    } catch (err) {
        ctx.logger.error(err)
        ctx.body = {
            status: 0,
            type: 'FORM_DATA_ERROR',
            message: '表单信息错误'
        }
        return
    }
    if (!user.mobile || !user.password) {
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
            success: '注册成功',
            token: res.user.token
        }
    } else {
        ctx.body = {
            status: 0,
            type: 'FORM_DATA_ERROR',
            message: '注册失败'
        }

    }

})

router.post('/admin/login', async(ctx, next) => {
    let { body, files } = ctx.request
    let user

    try {
        user = JSON.parse(body.json)
    } catch (err) {
        ctx.logger.error(err)
        ctx.body = {
            status: 0,
            type: 'FORM_DATA_ERROR',
            message: '表单信息错误'
        }
        return
    }
    if (!user.mobile || !user.password) {
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
    let [err, user] = await User.modify({ id: ctx.state.user.id }, { $unset: { token: 1 } })
    if (err) {
        log.error('signout:' + err)
        ctx.body = { status: 0 }
        return
    }
    ctx.body = { status: 1 }
})

routerAuth.get('/admin/info', async(ctx, next) => {
    ctx.body = { status: 1, user: ctx.state.user }
})

routerAuth.put('/profile', async(ctx, next) => {
    ctx.body = 'put profile'

})


export default { router, routerAuth }
