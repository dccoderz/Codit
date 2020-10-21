const dialog = require('electron').remote.dialog
const fs = require("fs")


document.getElementById("addFile").addEventListener("click",function () {
  
    dialog.showSaveDialog({properties: ["openDirectory"]}).then((result)=>{
        var file = result.filePath;
        var editor = document.getElementsByClassName("CodeMirror-line")
       
        for(i=0; i<editor.length; i++){
            fs.appendFileSync(file, editor[i].innerText + " \n" , (err)=>{
                if(err){
                    alert("Un error a ocurrido" + err.message)
                }
               
            })
        }
        

        }
        )
        
    

    
})
