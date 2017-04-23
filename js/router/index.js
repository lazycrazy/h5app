import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'

//import home from '../pages/home/home'
//import scan from '../pages/scan/scan'
//import city from '../pages/city/city'
 

const home = () => import(/* webpackChunkName: "home" */ '../pages/home/home')
const scan = () => import(/* webpackChunkName: "scan" */ '../pages/scan/scan')
const city = () => import(/* webpackChunkName: "city" */ '../pages/city/city')

Vue.use(VueRouter)

export default new VueRouter({
	routes: [{
		path: '/',
		component: App,
		children: [{
				path: '',
				component: home
			},
			{
				path: '/home',
				component: home
			},
			{
				path: '/scan',
				component: scan
			},
			{
				path: '/city/:id',
				component: city
			}
		]
	}]
})