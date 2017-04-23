<template>
	<svg >
		<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#' + name"></use>
	</svg>
</template>

<script>
	export default {
		name: 'Icon',

		props: {
			name: String
		}
	};
</script>