var Service = require('node-windows').Service;
const path = require('path');

var svc = new Service
({
    name:'XPOS',
    description: 'XPOS',
    script: path.join(process.cwd(), '..\\server.js'),
    env: 
    [
        {
            name: 'APP_DIR_PATH',
            value: process.cwd()
        }
    ]
});

svc.on('install',function()
{
    svc.start();
});

svc.install();