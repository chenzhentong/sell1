<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item, index) in goods" :key="item.id" class="menu-item" :class="{'current': currentIndex == index }"
              @click="selectMenu(index)">
            <span class="text border-1px">
              <template v-if="item.type>0">
                <Icon :index="2" :type="item.type" :width="12" :height="12" :background-size="12"
                      :margin-right="2"></Icon>
              </template>
              <!-- <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span> -->
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodWrapper">
        <ul>
          <li v-for="item in goods" class="good-list food-list-hook" :key="item.id">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item border-1px" :key="food.id" @click="selectFood(food)">
                <div class="icon">
                  <img :src="food.icon" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="description">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cart-control :food="food"></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shop-cart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"
                 :select-foods="selectFoods"></shop-cart>
    </div>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>
<script>
import CartControl from '../cartcontrol/CartControl'
import BScroll from 'better-scroll'
import Icon from '../icon/Icon'
import ShopCart from '../shopcart/ShopCart'
import Food from '../food/Food'

export default {
  name: 'Goods',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  components: {
    Food,
    Icon,
    BScroll,
    ShopCart,
    CartControl
  },
  created () {
    this.$axios({
      method: 'get',
      url: '/api/goods',
      dataType: 'application/json'
    }).then(response => {
      // console.log(response.data)
      this.goods = response.data.data
      // console.log(this.goods)
      this.$nextTick(() => {
        this._initScroll()
        this._calculateHeight()
      })
    }).catch(error => {
      console.log('error:' + error)
    })
  },
  /* mounted () {
    this.$nextTick(() => {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {})
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {})
      // console.log(this.menuScroll)
    })
  }, */
  methods: {
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        probeType: 3,
        click: true
      })
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
        // console.log(this.scrollY)
      })
    },
    _calculateHeight () {
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight
        this.listHeight.push(height)
        // console.log(height)
      }
    },
    selectMenu (index) {
      // console.log('index:' + index)
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      // this.scrollY = this.listHeight[index]
      this.foodScroll.scrollToElement(el, 300)
    },
    // eslint-disable-next-line vue/no-dupe-keys
    selectFood (food) {
      this.selectedFood = food
      // console.log(this.selectedFood)
      this.$refs.food.show()
    }
  },
  computed: {
    currentIndex () {
      // console.log('length:' + this.listHeight.length)
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          // console.log('i:' + i)
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      // console.log(foods)
      return foods
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display: flex
    position: absolute
    width: 100%
    top: 174px
    bottom: 46px
    overflow: hidden

    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7

      .menu-item
        display: table
        height: 54px
        width: 56px
        line-height: 14px
        padding: 0 12px

        &.current
          position: relative
          margin-top: -1px
          z-index: 10
          font-weight: 700
          background: #fff

          .text
            border: none

        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px

    .foods-wrapper
      flex: 1

      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7

      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))

        &:last-child
          border-none()
          margin-bottom: 0

        .icon
          flex: 0 0 57px
          margin-right: 10px

        .content
          flex: 1

          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)

          .description, .extra
            font-size: 10px
            line-height: 10px
            color: rgb(147, 153, 159)

          .description
            margin-bottom: 8px
            line-height: 12px

          .extra
            .count
              margin-right: 12px

          .price
            line-height: 24px
            font-weight: 700

            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)

            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)

          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
