import profile from './profile'
import manage from './manage'
import statis from './statis'
import city from './city'
import shop from './shop'
import util from './util'
import jwt from 'koa-jwt'
import config from '../config'
import User from '../common/models/user'


export default app => {
    app.use(manage.router.routes())
    app.use(profile.router.routes())
    app.use(jwt({
            secret: config.appkey,
            // passthrough: true,
            async isRevoked(ctx, token, user) {
                // return Promise.resolve(false)
                return User.revoked({ _id: token.id }, user)
                    //return Promise.resolve(User.Exists(user,token))
            }
        })) //.unless({ path: [/^\/login/, /^\/signup/] });
    app.use(manage.routerAuth.routes())
    app.use(profile.routerAuth.routes())
    app.use(statis.routes())
    app.use(city.routes())
    app.use(util.routes())
    app.use(shop.routes())

}
