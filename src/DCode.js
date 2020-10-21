const { JSHINT }  = require("jshint");
const { errors } = require("jshint/src/messages");
var editor = CodeMirror(document.getElementById("codeeditor"), {
    mode: "javascript",
    theme: "duotone-dark",
    lineNumbers: true,
    autocorrect: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers',  'CodeMirror-lint-markers'],
    lineWrapping: true,
    lint: true,
    scrollbarStyle: "overlay"
});

window.JSHINT = JSHINT


editor.on("keydown", function (cm, event) {
    if (
      !(event.ctrlKey) &&
      (event.keyCode >= 65 && event.keyCode <= 90) || 
      (event.keyCode >= 97 && event.keyCode <= 122) || 
      (event.keyCode >= 46 && event.keyCode <= 57)
    ) {
      CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
      
    }
  });

  var widgets = []
function updateHints() {
  console.log("Xd")
  editor.operation(function(){
    for (var i = 0; i < widgets.length; ++i)
      editor.removeLineWidget(widgets[i]);
    widgets.length = 0;

    JSHINT(editor.getValue());
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
      widgets.push(editor.addLineWidget(err.line - 1, msg, {coverGutter: false, noHScroll: true}));
      
    }
  });
  var info = editor.getScrollInfo();
  var after = editor.charCoords({line: editor.getCursor().line + 1, ch: 0}, "local").top;

  if (info.top + info.clientHeight < after)
    editor.scrollTo(null, after - info.clientHeight + 3);
    
  }
  

document.getElementById("codeeditor").addEventListener("keyup", ()=>{
  var errorscode = JSHINT.errors
  console.log(errorscode)
  document.querySelector(".numberOfErrors").innerHTML = errorscode.length
})  

  
