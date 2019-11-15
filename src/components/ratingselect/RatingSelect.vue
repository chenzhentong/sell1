<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block positive" :class="{'active':selectType == 2}" @click="select(2)">{{desc.all}}<span class="count">{{getCount[2]}}</span></span>
      <span class="block positive" :class="{'active':selectType == 0}" @click="select(0)">{{desc.positive}}<span class="count">{{getCount[0]}}</span></span>
      <span class="block negative" :class="{'active':selectType == 1}" @click="select(1)">{{desc.negative}}<span class="count">{{getCount[1]}}</span></span>
    </div>
    <div class="switch" :class="{'on': onlyContent == true}" @click="toggleContent">
      <span class="icon-check_circle"></span>
      <span class="text" >只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2
export default {
  name: 'ratingselect',
  data () {
    return {
      count: [0, 0, 0]

    }
  },
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      type: Number,
      default () {
        return ALL
      }
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'

        }
      }
    }
  },
  methods: {
    select (type) {
      // this.selectType = type
      this.$emit('update:selectType', type)
      // this.sync.selectType = type
    },
    toggleContent () {
      this.$emit('update:onlyContent', !this.onlyContent)
    }
  },
  computed: {
    getCount () {
      for (let i = 0; i < this.count.length; i++) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.count[i] = 0
      }
      if (!this.onlyContent) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.count[2] = this.ratings.length
        for (let i = 0; i < this.ratings.length; i++) {
          if (this.ratings[i].rateType === 0) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.count[0] += 1
          } else if (this.ratings[i].rateType === 1) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.count[1] += 1
          }
        }
      } else {
        for (let i = 0; i < this.ratings.length; i++) {
          if (this.ratings[i].text !== '') {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.count[2] += 1
          }
          if (this.ratings[i].rateType === 0 && this.ratings[i].text !== '') {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.count[0] += 1
          } else if (this.ratings[i].rateType === 1 && this.ratings[i].text !== '') {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.count[1] += 1
          }
        }
      }
      return this.count
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      font-size: 0
      border-1px(rgba(7,17,27,0.1))
      .block
        display: inline-block
        padding: 12px
        margin-right: 8px
        border-radius: 1px
        font-size: 12px
        line-height: 12px
        color: rgb(77,85,93)

        &.active
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
        &.positive
          background: #BBDAEA
          &.active
            background: rgb(0,160,220)
        &.negative
          background: #CBCBCB
          &.active
            background: rgb(77,85,93)
  .switch
    padding: 12px 18px
    line-height: 24px
    border-bottom: 1px solid rgba(7,17,27,0.1)
    color: rgb(147,153,159)
    font-size: 0
    &.on
      .icon-check_circle
        color: #00c850
    .icon-check_circle
      display: inline-block
      vertical-align: top
      margin-right: 4px
      font-size: 24px
    .text
      display: inline-block
      vertical-align: top
      font-size: 12px

</style>
