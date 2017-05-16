<template>
    <div class='shop-container'>
        <div>
            <HeadTop v-if='!showLoading' :title='shopDetailData.name' :goback='true' class='head-top' :bkcolor="false"></HeadTop>
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
        </div>
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
        <div class='tab' v-if='!showLoading'>
            <div>
                <span :class="{selected_tab:selectedTab=='food'}" @click="setTab('food')">商品</span>
            </div>
            <div>
                <span :class="{selected_tab:selectedTab=='rating'}" @click="setTab('rating')">评价</span>
            </div>
        </div>
        <transition name="fade-tab" mode="out-in">
            <div class='shop-detail' v-if='!showLoading' v-show="selectedTab =='food'">
                <section class="shop-detail-food">
                    <section class="shop-detail-menu">
                        <section class="menu-group">
                            <ul>
                                <li v-for="(item,index) in menuList" :key="index" class="menu-group-item" :class="{active_group: index == menuIndex}" @click="chooseMenu(index)">
                                    <img class='menu-group-item-img' :src="getImagePath(item.icon_url)" v-if="item.icon_url">
                                    <span>{{item.name}}</span>
                                    <span class="menu-group-item-num" v-if="categoryNum[index]&&item.type==1">{{categoryNum[index]}}</span>
                                </li>
                            </ul>
                        </section>
                        <div id='scrollWrapper'>
                            <section class="menu-item">
                                <dl v-for="(item,index) in menuList" :key="index" ref='menuFoodList'>
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
                                            <BuyCart :shopId='shopId' :foods='foods' @showChooseList="showChooseList" @showReduceTip="showReduceTip" @showMoveDot="showMoveDotFun"></BuyCart>
                                        </footer>
                                    </dd>
                                </dl>
                            </section>
                        </div>
                    </section>
                    <div class="buy-cart">
                        <div @click="toggleCartList" class="buy-cart-icon-num">
                            <div ref='cartIcon' class="buy-cart-icon" :class="{cart_icon_active: totalPrice > 0, move_in_cart:receiveInCart}">
                                <span v-if="totalNum" class="cart-list-length">
                                    {{totalNum}}
                                </span>
                                <Icon class="buy-cart-icon-img" name="cart-icon"></Icon>
                            </div>
                            <div class="buy-cart-num">
                                <div>¥ {{totalPrice}}</div>
                                <div>配送费¥{{deliveryFee}}</div>
                            </div>
                        </div>
                        <div class="gotopay" :class="{gotopay_active: minimumOrderAmount <= 0}">
                            <span class="gotopay-btn" v-if="minimumOrderAmount > 0">还差¥{{minimumOrderAmount}}起送</span>
                            <router-link :to="{path:'/confirmOrder', query:{geohash, shopId}}" class="gotopay-btn" v-else>去结算</router-link>
                        </div>
                    </div>
                    <transition name="toggle-cart">
                        <section class="cart-food-list" v-show="showCartList&&cartFoodList.length">
                            <header>
                                <h4>购物车</h4>
                                <div @click="clearCart">
                                    <Icon name='cart-remove' class='cart-clear'></Icon>
                                    <span class="clear-cart">清空</span>
                                </div>
                            </header>
                            <div class="cart-food-list-detail" id="cartFood">
                                <ul>
                                    <li v-for="(item, index) in cartFoodList" :key="index">
                                        <div>
                                            <p class="ellipsis">{{item.name}}</p>
                                            <p class="ellipsis">{{item.specs}}</p>
                                        </div>
                                        <div>
                                            <span>¥</span>
                                            <span>{{item.price}}</span>
                                        </div>
                                        <div>
                                            <Icon @click.native="removeOutCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)" name='cart-minus' class='cart-minus'></Icon>
                                            <span class="cart-num">{{item.num}}</span>
                                            <Icon name='cart-add' class="cart-add" @click.native="addToCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)"></Icon>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </transition>
                </section>
            </div>
        </transition>
        <transition name="fade-tab" mode="out-in">
            <section class="shop-rating" v-if='!showLoading' id="shopRating" v-show="selectedTab =='rating'">
                <header>
                    <div>
                        <p>{{shopDetailData.rating}}</p>
                        <p>综合评价</p>
                        <p>高于周边商家{{(ratingScoresData.compare_rating).toFixed(1)}}%</p>
                    </div>
                    <div>
                        <p>
                            <span>服务态度</span>
                            <Rating :rating='ratingScoresData.service_score' :size='0.4'></Rating>
                            <span class="rating_num">{{ratingScoresData.service_score.toFixed(1)}}</span>
                        </p>
                        <p>
                            <span>菜品评价</span>
                            <Rating :rating='ratingScoresData.food_score' :size='0.4'></Rating>
                            <span class="rating_num">{{ratingScoresData.food_score.toFixed(1)}}</span>
                        </p>
                        <p>
                            <span>送达时间</span>
                            <span class="delivery_time">{{shopDetailData.order_lead_time}}分钟</span>
                        </p>
                    </div>
                </header>
                <ul>
                    <li v-for="(item, index) in ratingTagsList" :key="index" :class="{unsatisfied: item.unsatisfied, tagActive: ratingTagIndex == index}" @click="changeTagIndex(index, item.name)">{{item.name}}({{item.count}})</li>
                </ul>
                <ul>
                    <li v-for="(item, index) in ratingList" :key="index">
                        <img :src="getImagePath(item.avatar)">
                        <section>
                            <header>
                                <section>
                                    <p>{{item.username}}</p>
                                    <p>
                                        <Rating :rating='item.rating_star' :size='0.4'></Rating>
                                        <span>{{item.time_spent_desc}}</span>
                                    </p>
                                </section>
                                <time>{{item.rated_at}}</time>
                            </header>
                            <ul>
                                <li v-for="(item, index) in item.item_ratings" :key="index">
                                    <img class="shop-rating-img" :src="getImagePath(item.image_hash)" v-if="item.image_hash">
                                </li>
                            </ul>
                            <ul>
                                <li v-for="(item, index) in item.item_ratings" :key="index" class="ellipsis">
                                    {{item.food_name}}
                                </li>
                            </ul>
                        </section>
                    </li>
                </ul>
            </section>
        </transition>
        <transition name="fade">
            <div class="screen-cover" v-show="showCartList&&cartFoodList.length" @click="toggleCartList"></div>
        </transition>
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
        <transition name="fade">
            <div class="specs-cover" @click="showChooseList" v-if="showSpecs"></div>
        </transition>
        <transition name="fade-bounce">
            <div class="specs-list" v-if="showSpecs">
                <header class="specs-list-header">
                    <h4 class="ellipsis">{{choosedFoods.name}}</h4>
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1" class="specs-list-cancel" @click="showChooseList">
                        <line x1="0" y1="0" x2="16" y2="16" stroke="#666" stroke-width="1.2" />
                        <line x1="0" y1="16" x2="16" y2="0" stroke="#666" stroke-width="1.2" />
                    </svg>
                </header>
                <section class="specs-list-details">
                    <h5 class="specs-list-details-title">{{choosedFoods.specifications[0].name}}</h5>
                    <ul>
                        <li v-for="(item, itemIndex) in choosedFoods.specifications[0].values" :class="{sepcs_active: itemIndex == specsIndex}" @click="chooseSpecs(itemIndex)">
                            {{item}}
                        </li>
                    </ul>
                </section>
                <footer class="specs-list-footer">
                    <div class="specs-list-footer-price">
                        <span>¥ </span>
                        <span>{{choosedFoods.specfoods[specsIndex].price}}</span>
                    </div>
                    <div class="specs-list-footer-addtocart" @click="addSpecs(choosedFoods.category_id, choosedFoods.item_id, choosedFoods.specfoods[specsIndex].food_id, choosedFoods.specfoods[specsIndex].name, choosedFoods.specfoods[specsIndex].price, choosedFoods.specifications[0].values[specsIndex], choosedFoods.specfoods[specsIndex].packing_fee, choosedFoods.specfoods[specsIndex].sku_id, choosedFoods.specfoods[specsIndex].stock)">加入购物车</div>
                </footer>
            </div>
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
    SET_SHOPDETAIL,
    ADD_CART,
    CLEAR_CART,
    REDUCE_CART,
    INIT_BUYCART
} from 'src/store/mutation-types'

