import session from './session'
import jwt from 'koa-jwt'
import debug from 'debug'
let dugRouters = debug('h5+:routes')

export default app => {
    app.use(jwt({
    	    secret:app.keys[0],
            passthrough: true,
            async isRevoked(ctx, token, user) {
                return Promise.resolve(false)

                //return Promise.resolve(User.Exists(user,token))
            }
        })) //.unless({ path: [/^\/login/, /^\/signup/] });
    app.use(session.routes())

}
