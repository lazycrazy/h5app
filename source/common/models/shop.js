import mongoose from 'mongoose'
import to from 'await-to-js'
import log from '../logger'
import config from '../../config'
import map from '../map'

const Schema = mongoose.Schema


const ShopSchema = new Schema({
    activities: [{
        description: String,
        icon_color: String,
        icon_name: String,
        id: Number,
        name: String,
    }],
    address: String,
    delivery_mode: {
        color: String,
        id: Number,
        is_solid: Boolean,
        text: String
    },
    description: { type: String, default: "" },
    order_lead_time: { type: String, default: "" },
    distance: { type: String, default: "" },
    location: { type: [Number], index: '2d' },
    float_delivery_fee: { type: Number, default: 0 },
    float_minimum_order_amount: { type: Number, default: 0 },

    category: String,
    identification: {
        company_name: { type: String, default: "" },
        identificate_agency: { type: String, default: "" },
        identificate_date: { type: Date, default: Date.now },
        legal_person: { type: String, default: "" },
        licenses_date: { type: String, default: "" },
        licenses_number: { type: String, default: "" },
        licenses_scope: { type: String, default: "" },
        operation_period: { type: String, default: "" },
        registered_address: { type: String, default: "" },
        registered_number: { type: String, default: "" },
    },
    image_path: { type: String, default: "" },
    is_premium: { type: Boolean, default: false },
    is_new: { type: Boolean, default: false },
    latitude: Number,
    longitude: Number,
    license: {
        business_license_image: { type: String, default: "" },
        catering_service_license_image: { type: String, default: "" },
    },
    name: {
        type: String,
        required: true
    },
    opening_hours: { type: Array, default: ["08:30/20:30"] },
    phone: {
        type: String,
        required: true
    },
    piecewise_agent_fee: {
        tips: String
    },
    promotion_info: { type: String, default: "欢迎光临，用餐高峰请提前下单，谢谢" },
    rating: { type: Number, default: 0 },
    rating_count: { type: Number, default: 0 },
    recent_order_num: { type: Number, default: 0 },
    status: { type: Number, default: 0 },
    supports: [{
        description: String,
        icon_color: String,
        icon_name: String,
        id: Number,
        name: String
    }],
}, { timestamps: true })


class ShopClass {

    static async add(values) {
        return await to(this.create(values))
    }
    static async delete(id) {
        return await to(this.remove({ _id: id }))
    }
    static async login(values) {
        let [err, Shop] = await to(this.findOne({ Shopname: values.Shopname }, '-__v -createdAt').exec())
        if (err || !Shop) {
            if (err)
                log.error('login:' + err)
            return null
        }
        if (!Shop || !PassHash.verify(values.password, Shop.password)) return null

        let token = jwt.sign({ id: Shop.id }, config.appkey, {
            'expiresIn': 1440 // 设置过期时间})
        })
        Shop.token = token
        Shop.updatedAt = new Date()
        let [err2, savedShop] = await to(Shop.save())
        if (err2) {
            log.error('login:' + err)
            return null
        }

        return savedShop
    }
    static async search(query, limit = 0, page = 1, sort = { createdAt: 'desc' }) {
        let range = page > 1 ? limit * (page - 1) : 0
        let [err, values] = await to(this.find(query, '-__v ').skip(range).limit(limit).sort(sort).exec())
        if (err) {
            log.error('Shop:search:' + err)
            return null
        }
        return values
    }
    static async modify(filter, parameters) {
        return await to(this.findOneAndUpdate(filter, parameters))
    }
}

ShopSchema.loadClass(ShopClass)
const Shop = mongoose.model('Shop', ShopSchema)

export default Shop
