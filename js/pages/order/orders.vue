<template>
    <div class="order-page">
        <head-top head-title="订单列表" :goback='true'></head-top>
        <ul class="order_list_ul" v-load-more="loaderMore">
            <li class="order_list_li" v-for="item in orderList" :key="item.id">
                <img :src="item.restaurant_image_url" class="restaurant_image">
                <section class="order_item_right">
                    <section @click="showDetail(item)">
                        <header class="order_item_right_header">
                            <section class="order_header">
                                <h4>
                                    <span class="ellipsis">{{item.restaurant_name}} </span>
                                    <svg fill="#333" class="arrow_right">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                    </svg>
                                </h4>
                                <p class="order_time">{{item.formatted_created_at}}</p>
                            </section>
                            <p class="order_status">
                                {{item.status_bar.title}}
                            </p>
                        </header>
                        <section class="order_basket">
                            <p class="order_name ellipsis">{{item.basket.group[0][0].name}}{{item.basket.group[0].length > 1 ? ' 等' + item.basket.group[0].length + '件商品' : ''}}</p>
                            <p class="order_amount">¥{{item.total_amount.toFixed(2)}}</p>
                        </section>
                    </section>
                    <div class="order_again">
                        <compute-time v-if="item.status_bar.title == '等待支付'" :time="item.formatted_created_at"></compute-time>
                        <router-link :to="{path: '/shop', query: {geohash, id: item.restaurant_id}}" tag="span" class="buy_again" v-else>再来一单</router-link>
                    </div>
                </section>
            </li>
        </ul>
        <FootGuide></FootGuide>
        <transition name="loading">
            <Loading v-show="showLoading"></Loading>
        </transition>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import {
    mapState,
    mapMutations
} from 'vuex'
import HeadTop from 'components/header'
import ComputeTime from 'components/compute-time'
import Loading from 'components/loading'

import FootGuide from 'components/footer'
import {
    getOrderList
} from 'src/service'
import {
    loadMore
} from 'components/mixin'


export default {
    data() {
            return {
                orderList: null, //订单列表
                offset: 0,
                preventRepeat: false, //防止重复获取
                showLoading: true, //显示加载动画
            }
        },
        mounted() {
            this.initData()
        },
        mixins: [loadMore],
        components: {
            HeadTop,
            FootGuide,
            Loading,
            ComputeTime,
        },
        computed: {
            ...mapState([
                'userInfo', 'geohash'
            ]),
        },
        methods: {
            ...mapMutations([
                'SAVE_ORDER'
            ]),
            //初始化获取信息
            async initData() {
                if (this.userInfo && this.userInfo.user_id) {
                    let res = await getOrderList(this.userInfo.user_id, this.offset)
                    this.orderList = [...res]
                    this.hideLoading()
                }
            },
            //加载更多
            async loaderMore() {
                if (this.preventRepeat) {
                    return
                }
                this.preventRepeat = true
                this.showLoading = true
                this.offset += 10
                    //获取信息
                let res = await getOrderList(this.userInfo.user_id, this.offset)
                this.orderList = [...this.orderList, ...res]
                this.hideLoading();
                if (res.length < 10) {
                    return
                }
                this.preventRepeat = false
            },
            //显示详情页
            showDetail(item) {
                this.SAVE_ORDER(item)
                this.preventRepeat = false
                this.$router.push('/orders/orderDetail')
            },
            //生产环境与发布环境隐藏loading方式不同
            hideLoading() {
                if (process.env.NODE_ENV !== 'development') {
                    clearTimeout(this.timer)
                    this.timer = setTimeout(() => {
                        clearTimeout(this.timer)
                        this.showLoading = false
                    }, 400)
                } else {
                    this.showLoading = false
                }
            },
        },
        watch: {
            userInfo: function(value) {
                if (value && value.user_id && !this.orderList) {
                    this.initData()
                }
            }
        }

}
</script>
<style scoped>
@import 'mixin';
.order-page {
    background-color: #f1f1f1;
    padding-bottom: 1.95rem;
    p,
    span,
    h4 {
        font-family: Helvetica Neue, Tahoma, Arial;
    }
}

.order_list_ul {
    padding-top: 1.95rem;
    .order_list_li {
        background-color: #fff;
        display: flex;
        margin-bottom: 0.5rem;
        padding: .6rem .6rem 0;
        .restaurant_image {
            @mixin wh 2rem,
            2rem;
            margin-right: 0.4rem;
        }
        .order_item_right {
            flex: 5;
            .order_item_right_header {
                border-bottom: 0.025rem solid #f5f5f5;
                padding-bottom: .3rem;
                @mixin fj;
                .order_header {
                    h4 {
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        @mixin sc .75rem,
                        #333;
                        line-height: 1rem;
                        width: 9rem;
                        .arrow_right {
                            @mixin wh .4rem,
                            .4rem;
                            fill: #ccc;
                            margin-right: .2rem;
                        }
                    }
                    .order_time {
                        @mixin sc .55rem,
                        #999;
                        line-height: .8rem;
                    }
                }
                .order_status {
                    @mixin sc .6rem,
                    #333;
                }
            }
            .order_basket {
                @mixin fj;
                line-height: 2rem;
                border-bottom: 0.025rem solid #f5f5f5;
                .order_name {
                    @mixin sc .6rem,
                    #666;
                    width: 10rem;
                }
                .order_amount {
                    @mixin sc .6rem,
                    #f66;
                    font-weight: bold;
                }
            }
            .order_again {
                text-align: right;
                line-height: 1.6rem;
                .buy_again {
                    @mixin sc .55rem,
                    #390e88;
                    border: 0.025rem solid #3190e8;
                    padding: .1rem .2rem;
                    border-radius: .15rem;
                }
            }
        }
    }
}

.loading-enter-active,
.loading-leave-active {
    transition: opacity .7s
}

.loading-enter,
.loading-leave-active {
    opacity: 0
}

.router-slid-enter-active,
.router-slid-leave-active {
    transition: all .4s;
}

.router-slid-enter,
.router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
</style>
