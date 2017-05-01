<template>
    <div class='container'>
        <div class='header'>
            <headTop :headTitle='headTitle' :goback='true'></headTop>
            <aside class='sort-container'>
                <div class='sort-title'>
                    <a @click="chooseType('food')" class='title-item' :class="{choose_type:sortBy==='food'}">
                        <span :class="{category_title:sortBy === 'food'}">{{foodTitle}}</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                            <polygon points="0,3 10,3 5,8" />
                        </svg>
                    </a>
                    <a @click="chooseType('sort')" class='title-item' :class="{choose_type:sortBy === 'sort'}">
                        <span :class="{category_title:sortBy === 'sort'}">排序</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                            <polygon points="0,3 10,3 5,8" />
                        </svg>
                    </a>
                    <a @click="chooseType('activity')" class='title-item' :class="{choose_type:sortBy === 'activity'}">
                        <span :class="{category_title:sortBy === 'activity'}">筛选</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                            <polygon points="0,3 10,3 5,8" />
                        </svg>
                    </a>
                </div>
                <transition name='showlist'>
                    <section class='sort-panel' key='food' v-show="sortBy==='food'" :class="{choose_type:sortBy === 'food'}">
                        <div class='category-container'>
                            <div class='category-left'>
                                <ul>
                                    <li class='category-left-li' :class="{category_active:restaurant_category_id == item.id}" v-for='(item,index) of category' :key='index'>
                                        <div>
                                            <img :src="getImagePath(item.image_url)" v-if='index' class="category-icon">
                                            <span class='category-name'>{{item.name}}</span>
                                        </div>
                                        <div>
                                            <span class='category-count'>{{item.count}}</span>
                                            <svg v-if="index" width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1" class="category-arrow">
                                                <path d="M0 0 L6 4 L0 8" stroke="#bbb" stroke-width="1" fill="none" />
                                            </svg>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class='category-right'>
                                <ul>
                                    <li class='category-detail-li' :class="{category_detail_choosed: restaurant_category_ids == item.id || (!restaurant_category_ids)&&index == 0}" v-for='(item,index) of categoryDetail' :key='item.id'>
                                        <span>{{item.name}}</span>
                                        <span>{{item.count}}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </transition>
                <transition name='showlist'>
                    <section class='sort-panel' key='sort' v-show="sortBy==='sort'" :class="{choose_type:sortBy === 'sort'}">
                        <ul class="sort-list-container" @click="sortList($event)">
                            <li class="sort-list-li" v-for="item of [{idx:0,name:'default',desc:'智能排序'},{idx:5,name:'distance',desc:'距离最近'},{idx:6,name:'hot',desc:'销量最高'},{idx:1,name:'price',desc:'起送价最低'},{idx:2,name:'speed',desc:'配送速度最快'},{idx:3,name:'rating',desc:'评分最高'}]">
                                <Icon :name='item.name'></Icon>
                                <p data="0" :class="{sort_select: sortByType == item.idx}">
                                    <span>{{item.desc}}</span>
                                    <Icon name='selected' v-if="sortByType == item.idx"></Icon>
                                </p>
                            </li>
                        </ul>
                    </section>
                </transition>
                <transition name='showlist'>
                    <section class='sort-panel' key='activity' v-show="sortBy==='activity'" :class="{choose_type:sortBy === 'activity'}">
                        <section class='delivery-type' style="100%">
                            <span>配送方式</span>
                            <ul class='delivery-items'>
                                <li v-for="item in delivery" :key="item.id" class="filter_li" @click="selectDeliveryMode(item.id)">
                                    <Icon class='delivery-icon' :style="{opacity: (item.id == 0)&&(delivery_mode !== 0)? 0: 1}" :name="delivery_mode == item.id? 'selected':'fengniao'"></Icon>
                                    <span :class="{selected_filter: delivery_mode == item.id}">{{item.text}}</span>
                                </li>
                            </ul>
                        </section>
                        <section class='activity-type' style="100%">
                            <span>商家属性（可以多选）</span>
                            <ul class='activity-items'>
                                <li v-for="(item,index) of activity" :key='item.id' @click='selectSupportIds(index,item.id)'>
                                    <Icon name='selected' v-show="support_activity_ids[index].status"></Icon>
                                    <span class="activity-icon" :style="{color: '#' + item.icon_color, borderColor: '#' + item.icon_color}" v-show="!support_activity_ids[index].status">{{item.icon_name}}</span>
                                    <span :class="{selected_filter: support_activity_ids[index].status}">{{item.name}}</span>
                                </li>
                            </ul>
                        </section>
                        <footer class='filter-btns'>
                            <div class="clear-all filter-button" @click="clearAll">清空</div>
                            <div class="confirm_select filter-button" @click="confirmSelect">确定<span v-show="filterNum">({{filterNum}})</span></div>
                        </footer>
                    </section>
                </transition>
            </aside>
        </div>
        <transition name='showcover'>
            <div class='back-cover' v-show='sortBy' @click="sortBy=''"></div>
        </transition>
        <section class='shop-list-container'>
            <ShopList :geohash='geohash'></ShopList>
        </section>
    </div>
