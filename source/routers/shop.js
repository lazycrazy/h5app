 import Router from 'koa-router'

 import log from '../common/logger'
 import to from 'await-to-js'

 import _ from 'lodash'
 import util from 'util'
 import Shop from '../common/models/shop'


 const router = new Router()

 router.delete('/shop/:id', async(ctx, next) => {
     let id = ctx.params.id
     if (!id) {
         log.error('/shop/:id', 'id参数不能为空')
         ctx.body = { status: 0, message: 'id参数不能为空' }
         return
     }
     let [err, res] = await Shop.delete(id)
     console.log(err,res)
     if (err) {
         log.error('/shop/:id', err)
         ctx.body = { status: 0, message: '商铺删除失败' }

         return
     }
     ctx.body = { status: 1, message: '商铺删除成功' }

 })

 router.get('/shop/count', async(ctx, next) => {
     let [err, count] = await to(Shop.count())
     if (err) {
         log.error('/shop/count:' + err)
         ctx.body = { status: 0, message: '获取商铺数失败' }
         return
     }
     ctx.body = { status: 1, count }
 })

 router.get('/shop', async(ctx, next) => {
     let { limit = 20, page = 1 } = ctx.query
     let shops
     try {
         shops = await Shop.search({}, limit, page)
     } catch (err) {
         log.error('/shop:' + err)
         ctx.body = { status: 0, message: '查询商铺列表信息失败' }
         return
     }
     // console.log(123,user)
     ctx.body = shops
 })
 router.post('/addshop', async(ctx, next) => {
     let { json } = ctx.request.body
     let fields = JSON.parse(json)
     try {
         if (!fields.name) {
             throw new Error('必须填写商店名称')
         } else if (!fields.address) {
             throw new Error('必须填写商店地址')
         } else if (!fields.phone) {
             throw new Error('必须填写联系电话')
         } else if (!fields.latitude || !fields.longitude) {
             throw new Error('商店位置信息错误')
         } else if (!fields.image_path) {
             throw new Error('必须上传商铺图片')
         } else if (!fields.category) {
             throw new Error('必须上传食品种类')
         }
     } catch (err) {
         log.error('/addshop:前台参数出错', err)
         ctx.body = {
             status: 0,
             message: err.message
         }
         return
     }
     const opening_hours = fields.startTime || '8:30' + '/' + fields.endTime || "20:30"
     const newShop = {
         name: fields.name,
         address: fields.address,
         description: fields.description || '',
         float_delivery_fee: fields.float_delivery_fee || 0,
         float_minimum_order_amount: fields.float_minimum_order_amount || 0,

         is_premium: fields.is_premium || false,
         is_new: fields.new || false,
         latitude: fields.latitude,
         longitude: fields.longitude,
         location: [fields.longitude, fields.latitude],
         opening_hours: [opening_hours],
         phone: fields.phone,
         promotion_info: fields.promotion_info || "欢迎光临，用餐高峰请提前下单，谢谢",
         rating: (4 + Math.random()).toFixed(1),
         rating_count: Math.ceil(Math.random() * 1000),
         recent_order_num: Math.ceil(Math.random() * 1000),
         status: Math.round(Math.random()),
         image_path: fields.image_path,
         category: fields.category,
         piecewise_agent_fee: {
             tips: "配送费约¥" + (fields.float_delivery_fee || 0),
         },
         activities: [],
         supports: [],
         license: {
             business_license_image: fields.business_license_image || '',
             catering_service_license_image: fields.catering_service_license_image || '',
         },
         identification: {
             company_name: "",
             identificate_agency: "",
             identificate_date: "",
             legal_person: "",
             licenses_date: "",
             licenses_number: "",
             licenses_scope: "",
             operation_period: "",
             registered_address: "",
             registered_number: "",
         },
     }
     if (fields.delivery_mode) {
         Object.assign(newShop, {
             delivery_mode: {
                 color: '57A9FF',
                 id: 1,
                 is_solid: true,
                 text: '蜂鸟配送'
             }
         })
     }
     fields.activities.forEach((item, index) => {
         switch (item.icon_name) {
             case '减':
                 item.icon_color = 'f07373'
                 item.id = index + 1
                 break;
             case '特':
                 item.icon_color = 'EDC123'
                 item.id = index + 1
                 break;
             case '新':
                 item.icon_color = '70bc46'
                 item.id = index + 1
                 break;
             case '领':
                 item.icon_color = 'E3EE0D'
                 item.id = index + 1
                 break;
         }
         newShop.activities.push(item)
     })
     if (fields.bao) {
         newShop.supports.push({
             description: "已加入“外卖保”计划，食品安全有保障",
             icon_color: "999999",
             icon_name: "保",
             id: 7,
             name: "外卖保"
         })
     }
     if (fields.zhun) {
         newShop.supports.push({
             description: "准时必达，超时秒赔",
             icon_color: "57A9FF",
             icon_name: "准",
             id: 9,
             name: "准时达"
         })
     }
     if (fields.piao) {
         newShop.supports.push({
             description: "该商家支持开发票，请在下单时填写好发票抬头",
             icon_color: "999999",
             icon_name: "票",
             id: 4,
             name: "开发票"
         })
     }
     let [err, shop] = await Shop.add(newShop)
     if (err) {
         ctx.body = {
             status: 0,
             message: '添加商铺失败'
         }
         return
     }


     ctx.body = { status: 1, messsage: '添加成功', shopDetail: shop }
 })


 // router.get('/searchplace', async(ctx, next) => {
 //     let { cityid, keyword } = ctx.query
 //     let cityname = _(cities).values().flatten().find(c => c.id == cityid).name
 //     log.debug('/searchplace:', cityname)
 //     let [err3, res] = await to(map.searchPlace(keyword, cityname))
 //     if (err3 || !res || res.status == "1") {
 //         log.error('signup:' + err3 + (res && res.message))
 //         ctx.body = { status: 0, message: '查找地址失败' }
 //         return
 //     } 

 //     ctx.body = res.data
 // })

 export default router
