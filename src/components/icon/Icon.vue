<template>
    <span class="icon" :class="classMap1[index][type]" :style="{width: width + 'px',height: height + 'px',backgroundSize: backgroundSize + 'px',marginRight: marginRight+ 'px'}"></span>
</template>

<script>
export default {
  name: 'Icon',
  data () {
    return {
    }
  },
  created () {
    this.classMap1 = [
      ['decrease1', 'discount1', 'special1', 'invoice1', 'guarantee1'],
      ['decrease2', 'discount2', 'special2', 'invoice2', 'guarantee2'],
      ['decrease3', 'discount3', 'special3', 'invoice3', 'guarantee3'],
      ['decrease4', 'discount4', 'special4', 'invoice4', 'guarantee4']
    ]
  },
  props: {
    index: {
      type: Number
    },
    type: {
      type: Number
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    marginRight: {
      type: Number
    },
    backgroundSize: {
      type: Number
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .icon
    display: inline-block
    vertical-align: top
    /*width: 12px
    height: 12px
    margin-right: 2px
    background-size: 12px 12px*/
    background-repeat: no-repeat
    &.decrease1
      bg-image('decrease_1')
    &.discount1
      bg-image('discount_1')
    &.guarantee1
      bg-image('guarantee_1')
    &.special1
      bg-image('special_1')
    &.invoice1
      bg-image('invoice_1')
    &.decrease2
      bg-image('decrease_2')
    &.discount2
      bg-image('discount_2')
    &.guarantee2
      bg-image('guarantee_2')
    &.special2
      bg-image('special_2')
    &.invoice2
      bg-image('invoice_2')
    &.decrease3
      bg-image('decrease_3')
    &.discount3
      bg-image('discount_3')
    &.guarantee3
      bg-image('guarantee_3')
    &.special3
      bg-image('special_3')
    &.invoice3
      bg-image('invoice_3')
    &.decrease4
      bg-image('decrease_4')
    &.discount4
      bg-image('discount_4')
    &.guarantee4
      bg-image('guarantee_4')
    &.special4
      bg-image('special_4')
    &.invoice4
      bg-image('invoice_4')

</style>
