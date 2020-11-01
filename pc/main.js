const electron = require('electron');
const url = require('url');
const path = require('path');

const {app,BrowserWindow,Menu} = electron;
app.allowRendererProcessReuse = false
let mainWindow;

app.on('ready',function()
{
    mainWindow = new BrowserWindow(
    {
        webPreferences: 
        {
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        },
        //fullscreen: true
    });
    mainWindow.maximize()
    //mainWindow.setMenu(null)
    mainWindow.loadURL('http://localhost:8088/_pos');

    // const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    // Menu.setApplicationMenu(mainMenu);
});

const mainMenuTemplate = 
[
    {
        label : "Settings"
    }
]
