import mongoose from 'mongoose'
import to from 'await-to-js'
import log from '../logger'
import config from '../../config'
import map from '../map'

const Schema = mongoose.Schema


const FoodSchema = new Schema({
    rating: { type: Number, default: 0 },
    is_featured: { type: Number, default: 0 },
    restaurant_id: { type: Number, isRequired: true },
    category_id: { type: Number, isRequired: true },
    pinyin_name: { type: String, default: '' },
    display_times: { type: Array, default: [] },
    attrs: { type: Array, default: [] },
    description: { type: String, default: "" },
    month_sales: { type: Number, default: 0 },
    rating_count: { type: Number, default: 0 },
    tips: String,
    image_path: String,
    specifications: [Schema.Types.Mixed],
    server_utc: { type: Date, default: Date.now() },
    is_essential: { type: Boolean, default: false },
    attributes: { type: Array, default: [] },
    item_id: { type: Number, isRequired: true },
    limitation: Schema.Types.Mixed,
    name: { type: String, isRequired: true },
    satisfy_count: { type: Number, default: 0 },
    activity: Schema.Types.Mixed,
    satisfy_rate: { type: Number, default: 0 },
    specfoods: [{
        original_price: { type: Number, default: 0 },
        sku_id: { type: Number, isRequired: true },
        name: { type: String, isRequired: true },
        pinyin_name: { type: String, default: "" },
        restaurant_id: { type: Number, isRequired: true },
        food_id: { type: Number, isRequired: true },
        packing_fee: { type: Number, default: 0 },
        recent_rating: { type: Number, default: 0 },
        promotion_stock: { type: Number, default: -1 },
        price: { type: Number, default: 0 },
        sold_out: { type: Boolean, default: false },
        recent_popularity: { type: Number, default: 0 },
        is_essential: { type: Boolean, default: false },
        item_id: { type: Number, isRequired: true },
        checkout_mode: { type: Number, default: 1 },
        stock: { type: Number, default: 1000 },
        specs_name: String,
        specs: [{
            name: String,
            value: String
        }]
    }]
}, { timestamps: true })


class FoodClass {

    static async add(values) {
        return await to(this.create(values))
    }
    static async delete(id) {
        return await to(this.findByIdAndRemove(id))
    }

    static async search(query, limit = 0, page = 1, sort = { createdAt: 'desc' }) {
        let range = page > 1 ? limit * (page - 1) : 0
        let [err, values] = await to(this.find(query, '-__v ').skip(range).limit(limit).sort(sort).exec())
        if (err) {
            log.error('Food:search:' + err)
            return null
        }
        return values
    }
    static async modify(filter, parameters) {
        return await to(this.findOneAndUpdate(filter, parameters))
    }
}

FoodSchema.loadClass(FoodClass)
const Food = mongoose.model('Food', FoodSchema)



const MenuSchema = new Schema({
    description: String,
    is_selected: { type: Boolean, default: true },
    icon_url: { type: String, default: '' },
    name: { type: String, isRequired: true },
    id: { type: Number, isRequired: true },
    restaurant_id: { type: Number, isRequired: true },
    type: { type: Number, default: 1 },
    foods: [FoodSchema]
}, { timestamps: true })
const Menu = mongoose.model('Menu', MenuSchema)



class MenuClass {

    static async add(values) {
        return await to(this.create(values))
    }
    static async delete(id) {
        return await to(this.findByIdAndRemove(id))
    }

    static async search(query, limit = 0, page = 1, sort = { createdAt: 'desc' }) {
        let range = page > 1 ? limit * (page - 1) : 0
        let [err, values] = await to(this.find(query, '-__v ').skip(range).limit(limit).sort(sort).exec())
        if (err) {
            log.error('Menu:search:' + err)
            return null
        }
        return values
    }
    static async modify(filter, parameters) {
        return await to(this.findOneAndUpdate(filter, parameters))
    }
}

MenuSchema.loadClass(MenuClass)

export { Food, Menu }
