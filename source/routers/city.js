 
import Router from 'koa-router'

import log from '../common/logger'
import to from 'await-to-js'
import map from '../common/map'

import cities from '../../InitData/cities'
import _ from 'lodash'
import pinyin from 'pinyin'


const router = new Router()


router.get('/city', async(ctx, next) => {
    let ip = ctx.header['x-forwarded-for'] ||
        ctx.req.connection.remoteAddress ||
        ctx.req.socket.remoteAddress ||
        ctx.req.connection.socket.remoteAddress
    let [err3, res] = await to(map.getLocationByIP()) //正式环境填充ip
    if (err3 || !res || res.status == "1") {
        log.error('signup:' + err3 + (res && res.message))
        ctx.body = { status: 0, message: '获取位置失败' }
        return
    }
    let name = res.result.ad_info.city.replace(/市$/, '')
    let pinyinname = pinyin(name, {
        style: pinyin.STYLE_NORMAL
    }).join('')
    const firstWord = pinyinname.substr(0, 1).toUpperCase()
    if (cities[firstWord]) {
        let city = _(cities[firstWord]).find({ pinyin: pinyinname })
        ctx.body = { status: 1, city }
        return
    }

    ctx.body = { status: 0, message: '未找到此城市' }
})

router.get('/searchplace', async(ctx, next) => {
    let { cityid, keyword } = ctx.query
    let cityname = _(cities).values().flatten().find(c => c.id == cityid).name
    log.debug('/searchplace:', cityname)
    let [err3, res] = await to(map.searchPlace(keyword, cityname))
    if (err3 || !res || res.status == "1") {
        log.error('signup:' + err3 + (res && res.message))
        ctx.body = { status: 0, message: '查找地址失败' }
        return
    } 

    ctx.body = res.data
})

export default router
