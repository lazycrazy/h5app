<template>
    <div class='shop-container'>
        <div>
            <HeadTop  v-if='!showLoading'  :title='shopDetailData.name' :goback='true' class='head-top' :bkcolor="false"></HeadTop>
            <header v-if='!showLoading' class='shop-header'>
                <img :src="getImagePath(shopDetailData.image_path)" class='header-bgimg'>
                <section class='shop-header-desc-container'>
                    <router-link to='/shop/shopDetail' class='shop-header-link'>
                        <img :src="getImagePath(shopDetailData.image_path)" class='shop-header-img'>
                        <div class='shop-header-desc'>
                            <h2 class='shop-header-name ellipsis'>{{shopDetailData.name}}</h2>
                            <p class='shop-header-delivery'>
                                商家配送／{{shopDetailData.order_lead_time}}分钟送达／配送费¥{{shopDetailData.float_delivery_fee}}
                            </p>
                            <p class='shop-header-notice ellipsis'>
                                公告：{{promotionInfo}}
                            </p>
                        </div>
                        <Icon name='arrow-right' class='shop-header-detail-link'></Icon>
                    </router-link>
                    <div class='shop-header-activities' v-if="shopDetailData.activities.length" @click='showActivitiesFun'>
                        <p class="ellipsis" style="width:80%">
                            <span class="tip_icon" :style="{backgroundColor: '#' + shopDetailData.activities[0].icon_color, borderColor: '#' + shopDetailData.activities[0].icon_color}">{{shopDetailData.activities[0].icon_name}}</span>
                            <span>{{shopDetailData.activities[0].description}}（APP专享）</span>
                        </p>
                        <p style='padding-right:.8rem'>{{shopDetailData.activities.length}}个活动</p>
                        <Icon name='arrow-right' class='shop-header-detail-link shop-header-activity-link'></Icon>
                    </div>
                </section>
            </header>
            <transition name="fade">
                <section class="activities-details" v-if="showActivities">
                    <h2 class="activities-shoptitle">{{shopDetailData.name}}</h2>
                    <h3 class="activities-ratingstar">
                        <Rating :rating='shopDetailData.rating'></Rating>
                    </h3>
                    <section class="activities-list">
                        <header class="activities-title"><span>优惠信息</span></header>
                        <ul>
                            <li v-for="item in shopDetailData.activities" :key="item.id">
                                <span class="activities-icon" :style="{backgroundColor: '#' + item.icon_color, borderColor: '#' + item.icon_color}">{{item.icon_name}}</span>
                                <span>{{item.description}}（APP专享）</span>
                            </li>
                        </ul>
                    </section>
                    <section class="activities-shopinfo">
                        <header class="activities-title"><span>商家公告</span></header>
                        <p>{{promotionInfo}}</p>
                    </section>
                    <svg width="60" height="60" class="close-activities" @click.stop="showActivitiesFun">
                        <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none" />
                        <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999;stroke-width:2" />
                        <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999;stroke-width:2" />
                    </svg>
                </section>
            </transition>
        </div>
        <div class='tab'>
            <div>
                <span :class="{selected_tab:selectedTab=='food'}" @click="setTab('food')">商品</span>
            </div>
            <div>
                <span :class="{selected_tab:selectedTab=='rating'}" @click="setTab('rating')">评价</span>
            </div>
        </div>
        <div class='shop-detail'>
            <transition name="fade-tab">
                <section v-show="selectedTab =='food'" class="shop-detail-food">
                    <section class="shop-detail-menu">
                        <section class="menu-group">
                            <ul>
                                <li v-for="(item,index) in menuList" :key="index" class="menu-group-item" :class="{active_group: index == menuIndex}" @click="chooseMenu(index)">
                                    <img class='menu-group-item-img' :src="getImagePath(item.icon_url)" v-if="item.icon_url">
                                    <span>{{item.name}}</span>
                                    <span class="category_num" v-if="categoryNum[index]&&item.type==1">{{categoryNum[index]}}</span>
                                </li>
                            </ul>
                        </section>
                        <section class="menu-item">
                            <dl v-for="(item,index) in menuList" :key="index">
                                <dt class='menu-item-header'>
                                    <section class="menu-item-header-left">
                                        <strong>{{item.name}}</strong>
                                        <span>{{item.description}}</span>
                                    </section>
                                    <span class="menu-item-header-right" @click="showTitleDetail(index)"></span>
                                    <p class="description-tip" @click="showTitleDetail(index)" v-if="index == titleDetailIndex">
                                        <span>{{item.name}}</span> {{item.description}}
                                    </p>
                                </dt>
                                <dd v-for="(foods,foodindex) in item.foods" :key="foodindex" class="menu-item-detail">
                                    <router-link :to="{path: 'shop/foodDetail', query:{image_path:foods.image_path, description: foods.description, month_sales: foods.month_sales, name: foods.name, rating: foods.rating, rating_count: foods.rating_count, satisfy_rate: foods.satisfy_rate, foods, shopId}}" tag="div" class="menu-item-detail-link">
                                        <span>
                                                <img class="menu-item-img" :src="getImagePath(foods.image_path)">
                                            </span>
                                        <section class="menu-item-desc">
                                            <h3 class="menu-item-desc-head">
                                                    <strong class="description-foodname">{{foods.name}}</strong>
                                                    <ul v-if="foods.attributes.length" class="menu-item-desc-head-attr">
                                                        <li v-for="(attribute, foodindex) in foods.attributes" :key="foodindex" :style="{color: '#' + attribute.icon_color,borderColor:'#' +attribute.icon_color}" :class="{attribute_new: attribute.icon_name == '新'}">
                                                        <p :style="{color: attribute.icon_name == '新'? '#fff' : '#' + attribute.icon_color}">{{attribute.icon_name == '新'? '新品':attribute.icon_name}}</p>
                                                        </li>
                                                    </ul>

                                                </h3>
                                            <p class="food_description_content">{{foods.description}}</p>
                                            <p class="food_description_sale_rating">
                                                <span>月售{{foods.month_sales}}份</span>
                                                <span>好评率{{foods.satisfy_rate}}%</span>
                                            </p>
                                            <p v-if="foods.activity" class="food-activity">
                                                <span :style="{color: '#' + foods.activity.image_text_color,borderColor:'#' +foods.activity.icon_color}">{{foods.activity.image_text}}</span>
                                            </p>
                                        </section>
                                    </router-link>
                                    <footer class="menu-item-detail-footer">
                                        <section class="menu-item-detail-footer-price">
                                            <span>¥</span>
                                            <span>{{foods.specfoods[0].price}}</span>
                                            <span v-if="foods.specifications.length">起</span>
                                        </section>
                                        <BuyCart :shopId='shopId' :foods='foods' @moveInCart="listenInCart" @showChooseList="showChooseList" @showReduceTip="showReduceTip" @showMoveDot="showMoveDotFun"></BuyCart>
                                    </footer>
                                </dd>
                            </dl>
                        </section>
                    </section>
                    <section class="buy-cart-container">
                        <section @click="toggleCartList" class="cart-icon-num">
                            <div class="cart-icon-container" :class="{cart_icon_active: totalPrice > 0, move_in_cart:receiveInCart}">
                                <span v-if="totalNum" class="cart-list-length">
                                    {{totalNum}}
                                </span>
                                <Icon class="cart-icon" name="cart-icon"></Icon>
                            </div>
                            <div class="cart-num">
                                <div>¥ {{totalPrice}}</div>
                                <div>配送费¥{{deliveryFee}}</div>
                            </div>
                        </section>
                        <section class="gotopay" :class="{gotopay_acitvity: minimumOrderAmount <= 0}">
                            <span class="gotopay_button_style" v-if="minimumOrderAmount > 0">还差¥{{minimumOrderAmount}}起送</span>
                            <router-link :to="{path:'/confirmOrder', query:{geohash, shopId}}" class="gotopay_button_style" v-else>去结算</router-link>
                        </section>
                    </section>
                    <transition name="toggle-cart">
                        <section class="cart_food_list" v-show="showCartList&&cartFoodList.length">
                            <header>
                                <h4>购物车</h4>
                                <div @click="clearCart">
                                    <svg>
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-remove"></use>
                                    </svg>
                                    <span class="clear_cart">清空</span>
                                </div>
                            </header>
                            <section class="cart_food_details" id="cartFood">
                                <ul>
                                    <li v-for="(item, index) in cartFoodList" :key="index" class="cart_food_li">
                                        <div class="cart_list_num">
                                            <p class="ellipsis">{{item.name}}</p>
                                            <p class="ellipsis">{{item.specs}}</p>
                                        </div>
                                        <div class="cart_list_price">
                                            <span>¥</span>
                                            <span>{{item.price}}</span>
                                        </div>
                                        <section class="cart_list_control">
                                            <span @click="removeOutCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">
                                                <Icon name='cart-minus'></Icon> 
                                            </span>
                                            <span class="cart_num">{{item.num}}</span>
                                            <Icon name='cart-add' class="cart_add" @click="addToCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)"></Icon>
                                        </section>
                                    </li>
                                </ul>
                            </section>
                        </section>
                    </transition>
                    <transition name="fade">
                        <div class="screen-cover" v-show="showCartList&&cartFoodList.length" @click="toggleCartList"></div>
                    </transition>
                </section>
            </transition>
        </div>
        <div></div>
        <transition name="fade">
            <p class="delete-tip" v-if="showDeleteTip">多规格商品只能去购物车删除哦</p>
        </transition>
        <Loading v-show="showLoading || loadRatings"></Loading>
        <transition appear @after-appear='afterEnter' @before-appear="beforeEnter" :key='index' v-for="(item,index) in showMoveDot">
            <span class="move-dot" v-if="item">
        <Icon class='move-liner' name='cart-add'></Icon>                 
            </span>
        </transition>
        <transition name="router-slide" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import Icon from 'components/icon'
