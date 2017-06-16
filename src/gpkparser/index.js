

function parseDom (el) {
  const h_reg = /h\d+/;
  let dom = '';
  const currentLinks = this;
  switch (el.type) {
    case undefined: {
      break;
    }
    case 'p': {

      dom = '<p>' + findChildrens(el, currentLinks) + '</p>' + '\n';
        break;
    }
    case 'strong': {
      const rows = el.content[0].map(sub => sub[0]).join('');
      dom = '<strong>' + rows + '</strong>' + '\n';
        break;
    }
    case 'em': {
      dom = '<em>' + el.content.split(',').join('') + '</em>' + '\n';
        break;
    }
    case 'code': {
      let rows = el.content[0].map(el => `${el.content}`);
      dom = `<pre><code language=${el.language}>${rows}</code></pre>`
        break;
    }
    case 'table': {
      var mapTable = (sub, currentLinks) => {
        let result = '';
        sub.forEach(subEl => {
          if (typeof subEl === 'object') {
            result += `<td>${parseDom.call(currentLinks, subEl)}</td>`;
          } else {
            result += `<td>${subEl}</td>`;
          }
        })
        return result;
      }
      const th = el.th.map(el => `<th>${el}</th>`).join('');
      const head = `<thead><tr>${th}</tr></thead>`;
      const tb = el.content[0].map(sub => {
                    return `<tr>${mapTable(sub, currentLinks)}</tr>`
                  }).join('');
      const body = `<tbody>${tb}</tbody>`;
      dom = `<table>${head}${body}</table>`;
        break;
    }
    case 'a': {
      dom = `<a href=${el.url}>${el.content}</a>`;
        break;
    }
    case 'img': {
      dom = `<img src="${el.url}" alt=${el.content}>`;
        break;
    }
    case 'a_img': {
      dom = `<a href=${el.url}>
              <img src="${el.img.url}" alt=${el.img.content}>
              </a>`;
        break;
    }
    case 'quote_list': {
      dom = `<blockquote><p>${el.content[0][0].map(el => `${el}</br>`).join('')}</p></blockquote>`;
        break;
    }
    case 'ul': {
      let lis = el.content[0].map(sub => `<li>${mapList(sub,currentLinks)}</li>`).join('');
      dom = `<ul>${lis}</ul>`;
        break;
    }
    case 'hr': {
      dom = '<hr>';
      break;
    }
    case 'inline_code': {
      dom = `<code>${el.content.split(',').join('')}</code>`;
      break;
    }
    case (h_reg.exec(el.type) && h_reg.exec(el.type).input): {
      dom =  `<${el.type}>${el.content}</${el.type}>`;
        break;
    }
    case 'anchor_with_name': {
      const anchor = findLink(currentLinks, el.name);
      if (anchor) {
        dom = `<a href=${anchor.url}>${el.content}</a>`;
      }
      break;
    }
    case 'anchor': {
      const anchor = findLink(currentLinks, el.content);
      if (anchor) {
        dom = `<a href=${anchor.url}>${anchor.content}</a>`;
      }
      break;
    }
    default: {
      // console.log(el);
    }
  }
  return dom;
}

var mapList = (sub, currentLinks) => {
  let result = ''
  sub.forEach(subEl => {
    if (typeof subEl === 'object') {
      result += parseDom.call(currentLinks, subEl);
    } else {
      result += subEl;
    }
  })
  return result;
}

function findChildrens(el, currentLinks) {
  let result = '';
  el.content.forEach(sub => {
    result += mapList(sub, currentLinks);
  })
  return result;
}

function findLink (links, name) {
  let result = null;
  links.forEach(el => {
    if (el.content.toLowerCase() === name.toLowerCase()) {
      result = el;
      return false;
    }
  })
  return result;
}

function mapAll (el, callback){
  if (el === '' || el === null || el === undefined) { return; }
  let buffer = callback(el);
  if(typeof el === 'object' && el.length > 0 ) {
    el.forEach(sub => {mapAll(sub, callback);})
  }
}

module.exports = function (input) {
  let p = require('./parser.js');
  let markdown = p.parse(input);
  let links = [];
  let dom = '';
  let getLinks = function (el) {
    if (el.type === 'global_link_list') {
      links = el.content[0];
    }
  }
  let getDom = function (el) {
    dom += parseDom.call(links, el);
  }
  mapAll(markdown, getLinks);
  mapAll(markdown, getDom);
  return dom;
}
