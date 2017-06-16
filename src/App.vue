<template lang="jade">
#app
  .header
    img(src='http://ohusmobs2.bkt.clouddn.com/20170616149758498873692.png')
  transition(name="fade")
    router-view
  .footer
    | ©
    a(src='https://github.com/ericjjj') Eric &nbsp
    a(src='https://github.com/gpkeditor/gpkeditor') Github
    | &nbsp
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
  width 100%
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  // text-align center
  color #2c3e50

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}

.header {
  margin 50px 5%;
}

.footer {
  position: relative;
  bottom: -60px;
  padding-bottom 10px
  text-align center
  a {
    color: #A0AABF;
    text-decoration: none;
    cursor pointer
  }
  a:hover {
    text-decoration: underline;
  }
}

// markdown editor




</style>
