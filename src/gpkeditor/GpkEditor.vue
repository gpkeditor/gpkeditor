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

<style lang="stylus">


textarea, .preview {
  height: 100%;
  overflow-y: scroll;
  padding: 20px;
  width calc(50% - 46px);
  vertical-align: top;
  border 1px solid #E1E1E1;
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

#gpk-editor {
  padding 0 5%
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

  pre code {
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

  a {
    color: #A0AABF;
    text-decoration: underline;
  }

  code {
    color: #c7254e;
    background-color: #f9f2f4;
    border-radius: 4px;
  }
}
</style>
