function EtiketBasimCtrl ($scope,$window,db)
{
    let SelectedData = [];
    let RefSelectedData = [];
    let EtiketSelected = {};
    let TmpGrid;

    $scope.Wizard = {};
    
    function InitBarkodGrid()
    {
        $("#TblBarkodListesi").dxDataGrid(
        {
            dataSource: $scope.BarkodListe,
            allowColumnReordering: true,
            showBorders: true,
            filterRow: 
            { 
                visible: true
            },
            headerFilter: 
            {
                visible: true
            },
            selection: 
            {
                mode: "single"
            },
            editing: 
            {
                mode: "row",
                allowUpdating: true,
                allowDeleting: true,
                selectTextOnEditStart: true,
                startEditAction: "click"
            },
            columns: 
            [
                {
                    dataField: "BARCODE",
                    caption: db.Language($scope.Lang,"BARKOD"),
                    dataType: "string",
                    allowEditing: false,
                    width: "120"
                },
                {
                    dataField: "NAME",
                    caption: db.Language($scope.Lang,"ADI"),
                    dataType: "string",                    
                    width: "500"
                },
                {
                    dataField: "PRICE",
                    caption: db.Language($scope.Lang,"FİYAT"),
                    dataType: "number",
                    width: "100",
                    hidingPriority: 1
                },
                {
                    dataField: "UNDER_UNIT_VALUE",
                    caption: db.Language($scope.Lang,"ALT B. DEGER"),
                    dataType: "string",
                    width: "100",
                    hidingPriority: 2
                },
                {
                    dataField: "UNDER_UNIT_PRICE",
                    caption: db.Language($scope.Lang,"ALT B. FİYAT"),
                    dataType: "string",
                    width: "100",
                    hidingPriority: 3
                },
                {
                    dataField: "DESCRIPTION",
                    caption: db.Language($scope.Lang,"ÖZEL ALAN"),
                    dataType: "string",
                    width: "100",
                    hidingPriority: 4
                },
            ],
            onRowRemoved: function(e) 
            {
                $scope.Kaydet();

                if(typeof EtiketSelected != 'undefined')
                {
                    $scope.Sayfa = Math.ceil($scope.BarkodListe.length / EtiketSelected.PAGE_COUNT);
                    $scope.BosEtiketAlan = EtiketSelected.PAGE_COUNT - ($scope.BarkodListe.length % EtiketSelected.PAGE_COUNT);
                }
            },
            onRowUpdated: function(e) 
            {
                $scope.Kaydet();
                if(typeof EtiketSelected != 'undefined')
                {
                    $scope.Sayfa = Math.ceil($scope.BarkodListe.length / EtiketSelected.PAGE_COUNT);
                    $scope.BosEtiketAlan = EtiketSelected.PAGE_COUNT - ($scope.BarkodListe.length % EtiketSelected.PAGE_COUNT);
                }
            },
        });
    }
    function InitStokSecimGrid()
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
                mode: "multiple"
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
                    caption: db.Language($scope.Lang,"KODU"),
                    dataType: "string"
                },
                {
                    dataField: "BARCODE",
                    caption: db.Language($scope.Lang,"BARKOD"),
                    dataType: "string"
                },
                {
                    dataField: "NAME",
                    caption: db.Language($scope.Lang,"ADI"),
                    dataType: "string"
                },
                {
                    dataField: "ITEM_GRP_NAME",
                    caption: db.Language($scope.Lang,"GRUP"),
                    dataType: "string"
                },
                {
                    dataField: "PRICE",
                    caption: db.Language($scope.Lang,"FİYAT"),
                    dataType: "string"
                },
                {
                    dataField: "DESCRIPTION",
                    caption: db.Language($scope.Lang,"ÖZEL ALAN"),
                    dataType: "string"
                }
            ],
            onSelectionChanged: function(selectedItems) 
            {
                SelectedData = selectedItems.selectedRowsData;
            }
        }).dxDataGrid("instance");        
    }
    function InitReferansSecimGrid()
    {
        if(typeof TmpGrid != 'undefined')
        {
            TmpGrid.deselectAll();
            TmpGrid.clearSelection();
        }
        

        TmpGrid = $("#TblReferansSecim").dxDataGrid(
        {
            dataSource: $scope.ReferansListe,
            allowColumnReordering: true,
            showBorders: true,
            selection: 
            {
                mode: "multiple"
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
                    dataField: "LDATE",
                    caption: db.Language($scope.Lang,"TARIH"),
                    dataType: "datetime",
                    format: 'dd/MM/yyyy - HH:mm:ss',
                },
                {
                    dataField: "LUSER",
                    caption: db.Language($scope.Lang,"KULLANICI"),
                    dataType: "string"
                },
                {
                    dataField: "REFERANCE",
                    caption: db.Language($scope.Lang,"REFERANS"),
                    dataType: "string"
                }
            ],
            onSelectionChanged: function(selectedItems) 
            {
                RefSelectedData = selectedItems.selectedRowsData;
            }
        }).dxDataGrid("instance");        
    }
    function BarkodGetir(pBarkod)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT " +
                        "ISNULL(MAX(CUSTOMER_ITEM_CODE),ITEMS.CODE) AS CODE, " +
                        "ISNULL((SELECT TOP 1 BARCODE FROM ITEM_BARCODE WHERE ITEM_BARCODE.ITEM_CODE = ITEMS.CODE ORDER BY ITEM_BARCODE.LDATE DESC),'') AS BARCODE, " +
                        "MAX(ITEMS.NAME) AS NAME, " +
                        "ISNULL((SELECT TOP 1 C.NAME FROM CUSTOMERS AS C WHERE C.CODE = MAX(ITEM_CUSTOMER.CUSTOMER_CODE)),'') AS CUSTOMER_NAME, " +
                        "MAX(ITEMS.ITEM_GRP) AS ITEM_GRP, " +
                        "ISNULL((SELECT NAME FROM ITEM_GROUP WHERE ITEM_GROUP.CODE = MAX(ITEMS.ITEM_GRP)),'') AS ITEM_GRP_NAME, " +
                        "dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) AS PRICE, " +
                        "CONVERT(NVARCHAR,MAX(FACTOR)) + ' ' + MAX(SHORT) AS UNDER_UNIT_VALUE, " +
                        "CASE WHEN dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) = 0 OR ISNULL(MAX(FACTOR),0) = 0 THEN '0' ELSE " +
                        "ROUND(dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) / ISNULL(MAX(FACTOR),0),2) END AS UNDER_UNIT_PRICE, " +
                        "'' AS DESCRIPTION " +
                        "FROM ITEMS " +
                        "INNER JOIN ITEM_BARCODE ON " +
                        "ITEM_BARCODE.ITEM_CODE = ITEMS.CODE " +
                        "LEFT OUTER JOIN ITEM_CUSTOMER ON " +
                        "ITEM_CUSTOMER.ITEM_CODE = ITEMS.CODE " + 
                        "LEFT OUTER JOIN ITEM_UNIT ON " +
                        "ITEM_UNIT.ITEM_CODE = ITEMS.CODE AND ITEM_UNIT.TYPE = 1 " +
                        "LEFT OUTER JOIN UNIT ON " +
                        "UNIT.NAME = ITEM_UNIT.NAME " +
                        "WHERE ((BARCODE = @BARCODE) OR (ITEMS.CODE = @BARCODE) OR (@BARCODE = '')) AND ITEMS.STATUS = 1 " + 
                        "GROUP BY ITEMS.CODE",
                param : ['BARCODE:string|25'],
                value : [pBarkod]
            }

            let TmpData = await db.GetPromiseQuery(TmpQuery);
            
            resolve(TmpData)
        });
        
    }
    $scope.Init = async function()
    {
        if(typeof localStorage.Lang != 'undefined')
        {
            $scope.Lang = localStorage.Lang;
        }
        else
        {
            $scope.Lang = "TR";
        }

        SelectedData = [];
        RefSelectedData = [];
        EtiketSelected = {};

        $scope.Kullanici = $window.sessionStorage.getItem('User');
        $scope.Sube = "1";

        $scope.Firma = 'PIQPOS';

        $scope.StokSecimListe = [];
        $scope.BarkodListe = [];
        $scope.EtiketListe = [];
        $scope.ReferansListe = [];

        $scope.Etiket = "";
        $scope.Barkodu = ""
        $scope.Referans = (await db.GetPromiseQuery({query:"SELECT ISNULL(MAX(REFERANCE),0) + 1 AS REFERANCE FROM LABEL_QUEUE WHERE LUSER = @LUSER",param:['LUSER:string|25'],value:[$scope.Kullanici]}))[0].REFERANCE;
        $scope.Sayfa = 0;
        $scope.BosEtiketAlan = 0;

        InitBarkodGrid();
        InitStokSecimGrid();
        InitReferansSecimGrid();

        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT DESIGN_NAME,TAG,PAGE_COUNT FROM LABEL_DESIGN",
        }

        let TmpData = await db.GetPromiseQuery(TmpQuery);
        $scope.EtiketListe = TmpData;
        $scope.$apply();

        TmpQuery = 
        {
            db : $scope.Firma,
            query:  "DELETE FROM LABEL_QUEUE WHERE LDATE <= GETDATE() - 30",
        }
        await db.ExecutePromiseQuery(TmpQuery);

        $scope.Cmb = {};
        $scope.Cmb.Etiket = 
        {
            width: "100%",
            dataSource: $scope.EtiketListe,
            displayExpr: "DESIGN_NAME",
            valueExpr: "TAG",
            value: "",
            showClearButton: true,
            searchEnabled: true,
            bindingOptions: 
            {
                value: "Etiket",
                dataSource : "EtiketListe"
            },
            onSelectionChanged : function(e)
            {              
                EtiketSelected = e.selectedItem;

                if(e.selectedItem == null)
                {
                    $scope.Etiket = ""
                }
                else
                {
                    $scope.Sayfa = Math.ceil($scope.BarkodListe.length / EtiketSelected.PAGE_COUNT);
                    $scope.BosEtiketAlan = EtiketSelected.PAGE_COUNT - ($scope.BarkodListe.length % EtiketSelected.PAGE_COUNT);
                }
            }
        }
        
        $scope.Wizard.GrupGetir();
        $scope.Wizard.TedarikciGetir();

        $scope.Wizard.CurrentPage = "1";
        $scope.Wizard.FrmCheck = [true,false,false,false,false]
        $scope.Wizard.Tarih = moment(new Date()).format("DD/MM/YYYY");

        $scope.Wizard.Grup = 
        {
            width: "100%",
            dataSource: $scope.Wizard.GrupData,
            displayExpr: "NAME",
            valueExpr: "CODE",
            value: "",
            showClearButton: true,
            searchEnabled: true,
            bindingOptions: 
            {
                value: "Wizard.GrupValue",
                dataSource : "Wizard.GrupData"
            },
            onSelectionChanged : function(e)
            {                
                if(e.selectedItem == null)
                {
                    $scope.Wizard.GrupValue = ""
                }
            }
        }
        $scope.Wizard.Tedarikci = 
        {
            width: "100%",
            dataSource: $scope.Wizard.TedarikciData,
            displayExpr: "NAME",
            valueExpr: "CODE",
            value: "",
            showClearButton: true,
            searchEnabled: true,
            bindingOptions: 
            {
                value: "Wizard.TedarikciValue",
                dataSource : "Wizard.TedarikciData"
            },
            onSelectionChanged : function(e)
            {                
                if(e.selectedItem == null)
                {
                    $scope.Wizard.TedarikciValue = ""
                }
            }
        }
    }
    $scope.BtnStokSecim = async function()
    {
        let TmpData = await BarkodGetir('');

        $scope.StokSecimListe = TmpData
        InitStokSecimGrid();

        $("#MdlStokSecim").modal('show');
    }    
    $scope.BtnStokGridSec = async function()
    {
        $("#MdlStokSecim").modal('hide');        
        for(let i = 0;i < SelectedData.length;i++)
        {
            $scope.BarkodListe.push(SelectedData[i]);
        }
        InitBarkodGrid();
        $scope.Kaydet();

        if(typeof EtiketSelected != 'undefined')
        {
            $scope.Sayfa = Math.ceil($scope.BarkodListe.length / EtiketSelected.PAGE_COUNT);
            $scope.BosEtiketAlan = EtiketSelected.PAGE_COUNT - ($scope.BarkodListe.length % EtiketSelected.PAGE_COUNT);
        }
    }
    $scope.TxtBarkodPress = async function(e)
    {
        if(e.which === 13)
        {
            let TmpData = await BarkodGetir($scope.Barkodu);

            if(TmpData.length > 0)
            {
                $scope.BarkodListe.push(TmpData[0]);
            }
            $scope.Barkodu = ""
            $scope.$apply();
            InitBarkodGrid();
            $scope.Kaydet();

            if(typeof EtiketSelected != 'undefined')
            {
                $scope.Sayfa = Math.ceil($scope.BarkodListe.length / EtiketSelected.PAGE_COUNT);
                $scope.BosEtiketAlan = EtiketSelected.PAGE_COUNT - ($scope.BarkodListe.length % EtiketSelected.PAGE_COUNT);
            }
        }
    }
    $scope.BtnReferansSecim = async function()
    {
        let TmpData = (await db.GetPromiseQuery({query:"SELECT * FROM LABEL_QUEUE WHERE LUSER = @LUSER",param:['LUSER:string|25'],value:[$scope.Kullanici]}))

        $scope.ReferansListe = TmpData
        InitReferansSecimGrid();
        $("#MdlReferansSecim").modal('show');
    }
    $scope.BtnReferansGridSec = function()
    {
        $("#MdlReferansSecim").modal('hide');
        if(RefSelectedData.length > 0)
        {
            $scope.Referans = RefSelectedData[0].REFERANCE;

            let TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT " +
                        "CODE, " +
                        "BARCODE, " +
                        "NAME, " +
                        "ITEM_GRP, " +
                        "ITEM_GRP_NAME, " +
                        "PRICE, " +
                        "UNDER_UNIT_VALUE, " +
                        "UNDER_UNIT_PRICE, " +
                        "DESCRIPTION " +
                        "FROM LABEL_QUEUE AS D  " +
                        "CROSS APPLY  " +
                        "(SELECT * FROM OPENJSON(JSON_QUERY (D.DATA, '$.data')) " +
                        "WITH  " +
                        "( " +
                        "[CODE] nvarchar(25) '$.CODE', " +
                        "[BARCODE] nvarchar(50) '$.BARCODE', " +
                        "[NAME] nvarchar(50) '$.NAME', " +
                        "[ITEM_GRP] nvarchar(50) '$.ITEM_GRP', " +
                        "[ITEM_GRP_NAME] nvarchar(50) '$.ITEM_GRP_NAME', " +
                        "[PRICE] nvarchar(50) '$.PRICE', " +
                        "[UNDER_UNIT_VALUE] nvarchar(50) '$.UNDER_UNIT_VALUE', " +
                        "[UNDER_UNIT_PRICE] nvarchar(50) '$.UNDER_UNIT_PRICE', " +
                        "[DESCRIPTION] nvarchar(500) '$.DESCRIPTION' " +
                        ")) JS " +
                        "WHERE STATUS = 0 AND REFERANCE = @REFERANCE",
                param:  ['REFERANCE'],
                type:   ['int'],
                value:  [$scope.Referans]
            }
            db.GetDataQuery(TmpQuery,function(pData)
            {
                $scope.BarkodListe = pData;
                InitBarkodGrid();
            });
        }
    }
    $scope.Kaydet = function()
    {
        let Data = {data:$scope.BarkodListe}

        let InsertData = 
        [
            $scope.Kullanici,
            $scope.Kullanici,
            $scope.Referans,
            JSON.stringify(Data),
            1,
            0
        ]
        db.ExecuteTag($scope.Firma,'LabelQueueInsert',InsertData)
    }
    $scope.OnIzleme = function()
    {
        if($scope.Etiket == '')
        {
            alertify.alert("Lütfen Etiket Tipi Seçiniz !")
            return;
        }

        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT " +
                    "CUSER, " +
                    "CDATE, " +
                    "LUSER, " +
                    "LDATE, " +
                    "REFERANCE, " +
                    "PRINT_COUNT, " +
                    "STATUS, " +
                    "CODE, " +
                    "BARCODE, " +
                    "NAME, " +
                    "ITEM_GRP, " +
                    "ITEM_GRP_NAME, " +
                    "CUSTOMER_NAME, " +
                    "TRIM(STR(PRICE, 15, 2)) AS PRICE, " +
                    "UNDER_UNIT_VALUE, " +
                    "TRIM(STR([UNDER_UNIT_PRICE], 15, 2)) AS UNDER_UNIT_PRICE, " +
                    "SUBSTRING(TRIM(STR(PRICE, 15, 2)),0,CHARINDEX('.',TRIM(STR(PRICE, 15, 2)))) AS PRICE1, " +
                    "SUBSTRING(TRIM(STR(PRICE, 15, 2)),CHARINDEX('.',TRIM(STR(PRICE, 15, 2))) + 1,LEN(TRIM(STR(PRICE, 15, 2)))) AS PRICE2, " +
                    "TRIM(STR([UNDER_UNIT_PRICE], 15, 2)) + ' / ' + SUBSTRING([UNDER_UNIT_VALUE],CHARINDEX(' ',[UNDER_UNIT_VALUE]) + 1,LEN([UNDER_UNIT_VALUE])) AS UNDER_UNIT_PRICE2, " +
                    "ISNULL((SELECT PATH FROM LABEL_DESIGN WHERE TAG = @DESIGN),'') AS PATH, " +
                    "DESCRIPTION AS DESCRIPTION " + 
                    "FROM LABEL_QUEUE AS D  " +
                    "CROSS APPLY  " +
                    "(SELECT * FROM OPENJSON(JSON_QUERY (D.DATA, '$.data')) " +
                    "WITH  " +
                    "( " +
                    "[CODE] nvarchar(25) '$.CODE', " +
                    "[BARCODE] nvarchar(50) '$.BARCODE', " +
                    "[NAME] nvarchar(50) '$.NAME', " +
                    "[ITEM_GRP] nvarchar(50) '$.ITEM_GRP', " +
                    "[ITEM_GRP_NAME] nvarchar(50) '$.ITEM_GRP_NAME', " +
                    "[CUSTOMER_NAME] nvarchar(250) '$.CUSTOMER_NAME', " +
                    "[PRICE] nvarchar(50) '$.PRICE', " +
                    "[UNDER_UNIT_VALUE] nvarchar(50) '$.UNDER_UNIT_VALUE', " +
                    "[UNDER_UNIT_PRICE] nvarchar(50) '$.UNDER_UNIT_PRICE', " +
                    "[DESCRIPTION] nvarchar(500) '$.DESCRIPTION' " +
                    ")) JS " +
                    "WHERE STATUS = 0 AND REFERANCE = @REFERANCE",
            param:  ['REFERANCE','DESIGN'],
            type:   ['int','string|25'],
            value:  [$scope.Referans,$scope.Etiket]
        }
        db.GetDataQuery(TmpQuery,function(pData)
        {
            if(pData.length > 0)
            {
                console.log(JSON.stringify(pData))
                db.Emit('DevPrint',"{TYPE:'REVIEW',PATH:'" + pData[0].PATH.replaceAll('\\','/') + "',DATA:" + JSON.stringify(pData) + "}",(pResult)=>
                {
                    if(pResult.split('|')[0] != 'ERR')
                    {
                        var mywindow = window.open('','_blank',"width=900,height=1000,left=500");                
                        mywindow.document.write("<iframe src='data:application/pdf;base64," + pResult.split('|')[1] + "' type='application/pdf' width='100%' height='100%'></iframe>")
                        mywindow.document.getElementsByTagName('head')[0].innerHTML = "<title>Dev Print</title>"
                    }
                })
            }
        });
    }
    $scope.BtnWizard = function()
    {
        $('#MdlWizard').modal('show');

        $scope.Wizard.GrupValue = ""
        $scope.Wizard.TedarikciValue = ""

        $scope.Wizard.CurrentPage = "1";
        $scope.Wizard.FrmCheck = [true,false,false,false,false]
        $scope.Wizard.Tarih = moment(new Date()).format("DD/MM/YYYY");

        $("#Wizard1").addClass('active');
        $("#Wizard2").removeClass('active');
        $("#Wizard3").removeClass('active');

        $("#Pearl1").removeClass('disabled');
        $("#Pearl1").removeClass('done');
        $("#Pearl1").addClass('active');
        $("#Pearl1").addClass('current');

        $("#Pearl2").removeClass('active');
        $("#Pearl2").removeClass('current');
        $("#Pearl2").removeClass('done');
        $("#Pearl2").addClass('disabled');

        $("#Pearl3").removeClass('active');
        $("#Pearl3").removeClass('current');
        $("#Pearl3").removeClass('done');
        $("#Pearl3").addClass('disabled');

    }
    $scope.BtnWizardNext = function()
    {
        if($scope.Wizard.CurrentPage < 3)
        {
            if($scope.Wizard.CurrentPage == 2)
            {
                if(!$scope.Wizard.FrmCheck[0] && !$scope.Wizard.FrmCheck[1] && !$scope.Wizard.FrmCheck[2] && !$scope.Wizard.FrmCheck[3] && !$scope.Wizard.FrmCheck[4])
                {
                    alertify.alert(db.Language($scope.Lang,"Lütfen seçim yapınız !"));
                    return;
                }
                if($scope.Wizard.FrmCheck[2] && (typeof $scope.Wizard.GrupValue == 'undefined' || $scope.Wizard.GrupValue == ''))
                {
                    alertify.alert(db.Language($scope.Lang,"Ürün grubu seçmediniz !"));
                    return;
                }
                if($scope.Wizard.FrmCheck[3] && (typeof $scope.Wizard.TedarikciValue == 'undefined' || $scope.Wizard.TedarikciValue == ''))
                {
                    alertify.alert(db.Language($scope.Lang,"Tedarikçi seçmediniz !"));
                    return;
                }
            }
            $("#Wizard" + $scope.Wizard.CurrentPage).removeClass('active');

            $("#Pearl" + $scope.Wizard.CurrentPage).removeClass('active');
            $("#Pearl" + $scope.Wizard.CurrentPage).removeClass('current');
            $("#Pearl" + $scope.Wizard.CurrentPage).addClass('done');
    
            $scope.Wizard.CurrentPage = parseInt($scope.Wizard.CurrentPage) + 1
            
            $("#Wizard" + $scope.Wizard.CurrentPage).addClass('active');
    
            $("#Pearl" + $scope.Wizard.CurrentPage).addClass('active');
            $("#Pearl" + $scope.Wizard.CurrentPage).addClass('current');
            $("#Pearl" + $scope.Wizard.CurrentPage).removeClass('disabled');
        }
        else if($scope.Wizard.CurrentPage == 3)
        {
            for (let i = 0; i < $scope.Wizard.FrmCheck.length; i++) 
            {
                if($scope.Wizard.FrmCheck[i])
                {
                    $scope.SetWizard(i);
                }                
            }
        }        
    }
    $scope.BtnWizardBack = function()
    {
        if($scope.Wizard.CurrentPage > 1)
        {
            $("#Wizard" + $scope.Wizard.CurrentPage).removeClass('active');
        
            $("#Pearl" + $scope.Wizard.CurrentPage).removeClass('active');
            $("#Pearl" + $scope.Wizard.CurrentPage).removeClass('current');
            $("#Pearl" + $scope.Wizard.CurrentPage).addClass('disabled');
    
            $scope.Wizard.CurrentPage = parseInt($scope.Wizard.CurrentPage) - 1
            
            $("#Wizard" + $scope.Wizard.CurrentPage).addClass('active');
    
            $("#Pearl" + $scope.Wizard.CurrentPage).addClass('active');
            $("#Pearl" + $scope.Wizard.CurrentPage).addClass('current');
            $("#Pearl" + $scope.Wizard.CurrentPage).removeClass('done');
        }
    }
    $scope.Wizard.CheckChange = function(pIndex)
    {
        for (let i = 0; i < $scope.Wizard.FrmCheck.length; i++) 
        {
            if(pIndex != i)
            {
                $scope.Wizard.FrmCheck[i] = false;
            }
        }
    }
    $scope.Wizard.GrupGetir = function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT [NAME],[CODE] FROM ITEM_GROUP"
        }
        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.Wizard.GrupData = Data
        });
    }
    $scope.Wizard.TedarikciGetir = function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT CODE,NAME FROM CUSTOMERS WHERE TYPE = 1 ORDER BY NAME ASC"
        }
        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.Wizard.TedarikciData = Data
        });
    }
    $scope.SetWizard = function(pIndex)
    {
        let TmpQuery = "";
        if(pIndex == 0)
        {
            TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT " +
                        "ISNULL(CUSTOMER_ITEM_CODE,ITEMS.CODE) AS CODE, " +
                        "ITEM_BARCODE.BARCODE AS BARCODE, " +
                        "ITEMS.NAME AS NAME, " +
                        "ITEMS.ITEM_GRP AS ITEM_GRP, " +
                        "ISNULL((SELECT NAME FROM ITEM_GROUP WHERE ITEM_GROUP.CODE = ITEMS.ITEM_GRP),'') AS ITEM_GRP_NAME, " +
                        "dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) AS PRICE, " +
                        "ISNULL((SELECT TOP 1 CONVERT(NVARCHAR,FACTOR) + ' ' + ISNULL((SELECT TOP 1 SHORT FROM UNIT WHERE UNIT.NAME = ITEM_UNIT.NAME),'') FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEMS.CODE AND TYPE = 1),0) AS UNDER_UNIT_VALUE, " +
                        "CASE WHEN dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) = 0 OR ISNULL((SELECT TOP 1 FACTOR FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEMS.CODE AND TYPE = 1),0) = 0 THEN " +
                        "'0' ELSE CONVERT(NVARCHAR,ROUND(dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) / ISNULL((SELECT TOP 1 FACTOR FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEMS.CODE AND TYPE = 1),0),2)) END AS UNDER_UNIT_PRICE, " +
                        "'' AS DESCRIPTION " +
                        "FROM ITEMS " +
                        "INNER JOIN ITEM_BARCODE ON  " +
                        "ITEM_BARCODE.ITEM_CODE = ITEMS.CODE " +
                        "LEFT OUTER JOIN ITEM_CUSTOMER ON " +
                        "ITEM_CUSTOMER.ITEM_CODE = ITEMS.CODE " + 
                        "WHERE " +
                        "(SELECT TOP 1 LDATE FROM LABEL_QUEUE ORDER BY LDATE DESC) < (SELECT TOP 1 LDATE FROM ITEM_PRICE WHERE TYPE = 0 AND DEPOT = 0 AND ITEM_CODE = ITEMS.CODE ORDER BY LDATE DESC) " +
                        "AND ITEMS.STATUS = 1",
            }           
        }
        else if(pIndex == 1)
        {
            TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT " +
                        "ISNULL(CUSTOMER_ITEM_CODE,ITEMS.CODE) AS CODE, " +
                        "ITEM_BARCODE.BARCODE AS BARCODE, " +
                        "ITEMS.NAME AS NAME, " +
                        "ITEMS.ITEM_GRP AS ITEM_GRP, " +
                        "ISNULL((SELECT NAME FROM ITEM_GROUP WHERE ITEM_GROUP.CODE = ITEMS.ITEM_GRP),'') AS ITEM_GRP_NAME, " +
                        "dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) AS PRICE, " +
                        "ISNULL((SELECT TOP 1 CONVERT(NVARCHAR,FACTOR) + ' ' + ISNULL((SELECT TOP 1 SHORT FROM UNIT WHERE UNIT.NAME = ITEM_UNIT.NAME),'') FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEMS.CODE AND TYPE = 1),0) AS UNDER_UNIT_VALUE, " +
                        "CASE WHEN dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) = 0 OR ISNULL((SELECT TOP 1 FACTOR FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEMS.CODE AND TYPE = 1),0) = 0 THEN " +
                        "'0' ELSE CONVERT(NVARCHAR,ROUND(dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) / ISNULL((SELECT TOP 1 FACTOR FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEMS.CODE AND TYPE = 1),0),2)) END AS UNDER_UNIT_PRICE, " +
                        "'' AS DESCRIPTION " +
                        "FROM ITEMS " +
                        "INNER JOIN ITEM_BARCODE ON  " +
                        "ITEM_BARCODE.ITEM_CODE = ITEMS.CODE " +
                        "LEFT OUTER JOIN ITEM_CUSTOMER ON " +
                        "ITEM_CUSTOMER.ITEM_CODE = ITEMS.CODE " + 
                        "WHERE " +
                        "(SELECT TOP 1 CONVERT(DATE,LDATE) FROM ITEM_PRICE WHERE TYPE = 0 AND DEPOT = 0 AND ITEM_CODE = ITEMS.CODE ORDER BY LDATE DESC) >= @TARIH " +
                        "AND ITEMS.STATUS = 1",
                param: ['TARIH:date'],
                value: [$scope.Wizard.Tarih]
            }
        }
        else if(pIndex == 2)
        {            
            TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT " +
                        "ISNULL(CUSTOMER_ITEM_CODE,ITEMS.CODE) AS CODE, " +
                        "ITEM_BARCODE.BARCODE AS BARCODE, " +
                        "ITEMS.NAME AS NAME, " +
                        "ITEMS.ITEM_GRP AS ITEM_GRP, " +
                        "ISNULL((SELECT NAME FROM ITEM_GROUP WHERE ITEM_GROUP.CODE = ITEMS.ITEM_GRP),'') AS ITEM_GRP_NAME, " +
                        "dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) AS PRICE, " +
                        "ISNULL((SELECT TOP 1 CONVERT(NVARCHAR,FACTOR) + ' ' + ISNULL((SELECT TOP 1 SHORT FROM UNIT WHERE UNIT.NAME = ITEM_UNIT.NAME),'') FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEMS.CODE AND TYPE = 1),0) AS UNDER_UNIT_VALUE, " +
                        "CASE WHEN dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) = 0 OR ISNULL((SELECT TOP 1 FACTOR FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEMS.CODE AND TYPE = 1),0) = 0 THEN " +
                        "'0' ELSE CONVERT(NVARCHAR,ROUND(dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) / ISNULL((SELECT TOP 1 FACTOR FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEMS.CODE AND TYPE = 1),0),2)) END AS UNDER_UNIT_PRICE, " +
                        "'' AS DESCRIPTION " +
                        "FROM ITEMS " +
                        "INNER JOIN ITEM_BARCODE ON  " +
                        "ITEM_BARCODE.ITEM_CODE = ITEMS.CODE " +
                        "LEFT OUTER JOIN ITEM_CUSTOMER ON " +
                        "ITEM_CUSTOMER.ITEM_CODE = ITEMS.CODE " + 
                        "WHERE " +
                        "ITEM_GRP = @ITEM_GRP " +
                        "AND ITEMS.STATUS = 1",
                param: ['ITEM_GRP:string|25'],
                value: [$scope.Wizard.GrupValue]
            }
        }
        else if(pIndex == 3)
        {
            TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT " +
                        "ISNULL(CUSTOMER_ITEM_CODE,ITEMS.CODE) AS CODE, " +
                        "ITEM_BARCODE.BARCODE AS BARCODE, " +
                        "ITEMS.NAME AS NAME, " +
                        "ITEMS.ITEM_GRP AS ITEM_GRP, " +
                        "ISNULL((SELECT NAME FROM ITEM_GROUP WHERE ITEM_GROUP.CODE = ITEMS.ITEM_GRP),'') AS ITEM_GRP_NAME, " +
                        "dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) AS PRICE, " +
                        "ISNULL((SELECT TOP 1 CONVERT(NVARCHAR,FACTOR) + ' ' + ISNULL((SELECT TOP 1 SHORT FROM UNIT WHERE UNIT.NAME = ITEM_UNIT.NAME),'') FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEMS.CODE AND TYPE = 1),0) AS UNDER_UNIT_VALUE, " +
                        "CASE WHEN dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) = 0 OR ISNULL((SELECT TOP 1 FACTOR FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEMS.CODE AND TYPE = 1),0) = 0 THEN " +
                        "'0' ELSE CONVERT(NVARCHAR,ROUND(dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) / ISNULL((SELECT TOP 1 FACTOR FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEMS.CODE AND TYPE = 1),0),2)) END AS UNDER_UNIT_PRICE, " +
                        "'' AS DESCRIPTION " +
                        "FROM ITEMS " +
                        "INNER JOIN ITEM_BARCODE ON  " +
                        "ITEM_BARCODE.ITEM_CODE = ITEMS.CODE " +
                        "LEFT OUTER JOIN ITEM_CUSTOMER ON " +
                        "ITEM_CUSTOMER.ITEM_CODE = ITEMS.CODE " + 
                        "WHERE " +
                        "ITEM_CUSTOMER.CUSTOMER_CODE = @CUSTOMER_CODE " +
                        "AND ITEMS.STATUS = 1",
                param: ['CUSTOMER_CODE:string|25'],
                value: [$scope.Wizard.TedarikciValue]
            }
        }
        else if(pIndex == 4)
        {
            TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT " +
                        "ISNULL(CUSTOMER_ITEM_CODE,ITEMS.CODE) AS CODE, " +
                        "ITEM_BARCODE.BARCODE AS BARCODE, " +
                        "ITEMS.NAME AS NAME, " +
                        "ITEMS.ITEM_GRP AS ITEM_GRP, " +
                        "ISNULL((SELECT NAME FROM ITEM_GROUP WHERE ITEM_GROUP.CODE = ITEMS.ITEM_GRP),'') AS ITEM_GRP_NAME, " +
                        "dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) AS PRICE, " +
                        "ISNULL((SELECT TOP 1 CONVERT(NVARCHAR,FACTOR) + ' ' + ISNULL((SELECT TOP 1 SHORT FROM UNIT WHERE UNIT.NAME = ITEM_UNIT.NAME),'') FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEMS.CODE AND TYPE = 1),0) AS UNDER_UNIT_VALUE, " +
                        "CASE WHEN dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) = 0 OR ISNULL((SELECT TOP 1 FACTOR FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEMS.CODE AND TYPE = 1),0) = 0 THEN " +
                        "'0' ELSE CONVERT(NVARCHAR,ROUND(dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) / ISNULL((SELECT TOP 1 FACTOR FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEMS.CODE AND TYPE = 1),0),2)) END AS UNDER_UNIT_PRICE, " +
                        "'' AS DESCRIPTION " +
                        "FROM ITEMS " +
                        "INNER JOIN ITEM_BARCODE ON  " +
                        "ITEM_BARCODE.ITEM_CODE = ITEMS.CODE " +
                        "LEFT OUTER JOIN ITEM_CUSTOMER ON " +
                        "ITEM_CUSTOMER.ITEM_CODE = ITEMS.CODE " + 
                        "WHERE " +
                        "ITEMS.STATUS = 1"
            }
        }

        db.GetDataQuery(TmpQuery,function(pData)
        {
            if(pData.length > 0)
            {
                for (let i = 0; i < pData.length; i++) 
                {
                    $scope.BarkodListe.push(pData[i]);
                }

                InitBarkodGrid();
                $scope.Kaydet();

                if(typeof EtiketSelected != 'undefined')
                {
                    $scope.Sayfa = Math.ceil($scope.BarkodListe.length / EtiketSelected.PAGE_COUNT);
                    $scope.BosEtiketAlan = EtiketSelected.PAGE_COUNT - ($scope.BarkodListe.length % EtiketSelected.PAGE_COUNT);
                }
            }

            $('#MdlWizard').modal('hide');
        });
    }
}