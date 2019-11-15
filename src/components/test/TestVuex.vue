<template>
    <div>
      {{this.$store.state.count}}
      {{this.$store.state.data}}
    </div>
</template>

<script>
export default {
  name: 'TestVuex',
  data () {
    return {
      seller: {}
    }
  },
  methods: {
    getData () {
      this.$store.dispatch('getDataAction')
    }
  },
  created () {
    // this.getData()
  }
}
</script>

<style scoped lang="stylus">

</style>
