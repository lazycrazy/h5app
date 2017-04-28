<template>
    <section class='shoplist-container'>
        <header>
            <Icon name='shop' class='icon'></Icon>
            <span>推荐商家</span>
        </header>
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
        <div class='back-top' @click='backTop' v-if='showBackTop'>
            <Icon name='backtop' class='back-top'></Icon>
        </div>
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
    getImagePath
} from './mixin'
import Rating from './rating'

export default {
    name: 'ShopList',
    components: {
        Icon,
        Rating
    },
    props: ['geohash'],
    data() {
        return {
            offset: 0,
            showLoading: false,
            shopList: [],
        }
    },
    computed: {
        ...mapState(['latitude', 'longitude']),
        showBackTop() {
            document.body.scrollTop > 300
        }
    },
    async mounted() {
        let list = await shopList(this.latitude, this.longitude, this.offset, this.restaurationCategoryId)
        this.shopList = [...list]
    },
    methods: {
        hideLoading() {
            if (process.env.NODE_ENV != 'development') {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    clearTimeout(this.time)
                    this.showLoading = false
                }, 500)
            } else
                this.showLoading = false;
        },
        backTop() {
            // animate(document.body, {
            //     scrollTop: '0'
            // }, 400, 'ease-out');
        }
    },
    mixins: [getImagePath]
}
</script>
<style scoped>
@import 'mixin.css';
.shoplist-container {
    margin-top: 0.4rem;
    border-top: 0.025rem solid #eee;
    background-color: #fff;
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
            padding: .4rem .3rem;
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
}
</style>
