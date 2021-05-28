function SiparisEvrakCtrl ($scope,$window,db)
{
    document.onkeydown = function(e)
    {
        if($("#TbBarkod").hasClass('active') && (document.activeElement.id != 'TxtMiktar' && document.activeElement.id != 'TxtFiyat'))
        {
            $window.document.getElementById("TxtBarkod").focus();
        }
    }
    function TblEvrakInit()
    {
        if(typeof TmpGrid != 'undefined')
        {
            TmpGrid.deselectAll();
            TmpGrid.clearSelection();
        }
        TmpGrid = $("#TblEvrakSecim").dxDataGrid(
        {
            dataSource: $scope.EvrakSecimListe,
            allowColumnReordering: true,
            showBorders: true,
            filterRow: 
            { 
                visible: true
            },
            headerFilter: {
                visible: true
            },
            paging: 
            {
                pageSize: 15
            },
            pager: 
            {
                showPageSizeSelector: true,
                allowedPageSizes: [15, 30, 90, 120, 500, 1000],
                showInfo: true
            },
            selection: 
            {
                mode: "single"
            },
            columns: 
            [
                {
                    dataField: "REF",
                    caption: db.Language($scope.Lang,"REF"),
                    dataType: "string"
                },
                {
                    dataField: "REF_NO",
                    caption: db.Language($scope.Lang,"REF NO"),
                    dataType: "string"
                },
                {
                    dataField: "TO",
                    caption: db.Language($scope.Lang,"NEREDEN"),
                    dataType: "string"
                },
                {
                    dataField: "FROM",
                    caption: db.Language($scope.Lang,"NEREYE"),
                    dataType: "string"
                },
                {
                    dataField: "AMOUNT",
                    caption: db.Language($scope.Lang,"TUTAR"),
                    dataType: "string"
                }
            ],
            onSelectionChanged: function(selectedItems) 
            {
                if(selectedItems.selectedRowsData.length > 0)
                {
                    $scope.TxtSeri = selectedItems.selectedRowsData[0].REF;
                    $scope.TxtSira = selectedItems.selectedRowsData[0].REF_NO;
                    $scope.$apply()
                }
            }
        }).dxDataGrid("instance");        
    }
    function TblCariInit()
    {
        if(typeof TmpGrid != 'undefined')
        {
            TmpGrid.deselectAll();
            TmpGrid.clearSelection();
        }
        TmpGrid = $("#TblCariSecim").dxDataGrid(
        {
            dataSource: $scope.CariSecimListe,
            allowColumnReordering: true,
            showBorders: true,
            selection: 
            {
                mode: "single"
            },
            filterRow: 
            { 
                visible: true
            },
            headerFilter: {
                visible: true
            },
            paging: 
            {
                pageSize: 15
            },
            pager: 
            {
                showPageSizeSelector: true,
                allowedPageSizes: [15, 30, 90, 120, 500, 1000],
                showInfo: true
            },
            columns: 
            [
                {
                    dataField: "CODE",
                    caption: db.Language($scope.Lang,"CODE"),
                    dataType: "string"
                },
                {
                    dataField: "NAME",
                    caption: db.Language($scope.Lang,"NAME"),
                    dataType: "string"
                }
            ],
            onSelectionChanged: function(selectedItems) 
            {
                if(selectedItems.selectedRowsData.length > 0)
                {
                    $scope.TxtCari = selectedItems.selectedRowsData[0].CODE;
                    $scope.$apply();
                }
            }
        }).dxDataGrid("instance");        
    }
    function TblStokInit()
    {
        if(typeof TmpGrid != 'undefined')
        {
            TmpGrid.deselectAll();
            TmpGrid.clearSelection();
        }
        TmpGrid = $("#TblStokSecim").dxDataGrid(
        {
            dataSource: $scope.StokSecimListe,
            allowColumnReordering: true,
            showBorders: true,
            selection: 
            {
                mode: "single"
            },
            filterRow: 
            { 
                visible: true
            },
            headerFilter: {
                visible: true
            },
            paging: 
            {
                pageSize: 15
            },
            pager: 
            {
                showPageSizeSelector: true,
                allowedPageSizes: [15, 30, 90, 120, 500, 1000],
                showInfo: true
            },
            columns: 
            [
                {
                    dataField: "CODE",
                    caption: db.Language($scope.Lang,"CODE"),
                    dataType: "string"
                },
                {
                    dataField: "NAME",
                    caption: db.Language($scope.Lang,"NAME"),
                    dataType: "string"
                }
            ],
            onSelectionChanged: function(selectedItems) 
            {
                if(selectedItems.selectedRowsData.length > 0)
                {
                    $scope.TxtBarkod = selectedItems.selectedRowsData[0].CODE;
                    $scope.$apply();
                }
            }
        }).dxDataGrid("instance");        
    }
    function TblIslemInit()
    {
        let Grd = $("#TblIslem").dxDataGrid(
        {
            dataSource: $scope.IslemListe,
            allowColumnReordering: true,
            allowColumnResizing: true,
            showBorders: true,
            columnResizingMode: "nextColumn",
            columnMinWidth: 50,
            columnAutoWidth: true,
            width:"100%",
            paging: 
            {
                enabled: false
            },
            editing: 
            {
                mode: "batch",
                allowUpdating: true,
                allowDeleting: true
            },
            bindingOptions: 
            {
                dataSource : "IslemListe"
            },
            columns: 
            [
                {
                    dataField: "ITEM_CODE",
                    caption: db.Language($scope.Lang,"Kodu"),
                    allowEditing: false,
                    width: "20%"
                },     
                {
                    dataField: "ITEM_NAME",
                    caption: db.Language($scope.Lang,"Adı"),
                    alignment: "center",
                    allowEditing: false,
                    width: "40%"
                }, 
                {
                    dataField: "QUANTITY",
                    caption: db.Language($scope.Lang,"Miktar"),
                    dataType: "number",
                    alignment: "center",
                    allowEditing: true,
                    width: "10%",
                    cellTemplate: function(element, info)
                    {
                        let TmpTutar = info.data.QUANTITY * info.data.PRICE
                        $scope.IslemListe[info.rowIndex].AMOUNT = TmpTutar;
                        element.append("<div>" + info.text + "</div>")
                    }
                }, 
                {
                    dataField: "PRICE",
                    caption: db.Language($scope.Lang,"Fiyat"),
                    dataType: "number",
                    allowEditing: false,
                    width: "10%"
                }, 
                {
                    dataField: "AMOUNT",
                    caption : db.Language($scope.Lang,"Tutar"),
                    dataType: "number",
                    alignment: "center",
                    allowEditing: false,
                    width: "10%"
                }
            ],
            onRowUpdated: function(e) 
            {         
                let TmpTutar = e.data.QUANTITY * e.data.PRICE;
                e.data.VAT = TmpTutar - (TmpTutar / ((e.data.VATRATE / 100) + 1));
                let InserData = 
                [
                    e.data.GUID,
                    $scope.Kullanici,
                    e.data.ITEM_CODE,
                    e.data.QUANTITY,
                    e.data.PRICE,
                    e.data.DISCOUNT,
                    e.data.VAT
                ]
                db.ExecuteTag($scope.Firma,'SiparisSatirUpdate',InserData,async function(pData)
                {
                    $scope.BtnTemizle();

                    let TmpData = await EvrakGetir($scope.TxtSeri,$scope.TxtSira,$scope.EvrTip,$scope.Tip);
                    $scope.IslemListe = TmpData;
                    TblIslemInit();
                    $scope.EvrLock = true;
                    $scope.$apply();
                });
            },
            onRowRemoved: function(e) 
            {
                db.ExecuteTag($scope.Firma,'SiparisSatirDelete',[0,e.data.GUID],async function(data)
                {
                    $scope.BtnTemizle();

                    let TmpData = await EvrakGetir($scope.TxtSeri,$scope.TxtSira,$scope.EvrTip,$scope.Tip);
                    if(TmpData.length > 0)
                    {
                        $scope.IslemListe = TmpData;
                        TblIslemInit();
                        $scope.EvrLock = true;
                        $scope.$apply();
                    }
                    else
                    {
                        $scope.Init();
                    }
                });
            },
        }).dxDataGrid("instance");
    }
    function CmbBirimInit()
    {
        $scope.Cmb.Birim = 
        {
            width: "100%",
            dataSource: $scope.BirimListe,
            displayExpr: "NAME",
            valueExpr: "TYPE",
            value: "",
            showClearButton: true,
            searchEnabled: true,
            bindingOptions: 
            {
                value: "Birim",
                dataSource : "BirimListe"
            },
            onSelectionChanged : function(e)
            {                
                if(e.selectedItem == null)
                {
                    $scope.Birim = ""
                }
                else
                {
                    $scope.TxtCarpan = $scope.BirimListe[$scope.Birim].FACTOR;
                    $scope.MiktarFiyatValid();
                }
            }
        }
    }
    function BirimGetir(pKodu)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT " +
                        "[TYPE] AS [TYPE], " +
                        "[NAME] AS [NAME], " +
                        "[FACTOR] AS [FACTOR] " +
                        "FROM ITEM_UNIT WHERE ITEM_CODE = @ITEM_CODE ORDER BY [TYPE] ASC",
                param:  ['ITEM_CODE'],
                type:   ['string|25'],
                value:  [pKodu]
            }
            db.GetDataQuery(TmpQuery,function(pData)
            {
                resolve(pData);
            });
        });
    }
    function StokGetir(pBarkod)
    {
        db.StokBarkodGetir($scope.Firma,pBarkod,async function(BarkodData)
        {
            $scope.StokListe = BarkodData;
            if($scope.StokListe.length > 0)
            {
                $scope.BirimListe = await BirimGetir($scope.StokListe[0].CODE);                
                CmbBirimInit();
                $scope.Birim = 0;
                
                let TmpTutar = 0;

                $scope.TxtStokBilgi = $scope.StokListe[0].CODE + " - " + $scope.StokListe[0].NAME;
                $scope.TxtMiktar = 1;
                $scope.TxtCarpan = $scope.BirimListe[$scope.Birim].FACTOR;
                $scope.TxtFiyat = $scope.StokListe[0].PRICE;
                TmpTutar = $scope.StokListe[0].PRICE * ($scope.TxtMiktar * $scope.StokListe[0].FACTOR);
                $scope.TxtKdv = TmpTutar - (TmpTutar / (($scope.StokListe[0].VAT / 100) + 1));
                $scope.TxtTutar = TmpTutar - $scope.TxtKdv;
                $scope.TxtIndirim = 0;
                $scope.TxtTopTutar = TmpTutar;                
                
                $window.document.getElementById("TxtMiktar").focus();
                $window.document.getElementById("TxtMiktar").select();
                $scope.$apply();
            }
            else
            {
                alertify.alert("Ürün Bulunamadı !")
                $scope.BtnTemizle();                
            }
        });
    }
    function EvrakGetir(pSeri,pSira,pEvrTip,pTip)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT *, " + 
                        "ISNULL((SELECT VAT FROM ITEMS WHERE CODE = ITEM_CODE),0) AS VATRATE " +
                        "FROM ORDER_VW_01 WHERE REF = @REF AND REF_NO = @REF_NO AND TYPE = @TYPE AND DOC_TYPE = @DOC_TYPE",
                param:  ['REF','REF_NO','DOC_TYPE','TYPE'],
                type:   ['string|25','int','int','int'],
                value:  [pSeri,pSira,pEvrTip,pTip]
            }
            db.GetDataQuery(TmpQuery,function(pData)
            {
                resolve(pData);
            });
        });
    }
    $scope.Init = async function(pTip)
    {
        DevExpress.localization.locale('fr');
        $scope.Kullanici = $window.sessionStorage.getItem('User');
        $scope.Firma = 'PIQPOS'                

        if(typeof localStorage.Lang != 'undefined')
        {
            $scope.Lang = localStorage.Lang;
        }
        else
        {
            $scope.Lang = "TR";
        }

        $scope.EvrTip = 0;
        $scope.Tip = 0;
        $scope.Depo = "";
        $scope.Birim = "";
        $scope.EvrLock = false;
        
        if(pTip == 'Alınan Sipariş')
        {
            $scope.EvrTip = 0;
            $scope.Tip = 1;
        }
        else if(pTip == 'Verilen Sipariş')
        {
            $scope.EvrTip = 0;
            $scope.Tip = 0;
        }

        $scope.TxtSeri = "SIP";
        $scope.TxtSira = (await db.GetPromiseTag($scope.Firma,'MaxSiparisNo',[$scope.TxtSeri,$scope.EvrTip]))[0].MAXSIRA;
        $scope.TxtCari = "";
        $scope.TxtBarkod = "";
        $scope.TxtStokKodu = "";
        $scope.TxtStokBilgi = "";
        $scope.TxtCarpan = 0;
        $scope.TxtMiktar = 0;
        $scope.TxtFiyat = 0;
        $scope.TxtIndirim = 0;
        $scope.TxtKdv = 0;
        $scope.TxtTutar = 0;
        $scope.TxtTopTutar = 0;

        $scope.CariSecimListe = [];
        $scope.EvrakSecimListe = [];
        $scope.IslemListe = [];
        $scope.StokListe = [];
        $scope.BirimListe = [];
        $scope.StokSecimListe = [];
        
        let TmpQuery =
        {
            db : $scope.Firma,
            query:  "SELECT [CODE] AS CODE,[NAME] AS NAME FROM DEPOT"
        }
        $scope.DepoListe = (await db.GetPromiseQuery(TmpQuery));

        $scope.Cmb = {};
        $scope.Cmb.Depo = 
        {
            width: "100%",
            dataSource: $scope.DepoListe,
            displayExpr: "NAME",
            valueExpr: "CODE",
            value: "",
            showClearButton: true,
            searchEnabled: true,
            bindingOptions: 
            {
                value: "Depo",
                dataSource : "DepoListe",
                disabled : "EvrLock"
            },
            onSelectionChanged : function(e)
            {                
                if(e.selectedItem == null)
                {
                    $scope.Depo = ""
                }
            }
        }            
        
        TblIslemInit();
        TblEvrakInit();
        TblCariInit();
        TblStokInit();

        $scope.BtnHome();
    }
    $scope.BtnHome = function()
    {
        $("#TbMain").addClass('active');  
        $("#TbBarkod").removeClass('active');
    }
    $scope.BtnBarkodGiris = function()
    {
        if($scope.TxtCari == '')
        {
            alertify.alert("Lütfen Cari Seçiniz !")
            return;
        }
        if($scope.Depo == '')
        {
            alertify.alert("Lütfen Depo Seçiniz !")
            return;
        }

        $("#TbMain").removeClass('active');  
        $("#TbBarkod").addClass('active');
    }
    $scope.BtnEvrakSecim = function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT " +
                    "REF AS [REF], " +
                    "REF_NO AS [REF_NO], " +
                    "DOC_DATE AS [DOC_DATE], " +
                    "DOC_FROM_NAME AS [FROM], " +
                    "DOC_TO_NAME AS [TO], " +
                    "AMOUNT AS AMOUNT " +
                    "FROM ORDER_M_VW_01 WHERE DOC_TYPE = @DOC_TYPE AND TYPE = @TYPE",
            param:  ['DOC_TYPE','TYPE'],
            type:   ['int','int'],
            value:  [$scope.EvrTip,$scope.Tip]
        }
        db.GetDataQuery(TmpQuery,function(pData)
        {
            $('#MdlEvrakSecim').modal('show');
            $scope.EvrakSecimListe = pData;
            TblEvrakInit();
        });
    }
    $scope.BtnEvrakGridSec = async function()
    {
        $('#MdlEvrakSecim').modal('hide');
        if($scope.TxtSeri != '' || $scope.TxtSira != 0)
        {
            let TmpData = await EvrakGetir($scope.TxtSeri,$scope.TxtSira,$scope.EvrTip,$scope.Tip);
            
            if($scope.EvrTip == 0 && $scope.Tip == 1)
            {
                $scope.Depo = TmpData[0].DOC_FROM
                $scope.TxtCari = TmpData[0].DOC_TO
            }
            else if($scope.EvrTip == 0 && $scope.Tip == 0)
            {
                $scope.Depo = TmpData[0].DOC_TO
                $scope.TxtCari = TmpData[0].DOC_FROM
            }

            $scope.IslemListe = TmpData;
            TblIslemInit();
            $scope.EvrLock = true;
            $scope.$apply();
        }
    }
    $scope.BtnCariSecim = function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT " +
                    "CODE AS CODE," +
                    "NAME AS NAME " +
                    "FROM CUSTOMERS WHERE GENUS = 1",
        }
        db.GetDataQuery(TmpQuery,function(pData)
        {
            $('#MdlCariSecim').modal('show');
            $scope.CariSecimListe = pData;
            TblCariInit();
        });
    }
    $scope.BtnCariGridSec = function()
    {
        $('#MdlCariSecim').modal('hide');
    }
    $scope.BtnStokSecim = function()
    {
        db.StokBarkodGetir($scope.Firma,'',async function(BarkodData)
        {
            $('#MdlStokSecim').modal('show');
            $scope.StokSecimListe = BarkodData;
            TblStokInit();
        });
    }
    $scope.BtnStokGridSec = function()
    {
        $('#MdlStokSecim').modal('hide');
        if($scope.TxtBarkod != '')
        {
            StokGetir($scope.TxtBarkod);
        }
    }
    $scope.BtnStokBarkodGetir = function(pKey)
    {
        if(pKey.which === 13)
        {
            StokGetir($scope.TxtBarkod)
        }
    }
    $scope.MiktarFiyatValid = function()
    {
        if($scope.StokListe.length > 0)
        {
            let TmpTutar = ($scope.TxtCarpan * $scope.TxtMiktar) * $scope.TxtFiyat;

            $scope.TxtKdv = TmpTutar - (TmpTutar / (($scope.StokListe[0].VAT / 100) + 1));
            $scope.TxtTutar = TmpTutar - $scope.TxtKdv;
            $scope.TxtIndirim = 0;
            $scope.TxtTopTutar = TmpTutar;
        }
    }
    $scope.BtnTemizle = function()
    {
        $scope.BirimListe = [];
        CmbBirimInit();
        $scope.Birim = 0;

        $scope.TxtBarkod = "";
        $scope.TxtStokBilgi = "";
        $scope.TxtMiktar = 0;
        $scope.TxtCarpan = 0;
        $scope.TxtFiyat = 0;
        $scope.TxtKdv = 0;
        $scope.TxtTutar = 0;
        $scope.TxtIndirim = 0;
        $scope.TxtTopTutar = 0;                

        $window.document.getElementById("TxtBarkod").focus();
    }
    $scope.BtnEkle = function()
    {
        let TmpFrom = "";
        let TmpTo = "";
        
        if($scope.EvrTip == 0 && $scope.Tip == 1)
        {
            TmpFrom = $scope.Depo;
            TmpTo = $scope.TxtCari;
        }
        else if($scope.EvrTip == 0 && $scope.Tip == 0)
        {
            TmpTo = $scope.Depo;
            TmpFrom = $scope.TxtCari;
        }

        let InserData = 
        [
            $scope.Kullanici,
            $scope.Kullanici,
            $scope.Tip,
            $scope.EvrTip,
            $scope.TxtSeri,
            $scope.TxtSira,
            moment(new Date()).format("DD.MM.YYYY"),
            TmpFrom,
            TmpTo,
            $scope.StokListe[0].CODE,
            $scope.TxtMiktar * $scope.TxtCarpan,
            $scope.TxtFiyat,
            $scope.TxtIndirim,
            $scope.TxtKdv,
            1
        ]
        db.ExecuteTag($scope.Firma,'SiparisInsert',InserData,async function(pData)
        {
            $scope.BtnTemizle();

            let TmpData = await EvrakGetir($scope.TxtSeri,$scope.TxtSira,$scope.EvrTip,$scope.Tip);
            $scope.IslemListe = TmpData;
            TblIslemInit();
            $scope.EvrLock = true;
            $scope.$apply();
        });
    }
    $scope.BtnEvrakSil = function()
    {
        db.ExecuteTag($scope.Firma,'SiparisEvrakDelete',[1,$scope.EvrTip,$scope.TxtSeri,$scope.TxtSira],async function(data)
        {
            $scope.Init();
        });
    }
}