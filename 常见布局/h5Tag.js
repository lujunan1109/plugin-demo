function doOnload() {
    setTimeout("downloadFile()",1000);
  }
  
  window.onload = doOnload;
  
  function downloadFile() {
      downloadCss("http://abc.com/css/a.css");
      downloadJS("http://abc.com/js/a.js");
}

function downloadCss(url) {
    var ele = document.createElement('link');
    ele.rel = "stylesheet";
    ele.type = "text/css";
    ele.href = url;

    document.body.appendChild(ele);
}

function downloadJS(url) {
    var ele = document.createElement('script');
    document.body.appendChild(ele);
}