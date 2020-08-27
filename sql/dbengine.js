let fs = require('fs');
let _sql = require("./sqllib");
let io = require('socket.io')();
let lic = require('./license');

let msql;
let tsql;

let LicKullanici = 0;
let LicMenu = "";

function dbengine(config)
{    
    this.config = config;
    io.listen(config.port);   
}

io.on('connection', function(socket) 
{
    //console.log(io.engine.clientsCount);
    // if(Object.keys(io.sockets.connected).length > LicKullanici)
    // {
    //     socket.emit('MaxUserCounted');
    // }
    // else
    // {
    //     socket.emit('MaxUserCounted',LicMenu);
    // }
    
    // SerialBarcode();

    // function SerialBarcode()
    // {        
    //     let SerialCount = 0;
    //     let Barcode = "";

    //     port.on('data', function (data) 
    //     {  
    //         SerialCount++;
    //         Barcode = Barcode + data.toString("utf8")

    //         if(SerialCount == 2)
    //         {
    //             socket.emit('SerialBarcode',
    //             {
    //                 result : Barcode
    //             });
                
    //             SerialCount = 0;
    //             Barcode = "";            
    //         }
    //     })
    // }

    socket.on('GetMenu',function(pParam,pFn)
    {
        if(Object.keys(io.sockets.connected).length > LicKullanici)
        {
            pFn('');
        }
        else
        {
            pFn(LicMenu);
        }
    });
    socket.on('TryConnection', function(name,fn)
    {
        msql = new _sql(config.server, '',config.uid,config.pwd,config.trustedConnection);
        msql.TryConnection(function(status)
        {
            if(status == true)
                fn(true);
            else
                fn(false);
        });
    });
    socket.on('QMikroDb',function(pQuery,fn) 
    {   
        try
        {
            let TmpDb = config.database;

            if (typeof(pQuery.db) != "undefined") 
            {
                if(pQuery.db.indexOf("{M}.") > -1)
                    TmpDb = config.database + '_' + pQuery.db.replace('{M}.','');
                else
                    TmpDb = pQuery.db;            
            }
            
            msql = new _sql(config.server,TmpDb,config.uid,config.pwd,config.trustedConnection);
            msql.QueryPromise(pQuery,function(data)
            {
                let obj = JSON.parse(data);
                socket.emit('RMikroDb',
                {
                    tag : pQuery.tag, 
                    result : obj
                });   
                fn({tag : pQuery.tag,result : obj});
            });
        }
        catch(err)
        {
            var tmperr = { err : 'Error dbengine.js QMikroDb errCode : 107 - ' + err} 
            socket.emit('RMikroDb',
            {
                tag : pQuery.tag, 
                result : tmperr
            });  

            fn({tag : pQuery.tag,result : tmperr});
            console.log(tmperr);
        }
    });
    socket.on("QSMikroDb",function(pQuery)
    {
        try
        {
            msql = new _sql(config.server, pQuery.db,config.uid,config.pwd,config.trustedConnection);
            msql.QueryStream(pQuery,function(data)
            {
                var obj = JSON.parse(data);
                socket.emit('RSMikroDb',
                {
                    tag : pQuery.tag, 
                    result : obj
                });   
            });
        }
        catch(err)
        {
            var tmperr = { err : 'Error dbengine.js QSMikroDb errCode : 108 - ' + err} 
            socket.emit('RSMikroDb',
            {
                tag : pQuery.tag, 
                result : tmperr
            });  
            console.log(tmperr);
        }
    });
    socket.on('QToneDb',function(pQuery) 
    {   
        try
        {
            tsql = new _sql(config.server,config.tonedb,config.uid,config.pwd,config.trustedConnection);
            tsql.QueryPromise(pQuery,function(data)
            {
                var obj = JSON.parse(data);
                socket.emit('RToneDb',
                {
                    tag : pQuery.tag, 
                    result : obj
                });   
            });
        }
        catch(err)
        {
            var tmperr = { err : 'Error dbengine.js QToneDb errCode : 107 - ' + err} 
            socket.emit('RToneDb',
            {
                tag : pQuery.tag, 
                result : tmperr
            });  
            console.log(tmperr);
        }
    });
    socket.on("QSToneDb",function(pQuery)
    {
        try
        {
            tsql = new _sql(config.server,config.tonedb,config.uid,config.pwd,config.trustedConnection);
            tsql.QueryStream(pQuery,function(data)
            {
                var obj = JSON.parse(data);
                socket.emit('RSToneDb',
                {
                    tag : pQuery.tag, 
                    result : obj
                });   
            });
        }
        catch(err)
        {
            var tmperr = { err : 'Error dbengine.js QSToneDb errCode : 108 - ' + err} 
            socket.emit('RSToneDb',
            {
                tag : pQuery.tag, 
                result : tmperr
            });  
            console.log(tmperr);
        }
    });
    socket.on("ParamSave",function(pParam,fn)
    {
        let FilePath = "";
        if(typeof process.env.APP_DIR_PATH != 'undefined')
        {
            FilePath = process.env.APP_DIR_PATH + "/.";
        }
        
        fs.writeFile(FilePath + pParam[1],'var Param = ' + JSON.stringify(pParam[0], null, '\t'),function(err)
        {
            if(typeof(err) != "undefined")
                fn(true);
            else
                fn(false);
        });
    });
    socket.on("EscposPrint",function(pData,fn)
    {
        let device  = new escpos.USB();
        let options = { encoding: "GB18030" /* default */ }
        let printer = new escpos.Printer(device, options);
        //B FONT 64 CHAR
        device.open(function(error)
        {            
            printer.flush();

            for (let i = 0; i < pData.length; i++) 
            {
                printer.size(1,1);

                printer.font(pData[i].font);
                printer.align(pData[i].align);

                if(typeof pData[i].style != 'undefined')
                {
                    printer.style(pData[i].style);
                }
                else
                {
                    printer.style("normal");
                }
                
                if(typeof pData[i].size != 'undefined')
                {
                    printer.size(pData[i].size[0],pData[i].size[1]);
                }
                
                printer.text(pData[i].data);
            }                                    
            printer.cut().close
            (
                function()
                {
                    fn();
                }
            );
        });        
    });
    socket.on("EscposCaseOpen",function()
    {
        let device  = new escpos.USB(config.EpsonUSB.Vid, config.EpsonUSB.Pid);
        let options = { encoding: "GB18030" /* default */ }
        let printer = new escpos.Printer(device, options);

        device.open(function(error)
        {
            for (let i = 0; i < 5; i++) 
            {
                printer.cashdraw(i+1);
            }

            printer.close();
        })
    });
    socket.on("LCDPrint",function(pData)
    {
        let device  = new escpos.Serial(config.LineDisplay, { baudRate: 9600, autoOpen: false });
        let options = { encoding: "GB18030" /* default */ }
        let usbScreen = new escpos.Screen(device,options);

        device.open(function(error)
        {
            usbScreen.blink(pData.blink);
            usbScreen.clear();
            usbScreen.text(pData.text).close();
        });
    });
    socket.on("LCDClear",function()
    {
        let device  = new escpos.Serial(config.LineDisplay, { baudRate: 9600, autoOpen: false });
        let options = { encoding: "GB18030" /* default */ }
        let usbScreen = new escpos.Screen(device,options);

        device.open(function(error)
        {
            usbScreen.clear();
        });
    });
});

module.exports = dbengine;