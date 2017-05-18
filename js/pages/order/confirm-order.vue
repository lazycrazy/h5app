<template>
    <div class="confirm-order">
        <section v-if="!showLoading">
            <head-top headTitle="确认订单" :goback="true"></head-top>
            <router-link :to='{path: "/confirmOrder/address", query: {id: checkoutData.cart.id, sig: checkoutData.sig}}' class="address">
                <Icon name='location' class='location-icon'></Icon>
                <div class="address-add" v-if="!choosedAddress">请添加一个收获地址</div>
                <div v-else class="address-detail">
                    <header>
                        <span>{{choosedAddress.name}}</span>
                        <span>{{choosedAddress.sex == 1? '先生':'女士'}}</span>
                        <span>{{choosedAddress.phone}}</span>
                    </header>
                    <div class="address-detail-tag">
                        <span v-if="choosedAddress.tag" :style="{backgroundColor: iconColor(choosedAddress.tag)}">{{choosedAddress.tag}}</span>
                        <p>{{choosedAddress.address_detail}}</p>
                    </div>
                </div>
                <Icon name='arrow-right' class='arrow-right'></Icon>
            </router-link>
            <section class="delivery">
                <p class="delivery-text">送达时间</p>
                <section class="delivery-time">
                    <p>尽快送达 | 预计{{checkoutData.delivery_reach_time}}</p>
                    <p v-if="checkoutData.cart.is_deliver_by_fengniao">蜂鸟专送</p>
                </section>
            </section>
            <section class="pay-way">
                <header class="header">
                    <span>支付方式</span>
                    <div class="more-type" @click="showPayWayFun">
                        <span>在线支付</span>
                        <Icon name='arrow-right'></Icon>
                    </div>
                </header>
                <section class="hongbao">
                    <span>红包</span>
                    <span>暂时只在饿了么 APP 中支持</span>
                </section>
            </section>
            <section class="food">
                <header>
                    <img :src="imgBaseUrl + checkoutData.cart.restaurant_info.image_path">
                    <span>{{checkoutData.cart.restaurant_info.name}}</span>
                </header>
                <ul>
                    <li v-for="item in checkoutData.cart.groups[0]" :key="item.id">
                        <p class="food_name ellipsis">{{item.name}}</p>
                        <div class="num_price">
                            <span>x {{item.quantity}}</span>
                            <span>¥{{item.price}}</span>
                        </div>
                    </li>
                </ul>
                <div class="price">
                    <p class="food_name ellipsis">{{checkoutData.cart.extra[0].name}}</p>
                    <div class="num_price">
                        <span></span>
                        <span>¥ {{checkoutData.cart.extra[0].price}}</span>
                    </div>
                </div>
                <div class="price">
                    <p class="food_name ellipsis">订单 ¥{{checkoutData.cart.total}}</p>
                    <div class="num_price">
                        <span>待支付 ¥{{checkoutData.cart.total}}</span>
                    </div>
                </div>
            </section>
            <section class="pay-way">
                <router-link :to='{path: "/confirmOrder/remark", query: {id: checkoutData.cart.id, sig: checkoutData.sig}}' class="header">
                    <span>订单备注</span>
                    <div class="more-type">
                        <span class="ellipsis">{{remarkText||inputRemarkText? remarklist: '口味、偏好等'}}</span>
                        <Icon name='arrow-right'></Icon>
                    </div>
                </router-link>
                <router-link :to="checkoutData.invoice.is_available? '/confirmOrder/invoice': ''" class="hongbao" :class="{support_is_available: checkoutData.invoice.is_available}">
                    <span>发票抬头</span>
                    <span>
                        {{checkoutData.invoice.status_text}}
                         
                    <Icon name='arrow-right'></Icon>
                    </span>
                </router-link>
            </section>
            <section class="confirm">
                <p>待支付 ¥{{checkoutData.cart.total}}</p>
                <p @click="confrimOrder">确认下单</p>
            </section>
            <transition name="fade">
                <div class="cover" v-if="showPayWay" @click="showPayWayFun"></div>
            </transition>
            <transition name="slid-up">
                <div class="choose-pay-way" v-if="showPayWay">
                    <header>支付方式</header>
                    <ul>
                        <li v-for="item in checkoutData.payments" :key="item.id" :class="{choose: payWayId == item.id}">
                            <span>{{item.name}}<span v-if="!item.is_online_payment">{{item.description}}</span></span>
                            <svg class="address_empty_right" @click="choosePayWay(item.is_online_payment, item.id)">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                            </svg>
                        </li>
                    </ul>
                </div>
            </transition>
        </section>
        <loading v-if="showLoading"></loading>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="router-slide" mode="out-in">
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
import Icon from 'components/icon'
import Loading from 'components/loading'
import AlertTip from 'components/alert-tip'
import {
    checkout,
    getAddress,
    placeOrders
} from 'src/service'
import {
    imgBaseUrl
} from 'src/env'


