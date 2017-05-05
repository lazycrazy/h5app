import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'

//import home from '../pages/home/home'
//import scan from '../pages/scan/scan'
//import city from '../pages/city/city'


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
const order = () =>
    import ( /* webpackChunkName: "order" */ 'src/pages/order')
const profile = () =>
    import ( /* webpackChunkName: "profile" */ 'src/pages/profile')
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


Vue.use(VueRouter)

export default new VueRouter({
    routes: [{
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
            component: profile
        }, {
            path: '/order',
            component: order
        }, {
            path: '/food',
            component: food
        }, {
            path: '/shop',
            component: shop,
            children: [{
                path: 'shopDetail',
                component: shopDetail,
                children: [{
                    path: 'shopDetailSafe',
                    component: shopDetailSafe
                }, ]
            }, {
                path: 'foodDetail',
                component: foodDetail
            }, ]
        }, ]
    }]
})
