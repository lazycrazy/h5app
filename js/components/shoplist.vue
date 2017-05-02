<template>
    <section class='shoplist-container'>
        <header>
            <Icon name='shop' class='icon'></Icon>
            <span>推荐商家</span>
        </header>
        <ul v-load-more='loadMore'>
            <router-link v-for='shop of shopList' :to="{path:'shop',query:{geohash,id:shop.id}}" tag='section' :key='shop.id' class='shop'>
                <img :src="getImagePath(shop.image_path)" class='shop-img'>
                <div class='shop-desc'>
                    <section>
                        <h3 :class="shop.is_premium?'premium':''" class='ellipsis premium'>{{shop.name}}</h3>
                        <ul>
                            <li v-for='item of shop.supports' :key='item.id'>{{item.icon_name}}</li>
                        </ul>
                    </section>
                    <section>
                        <div>
                            <Rating :rating='shop.rating'></Rating>
                            <span class="rating-num">{{shop.rating}}</span>
                            <span>月售{{shop.recent_order_num}}单</span>
                        </div>
                        <div v-if='shop.delivery_mode'>
                            <span class='delivery'>{{shop.delivery_mode.text}}</span>
                            <span class='delivery'>准时达</span>
                        </div>
                    </section>
                    <section>
                        <div class='money-limit'>
                            <span>¥{{shop.float_minimum_order_amount}}起送</span>
                            <span>{{shop.piecewise_agent_fee.tips}}</span>
                        </div>
                        <div class='time-distance'>
                            <span>{{shop.distance > 1000? (shop.distance/1000).toFixed(2) + 'km': shop.distance + 'm'}}</span>
                            <span class="order_time">{{shop.order_lead_time}}分钟</span>
                        </div>
                    </section>
                </div>
            </router-link>
        </ul>
        <div class='back-top' @click='backTop' v-show='showBackTop'>
            <Icon name='backtop' class='back-top'></Icon>
        </div>
        <footer class='load-more' v-show='showLoading'>正在加载更多商家...</footer>
        <transition name='loading'>
            <Loading v-show='showLoading'></Loading>
        </transition>
    </section>
</template>
<script>
import Icon from './icon'
import {
    shopList
} from 'src/service'
import {
    mapState
} from 'vuex'
import {
    getImagePath,
    loadMore
} from './mixin'
import Rating from './rating'
import Loading from './loading'
import infiniteScroll from 'vue-infinite-scroll'

export default {
    name: 'ShopList',
    components: {
        Icon,
        Rating,
        Loading
    },
    directives: {
        infiniteScroll
    },
    data() {
        return {
            offset: 0,
            showLoading: false,
            shopList: [],
            showBackTop: false,
            noMore: false,
        }
    },
    computed: {
        ...mapState(['latitude', 'longitude']),

    },
    watch: {

    },
    async mounted() {
        await this.loadRestauration()
        document.addEventListener('scroll', this.listenScroll, false)
    },
    beforeDestroy() {
        document.removeEventListener('scroll', this.listenScroll, false)
    },
    methods: {
        async loadRestauration() {
            if (this.showLoading) return
            this.showLoading = true
            let r = await shopList(this.latitude, this.longitude, this.offset, 10, this.restaurationCategoryId)
            this.noMore = r.length === 0
            this.shopList.push(...r)
            this.offset += 10
            this.hideLoading()
        },
        async loadMore() {
            if (this.noMore) return
            await this.loadRestauration()
        },
        listenScroll() {
            this.showBackTop = document.body.scrollTop > 500
        },
        hideLoading() {
            // if (process.env.NODE_ENV != 'development') {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                    clearTimeout(this.timer)
                    this.showLoading = false
                }, 500)
                // } else
                //     this.showLoading = true;
        },
        backTop() {
            // animate(document.body, {
            //     scrollTop: '0'
            // }, 400, 'ease-out')
            let speed = 10;
            let timer = setInterval(function() {
                let top = document.body.scrollTop
                if (top > 0) {
                    document.body.scrollTop = top - speed > 0 ? top - speed : 0;
                    speed += 20;
                } else {
                    clearInterval(timer);
                }
            }, 16)
        },
        async refreshList() {
            this.offset = 0
            await this.loadRestauration()
        },
    },
    mixins: [getImagePath, loadMore],
    props: ['restaurantCategoryId', 'restaurantCategoryDetailId', 'sortByType', 'deliveryMode', 'supportActivityIds', 'confirmSelected', 'geohash'],
    watch: {
        restaurantCategoryDetailId: 'refreshList',
        sortByType: 'refreshList',
        confirmSelected: 'refreshList',
    }
}
</script>
<style scoped>
@import 'mixin.css';
.shoplist-container {
    margin-top: 0.4rem;
    border-top: 0.025rem solid #eee;
    background-color: #fff;
    margin-bottom: 2rem;
    header {
        border-bottom: 0.025rem solid #eee;
        .icon {
            fill: #999;
            margin-left: 0.6rem;
            vertical-align: middle;
            @mixin wh 0.6rem,
            0.6rem;
        }
        span {
            color: #999;
            @mixin font 0.55rem,
            1.6rem;
        }
    }
    .shop {
        display: flex;
        @mixin fj;
        position: relative;
        border-bottom: 0.025rem solid #eee;
        color: #666;
        font-size: .3rem;
        align-items: center;
        .shop-img {
            @mixin wh 3rem,
            3rem;
            margin: .4rem .4rem;
            border-radius: 0.05rem;
        }
        .shop-desc {
            flex-direction: column;
            flex-grow: 1;
            padding: .4rem .266667rem .4rem 0;
            display: flex;
            @mixin fj;
            section:first-child {
                display: flex;
                align-items: center;
                @mixin fj;
                h3 {
                    width: 8.5rem;
                    @mixin font 0.65rem,
                    0.65rem,
                    "PingFangSC-Regular";
                    font-weight: 700;
                }
                ul {
                    display: flex;
                    li {
                        @mixin sc 0.5rem,
                        #999;
                        border: 0.025rem solid $bc;
                        padding: 0.04rem;
                        border-radius: 0.08rem;
                        margin-left: 0.05rem;
                    }
                }
                .premium::before {
                    content: '品牌';
                    display: inline-block;
                    @mixin font .5rem,
                    .6rem;
                    padding: 0 0.2rem;
                    border-radius: 0.1rem;
                    margin-right: 0.3rem;
                    vertical-align: top;
                    background-color: #ffd930;
                }
            }
            section:nth-child(2) {
                display: flex;
                @mixin fj;
                .rating-num {
                    color: #ff6000;
                    margin: 0 0.1rem;
                }
                .delivery {
                    font-size: 0.4rem;
                    padding: 0.04rem 0.08rem 0;
                    border-radius: 0.08rem;
                    margin-left: 0.08rem;
                    border: 1px solid #44a5ff;
                    color: $blue;
                }
                span:first-child {
                    background-color: $blue;
                    color: #fff;
                }
            }
            section:last-child {
                display: flex;
                @mixin fj;
                .money-limit {
                    span+span::before {
                        margin: 0 .08rem;
                        color: #ddd;
                        content: "/";
                    }
                }
                .time-distance {
                    span+span {
                        margin: 0 .08rem;
                        color: #2395ff;
                        content: "/";
                    }
                }
            }
        }
    }
    .back-top {
        position: fixed;
        right: .4rem;
        bottom: 2rem;
        @mixin fj center;
        @mixin wh 2rem,
        2rem;
    }
    .load-more {
        @mixin font 0.6rem,
        3;
        text-align: center;
        color: #999;
    }
}
</style>
