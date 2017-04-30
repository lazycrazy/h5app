<template>
    <div class='city-container'>
        <HeadTop :headTitle='cityname' :goback='true'>
            <router-link to="/home" slot='changeCity' class='change-city'>切换城市</router-link>
        </HeadTop>
        <form class='search-form' @submit.prevent>
            <input type="search" name='city' v-model="searchValue" class='search-value' placeholder="输入学校、商务楼、地址" required/>
            <input type='submit' name='submit' @click='postpois' class='search-submit' value='提交' />
        </form>
        <header v-if='!searchValue' class='history-title'>搜索历史</header>
        <ul class='placelist'>
            <li class='placeitem' v-for="(item,index) of placelist" :key='index' @click='nextpage(index, item.geohash)'>
                <h4 class='placename'>{{item.name}}</h4>
                <p class='placeaddr'>{{item.address}}</p>
            </li>
        </ul>
        <div v-if='placeNone' class='search-none'>无搜索结果</div>
    </div>
</template>
<script>
import HeadTop from 'components/header'
import {
    currentcity,
    searchplace,
    setStorage,
    getStorage
} from 'src/service'
import _ from 'lodash'

export default {
    name: 'City',
    data() {
        return {
            cityid: '',
            cityname: '',
            searchValue: '',
            placelist: [],
            placeHistory: [],
            placeNone: false,
        }
    },
    components: {
        HeadTop
    },
    methods: {
        postpois(e) {
            if (this.searchValue)
                searchplace(this.cityid, this.searchValue).then(r => {
                    this.placelist = r
                    this.placeNone = !this.placelist.length
                })
        },
        nextpage(index, geohash) {
            if (!_(this.placeHistory).some(p => p.geohash === geohash)) {
                this.placeHistory.push(this.placelist[index])
                setStorage('placeHistory', this.placeHistory)
            }
            this.$router.push({
                path: '/msite',
                query: {
                    geohash
                }
            })
        }
    },
    mounted() {
        this.cityid = this.$route.params.id
        currentcity(this.cityid).then(c => this.cityname = c.name)
        let history = getStorage('placeHistory')
        if (history)
            this.placelist = this.placeHistory = history
    },
    watch: {
        searchValue() {
            if (!this.searchValue) {
                this.placelist = this.placeHistory
                this.placeNone = false
            }
        }
    }
}
</script>
<style scoped>
@import 'mixin.css';
.city-container {
    padding-top: 2.35rem;
}

.change-city {
    position: absolute;
    right: 0.4rem;
    @mixin sc 0.6rem,
    #fff;
    @mixin vc;
}

.search-form {
    display: flex;
    background-color: #fff;
    border-top: 1px solid $bc;
    border-bottom: 1px solid $bc;
    padding: 0.4rem 0.2rem;
    input {
        height: 1.5rem;
    }
    .search-value {
        border: 1px solid $bc;
        flex: 4;
        /*@mixin wh 60%,1.4rem;*/
        padding: 0 0.3rem;
        border-radius: 0.1rem;
    }
    .search-submit {
        flex: 1;
        /*@mixin wh 30%,1.4rem;*/
        background-color: $blue;
        @mixin sc 0.65rem,
        #fff;
        border-radius: 0.125rem;
        margin-left: 0.2rem;
    }
}

.history-title {
    border-top: 1px solid $bc;
    border-bottom: 1px solid $bc;
    padding-left: 0.5rem;
    @mixin font 0.475rem,
    0.8rem;
}

.placelist {
    background-color: #fff;
    border-top: 1px solid $bc;
    li {
        margin: 0 auto;
        padding-top: 0.65rem;
        border-bottom: 1px solid $bc;
        .placename {
            margin: 0 auto 0.35rem;
            width: 90%;
            @mixin sc 0.65rem,
            #333;
        }
        .placeaddr {
            width: 90%;
            margin: 0 auto 0.55rem;
            @mixin sc 0.45rem,
            #999;
        }
    }
}

.search-none {
    margin: 0 auto;
    @mixin font 0.65rem,
    1.75rem;
    color: #333;
    background-color: #fff;
    text-indent: 0.5rem;
}
</style>
