import { getUser, getAddressList } from '../service'
import { SET_USERINFO, SET_LOCATION } from './mutation-types'

export default {
    async setUserInfo({
            commit,
            state
        }) {
            commit(SET_USERINFO, await getUser())
        },
        async setLocation({
            commit,
            state
        }) {
            commit(SET_LOCATION, await getAddressList(state.userInfo.userId))
        }
}
