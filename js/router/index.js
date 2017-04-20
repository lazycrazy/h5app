import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'

import home from '../pages/home/home'
import scan from '../pages/scan/scan'
//const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home')
//const scan = r => require.ensure([], () => r(require('../pages/scan/scan')), 'scan')

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
			}
		]
	}]
})