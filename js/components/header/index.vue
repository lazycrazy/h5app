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
			<icon class="user_avatar" name="user" v-if='userInfo'></icon>
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
				default: false
			},
			headTitle: {
				type: String,
				default: ''
			},
			goback: {
				type: Boolean,
				default: false
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
<style scoped>
	@import '../../../css/mixin.css';
	#head_top {
		background-color: $blue;
		position: fixed;
		/*z-index: 100;*/
		left: 0;
		top: 0;
		@mixin wh 100%,
		1.95rem;
	}
	
	.head_goback {
		left: .4rem;
		@mixin wh .6rem,
		0.8rem;
		line-height: 2.2rem;
		margin-left: .4rem;
	}
	
	.head_login {
		right: .55rem;
		@mixin sc 0.65rem,
		#fff;
		@mixin vc;
		.login_span {
			color: #fff;
		}
		.user_avatar {
			fill: #fff;
			@mixin wh .8rem,
			.8rem;
		}
	}
	
	.head_title {
		@mixin center;
		width: 50%;
		color:#fff;
		text-align: center;
		@mixin sc .8rem,#fff;
		font-weight: bold;
	}
</style>