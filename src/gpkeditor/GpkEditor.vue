<template>
<div id="gpk-editor">
  <textarea :value="input" @input="update" class="input" @keyup.enter="enter"></textarea>
  <div v-html="compiledMarkdown" class="preview"></div>
</div>
</template>

<script>
import parser from '../gpkparser/index.js'
// import parser from 'gpkparser'
import markdown from './markdown.js'
const regex = /^\s*(\-|\*|\>)(\s*)([\S]+)/g;


export default {
  name: 'gpk-editor',
  data () {
    return {
      input: markdown,
      info: {
        line: 0,
        index: 0,
      }
    }
  },
  computed: {
    compiledMarkdown: function () {
      return parser(this.input)
    }
  },
  methods: {
    update (e) {
      this.info = getLineNumberAndColumnIndex(e.target)
      setTimeout(() => {
        this.input = e.target.value
      })
      console.log(e)
      if (e.keyCode === 13) {
        this.enter(e)
      }
    },
    enter (e) {
      const array = e.target.value.split('\n');
      const top = array[this.info.line - 2];
      const result = regex.exec(top);
      if (result === null) {return;}
      console.log(result);
      const i = result[0].indexOf(result[1]);
      const begin = result[0].substr(0, i+1) + ' ';
      setTimeout(()=> {
        insertAtCursor(e.target, begin);
      },300)

    }
  }
}

function getLineNumberAndColumnIndex(textarea){
   var textLines = textarea.value.substr(0, textarea.selectionStart).split("\n");
   var currentLineNumber = textLines.length;
   var currentColumnIndex = textLines[textLines.length-1].length;
   console.log("Current Line Number "+ currentLineNumber+" Current Column Index "+currentColumnIndex );
   return {
    line: currentLineNumber,
    index: currentColumnIndex
   }
}

function insertAtCursor(myField, myValue) {
  if (document.selection) {
      //IE support

      myField.focus();
      sel = document.selection.createRange();
      sel.text = myValue;
      sel.select();
  } else if (myField.selectionStart || myField.selectionStart == '0') {
      //MOZILLA/NETSCAPE support
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;
      var beforeValue = myField.value.substring(0, startPos);
      var afterValue = myField.value.substring(endPos, myField.value.length);

      myField.value = beforeValue + myValue + afterValue;

      myField.selectionStart = startPos + myValue.length;
      myField.selectionEnd = startPos + myValue.length;
      myField.focus();
  } else {
      myField.value += myValue;
      myField.focus();
  }
}

function getCursortPosition (ctrl) {//获取光标位置函数
    var CaretPos = 0;    // IE Support
    if (document.selection) {
    ctrl.focus ();
        var Sel = document.selection.createRange ();
        Sel.moveStart ('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    }
    // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart == '0')
        CaretPos = ctrl.selectionStart;
    return (CaretPos);
}

function setCaretPosition(ctrl, pos){//设置光标位置函数
    if(ctrl.setSelectionRange)
    {
        ctrl.focus();
        ctrl.setSelectionRange(pos,pos);
    }
    else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
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
