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
				<router-link tag='li' v-for="item of hotcity" :to="'/city/' + item.id" :key='item.id'>
					{{item.name}}
				</router-link>
			</ul>
		</section>

		<section class='group_city_container'>
			<ul>
				<li v-for='(val,key,index) of sortedgroupcity' :key='key' class='letter_classify_li'>
					<h4 class='city_title'>
						{{key}}
						<span v-if='index===0'>
		 				(按字母排序)
		 			</span></h4>
					<ul class='lettercity citylist clear'>
						<router-link tag='li' :to="'/city/'+item.id" v-for='item of val' :key='item.id' class='ellipsis'>{{item.name}}</router-link>
					</ul>
				</li>
			</ul>
		</section>
	</div>
</template>

<script>
	import HeadTop from '../../components/header/head'
	import Icon from '../../components/icon'
	import { cityGuess, hotcity, groupcity } from '../../service'
	export default {
		name: 'home',
		data() {
			return {
				guessCity: '任丘',
				guessCityId: '123',
				hotcity: [],
				groupcity: {},
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

			c = await groupcity()
			this.groupcity = c
		},
		computed: {
			sortedgroupcity() {
				let sortedObj = {}
				if(this.groupcity)
					for(let i = 65; i <= 90; i++) {
						let letter = String.fromCharCode(i)
						let charCity = this.groupcity[letter]
						if(charCity)
							sortedObj[letter] = charCity
					}
				return sortedObj
			}
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
			border-bottom:2px solid $bc;
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
	
	.city_title {
		color: #666;
		font-weight: 400;
		text-indent: 0.45rem;
		border-top: 2px solid $bc;
		border-bottom: 1px solid $bc;
		@mixin font 0.55rem,
		1.45rem,
		'Helvetica Neue';
		span {
			@mixin sc 0.475rem,
			#999;
		}
	}
	.letter_classify_li{
		margin-bottom: 0.4rem;
		background-color:#fff;
		border-bottom: 1px solid $bc;
		.lettercity{
			li{
				color:#666;
			}
		}
	}
</style>