<template>
    <div class="invoice-page">
        <head-top head-title="选择发票抬头" :goback='true'></head-top>
        <section class="choose_invoice">
            <span>不需要开发票</span>
            <svg @click="chooseInvoice" :class="{choosed: needInvoice}">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
            </svg>
        </section>
        <div class="determine" @click="confrimInvoice">确定</div>
    </div>
</template>
<script>
import HeadTop from 'components/header'
import {
    mapMutations,
    mapState
} from 'vuex'

export default {
    name: 'Invoice',
    data() {
        return {
            needInvoice: false,
        }
    },
    components: {
        HeadTop,
    },
    computed: {
        ...mapState(['invoice'])
    },
    mounted() {
        this.needInvoice = this.invoice
    },
    methods: {
        ...mapMutations([
            'CONFIRM_INVOICE'
        ]),
        chooseInvoice() {
            this.needInvoice = !this.needInvoice
        },
        confrimInvoice() {
            this.CONFIRM_INVOICE(this.needInvoice)
            this.$router.go(-1)
        },
    }
}
</script>
<style scoped>
@import 'mixin';
.invoice-page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 204;
    padding-top: 1.95rem;
    p,
    span {
        font-family: Helvetica Neue, Tahoma, Arial;
    }
}

.choose_invoice {
    @mixin fj;
    align-items: center;
    background-color: #fff;
    line-height: 2.5rem;
    margin-top: 0.5rem;
    padding: 0 .7rem;
    span {
        @mixin sc .75rem,
        #333;
    }
    svg {
        @mixin wh .8rem,
        .8rem;
        fill: #999;
    }
    .choosed {
        fill: #4cd964;
    }
}

.determine {
    background-color: #4cd964;
    @mixin sc .7rem,
    #fff;
    text-align: center;
    margin: 0 .7rem;
    line-height: 1.8rem;
    border-radius: 0.2rem;
    margin-top: 0.5rem;
}
</style>
