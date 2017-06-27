import { getUser, getAddressList, AdminAPI } from '../service'
import { SET_USERINFO, SET_ADDRESS } from './mutation-types'

export default {
    async setUserInfo({
            commit,
            state
        }) {
            commit(SET_USERINFO, await getUser())
        },

        async saveAddress({
            commit,
            state
        }) {
            if (state.addresses.length > 0) return;

            let addres = await getAddressList(state.userInfo.user_id);
            commit(SET_ADDRESS, addres);
        },
        async getAdminData({ commit }) {
            try {
                const res = await AdminAPI.getAdminInfo()
                if (res.status == 1) {
                    commit('saveAdminInfo', res.user)
                    return true
                } else {
                    throw new Error(res.message)
                }
            } catch (err) {
                console.log('您尚未登陆或者session失效')
                return false
            }
        }
}
