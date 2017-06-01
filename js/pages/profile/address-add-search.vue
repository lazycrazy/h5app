<template>
    <div class="address-search-page">
        <head-top head-title="搜索地址" :goback='true'></head-top>
        <section>
            <div class="add-detail">
                <input type="text" placeholder="请输入小区/写字楼/学校等" v-model="inputAdress" @input="inputThing">
                <button @click="inputThing">确认</button>
            </div>
            <div class="warnpart">为了满足商家的送餐要求，建议您从列表中选择地址</div>
            <div class="point" v-show="warning">
                <p>找不到地址？</p>
                <p>请尝试输入小区、写字楼或学校名</p>
                <p>详细地址（如门牌号）可稍后输入哦。</p>
            </div>
        </section>
        <section class="poisearch-container" v-show="adressList">
            <ul>
                <li v-for="(item, index) in adressList" @click="listClick(index)">
                    <p>{{item.name}}</p>
                    <p>{{item.address}}</p>
                </li>
            </ul>
        </section>
    </div>
</template>
<script>
import HeadTop from 'components/header'
import {
    getImagePath
} from 'components/mixin'
import {
    getSearchAddress
} from 'src/service'
import {
    mapMutations,
    mapState
} from 'vuex'
export default {
    data() {
            return {
                warning: true,
                inputAdress: '',
                adressList: [], //地址列表
            }
        },
        created() {
            this.inputAdress = this.addAddress ? this.addAddress : this.inputAdress

        },
        mounted() {

            getSearchAddress(this.inputAdress).then(res => {
                this.adressList = res
                this.warning = true
                if (this.adressList.length > 0) {
                    this.warning = false
                    if (this.inputAdress == '') {
                        this.adressList = []
                        this.warning = true
                    }
                }
            });

        },
        mixins: [getImagePath],
        components: {
            HeadTop,
        },
        computed: {
            ...mapState([
                'searchAddress'
            ])
        },
        props: [],
        methods: {
            ...mapMutations([
                'CHOOSE_SEARCH_ADDRESS'
            ]),
            //搜索地址
            inputThing() {
                getSearchAddress(this.inputAdress).then(res => {
                    this.adressList = res
                    this.warning = true
                    if (this.adressList.length > 0) {
                        this.warning = false
                        if (this.inputAdress == '') {
                            this.adressList = []
                            this.warning = true
                        }
                    }
                });
            },
            //选择地址
            listClick(index) {
                this.CHOOSE_SEARCH_ADDRESS(this.adressList[index].name)
                this.$router.go(-1)
            }
        }
}
</script>
<style scoped>
@import 'mixin';
.address-search-page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f2f2f2;
    z-index: 205;
    padding-top: 1.95rem;
    p,
    span {
        font-family: Helvetica Neue, Tahoma, Arial;
    }
}

.add-detail {
    @mixin fj;
    background: #fff;
    padding: .5rem;
    input {
        display: block;
        width: 11.8rem;
        padding: .4rem;
        background: #f2f2f2;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: .6rem;
    }
    button {
        display: block;
        width: 3rem;
        background: #3199e8;
        @mixin sc .7rem,
        #fff;
        border-radius: 5px;
    }
}

.warnpart {
    background: #FFF6E4;
    @mixin sc .62rem,
    #FF883F;
    text-align: center;
    padding: .2rem 0;
}

.point {
    @mixin center;
    width: 100%;
    p {
        width: 100%;
        text-align: center;
        @mixin sc .7rem,
        #969696;
        margin-bottom: .4rem;
    }
}

.poisearch-container {
    background: #f2f2f2;
    li {
        border-bottom: 1px solid #ccc;
        padding: .4rem;
        p {
            @mixin sc .65rem,
            #969696;
        }
        p:first-child {
            margin-bottom: .2rem;
        }
    }
    li:last-child {
        border: 0;
    }
}
</style>
