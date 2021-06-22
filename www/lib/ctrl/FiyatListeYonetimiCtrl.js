function FiyatListeYonetimiCtrl ($scope,$window,db)
{
    function TblFiyatInit()
    {
        $("#TblFiyat").dxDataGrid(
        {
            dataSource: $scope.Data,
            allowColumnReordering: true,
            allowColumnResizing: true,
            showBorders: true,
            columnResizingMode: "nextColumn",
            columnMinWidth: 50,
            columnAutoWidth: true,
            filterRow: 
            {
                visible: true,
                applyFilter: "auto"
            },
            headerFilter: 
            {
                visible: true
            },
            paging: 
            {
                pageSize: 50
            },
            pager: 
            {
                showPageSizeSelector: true,
                allowedPageSizes: [25, 50, 100, 200, 500, 1000],
                showInfo: true
            },
            selection: 
            {
                mode: "single"
            },
            editing: 
            {
                mode: "batch",
                allowUpdating: true,
                selectTextOnEditStart: true,
                startEditAction: "click"
            },
            filterValue: [["STATUS", "=", true]],
            columns: 
            [
                {
                    dataField: "CUSTOMER_ITEM_CODE",
                    caption : db.Language($scope.Lang,"T. URUN KODU"),
                    dataType : "string",
                },
                {
                    dataField: "CUSTOMER",
                    caption : db.Language($scope.Lang,"TEDARİKÇİ"),
                    dataType : "string",
                    allowEditing: false
                },
                {
                    dataField: "NAME",
                    caption : db.Language($scope.Lang,"ÜRÜN ADI"),
                    dataType : "string",
                },
                {
                    dataField: "MAIN_UNIT",
                    caption : db.Language($scope.Lang,"ANA.B."),
                    dataType : "string",
                    allowEditing: false
                },
                {
                    dataField: "SUB_FACTOR",
                    caption : db.Language($scope.Lang,"ALT B.D"),
                    dataType : "number",
                },        
                {
                    dataField: "SUB_UNIT",
                    caption : db.Language($scope.Lang,"ALT B."),
                    dataType : "string",
                    lookup: 
                    {
                        dataSource: [{NAME:'U'},{NAME:'Kg'},{NAME:'L'}],
                        displayExpr: "NAME",
                        valueExpr: "NAME"
                    }
                },
                {
                    dataField: "COST_PRICE",
                    caption : db.Language($scope.Lang,"M.Fiyatı"),
                    dataType : "number",
                },
                {
                    dataField: "VAT",
                    caption : db.Language($scope.Lang,"TAX"),
                    dataType : "number",
                    lookup: 
                    {
                        dataSource: [{NAME:'5.5'},{NAME:'20'}],
                        displayExpr: "NAME",
                        valueExpr: "NAME"
                    }
                },
                {
                    dataField: "QUANTITY",
                    caption : db.Language($scope.Lang,"ADT."),
                    dataType : "number",
                },
                {
                    dataField: "PRICE",
                    caption : db.Language($scope.Lang,"SAT. €"),
                    dataType : "number",
                },        
                {
                    dataField: "NETMARJ",
                    caption : db.Language($scope.Lang,"MARJ"),
                    dataType : "string",
                    allowEditing: false
                },
                {
                    dataField: "ORGINS",
                    caption : db.Language($scope.Lang,"ORGINS"),
                    dataType : "string",
                    lookup: 
                    {
                        dataSource: $scope.MenseiListe,
                        displayExpr: "NAME",
                        valueExpr: "CODE"
                    }
                },
                {
                    dataField: "STATUS",
                    caption : db.Language($scope.Lang,"DURUM"),
                    dataType : "boolean"
                }
            ],
            onRowPrepared: function (rowInfo) 
            {  
                if(typeof rowInfo.data != 'undefined')
                {
                    if(rowInfo.data.STATUS == false)
                    {
                        rowInfo.rowElement.css('background', '#dce1e2');
                    }
                   
                }
            },
            onSaving: async function (e) 
            {
                let TmpQuery = {}
                let TmpObj = {}
                if(e.changes.length > 0)
                {
                    for(let i = 0;i < e.changes.length;i++)
                    {
                        TmpObj =
                        {
                            CODE : typeof e.changes[i].data.CODE == 'undefined' ? e.changes[i].key.CODE : e.changes[i].data.CODE,
                            CUSTOMER_ITEM_CODE : typeof e.changes[i].data.CUSTOMER_ITEM_CODE == 'undefined' ? e.changes[i].key.CUSTOMER_ITEM_CODE : e.changes[i].data.CUSTOMER_ITEM_CODE,
                            CUSTOMER_CODE : typeof e.changes[i].data.CUSTOMER_CODE == 'undefined' ? e.changes[i].key.CUSTOMER_CODE : e.changes[i].data.CUSTOMER_CODE,
                            CUSTOMER :  typeof e.changes[i].data.CUSTOMER == 'undefined' ? e.changes[i].key.CUSTOMER : e.changes[i].data.CUSTOMER,
                            NAME :  typeof e.changes[i].data.NAME == 'undefined' ? e.changes[i].key.NAME : e.changes[i].data.NAME,
                            MAIN_UNIT :  typeof e.changes[i].data.MAIN_UNIT == 'undefined' ? e.changes[i].key.MAIN_UNIT : e.changes[i].data.MAIN_UNIT,
                            SUB_FACTOR :  typeof e.changes[i].data.SUB_FACTOR == 'undefined' ? e.changes[i].key.SUB_FACTOR : e.changes[i].data.SUB_FACTOR,
                            SUB_UNIT :  typeof e.changes[i].data.SUB_UNIT == 'undefined' ? e.changes[i].key.SUB_UNIT : e.changes[i].data.SUB_UNIT,
                            COST_PRICE :  typeof e.changes[i].data.COST_PRICE == 'undefined' ? e.changes[i].key.COST_PRICE : e.changes[i].data.COST_PRICE,
                            VAT :  typeof e.changes[i].data.VAT == 'undefined' ? e.changes[i].key.VAT : e.changes[i].data.VAT,
                            QUANTITY :  typeof e.changes[i].data.QUANTITY == 'undefined' ? e.changes[i].key.QUANTITY : e.changes[i].data.QUANTITY,
                            PRICE :  typeof e.changes[i].data.PRICE == 'undefined' ? e.changes[i].key.PRICE : e.changes[i].data.PRICE,
                            NETMARJ :  typeof e.changes[i].data.NETMARJ == 'undefined' ? e.changes[i].key.NETMARJ : e.changes[i].data.NETMARJ,
                            ORGINS :  typeof e.changes[i].data.ORGINS == 'undefined' ? e.changes[i].key.ORGINS : e.changes[i].data.ORGINS,
                            STATUS :  typeof e.changes[i].data.STATUS == 'undefined' ? e.changes[i].key.STATUS : e.changes[i].data.STATUS
                        }
                        //TEDARİKÇİ UPDATE
                        TmpQuery = 
                        {
                            db : $scope.Firma,
                            query : "UPDATE ITEM_CUSTOMER SET CUSTOMER_ITEM_CODE = @CUSTOMER_ITEM_CODE WHERE CUSTOMER_CODE = @CUSTOMER_CODE AND ITEM_CODE = @ITEM_CODE",
                            param : ['CUSTOMER_ITEM_CODE:string|25','CUSTOMER_CODE:string|25','ITEM_CODE:string|25'],
                            value : [TmpObj.CUSTOMER_ITEM_CODE,TmpObj.CUSTOMER_CODE,TmpObj.CODE]
                        }
                        await db.ExecutePromiseQuery(TmpQuery);
                        //ÜRÜN UPDATE
                        TmpQuery = 
                        {
                            db : $scope.Firma,
                            query : "UPDATE ITEMS SET NAME = @NAME,COST_PRICE = @COST_PRICE,VAT = @VAT,ORGINS = @ORGINS, STATUS = @STATUS WHERE CODE = @CODE",
                            param : ['NAME:string|250','COST_PRICE:float','VAT:float','ORGINS:string|25','STATUS:bit','CODE:string|25'],
                            value : [TmpObj.NAME,TmpObj.COST_PRICE,TmpObj.VAT,TmpObj.ORGINS,TmpObj.STATUS,TmpObj.CODE]
                        }
                        await db.ExecutePromiseQuery(TmpQuery);
                        //ALT BİRİM UPDATE
                        TmpQuery = 
                        {
                            db : $scope.Firma,
                            query : "SELECT TOP 1 UNIT.NAME AS NAME FROM UNIT WHERE UNIT.SHORT = @SUB_UNIT",
                            param : ['SUB_UNIT:string|10'],
                            value : [TmpObj.SUB_UNIT]
                        }

                        let TmpUnit = await db.GetPromiseQuery(TmpQuery);

                        let InsertData =
                        [
                            $scope.Kullanici,
                            $scope.Kullanici,
                            TmpObj.CODE,
                            1,
                            TmpUnit.length > 0 ? TmpUnit[0].NAME : '',
                            TmpObj.SUB_FACTOR,
                            0,
                            0,
                            0,
                            0,
                            0
                        ];

                        await db.ExecutePromiseTag($scope.Firma,'BirimKaydet',InsertData)

                        //TEDARİKÇİ FİYATI GETİRİLİYOR
                        TmpQuery = 
                        {
                            db : $scope.Firma,
                            query : "SELECT PRICE FROM ITEM_PRICE WHERE CUSTOMER = @CUSTOMER AND ITEM_CODE = @CODE AND TYPE = 1",
                            param : ['CUSTOMER:string|25','CODE:string|25'],
                            value : [TmpObj.CUSTOMER_CODE,TmpObj.CODE]
                        }
                        let TmpData = await db.GetPromiseQuery(TmpQuery);
                        //EĞER TEDARİKÇİ FİYATI VAR İSE
                        if(TmpData.length > 0)
                        {
                            //MALİYET FİYAT UPDATE
                            TmpQuery = 
                            {
                                db : $scope.Firma,
                                query : "UPDATE ITEM_PRICE SET PRICE = @PRICE,LDATE = GETDATE() WHERE CUSTOMER = @CUSTOMER AND ITEM_CODE = @CODE AND TYPE = 1",
                                param : ['PRICE:float','CUSTOMER:string|25','CODE:string|25'],
                                value : [TmpObj.COST_PRICE,TmpObj.CUSTOMER_CODE,TmpObj.CODE]
                            }
                            await db.ExecutePromiseQuery(TmpQuery);
                        }
                        else
                        {
                            InsertData =
                            [
                                $scope.Kullanici,
                                $scope.Kullanici,
                                TmpObj.CODE,
                                1,
                                0,
                                '01.01.1970',
                                '01.01.1970',
                                TmpObj.COST_PRICE,
                                1,
                                TmpObj.CUSTOMER_CODE
                            ];

                            await db.ExecutePromiseTag($scope.Firma,'FiyatKaydet',InsertData)
                        }
                        //SATIŞ FİYATI GETİRİLİYOR
                        TmpQuery = 
                        {
                            db : $scope.Firma,
                            query : "SELECT PRICE FROM ITEM_PRICE WHERE QUANTITY = @QUANTITY AND ITEM_CODE = @CODE AND TYPE = 0 AND START_DATE = '19700101'",
                            param : ['QUANTITY:float','CODE:string|25'],
                            value : [TmpObj.QUANTITY,TmpObj.CODE]
                        }
                        TmpData = await db.GetPromiseQuery(TmpQuery);
                        //EĞER SATIŞ FİYATI VAR İSE
                        if(TmpData.length > 0)
                        {
                            //SATIŞ FİYAT UPDATE
                            TmpQuery = 
                            {
                                db : $scope.Firma,
                                query : "UPDATE ITEM_PRICE SET PRICE = @PRICE,LDATE = GETDATE() WHERE QUANTITY = @QUANTITY AND ITEM_CODE = @CODE AND TYPE = 0 AND START_DATE = '19700101'",
                                param : ['PRICE:float','QUANTITY:float','CODE:string|25'],
                                value : [TmpObj.PRICE,TmpObj.QUANTITY,TmpObj.CODE]
                            }
                            await db.ExecutePromiseQuery(TmpQuery);
                        }
                        else
                        {
                            InsertData =
                            [
                                $scope.Kullanici,
                                $scope.Kullanici,
                                TmpObj.CODE,
                                0,
                                0,
                                '01.01.1970',
                                '01.01.1970',
                                TmpObj.PRICE,
                                TmpObj.QUANTITY,
                                ''
                            ];

                            await db.ExecutePromiseTag($scope.Firma,'FiyatKaydet',InsertData)
                        }

                        $scope.BtnAra();
                    }
                }
            }
        });
    }
    function MenseiGetir()
    {
        return new Promise(resolve => 
        {
            db.GetData($scope.Firma,'MenseiGetir',['FR',''],function(pData)
            {
                $scope.MenseiListe = pData;
                resolve();
            });
        });
        
    }
    $scope.Init = async function()
    {
        $scope.Kullanici = $window.sessionStorage.getItem('User');
        $scope.Firma = 'PIQPOS'     

        $scope.Data = [];
        $scope.TedarikciList = [];
        $scope.MenseiListe = [];

        $scope.Kodu = "";
        $scope.Adi = "";
        $scope.Grup = "";
        $scope.Tedarikci = "";

        $scope.GrupGetir();
        $scope.TedarikciGetir();

        $scope.CmbTedarikci = 
        {
            width: "100%",
            displayExpr: "NAME",
            valueExpr: "CODE",
            value: "",
            showClearButton: true,
            searchEnabled: true,
            bindingOptions: 
            {
                value: 'Tedarikci',
                dataSource: 
                {
                    deep: true,
                    dataPath: 'TedarikciList'
                }
            },
            onSelectionChanged : function(e)
            {
                if(e.selectedItem == null)
                {
                    $scope.Tedarikci = ""
                }
            }
        }
        $scope.CmbGrup = 
        {
            width: "100%",
            displayExpr: "NAME",
            valueExpr: "CODE",
            value: "",
            showClearButton: true,
            searchEnabled: true,
            bindingOptions: 
            {
                value: 'Grup',
                dataSource: 
                {
                    deep: true,
                    dataPath: 'GrupList'
                }
            },
            onSelectionChanged : function(e)
            {
                if(e.selectedItem == null)
                {
                    $scope.Grup = ""
                }
            }
        }

        await MenseiGetir();
        TblFiyatInit();
    }
    $scope.GrupGetir = function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT [NAME],[CODE] FROM ITEM_GROUP"
        }
        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.GrupList = Data
        });
    }
    $scope.TedarikciGetir = function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT CODE,NAME FROM CUSTOMERS WHERE TYPE = 1 ORDER BY NAME ASC"
        }
        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.TedarikciList = Data
        });
    } 
    $scope.BtnAra = async function()
    {

        let TmpVal = ""
        
        for (let i = 0; i < $scope.Kodu.split(' ').length; i++) 
        {
            TmpVal += "'" + $scope.Kodu.split(' ')[i] + "'"
            if($scope.Kodu.split(' ').length > 1 && i !=  ($scope.Kodu.split(' ').length - 1))
            {
                TmpVal += ","
            }
        }

        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT  " +
                    "ITEMS.CODE AS CODE, " +
                    "ISNULL(ITEM_CUSTOMER.CUSTOMER_ITEM_CODE,'') AS CUSTOMER_ITEM_CODE, " +
                    "ISNULL(ITEM_CUSTOMER.CUSTOMER_CODE,'') AS CUSTOMER_CODE, " +
                    "ISNULL((SELECT TOP 1 LAST_NAME + ' ' + NAME FROM CUSTOMERS WHERE CODE = ITEM_CUSTOMER.CUSTOMER_CODE),'') CUSTOMER, " +
                    "ITEMS.NAME AS NAME, " +
                    "ISNULL((SELECT TOP 1 CONVERT(NVARCHAR,FACTOR) + '/' + ISNULL((SELECT UNIT.SHORT FROM UNIT WHERE NAME = ITEM_UNIT.NAME),'') FROM ITEM_UNIT WHERE ITEM_CODE = ITEMS.CODE AND TYPE = 0),'1/U') MAIN_UNIT, " +
                    "ISNULL((SELECT TOP 1 FACTOR FROM ITEM_UNIT WHERE ITEM_CODE = ITEMS.CODE AND TYPE = 1),'') SUB_FACTOR, " +
                    "ISNULL((SELECT TOP 1 ISNULL((SELECT UNIT.SHORT FROM UNIT WHERE NAME = ITEM_UNIT.NAME),'') FROM ITEM_UNIT WHERE ITEM_CODE = ITEMS.CODE AND TYPE = 1),'') SUB_UNIT, " +
                    "ITEMS.COST_PRICE AS COST_PRICE, " +
                    "ITEMS.VAT AS VAT, " +
                    "ISNULL(ITEM_PRICE.QUANTITY,0) AS QUANTITY, " +
                    "ISNULL(ITEM_PRICE.PRICE,0) AS PRICE, " +
                    "CASE WHEN ROUND([PRICE] / ((ITEMS.VAT / 100) + 1),2) = 0 OR COST_PRICE = 0 THEN '0€ / %0' ELSE  " +
                    "CONVERT(nvarchar,ROUND((ROUND([PRICE] / ((ITEMS.VAT / 100) + 1),2) - COST_PRICE) / 1.27,2)) + '€ / %' + CONVERT(nvarchar,ROUND((((ROUND([PRICE] / ((ITEMS.VAT / 100) + 1),2) - COST_PRICE) / 1.27) / ROUND([PRICE] / ((ITEMS.VAT / 100) + 1),2)) * 100,0)) END AS NETMARJ, " +
                    "ISNULL((SELECT CODE FROM COUNTRY WHERE CODE = ITEMS.ORGINS),'') AS ORGINS, " +
                    "ITEMS.STATUS AS STATUS " +
                    "FROM ITEM_CUSTOMER  " +
                    "RIGHT OUTER JOIN ITEMS ON  " +
                    "ITEMS.CODE = ITEM_CODE " +
                    "LEFT OUTER JOIN ITEM_PRICE ON " +
                    "ITEM_PRICE.ITEM_CODE = ITEMS.CODE AND ITEM_PRICE.TYPE = 0 AND ITEM_PRICE.START_DATE = '19700101' " +
                    "WHERE {0} ((ITEMS.NAME LIKE @NAME + '%') OR (@NAME = '')) AND " +
                    "((ITEM_CUSTOMER.CUSTOMER_CODE = @CUSTOMER_CODE) OR (@CUSTOMER_CODE = '')) AND ((ITEMS.ITEM_GRP = @ITEM_GRP) OR (@ITEM_GRP = ''))",
            param:  ['NAME','CUSTOMER_CODE','ITEM_GRP'],
            type:   ['string|200','string|25','string|25'],
            value:  [$scope.Adi, $scope.Tedarikci, $scope.Grup]            
        }
        
        if($scope.Kodu != '')
        {
            if($scope.Kodu.split(' ').length > 1)
            {
                TmpQuery.query = TmpQuery.query.replace('{0}'," ((ITEMS.CODE IN (" + TmpVal + ")) OR ITEMS.CODE IN (SELECT ITEM_CODE FROM ITEM_BARCODE WHERE BARCODE IN (" + TmpVal + "))) AND ");
            }
            else
            {
                TmpQuery.query = TmpQuery.query.replace('{0}', " ((ITEMS.CODE LIKE " + TmpVal + " + '%') OR (ITEMS.CODE = (SELECT ITEM_CODE FROM ITEM_BARCODE WHERE BARCODE LIKE " + TmpVal + " + '%'))) AND ");
            }
        }
        else
        {
            TmpQuery.query = TmpQuery.query.replace('{0}','');
        }


        let TmpData = await db.GetPromiseQuery(TmpQuery)
        $scope.Data = TmpData;
        
        TblFiyatInit();
    }
}