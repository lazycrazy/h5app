<template>
    <div class='cart-module'>
        <div v-if='!foods.specifications.length' class='wrapper'>
            <transition name="show-reduce">
                <span @click="removeOutCart(foods.category_id, foods.item_id, foods.specfoods[0].food_id, foods.specfoods[0].name, foods.specfoods[0].price, '', foods.specfoods[0].packing_fee, foods.specfoods[0].sku_id, foods.specfoods[0].stock)" v-if="foodCount">
                    <Icon name='cart-minus'></Icon>
                </span>
            </transition>
            <transition name="fade">
                <span class="count" v-if="foodCount">{{foodCount}}</span>
            </transition>
            <Icon name='cart-add' class="add-icon" @touchstart.native="addToCart(foods.category_id, 
            foods.item_id, foods.specfoods[0].food_id, foods.specfoods[0].name,
             foods.specfoods[0].price, '', foods.specfoods[0].packing_fee,
              foods.specfoods[0].sku_id, foods.specfoods[0].stock, $event)"></Icon>
        </div>
        <div v-else class='wrapper'>
            <transition name="show-reduce">
                <Icon class="specs-reduce-icon" v-if="foodCount" @click.native="showReduceTip" name='cart-minus'></Icon>
            </transition>
            <transition name="fade">
                <span class="count" v-if="foodCount">{{foodCount}}</span>
            </transition>
            <span class="choose-list" @click="showChooseList(foods)">选规格</span>
        </div>
    </div>
</template>
<script>
import {
    mapState,
    mapMutations
} from 'vuex'
import Icon from './icon'
import {
    ADD_CART,
    REDUCE_CART
} from 'src/store/mutation-types'

export default {
    name: 'BuyCart',
    components: {
        Icon
    },
    data() {
        return {

        }
    },
    props: ['shopId', 'foods'],
    computed: {
        ...mapState(['cartList']),
        shopCart() {
            return this.cartList[this.shopId]
        },
        foodCount() {
            let category_id = this.foods.category_id
            let item_id = this.foods.item_id
            let num = 0
            if (this.shopCart && this.shopCart[category_id] && this.shopCart[category_id][item_id]) {
                num = Object.values(this.shopCart[category_id][item_id]).reduce((pre, cur) => pre + cur.num, 0)
            }
            return num
        }
    },
    methods: {
        ...mapMutations([
            ADD_CART, REDUCE_CART
        ]),
        removeOutCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock) {
            if (this.foodCount > 0) {
                this.REDUCE_CART({
                    shopid: this.shopId,
                    category_id,
                    item_id,
                    food_id,
                    name,
                    price,
                    specs,
                    packing_fee,
                    sku_id,
                    stock
                })
            }
        },
        addToCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock, event) {
            this.ADD_CART({
                shopid: this.shopId,
                category_id,
                item_id,
                food_id,
                name,
                price,
                specs,
                packing_fee,
                sku_id,
                stock
            });
            let elLeft = event.target.getBoundingClientRect().left
            let elBottom = event.target.getBoundingClientRect().bottom

            this.$emit('showMoveDot', true, elLeft, elBottom)

        },
        showChooseList(foodScroll) {
            this.$emit('showChooseList', foodScroll)
        },
        showReduceTip() {
            this.$emit('showReduceTip')
        },

    },
}
</script>
<style scoped>
@import 'mixin';
.choose-specification {
    .choose-icon-container {
        display: flex;
        align-items: center;
    }
}

.choose-list {
    display: block;
    @mixin sc .55rem,
    #fff;
    padding: .1rem .2rem;
    background-color: $blue;
    border-radius: 0.2rem;
    border: 1px solid $blue;
}

.count {
    @mixin sc .65rem,
    #666;
    min-width: 1rem;
    text-align: center;
    font-family: Helvetica Neue, Tahoma;
}

.specs-reduce-icon {
    fill: #999;
}

.cart-button {
    display: flex;
    align-items: center;
}

.wrapper {
    display: flex;
    align-items: center;
}

.add-icon {
    position: relative;
    z-index: 999;
}

.cart-module {
    svg {
        @mixin wh .9rem,
        .9rem;
        fill: #3190e8;
    }
}

.show-reduce-enter-active,
.show-reduce-leave-active {
    transition: all .3s ease-out;
}

.show-reduce-enter,
.show-reduce-leave-active {
    opacity: 0;
    transform: translateX(1rem);
}

.fade-enter-active,
.fade-leave-active {
    transition: all .3s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

.fade-bounce-enter-active,
.fade-bounce-leave-active {
    transition: all .3s;
}

.fade-bounce-enter,
.fade-bounce-leave-active {
    opacity: 0;
    transform: scale(.7);
}
</style>
