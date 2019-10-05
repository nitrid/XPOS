var LocalDb = 
(
    function()
    {
        var Listeners = Object();
        var _FirmaDb;
        function LocalDb(Service)
        {
            _Service = Service;
        }
        LocalDb.prototype.OpenDatabase = function(pDbName,callback)
        {
            _DbName = pDbName; 
            _FirmaDb = openDatabase(pDbName, '', pDbName, 100 * 1024 * 1024);
            
            if(typeof callback != 'undefined')
            {
                CreateDatabase(function(data)
                {
                    callback(data);
                });  
            }
        }
        LocalDb.prototype.ExistTblSys = function(tblname,status)
        {
            _FirmaDb.transaction(function(t)
            {
                t.executeSql("SELECT NAME FROM sqlite_master WHERE type = 'table' AND name = ?"
                ,[tblname],
                function(trans,result)
                {
                    if(result.rows.length > 0)
                    {
                        status(true);
                    }
                    else
                    { 
                        status(false);
                    }
                });
            });        
        }
        LocalDb.prototype.CreateDatabase = CreateDatabase;
        LocalDb.prototype.GetData = function(pQuery,pParam,Callback)
        {
            _FirmaDb.transaction(function(pTrans)
            {
                pTrans.executeSql(pQuery.query
                ,pParam,
                function(pTran,pResult)
                {
                    var recordset = [];
                    var result =
                    {
                        result : {recordset : []}
                    }    

                    for(i = 0;i < pResult.rows.length;i++)
                    {
                        recordset.push(pResult.rows[i]);
                    }
                     
                    if(typeof Callback != 'undefined')               
                    {
                        Callback({result:{recordset:recordset}});                                   
                    }
                },
                function(pTran,err)
                {
                    var result =
                    {
                        result : { err : 'Error LocalDb errCode : 108 - ' + err.message} 
                    }
                    if(typeof Callback != 'undefined')               
                    {
                        Callback(result);                                   
                    }
                });
            });
        };
        LocalDb.prototype.Execute = function(pQuery,pParam,Callback)
        {
            _FirmaDb.transaction(function(pTrans)
            {
                pTrans.executeSql(pQuery.query
                ,pParam,
                function(pTran,pResult)
                {
                    var result =
                    {
                        result : {recordset : pResult.rows}
                    }                     
                    if(typeof Callback != 'undefined')               
                    {
                        Callback(result);                                   
                    }                                  
                },
                function(pTran,err)
                {
                    var result =
                    {
                        result : { err : 'Error LocalDb errCode : 108 - ' + err.message} 
                    }
                    if(typeof Callback != 'undefined')               
                    {
                        Callback(result);                                   
                    }
                });
            });
        }
        function CreateDatabase(callback)
        {
            callback(1); //AKTARIM BAŞLADI
            LocalEvent({MasterMsg : 'Tablolar Oluşturuluyor.'});
            
            CreateTables(function(state)
            {                
                LocalEvent({MasterMsg : 'Kayıtlar Aktarılıyor.'});

                DataTransfers(function(x)
                {
                    LocalEvent({MasterMsg : 'Kayıtlar Aktarıldı.'});
                    callback(2); //AKTARIM BİTTİ
                });          
            });            
        }
        async function CreateTables(callback)
        {
            try
            {   
                await CreateTable(QueryLocal.AdresTbl);
                await CreateTable(QueryLocal.AlisSartiTbl);
                await CreateTable(QueryLocal.AltGrupTbl);
                await CreateTable(QueryLocal.AnaGrupTbl);
                //await CreateTable(QueryLocal.BankaTbl);
                await CreateTable(QueryLocal.BarkodTbl);
                await CreateTable(QueryLocal.BedenHarTbl);
                await CreateTable(QueryLocal.BirimTbl);
                await CreateTable(QueryLocal.CariTbl);
                await CreateTable(QueryLocal.CariFoyTbl);
                await CreateTable(QueryLocal.CariHarTbl);
                await CreateTable(QueryLocal.DepoTbl);
                //await CreateTable(QueryLocal.DepoSiparisTbl);
                //await CreateTable(QueryLocal.DepoSiparisStokTbl);
                await CreateTable(QueryLocal.EtiketBasTbl);
                //await CreateTable(QueryLocal.EvrakAciklamaTbl);
                await CreateTable(QueryLocal.FiyatTbl);
                //await CreateTable(QueryLocal.IsEmirleriTbl);
                await CreateTable(QueryLocal.IskontoTbl)
                //await CreateTable(QueryLocal.KasaTbl);
                //await CreateTable(QueryLocal.KonharTbl);
                //await CreateTable(QueryLocal.MarkaTbl);
                await CreateTable(QueryLocal.OdemePlanTbl);
                await CreateTable(QueryLocal.PersonelTbl);
                await CreateTable(QueryLocal.ProjelerTbl);
                await CreateTable(QueryLocal.ReyonTbl);
                await CreateTable(QueryLocal.SatisSartiTbl);
                await CreateTable(QueryLocal.SayimTbl);
                //await CreateTable(QueryLocal.SenetTbl);
                //await CreateTable(QueryLocal.SenetCekTbl);
                //await CreateTable(QueryLocal.SeriNoTbl);
                //await CreateTable(QueryLocal.SeriNoHarTbl);
                await CreateTable(QueryLocal.SiparisTbL);
                await CreateTable(QueryLocal.SiparisStokTbl);
                await CreateTable(QueryLocal.SonAlisFiyatiTbl);
                await CreateTable(QueryLocal.SonSatisFiyatiTbl);
                await CreateTable(QueryLocal.SorumlulukMrkzTbl);
                await CreateTable(QueryLocal.StokTbl);
                await CreateTable(QueryLocal.StokHarTbl);
                await CreateTable(QueryLocal.UreticiTbl);
                //await CreateTable(QueryLocal.UretimStokTbl);
                await CreateTable(QueryLocal.VergiTbl);  
                
                await CreateTable(QueryLocal.ParamTbl);  

                callback(true);
            }
            catch(err)
            {
                callback(false);
            }
        }  
        async function DataTransfers(callback)
        {
            try
            {   
               // await DataTransfer(QueryLocal.AdresTbl, QuerySql.AdresTbl, DataTransferCallback);
               //await DataTransfer(QueryLocal.AlisSartiTbl, QuerySql.AlisSartiTbl,DataTransferCallback);
                await DataTransfer(QueryLocal.AltGrupTbl, QuerySql.AltGrupTbl, DataTransferCallback);
                await DataTransfer(QueryLocal.AnaGrupTbl, QuerySql.AnaGrupTbl, DataTransferCallback);
                //await DataTransfer(QueryLocal.BankaTbl, QuerySql.BankaTbl, DataTransferCallback);
                await DataTransfer(QueryLocal.BarkodTbl, QuerySql.BarkodTbl, DataTransferCallback);
                await DataTransfer(QueryLocal.BirimTbl, QuerySql.BirimTbl, DataTransferCallback);
                await DataTransfer(QueryLocal.CariTbl, QuerySql.CariTbl, DataTransferCallback);
                await DataTransfer(QueryLocal.CariFoyTbl, QuerySql.CariFoyTbl, DataTransferCallback);
                await DataTransfer(QueryLocal.DepoTbl, QuerySql.DepoTbl, DataTransferCallback);
                await DataTransfer(QueryLocal.DepoSiparisStokTbl, QuerySql.DepoSiparisStok, DataTransferCallback);
               // await DataTransfer(QueryLocal.FiyatTbl, QuerySql.FiyatTbl, DataTransferCallback);
                //await DataTransfer(QueryLocal.IsEmirleriTbl, QuerySql.IsEmirleriTbl, DataTransferCallback);
               // await DataTransfer(QueryLocal.IskontoTbl, QuerySql.IskontoTbl, DataTransferCallback);
                //await DataTransfer(QueryLocal.KasaTbl, QuerySql.KasaTbl, DataTransferCallback);
                //await DataTransfer(QueryLocal.MarkaTbl, QuerySql.MarkaTbl, DataTransferCallback);
                await DataTransfer(QueryLocal.OdemePlanTbl, QuerySql.OdemePlanTbl, DataTransferCallback);
                await DataTransfer(QueryLocal.PersonelTbl, QuerySql.PersonelTbl, DataTransferCallback);
                await DataTransfer(QueryLocal.ProjelerTbl, QuerySql.ProjelerTbl, DataTransferCallback); 
                //await DataTransfer(QueryLocal.ReyonTbl, QuerySql.ReyonTbl, DataTransferCallback);
               // await DataTransfer(QueryLocal.SatisSartiTbl, QuerySql.SatisSartiTbl, DataTransferCallback);
                //await DataTransfer(QueryLocal.SenetTbl, QuerySql.SenetTbl, DataTransferCallback);
                await DataTransfer(QueryLocal.SiparisStokTbl, QuerySql.SiparisStokTbl, DataTransferCallback);
               // await DataTransfer(QueryLocal.SonAlisFiyatiTbl, QuerySql.SonAlisFiyatiTbl, DataTransferCallback);
               // await DataTransfer(QueryLocal.SonSatisFiyatiTbl, QuerySql.SonSatisFiyatiTbl, DataTransferCallback);
                await DataTransfer(QueryLocal.SorumlulukMrkzTbl, QuerySql.SorumlulukMrkzTbl, DataTransferCallback)
                await DataTransfer(QueryLocal.StokTbl, QuerySql.StokTbl, DataTransferCallback);
                //await DataTransfer(QueryLocal.UreticiTbl, QuerySql.UreticiTbl, DataTransferCallback);
                //await DataTransfer(QueryLocal.UretimStokTbl, QuerySql.UretimStokTbl, DataTransferCallback);
               // await DataTransfer(QueryLocal.VergiTbl, QuerySql.VergiTbl, DataTransferCallback);

                callback(true);
            }
            catch(err)
            {
                callback(false);
            }
        }
        function CreateTable(pQuery)
        {   
            return new Promise(resolve => 
            {
                //TABLO SİLİNİYOR
                _FirmaDb.transaction(function(pTrans)
                {
                    pTrans.executeSql('DROP TABLE IF EXISTS ' + pQuery.tag
                    ,[],
                    function(pTran,pResult)
                    {
                        LocalEvent({MasterMsg : 'Tablolar Oluşturuluyor.',AltMsg : pQuery.tag + ' Tablosu Silindi.'});
                    },
                    function(pTran,err)
                    {
                        console.log(err);
                    });
                });
                //TABLO OLUŞTURULUYOR
                _FirmaDb.transaction(function(pTrans)
                {   

                    pTrans.executeSql(pQuery.query
                    ,[],
                    function(pTran,pResult)
                    {   
                        LocalEvent({MasterMsg : 'Tablolar Oluşturuluyor.',AltMsg : pQuery.tag + ' Tablosu Oluşturuldu.'});
                        resolve();
                    },
                    function(pTran,err)
                    {
                        console.log(err);
                        resolve();
                    });
                });
            });
        }    
        function DataTransfer(pLocal,pSql,callback)
        {
            return new Promise(resolve => 
            {
                LocalEvent({MasterMsg : 'Kayıtlar Aktarılıyor.',AltMsg : pLocal.tag + ' Aktarımı İçin Kayıtlar Getiriliyor.'});
                pSql.db = '{M}.' + _DbName;
                
                _Service.Emit('QMikroDb',pSql,(data) =>
                {
                    console.log(data)
                    if(typeof data.result.err == 'undefined')
                    {
                        let status = {count:data.result.recordset.length,index:0,tag:pLocal.tag};        
                        _FirmaDb.transaction(function(pTrans)
                        {
                            if(data.result.recordset.length > 0)
                            {   
                                data.result.recordset.forEach(function(item)
                                {
                                    pTrans.executeSql(pLocal.insert
                                    ,Object.values(item),
                                    function(pTran,pResult)
                                    {                                   
                                        status.index += 1;                                    
                                        callback(status);                                   
    
                                        if(status.index == status.count)
                                        {
                                            resolve();   
                                        } 
                                    },
                                    function(pTran,err)
                                    {
                                        status.index += 1;
                                        status.err = err;
                                        callback(status);
    
                                        if(status.index == status.count)
                                        {
                                            resolve();   
                                        } 
                                    });
                                });
                            }
                            else
                            {
                                resolve();
                            }
                        });
                    }
                    else
                    {
                        resolve(); 
                    }
                });
            });  
        }  
        function DataTransferCallback(pStatus)
        {
            LocalEvent({MasterMsg : 'Kayıtlar Aktarılıyor.',AltMsg : pStatus.tag + ' Tablosuna Kayıt Aktarılıyor.',Status : pStatus});

            if(typeof pStatus.err != 'undefined')
            {
                LocalEvent({MasterMsg : 'Kayıtlar Aktarılıyor.',AltMsg : pStatus.tag + ' Tablosunun Aktarımında Hata.'});
            }
        }
        LocalDb.prototype.DataParTransfer = function()
        {
            DataParTransfer();
        }
        function DataParTransfer()
        {
            console.log("SA")
        }
        //#region "EVENT TRIGGER"        
        function LocalEvent(pData)
        {
            EventTrigger('TransferEvent',pData);
        }
        function EventTrigger(evt, params) 
        {
            if (evt in Listeners) 
            {
                callbacks = Listeners[evt];
                for (var x in callbacks)
                {
                    callbacks[x](params);
                }
            } 
            else
            {
                console.log("No listeners found for " + evt);
            }
        }
        LocalDb.prototype.On = function(evt, callback) 
        {
            //console.log("Listener added: " + evt);
    
            if (!Listeners.hasOwnProperty(evt))
                Listeners[evt] = Array();
    
                Listeners[evt].push(callback);      
        }
        LocalDb.prototype.Emit = EventTrigger;
        //#endregion EVENT TRIGGER
        return LocalDb;
    }    
)();