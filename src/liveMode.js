const { JSHINT } = require("jshint")
const { errors } = require("jshint/src/messages");
const fs = require("fs")
const dialog = require('electron').remote.dialog
window.JSHINT = JSHINT
var editorHtml = CodeMirror(document.getElementById("htmlCode"),{
    theme: "duotone-dark",
    lineNumbers: true,
    mode: "xml",
    autoCloseTags: true,
    autoCloseBrackets: true,
    autocorrect: true,
    lint: true,
    gutters: ['CodeMirror-linenumbers', "CodeMirror-foldgutter"],
    scrollbarStyle: "overlay",
    
})



editorHtml.setSize(640, 300)



  
var editorCss = CodeMirror(document.getElementById("cssCode"),{
    theme: "duotone-dark",
    lineNumbers: true,
    mode: "css",
    autoCloseTags: true,
    autoCloseBrackets: true,
    autocorrect: true,
    lint: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-lint-markers', "CodeMirror-foldgutter"],
    scrollbarStyle: "overlay",
})
editorCss.setSize(660, 300)

editorCss.on("keydown", function (cm, event) {
    if (
      !(event.ctrlKey) &&
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 97 && event.keyCode <= 122) ||
      (event.keyCode >= 46 && event.keyCode <= 57)
    ) {
      CodeMirror.commands.autocomplete(cm, null, { completeSingle: false });
  
    }
  });
  var widgets = []
  

var editorJs = CodeMirror(document.getElementById("jsCode"),{
    lineNumbers: true,
    theme: "duotone-dark",
    mode: "javascript",
    autoCloseTags: true,
    autoCloseBrackets: true,
    autocorrect: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-lint-markers', "CodeMirror-foldgutter"],
  lineWrapping: true,
  lint: true,
  scrollbarStyle: "overlay",
})

editorJs.setSize(640, 300)

editorJs.on("keydown", function (cm, event) {
    if (
      !(event.ctrlKey) &&
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 97 && event.keyCode <= 122) ||
      (event.keyCode >= 46 && event.keyCode <= 57)
    ) {
      CodeMirror.commands.autocomplete(cm, null, { completeSingle: false });
  
    }
  });
  
  var widgets = []
function updateHints() {
  editorJs.operation(function () {
    for (var i = 0; i < widgets.length; ++i)
      editorJs.removeLineWidget(widgets[i]);
    widgets.length = 0;

    JSHINT(editorJs.getValue());
    console.log(JSHINT.errors.length)
    for (var i = 0; i < JSHINT.errors.length; ++i) {
      var err = JSHINT.errors[i];

      if (!err) continue;

      var msg = document.createElement("div");
      var icon = msg.appendChild(document.createElement("span"));
      icon.innerHTML = "!!";
      icon.className = "lint-error-icon";
      msg.appendChild(document.createTextNode(err.reason));
      msg.className = "lint-error";
      widgets.push(editorJs.addLineWidget(err.line - 1, msg, { coverGutter: false, noHScroll: true }));

    }
  });
  var info = editorJs.getScrollInfo();
  var after = editorJs.charCoords({ line: editorJs.getCursor().line + 1, ch: 0 }, "local").top;

  if (info.top + info.clientHeight < after)
    editorJs.scrollTo(null, after - info.clientHeight + 3);

}

function refreshLiveView(){
    var html = editorHtml.getValue()
    var css = "<style>"+editorCss.getValue()+"</style>"
    var js = +editorJs.getValue()
    var output = document.getElementById("output")
    output.contentDocument.body.innerHTML = html + css
}
document.getElementById("amplify").addEventListener("click", ()=>{
    var output = document.getElementById("output")

    if(output.style.width != "41em"){
        output.style.gridColumn = "9/17";
    output.style.gridRow = "9/16"
    output.style.height = "18.6em"
    output.style.width = "41em"
    }else{
        output.style.gridColumn = "1/18";
        output.style.gridRow = "1/17"
        output.style.height = "100%"
        output.style.width = "100%"
    }
  
    
  
   
  
})

setInterval(refreshLiveView, 1000)

document.getElementById("saveProject").addEventListener("click", ()=>{
dialog.showSaveDialog({properties:["openDirectory"]}).then((result)=>{
var directorypath = result.filePath;
var css = editorCss.getValue() 
var js = editorJs.getValue()
var html = editorHtml.getValue() 
fs.mkdirSync(directorypath)
fs.writeFileSync(directorypath+"/CSS_Codit_Live_Mode.css",css)
fs.writeFileSync(directorypath+"/JS_Codit_Live_Mode.js", js)
fs.writeFileSync(directorypath+"/HTML_Codit_Live_Mode.html", html)



})

})

