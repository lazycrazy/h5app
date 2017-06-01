import formidable from 'formidable'

export default opt => {
    return async(ctx, next) => {
        var form = new formidable.IncomingForm()
        for (let key in opt) {
            form[key] = opt
        }
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
        return next()
    }
}