export default {
    name: 'ConfirmOrder',
    data() {
        return {
            geohash: '',
            shopId: null,
            showLoading: true,
            checkoutData: null,
            shopCart: null,
            imgBaseUrl,
            showPayWay: false,
            payWayId: 1,
            showAlert: false,
            alertText: null,
        }
    },
    components: {
        Icon,
        HeadTop,
        Loading,
        AlertTip
    },
    computed: {
        ...mapState(['cartList', 'remarkText', 'inputRemarkText', 'invoice', 'choosedAddress', 'userInfo']),
        remarklist: function() {
            let str = ''
            if (this.remarkText) {
                Object.values(this.remarkText).forEach(item => {
                    str += item[1] + '，'
                })
            }
            if (this.inputRemarkText) {
                return str + this.inputRemarkText;
            } else {
                return str.substr(0, str.lastIndexOf('，'))
            }
        },
    },
    methods: {
        ...mapMutations([
            'INIT_BUYCART', 'SET_GEOHASH', 'CHOOSE_ADDRESS', 'NEED_VALIDATION', 'SAVE_CART_ID_SIG', 'SAVE_ORDER_PARAM', 'ORDER_SUCCESS', 'SAVE_SHOPID'
        ]),
        iconColor(name) {
            switch (name) {
                case '公司':
                    return '#4cd964';
                case '学校':
                    return '#3190e8';
            }
        },
        showPayWayFun() {
            this.showPayWay = !this.showPayWay
        },
        choosePayWay(is_online_payment, id) {
            if (is_online_payment) {
                this.showPayWay = !this.showPayWay
                this.payWayId = id
            }
        },
        async initData() {
            let newArr = new Array
                //购物车-分类-商品-SKU
            Object.values(this.shopCart).forEach(categoryItem => {
                    Object.values(categoryItem).forEach(itemValue => {
                        Object.values(itemValue).forEach(item => {
                            newArr.push({
                                attrs: [],
                                extra: {},
                                id: item.id,
                                name: item.name,
                                packing_fee: item.packing_fee,
                                price: item.price,
                                quantity: item.num,
                                sku_id: item.sku_id,
                                specs: [item.specs],
                                stock: item.stock,
                            })
                        })
                    })
                })
                //提交结账信息
            this.checkoutData = await checkout(this.geohash, [newArr])
            this.SAVE_CART_ID_SIG({
                cart_id: this.checkoutData.cart.id,
                sig: this.checkoutData.sig
            })
            this.initAddress()
            this.showLoading = false
        },
        async initAddress() {
            if (this.userInfo && this.userInfo.user_id) {
                if (this.checkoutData && this.checkoutData.cart && !this.choosedAddress) {
                    let addressRes = await getAddress(this.checkoutData.cart.id, this.checkoutData.sig);
                    if (addressRes instanceof Array) {
                        this.CHOOSE_ADDRESS({
                            address: addressRes[0],
                            index: 0
                        });
                    }
                }
            }
        },
        async confrimOrder() {
            if (!(this.userInfo && this.userInfo.user_id)) {
                this.showAlert = true
                this.alertText = '请登录'
                return
            } else if (!this.choosedAddress) {
                this.showAlert = true;
                this.alertText = '请添加一个收货地址';
                return
            }
            this.SAVE_ORDER_PARAM({
                user_id: this.userInfo.user_id,
                cart_id: this.checkoutData.cart.id,
                address_id: this.choosedAddress.id,
                description: this.remarklist,
                entities: this.checkoutData.cart.groups,
                geohash: this.geohash,
                sig: this.checkoutData.sig,
            })
            let orderRes = await placeOrders(this.userInfo.user_id, this.checkoutData.cart.id, this.choosedAddress.id, this.remarklist, this.checkoutData.cart.groups, this.geohash, this.checkoutData.sig);
            if (orderRes.need_validation) {
                this.NEED_VALIDATION(orderRes)
                this.$router.push('/confirmOrder/userValidation')
            } else {
                this.ORDER_SUCCESS(orderRes)
                this.$router.push('/confirmOrder/payment')
            }
        },
    },
    created() {
        this.geohash = this.$route.query.geohash
        this.shopId = this.$route.query.shopId
        this.INIT_BUYCART()
        this.SAVE_SHOPID(this.shopId)
        this.shopCart = this.cartList[this.shopId]
    },
    mounted() {
        if (this.geohash) {
            this.initData()
            this.SET_GEOHASH(this.geohash)
        }
    },
    watch: {
        userInfo: function(value) {
            if (value && value.user_id) {
                this.initAddress()
            }
        },
    }
}
</script>
<style scoped>
@import 'mixin';
.arrow-right {
    @mixin wh .6rem,
    .6rem;
    fill: #999;
    @mixin vc;
    right: .5rem;
}