import Rating from 'components/rating'
import HeadTop from 'components/header'
import BuyCart from 'components/buycart'
import Loading from 'components/loading'
import {
    getImagePath
} from 'components/mixin'
import {
    msiteAddress,
    shopDetails,
    foodMenu,
    getRatingList,
    ratingScores,
    ratingTags,
} from 'src/service'
import {
    mapState,
    mapMutations
} from 'vuex'
import {
    SET_GEOHASH,
    SET_LOCATION,
    SET_SHOPDETAIL
} from 'src/store/mutation-types'


export default {
    name: 'Shop',
    data() {
        return {
            geohash: '',
            shopId: null,
            showLoading: true,
            showActivities: false,
            shopDetailData: null,
            ratingList: null,
            ratingScoresData: null,
            ratingTagsList: null,
            ratingOffset: 0,
            selectedTab: 'food',
            showCartList: false,
            cartFoodList: [],
            menuList: [],
            menuIndex: 0,
            totalNum: 10,
            categoryNum: [],
            titleDetailIndex: null,
            showMoveDot: [],
            receiveInCart: false,
            elLeft: 0,
            elBottom: 0,
            windowHeight: 0,
        }
    },
    components: {
        Icon,
        HeadTop,
        Rating,
        BuyCart,
        Loading
    },
    mixins: [getImagePath],
    methods: {
        ...mapMutations([SET_GEOHASH, SET_LOCATION, SET_SHOPDETAIL]),
        hideLoading() {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                clearTimeout(this.timer)
                this.showLoading = false
            }, 500)
        },
        showActivitiesFun() {
            this.showActivities = !this.showActivities
        },
        setTab(type) {
            this.selectedTab = type
        },
        toggleCartList() {
            this.cartFoodList.length ? this.showCartList = !this.showCartList : true;
        },
        chooseMenu(idx) {
            this.menuIndex = idx
        },
        addToCart() {

        },
        removeOutCart() {

        },
        showTitleDetail(index) {
            this.titleDetailIndex = this.titleDetailIndex == index ? null : index;
        },
        clearCart() {

        },
        listenScroll(element) {
            // let oldScrollTop;
            // let requestFram;
            // this.foodScroll = new BScroll(element, {
            //     probeType: 3,
            //     deceleration: 0.001,
            //     bounce: false,
            //     swipeTime: 2000,
            //     click: true,
            // });

            // this.wrapperMenu = new BScroll('#wrapper_menu', {
            //     click: true,
            // });

            // this.foodScroll.on('scroll', (pos) => {
            //     this.shopListTop.forEach((item, index) => {
            //         if (this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item) {
            //             this.menuIndex = index;
            //         }
            //     })
            // })
        },
        listenInCart() {
            // if (!this.receiveInCart) {
            //     this.receiveInCart = true;
            //     this.$refs.cartContainer.addEventListener('animationend', () => {
            //         this.receiveInCart = false;
            //     })
            //     this.$refs.cartContainer.addEventListener('webkitAnimationEnd', () => {
            //         this.receiveInCart = false;
            //     })
            // }
        },
        showChooseList(foods) {
            // if (foods) {
            //     this.choosedFoods = foods;
            // }
            // this.showSpecs = !this.showSpecs;
            // this.specsIndex = 0;
        },
        chooseSpecs(index) {
            // this.specsIndex = index;
        },
        showReduceTip() {
            // this.showDeleteTip = true;
            // clearTimeout(this.timer);
            // this.timer = setTimeout(() => {
            //     clearTimeout(this.timer);
            //     this.showDeleteTip = false;
            // }, 3000);
        },
        showMoveDotFun(showMoveDot, elLeft, elBottom) {
            this.showMoveDot.push(showMoveDot)
            this.elLeft = elLeft
            this.elBottom = elBottom
        },
        beforeEnter(el) {
            el.style.transform = `translate3d(0,${37 + this.elBottom - this.windowHeight}px,0)`
            el.children[0].style.transform = `translate3d(${this.elLeft - 30}px,0,0)`
            el.children[0].style.opacity = 0
        },
        afterEnter(el) {
            el.style.transform = `translate3d(0,0,0)`
            el.children[0].style.transform = `translate3d(0,0,0)`
            el.style.transition = 'transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)'
            el.children[0].style.transition = 'transform .55s linear'
            el.children[0].style.opacity = 1
            el.children[0].addEventListener('transitionend', () => {
                this.listenInCart()
            })
            el.children[0].addEventListener('webkitAnimationEnd', () => {
                this.listenInCart()
            })
            this.showMoveDot.splice(0) //注意清除
        },
    },
    created() {
        this.geohash = this.$route.query.geohash
        this.shopId = this.$route.query.id
            // this.INIT_BUYCART()
    },
    async mounted() {


        this.showLoading = true
        let res = await msiteAddress(this.geohash);
        this.SET_LOCATION(res);
        this.shopDetailData = await shopDetails(this.shopId, this.latitude, this.longitude);
        this.menuList = await foodMenu(this.shopId);
        this.ratingList = await getRatingList(this.ratingOffset);
        this.ratingScoresData = await ratingScores(this.shopId);
        this.ratingTagsList = await ratingTags(this.shopId);
        this.SET_SHOPDETAIL(this.shopDetailData)
        this.hideLoading()
        this.windowHeight = window.innerHeight
    },
    computed: {
        ...mapState(['latitude', 'longitude']),
        promotionInfo() {
            return this.shopDetailData.promotion_info || '欢迎光临，用餐高峰请提前下单'
        },
    }

}
</script>
<style scoped>
@import 'mixin';
.move-dot {
    position: fixed;
    bottom: 30px;
    left: 30px;
}

