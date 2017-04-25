<template>
    <div>
        <HeadTop :signInUp='true'>
            <router-link :to="'/search/'+geohash" class="link-search" slot='search'>
                <Icon name='search' class='icon-search'></Icon>
            </router-link>
            <router-link to='/home' slot='msiteTitle' class='msite-title'>
                <p class='title-text ellipsis'>{{msiteTitle}}</p>
            </router-link>
        </HeadTop>
        <nav class='foodtypes-nav'>
            <div class='swiper-container'>
                <div class='swiper-wrapper'>
                    <div class='swiper-slide food-types-container' v-for="(item,index) of foodTypes" :key="index">
                        <router-link :to="{ path:'/food', query:{ geohash, title:foodItem.title, restaurant_category_id:getCategoryId(foodItem.link) } }" v-for="foodItem of item" :key="foodItem.id" class="link-to-food" v-if="foodItem.title!=='预定早餐'">
                            <figure>
                                <img :src="imgBaseUrl+foodItem.image_url">
                                <figcaption>{{foodItem.title}}</figcaption>
                            </figure>
                        </router-link>
                        <a href="https://zaocan.ele.me/" class='link-to-food' v-else>
                            <figure>
                                <img :src="imgBaseUrl+foodItem.image_url">
                                <figcaption>{{foodItem.title}} </figcaption>
                            </figure>
                        </a>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </nav>
    </div>
</template>
<script>
import _ from 'lodash'
import HeadTop from 'components/header'
import Icon from 'components/icon'
import 'src/../node_modules/swiper/dist/js/swiper.min.js'
import 'src/../node_modules/swiper/dist/css/swiper.min.css';

import {
    imgBaseUrl
} from 'src/env'
import {
    msiteAddress,
    msiteFoodTypes,
    msiteShopList
} from 'src/service'
import {
    mapMutations
} from 'vuex'

import {
    SET_LOCATION,
    SET_GEOHASH
} from 'src/store/mutation-types'

export default {
    name: "Msite",
    components: {
        HeadTop,
        Icon
    },
    data() {
        return {
            msiteTitle: '',
            geohash: '',
            foodTypes: [],
            hasGetData: false,
            imgBaseUrl,
        }
    },
    methods: {
        ...mapMutations([SET_LOCATION, SET_GEOHASH]),
        getCategoryId(url) {
            let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''))
            if (/restaurant_category_id/gi.test(urlData)) {
                return JSON.parse(urlData).restaurant_category_id.id;
            } else return ''
        }
    },
    async beforeMount() {
        this.geohash = this.$route.query.geohash || 'wtw3sm0q087'
        this.SET_GEOHASH(this.geohash)
        let location = await msiteAddress(this.geohash)
        this.msiteTitle = location.name
        this.SET_LOCATION(location)
        this.hasGetData = true
    },
    async mounted() {
        let foodTypes = await msiteFoodTypes(this.geohash)
        let count = Math.ceil(foodTypes.length / 8)
        let newTypes = []
        for (let c = 0; c < count; c++)
            newTypes.push(foodTypes.slice(c * 8, (c + 1) * 8))
        this.foodTypes = newTypes
        await this.foodTypes
        new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            loop: true
        })
    },
}
</script>
<style scoped>
@import 'mixin.css';
.icon-search {
    left: .8rem;
    @mixin wh .8rem,
    .9rem;
    @mixin vc;
}

.msite-title {
    @mixin center;
    width: 50%;
    color: #fff;
    text-align: center;
    margin-left: -0.5rem;
    .title-text {
        @mixin sc 0.8rem,
        #fff;
        text-align: center;
        display: block;
    }
}

.foodtypes-nav {
    padding-top: 2.1rem;
    border-bottom: 0.025rem solid $bc;
    background-color: #fff;
    .swiper-container {
        @mixin wh 100%,
        auto;
        padding-bottom: .6rem;
        .swiper-pagination {
            bottom: 0.2rem;
        }
    }
}

.food-types-container {
    display: flex;
    flex-wrap: wrap;
    .link-to-food {
        width: 25%;
        padding: 0.3rem 0rem;
        @mixin fj center;
        figure {
            img {
                @mixin wh 1.8rem,
                1.8rem;
                margin-bottom: 0.3rem;
            }
            figcaption {
                text-align: center;
                @mixin sc 0.55rem,
                #666;
            }
        }
    }
}
</style>
