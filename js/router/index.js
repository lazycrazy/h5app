import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'


const home = () =>
    import ( /* webpackChunkName: "home" */ 'src/pages/home')
const scan = () =>
    import ( /* webpackChunkName: "scan" */ 'src/pages/scan')
const city = () =>
    import ( /* webpackChunkName: "city" */ 'src/pages/city')
const msite = () =>
    import ( /* webpackChunkName: "msite" */ 'src/pages/msite')
const search = () =>
    import ( /* webpackChunkName: "search" */ 'src/pages/search')
const service = () =>
    import ( /* webpackChunkName: "service" */ 'src/pages/service')
const download = () =>
    import ( /* webpackChunkName: "download" */ 'src/pages/download')
const serviceQ2A = () =>
    import ( /* webpackChunkName: "serviceQ2A" */ 'src/pages/service-Q2A')

const orders = () =>
    import ( /* webpackChunkName: "order" */ 'src/pages/order/orders')
const orderDetail = () =>
    import ( /* webpackChunkName: "orderDeatil" */ 'src/pages/order/order-detail')

const forget = () =>
    import ( /* webpackChunkName: "forget" */ 'src/pages/forget')
const login = () =>
    import ( /* webpackChunkName: "login" */ 'src/pages/login')
const profile = () =>
    import ( /* webpackChunkName: "profile" */ 'src/pages/profile')
const userInfo = () =>
    import ( /* webpackChunkName: "userInfo" */ 'src/pages/profile/user-info')
const balance = () =>
    import ( /* webpackChunkName: "balance" */ 'src/pages/profile/balance')
const benefit = () =>
    import ( /* webpackChunkName: "benefit" */ 'src/pages/profile/benefit')
const points = () =>
    import ( /* webpackChunkName: "points" */ 'src/pages/profile/points')
const vipcard = () =>
    import ( /* webpackChunkName: "vipcard" */ 'src/pages/profile/vipcard')
const setUserName = () =>
    import ( /* webpackChunkName: "setUserName" */ 'src/pages/profile/set-user-name')
const addresses = () =>
    import ( /* webpackChunkName: "addresses" */ 'src/pages/profile/address')
const addNewAddress = () =>
    import ( /* webpackChunkName: "addNewAddress" */ 'src/pages/profile/address-add')
const searchNewAddress = () =>
    import ( /* webpackChunkName: "searchNewAddress" */ 'src/pages/profile/address-add-search')

const food = () =>
    import ( /* webpackChunkName: "food" */ 'src/pages/food')
const shop = () =>
    import ( /* webpackChunkName: "shop" */ 'src/pages/shop')
const shopDetail = () =>
    import ( /* webpackChunkName: "shopDetail" */ 'src/pages/shop/shop-detail')
const foodDetail = () =>
    import ( /* webpackChunkName: "foodDetail" */ 'src/pages/shop/food-detail')
const shopDetailSafe = () =>
    import ( /* webpackChunkName: "shopDetailSafe" */ 'src/pages/shop/shop-detail-safe')

const confirmOrder = () =>
    import ( /* webpackChunkName: "confirmOrder" */ 'src/pages/order/confirm-order')
const remark = () =>
    import ( /* webpackChunkName: "remark" */ 'src/pages/order/remark')
const invoice = () =>
    import ( /* webpackChunkName: "invoice" */ 'src/pages/order/invoice')
const payment = () =>
    import ( /* webpackChunkName: "payment" */ 'src/pages/order/payment')
const userValidation = () =>
    import ( /* webpackChunkName: "userValidation" */ 'src/pages/order/user-validation')
const address = () =>
    import ( /* webpackChunkName: "address" */ 'src/pages/order/address')
const addAddress = () =>
    import ( /* webpackChunkName: "addAddress" */ 'src/pages/order/add-address')
const searchAddress = () =>
    import ( /* webpackChunkName: "searchAddress" */ 'src/pages/order/search-address')


