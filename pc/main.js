const electron = require('electron');
const url = require('url');
const path = require('path');
const fs = require("fs");

const {app,BrowserWindow,Menu} = electron;
app.allowRendererProcessReuse = false
let mainWindow;

app.on('ready',function()
{    
    fs.readFile('config.json', function (err, data) 
    {
        if (err) 
        {
          return console.error(err);
        }

        mainWindow = new BrowserWindow(
        {
            webPreferences: 
            {
                nodeIntegration: true,
                nodeIntegrationInWorker: true
            },
            //fullscreen: true
        });
        mainWindow.maximize();
        //mainWindow.setMenu(null)
        let TmpConfig = JSON.parse(data.toString())
        mainWindow.loadURL(TmpConfig.host);
        
        // const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
        // Menu.setApplicationMenu(mainMenu);
    });
});

const mainMenuTemplate = 
[
    {
        label : "Settings"
    }
]
