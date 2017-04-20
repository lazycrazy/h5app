import { getUser, getAddressList } from '../service'
import { SET_USERINFO, SET_ADDRESS } from './mutation-types'

export default {
	async setUserInfo({
		commit,
		state
	}) {
		commit(SET_USERINFO, await getUser())
	},
	async setAddress({
		commit,
		state
	}) {
		commit(SET_ADDRESS, await getAddressList(state.userInfo.user_id))
	}
}