const { app, BrowserWindow, Menu } = require("electron")
const path = require("path")
app.on("ready", () => {
    var indexPage
    indexPage = new BrowserWindow({
        title: "Codit",
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, "DCode.js")

            
        }

    })
indexPage.loadFile("DCode.html")
})