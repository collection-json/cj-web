/*****************************************
 * Consuming a Cj response from a client
 * @mamund (github/twitter/linkedin)
 * ***************************************/


// fire onload
window.onload = function() {
  var pg = null;
  pg = cjClient();
  pg.init();
}

// actual client coding
cjClient = function() {

  var g = {};
  g.href = 'http://localhost:1337/';
  g.contentType = 'application/collection+json';
  g.data = null;
  
  function init() {
    getResponse(g.href);
  }

  function displayRawCj() {
    var div;
    
    div = document.getElementById('rawcj');
    if(div) {
      div.innerHTML = JSON.stringify(g.data, null, 2);
    }
    else {
      alert('no rawcj');
    }
  }  
  
  function handleCjResponse() {
    var div, links, i, x, ul, li, a;

    // show version and rootUrl
    div = document.getElementById('rawcj');
    if(div) {
      div.innerHTML = '';
      div.innerHTML = 'Version: ' + getVersion(g.data) + '<br />';
      div.innerHTML += 'RootURL: ' + getRootUrl(g.data);
    }

    // add any top-level links
    if(g.data.collection.links) {
      links = g.data.collection.links;

      ul = document.createElement('ul');
      ul.className = 'topLinks';

      for(i=0,x=links.length;i<x;i++) {
        a = getLink(links[i]);
        li = document.createElement('li');
        li.appendChild(a);
        ul.appendChild(li);
      }
      div.appendChild(ul);
    }
  }

  function getResponse(href) {
    var ajax;

    ajax=new XMLHttpRequest();
    if(ajax) {
      ajax.onreadystatechange = function(){processResponse(ajax);};
      ajax.open('get',href,false);
      ajax.send(null);
    }   
  }
  
  function processResponse(ajax) {
    if(ajax.readyState==4 || ajax.readyState==='complete') {
      if(ajax.status===200 || ajax.status===204) {
        g.data = JSON.parse(ajax.responseText);
        displayRawCj();
        //handleCjResponse();
      }
      else {
        alert('*** ERROR: '+ajax.status+'\n'+ajax.statusText);
      }
    }
  }
  
  function getVersion(data) {
    return (data.collection.version?data.collection.version:'0.0');
  }

  function getRootUrl(data) {
    return (data.collection.href?data.collection.href:'');  
  }

  function getLink(link) {
    var rtn;

    if(link.render && link.render==='image') {
      rtn = document.createElement('img');
      rtn.src = (link.href?link.href:'#');
      rtn.className = (link.rel?link.rel:'');
      rtn.alt = (link.prompt?link.prompt:rtn.src);
      rtn.title = rtn.alt;
    }
    else {
      rtn = document.createElement('a');
      rtn.href = (link.href?link.href:'#');
      rtn.rel = (link.rel?link.rel:'');
      rtn.appendChild(document.createTextNode((link.prompt?link.prompt:rtn.rel)));
      rtn.title = rtn.rel;
    }
    return rtn;  
  }

  // register events and return
  var that = {};
  that.init = init;
  return that;

}