import BScroll from 'better-scroll'
import _ from 'lodash'

export default {
    name: 'Shop',
    data() {
        return {
            geohash: '',
            shopId: null,
            showLoading: true,
            loadRatings: false,
            showActivities: false,
            shopDetailData: null,
            ratingTagIndex: 0,
            ratingTagName: '',
            ratingList: null,
            ratingScoresData: null,
            ratingTagsList: null,
            ratingOffset: 0,
            selectedTab: 'food',
            showCartList: false,
            cartFoodList: [],
            menuList: [],
            menuIndex: 0,
            categoryNum: [],
            titleDetailIndex: null,
            showMoveDot: [],
            receiveInCart: false,
            elLeft: 0,
            elBottom: 0,
            windowHeight: 0,
            showDeleteTip: false,
            choosedFoods: null,
            showSpecs: false,
            specsIndex: 0,
            totalPrice: 0,
            receiveInCart: false,
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
        ...mapMutations([SET_GEOHASH, SET_LOCATION, SET_SHOPDETAIL, ADD_CART, CLEAR_CART, REDUCE_CART, INIT_BUYCART]),
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
        toggleCartList(event) {
            if (this.cartFoodList.length) this.showCartList = !this.showCartList
        },

        addToCart(category_id, item_id, food_id, name, price, specs) {
            this.ADD_CART({
                shopid: this.shopId,
                category_id,
                item_id,
                food_id,
                name,
                price,
                specs
            })
        },
        removeOutCart(category_id, item_id, food_id, name, price, specs) {
            this.REDUCE_CART({
                shopid: this.shopId,
                category_id,
                item_id,
                food_id,
                name,
                price,
                specs
            })
        },
        showTitleDetail(index) {
            this.titleDetailIndex = this.titleDetailIndex == index ? null : index;
        },
        clearCart() {
            this.toggleCartList()
            this.CLEAR_CART(this.shopId)
        },
        chooseMenu(idx) {
            this.menuIndex = idx
            this.foodScroll.scrollTo(0, -this.shopListTop[idx], 400)
        },
        getFoodListHeight() {
            const foodGroups = this.$refs.menuFoodList
            const container = this.$refs.menuFoodList[0].parentNode
            this.shopListTop = foodGroups.map((item) => {
                return item.offsetTop - container.offsetTop
            })
            this.listenScroll(container)
        },
        listenScroll(element) {
            this.foodScroll = new BScroll('#scrollWrapper', {
                click: true,
                probeType: 3,
                bounce: false,
            })
            this.foodScroll.on('scroll', (pos) => {
                let tops = this.shopListTop.filter((item) => Math.abs(Math.round(pos.y)) >= item)
                    // console.log(tops)
                this.menuIndex = tops.length - 1
            })
        },
        listenInCart() {
            if (!this.receiveInCart) {
                this.receiveInCart = true;
                this.$refs.cartIcon.addEventListener('animationend', () => {
                    this.receiveInCart = false;
                })
                this.$refs.cartIcon.addEventListener('webkitAnimationEnd', () => {
                    this.receiveInCart = false;
                })
            }
        },
        showChooseList(foods) {
            if (foods) {
                this.choosedFoods = foods
            }
            this.showSpecs = !this.showSpecs
            this.specsIndex = 0
        },
        chooseSpecs(index) {
            this.specsIndex = index
        },
        showReduceTip() {
            this.showDeleteTip = true;
            let timer = setTimeout(() => {
                clearTimeout(timer)
                this.showDeleteTip = false
            }, 3000)
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
        addSpecs(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock) {
            this.ADD_CART({
                shopid: this.shopId,
                category_id,
                item_id,
                food_id,
                name,
                price,
                specs,
                packing_fee,
                sku_id,
                stock
            })
            this.showChooseList()
        },
        initCategoryNum() {
            let newArr = []
            let cartFoodNum = 0
            this.totalPrice = 0
            this.cartFoodList = []
            this.categoryNum = this.menuList.map(item => {
                let fsum = _(item.foods).sumBy(f => {
                    let isum = 0
                    if (this.shopCart && this.shopCart[f.category_id] && this.shopCart[f.category_id][f.item_id]) {
                        isum = _(this.shopCart[f.category_id][f.item_id]).values().sumBy('num')
                    }
                    return isum
                })
                return fsum || 0
            })

            this.menuList.forEach((item, index) => {
                if (this.shopCart && this.shopCart[item.foods[0].category_id]) {
                    let num = 0
                    Object.keys(this.shopCart[item.foods[0].category_id]).forEach(itemid => {
                        Object.keys(this.shopCart[item.foods[0].category_id][itemid]).forEach(foodid => {
                            let foodItem = this.shopCart[item.foods[0].category_id][itemid][foodid]
                            num += foodItem.num
                            if (item.type == 1) {
                                this.totalPrice += foodItem.num * foodItem.price
                                if (foodItem.num > 0) {
                                    this.cartFoodList[cartFoodNum] = {}
                                    this.cartFoodList[cartFoodNum].category_id = item.foods[0].category_id
                                    this.cartFoodList[cartFoodNum].item_id = itemid
                                    this.cartFoodList[cartFoodNum].food_id = foodid
                                    this.cartFoodList[cartFoodNum].num = foodItem.num
                                    this.cartFoodList[cartFoodNum].price = foodItem.price
                                    this.cartFoodList[cartFoodNum].name = foodItem.name
                                    this.cartFoodList[cartFoodNum].specs = foodItem.specs
                                    cartFoodNum++
                                }
                            }
                        })
                    })
                    newArr[index] = num
                } else {
                    newArr[index] = 0
                }
            })
            this.totalPrice = this.totalPrice.toFixed(2);
        },
        async changeTagIndex(index, name) {
            this.ratingTagIndex = index
            this.ratingOffset = 0
            this.ratingTagName = name
            let res = await getRatingList(this.ratingOffset, name)
            this.ratingList = res
        },
    },
    created() {
        this.geohash = this.$route.query.geohash
        this.shopId = this.$route.query.id
        this.INIT_BUYCART()
    },
    async mounted() {

        this.showLoading = true
        let res = await msiteAddress(this.geohash);
        this.SET_LOCATION(res);
        this.shopDetailData = await shopDetails(this.shopId, this.latitude, this.longitude)
        this.menuList = await foodMenu(this.shopId)
        this.ratingList = await getRatingList(this.ratingOffset, this.ratingTagName)
        this.ratingScoresData = await ratingScores(this.shopId)
        this.ratingTagsList = await ratingTags(this.shopId)
        this.SET_SHOPDETAIL(this.shopDetailData)
        this.hideLoading()
        this.windowHeight = window.innerHeight
    },
    computed: {
        ...mapState(['latitude', 'longitude', 'cartList']),
        promotionInfo() {
            return this.shopDetailData.promotion_info || '欢迎光临，用餐高峰请提前下单'
        },
        deliveryFee() {
            return this.shopDetailData && this.shopDetailData.float_delivery_fee || null
        },
        minimumOrderAmount() {
            return this.shopDetailData && this.shopDetailData.float_minimum_order_amount - this.totalPrice
        },
        totalNum() {
            return this.cartFoodList.reduce((pre, cur) => pre + cur.num, 0)
        },
        shopCart() {
            return this.cartList[this.shopId]
        }
    },
    watch: {
        cartFoodList(value) {
            if (!value.length)
                this.showCartList = false
        },
        shopCart(value) {
            this.initCategoryNum()
        },
        showLoading(value) {
            if (!value) {
                this.$nextTick(() => {
                    this.getFoodListHeight()
                    this.initCategoryNum()
                })
            }
        }
    }
}
</script>
<style scoped>
@import 'mixin';
.shop-rating {
    flex: 1;
    overflow-y: auto;
    &-img {
        @mixin wh 3rem,
        3rem;
        margin-right: .4rem;
    }
    >header {
        display: flex;
        background-color: #fff;
        padding: .8rem .5rem;
        margin-bottom: .5rem;
        >div:nth-of-type(1) {
            text-align: center;
            padding-right: .4rem;
            border-right: 1px solid #ddd;
            >p:nth-of-type(1) {
                @mixin sc 1rem,
                #f60;
            }
            >p:nth-of-type(2) {
                @mixin sc .6rem,
                #666;
                margin-bottom: .1rem;
            }
            >p:nth-of-type(3) {
                @mixin sc 0.2rem,
                #999;
            }
        }
        >div:nth-of-type(2) {
            padding: 0 1rem;
            >p {
                /*@mixin fj flex-start;*/
                @mixin font .65rem,
                1rem;
                align-items: center;
                >span:nth-of-type(1) {
                    color: #666;
                    margin-right: .5rem;
                }
                >span:nth-of-type(2) {
                    color: #f60;
                    width: 3rem;
                    font-size: .55rem;
                }
            }
            >p:nth-of-type(1) {}
            >p:nth-of-type(2) {}
            >p:nth-of-type(3) {
                >span:nth-of-type(2) {
                    @mixin sc .4rem,
                    #999;
                }
            }
        }
    }
    >ul:nth-of-type(1) {
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        padding: .5rem;
        font-size: .65rem;
        >li {
            display: inline-block;
            padding: .2rem;
            margin: .066667rem .133333rem;
            border-radius: .133333rem;
            color: #6d7885;
            background-color: #ebf5ff;
        }
        .tagActive {
            color: #fff;
            background-color: #3190e8;
        }
    }
    >ul:nth-of-type(2) {
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        padding: .5rem;
        flex-direction: column;
        font-size: .65rem;
        >li {
            display: flex;
            padding: .6rem 0;
            border-top: 1px solid #f1f1f1;
            >img {
                @mixin wh 1.5rem,
                1.5rem;
                border: 0.025rem;
                border-radius: 50%;
                margin-right: .8rem;
            }
            >section {
                flex: 1;
                >header {
                    @mixin fj;
                    margin-bottom: .2rem;
                }
                >ul {
                    margin-top: .2rem;
                    >li {
                        display: inline-block;
                    }
                }
                >ul:nth-of-type(2) {
                    >li {
                        font-size: 0.55rem;
                        color: #999;
                        width: 2.2rem;
                        padding: .2rem;
                        border: 0.025rem solid #ebebeb;
                        border-radius: 0.15rem;
                        margin-right: .3rem;
                        margin-bottom: 4px;
                    }
                }
            }
        }
    }
}

.cart-clear {
    @mixin wh .6rem,
    .6rem;
}

.cart-minus,
.cart-add {
    @mixin wh .9rem,
    .9rem;
    fill: #3190e8;
}

.cart-food-list {
    position: fixed;
    width: 100%;
    padding-bottom: 2rem;
    z-index: 12;
    bottom: 0;
    left: 0;
    background-color: #fff;
    >header {
        display: flex;
        @mixin fj;
        padding: .3rem .6rem;
        background-color: #eceff1;
        align-items: center;
        >h4 {
            font-size: .7rem;
            color: #666;
        }
        span {
            font-size: .6rem;
            color: #666;
        }
    }
    &-detail {
        max-height: 20rem;
        overflow-y: auto;
        li {
            display: flex;
            padding: .6rem .5rem;
            align-items: center;
            @mixin fj;
            >div:first-child {
                width: 55%;
                p:nth-of-type(1) {
                    @mixin sc .7rem,
                    #666;
                    font-weight: bold;
                }
                p:nth-of-type(2) {
                    @mixin sc .4rem,
                    #666;
                }
            }
            >div:nth-of-type(2) {
                font-size: 0;
                span:first-child {
                    @mixin sc .6rem,
                    #f60;
                }
                span:nth-of-type(2) {
                    @mixin sc .7rem,
                    #f60;
                    font-weight: bold;
                }
            }
            >div:nth-of-type(3) {
                display: flex;
                align-items: center;
                span:nth-of-type(1) {
                    @mixin sc .7rem,
                    #fff;
                    min-width: 1rem;
                    text-align: center;
                }
            }
        }
    }
}

.screen-cover {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0, 0, 0, .3);
    z-index: 11;
}

.move_in_cart {
    animation: mymove .5s ease-in-out;
}

@keyframes mymove {
    0% {
        transform: scale(1)
    }
    25% {
        transform: scale(.8)
    }
    50% {
        transform: scale(1.1)
    }
    75% {
        transform: scale(.9)
    }
    100% {
        transform: scale(1)
    }
}

.sepcs_active {
    border-color: #3199e8;
    color: #3199e8;
}

.specs-list {
    position: fixed;
    top: 35%;
    left: 15%;
    width: 70%;
    background-color: #fff;
    z-index: 15;
    border: 1px;
    border-radius: .2rem;
    &-header {
        h4 {
            @mixin sc .7rem,
            #222;
            font-weight: normal;
            text-align: center;
            padding: .5rem;
        }
    }
    &-cancel {
        position: absolute;
        right: .5rem;
        top: .5rem;
    }
    &-details {
        padding: .5rem;
        &-title {
            @mixin sc .6rem,
            #666;
        }
        >ul {
            display: flex;
            flex-wrap: wrap;
            padding: .4rem 0;
            >li {
                font-size: .6rem;
                padding: .3rem .5rem;
                border: .025rem solid #ddd;
                border-radius: .2rem;
                margin-right: .5rem;
            }
        }
    }
    &-footer {
        display: flex;
        @mixin fj;
        padding: .3rem .3rem .5rem .8rem;
        background-color: #f9f9f9;
        border-radius: .2rem;
        &-price {
            >span {
                color: #ff6000;
            }
            span:first-child {
                font-size: .5rem;
            }
            span:nth-of-type(2) {
                font-size: .8rem;
                font-weight: bold;
            }
        }
        &-addtocart {
            @mixin wh 4rem,
            1.3rem;
            background-color: #3199e8;
            border: 1px;
            border-radius: .15rem;
            @mixin sc .6rem,
            #fff;
            text-align: center;
            line-height: 1.3rem;
        }
    }
}

.specs-cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 14;
}

