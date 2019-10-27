angular.module('app.db', []).service('db',function($rootScope)
{
    let _Host = "";
    let _Socket = null;
    let _MenuData = {};
    moment.locale('tr');

    if (typeof(localStorage.host) !== "undefined") 
    {
        _Host = 'http://' + localStorage.host + ':' + localStorage.socketport;
    }
    if (typeof(localStorage.mode) !== "undefined")
    {
        if(localStorage.mode == 'true')
        {
            $('#inputBasicOn').trigger("click");
        }
    }
    else
    {
        localStorage.mode = 'false';
    }
    function _Connection(pCallback)
    {
        if(_Socket == null || _Socket.connected == false)
        {
            _Socket = io.connect(_Host,{autoConnect: false,reconnectionDelay:10});
            _Socket.open();
    
            _Socket.on('MaxUserCounted',function(MenuData)
            {               
                if (typeof(MenuData) !== "undefined")
                {
                    _MenuData = MenuData;
                }
                else
                {
                    _Socket.disconnect();
                
                    $('#alert-box').html('<div class="alert alert-icon alert-danger alert-dismissible" role="alert" id="alert">' +
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                        '<span aria-hidden="true">&times;</span>' +
                        '</button>' +
                        '<i class="icon wb-bell" aria-hidden="true"></i> Maksimum kullanıcı sayısına eriştiniz... Diğer kullanıcılardan çıkınız ya da ek lisans satın alınız.' +
                        '</div>');
                }
            });

            _Socket.on('connect',(data) => 
            {
                this.SocketConnected = true;
                if(typeof pCallback != 'undefined')
                {
                    pCallback(true);    
                }
            });
            _Socket.on('connect_error',(error) => 
            {
                this.SocketConnected = false;                    
                console.log('connect_error');

                if(typeof pCallback != 'undefined')
                {
                    pCallback(false);
                }
            });
            _Socket.on('error', (error) => 
            {
                this.SocketConnected = false;
                if(typeof pCallback != 'undefined')
                {
                    pCallback(false);
                }
            });
        }
        else
        {
            this.SocketConnected = true;
            if(typeof pCallback != 'undefined')
            {
                pCallback(true);    
            }
        }
    }
    function _ConnectionPromise(pCallback)
    {
        return new Promise(resolve => 
        {
            _Connection(function(data)
            {
                if(typeof pCallback != 'undefined')
                {
                    pCallback(data)   
                }

                resolve();
            });
        });
    }
    function _Disconnect()
    {
        this.SocketConnected = false;
        _Socket.disconnect();
    }
    function _SqlExecute(pParam,pCallback)
    {   
        let TmpQuery;
        if(_Socket.connected)
        {
            TmpQuery = window["QuerySql"][pParam.tag];
            TmpQuery.value = pParam.param;
            TmpQuery.db = pParam.db;
            
            _Socket.emit('QMikroDb', TmpQuery, function (data) 
            {
                if(typeof(data.result.err) == 'undefined')
                {
                    var args = arguments;
                    $rootScope.$apply(function () 
                    {
                        if (pCallback) 
                        {
                            pCallback.apply(_Socket, args);
                        }
                    });
                }
                else
                {                        
                    console.log("Mikro Sql Query Çalıştırma Hatası : " + data.result.err);
                }
            });
        }
        else
        {
            console.log("Server Erişiminiz Yok.");
        }        
    }
    function _SqlExecuteQuery(pQuery,pCallback)
    {
        if(_Socket.connected)
        {
            _Socket.emit('QMikroDb', pQuery, function(data) 
            {     
                if(typeof(data.result.err) == 'undefined')
                {
                    var args = arguments;
                    $rootScope.$apply(function () 
                    {
                        if (pCallback) 
                        {
                            pCallback.apply(_Socket, args);
                        }
                    });
                }
                else
                {
                    console.log("Mikro Sql Query Çalıştırma Hatası : " + data.result.err);
                }
            });
        }
        else
        {
            console.log("Server Erişiminiz Yok.");
        }
    }
    function _GetPromiseTag(pDb,pQueryTag,pQueryParam,pCallback)
    {
        return new Promise(resolve => 
        {
            var m = 
            {
                db : pDb,
                tag : pQueryTag,
                param : pQueryParam
            }
            _SqlExecute(m,function(data)
            {
                if(pCallback)
                {
                    pCallback(data.result.recordset);
                    resolve();
                }
            });            
        });
    }    
    function _GetPromiseQuery(pQuery,pCallback)
    {
        return new Promise(resolve => 
        {
            _SqlExecuteQuery(pQuery,function(data)
            {
                if(pCallback)
                {
                    pCallback(data.result.recordset);
                    resolve();
                }
            });            
        });
    } 
    function _ExecutePromiseTag(pDb,pQueryTag,pQueryParam,pCallback)
    {
        return new Promise(resolve => 
        {
            var m = 
            {
                db : pDb,
                tag : pQueryTag,
                param : pQueryParam
            }
            _SqlExecute(m,function(data)
            {
                if(pCallback)
                {
                    pCallback(data);
                    resolve();
                }
            });            
        });
    }
    function _ExecutePromiseQuery(pQuery,pCallback)
    {
        return new Promise(resolve => 
        {
            _SqlExecuteQuery(pQuery,function(data)
            {
                if(pCallback)
                {
                    pCallback(data);
                    resolve();
                }
            });            
        });
    }   
    //#region "PUBLIC"
    this.Socket = _Socket;
    this.Connection = _Connection;
    this.ConnectionPromise = _ConnectionPromise;
    this.Disconnect = _Disconnect;
    this.SqlExecute = _SqlExecute;
    this.MenuData = _MenuData;
    this.GetPromiseTag = _GetPromiseTag;
    this.GetPromiseQuery = _GetPromiseQuery;
    this.ExecutePromiseTag = _ExecutePromiseTag;
    this.ExecutePromiseQuery = _ExecutePromiseQuery;
    this.SocketConnected = false;
    // $APPLY YERİNE YAPILDI.
    this.SafeApply = function(pScope,pFn) 
    {
        var phase = pScope.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') 
        {
          if(pFn && (typeof(pFn) === 'function')) 
          {
            pFn();
          }
        } else 
        {
            pScope.$apply(pFn);
        }
    };     
    this.SetHost = function(host,port)
    {
        _Host = 'http://' + host + ':' + port;
        //_Socket.io.uri = _Host;
    }
    this.On = function(eventName,callback)
    {   
        _Socket.on(eventName, function(data) 
        {   
            var args = arguments;
            $rootScope.$apply(function()
            {   
                callback.apply(_Socket, args);
            });
        });
    }
    this.Emit = function(eventName,data,callback)
    {        
        _Socket.emit(eventName, data, function () 
        {
            var args = arguments;
            $rootScope.$apply(function () 
            {
                if (callback) 
                {
                  callback.apply(_Socket, args);
                }
            });
        });
    }
    this.GetData = function(pDb,pQueryTag,pQueryParam,pCallback)
    {
        var m = 
        {
            db : pDb,
            tag : pQueryTag,
            param : pQueryParam
        }
        _SqlExecute(m,function(data)
        {
            if(pCallback)
            {
                pCallback(data.result.recordset);
            }
        });
    }
    this.GetDataQuery = function(pQuery,pCallback)
    {
        _SqlExecuteQuery(pQuery,function(data)
        {
            if(pCallback)
            {
                pCallback(data.result.recordset);
            }
        });
    }    
    this.ExecuteTag = function(pDb,pQueryTag,pQueryParam,pCallback)
    {
        var m = 
        {
            db : pDb,
            tag : pQueryTag,
            param : pQueryParam
        }
        _SqlExecute(m,function(data)
        {
            if(pCallback)
            {
                pCallback(data);
            }
        });
    }
    this.ExecuteQuery = function(pQuery,pCallback)
    {
        _SqlExecuteQuery(pQuery,function(data)
        {
            if(pCallback)
            {
                pCallback(data);
            }
        });
    }
    this.SumColumn = function(pData,pColumn,pFilter)    
    {
        let Sum = 0;
        for(i=0;i<pData.length;i++)
        {
            if (typeof(pFilter) != "undefined")
            {
                if(pData[i][pFilter.toString().split('=')[0].trim()] == pFilter.toString().split('=')[1].trim())
                {
                    Sum += pData[i][pColumn];
                }
            }
            else
            {
                Sum += pData[i][pColumn];
            }
        }
        
        return Sum;
    }
    this.ListEqual = function(pData,pFiltre)
    {
        let Deger = true;
        if(pData.length > 0)
        {
            for(let x = 0;x < pData.length;x++)
            {  
                for(let i = 0;i < Object.keys(pFiltre).length;i++)
                {   
                    if(pData[x][Object.keys(pFiltre)[i]] != Object.values(pFiltre)[i])
                    {
                        Deger = false;
                    }
                }

                if(Deger)
                {   
                    return pData[x];
                }
                else
                {
                    Deger = true;
                }
            }
        }
        else
        {  
            return null;
        }
        return null;
    }
     //#endregion "PUBLIC"
});