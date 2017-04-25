import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'

//import home from '../pages/home/home'
//import scan from '../pages/scan/scan'
//import city from '../pages/city/city'
 

const home = () => import(/* webpackChunkName: "home" */ 'src/pages/home')
const scan = () => import(/* webpackChunkName: "scan" */ 'src/pages/scan')
const city = () => import(/* webpackChunkName: "city" */ 'src/pages/city')
const msite = () => import(/* webpackChunkName: "city" */ 'src/pages/msite')

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
			},
			{
				path:'msite',
				component:msite
			}
		]
	}]
})