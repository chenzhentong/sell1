<template>
    <div class="seller"  ref="sellerWrapper">
      <div class="seller-content">
        <div class="overview" >
          <h1 class="title">{{seller.name}}</h1>
          <div class="desc border-1px">
            <Star :size="36" :score="seller.score" class="star"></Star>
            <span class="text">({{seller.ratingCount}})</span>
            <span class="text">月售{{seller.sellCount}}单</span>
          </div>
          <ul class="remark">
            <li class="block">
              <h2 class="title">起送价</h2>
              <div class="content">
                <span class="stress">{{seller.minPrice}}</span>元
              </div>
            </li>
            <li class="block">
              <h2 class="title">商家配送</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryPrice}}</span>元
              </div>
            </li>

            <li class="block">
              <h2 class="title">平均配送时间</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryTime}}</span>分钟
              </div>
            </li>
          </ul>
          <div class="favorite" >
            <span class="icon-favorite" :class="{'active': favorite}" @click="favoriteSeller"></span>
            <div class="text">{{favoriteText}}</div>
          </div>
        </div>
        <Split></Split>
        <div class="bulletin">
          <h1 class="title">公告与活动</h1>
          <div class="content-wrapper border-1px">
            <p class="text">{{seller.bulletin}}</p>
          </div>
          <div class="supports">
            <ul>
              <li class="support-item border-1px" v-for="(support,index) in seller.supports" :key="index">
                <Icon class="icon" :index="2" :type="support.type" :width="16" :height="16" :margin-right="6" :background-size="16"></Icon>
                <span class="text">{{support.description}}</span>
              </li>
            </ul>
          </div>
        </div>
        <split></split>
        <div class="pics">
          <h1 class="title">商家实景</h1>
          <div class="pic-wrapper" ref="picWrapper" >
            <ul class="pic-list" ref="picList">
              <li v-for="(pic,index) in seller.pics" :key="index"  class="pic-item">
                <img :src="pic" >
              </li>
            </ul>
          </div>
        </div>
        <split></split>
        <div class="seller-info">
          <h1 class="title border-1px">商家信息</h1>
          <ul class="info-list">
            <li class="item border-1px" v-for="(info,index) in seller.infos" :key="index">{{info}}</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import Star from '../star/Star'
import Split from '../split/Split'
import Icon from '../icon/Icon'
import BScroll from 'better-scroll'
export default {
  name: 'Seller',
  components: {Icon, Split, Star},
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      favorite: true
    }
  },
  created () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.sellerWrapper, {
        click: true
      })
    })
  },
  mounted () {
    if (this.seller.pics) {
      console.log(1)
      let picWidth = 120
      let marginRight = 6
      let width = (picWidth + marginRight) * this.seller.pics.length - marginRight
      // console.log('picList true length:' + width)
      this.$refs.picList.style.width = width + 'px'
      // console.log('picList length' + this.$refs.picList.style.width)

      // console.log(window.getComputedStyle(this.$refs.picList).height)
      this.picScroll = new BScroll(this.$refs.picWrapper, {
        scrollX: true,
        eventPassThrough: 'vertical'
      })
    }
  },
  computed: {
    favoriteText () {
      return this.favorite ? '已收藏' : '未收藏'
    }
  },
  methods: {
    favoriteSeller () {
      this.favorite = !this.favorite
    }
  }
}
</script>

<style scoped lang="stylus" >
  @import "../../common/stylus/mixin.styl"
  .seller
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .seller-content
      .overview
        //position: relative
        padding: 18px
        .title
          margin-bottom: 8px
          font-size: 14px
          color: rgb(7,17,27)
          line-height: 14px
        .desc
          padding-bottom: 18px
          font-size: 0
          border-1px(rgba(7,17,27,0.1))
          .star
            display: inline-block
            vertical-align: top
            margin-right: 8px
          .text
            display: inline-block
            vertical-align: top
            margin-right: 12px
            font-size: 14px
            color: rgb(77,85,93)
            line-height: 18px
            height: 18px

        .remark
          display: flex
          padding: 18px 0 0 0
          .block
            flex: 1
            text-align: center
            border-right: 1px solid rgba(7,17,27,0.1)
            &:last-child
              border: none
            .title
              margin-bottom: 4px
              font-size: 10px
              color: rgb(147,153,159)
              line-height: 10px
            .content
              font-size: 10px
              .stress
                font-size: 24px
                font-weight: 200
                color: rgb(7,17,27)
                line-height: 24px
                height: 24px
        .favorite
          position: absolute
          right: 11px
          top: 18px
          width: 60px
          text-align: center
          .icon-favorite
            margin-bottom: 8px
            font-size: 24px
            line-height: 24px
            height: 24px
            &.active
              color: rgb(240,20,20)
          .text
            font-size: 10px
            line-height: 20px
            height: 10px
            color: rgb(77,85,93)
      .bulletin
        margin-top: 18px
        padding: 0 18px
        .title
          margin-bottom: 8px
          font-weight: 700
          color: rgb(7,17,27)
        .content-wrapper
          padding: 0 12px 16px 12px
          border-1px(rgba(7,17,27,0.1))
          .text
            font-size: 12px
            font-weight: 200
            color: rgb(240,20,20)
            line-height: 24px
            //height: 24px

        .supports
          padding: 0 18px
          .support-item
            padding: 12px 0
            border-1px(rgba(7,17,27,0.1))
            .icon
              margin-left: 12px
            .text
              font-size: 12px
              font-weight: 200
              color: rgb(7,17,27)
              line-height: 16px
      .pics
        padding: 18px
        .title
          margin-bottom: 12px
          font-weight: 700
          color: rgb(7,17,27)
        .pic-wrapper
          width: 100%
          overflow: hidden
          white-space: nowrap
          .pic-list
            font-size: 0
            .pic-item
              display: inline-block
              margin-right: 6px
              width: 120px
              height: 90px
              img
                width: 100%
                height: 100%
              &:last-child
                margin: 0
      .seller-info
        padding: 18px
        .title
          padding-bottom: 12px
          font-weight: 700
          color: rgb(7,17,27)
          border-1px(rgba(7,17,27,0.1))
        .info-list
          .item
            padding: 16px 12px
            border-1px(rgba(7,17,27,0.1))
            font-size: 12px
            font-weight: 200
            line-height: 16px
            color: rgb(7,17,27)

</style>
