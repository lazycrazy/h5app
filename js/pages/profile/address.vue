<template>
    <div class="addresses-page">
        <head-top head-title="编辑地址" :goback='true'>
            <span slot="edit" class="edit" @click="editThing">{{editText}}</span>
        </head-top>
        <section class="address">
            <ul class="addresslist">
                <li v-for="(item,index) in addresses">
                    <div>
                        <p>{{item.address}}</p>
                        <p><span>{{item.phone}}</span><span v-if="item.phonepk">、{{item.phonepk}}</span></p>
                    </div>
                    <div class="deletesite" v-if="deletesite">
                        <span @click="deleteSite(index, item)">x</span>
                    </div>
                </li>
            </ul>
            <router-link to='/profile/userInfo/address/add'>
                <div class="addsite">
                    <span>新增地址</span>
                    <span class="addsvg">
                            <svg fill="#d8d8d8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                </div>
            </router-link>
        </section>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import HeadTop from 'components/header'
import {
    getImagePath
} from 'components/mixin'
import {
    mapState,
    mapActions,
} from 'vuex'
import {
    getAddressList,
    deleteAddress
} from 'src/service'

export default {
    data() {
            return {
                deletesite: false, //是否编辑状态
                editText: '编辑', 
            }
        },
        mounted() {
            this.initData();
        },
        mixins: [getImagePath],
        mounted() {

        },
        components: {
            HeadTop,
        },
        computed: {
            ...mapState([
                'userInfo', 'addresses'
            ]),

        },
        props: [],
        methods: {
            ...mapActions([
                'saveAddress'
            ]),
            //初始化信息
            initData() {
                if (this.userInfo && this.userInfo.user_id) {
                    this.saveAddress();
                }
            },
            //编辑
            editThing() {
                if (this.editText == '编辑') {
                    this.editText = '完成';
                    this.deletesite = true;
                } else {
                    this.editText = '编辑';
                    this.deletesite = false;
                }
            },
            //删除地址
            async deleteSite(index, item) {
                if (this.userInfo && this.userInfo.user_id) {
                    await deleteAddress(this.userInfo.user_id, item.id);
                    this.addresses.splice(index, 1);
                }
            }
        },
        watch: {
            userInfo: function(value) {
                if (value && value.user_id) {
                    this.initData();
                }
            }
        }
}
</script>
<style scoped>
@import 'mixin';
.addresses-page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f2f2f2;
    z-index: 202;
    padding-top: 1.95rem;
    p,
    span {
        font-family: Helvetica Neue, Tahoma, Arial;
    }
}

.edit {
    right: 0.4rem;
    @mixin sc 0.7rem,
    #fff;
    @mixin vc;
}

.address {
    width: 100%;
    margin-top: .4rem;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
    .addresslist {
        background: #fff;
        li {
            border-bottom: 1px solid #d9d9d9;
            padding: .4rem;
            @mixin fj;
            p {
                line-height: .9rem;
                @mixin sc .6rem,
                #333;
                span {
                    display: inline-block;
                    @mixin sc .6rem,
                    #333;
                }
            }
            .deletesite {
                display: flex;
                align-items: center;
                span {
                    display: block;
                    @mixin sc .8rem,
                    #999;
                }
            }
        }
        li:nth-of-type(1) {
            background: #FFF8C3;
        }
    }
    .addsite {
        margin-top: .4rem;
        background: #fff;
        padding: .2rem .4rem;
        border-top: 1px solid #d9d9d9;
        @mixin fj;
        span {
            display: block;
            @mixin sc .7rem,
            #333;
            line-height: 1.4rem;
        }
        .addsvg {
            @mixin wh .66667rem,
            1.4rem;
            svg {
                @mixin wh 100%,
                100%;
            }
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
