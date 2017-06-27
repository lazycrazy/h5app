import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import mutations from './mutations'
import getters from './getters'
import actions from './actions'

const state = {
    userInfo: null,
    latitude: '',
    longitude: '',
    geohash: 'wtw3sm0q087',
    shopDetail: null,
    cartList: {},
    cartId: null,
    sig: null,
    addresses: [],
    choosedAddress: null,
    searchAddress: null,
    addressIndex: null,
    needValidation: null,
    shopId: null,
    orderParam: null,
    orderMessage: null,
    cartPrice: null,
    remarkText: null,
    inputRemarkText: '',
    invoice: false,
    login: true,
    orderDatail: null,
    avatar: null,
    question:null,
    adminInfo:{
        avatar: 'avatar.jpg'
    },
    token:null,
    
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})
