<template>
    <div class="search-address-page">
        <section>
            <head-top headTitle="搜索" :goback='true'></head-top>
            <form class="search_form">
                <input type="search" name="search" placeholder="请输入小区/写字楼/学校等" v-model="searchValue">
                <button @click.prevent="searchPlace">搜索</button>
            </form>
            <ul class="address_list" v-if="searchData">
                <li v-for="(item, index) in searchData" :key="index" @click="choooedAddress(item)">
                    <h4>{{item.name}}</h4>
                    <p>{{item.address}}</p>
                </li>
            </ul>
            <div v-else class="empty_tips">
                <p>找不到地址？</p>
                <p>尝试输入小区、写字楼或学校名</p>
                <p>详细地址（如门牌号等）可稍后输入哦</p>
            </div>
        </section>
    </div>
</template>
<script>
import HeadTop from 'components/header'
import {
    searchNearby
} from 'src/service'
import {
    mapMutations
} from 'vuex'

export default {
    name: 'SearchAddress',
    data() {
        return {
            searchValue: null,
            searchData: null,
        }
    },
    components: {
        HeadTop,
    },
    methods: {
        ...mapMutations([
            'CHOOSE_SEARCH_ADDRESS'
        ]),
        async searchPlace() {
            if (this.searchValue) {
                this.searchData = await searchNearby(this.searchValue)
            }
        },
        choooedAddress(item) {
            this.CHOOSE_SEARCH_ADDRESS(item)
            this.$router.go(-1)
        },

    }
}
</script>
<style scoped>
@import 'mixin';
.search-address-page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 204;
    overflow-y: auto;
    padding-top: 1.95rem;
    p,
    span {
        font-family: Helvetica Neue, Tahoma, Arial;
    }
}

.search_form {
    display: flex;
    padding: .7rem;
    input {
        @mixin sc .65rem,
        #999;
        flex: 4;
        background-color: #f1f1f1;
        margin-right: .6rem;
        height: 1.5rem;
        border-radius: 0.15rem;
        padding: 0 .4rem;
    }
    button {
        flex: 1;
        @mixin sc .65rem,
        #fff;
        background-color: $blue;
        border-radius: 0.15rem;
    }
}

.address_list {
    padding: .7rem;
    li {
        padding: .7rem 0;
        border-bottom: 0.025rem solid #f5f5f5;
        line-height: 1rem;
        h4 {
            @mixin sc .75rem,
            #555;
        }
        p {
            @mixin sc .65rem,
            #999;
        }
    }
}

.empty_tips {
    @mixin center;
    width: 100%;
    p {
        @mixin sc .5rem,
        #aaa;
        line-height: .7rem;
        text-align: center;
    }
}
</style>
