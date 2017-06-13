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

// markdown editor

p {
  line-height: 27px;
}

pre {
  border-color: #D3DAEA;
  display: block;
  word-break: break-all;
  word-wrap: break-word;
  color: #333;
  background-color: #f5f7fa;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 30px;
  padding: 0 10px;
}

code {
  color: #f66;
  padding: 0;
  font-size: inherit;
  color: inherit;
  white-space: pre-wrap;
  background-color: transparent;
  border-radius: 0;
  line-height: 30px;
}


blockquote {
  color: #666666;
  margin: 0;
  padding-left: 3em;
  border-left: 0.5em #EEE solid;

  p {
    margin: 0px;
    line-height: 26px;
  }
}

ul {
  li {
    line-height 30px
    // margin-left 10px
  }
}

hr {
  box-sizing: content-box;
  height: 0;
}

table, table>thead>tr>th, table>thead>tr>td, table>tbody>tr>th, table>tbody>tr>td, table>tfoot>tr>th, table>tfoot>tr>td {
    border: 1px solid #ddd;
    padding: 10px;
}

table {
  border-collapse: collapse;
}



</style>
