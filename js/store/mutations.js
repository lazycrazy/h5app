import {
    SET_LOCATION,
    ADD_CART,
    REDUCE_CART,
    INIT_BUYCART,
    CLEAR_CART,
    SET_SHOPDETAIL,
    RECORD_USERINFO,
    SET_USERINFO,
    CONFIRM_REMARK,
    CONFIRM_INVOICE,
    CHOOSE_SEARCH_ADDRESS,
    SET_GEOHASH,
    CONFIRM_ADDRESS,
    CHOOSE_ADDRESS,
    NEED_VALIDATION,
    SAVE_CART_ID_SIG,
    SAVE_ORDER_PARAM,
    CHANGE_ORDER_PARAM,
    ORDER_SUCCESS,
    SAVE_SHOPID,
    SAVE_ORDER,
    LOGIN_OUT,
    LOGIN,
    RETSET_NAME,
    SET_AVATAR,
    SET_ADDRESS,
    SAVE_ADDDETAIL,
    SAVE_QUESTION,
    ADD_ADDRESS,
    BUY_CART,
    SET_TOKEN
} from './mutation-types.js'

import { setStorage, getStorage } from 'src/service'

export default {
    saveAdminInfo(state, adminInfo) {
            state.adminInfo = adminInfo
        }, [SET_LOCATION](state, { latitude, longitude }) {
            state.latitude = latitude
            state.longitude = longitude
        }, [SET_GEOHASH](state, geohash) {
            state.geohash = geohash
        }, [SET_TOKEN](state, token) {
            state.token = token
        }, [SET_SHOPDETAIL](state, detail) {
            state.shopDetail = detail
        }, [ADD_CART](state, {
            shopid,
            category_id,
            item_id,
            food_id,
            name,
            price,
            specs,
            packing_fee,
            sku_id,
            stock
        }) {
            let cart = state.cartList
            let shop = cart[shopid] = (cart[shopid] || {})
            let category = shop[category_id] = (shop[category_id] || {})
            let item = category[item_id] = (category[item_id] || {})
            if (item[food_id]) {
                item[food_id]['num']++
            } else {
                item[food_id] = {
                    "num": 1,
                    "id": food_id,
                    "name": name,
                    "price": price,
                    "specs": specs,
                    "packing_fee": packing_fee,
                    "sku_id": sku_id,
                    "stock": stock
                }
            }
            state.cartList = {...cart }
            setStorage('buycart', state.cartList)
        }, [REDUCE_CART](state, {
            shopid,
            category_id,
            item_id,
            food_id,
            name,
            price,
            specs,
        }) {
            let cart = state.cartList
            let shop = (cart[shopid] || {})
            let category = (shop[category_id] || {})
            let item = (category[item_id] || {})
            if (item && item[food_id]) {
                if (item[food_id]['num'] > 0) {
                    item[food_id]['num']--
                } else {
                    item[food_id] = null;
                }
                state.cartList = {...cart }
                setStorage('buycart', state.cartList)
            }
        }, [CLEAR_CART](state, shopid) {
            state.cartList[shopid] = null
            state.cartList = {...state.cartList }
            setStorage('buycart', state.cartList)
        }, [INIT_BUYCART](state) {
            state.cartList = getStorage('buycart') || state.cartList

        }, [CHOOSE_ADDRESS](state, { address, index }) {
            state.choosedAddress = address
            state.addressIndex = index
        }, [SAVE_QUESTION](state, question) {
            state.question = {...question }
        }, [SET_AVATAR](state, avatar) {
            state.avatar = avatar
        }, [LOGIN_OUT](state) {
            state.userInfo = null
            state.login = false
        }, [LOGIN](state) {
            state.login = true
        }, [NEED_VALIDATION](state, need) {
            state.needValidation = need
        }, [SAVE_CART_ID_SIG](state, {
            cart_id,
            sig
        }) {
            state.cartId = cart_id
            state.sig = sig
        }, [CONFIRM_INVOICE](state, invoice) {
            state.invoice = invoice
        }, [CHANGE_ORDER_PARAM](state, newParam) {
            state.orderParam = Object.assign({}, state.orderParam, newParam)
        }, [SAVE_SHOPID](state, shopid) {
            state.shopId = shopid
        }, [SAVE_ORDER_PARAM](state, orderParam) {
            state.orderParam = orderParam
        }, [SAVE_ORDER](state, detail) {
            state.orderDetail = detail
        }, [ORDER_SUCCESS](state, order) {
            state.cartPrice = null
            state.orderMessage = order
        }, [CONFIRM_ADDRESS](state, newAddress) {
            state.addresses.push(newAddress)
        }, [RETSET_NAME](state, username) {
            state.userInfo = Object.assign({}, state.userInfo, { username })
        }, [CHOOSE_SEARCH_ADDRESS](state, place) {
            state.searchAddress = place
        }, [SET_ADDRESS](state, addresses) {
            state.addresses = addresses
        },

        [CONFIRM_REMARK](state, {
            remarkText,
            inputText
        }) {
            state.remarkText = remarkText
            state.inputRemarkText = inputText
        },

        [SET_USERINFO](state, info) {
            if (!state.login) return
            if (!info.message) {
                state.userInfo = {...info }
                let validity = 30
                let now = new Date()
                now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000)
                document.cookie = "USERID=" + info.user_id + ";expires=" + now.toGMTString()
                document.cookie = "SID=huRyTRd9QLij7NkbpHJoj3PQrx1eRiO6bAiw" + ";expires=" + now.toGMTString()
            } else {
                state.userInfo = null
                state.login = false
            }
        }
}