.move-liner {
    @mixin wh .9rem,
    .9rem;
    fill: #3190e8;
}

.description-tip {
    background-color: #39373a;
    opacity: 0.95;
    font-size: 0.5rem;
    color: #fff;
    position: absolute;
    top: 1.5rem;
    z-index: 14;
    width: 8rem;
    right: .2rem;
    padding: .5rem .4rem;
    border: 1px;
    border-radius: .2rem;
    >span {
        color: #fff;
    }
}

.menu-item {
    overflow-y: auto;
    background-color: #fff;
    flex: 1;
    &-header {
        @mixin fj;
        align-items: center;
        padding: .4rem;
        font-size: .7rem;
        background-color: #f8f8f8;
        position: relative;
        &-left {
            width: 11rem;
            overflow: hidden;
            white-space: nowrap;
        }
        &-right {
            @mixin wh .5rem,
            1rem;
            display: block;
            @mixin bis '../../../img/icon_point.png';
            background-size: 100% .4rem;
            background-position: left center;
        }
    }
    &-detail {
        background-color: #fff;
        padding: .6rem .4rem;
        border-bottom: 1px solid #f8f8f8;
        position: relative;
        overflow: hidden;
        &-link {
            display: flex;
        }
        &-footer {
            margin-left: 2.4rem;
            @mixin fj;
            align-items: center;
            margin-top: .3rem;
            &-price {
                span:nth-of-type(1) {
                    font-size: .5rem;
                    color: #f60;
                    margin-right: .05rem;
                }
                span:nth-of-type(2) {
                    font-size: .7rem;
                    color: #f60;
                    font-weight: bold;
                    margin-right: .3rem;
                }
                span:nth-of-type(3) {
                    font-size: .5rem;
                    color: #666;
                }
            }
        }
    }
    &-desc {
        &-head {
            @mixin fj;
            margin-bottom: .3rem;
            &-attr {
                display: flex;
                >li {
                    font-size: .3rem;
                    height: .6rem;
                    line-height: .35rem;
                    padding: .1rem;
                    border: 1px solid #666;
                    border-radius: 0.3rem;
                    margin-right: .1rem;
                    transform: scale(0.8);
                    >p {
                        white-space: nowrap;
                        line-height: .4rem;
                    }
                }
            }
        }
    }
    &-img {
        @mixin wh 2rem,
        2rem;
        margin-right: .2rem;
    }
}

