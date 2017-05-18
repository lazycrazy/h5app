<template>
    <div class="safe">
        <HeadTop headTitle="食品监督安全公示" :goback='true'></HeadTop>
        <section id="scrollWrapper">
            <section>
                <section class='safe-status'>
                    <header>食品监督安全公示</header>
                    <section class="safe-status-detail">
                        <div>
                            <Icon class='face' name="res-well" v-if="shopDetail.status == 1"></Icon>
                            <Icon class='face' name="res-bad" v-else></Icon>
                        </div>
                        <div class="check_date">
                            <p>
                                <span>监督检查结果：</span>
                                <span class="shop_status_well" v-if="shopDetail.status == 1">良好</span>
                                <span class="shop_status_bad" v-else>差</span>
                            </p>
                            <p>
                                <span>检查日期：</span>
                                <span>{{shopDetail.identification.identificate_date.split('T')[0]}}</span>
                            </p>
                        </div>
                    </section>
                </section>
                <section class='safe-shop-info'>
                    <header>
                        <span>工商登记信息</span>
                    </header>
                    <ul>
                        <li>
                            <p>企业名称</p>
                            <p>{{shopDetail.identification.company_name}}</p>
                        </li>
                        <li>
                            <p>工商执照注册号</p>
                            <p>{{shopDetail.identification.identificate_agency}}</p>
                        </li>
                        <li>
                            <p>注册资本</p>
                            <p>{{shopDetail.identification.registered_number}}</p>
                        </li>
                        <li>
                            <p>注册地址</p>
                            <p>{{shopDetail.identification.registered_address}}</p>
                        </li>
                        <li>
                            <p>属地监管所</p>
                            <p>{{shopDetail.identification.registered_principal}}</p>
                        </li>
                        <li>
                            <p>法定代表人</p>
                            <p>{{shopDetail.identification.legal_person}}</p>
                        </li>
                        <li>
                            <p>经营范围</p>
                            <p>{{shopDetail.identification.operation_period}}</p>
                        </li>
                    </ul>
                </section>
                <section class='safe-license'>
                    <header>餐饮许可证</header>
                    <ul>
                        <li>
                            <p>营业范围</p>
                            <p>{{shopDetail.identification.operation_period}}</p>
                        </li>
                        <li>
                            <p>许可证有效期</p>
                            <p>{{shopDetail.identification.licenses_date}}</p>
                        </li>
                        <li>
                            <p>许可证号</p>
                            <p>{{shopDetail.identification.licenses_number}}</p>
                        </li>
                        <li>
                            <p>发证时间</p>
                            <p>{{shopDetail.identification.licenses_scope}}</p>
                        </li>
                        <li>
                            <p>发证机关</p>
                            <p>{{shopDetail.identification.registered_principal}}</p>
                        </li>
                    </ul>
                </section>
                <section class='safe-license-img'>
                    <header>许可证书</header>
                    <div class="img-container">
                        <img :src="getImagePath(shopDetail.license.business_license_image)">
                        <img :src="getImagePath(shopDetail.license.catering_service_license_image)">
                    </div>
                </section>
            </section>
        </section>
    </div>
</template>
<script>
import HeadTop from 'components/header'
import Icon from 'components/icon'
import {
    getImagePath
} from 'components/mixin'
import {
    mapState
} from 'vuex'

export default {
    name: 'ShopDetailSafe',
    data() {
        return {

        }
    },
    components: {
        HeadTop,
        Icon
    },
    mixins: [getImagePath],

    computed: {
        ...mapState(['shopDetail'])
    },
}
</script>
<style scoped>
@import 'mixin';
.safe {
    z-index: 16;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0;
    padding-top: 1.95rem;
    background-color: #ebebeb;
    overflow-y: auto;
    &-status {
        background-color: #fff;
        margin-bottom: .4rem;
        >header {
            line-height: 1.8rem;
            padding: 0 .6rem;
            border-bottom: 0.025rem solid #f1f1f1;
            font-size: 0.75rem;
            color: #333;
        }
        &-detail {
            padding: .6rem;
            display: flex;
            >div:nth-of-type(2) {
                @mixin fj;
                flex-direction: column;
                span {
                    font-size: 0.55rem;
                    color: #666;
                }
            }
        }
    }
    &-shop-info,
    &-license {
        background-color: #fff;
        margin-bottom: .4rem;
        >header {
            line-height: 1.8rem;
            padding: 0 .6rem;
            border-bottom: 0.025rem solid #f1f1f1;
            font-size: 0.75rem;
            color: #333;
        }
        >ul {
            margin-left: 1rem;
            padding: .4rem 0;
            >li {
                margin-bottom: .4rem;
                p:nth-of-type(1) {
                    font-size: 0.55rem;
                    color: #333;
                }
                p:nth-of-type(2) {
                    font-size: 0.5rem;
                    color: #999;
                }
            }
        }
    }
    &-license-img {
        background-color: #fff;
        margin-bottom: .4rem;
        >header {
            line-height: 1.8rem;
            padding: 0 .6rem;
            border-bottom: 0.025rem solid #f1f1f1;
            font-size: 0.75rem;
            color: #333;
        }
        .img-container {
            background-color: #ebebeb;
            >img {
                width: 40%;
                height: auto;
                margin: .4rem;
                vertical-align: middle;
            }
        }
    }
}

.face {
    @mixin wh 2rem,
    2rem;
    margin-right: .4rem;
}
</style>
