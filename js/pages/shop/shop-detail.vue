<template>
    <div class="container">
        <HeadTop headTitle='商家详情' :goback='true'></HeadTop>
        <section class="activities">
            <header>活动与属性</header>
            <ul>
                <li v-for="item in shopDetail.activities" :key="item.id">
                    <span :style="{backgroundColor:'#'+item.icon_color}" class="activities-icon">{{item.icon_name}}</span>
                    <span>{{item.description}}(App专享)</span>
                </li>
            </ul>
            <ul>
                <li v-for="item in shopDetail.supports" :key="item.id">
                    <span :style='{backgroundColor: "#" + item.icon_color}' class="activities-icon">{{item.icon_name}}</span>
                    <span>{{item.description}}(APP专享)</span>
                </li>
            </ul>
        </section>
        <section class="safe">
            <router-link to="/shop/shopDetail/shopSafe" class="safe-head">
                <span>食品监督安全公示</span>
                <div>
                    <span>企业认证详情</span>
                    <Icon class='arrow' name="arrow-right"></Icon>
                </div>
            </router-link>
            <section class="safe-status">
                <div>
                    <Icon class='face' name="res-well" v-if="shopDetail.status == 1"></Icon>
                    <Icon class='face' name="res-bad" v-else></Icon>
                </div>
                <div>
                    <p>
                        <span>监督检查结果：</span>
                        <span v-if="shopDetail.status == 1">良好</span>
                        <span v-else>差</span>
                    </p>
                    <p>
                        <span>检查日期：</span>
                        <span>{{shopDetail.identification.identificate_date.split('T')[0]}}</span>
                    </p>
                </div>
            </section>
        </section>
        <section class="info">
            <header>商家信息</header>
            <p>{{shopDetail.name}}</p>
            <p>地址：{{shopDetail.address}}</p>
            <p>营业时间：[{{shopDetail.opening_hours[0]}}]</p>
            <p @click="showLicenseImg(shopDetail.license.business_license_image)" class="info-business-license">
                <span>营业执照</span>
                <Icon class='arrow' name="arrow-right"></Icon>
            </p>
            <p @click="showLicenseImg(shopDetail.license.catering_service_license_image)" class="info-catering-service-license">
                <span>餐饮服务许可证</span>
                <Icon class='arrow' name="arrow-right"></Icon>
            </p>
        </section>
        <transition name="fade">
            <div class="license" v-if="showlicenseImg" @click="showlicenseImg = false">
                <img :src="getImagePath(licenseImg)">
            </div>
        </transition>
        <transition name="router-slide" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import {
    mapState
} from 'vuex'
import HeadTop from 'components/header'
import Icon from 'components/icon'
import {
    getImagePath
} from 'components/mixin'

export default {
    name: 'ShopDetail',
    data() {
        return {
            showlicenseImg: false,
            licenseImg: null
        }
    },
    computed: {
        ...mapState(['shopDetail'])
    },
    components: {
        HeadTop,
        Icon
    },
    mixins: [getImagePath],
    methods: {
        showLicenseImg(img) {

            this.licenseImg = img
            this.showlicenseImg = true
        }
    }
}
</script>
<style scoped>
@import 'mixin';
.license {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 101;
    height: 100%;
    >img{
    	@mixin center;
    	width: 100%;
    }
}

.activities-icon {
    font-size: 0.45rem;
    color: #fff;
    padding: .1rem;
    border: 1px;
    border-radius: 0.1rem;
    margin-right: .2rem;
}

.activities {
    margin-bottom: .4rem;
    background-color: #fff;
    padding: 0 .4rem .4rem;
    color: #666;
    >header {
        margin: 0 -.4rem;
        padding: .213333rem .4rem;
        border-bottom: 1px solid #eee;
        color: #333;
        font-weight: 400;
        @mixin font .75rem,
        1.8rem;
    }
    >ul {
        padding: .3rem .6rem;
        font-size: .55rem;
        >li {
            margin-bottom: .2rem;
        }
    }
}

.safe {
    margin-bottom: .4rem;
    background-color: #fff;
    padding: 0 .4rem .4rem;
    color: #666;
    &-head {
        @mixin fj;
        margin: 0 -.4rem;
        padding: .213333rem .4rem;
        border-bottom: 1px solid #eee;
        color: #333;
        font-weight: 400;
        @mixin font .75rem,
        1.8rem;
        >div {
            display: flex;
            align-items: center;
            >span {
                font-size: 0.7rem;
                color: #bbb;
                vertical-align: middle;
            }
            >svg {
                fill: #bbb;
            }
        }
    }
    &-status {
        display: flex;
        padding: .3rem 0;
    }
}

.info {
    margin-bottom: .4rem;
    background-color: #fff;
    padding: 0 .4rem .4rem;
    color: #666;
    >header {
        margin: 0 -.4rem;
        padding: .213333rem .4rem;
        border-bottom: 1px solid #eee;
        color: #333;
        font-weight: 400;
        @mixin font .75rem,
        1.8rem;
    }
    >p {
        border-bottom: 1px solid #f5f5f5;
        padding: .6rem .6rem .6rem 0;
    }
    &-catering-service-license,
    &-business-license {
        @mixin fj;
        >svg {
            fill: #bbb;
        }
    }
}

.container {
    z-index: 15;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 1.95rem;
    background-color: #ebebeb;
    font-size: .65rem;
    overflow-y: auto;
}

.arrow {
    @mixin wh .6rem,
    .6rem;
}

.face {
    @mixin wh 2rem,
    2rem;
    margin-right: .4rem;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
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
