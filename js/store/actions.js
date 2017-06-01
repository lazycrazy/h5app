import { getUser, getAddressList } from '../service'
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
}
