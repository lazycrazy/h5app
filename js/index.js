
import obj2string, {
	InitApp
} from './common'

import Vue from 'vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
sync(store, router)

new Vue({
	el: '#app',
	store,
	router //注意参数属性大小写
	//	render: (h) => h(App)
	//	template: '<App/>',//需要编译器版本
	//	components: { App }
})

//console.log(obj2string({abc:'123'})) 
//InitApp()