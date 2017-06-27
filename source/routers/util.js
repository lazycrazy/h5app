 import Router from 'koa-router'

 import log from '../common/logger'
 import to from 'await-to-js'
 import fileUpload from '../common/file-upload'
 import path from 'path'
 import util from 'util'
 import fs from 'fs'
 import cities from '../../InitData/cities'
 import _ from 'lodash'
 import qiniu from 'qiniu'
 qiniu.conf.ACCESS_KEY = 'An3LtRSgJsqO3H_FQy6jtwIdiflMxhjyE3B737Nt'
 qiniu.conf.SECRET_KEY = 'a41NS8B8peyYuV2q4zGv6pR8v5JlFKUKhw9_2hOt'

 const router = new Router()

 function uptoken(bucket, key) {
     var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
     return putPolicy.token();
 }

 function uploadFile(uptoken, key, localFile) {
     return new Promise((resolve, reject) => {
         var extra = new qiniu.io.PutExtra()
         qiniu.io.putFile(uptoken, key, localFile, extra, function(err, res) {
             if (!err) {
                 resolve(res.key)
             } else {
                 log.error('util:uploadFile:', err)
                 reject(err)
             }
         });
     })

 }


 router.post('/addimg/:type', async(ctx, next) => {
     let image_path
     try {
         //生成上传 Token
         let key = path.basename(ctx.request.files.file.path) + path.extname(ctx.request.files.file.name)

         // let token = uptoken(ctx.params.type, key);
         let token = uptoken('shop', key);

         //要上传文件的本地路径
         let filePath = ctx.request.files.file.path

         image_path = await uploadFile(token, key, filePath)

         fs.unlink(ctx.request.files.file.path)

     } catch (ex) {

         fs.unlink(ctx.request.files.file.path)
         log.error('/addimg/:type', ex)
         ctx.body = { status: 0, message: '上传图片失败' }
         return
     }

     ctx.body = { status: 1, image_path }
 })


 export default router
