<template>
  <div id="app">
    <Header :seller="this.seller"></Header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{path: '/goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path: '/ratings'}">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path: '/seller'}">商家</router-link>
      </div>
    </div>
    <div class="content">
      <router-view :seller="seller"></router-view>
    </div>
  </div>
</template>

<script>
import {urlParse} from './common/js/util.js'
import Header from './components/header/Header'
export default {
  name: 'App',
  components: {Header},
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          // console.log(queryParam)
          return queryParam.id
        })()
      }
    }
  },
  created () {
    this.$axios({
      method: 'get',
      url: '/api/seller?id=' + this.seller.id,
      // url: '/api/seller?id=' + this.$route.params.id,
      dataType: 'json'
    }).then(response => {
      // this.seller = response.data.data
      this.seller = Object.assign({}, this.seller, response.data.data)
      // console.log(this.seller.id)
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
<style lang="stylus">
  // @import 引入mixin.styl
  @import "common/stylus/mixin.styl"
  #app
    .tab
      display: flex
      width: 100%
      height: 40px;
      line-height: 40px;
      // border-bottom: 1px solid rgba(7,17,27,0.1)
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        text-align: center
        flex: 1
        & > a
          display: block
          /* font-size: 28px
          line-height: 28px */
          font-size: 14px
          color: rgb(77,85,93)
          &.active
            color: rgb(240,20,20)
          /* &.router-link-active
            color: rgb(240,20,20) */

</style>
