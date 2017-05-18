<template>
    <div id='rating-container' :style="{'line-height':size+'rem'}">
        <div class='stars'>
            <Icon name='star' :style="{width:size+'rem',height:size+'rem'}" v-for='num of 5' :key='num' class='icon grey'></Icon>
        </div>
        <div :style="'width:'+ rating*20+'%'" class='mask'>
            <Icon name='star' :style="{width:size+'rem',height:size+'rem'}" v-for='num of 5' :key='num' class='icon orange'></Icon>
        </div>
    </div>
</template>
<script>
import Icon from './icon'

export default {
    name: 'Rating',
    components: {
        Icon
    },
    props: {
        rating: {
            type: Number,
            default: 0
        },
        size: {
            type: Number,
            default: 0.5
        }
    }
}
</script>
<style scoped>
@import 'mixin.css';
#rating-container {
    display: inline-block;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    /*@mixin wh 2rem,
    0.5rem;*/
    .stars {}
    .mask {
        position: absolute;
        display: flex;
        top: 0;
        left: 0;
        /*
        width: 2rem;
        height: .4rem;
*/
        overflow: hidden;
    }
}

.orange {
    fill: #ff9a0d;
}

.grey {
    fill: #d1d1d1;
}

.icon {
    flex: none;
}
</style>