</template>
<script>
import HeadTop from 'components/header'
import ShopList from 'components/shoplist'
import Icon from 'components/icon'
import {
    mapState,
    mapMutations
} from 'vuex'
import {
    getImagePath
} from 'components/mixin'
import {
    msiteAddress,
    foodCategory,
    foodDelivery,
    foodActivity
} from 'src/service'
import {
    SET_GEOHASH,
    SET_LOCATION
} from 'src/store/mutation-types'
import _ from 'lodash'

export default {
    name: 'Food',
    data() {
        return {
            headTitle: '',
            sortBy: '',
            foodTitle: '',
            restaurant_category_id: '',
            category_detail_choosed: '',
            category: null,
            categoryDetail: null,
            delivery: null,
            activity: null,
            support_activity_ids: [],
            sortByType: null,
            filterNum: 0,
            confirmStatus: false,
        }
    },
    components: {
        HeadTop,
        ShopList,
        Icon
    },
    computed: {
        ...mapState(['geohash', 'latitude', 'longitude']),
    },
    mixins: [getImagePath],
    methods: {
        ...mapMutations([SET_GEOHASH, SET_LOCATION]),
        async chooseType(type) {
            if (this.sortBy !== type) {
                this.sortBy = type
                this.foodTitle = type == 'food' ? "分类" : this.headTitle

            } else {
                this.sortBy = ''
                if (type == 'food')
                    this.foodTitle = this.headTitle
            }
        },
        clearAll() {

        },
        confirmSelect() {

        },
        sortList() {

        },
        selectSupportIds() {

        },
        selectDeliveryMode() {

        }
    },
    async created() {

        this.foodTitle = this.headTitle = this.$route.query.title
        this.restaurant_category_id = this.$route.query.restaurant_category_id
        if (!this.geohash) {
            let geohash = this.$route.query.geohash
            this.SET_GEOHASH(geohash)
            let loc = await msiteAddress(geohash)
            this.SET_LOCATION(loc)
        }
        this.category = await foodCategory(this.latitude, this.longitude)
        let categoryid = _(this.category).find(['id', this.restaurant_category_id])
        if (categoryid)
            this.categoryDetail = categoryid.sub_categories
        this.delivery = await foodDelivery(this.latitude, this.longitude)
        this.activity = await foodActivity(this.latitude, this.longitude)
        for (let [idx, item] of this.activity.entries()) {
            this.support_activity_ids[idx] = {
                id: item.id,
                status: false
            }
        }

    }
}
</script>
<style scoped>
@import 'mixin';
.header {
    padding-top: 1.3rem;
    /* position: sticky;
    top: 0px;
    z-index: 1000;*/
    .sort-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        margin-top: 2rem;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        height: 1.5rem;
        line-height: 1.04rem;
        z-index: 3;
        .sort-title {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
            display: flex;
            background-color: #fff;
            align-items: center;
            z-index: 4;
            .title-item {
                flex: 1;
                text-align: center;
                color: #666;
                position: relative;
                font-size: .6rem;
                .sort_icon {
                    width: .4rem;
                    height: .3rem;
                    margin-bottom: .053333rem;
                    fill: #999;
                    will-change: transform;
                    transition: all .3s;
                }
            }
            .choose_type {
                .category_title {
                    color: $blue;
                }
                .sort_icon {
                    transform: rotate(180deg);
                    fill: $blue;
                }
            }
            a::after {
                content: "";
                background: #ddd;
                width: 1px;
                height: 1rem;
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
            }
        }
        .sort-panel {
            position: absolute;
            width: 100%;
            top: 1.4rem;
            left: 0;
            border-top: 0.025rem solid #e4e4e4;
            background-color: #fff;
        }
    }
}

