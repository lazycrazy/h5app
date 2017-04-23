<template>
	<div>
		<HeadTop headTitle='首页'>
			<span slot='logo' class="head_logo" @click="reload">ele.me</span>
		</HeadTop>
		<nav class='nav_city'>
			<div class="city_tip">
				<span>当前定位城市：</span>
				<span>定位不准时，请选择所在城市</span>
			</div>
			<router-link :to="'/city/'+guessCityId" class='city_guess'>
				<span>{{guessCity}}</span>
				<icon name='arrow-right' class='arrow_right'></icon>
			</router-link>
		</nav>
		<section id='hot_city_container'>
			<h4 class='city_title'>热门城市</h4>
			<ul class='citylist clear'>
				<router-link tag='li' v-for="item in hotcity" :to="'/city/' + item.id" :key='item.id'>
					{{item.name}}
				</router-link>
			</ul>
		</section>

		<p>
			<router-link to="/home">Go to HOme</router-link>
			<router-link to="/scan">Go to Scavn</router-link>
		</p>
	</div>
</template>

<script>
	import HeadTop from '../../components/header/head'
	import Icon from '../../components/icon'
	import { cityGuess, hotcity } from '../../service'
	export default {
		name: 'home',
		data() {
			return {
				guessCity: '任丘',
				guessCityId: '123',
				hotcity: [],
				groupcity: {}
			}
		},
		components: {
			HeadTop,
			Icon
		},
		methods: {
			reload() {
				window.location.reload()
			}
		},
		async mounted() {

			let c = await cityGuess()
			this.guessCity = c.name
			this.guessCityId = c.id

			c = await hotcity()
			this.hotcity = c
		}
	}
</script>
<style scoped>
	@import '../../../css/mixin.css';
	.head_logo {
		left: 0.4rem;
		font-weight: 400;
		@mixin sc 0.7rem,
		#fff;
		@mixin wh 2.3rem,
		0.7rem;
		@mixin ct;
	}
	
	.nav_city {
		padding-top: 2.35rem;
		border-top: 1px solid $bc;
		background-color: #fff;
		margin-bottom: .4rem;
		.city_tip {
			@mixin fj;
			line-height: 1.45rem;
			padding: 0 0.45rem;
			span:nth-of-type(1) {
				@mixin sc 0.55rem,
				#666;
			}
			span:nth-of-type(2) {
				font-weight: 900;
				@mixin sc .475rem,
				#9f9f9f;
			}
		}
		.city_guess {
			@mixin fj;
			align-items: center;
			height: 1.8rem;
			padding: 0 0.45rem;
			border-top: 1px solid $bc;
			@mixin font 0.75rem,
			1.8rem;
			span:nth-of-type(1) {
				color: $blue;
			}
			.arrow_right {
				@mixin wh .6rem,
				.6rem;
				fill: #999;
			}
		}
	}
	
	#hot_city_container {
		background-color: #fff;
		margin-bottom: 0.4rem;
	}
	
	.citylist {
		li {
			float: left;
			text-align: center;
			color: $blue;
			border-bottom: 0.025rem solid $bc;
			border-right: 0.025rem solid $bc;
			@mixin wh 25%,
			1.75rem;
			@mixin font 0.6rem,
			1.75rem;
		}
		li:nth-of-type(4n) {
			border-right: none;
		}
	}
	.city_title{
		color:#666;
		font-weight:400;
		text-indent:0.45rem;
		border-top: 2px solid $bc;
		border-bottom: 1px solid $bc;
		@mixin font 0.55rem,1.45rem,'Helvetica Neue';
		span{
			@mixin sc 0.475rem,#999;
		}
		
	}
</style>