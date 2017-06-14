import formidable from 'formidable'
import log from './logger'

export default opt => {
    return async(ctx, next) => {
        var form = new formidable.IncomingForm()
        for (let key in opt) {
            form[key] = opt
        }
        try {

            await new Promise((reslove, reject) => {
                form.parse(ctx.req, (err, fields, files) => {
                    if (err) {
                        reject(err)
                    } else {
                        ctx.request.body = fields
                        ctx.request.files = files
                        reslove()
                    }
                })
            })
        } catch (err) {
            log.error('表单解析错误' + err)
            ctx.throw(501, '表单解析错误')
        }

        return next()
    }
}
