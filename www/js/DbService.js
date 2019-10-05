//const moment = require("moment");

angular.module('app.db', []).service('db',function($rootScope)
{
    let _Host = "";
    let _LocalDb = new LocalDb(this);
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
        if(localStorage.mode == 'true')
        {
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
        else
        {
            
            TmpQuery = JSON.parse(JSON.stringify(window["QueryLocal"][pParam.tag]));

            if (typeof (TmpQuery.param) != 'undefined')
            {
                for(i = 0;i < TmpQuery.param.length;i++)
                {  
                    let pVal = pParam.param[i];

                    if(TmpQuery.type[i] == "date")
                    {
                        let TmpDate = moment(pParam.param[i],'DD.MM.YYYY');

                        pVal = TmpDate.year().toString() + '-' + (TmpDate.month() + 1).toString().padStart(2,'0') + '-' + TmpDate.date().toString().padStart(2,'0')
                    }

                    TmpQuery.query = TmpQuery.query.replace('@' + TmpQuery.param[i],pVal);
                    TmpQuery.query = TmpQuery.query.replace('@' + TmpQuery.param[i],pVal);
                    TmpQuery.query = TmpQuery.query.replace('@' + TmpQuery.param[i],pVal);
                    TmpQuery.query = TmpQuery.query.replace('@' + TmpQuery.param[i],pVal);
                }
                pParam.param = [];
            } 

            _LocalDb.GetData(TmpQuery,pParam.param,function(data)
            {
                if(typeof(data.result.err) == 'undefined')
                {
                    var args = arguments;
                    $rootScope.$apply(function () 
                    {
                        if (pCallback) 
                        {
                            pCallback.apply(null, args);
                        }
                    });
                }
                else
                {
                    console.log("Mikro Sql Query Çalıştırma Hatası : " + data.result.err);
                }
            });
        }
    }
    function _SqlExecuteQuery(pQuery,pCallback)
    {
        if(localStorage.mode == 'true')
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
        else
        {
            _LocalDb.GetData(pQuery,pQuery.value,function(data)
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
    }
    function _GetPromiseTag(pFirma,pQueryTag,pQueryParam,pCallback)
    {
        return new Promise(resolve => 
        {
            var m = 
            {
                db : '{M}.' + pFirma,
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
    function _ExecutePromiseTag(pFirma,pQueryTag,pQueryParam,pCallback)
    {
        return new Promise(resolve => 
        {
            var m = 
            {
                db : '{M}.' + pFirma,
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
    this.LocalDb = _LocalDb;
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
    this.GetData = function(pFirma,pQueryTag,pQueryParam,pCallback)
    {
        var m = 
        {
            db : '{M}.' + pFirma,
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
    this.ExecuteTag = function(pFirma,pQueryTag,pQueryParam,pCallback)
    {
        var m = 
        {
            db : '{M}.' + pFirma,
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
    this.FillCmbDocInfo = function(pFirma,pQueryTag,pCallback)
    {
        var m = 
        {
            db : '{M}.' + pFirma,
            tag : pQueryTag
        }
        _SqlExecute(m,function(data)
        {
            if(pCallback)
            {
                pCallback(data.result.recordset);
            }
        });
    }
    this.MaxSira = function(pFirma,pQueryTag,pQueryParam,pCallback)
    {
        var m = 
        {
            db : '{M}.' + pFirma,
            tag : pQueryTag,
            param : pQueryParam
        }
        _SqlExecute(m,function(data)
        {
            if(pCallback)
            {
                pCallback(data.result.recordset[0].MAXEVRSIRA);
            }
        });
    }
    this.DepoGetir = function(pFirma,pDepoListe,pCallback)
    {
        let TmpQuery = 
        {
            db : '{M}.' + pFirma,
            query:  window["QuerySql"]["CmbDepoGetir"].query                
        }

        if(localStorage.mode != 'true')
        {
            TmpQuery.query = window["QueryLocal"]["CmbDepoGetir"].query;
            TmpQuery.value = [];
        }

        if(pDepoListe != "")
        {
            TmpQuery.query = TmpQuery.query + " WHERE dep_no IN (" + pDepoListe + ")";
        }
        
        _SqlExecuteQuery(TmpQuery,function(data)
        {
            if(pCallback)
            {
                if(typeof data.result.err == 'undefined')
                {
                    pCallback(data.result.recordset);
                }
                else
                {
                    console.log(data.result.err)
                }
            }
        });                
    }
    this.StokBarkodGetir = function(pFirma,pBarkod,pDepoNo,pCallback)
    {
        let m = 
        {
            db : '{M}.' + pFirma,
            tag : 'BarkodGetir',
            param : [pBarkod,pDepoNo]
        }
        _SqlExecute(m,function(data)
        {
            if(pCallback)
            {
                
                if(data.result.recordset.length > 0)
                {
                    pCallback(data.result.recordset);
                }
                else
                {
                    let m = 
                    {
                        db : '{M}.' + pFirma,
                        tag : 'StokGetir',
                        param : [pBarkod,'',pDepoNo,'']
                    }
                    _SqlExecute(m,function(data)
                    {
                        if(pCallback)
                        {
                            pCallback(data.result.recordset);
                        }
                    });
                }
            }
        });
    }
    this.FiyatGetir = async function (pFirma,BarkodData,pFiyatParam,pEvrParam,pCallback)
    {
        let FiyatParam = [BarkodData[0].KODU,1,pFiyatParam.DepoNo,pFiyatParam.OdemeNo];
        let Fiyat = 0;

        if(pEvrParam.FiyatListe  == 0)
            FiyatParam[1] = pFiyatParam.CariFiyatListe;
        else
            FiyatParam[1] = pEvrParam.FiyatListe;

        // FİYAT GETİR
        await _GetPromiseTag(pFirma,'FiyatGetir',FiyatParam,function(FiyatData)
        {   
            if(FiyatData.length > 0)
            {   
                BarkodData[0].FIYAT = FiyatData[0].FIYAT;
            }
            else
            {
                BarkodData[0].FIYAT = 0;
            }
        });

        if(pFiyatParam.AlisSatis == 0)
        {
            // SON ALIŞ GETİR
            if(pEvrParam.SonAlisFiyati == 1)
            {
                await _GetPromiseTag(pFirma,'SonAlisFiyatGetir',[pFiyatParam.CariKodu,BarkodData[0].KODU,pFiyatParam.DepoNo],function(SonAlisFiyatData)
                {
                    if(SonAlisFiyatData.length > 0)
                        BarkodData[0].FIYAT = SonAlisFiyatData[0].SONFIYAT;
                });
            }
            // ALIŞ ŞARTI GETİR
            if(pEvrParam.AlisSarti == 1)
            {
                await _GetPromiseTag(pFirma,'AlisSartiGetir',[pFiyatParam.CariKodu,BarkodData[0].KODU],function(AlisSartiData)
                {
                    if(AlisSartiData.length > 0)
                        BarkodData[0].FIYAT = SonAlisFiyatData[0].FIYAT;
                });
            }
        }
        else
        {
            // SON SATIŞ FİYATI GETİR
            if(pEvrParam.SonSatisFiyati == 1)
            {
                await _GetPromiseTag(pFirma,'SonSatisFiyatGetir',[pFiyatParam.CariKodu,BarkodData[0].KODU],function(SonSatisFiyatData)
                {
                    if(SonSatisFiyatData.length > 0)
                        BarkodData[0].FIYAT = SonSatisFiyatData[0].SONFIYAT;
                });
            }
            // SATIŞ ŞARTI GETİR
            if(pEvrParam.SatisSarti == 1)
            {
                await _GetPromiseTag(pFirma,'SatisSartiGetir',[pFiyatParam.CariKodu,BarkodData[0].KODU,pFiyatParam.DepoNo],function(SatisSartiData)
                {
                    if(SatisSartiData.length > 0)
                        BarkodData[0].FIYAT = SatisSartiData[0].FIYAT;
                });
            }
        }

        if(pCallback)
        {
            Fiyat = BarkodData[0].FIYAT;
            pCallback(Fiyat);
        }
    }
    this.KiloBarkod = function(pBarkod,pParam)
    {
        // KİLO BARKODU KONTROLÜ - RECEP KARACA 10.09.2019
        let Kilo = pBarkod;
        let KiloFlag = pParam.Sistem.KiloFlag;
        let FlagDizi = KiloFlag.split(',')
        let Flag = Kilo.slice(0,2);
        let Miktar = 1;

        for (i = 0; i < FlagDizi.length; i++ )
        {
            if(Flag == FlagDizi[i])
            {
                var kBarkod = Kilo.slice(0,pParam.Sistem.KiloBaslangic);
                var Uzunluk = Kilo.slice(pParam.Sistem.KiloBaslangic,((pParam.Sistem.KiloBaslangic)+(pParam.Sistem.KiloUzunluk)));
                pBarkod = kBarkod
                Miktar = (Uzunluk / pParam.Sistem.KiloCarpan)
            }
        }
        
        let pResult = {Barkod : pBarkod,Miktar : Miktar};
        return pResult;
    }
     //#endregion "PUBLIC"
});