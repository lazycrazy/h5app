<template>
	<div>
		<head-top signin-up='home'>
			<span slot='logo' class="head_logo" @click="reload">ele.me</span>
		</head-top>
		<h1>Hello App!!!</h1>
		<p>
			<router-link to="/home">Go to HOme</router-link>
			<router-link to="/scan">Go to Scavn</router-link>
		</p>
	</div>
</template>

<script>
	import headTop from '../../components/header/head'
	export default {
		name: 'home',
		data() {
			return {
				guessCity: '',
				guessCityId: '',
				hotcity: [],
				groupcity: {}
			}
		},
		components: {
			headTop
		},
		methods:{
		    reload(){
		    	window.location.reload()
		    }
		}
	}
</script>