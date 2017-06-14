import obj2string, {
    InitApp
} from './common'

import Vue from 'vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import './css/common'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

sync(store, router)

Vue.use(ElementUI)

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
