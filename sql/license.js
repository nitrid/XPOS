var MacId = require('node-machine-id');

var LicIo = require('socket.io-client');
var LicSoc = LicIo.connect('http://licence.teknoticari.com:8090',{'timeout':2000, 'connect timeout': 2000});

function LicenseCheck(callback)
{
    if(typeof callback != 'undefined')
    {
        LicSoc.on('connect', function () 
        {   
            console.log('MacId : ' + MacId.machineIdSync());
            
            LicSoc.emit('licensecheck',{MacId:MacId.machineIdSync()},function(data)
            {
                if(data.result.length > 0)
                {
                    callback(data);
                }
                else
                {
                    callback(data);
                }
            });            
        });
        LicSoc.on('connect_error', function (socket) 
        {
            callback("");            
        });
    }
}
module.exports.LicenseCheck = LicenseCheck;
