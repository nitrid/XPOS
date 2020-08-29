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
});

module.exports = dbengine;