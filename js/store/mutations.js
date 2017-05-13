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
    OUT_LOGIN,
    RETSET_NAME,
    SAVE_AVANDER,
    SET_ADDRESS,
    SAVE_ADDDETAIL,
    SAVE_QUESTION,
    ADD_ADDRESS,
    BUY_CART,
} from './mutation-types.js'

import { setStorage, getStorage } from 'src/service'

export default {
    [SET_LOCATION](state, { latitude, longitude }) {
        state.latitude = latitude
        state.longitude = longitude
    }, [SET_GEOHASH](state, geohash) {
        state.geohash = geohash
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
            // state.cartList = {...state.cartList }
        setStorage('buycart', state.cartList)
    }, [INIT_BUYCART](state) {
        state.cartList = getStorage('buycart') || state.cartList
    }, [SET_USERINFO](state, info) {
        if (state.userInfo && (state.userInfo.username !== info.username)) {
            return;
        };
        //      if(!state.login) {
        //          return
        //      }
        if (!info.message) {
            state.userInfo = {...info
            };
            let validity = 30;
            let now = new Date();
            now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
            document.cookie = "USERID=" + info.user_id + ";expires=" + now.toGMTString();
            document.cookie = "SID=huRyTRd9QLij7NkbpHJoj3PQrx1eRiO6bAiw" + ";expires=" + now.toGMTString();
        } else {
            state.userInfo = null;
        }
    }
}
