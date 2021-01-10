angular.module('app.db', []).service('db',function($rootScope)
{
    let _Host = "";
    let _Socket = null;
    let _MenuData = {};
    let _CardPayment = new CardPayment();
    let _MettlerScale = new MettlerScale();
    moment.locale('tr');
    let PosNo = "1";

    Number.prototype.toDigit2 = function()
    {
        return Math.round(Number(Math.round((this * 1000)) / 1000) * 100) / 100;
    }
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
            
            $rootScope.LoadingShow();

            _Socket.emit('QMikroDb', TmpQuery, function (data) 
            {
                $rootScope.LoadingHide();
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
                    $rootScope.MessageBox(data.result.err);                  
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
            $rootScope.LoadingShow();
            _Socket.emit('QMikroDb', pQuery, function(data) 
            {     
                $rootScope.LoadingHide();
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
                    $rootScope.MessageBox(data.result.err);
                    console.log("Mikro Sql Query Çalıştırma Hatası : " + data.result.err);
                }
            });
        }
        else
        {
            console.log("Server Erişiminiz Yok.");
        }
    }
    function _GetPromiseTag(pDb,pQueryTag,pQueryParam)
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
                resolve(data.result.recordset);
            });            
        });
    }    
    function _GetPromiseQuery(pQuery)
    {
        return new Promise(resolve => 
        {
            _SqlExecuteQuery(pQuery,function(data)
            {
                resolve(data.result.recordset);
            });            
        });
    } 
    function _ExecutePromiseTag(pDb,pQueryTag,pQueryParam)
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
                resolve(data);
            });            
        });
    }
    function _ExecutePromiseQuery(pQuery)
    {
        return new Promise(resolve => 
        {
            _SqlExecuteQuery(pQuery,function(data)
            {
                resolve(data);
            });            
        });
    }   
    function _PrintText(pData,pLen,pType)
    {
        if(pData.length > pLen)
        {
            pData = pData.toString().substring(0,pLen);
        }

        if(typeof pType == 'undefined')
        {
            return pData.toString().padEnd(pLen,' ');
        }
           
        if(pType == "End")
        {
            return pData.toString().padEnd(pLen,' ');
        }
        else if(pType == "Start")
        {
            return pData.toString().padStart(pLen,' ');
        }
    }
    function _SumColumn(pData,pColumn,pFilter)    
    {
        let Sum = 0;
        for(i=0;i<pData.length;i++)
        {
            if (typeof(pFilter) != "undefined")
            {
                if(pData[i][pFilter.toString().split('=')[0].trim()] == pFilter.toString().split('=')[1].trim())
                {
                    Sum += parseFloat(pData[i][pColumn]);
                }
            }
            else
            {
                Sum += pData[i][pColumn];
            }
        }
        
        return Sum;
    }
    function _EscposPrint(pData,pCallback)
    {
        if(typeof require == 'undefined')
        {
            pCallback();
            return;
        }
        const path = require('path');
        const escpos = require('escpos');
        escpos.USB = require('escpos-usb');
        
        let device  = new escpos.USB();
        let options = { encoding: "GB18030" /* default */ }
        let printer = new escpos.Printer(device, options);
        
        const imgpath = path.join(__dirname, '../../Logo.png');
        //B FONT 64 CHAR
        escpos.Image.load(imgpath, function(image)
        {
            device.open(function(error)
            {   
                console.log(error)
                printer.align('ct')
                .image(image, 's8')
                .then(() => 
                { 
                    //printer.cut().close(); 
                });

                for (let i = 0; i < pData.length; i++) 
                {
                    if(typeof pData[i].barcode != 'undefined')
                    {
                        printer.align(pData[i].align).barcode(pData[i].barcode,'CODE39',pData[i].options);                    
                    }
                    else
                    {                   
                        printer.size(0,0);
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
                        printer.text(pData[i].data,'857');
                    }                
                }                      
                        
                printer.cut().close
                (
                    function()
                    {
                        pCallback();
                    }
                );
            });      
        });
       
    }
    function _EscposCaseOpen()
    {
        if(typeof require == 'undefined')
        {
            return;
        }

        const escpos = require('escpos');
        escpos.USB = require('escpos-usb');

        let device  = new escpos.USB();
        let options = { encoding: "GB18030" /* default */ }
        let printer = new escpos.Printer(device, options);

        device.open(function(error)
        {
            // for (let i = 0; i < 5; i++) 
            // {
            //     printer.cashdraw(i+1);
            // }
            printer.cashdraw(2);
            printer.close();
        })
    }
    function _LCDPrint(pData)
    {
        if(typeof require == 'undefined')
        {
            return;
        }
        
        const escpos = require('escpos');
        escpos.Serial = require('escpos-serialport');
        escpos.Screen = require('escpos-screen');

        let device  = new escpos.Serial(pData.port, { baudRate: 9600, autoOpen: false });
        let options = { encoding: "GB18030" /* default */ }
        let usbScreen = new escpos.Screen(device,options);

        device.open(function(error)
        {
            usbScreen.blink(pData.blink);
            usbScreen.clear();
            usbScreen.text(pData.text).close();
        });
    }
    function _LCDClear(pPort)
    {
        if(typeof require == 'undefined')
        {
            return;
        }

        const escpos = require('escpos');
        escpos.Serial = require('escpos-serialport');
        escpos.Screen = require('escpos-screen');

        let device  = new escpos.Serial(pPort, { baudRate: 9600, autoOpen: false });
        let options = { encoding: "GB18030" /* default */ }
        let usbScreen = new escpos.Screen(device,options);

        device.open(function(error)
        {
            usbScreen.clear();
        });
    }
    function _PaymentSend(pPort,pTutar)
    {
        _CardPayment.transaction_start(pPort,pTutar);
    }
    function _ScaleSend(pPort,pPrice,pCallback)
    {
        _MettlerScale.ScaleSend(pPort,pPrice,pData =>
        {
           if(typeof pCallback != 'undefined')
           {
               pCallback(pData);
           } 
        });
    }
    function _Confirm(pMsg)
    {
        return new Promise(resolve => 
        {
            alertify.confirm(pMsg,
            ()=>
            {
                resolve(true);
            },
            ()=>
            {
                resolve(false)
            })
        });
    }
    function _Equal(pData,pColumn,pValue)
    {
        for(i=0;i<pData.length;i++)
        {
            if(pData[i][pColumn] == pValue)
            {
                return true;
            }
        }

        return false;
    }
    function _EqualToIndex(pData,pColumn,pValue)
    {
        for(i=0;i<pData.length;i++)
        {
            if(pData[i][pColumn] == pValue)
            {
                return i;
            }
        }

        return -1;
    }
    function _IsUnitBarcode(pValue)
    {
        if(pValue.length >= 12 && pValue.length <= 14 && (pValue.substring(0,2) == "20" || pValue.substring(0,2) == "02" || pValue.substring(0,2) == "29"))
        {      
           return true;
        }
        
        return false;
    }
    function _ListEqual(pData,pFiltre)
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
    //#region "PUBLIC"
    this.Socket = _Socket;
    this.CardPayment = _CardPayment;
    this.Connection = _Connection;
    this.ConnectionPromise = _ConnectionPromise;
    this.Disconnect = _Disconnect;
    this.SqlExecute = _SqlExecute;
    this.MenuData = _MenuData;
    this.GetPromiseTag = _GetPromiseTag;
    this.GetPromiseQuery = _GetPromiseQuery;
    this.ExecutePromiseTag = _ExecutePromiseTag;
    this.ExecutePromiseQuery = _ExecutePromiseQuery;
    this.SumColumn = _SumColumn;
    this.PrintText = _PrintText;
    this.SocketConnected = false;
    this.EscposCaseOpen = _EscposCaseOpen;
    this.LCDPrint = _LCDPrint;
    this.LCDClear = _LCDClear;
    this.PaymentSend = _PaymentSend;
    this.ScaleSend = _ScaleSend;
    this.Confirm = _Confirm;
    this.Equal = _Equal;
    this.IsUnitBarcode = _IsUnitBarcode;
    this.ListEqual = _ListEqual;
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
    this.MaxSira = function(pFirma,pQueryTag,pQueryParam,pCallback)
    {
        var m = 
        {
            db : pFirma,
            tag : pQueryTag,
            param : pQueryParam
        }
        _SqlExecute(m,function(data)
        {
            if(pCallback)
            {
                pCallback(data.result.recordset[0].MAXREFNO);
            }
        });
    }
    this.StokBarkodGetir = function(pFirma,pBarkod,pCallback)
    {
        let m = 
        {
            db : pFirma,
            tag : 'StokGetir',
            param : [pBarkod,'']
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
                        db : pFirma,
                        tag : 'BarkodGetir',
                        param : [pBarkod]
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
    this.ReceiptPrint = function(pSData,pTData,pVData,pParamData,pType,pCallback)
    {
        let TmpData = [];
        let TmpLine = {};
        let TmpOperator = "";
        
        if(pTData[0].DOC_TYPE == 1)
        {
            TmpOperator = "-"
        }
        // ÜST BİLGİ
        TmpData.push({font:"a",style:"b",align:"ct",data:""});
        TmpData.push({font:"a",style:"b",align:"ct",data:"Z.C. HECKENWALD N3"});
        TmpData.push({font:"a",style:"b",align:"ct",data:"57740 LONGEVILLE LES ST AVOLD"});
        TmpData.push({font:"a",style:"b",align:"ct",data:"Tel : 03 87 91 00 32"});
        TmpData.push({font:"a",style:"b",align:"ct",data:"longeville@prodorplus.fr"});
        TmpData.push({font:"a",style:"b",align:"ct",data:"www.prodorplus.fr"});

        if(pType == 'Fatura')
        {
            TmpData.push({font:"a",align:"ct",data:"------------------------------------------------"});
            TmpData.push({font:"a",align:"ct",data:"FACTURE"});
            TmpData.push({font:"a",align:"ct",data:"------------------------------------------------"});

            TmpData.push({font:"b",style:"b",align:"ct",data: _PrintText(" ",64)});

            TmpData.push({font:"b",style:"b",align:"lt",data: "Nom:.........................................................."});
            TmpData.push({font:"b",style:"b",align:"lt",data: "Adresse:......................................................"});
            TmpData.push({font:"b",style:"b",align:"lt",data: ".............................................................."});
            TmpData.push({font:"b",style:"b",align:"lt",data: ".............................................................."});

            TmpData.push({font:"b",style:"b",align:"ct",data: _PrintText(" ",64)});
        }

        TmpData.push({font:"b",align:"lt",data:_PrintText(moment(new Date()).locale('fr').format('dddd') + " " + moment(new Date()).format("DD.MM.YYYY"),59) + _PrintText(moment(new Date()).format("LTS"),5)});
        TmpData.push({font:"b",align:"lt",data:_PrintText("Caissier: " + pSData[0].CUSER,40) + _PrintText("Caisse: " + PosNo + " - Ticket: " + pVData[0].TICKET,24)});
        TmpData.push({font:"b",style:"b",align:"ct",data: _PrintText(" ",64)});                

        if(pType == 'Fatura')
        {
            TmpData.push({font:"b",style:"b",align:"ct",data: "DUPLICATA"});    
        }

        if(_Equal(pTData,"TYPE",0) && pTData[0].DOC_TYPE == 1)
        {
            TmpData.push({font:"b",style:"b",size : [1,1],align:"ct",data:"REMBOURSEMENT"});
            TmpData.push({font:"b",style:"b",align:"ct",data: _PrintText(" ",64)});
        }
        else if(_Equal(pTData,"TYPE",4))
        {
            TmpData.push({font:"b",style:"b",size : [1,1],align:"ct",data:"BON D'AVOIR"});
            TmpData.push({font:"b",style:"b",align:"ct",data: _PrintText(" ",64)});
        }

        //HEADER
        TmpLine = 
        {
            font:"b",
            style:"bu",
            align:"lt",
            data:"T " + 
                _PrintText("Libelle",37) + " " + 
                _PrintText("Qte",8) + " " + 
                _PrintText("P/u",7) + " " + 
                _PrintText("Prix",7)
        }
        TmpData.push(TmpLine);
        // SATIŞ LİSTESİ
        if(pType == 'Repas')
        {
            let TmpPrice = parseFloat(_SumColumn(pSData,"AMOUNT")) / pSData.Repas;
            
            TmpLine = 
            {
                font: "b",
                align: "lt",
                data:   "  " +
                        _PrintText("Repas complet(s)",34) + " " +
                        _PrintText(pSData.Repas,8,"Start") + " " + 
                        _PrintText(parseFloat(TmpPrice).toFixed(2),7,"Start") + " " + 
                        _PrintText(parseFloat(_SumColumn(pSData,"AMOUNT")).toFixed(2) + "EUR",10,"Start")
            }
            TmpData.push(TmpLine);
        }
        else
        {
            for (let i = 0; i < pSData.length; i++) 
            {
                let TmpQt = ""            
                
                if(Number.isInteger(parseFloat(pSData[i].QUANTITY)))
                {
                    TmpQt = pSData[i].QUANTITY + " " + pSData[i].UNIT_SHORT;
                }
                else
                {
                    TmpQt = parseFloat(parseFloat(pSData[i].QUANTITY).toFixed(3)) + " " + pSData[i].UNIT_SHORT;
                }
    
                TmpLine = 
                {
                    font: "b",
                    align: "lt",
                    data: _PrintText(pSData[i].VAT_TYPE) + " " +
                          _PrintText(pSData[i].ITEM_NAME,34) + " " +
                          _PrintText(TmpQt,8,"Start") + " " + 
                          _PrintText(parseFloat(pSData[i].PRICE).toFixed(2),7,"Start") + " " + 
                          _PrintText(parseFloat(pSData[i].AMOUNT).toFixed(2) + "EUR",10,"Start")
                }
                TmpData.push(TmpLine);
            }
        }
        
        TmpData.push({font:"b",style:"bu",align:"lt",data:_PrintText(" ",64)});

        TmpData.push({font:"a",align:"lt",data:_PrintText("Sous-Total ",33) + _PrintText(TmpOperator + parseFloat(_SumColumn(pSData,"AMOUNT")).toFixed(2) + " EUR",15,"Start")});
        if(pParamData[3] > 0)
        {            
            TmpData.push({font:"a",align:"lt",data:_PrintText("Remise Fidelite ",33) + _PrintText(parseFloat(parseFloat(pParamData[3]) / 100).toFixed(2).toString() + ' EUR',15,"Start")});
        }
        if(_SumColumn(pSData,"DISCOUNT") > 0)
        {
            TmpData.push({font:"a",align:"lt",data:_PrintText("Remise ",33) + _PrintText(parseFloat(_SumColumn(pSData,"DISCOUNT")).toFixed(2).toString() + ' EUR',15,"Start")});
        }
        
        //DİP TOPLAM
        TmpLine = 
        {
            font: "b",
            size : [1,1],
            style: "b",
            align: "lt",
            data: _PrintText("Total TTC",17) + 
                  _PrintText(TmpOperator + parseFloat(parseFloat(_SumColumn(pSData,"AMOUNT")) - (_SumColumn(pSData,"DISCOUNT") + parseFloat(parseFloat(pParamData[3]) / 100))).toFixed(2) + " EUR",15,"Start")
        }
        TmpData.push(TmpLine);
        //ÖDEME TOPLAMLARI
        for (let i = 0; i < pTData.length; i++) 
        {
            let TmpType = "";
            if(pTData[i].TYPE == 0)
                TmpType = "Espece" //BUNLAR PARAMETRİK OLACAK.
            else if (pTData[i].TYPE == 1)
                TmpType = "CB"
            else if(pTData[i].TYPE == 2)
                TmpType = "Cheque"
            else if(pTData[i].TYPE == 3)
                TmpType = "CHEQUEe"
            else if(pTData[i].TYPE == 4)
                TmpType = "BON D'AVOIR"
            else if(pTData[i].TYPE == 5)
                TmpType = "AVOIR"
            else if(pTData[i].TYPE == 6)
                TmpType = "VIRMENT"
            else if(pTData[i].TYPE == 7)
                TmpType = "PRLV"

            TmpLine = 
            {
                font: "a",
                align: "lt",
                data: _PrintText(TmpType,33) +
                      _PrintText(TmpOperator + parseFloat(_SumColumn(pTData,"AMOUNT","TYPE = " + pTData[i].TYPE)).toFixed(2) + " EUR",15,"Start")
            }
            TmpData.push(TmpLine);
        }

        if(_Equal(pTData,"TYPE",0))
        {
            //PARA ÜSTÜ
            TmpLine = 
            {
                font: "a",
                align: "lt",
                data: _PrintText("Recu",33) +
                    _PrintText(parseFloat((_SumColumn(pTData,"AMOUNT","TYPE = 0") + _SumColumn(pTData,"CHANGE"))).toFixed(2) + " EUR",15,"Start")
            }
            TmpData.push(TmpLine);
            //PARA ÜSTÜ
            TmpLine = 
            {
                font: "a",
                align: "lt",
                data: _PrintText("Rendu",33) +
                    _PrintText(parseFloat(_SumColumn(pTData,"CHANGE")).toFixed(2) + " EUR",15,"Start")
            }
            TmpData.push(TmpLine);
        }
        else if(_Equal(pTData,"TYPE",3))
        {
            //PARA ÜSTÜ
            TmpLine = 
            {
                font: "a",
                align: "lt",
                data: _PrintText("Surplus Tic. Rest.",33) +
                    _PrintText(parseFloat(_SumColumn(pTData,"CHANGE")).toFixed(2) + " EUR",15,"Start")
            }
            TmpData.push(TmpLine);
        }

        TmpData.push({font:"b",align:"lt",data:_PrintText(" ",64)});

        TmpLine = 
        {
            font: "b",
            style: "bu",
            align: "lt",
            data: _PrintText(" ",5) + " " +
                  _PrintText("Taux",10) + " " +
                  _PrintText("HT",10) + " " +
                  _PrintText("TVA",10) + " " +
                  _PrintText("TTC",10)
        }

        TmpData.push(TmpLine);        

        for (let i = 0; i < pVData.length; i++) 
        {
            TmpLine = 
            {
                font: "b",
                align: "lt",
                data: _PrintText(pVData[i].VAT_TYPE,5) + " " +
                      _PrintText(pVData[i].VAT + "%",10) + " " +
                      _PrintText(parseFloat(pVData[i].HT).toFixed(2),10) + " " + 
                      _PrintText(parseFloat(pVData[i].TVA).toFixed(2),10) + " " + 
                      _PrintText(parseFloat(pVData[i].TTC).toFixed(2),10)
            }
            TmpData.push(TmpLine);  
        }

        TmpData.push({font:"b",style:"b",align:"lt",data:_PrintText(" ",64)});
        TmpData.push({font:"b",align:"lt",data:_PrintText(pSData.length.toString() + " Aricle(s)",14)});
        
        if(pSData[0].CUSTOMER_CODE != pParamData[0])
        {            
            TmpData.push({align:"ct",barcode:pSData[0].CUSTOMER_CODE,options:{width: 1,height:30}});
            TmpData.push({font:"b",style:"b",align:"lt",data:_PrintText("****************************************************************",64)});
            TmpData.push({font:"b",align:"lt",data:_PrintText("CARTE DE FIDELITE / " + pSData[0].CUSTOMER_NAME,64)});
            TmpData.push({font:"b",align:"lt",data:_PrintText("ANCIEN CUMUL ",56) + _PrintText(pParamData[1] + ' Pts',8,"Start")});
            TmpData.push({font:"b",align:"lt",data:_PrintText("POINT ACQUIS SUR CE TICKET ",56) + _PrintText(pParamData[2] + ' Pts',8,"Start")});
            if(pParamData[3] > 0)
            {
                TmpData.push({font:"b",align:"lt",data:_PrintText("UTILISE POINT ",56) + _PrintText(pParamData[3] + ' Pts',8,"Start")});
            }
            TmpData.push({font:"b",align:"lt",data:_PrintText("NOUVEAU CUMUL ",56) + _PrintText((parseInt(pParamData[4]) - parseInt(pParamData[3])) + ' Pts',8,"Start")});
            TmpData.push({font:"b",align:"lt",data:_PrintText("EQUIVALENT REMISE ",56) + _PrintText(parseFloat(parseFloat(pParamData[4] - pParamData[3]) / 100).toFixed(2).toString() + ' EUR',8,"Start")});

            TmpData.push({font:"b",style:"b",align:"lt",data:_PrintText("****************************************************************",64)});
        }
        
        TmpData.push({font:"b",style:"b",align:"lt",data:_PrintText(" ",64)});
        console.log(1)
        if(_Equal(pTData,"TYPE",4))
        {
            console.log(2)
            TmpData.push({align:"ct",barcode:pParamData[5],options:{width: 1,height:90}});
            TmpData.push({font:"b",style:"b",align:"lt",data:_PrintText(" ",64)});
            TmpData.push({font:"b",style:"b",align:"ct",data:"Avoir valable 3 mois apres edition..."});
            console.log(TmpData)
        }
        else
        {
            TmpData.push({font:"b",style:"b",align:"ct",data:"Merci de votre fidelite a tres bientot ..."});    
        }

        TmpData.push({font:"b",style:"b",align:"lt",data:_PrintText(" ",64)});
        TmpData.push({font:"b",style:"b",align:"lt",data:_PrintText(" ",64)});
        
        TmpData.push({font:"b",align:"lt",data:_PrintText(" ",64)});

        _EscposPrint(TmpData,function()
        {
            pCallback();
        });
    }
    this.XReportPrint = function(pData,pCallback)
    {
        let TmpData = [];
        let TmpLine = {};
        // ÜST BİLGİ
        TmpData.push({font:"a",style:"b",align:"ct",data:""});
        TmpData.push({font:"a",style:"b",align:"ct",data:"Z.C. HECKENWALD N3"});
        TmpData.push({font:"a",style:"b",align:"ct",data:"57740 LONGEVILLE LES ST AVOLD"});
        TmpData.push({font:"a",style:"b",align:"ct",data:"Tel : 03 87 91 00 32"});
        TmpData.push({font:"a",style:"b",align:"ct",data:"longeville@prodorplus.fr"});
        TmpData.push({font:"a",style:"b",align:"ct",data:"www.prodorplus.fr"});

        TmpData.push({font:"a",align:"ct",data:"------------------------------------------------"});
        TmpData.push({font:"a",align:"ct",data:"RAPPORT Z no : "});
        TmpData.push({font:"a",align:"ct",data: pData[3][0].DATE + " " + pData[3][0].START_TIME + " - " + pData[3][0].FINISH_TIME});
        TmpData.push({font:"a",align:"ct",data: "No caisse : " + pData[3][0].DEVICE});
        TmpData.push({font:"a",align:"ct",data:"------------------------------------------------"});

        //HEADER
        TmpLine = 
        {
            font:"b",
            style:"bu",
            align:"lt",
            data:_PrintText(" ",38) + " " + 
                _PrintText("Nombre",9) + " " + 
                _PrintText("Montant",12,"Start")
        }
        TmpData.push(TmpLine);        

        for (let i = 0; i < pData[0].length; i++) 
        {
            TmpLine = 
            {
                font: "b",
                align: "lt",
                data: _PrintText(pData[0][i].TITLE,40) + " " +
                      _PrintText(pData[0][i].COUNT,7) + " " +
                      _PrintText(parseFloat(pData[0][i].AMOUNT).toFixed(2),12,"Start")
            }
            TmpData.push(TmpLine);
        }

        TmpData.push({font:"b",align:"lt",data:_PrintText(" ",64)});
        
        TmpLine = 
        {
            font: "b",
            style: "bu",
            align: "lt",
            data: _PrintText("Taux",35) + " " +
                  _PrintText("HT",10) + " " +
                  _PrintText("TVA",10) + " " +
                  _PrintText("TTC",5,"Start")
        }

        TmpData.push(TmpLine);    

        for (let i = 0; i < pData[1].length; i++) 
        {
            TmpLine = 
            {
                font: "b",
                align: "lt",
                data: _PrintText(pData[1][i].VAT + "%",35) + " " +
                      _PrintText(parseFloat(pData[1][i].HT).toFixed(2),10) + " " + 
                      _PrintText(parseFloat(pData[1][i].TVA).toFixed(2),10) + " " + 
                      _PrintText(parseFloat(pData[1][i].TTC).toFixed(2),5,"Start")
            }
            TmpData.push(TmpLine);  
        }

        TmpData.push({font:"b",align:"lt",data:_PrintText(" ",64)});
        TmpData.push({font:"b",style:"b",align:"lt",data:_PrintText("Encaissements Tickets",64)});

        TmpLine = 
        {
            font: "b",
            style: "bu",
            align: "lt",
            data: _PrintText("Mode",35) + " " +
                  _PrintText("Lib.",10,"Start") + " " +
                  _PrintText("Montant",15,"Start") + " "
        }
        TmpData.push(TmpLine); 

        for (let i = 0; i < pData[2].length; i++) 
        {
            TmpLine = 
            {
                font: "b",
                align: "lt",
                data: _PrintText(pData[2][i].TYPE ,35) + " " +
                      _PrintText(pData[2][i].COUNT,10,"Start") + " " + 
                      _PrintText(parseFloat(pData[2][i].AMOUNT).toFixed(2),15,"Start")
            }
            TmpData.push(TmpLine);  
        }

        TmpLine = 
        {
            font: "b",
            style: "b",
            align: "lt",
            data: _PrintText("TOTAL : ",35,"Start") + " " +
                  _PrintText(_SumColumn(pData[2],"COUNT"),10,"Start") + " " +
                  _PrintText(parseFloat(_SumColumn(pData[2],"AMOUNT")).toFixed(2),15,"Start") + " "
        }

        TmpData.push(TmpLine); 

        TmpData.push({font:"b",align:"lt",data:_PrintText(" ",64)});
        TmpData.push({font:"b",style:"b",size:[1,1],align:"ct",data:_PrintText("REEL")});

        TmpLine = 
        {
            font: "b",
            style: "bu",
            align: "lt",
            data: _PrintText("Mode",35) + " " +
                  _PrintText("Lib.",10,"Start") + " " +
                  _PrintText("Montant",15,"Start") + " "
        }

        TmpData.push(TmpLine); 

        let TmpEspece = 0;
        let TmpEspeceR = 0;

        if(_EqualToIndex(pData[2],"TYPE","Espece") > -1)
        {
            TmpLine = 
            {
                font: "b",
                align: "lt",
                data: _PrintText(pData[2][_EqualToIndex(pData[2],"TYPE","Espece")].TYPE ,35) + " " +
                        _PrintText(pData[2][_EqualToIndex(pData[2],"TYPE","Espece")].COUNT,10,"Start") + " " + 
                        _PrintText(parseFloat(pData[2][_EqualToIndex(pData[2],"TYPE","Espece")].AMOUNT).toFixed(2),15,"Start")
            }
            
            TmpEspece = parseFloat(pData[2][_EqualToIndex(pData[2],"TYPE","Espece")].AMOUNT);
            TmpData.push(TmpLine); 
        }

        if(_EqualToIndex(pData[2],"TYPE","Espece - Remboursement") > -1)
        {
            TmpLine = 
            {
                font: "b",
                align: "lt",
                data: _PrintText(pData[2][_EqualToIndex(pData[2],"TYPE","Espece - Remboursement")].TYPE ,35) + " " +
                        _PrintText(pData[2][_EqualToIndex(pData[2],"TYPE","Espece - Remboursement")].COUNT,10,"Start") + " " + 
                        _PrintText(parseFloat(pData[2][_EqualToIndex(pData[2],"TYPE","Espece - Remboursement")].AMOUNT).toFixed(2),15,"Start")
            }
            TmpEspeceR = parseFloat(pData[2][_EqualToIndex(pData[2],"TYPE","Espece - Remboursement")].AMOUNT);
            TmpData.push(TmpLine); 
        }

        TmpLine = 
        {
            font: "b",
            align: "lt",
            data: _PrintText(" " ,35) + " " +
                    _PrintText("Sous TOTAL :",10,"Start") + " " + 
                    _PrintText(parseFloat(TmpEspece + TmpEspeceR).toFixed(2),15,"Start")
        }

        TmpData.push(TmpLine); 

        if(_EqualToIndex(pData[2],"TYPE","Carte Bancaire TPE") > -1)
        {
            TmpLine = 
            {
                font: "b",
                align: "lt",
                data: _PrintText(pData[2][_EqualToIndex(pData[2],"TYPE","Carte Bancaire TPE")].TYPE ,35) + " " +
                        _PrintText(pData[2][_EqualToIndex(pData[2],"TYPE","Carte Bancaire TPE")].COUNT,10,"Start") + " " + 
                        _PrintText(parseFloat(pData[2][_EqualToIndex(pData[2],"TYPE","Carte Bancaire TPE")].AMOUNT).toFixed(2),15,"Start")
            }
            
            TmpData.push(TmpLine); 
        }

        if(_EqualToIndex(pData[2],"TYPE","Cheque") > -1)
        {
            TmpLine = 
            {
                font: "b",
                align: "lt",
                data: _PrintText(pData[2][_EqualToIndex(pData[2],"TYPE","Cheque")].TYPE ,35) + " " +
                        _PrintText(pData[2][_EqualToIndex(pData[2],"TYPE","Cheque")].COUNT,10,"Start") + " " + 
                        _PrintText(parseFloat(pData[2][_EqualToIndex(pData[2],"TYPE","Cheque")].AMOUNT).toFixed(2),15,"Start")
            }
            
            TmpData.push(TmpLine); 
        }

        if(_EqualToIndex(pData[2],"TYPE","CHEQUEe") > -1)
        {
            TmpLine = 
            {
                font: "b",
                align: "lt",
                data: _PrintText(pData[2][_EqualToIndex(pData[2],"TYPE","CHEQUEe")].TYPE ,35) + " " +
                        _PrintText(pData[2][_EqualToIndex(pData[2],"TYPE","CHEQUEe")].COUNT,10,"Start") + " " + 
                        _PrintText(parseFloat(pData[2][_EqualToIndex(pData[2],"TYPE","CHEQUEe")].AMOUNT).toFixed(2),15,"Start")
            }
            
            TmpData.push(TmpLine); 
        }

        TmpLine = 
        {
            font: "b",
            style: "b",
            align: "lt",
            data: _PrintText("TOTAL : ",35,"Start") + " " +
                  _PrintText(_SumColumn(pData[2],"COUNT"),10,"Start") + " " +
                  _PrintText(parseFloat(_SumColumn(pData[2],"AMOUNT")).toFixed(2),15,"Start") + " "
        }

        TmpData.push(TmpLine); 

        TmpData.push({font:"b",align:"lt",data:_PrintText(" ",64)});
        TmpData.push({font:"b",align:"lt",data:_PrintText(" ",64)});
        TmpData.push({font:"b",align:"lt",data:_PrintText(" ",64)});

        _EscposPrint(TmpData,function()
        {
            if(typeof pCallback != 'undefined')
            {
                pCallback();
            }
        });
    }
     //#endregion "PUBLIC"
});