.menu-group {
    width: 3.8rem;
    overflow-y: auto;
    font-size: .6rem;
    background-color: #f8f8f8;
    &-item {
        padding: .7rem .3rem;
        border-bottom: 0.025rem solid #ededed;
        position: relative;
        border-left: 0.15rem solid #f8f8f8;
        &-img {
            @mixin wh .4rem,
            .4rem;
        }
    }
}

.active_group {
    background-color: #fff;
    border-left: 0.15rem solid #3190e8;
}

.shop-detail {
    flex: 1;
    padding-bottom: 2rem;
    overflow-y: hidden;
    display: flex;
    &-menu {
        background-color: #fff;
        font-size: .5rem;
        display: flex;
        overflow-y: hidden;
    }
    &-food {
        display: flex;
    }
}

.cart-list-length {
    position: absolute;
    top: -.25rem;
    right: -.25rem;
    background-color: #ff461d;
    border-radius: 50%;
    font-size: .5rem;
    height: .7rem;
    min-width: .7rem;
    text-align: center;
    color: #fff;
}

.cart_icon_active {
    background-color: #3190e8;
}

.cart-icon-container {
    position: absolute;
    left: .5rem;
    top: -0.7rem;
    padding: .4rem;
    border: 0.18rem solid #444;
    border-radius: 50%;
    background-color: #3d3d3f;
}

