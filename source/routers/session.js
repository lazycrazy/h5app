import Router from 'koa-router'
import jwt from 'jsonwebtoken'
import debug from 'debug'
const router = new Router()
const sessionDebug = debug('h5+:session')


router.get('/profile', async(ctx, next) => {
    sessionDebug(ctx)
    ctx.body =  ctx.state
})

router.put('/profile', async(ctx, next) => {
    ctx.body = 'put profile'

})


router.post('/signup', async(ctx, next) => {
    ctx.body = 'post signup'

})

router.post('/login', async(ctx, next) => {

    //User.find() 
    //ctx.body = {success:false,message:'用户或密码错误'}
    //const token  =jwt.sign(user, ctx.app.keys[0], {'expiresIn': 1440 // 设置过期时间})
    //ctx.body={success:true,token:token,message:'登录成功'}
    //User.setToken(token)

    let { body, files } = ctx.request
    let user = JSON.parse(body.json) 
    if (user.username === 'abc' && user.password === '123') {
        let token = jwt.sign(user, ctx.app.keys[0], {
            'expiresIn': 1440 // 设置过期时间})
        })
        ctx.body = { success: true, token }
    } else {
        ctx.body = { success: false }

    }

})


router.post('/logout', async(ctx, next) => {
    //User.setToken('')  
    ctx.body = 'post logout'


})

export default router
