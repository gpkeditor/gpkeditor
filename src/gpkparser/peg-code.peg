markdown = ps:(paragraph)* {
  var is_array = (el) => {
        return (typeof el === 'object' && el.length > 0);
      }
      var is_object = (el) => {
        return typeof el === 'object';
      }
      var mapAll = (element) => {
        if (element === undefined) {return;}
        if (is_array(element)) {
          element.forEach((el, index) => {
              if (el === undefined) {
                  element.splice(index, 1);
                } else {
                  mapAll(el);
                }
            })
        } else if (is_object(element)) {
          mapAll(element.content);
        }

      }

       var groupBy = (fn, source) => {
         var result = [];
         var current = 0;
         if(source === undefined || typeof source !== 'object' || source.length === undefined) {return;}
         source.forEach((el, index) => {
            if (!fn(el, source[index + 1])) {
                result.push(source.slice(current, index + 1))
                current = index + 1;
              }
        })
        return result;
      }

      var fn = (x, y) => {return typeof x === typeof y;}
      ps.forEach(x => {
        x.content = groupBy(fn, x.content);
        if(x.content) {
          x.content = x.content.map(el => {
            if(typeof el[0] === 'object') {
              return el.map(sub => {
                  if(typeof sub.content === 'object'){
                      sub.content = sub.content.join('');
                  }
                  return sub;
                })
            }
            return [el.join('')];
          })
          x.content = [].concat.apply(x.content);
          mapAll(x.content);
       }
    })
  return ps
}

paragraph = p:(_ paragraph_content _) {

  return p[1];
}

paragraph_content =
       heading
     / global_link_list
     / quote_list
     / q:quote  { return {type: 'quote', content: q} }
     / code
     / ul_list
     / ul_li
     / table
     / a_img
     / a
     / img
     / line
     / strong
     / annotation
     / x:plain_text_paragraph {
      return {type: 'p', content:  x}
     }


heading = h:("#"+) " " t:text {
  return {type: 'h' + h.length, content: t};
}

quote = _ "> " t:text {
  return t;
}
quote_list = q:quote list:(_ quote)+ {
  const newList = [q].concat(list.map(a => a[1])).map(el =>  el.join(""));
  return {type: 'quote_list', content: [newList]};
}
table = _ tb:(table_tr)+ _ {
   return {type: 'table', th: tb[0], content: tb.splice(2, tb.length)};
}
table_tr = "|" x: (table_item)+ "\n"  {
  return x;
}

table_item = t:(_ table_text_formated _) "|" {
  return t[1];
}

table_text_formated = formated_text / table_text

table_text = x:([^|]+) {
  return x.join('');
}
ul_li_item = "- " / "* "
ul_li = ul_li_item t:text  {
  return {type: 'li', li: t};
}
ul_list = xs:(_ ul_li _)+  {
  const rows = xs.map(el => {
    return el[1].li;
  });
  return {type: 'ul', content: rows};
}
img = "![" t:a_img_text "](" url:a_img_text ")" {
  return {type: 'img', url: url, content: t};
}
a = "[" t:a_img_text "](" url:a_img_text ")" {
  return {type: 'a', url: url, content: t};
}
a_img = "[" i: img "](" url:a_img_text ")" {
  return {type: 'a_img', url: url, img: i};
}
a_img_text  = x:([a-zA-Z0-9|:/.!]+) {
  return x.join('');
}
annotation = _ "[//]:" _ t: text {
  return {type: 'annotation', content: t};
}

line = _ ("-")+ _ {
  return {type: 'hr', content: ""};
}

code = "```" l:text "\n" c:code_rows "```" {
  return {type:'code', content: [c], language: l};
}
code_rows = rows:(code_rows_text "\n")+ {
  return {type:'code_rows', content: rows};
}
code_rows_text = x:([^`\n]+) {
  return x.join('');
}

plain_text_paragraph =  lns:(text "\n"?)+{
  return lns[0][0];
}

text_single = formated_text / normal_text

text = x:text_single+ {
  return x;
}
normal_text = x:([^\n]) {
  return x;
}

formated_text = a / anchor_with_name / anchor / inline_code / img / a_img / strong  / em

strong = "**" t:(!"**" text_single)+ "**"{
  return {type: 'strong', content: t};
}

em = "*" t:(!"*" text_single)+ "*"{
  return {type: 'em', content: [t]};
}

inline_code = "`" t:(!"`" text_single)+ "`" {
  return {type: 'inline_code', content: t};
}

global_link_text = x:(!"]" text_single)+ {
  return x.join('');
}

anchor_with_name_options = "][" / "]" _ "["
anchor_with_name = "[" t:global_link_text anchor_with_name_options name:global_link_text "]" {
  return {type: "anchor_with_name", content: t.split(",").join(""), name: name.split(",").join("")};
}

anchor = "[" t:global_link_text "]" {

  return {type: "anchor", content: t.split(",").join("")};
}

url = x:([a-zA-Z0-9|:/.!-]+) {
  return x.join('');
}

global_link = "[" t:global_link_text "]: <" url:url ">" {
  return {type: 'global_link', content: [t.split(',').join('')], url: url};
}

global_link_list = ts:(_ global_link _)+ {
  return {type: 'global_link_list', content: ts.map(el => el[1])};
}



_ "whitespace"
  = [ \t\n\r]*

space = [ \t\r]*

