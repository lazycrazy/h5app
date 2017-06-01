<template>
    <div class="Q2A-page">
        <head-top :head-title="question.title" :goback='true'></head-top>
        <section id="scroll_section" class="scroll_container">
            <section v-html="markdownText" class="markdown"> </section>
        </section>
    </div>
</template>
<script>
import HeadTop from 'components/header'
import {
    mapState,
    mapMutations
} from 'vuex'
// import showdown from 'showdown'
import marked from 'marked'
import BScroll from 'better-scroll'

export default {
    data() {
            return {

            }
        },
        components: {
            HeadTop,
        },
        mounted() {
            this.$nextTick(() => {
                new BScroll('#scroll_section', {
                    deceleration: 0.001,
                    bounce: true,
                    swipeTime: 1800,
                    click: true,
                })
            })
        },
        computed: {
            ...mapState([
                'question',
            ]),
            markdownText: function() {
                //转换markDown格式
                return marked(this.question.detail)
            }
        },
        methods: {

        }
}
</script>
<style  >
@import 'mixin';
.Q2A-page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 202;
    padding-top: 1.95rem;
    p,
    span {
        font-family: Helvetica Neue, Tahoma, Arial;
    }
}

.scroll_container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 1.95rem;
    overflow-y: auto;
}

.markdown {
    font-size: .65rem;
    padding: 0 .7rem;
    color: #666;
    padding-bottom: 2rem;
    overflow-y:auto; 
    p {
        margin: .7em 0;
        line-height: 1.4;
    }
    img{
        width: 100%;
    }
}
</style>
