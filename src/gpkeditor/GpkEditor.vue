<template>
<div id="gpk-editor">
  <textarea :value="input" @input="update" class="input"></textarea>
  <div v-html="compiledMarkdown" class="preview"></div>
</div>
</template>

<script>
import parser from '../../../gpkparser/index.js'
import markdown from './markdown.js'
export default {
  name: 'gpk-editor',
  data () {
    return {
      input: markdown
    }
  },
  computed: {
    compiledMarkdown: function () {
      return parser(this.input)
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
html, body, #gpk-editor {
  margin: 0;
  height: 100%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
}

textarea, .preview {
  height: 100%;
  overflow-y: scroll;
  padding: 20px;
  width calc(50% - 44px);
  vertical-align: top;
}


textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
}

.preview {
  display: inline-block;
  overflow-x hidden;
  word-wrap: break-word;
  word-break: normal;
}
</style>
