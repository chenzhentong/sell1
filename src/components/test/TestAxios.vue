<template>
    <div>
      TestAxios
    </div>
</template>

<script>

export default {
  name: 'TestAxios',
  data () {
    return {
      data: {}
    }
  },
  methods: {
    getData () {
      this.$axios({
        method: 'get',
        url: '../../../static/data.json',
        dataType: 'json'
      }).then(response => {
        console.log(response.data)
        this.data = response.data
      }).catch(error => {
        console.log('error:' + error)
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped lang="stylus">

</style>
