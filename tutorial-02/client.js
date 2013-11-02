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
      }
      else {
        alert('*** ERROR: '+ajax.status+'\n'+ajax.statusText);
      }
    }
  }
  
  // register events and return
  var that = {};
  that.init = init;
  return that;

}