.confirm-order {
    padding-top: 1.95rem;
    padding-bottom: 3rem;
    p,
    span {
        font-family: Helvetica Neue, Tahoma, Arial;
    }
    .confirm {
        display: flex;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 2rem;
        p {
            line-height: 2rem;
            @mixin sc .75rem,
            #fff;
        }
        p:nth-of-type(1) {
            background-color: #3c3c3c;
            flex: 5;
            padding-left: .7rem;
        }
        p:nth-of-type(2) {
            flex: 2;
            background-color: #56d176;
            text-align: center;
        }
    }
    .food {
        background-color: #fff;
        margin-top: .4rem;
        >header {
            padding: .7rem;
            border-bottom: 0.025rem solid #f5f5f5;
            img {
                @mixin wh 1.2rem,
                1.2rem;
                vertical-align: middle;
            }
            span {
                @mixin sc .8rem,
                #333;
            }
        }
        >ul {
            padding-top: .5rem;
            >li {
                @mixin fj;
                line-height: 1.8rem;
                padding: 0 .7rem;
                span,
                p {
                    @mixin sc .65rem,
                    #666;
                }
                .food_name {
                    width: 11rem;
                }
                .num_price {
                    flex: 1;
                    @mixin fj;
                    align-items: center;
                    span:nth-of-type(1) {
                        color: #f60;
                    }
                }
            }
        }
        .price {
            @mixin fj;
            line-height: 1.8rem;
            padding: 0 .7rem;
            span,
            p {
                @mixin sc .65rem,
                #666;
            }
            .food_name {
                width: 11rem;
            }
            .num_price {
                flex: 1;
                @mixin fj;
                align-items: center;
                span:nth-of-type(1) {
                    color: #f60;
                }
            }
        }
        .total_price {
            border-top: 0.025rem solid #f5f5f5;
        }
    }
    .pay-way {
        background-color: #fff;
        margin-top: .4rem;
        padding: 0 .7rem;
        .header {
            @mixin fj;
            line-height: 2rem;
            span:nth-of-type(1) {
                @mixin sc .7rem,
                #666;
            }
            .more-type {
                position: relative;
                span:nth-of-type(1) {
                    @mixin sc .6rem,
                    #aaa;
                    width: 10rem;
                    display: inline-block;
                    text-align: right;
                    vertical-align: middle;
                }
                svg {
                    @mixin wh .5rem,
                    .5rem;
                    fill: #ccc;
                }
            }
        }
        .hongbao {
            @mixin fj;
            border-top: 0.025rem solid #f5f5f5;
            span {
                @mixin sc .6rem,
                #aaa;
                line-height: 2rem;
                svg {
                    @mixin wh .5rem,
                    .5rem;
                    fill: #ccc;
                }
            }
            span:nth-of-type(2) {
                color: #aaa;
            }
        }
    }
    .delivery {
        background-color: #fff;
        margin-top: .4rem;
        padding: 0 .7rem;
        border-left: .2rem solid $blue;
        min-height: 4rem;
        @mixin fj;
        align-items: center;
        &-text {
            @mixin sc .8rem,
            #333;
            font-weight: bold;
            padding-left: .3rem;
        }
        &-time {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            p:nth-of-type(1) {
                @mixin sc .7rem,
                $blue;
            }
            p:nth-of-type(2) {
                @mixin sc .5rem,
                #fff;
                background-color: $blue;
                width: 2.4rem;
                margin-top: .5rem;
                text-align: center;
                border-radius: 0.12rem;
                padding: .1rem;
            }
        }
    }
    .address {
        min-height: 3.5rem;
        display: flex;
        align-items: center;
        padding: 0 0.6rem;
        background: url(../../../img/address_bottom.png) left bottom repeat-x;
        background-color: #fff;
        background-size: auto .12rem;
        align-items: center;
        position: relative;
        .location-icon {
            @mixin wh .8rem,
            .8rem;
            fill: $blue;
            margin-right: .2rem;
        }
        &-add {
            @mixin sc .9rem,
            #333;
        }
        &-detail {
            margin-left: .2rem;
            >header {
                @mixin sc .65rem,
                #333;
                span:nth-of-type(1) {
                    font-size: .8rem;
                    font-weight: bold;
                }
            }
            &-tag {
                width: 100%;
                display: flex;
                align-items: center;
                span {
                    @mixin sc .5rem,
                    #fff;
                    border-radius: .15rem;
                    background-color: #ff5722;
                    height: .6rem;
                    line-height: .6rem;
                    padding: 0 .2rem;
                    margin-right: .3rem;
                }
                p {
                    @mixin sc .55rem,
                    #777;
                }
            }
        }
        .address_empty_left {
            display: flex;
            .add_address {
                @mixin sc .7rem,
                #333;
            }
        }
    }
}

.cover {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .3);
    z-index: 203;
}

.choose-pay-way {
    min-height: 10rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 204;
    header {
        background-color: #fafafa;
        @mixin sc .7rem,
        #333;
        text-align: center;
        line-height: 2rem;
    }
    ul {
        li {
            @mixin fj;
            padding: 0 .7rem;
            line-height: 2.5rem;
            align-items: center;
            span {
                @mixin sc .7rem,
                #ccc;
            }
            svg {
                @mixin wh .8rem,
                .8rem;
                fill: #eee;
            }
        }
        .choose {
            span {
                color: #333;
            }
            svg {
                fill: #4cd964;
            }
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

.slid-up-enter-active,
.slid-up-leave-active {
    transition: all .3s;
}

.slid-up-enter,
.slid-up-leave-active {
    transform: translate3d(0, 10rem, 0)
}

.router-slide-enter-active,
.router-slide-leave-active {
    transition: all .4s;
}

.router-slide-enter,
.router-slide-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
</style>