.category-container {
    display: flex;
}

.category-left {
    flex: 1;
    background-color: #f1f1f1;
    height: 16rem;
    overflow-y: auto;
}

.category_active {
    background-color: #fff;
}

.category-left-li {
    padding: 0 0.5rem;
    @mixin fj;
}

.category-icon {
    @mixin wh .8rem,
    .8rem;
    vertical-align: middle;
    margin-right: .2rem;
}

.category-name {
    @mixin sc .5rem,
    #666;
    line-height: 1.8rem;
}

.category-count {
    background-color: #ccc;
    @mixin sc .4rem,
    #fff;
    padding: 0 .1rem;
    border: 0.025rem solid #ccc;
    border-radius: 0.8rem;
    vertical-align: middle;
    margin-right: 0.25rem;
}

.category-arrow {}

.category-right {
    flex: 1;
    background-color: #fff;
    padding-left: 0.5rem;
    height: 16rem;
    overflow-y: auto;
}

.category-detail-li {
    display: flex;
    @mixin fj;
    height: 1.8rem;
    line-height: 1.8rem;
    padding-right: 0.6rem;
    border-bottom: 0.025rem solid #e4e4e4;
    font-size: .6rem;
}

.category_detail_choosed>span {
    color: $blue;
}

.sort-list-li {
    height: 2.5rem;
    display: flex;
    @mixin fj;
    align-items: center;
    >svg {
        @mixin wh .8rem,
        .8rem;
        margin: 0 .3rem 0 .8rem;
    }
    >p {
        flex: auto;
        line-height: 2.5rem;
        text-indent: .25rem;
        border-bottom: .025rem solid #e4e4e4;
        align-items: center;
        font-size: .6rem;
    }
}

.delivery-type,
.activity-type {
    >span {
        @mixin sc .4rem,
        #333;
        @mixin font .4rem,
        1.5rem;
        height: 1.5rem;
        padding-left: .5rem;
    }
}

.delivery-items,
.activity-items {
    display: flex;
    flex-wrap: wrap;
    >li {
        display: flex;
        align-items: center;
        border: .025rem solid #eee;
        @mixin wh 4.7rem,
        1.4rem;
        border-radius: .125rem;
        padding: 0 .25rem;
        margin-right: .25rem;
        margin-bottom: .25rem;
        >span {
            @mixin sc .4rem,
            #333;
        }
    }
}

.activity-icon,
.delivery-icon {
    @mixin wh .8rem,
    .8rem;
    font-size: .5rem;
    line-height: .8rem;
    border: .025rem solid #e4e4e4;
    border-radius: .5rem;
    text-align: center;
    margin-right: .2rem;
}

.filter-btns {
    display: flex;
    background-color: #f1f1f1;
    padding: .5rem .2rem;
    width: 100%;
    @mixin fj;
    align-items: center;
}

.filter-button {
    flex: 1;
    text-align: center;
    border-radius: .2rem;
    margin: 0 .4rem;
    font-size: .8rem;
}

.clear-all {
    background-color: #fff;
    border: .2rem solid #fff;
}

.confirm_select {
    color: #fff;
    background-color: #56d176;
    border: .2rem solid #56d176;
}

.showlist-enter-active,
.showlist-leave-active {
    transition: all .3s;
    transform: translateY(0);
}

.showlist-enter,
.showlist-leave-active {
    opacity: 0;
    transform: translateY(-100%);
}

.showcover-enter-active,
.showcover-leave-active {
    transition: opacity 3.3s
}

.showcover-enter,
.showcover-leave-active {
    opacity: 0
}

.back-cover {
    position: fixed;
    @mixin wh 100%,
    100%;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.3);
}
</style>