.cart-num {
    >div {
        color: #fff;
    }
    >div:last-child {
        font-size: .4rem;
        font-weight: lighter;
    }
    position: absolute;
    left: 3.6rem;
    @mixin vc;
}

.cart-icon-num {
    flex: 1;
}

.gotopay {
    width: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    >a {
        color: #fff;
    }
}

.buy-cart-container {
    position: absolute;
    background-color: #3d3d3f;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2rem;
    z-index: 13;
    display: flex;
    font-size: .7rem;
    font-weight: bold;
}

.cart-icon {
    @mixin wh 1.2rem,
    1.2rem;
}

.shop-container {
    position: fixed;
    display: flex;
    flex-direction: column;
    left: 0;
    right: 0;
    height: 100%;
}

.shop-header {
    z-index: 10;
    overflow: hidden;
    position: relative;
    padding-top: 1.95rem;
}

.head-top {
    background-color: rgba(119, 103, 137, 0.43);
}

.shop-header-desc-container {
    position: relative;
    z-index: 10;
    background-color: rgba(119, 103, 137, 0.43);
    padding: 0.4rem 0 0.4rem 0.4rem;
    width: 100%;
    overflow: hidden;
}

.shop-header-link {
    display: flex;
}

.header-bgimg {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    filter: blur(10px);
}

.shop-header-img {
    @mixin wh 3rem,
    3rem;
    margin-right: .4rem;
}

.shop-header-desc {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: .5rem;
}

.shop-header-name {
    font-size: .8rem;
    color: #fff;
    font-weight: bold;
}

.shop-header-delivery {
    color: #fff;
}

.shop-header-notice {
    color: #fff;
    width: 11.2rem;
}

.shop-header-detail-link {
    @mixin vc;
    right: .3rem;
    z-index: 11;
    @mixin wh .5rem,
    .5rem;
    fill: $bc;
}

.shop-header-activity-link {
    @mixin wh .3rem,
    .3rem;
}

.shop-header-activities {
    @mixin fj;
    position: relative;
    z-index: 10;
    font-size: .5rem;
    margin: .4rem .3rem 0 0;
    span {
        color: #fff;
    }
    >p {
        color: #fff;
    }
}

.activities-details {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #262626;
    z-index: 200;
    padding: 1.25rem;
    h2,
    h3,
    span,
    p {
        color: #fff;
    }
}

.close-activities {
    border-bottom: 1rem;
    position: fixed;
    @mixin hc;
}

.tab {
    background-color: #fff;
    padding: .3rem 0;
    @mixin fj;
    >div {
        flex: 1;
        text-align: center;
        >span {
            @mixin sc .65rem,
            #666;
            border-bottom: 0.12rem solid #fff;
            padding-bottom: .2rem;
        }
        .selected_tab {
            border-color: #3190e8;
            color: #3190e8;
        }
    }
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>
