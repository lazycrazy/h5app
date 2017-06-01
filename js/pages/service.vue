<template>
    <div class="service-page">
        <head-top head-title="服务中心" :goback='true'></head-top>
        <section class="service_connect">
            <a href="https://ecs-im.ele.me/" class="service_left">
                <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#human"></use>
                </svg>
                <span>在线客服</span>
            </a>
            <a href="tel:10105757" class="service_right">
                <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#phone"></use>
                </svg>
                <span>在线客服</span>
            </a>
        </section>
        <section class="hot_questions" v-if="serviceData">
            <h4 class="qustion_header">热门问题</h4>
            <ul>
                <li v-for="(item, index) in questionTitle" :key="index" class="question_title" @click="toQuestionDetail(item, index)">
                    <span>{{item}}</span>
                    <svg class="arrow-svg" fill="#999">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </li>
            </ul>
        </section>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import HeadTop from 'components/header'
import {
    getService
} from 'src/service'
import {
    mapMutations
} from 'vuex'

export default {
    data() {
            return {
                serviceData: null, //服务信息
                questionTitle: [], //问题标题
                questionDetail: [], //问题详情
            }
        },

        mounted() {
            this.initData();
        },
        mixins: [],
        components: {
            HeadTop,
        },
        props: [],
        methods: {
            ...mapMutations([
                'SAVE_QUESTION'
            ]),
            //获取信息
            async initData() {
                this.serviceData = await getService();
                Object.keys(this.serviceData).forEach(item => {
                    let avoidRepeat = false
                    this.questionTitle.forEach((insertItem) => {
                            //防止重复的数据，后台返回的数据有些是重复的
                            if (insertItem == this.serviceData[item]) {
                                avoidRepeat = true
                            }
                        })
                        //将标题和内容分别放进数组中
                    if (item.indexOf('Caption') !== -1 && !avoidRepeat) {
                        this.questionTitle.push(this.serviceData[item])
                    } else if (!avoidRepeat) {
                        this.questionDetail.push(this.serviceData[item])
                    }
                })
            },
            //保存问题详情
            toQuestionDetail(title, index) {
                this.SAVE_QUESTION({
                    title,
                    detail: this.questionDetail[index]
                })
                this.$router.push('/service/Q2A')
            },
        }
}
</script>
<style scoped>
@import 'mixin';
.service-page {
    background-color: #fff;
    padding-top: 1.95rem;
    p,
    span {
        font-family: Helvetica Neue, Tahoma, Arial;
    }
}

.service_connect {
    @mixin fj;
    a {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 4rem;
        border-bottom: 1px solid #f5f5f5;
        svg {
            @mixin wh 1rem,
            1rem;
        }
        span {
            margin-top: .4rem;
            @mixin sc .6rem,
            #666;
        }
    }
    .service_left {
        border-right: 1px solid #f5f5f5;
    }
}

.hot_questions {
    .qustion_header {
        @mixin sc .75rem,
        #333;
        line-height: 3rem;
        border-bottom: 1px solid #f5f5f5;
        padding-left: .7rem;
    }
    .question_title {
        padding: 0 .7rem;
        line-height: 2rem;
        border-bottom: 1px solid #f5f5f5;
        @mixin fj;
        align-items: center;
        span {
            @mixin sc .6rem,
            #666;
        }
        svg {
            @mixin wh .6rem,
            .6rem;
        }
    }
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