const d3_1 = () =>
    import ( /* webpackChunkName: "1" */ 'src/pages/d3/1')

const d3_2 = () =>
    import ( /* webpackChunkName: "2" */ 'src/pages/d3/2')


const adminLogin = () =>
    import ( /* webpackChunkName: "adminlogin" */ 'src/manage/login')

const manage = () =>
    import ( /* webpackChunkName: "manage" */ 'src/manage')
const adminHome = () =>
    import ( /* webpackChunkName: "managehome" */ 'src/manage/home')
const userlist = () =>
    import ( /* webpackChunkName: "userlist" */ 'src/manage/userlist')
const shoplist = () =>
    import ( /* webpackChunkName: "shoplist" */ 'src/manage/shoplist')
const addshop = () =>
    import ( /* webpackChunkName: "addshop" */ 'src/manage/addshop')
const addgoods = () =>
    import ( /* webpackChunkName: "addgoods" */ 'src/manage/addgoods')

Vue.use(VueRouter)

export default new VueRouter({
    routes: [{
        path: '/manage',
        component: manage,
        children: [{
            path: '',
            component: adminHome
        }, {
            path: 'userlist',
            component: userlist
        }, {
            path: 'shoplist',
            component: shoplist
        }, {
            path: 'addshop',
            component: addshop
        },{
            path: 'addgoods',
            component: addgoods
        }, ]
    }, {
        path: '/manage/login',
        component: adminLogin
    }, {
        path: '/',
        component: App,
        children: [{
                path: '',
                component: home
            }, {
                path: '/home',
                component: home
            }, {
                path: '/scan',
                component: scan
            }, {
                path: '/city/:id',
                component: city
            }, {
                path: 'msite',
                component: msite
            }, {
                path: '/search/:geohash',
                component: search
            }, {
                path: '/profile',
                component: profile,
                children: [{
                    path: 'userInfo',
                    component: userInfo,
                    children: [{
                        path: 'address',
                        component: addresses,
                        children: [{
                            path: 'add',
                            component: addNewAddress,
                            children: [{
                                path: 'search',
                                component: searchNewAddress,
                            }]
                        }, ]
                    }]
                }, {
                    path: 'balance',
                    component: balance
                }, {
                    path: 'benefit',
                    component: benefit
                }, {
                    path: 'points',
                    component: points
                }, {
                    path: 'vipcard',
                    component: vipcard
                }, {
                    path: 'setUserName',
                    component: setUserName
                }, ]
            }, {
                path: '/login',
                component: login
            }, {
                path: '/forget',
                component: forget
            }, {
                path: '/orders',
                component: orders,
                children: [{
                    path: 'orderDetail',
                    component: orderDetail
                }, ]
            }, {
                path: '/food',
                component: food
            }, {
                path: '/download',
                component: download
            }, {
                path: '/service',
                component: service,
                children: [{
                    path: 'Q2A',
                    component: serviceQ2A
                }, ]
            }, {
                path: '/shop',
                component: shop,
                children: [{
                    path: 'shopDetail',
                    component: shopDetail,
                    children: [{
                        path: 'shopSafe',
                        component: shopDetailSafe
                    }, ]
                }, {
                    path: 'foodDetail',
                    component: foodDetail
                }, ]
            },

            {
                path: '/confirmOrder',
                component: confirmOrder,
                children: [{
                    path: 'remark',
                    component: remark,
                }, {
                    path: 'invoice',
                    component: invoice,
                }, {
                    path: 'payment',
                    component: payment,
                }, {
                    path: 'userValidation',
                    component: userValidation,
                }, {
                    path: 'address',
                    component: address,
                    children: [{
                        path: 'addAddress',
                        component: addAddress,
                        children: [{
                            path: 'searchAddress',
                            component: searchAddress,
                        }]
                    }, ]
                }, ]

            }, {
                path: '/d1',
                component: d3_1
            }, {
                path: '/d2',
                component: d3_2
            },
        ]
    }]
})
