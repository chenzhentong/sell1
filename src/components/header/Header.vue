<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img  width="64" height="64" :src="this.seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}} / {{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <icon :height="12" :width="12" :margin-right="12" :background-size="12" :index="0" :type="0" ></icon>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix" >
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <Star :score="3.5" :size="48"></Star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li v-for="(item,index) in seller.supports" :key="index" class="support-item">
                <icon :width="16" :height="16" :margin-right="6" :background-size="16" :index="0" :type="seller.supports[index].type"></icon>
                <span class="text" >{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>

          </div>
        </div>
        <div class="detail-close" @click="showDetail">
          <i class="icon-close" ></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Star from '../star/Star'
import Icon from '../icon/Icon'
export default {
  name: 'Header',
  data () {
    return {
      detailShow: false
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    showDetail () {
      this.detailShow = !this.detailShow
    }
  },
  components: {
    Icon,
    Star
  }
}
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  //@import "../../common/stylus/icon.styl"
  .header
    position: relative
    color: #fff
    background: rgba(7,17,27,0.5)
    overflow: hidden
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        //font-size: 0
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top
            width: 30px;
            height: 18px;
            bg-image('brand')
            background-size: 30px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .description
          margin-bottom: 10px;
          line-height: 12px;
          font-size: 12px
        .support
          font-size: 12px
          .text
            font-size: 12px
            line-height: 12px
      .support-count
        position: absolute
        right: 12px
        bottom: 18px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background: rgba(0,0,0,0.2)
        text-align: center
        .count
          font-size: 10px
          vertical-align: center
        .icon-keyboard_arrow_right
          font-size: 10px
    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px;
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      //font-size: 0
      background: rgba(7,17,27,0.2)
      .bulletin-title
        display: inline-block
        vertical-align: top
        margin-top: 8px
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        vertical-align: top
        margin: 0 4px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 12px
        top: 8px
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .detail
      position: fixed
      top: 0
      left: 0
      z-index: 100
      width: 100%
      height: 100%
      overflow: auto
      opacity: 1
      background: rgba(7,17,27,0.8)// 渐变形成的最终效果
      &.fade-enter-active,&.fade-leave-active //渐变 进入和退出都经历0.5s
        transition: all 0.5s
      &.fade-enter, &.fade-leave-to// /定义进入前和退出后样式，即透明无色背景。
        opacity: 0
        background: rgba(7,17,27,0)
      .detail-wrapper
        min-height: 100%
        width: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            line-height: 16px;
            text-align: center
            font-weight: 700
            font-size: 16px
          .star-wrapper
            margin-top: 18px
            padding: 2px 0
            text-align: center
          .title
            display: flex
            width: 80%
            margin: 28px auto 24px auto
            .line
              flex: 1
              position: relative
              top: -6px
              border-bottom: 1px solid rgba(255,255,255,0.2)
            .text
              padding: 0 12px
              font-size: 14px
              font-weight: 700
          .supports
            width: 80%
            margin: 0 auto
            .support-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              &:last-child
                margin-bottom: 0
              .text
                line-height: 12px
                font-size: 12px
          .bulletin
            width: 80%
            margin: 0 auto
            font-size: 0
            .content
              padding: 0 12px
              line-height: 24px
              font-size: 12px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both
        font-size: 32px
</style>
