<template lang="jade">
#app
  transition(name="fade")
    router-view
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus">
html, body, #app ,.view
  width 100%
  height 100%
  margin 0
  padding 0

.view
  width calc(100% - 100px)
  float right
#app
  // font-family 'Avenir', Helvetica, Arial, sans-serif
  // -webkit-font-smoothing antialiased
  // -moz-osx-font-smoothing grayscale
  // text-align center
  color #2c3e50

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
