<template>
    <div class="vipcard-page">
        <head-top head-title="会员中心" :goback='true'></head-top>
        <section v-if="userInfo">
            <p class="buy_for">为账户 <span>{{userInfo.username}}</span> 购买会员</p>
            <section class="vip_prerogative">
                <a to="/vipcard/vipDescription" class="header_style">
                    <span class="header_left">会员特权</span>
                    <section class="header_right">
                        <span>会员说明</span>
                        <svg fill="#ccc">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </section>
                </a>
                <section class="vip_detail">
                    <div class="vip_detail_left">
                        <img src="../../../img/sheng.png" height="80" width="70">
                    </div>
                    <div class="vip_detail_right">
                        <h4>减免配送费</h4>
                        <p>每月减免30单，每日可减免3单，每单最高减4元</p>
                        <p>蜂鸟专送专享</p>
                    </div>
                </section>
                <section class="vip_detail">
                    <div class="vip_detail_left">
                        <img src="../../../img/jifen.png" height="80" width="70">
                    </div>
                    <div class="vip_detail_right">
                        <h4>减免配送费</h4>
                        <p>每月减免30单，每日可减免3单，每单最高减4元</p>
                        <p>蜂鸟专送专享</p>
                    </div>
                </section>
            </section>
            <section class="apply_vip">
                <header class="header_style">
                    <span class="header_left">开通会员</span>
                </header>
                <section class="apply_vip_buy">
                    <div class="apply_vip_buy_left">
                        <span>1个月</span>
                        <span> ¥20</span>
                    </div>
                    <div class="apply_vip_buy_right" @click="buyCart">购买</div>
                </section>
            </section>
            <a to="/vipcard/useCart" class="header_style common_style">
                <span class="header_left">兑换会员</span>
                <section class="header_right">
                    <span>使用卡号卡密</span>
                    <svg fill="#ccc">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </section>
            </a>
            <a to="/vipcard/invoiceRecord" class="header_style common_style">
                <span class="header_left">购买记录</span>
                <section class="header_right">
                    <span>开发票</span>
                    <svg fill="#ccc">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </section>
            </a>
        </section>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import HeadTop from 'components/header'
import {
    mapState,
    mapMutations
} from 'vuex'
import {
    getOrderList
} from 'src/service'

export default {
    data() {
            return {

            }
        },
        computed: {
            ...mapState([
                'userInfo',
            ]),
        },
        components: {
            HeadTop,
        },
        methods: {
            ...mapMutations([
                'ORDER_SUCCESS', 'BUY_CART'
            ]),
            buyCart() {
                this.ORDER_SUCCESS({
                    order_id: '399525134200981325'
                });
                this.BUY_CART(20);
                this.$router.push('/confirmOrder/payment');
            },
        }
}
</script>
<style scoped>
@import 'mixin';
.vipcard-page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    z-index: 202;
    background-color: #f2f2f2;
    padding-top: 1.95rem;
    p,
    span {
        font-family: Helvetica Neue, Tahoma, Arial;
    }
}

.buy_for {
    @mixin sc .6rem,
    #666;
    line-height: 2rem;
    padding-left: 0.7rem;
    span {
        font-weight: bold;
    }
}

.vip_prerogative {
    background-color: #fff;
    padding-left: .7rem;
    margin-bottom: 0.5rem;
    .vip_detail {
        display: flex;
        border-bottom: 1px solid #f5f5f5;
        padding: .8rem 0;
        .vip_detail_left {
            margin-right: .6rem;
            img {
                @mixin wh 1.6rem,
                1.8rem;
            }
        }
        .vip_detail_right {
            h4 {
                @mixin sc .7rem,
                #333;
                font-weight: normal;
            }
            p {
                @mixin sc .5rem,
                #999;
            }
        }
    }
}

.apply_vip {
    background-color: #fff;
    padding-left: .7rem;
    margin-bottom: 0.5rem;
    .apply_vip_buy {
        @mixin fj;
        align-items: center;
        padding-right: .7rem;
        font-size: .7rem;
        line-height: 2.6rem;
        .apply_vip_buy_left {
            span:nth-of-type(2) {
                font-weight: bold;
                color: #f60;
            }
        }
        .apply_vip_buy_right {
            border: 0.025rem solid #f60;
            border-radius: 0.2rem;
            line-height: 1.2rem;
            height: 1.2rem;
            width: 2.6rem;
            text-align: center;
            @mixin sc .6rem,
            #f60;
        }
    }
}

.header_style {
    @mixin fj;
    background-color: #fff;
    line-height: 2rem;
    border-bottom: 1px solid #f5f5f5;
    padding-right: .7rem;
    .header_left {
        @mixin sc .7rem,
        #333;
    }
    .header_right {
        display: flex;
        align-items: center;
        span {
            @mixin sc .6rem,
            #999;
            margin-right: .2rem;
        }
        svg {
            @mixin wh .5rem,
            .5rem;
        }
    }
}

.common_style {
    padding: 0 .7rem;
    margin-bottom: 0.5rem;
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
