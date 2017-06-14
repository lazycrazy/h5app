 import debug from 'debug'
 import Router from 'koa-router'
 import jwt from 'jsonwebtoken'



 const router = new Router()
 const routerAuth = new Router()
 const profileDebug = debug('h5:profile')


 routerAuth.get('/profile', async(ctx, next) => {
     profileDbug(ctx)
     ctx.body = ctx.state
 })

 routerAuth.put('/profile', async(ctx, next) => {
     ctx.body = 'put profile'

 })

 routerAuth.post('/logout', async(ctx, next) => {
     //User.setToken('')  
     ctx.body = 'post logout'


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

 export default { router, routerAuth }
