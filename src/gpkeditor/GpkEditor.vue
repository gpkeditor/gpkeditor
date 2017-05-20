<template>
<div id="gpk-editor">
  <textarea :value="input" @input="update"></textarea>
  <div v-html="compiledMarkdown"></div>
</div>
</template>

<script>
import parser from '../../../gpkparser/parser.js'
export default {
  name: 'gpk-editor',
  data () {
    return {
      input: '# hello'
    }
  },
  computed: {
    compiledMarkdown: function () {
      return parser.parse(this.input)
    }
  },
  methods: {
    update (e) {
      setTimeout(() => {
        this.input = e.target.value
      })
    }
  }
}

</script>

<style lang="stylus" scoped>
html, body, #editor {
  margin: 0;
  height: 100%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
}

textarea, #editor div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>