.delete-tip {
    position: fixed;
    top: 50%;
    left: 15%;
    width: 70%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, .8);
    z-index: 15;
    @mixin sc .65rem,
    #fff;
    text-align: center;
    padding: .5rem 0;
    border: 1px;
    border-radius: .25rem;
}

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

#scrollWrapper {
    overflow-y: auto;
    background-color: #fff;
    flex: 1;
    position: relative;
}

.menu-item {
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
        &-num {
            position: absolute;
            top: .1rem;
            right: .1rem;
            background-color: #ff461d;
            min-width: .6rem;
            text-align: center;
            border-radius: 50%;
            border: .025rem solid #ff461d;
            height: .6rem;
            @mixin sc .5rem,
            #fff;
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
        position: relative;
        z-index: 0;
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

.gotopay {
    width: 5rem;
    @mixin fj center;
    align-items: center;
    position: absolute;
    right: 0;
    height: 100%;
    text-align: center;
    background-color: #535353;
    >a {
        color: #fff;
    }
    &-active {
        background-color: #4cd964;
    }
    &-btn {
        @mixin sc .7rem,
        #fff;
        font-weight: bold;
    }
}

.gotopay_active {
    background-color: #4cd964;
}

.buy-cart {
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
    &-icon-num {
        flex: 1;
    }
    &-num {
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
    &-icon {
        display: flex;
        position: absolute;
        left: .5rem;
        top: -0.7rem;
        padding: .4rem;
        border: 0.18rem solid #444;
        border-radius: 50%;
        background-color: #3d3d3f;
        &-img {
            @mixin wh 1.2rem,
            1.2rem;
        }
    }
}

.shop-container {
    position: fixed;
    display: flex;
    flex-direction: column;
    left: 0;
    right: 0;
    height: 100%;
    >div:first-child {
        position: relative;
        z-index: 1;
    }
}

.shop-header {
    z-index: 10;
    overflow: hidden;
    position: relative;
    padding-top: 1.95rem;
    &-desc-container {
        position: relative;
        z-index: 10;
        background-color: rgba(119, 103, 137, 0.43);
        padding: 0.4rem 0 0.4rem 0.4rem;
        width: 100%;
        overflow: hidden;
    }
    &-link {
        display: flex;
    }
    &-img {
        @mixin wh 3rem,
        3rem;
        margin-right: .4rem;
    }
    &-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: .5rem;
    }
    &-name {
        font-size: .8rem;
        color: #fff;
        font-weight: bold;
    }
    &-delivery {
        color: #fff;
    }
    &-notice {
        color: #fff;
        width: 11.2rem;
    }
    &-detail-link {
        @mixin vc;
        right: .3rem;
        z-index: 11;
        @mixin wh .5rem,
        .5rem;
        fill: $bc;
    }
    &-activity-link {
        @mixin wh .3rem,
        .3rem;
    }
    &-activities {
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
}

.head-top {
    background-color: rgba(119, 103, 137, 0.43);
}

.header-bgimg {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    filter: blur(10px);
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


/*.fade-tab-enter-active,
.fade-tab-leave-active {
    transition: opacity .3s;
}

.fade-tab-leave,
.fade-tab-leave-active
{
    display: none;
}

.fade-tab-enter,
.fade-tab-leave-active {
    opacity: 0;
}*/

.fade-bounce-enter-active,
.fade-bounce-leave-active {
    transition: all .3s;
}

.fade-bounce-enter,
.fade-bounce-leave-active {
    opacity: 0;
    transform: scale(.7);
}
</style>
