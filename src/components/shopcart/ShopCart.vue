<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalCount>0}">
            <span class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></span>
          </div>
          <div class="num">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight': totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <transition name="drop">
      <div class="ball-container">
        <div v-for="(ball,index) in balls" :key="index" v-show="ball.show" class="ball"></div>
      </div>
    </transition>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="emptyShopCart">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li v-for="(food,index) in selectFoods" :key="index" class="food border-1px">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cart-control :food="food"></cart-control>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import CartControl from '../cartcontrol/CartControl'
import BScroll from 'better-scroll'

export default {
  name: 'ShopCart',
  components: {CartControl},
  data () {
    return {
      balls: [
        {show: false},
        {show: false},
        {show: false},
        {show: false},
        {show: false}
      ],
      fold: false
    }
  },
  props: {
    selectFoods: {
      type: Array/*,
           default () {
             return [
             ]
           } */
    },
    deliveryPrice: {
      type: Number
    },
    minPrice: {
      type: Number
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.deliveryPrice}元起送`
      } else if (this.totalPrice < this.deliveryPrice) {
        return `还差￥${this.deliveryPrice - this.totalPrice}元配送`
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.totalPrice >= this.deliveryPrice) {
        return 'enough'
      } else {
        return 'not-enough'
      }
      // [{'enough': totalPrice >= deliveryPrice}, {'not-enough': totalPrice < deliveryPrice}]
    },
    listShow () {
      if (!this.totalCount) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.fold = true
        return false
      }
      let show = !this.fold
      if (this.show) {
        this.$nextTick(() => {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          if (!this.scroll) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  methods: {
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    emptyShopCart () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .shopcart
    position: fixed
    bottom: 0
    left: 0
    height: 48px
    width: 100%
    z-index: 50

    .content
      display: flex
      background: #141d27
      color: rgba(255, 255, 255, 0.4)

      .content-left
        flex: 1
        font-size: 0

        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background: #141d27

          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c

            &.highlight
              background: rgb(0, 160, 220)

            .icon-shopping_cart
              font-size: 24px
              line-height: 44px
              color: #80858a

              &.highlight
                background-color: #fff

          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            text-align: center
            border-radius: 16px
            line-height: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4)
            background-color: #FF592F

        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          box-sizing: border-box
          padding-right: 12px
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700

          &.highlight
            color: #fff

        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
          font-weight: 700

      .content-right
        flex: 0 0 105px
        width: 105px

        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          background: #169D53

          &.not-enough
            background-color: #2b333b

          &.enough
            background-color: #159950
            color: #fff

  /*.ball-container
    .ball
      position: fixed
      left: 32px
      bottom: 22px
      z-index: 200
  width: 16px
  height: 16px
  background: rgb(0, 160, 220)
  border-radius: 50%
  transition: all 0.4s*/

  .shopcart-list
    position: absolute
    bottom: 0
    left: 0
    z-index: -1
    width: 100%

    &.fold-transition
      transition: all 0.5s
      transform: translate3d(0, -100%, 0)

    &.fold-enter, &.fold-leave-active
      transform: translate3d(0, 0, 0)

    .list-header
      line-height: 40px
      height: 40px
      padding: 0 18px
      background: #f3f5f7
      border-bottom: 1px sold rgba(7, 17, 27, 0.1)

      .title
        float: left
        font-size: 14px
        color: rgb(7, 17, 27)

      .empty
        float: right
        font-size: 12px
        color: rgb(0, 160, 220)

    .list-content
      padding: 0 18px
      max-height: 217px
      background: #fff
      overflow: auto

      .food
        position: relative
        padding: 12px 0
        box-sizing: border-box
        border-1px(rgba(7, 17, 27, 0.1))

        .name
          line-height: 24px
          font-size: 14px
          color: rgb(7, 17, 27)

        .price
          position: absolute
          right: 90px
          bottom: 12px
          line-height: 24px
          font-size: 14px
          font-weight: 700;
          color: rgb(240, 20, 0)

        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 6px
</style>
