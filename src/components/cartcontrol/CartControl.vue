<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show="this.food.count>0" @click="decreaseCart" >
      </div>
    </transition>
    <div class="cart-count" v-show="this.food.count>0">{{this.food.count}}</div>
    <div class="cart-increase icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'CartControl',
  props: {
    food: {
      type: Object
    }
  },
  created () {
    // console.log(this.food)
  },
  methods: {
    addCart () {
      if (this.food.count === undefined) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count += 1
      }
    },
    decreaseCart () {
      if (this.food.count > 0) {
        this.food.count -= 1
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease,.cart-increase
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0,160,220)
      transition: all 0.4s linear
      &.move-transition
        opacity: 1
        transform: translate3d(0,0,0)
      &.move-enter,&.move-leave-active
        opacity: 0
        transform: translate3d(24px,0,0)
    .cart-count
      display: inline-block
      width:12px
      vertical-align:top
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147,153,159)
</style>
