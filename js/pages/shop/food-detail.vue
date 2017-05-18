<template>
    <div class="food">
        <head-top :head-title="name" :goback='true'></head-top>
        <header class="header_img">
            <img :src="getImagePath(image_path)" class="food_img">
            <div class="cover"></div>
            <p class="description">{{description}}</p>
        </header>
        <section class="food-detail">
            <p>{{name}}</p>
            <div>
                <span>评分</span>
                <Rating :rating='rating' :size='0.5'></Rating>
                <span>{{rating.toFixed(1)}}</span>
            </div>
            <p>
                <span>月售 {{month_sales}}单</span>
                <span>售价 ¥{{foods.specfoods[0].price}}</span>
                <span v-if="foods.specfoods.length">起</span>
            </p>
            <p>
                <span>评论数 {{rating_count}}</span>
                <span>好评率 {{satisfy_rate}}%</span>
            </p>
        </section>
    </div>
</template>
<script>
import HeadTop from 'components/header'
import Icon from 'components/icon'
import {
    getImagePath
} from 'components/mixin'
import Rating from 'components/rating'
export default {
    name: 'FoodDetail',
    mixins: [getImagePath],
    data() {
        return {
            image_path: null,
            description: null,
            month_sales: null,
            name: null,
            rating: null,
            rating_count: null,
            satisfy_rate: null,
            foods: null,
            shopId: null,
        }
    },
    components: {
        HeadTop,
        Rating,
        Icon
    },
    created() {
        this.image_path = this.$route.query.image_path;
        this.description = this.$route.query.description;
        this.month_sales = this.$route.query.month_sales;
        this.name = this.$route.query.name;
        this.rating = this.$route.query.rating;
        this.rating_count = this.$route.query.rating_count;
        this.satisfy_rate = this.$route.query.satisfy_rate;
        this.foods = this.$route.query.foods;
        this.shopId = this.$route.query.shopId;
    },
}
</script>
<style scoped>
@import 'mixin';
.food {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 10;
    padding-top: 1.95rem;
    >header {
        position: relative;
        >img {
            width: 100%;
        }
        .cover {
            box-shadow: 0px -74px 100px #ddd inset;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }
        .description {
            position: absolute;
            font-size: 0.6rem;
            color: #666;
            line-height: .8rem;
            bottom: .2rem;
            padding: 0 .4rem;
        }
    }
    &-detail {
    	padding: .5rem;
    	font-size: .65rem;
    	@mixin fj;
    	
    	flex-direction: column;
        p:nth-of-type(1) {
            font-size: 0.7rem;
            color: #333;
            margin-bottom: .2rem;
        }
    }
}
</style>
