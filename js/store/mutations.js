import {
    SET_LOCATION,
    ADD_CART,
    REDUCE_CART,
    INIT_BUYCART,
    CLEAR_CART,
    RECORD_SHOPDETAIL,
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

export default {
    [SET_LOCATION](state, { latitude, longitude }) {
        state.latitude = latitude
        state.longitude = longitude
    }, [SET_GEOHASH](state, geohash) {
        state.geohash = geohash
    }, [SET_USERINFO](state, info) {
        if (state.userInfo && (state.userInfo.username !== info.username)) {
            return;
        };
        //		if(!state.login) {
        //			return
        //		}
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
