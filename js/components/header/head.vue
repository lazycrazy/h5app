<template>
	<header id='head_top'>
		<slot name='logo'></slot>
		<slot name='search'></slot>
		<div class='head_goback' v-if='goback' @click="$router.go(-1)">
			<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
				<polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2" />
			</svg>
		</div>
		<router-link :to="userInfo? '/profile':'/login'" v-if='signInUp' class='head_login'>
			<icon name="user" v-if='userInfo'></icon>
			<span class='login_span' v-else>登录|注册</span>
		</router-link>
		<span class='head_title'>{{ headTitle }}</span>
		<slot name='edit'></slot>
		<slot name='msiteTitle'></slot>
		<slot name='changeCity'></slot>
		<slot name='changeLogin'></slot>
	</header>
</template>

<script>
	import Icon from '../icon'
	import { mapState, mapActions } from 'vuex'
	export default {
		name: 'HeadTop',
		data() {
			return {}
		},
		components: {
			Icon
		},
		props: {
			signInUp: {
				type: Boolean,
				default: true
			},
			headTitle: {
				type: String,
				default: '欢迎'
			},
			goback: {
				type: Boolean,
				default: true
			}
		},
		computed: {
            ...mapState([
				'userInfo'
			]),
		},
		methods: {
		    ...mapActions([
				'setUserInfo'
			]),
		},
		mounted() {
			this.setUserInfo()
		}
	}
</script>
<style>

</style>