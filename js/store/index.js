import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import mutations from './mutations'
import getters from './getters'
import actions from './actions'

const state = {
	 userInfo:null,
}

export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions
})