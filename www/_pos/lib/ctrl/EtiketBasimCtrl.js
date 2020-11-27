function EtiketBasimCtrl ($scope,$window,db)
{
    let SelectedData = []
    let TmpGrid;

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
            headerFilter: {
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
                    dataField: "CODE",
                    caption: "TEDARİKÇİ KODU",
                    dataType: "string",
                    allowEditing: false
                },
                {
                    dataField: "BARCODE",
                    caption: "BARKOD",
                    dataType: "string",
                    allowEditing: false
                },
                {
                    dataField: "NAME",
                    caption: "ADI",
                    dataType: "string"
                },
                {
                    dataField: "PRICE",
                    caption: "FİYAT",
                    dataType: "number"
                },
                {
                    dataField: "UNDER_UNIT_VALUE",
                    caption: "ALT B. DEGER",
                    dataType: "string"
                },
                {
                    dataField: "UNDER_UNIT_PRICE",
                    caption: "ALT B. FİYAT",
                    dataType: "string",
                }
            ],
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
                    caption: "KODU",
                    dataType: "string"
                },
                {
                    dataField: "BARCODE",
                    caption: "BARKOD",
                    dataType: "string"
                },
                {
                    dataField: "NAME",
                    caption: "ADI",
                    dataType: "string"
                },
                {
                    dataField: "ITEM_GRP_NAME",
                    caption: "GRUP",
                    dataType: "string"
                },
                {
                    dataField: "PRICE",
                    caption: "FİYAT",
                    dataType: "string"
                }
            ],
            onSelectionChanged: function(selectedItems) 
            {
                SelectedData = selectedItems.selectedRowsData;
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
                        "CUSTOMER_ITEM_CODE AS CODE, " +
                        "ITEM_BARCODE.BARCODE AS BARCODE, " +
                        "ITEMS.NAME AS NAME, " +
                        "ITEMS.ITEM_GRP AS ITEM_GRP, " +
                        "ISNULL((SELECT NAME FROM ITEM_GROUP WHERE ITEM_GROUP.CODE = ITEMS.ITEM_GRP),'') AS ITEM_GRP_NAME, " +
                        "dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) AS PRICE, " +
                        "ISNULL((SELECT TOP 1 CONVERT(NVARCHAR,FACTOR) + ' ' + ISNULL((SELECT TOP 1 SHORT FROM UNIT WHERE UNIT.NAME = ITEM_UNIT.NAME),'') FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEMS.CODE AND TYPE = 1),0) AS UNDER_UNIT_VALUE, " +
                        "CASE WHEN dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) = 0 OR ISNULL((SELECT TOP 1 FACTOR FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEMS.CODE AND TYPE = 1),0) = 0 THEN " +
                        "'0' + ' €' ELSE CONVERT(NVARCHAR,ROUND(dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) / ISNULL((SELECT TOP 1 FACTOR FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEMS.CODE AND TYPE = 1),0),2)) + ' €' END AS UNDER_UNIT_PRICE " +
                        "FROM ITEMS " +
                        "INNER JOIN ITEM_BARCODE ON  " +
                        "ITEM_BARCODE.ITEM_CODE = ITEMS.CODE  " +
                        "INNER JOIN ITEM_CUSTOMER ON " +
                        "ITEM_CUSTOMER.ITEM_CODE = ITEMS.CODE " +
                        "WHERE ((BARCODE = @BARCODE) OR (ITEMS.CODE = @BARCODE) OR (@BARCODE = '')) AND ITEMS.STATUS = 1",
                param : ['BARCODE:string|25'],
                value : [pBarkod]
            }

            let TmpData = await db.GetPromiseQuery(TmpQuery);
            
            resolve(TmpData)
        });
        
    }
    $scope.Init = async function()
    {
        SelectedData = [];

        $scope.Kullanici = $window.sessionStorage.getItem('User');
        $scope.Sube = "1";

        $scope.Firma = 'PIQPOS';

        $scope.StokSecimListe = [];
        $scope.BarkodListe = [];
        $scope.EtiketListe = [];
        $scope.EtiketObj = {};
        $scope.EtiketName = "";

        InitBarkodGrid();
        InitStokSecimGrid();

        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT DESIGN_NAME,TAG,PAGE_COUNT FROM LABEL_DESIGN",
        }

        let TmpData = await db.GetPromiseQuery(TmpQuery);
        $scope.EtiketListe = TmpData;
        $scope.$apply();
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
        }
    }
    $scope.DesignChange = function()
    {
        for(let i = 0;i < $scope.EtiketListe.length;i++)
        {
            if($scope.EtiketListe[i].DESIGN_NAME == $scope.EtiketName)
            {
                $scope.EtiketObj = $scope.EtiketListe[i];
            }
        }
    }
    $scope.Kaydet = function()
    {
        if(typeof $scope.EtiketObj.DESIGN_NAME != 'undefined')
        {
            let Data = {data:$scope.BarkodListe}

            let InsertData = 
            [
                $scope.Kullanici,
                $scope.Kullanici,
                JSON.stringify(Data),
                $scope.EtiketObj.TAG,
                1,
                0
            ]
            db.ExecuteTag($scope.Firma,'LabelQueueInsert',InsertData)

            alertify.alert("Yazdırma emri gönderildi.")
        }
    }
}