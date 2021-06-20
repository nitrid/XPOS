function TopluSiparisBirlestirmeCtrl ($scope,$window,db)
{
    let TblIslem;
    function TblIslemInit()
    {
        $('#exportButton').dxButton({
            icon: 'exportpdf',
            text: 'Export to PDF',
            onClick: function() {
              const doc = new jsPDF();
              DevExpress.pdfExporter.exportDataGrid({
                jsPDFDocument: doc,
                component: TblIslem
              }).then(function() {
                doc.save('Order.pdf');
              });
            }
        });

        TblIslem = $("#TblIslem").dxDataGrid(
        {
            dataSource: $scope.IslemListe,
            allowColumnReordering: true,
            allowColumnResizing: true,
            showBorders: true,
            columnChooser: 
            {
                enabled: true
            },
            scrolling: 
            {
                columnRenderingMode: "virtual"
            },
            filterRow: 
            { 
                visible: true
            },
            headerFilter: 
            {
                visible: true
            },
            editing: 
            {
                mode: "cell",
                allowUpdating: true,
                allowDeleting: true
            },
            columns: 
            [
                {
                    dataField: "ITEM_CODE",
                    caption: db.Language($scope.Lang,"KODU"),
                    dataType: "string",
                    allowEditing: false,
                    width: "120"
                },
                {
                    dataField: "ITEM_NAME",
                    caption: db.Language($scope.Lang,"ADI"),
                    dataType: "string",
                    allowEditing: false,             
                    width: "400"
                },
                {
                    dataField: "CUSTOMER_ITEM_CODE",
                    caption: db.Language($scope.Lang,"TEDARIKCI URUN KODU"),
                    dataType: "string",
                    allowEditing: false,
                    width: "120"
                },
                {
                    dataField: "CUSTOMER_CODE",
                    caption: db.Language($scope.Lang,"CARI KODU"),
                    dataType: "string",
                    width: "120",
                    editCellTemplate: InitBteCariKodu,
                },
                {
                    dataField: "CUSTOMER_NAME",
                    caption: db.Language($scope.Lang,"CARI ADI"),
                    dataType: "string",
                    width: "400",
                    allowEditing: false
                },
                {
                    dataField: "QUANTITY",
                    caption: db.Language($scope.Lang,"Miktar"),
                    dataType: "number",
                    width: "100",
                },
                {
                    dataField: "PRICE",
                    caption: db.Language($scope.Lang,"Fiyat"),
                    dataType: "number",
                    width: "100",
                },                
                {
                    dataField: "AMOUNT",
                    caption: db.Language($scope.Lang,"TUTAR"),
                    dataType: "number",
                    width: "100",
                    allowEditing: false,
                }
            ],
            onRowRemoved: function(e) 
            {
                
            },
            onRowUpdated: async function(e) 
            {
                
            },
        }).dxDataGrid("instance");
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
                    dataField: "DOC_DATE",
                    caption: db.Language($scope.Lang,"TARIH"),
                    dataType: "date",
                    format: 'dd/MM/yyyy'
                },
                {
                    dataField: "REF",
                    caption: db.Language($scope.Lang,"REF"),
                    dataType: "string"
                },
                {
                    dataField: "REF_NO",
                    caption: db.Language($scope.Lang,"REF NO"),
                    dataType: "string"
                }                
            ],
            onSelectionChanged: function(selectedItems) 
            {
                if(selectedItems.selectedRowsData.length > 0)
                {
                    $scope.Seri = selectedItems.selectedRowsData[0].REF;
                    $scope.Sira = selectedItems.selectedRowsData[0].REF_NO;
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
                },
                {
                    dataField: "PRICE",
                    caption: db.Language($scope.Lang,"PRICE"),
                    dataType: "number"
                }
            ],
            onSelectionChanged: function(selectedItems) 
            {
                if(selectedItems.selectedRowsData.length > 0)
                {
                    $scope.CariSelectCell.SelectedData = selectedItems.selectedRowsData[0];                                        
                }
            }
        }).dxDataGrid("instance");        
    }
    function InitBteCariKodu(cellElement, cellInfo) 
    {
        $scope.CariSelectCell = cellInfo;
        $scope.CariKodu = cellInfo.data.CUSTOMER_CODE
        return $("<div>").dxTextBox({
            mode: 'text',
            value: cellInfo.data.CUSTOMER_CODE,
            stylingMode: 'filled',
            buttons: 
            [{
                name: 'BteCariKodu',
                location: 'after',
                options: 
                {
                    icon: 'more',
                    type: 'default',
                    onClick: function() 
                    {
                        $scope.BtnCariSecim();                        
                    }
                } 
            }]
        });
    }
    async function Kaydet()
    {
        let TmpGrp = db.ToGroupBy($scope.IslemListe,'CUSTOMER_CODE')

        for (let i = 0; i < Object.keys(TmpGrp).length; i++) 
        {
            let TmpArr = TmpGrp[Object.keys(TmpGrp)[i]];
            let TmpSira = (await db.GetPromiseTag($scope.Firma,'MaxSiparisNo',[$scope.Wizard.Seri,0]))[0].MAXSIRA;

            for (let m = 0; m < TmpArr.length; m++) 
            {
                let InserData = 
                [
                    $scope.Kullanici,
                    $scope.Kullanici,
                    0,
                    0,
                    $scope.Wizard.Seri,
                    TmpSira,
                    TmpArr[m].DOC_DATE,
                    TmpArr[m].CUSTOMER_CODE,
                    TmpArr[m].DOC_TO,
                    TmpArr[m].ITEM_CODE,
                    TmpArr[m].QUANTITY,
                    TmpArr[m].PRICE,
                    0,
                    TmpArr[m].VAT,
                    1
                ]
                
                await db.ExecutePromiseTag($scope.Firma,'SiparisInsert',InserData)
            }
        }
        $('#MdlWizard').modal('hide');
        alertify.alert(db.Language($scope.Lang,"Sipariş Oluşturuldu."));
    }
    $scope.Init = function()
    {
        window.jsPDF = window.jspdf.jsPDF;
        applyPlugin(window.jsPDF);

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

        $scope.Seri = "";
        $scope.Sira = 1;

        $scope.IslemListe = [];
        $scope.EvrakSecimListe = [];
        $scope.CariSecimListe = [];

        $scope.CariSelectCell = {};
        $scope.Wizard = {};

        TblIslemInit();        
    }
    $scope.BtnEvrakSecim = function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT " +
                    "REF AS [REF], " +
                    "REF_NO AS [REF_NO], " +
                    "DOC_DATE AS [DOC_DATE] " +
                    "FROM ORDER_M_VW_01 WHERE DOC_TYPE = @DOC_TYPE AND TYPE = @TYPE",
            param:  ['DOC_TYPE','TYPE'],
            type:   ['int','int'],
            value:  [2,0]
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

        if($scope.Seri != '' || $scope.Sira != 0)
        {
            let TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT " + 
                        "DOC_DATE AS DOC_DATE, " + 
                        "DOC_TO AS DOC_TO, " +
                        "ITEM_CODE AS ITEM_CODE, " + 
                        "ITEM_NAME AS ITEM_NAME, " + 
                        "CASE WHEN (SELECT COUNT(*) FROM ITEM_CUSTOMER AS C WHERE C.ITEM_CODE =  O.ITEM_CODE) = 1 THEN " + 
                        "ISNULL((SELECT CUSTOMER_ITEM_CODE FROM ITEM_CUSTOMER AS C WHERE C.ITEM_CODE =  O.ITEM_CODE),'') " + 
                        "ELSE '' END AS  CUSTOMER_ITEM_CODE, " +
                        "CASE WHEN (SELECT COUNT(*) FROM ITEM_CUSTOMER AS C WHERE C.ITEM_CODE =  O.ITEM_CODE) = 1 THEN " + 
                        "ISNULL((SELECT CUSTOMER_CODE FROM ITEM_CUSTOMER AS C WHERE C.ITEM_CODE =  O.ITEM_CODE),'') " + 
                        "ELSE '' END AS  CUSTOMER_CODE, " + 
                        "CASE WHEN (SELECT COUNT(*) FROM ITEM_CUSTOMER AS C WHERE C.ITEM_CODE =  O.ITEM_CODE) = 1 THEN " + 
                        "ISNULL((SELECT ISNULL((SELECT NAME FROM CUSTOMERS WHERE CODE = CUSTOMER_CODE),'') FROM ITEM_CUSTOMER AS C WHERE C.ITEM_CODE =  O.ITEM_CODE),'') " + 
                        "ELSE '' END AS CUSTOMER_NAME, " + 
                        "QUANTITY AS QUANTITY, " + 
                        "CASE WHEN (SELECT COUNT(*) FROM ITEM_CUSTOMER AS C WHERE C.ITEM_CODE =  O.ITEM_CODE) = 1 THEN " + 
                        "ISNULL((SELECT ISNULL((SELECT TOP 1 PRICE FROM ITEM_PRICE WHERE ITEM_CODE = O.ITEM_CODE AND CUSTOMER = CUSTOMER_CODE ORDER BY LDATE DESC),0) FROM ITEM_CUSTOMER AS C WHERE C.ITEM_CODE =  O.ITEM_CODE),'') " + 
                        "ELSE '' END AS PRICE, " + 
                        "CASE WHEN (SELECT COUNT(*) FROM ITEM_CUSTOMER AS C WHERE C.ITEM_CODE =  O.ITEM_CODE) = 1 THEN " + 
                        "ISNULL((SELECT ISNULL((SELECT TOP 1 PRICE FROM ITEM_PRICE WHERE ITEM_CODE = O.ITEM_CODE AND CUSTOMER = CUSTOMER_CODE ORDER BY LDATE DESC),0) * QUANTITY FROM ITEM_CUSTOMER AS C WHERE C.ITEM_CODE =  O.ITEM_CODE),'') " + 
                        "ELSE '' END AS AMOUNT, " +
                        "VAT AS VAT " +
                        "FROM ORDER_VW_01 AS O WHERE DOC_TYPE = 2 AND TYPE = 0 AND REF = @REF AND REF_NO = @REF_NO " +
                        "ORDER BY CASE WHEN (SELECT COUNT(*) FROM ITEM_CUSTOMER AS C WHERE C.ITEM_CODE =  O.ITEM_CODE) = 1 THEN 1 ELSE 0 END ASC",
                param:  ['DOC_TYPE','TYPE','REF','REF_NO'],
                type:   ['int','int','string|25','int'],
                value:  [2,0,$scope.Seri,$scope.Sira]
            }
            db.GetDataQuery(TmpQuery,function(pData)
            {
                $scope.IslemListe = pData;
                TblIslemInit();
            });
        }
    }
    $scope.BtnCariSecim = function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT " +
                    "CODE AS CODE," +
                    "NAME AS NAME, " +
                    "ISNULL((SELECT TOP 1 CUSTOMER_ITEM_CODE FROM ITEM_CUSTOMER WHERE CUSTOMER_CODE = CODE AND ITEM_CODE = @ITEM_CODE),'') AS CUSTOMER_ITEM_CODE, " +
                    "ISNULL((SELECT TOP 1 PRICE FROM ITEM_PRICE WHERE ITEM_CODE = @ITEM_CODE AND CUSTOMER = CODE ORDER BY LDATE DESC),0) AS PRICE " +
                    "FROM CUSTOMERS WHERE (CODE IN ((SELECT CUSTOMER_CODE FROM ITEM_CUSTOMER WHERE ITEM_CODE = @ITEM_CODE))) OR (@ITEM_CODE = '') AND GENUS = 1",
            param: ['ITEM_CODE:string|25'],
            value: [$scope.CariSelectCell.data.ITEM_CODE]
        }
        db.GetDataQuery(TmpQuery,async function(pData)
        {
            if(pData.length == 0)
            {
                TmpQuery = 
                {
                    db : $scope.Firma,
                    query:  "SELECT CODE AS CODE, NAME AS NAME, 0 AS PRICE FROM CUSTOMERS WHERE GENUS = 1",
                }
                pData = (await db.ExecutePromiseQuery(TmpQuery)).result.recordset;
            }
            
            $('#MdlCariSecim').modal('show');
            $scope.CariSecimListe = pData;
            TblCariInit();
        });
    }
    $scope.BtnCariGridSec = function()
    {        
        $('#MdlCariSecim').modal('hide');
        if(typeof $scope.CariSelectCell.SelectedData != 'undefined')
        {
            db.SafeApply($scope,function()
            {
                TblIslem.cellValue($scope.CariSelectCell.rowIndex,"CUSTOMER_ITEM_CODE",$scope.CariSelectCell.SelectedData.CUSTOMER_ITEM_CODE)
                TblIslem.cellValue($scope.CariSelectCell.rowIndex,"CUSTOMER_CODE",$scope.CariSelectCell.SelectedData.CODE)
                TblIslem.cellValue($scope.CariSelectCell.rowIndex,"CUSTOMER_NAME",$scope.CariSelectCell.SelectedData.NAME)
                TblIslem.cellValue($scope.CariSelectCell.rowIndex,"PRICE",$scope.CariSelectCell.SelectedData.PRICE)
                TblIslem.cellValue($scope.CariSelectCell.rowIndex,"AMOUNT",parseFloat($scope.CariSelectCell.SelectedData.PRICE * $scope.CariSelectCell.data.QUANTITY).toFixed(2))
                TblIslem.saveEditData()
            });
        }
    }
    $scope.BtnWizard = function()
    {        
        if($scope.IslemListe.length == 0)
        {
            alertify.alert(db.Language($scope.Lang,"Önce toplu sipariş seçiniz !"));
            return;
        }
        for (let i = 0; i < $scope.IslemListe.length; i++) 
        {
            if($scope.IslemListe[i].CUSTOMER_CODE == "")
            {
                alertify.alert(db.Language($scope.Lang,"Liste de tedarikçi seçilmemiş satır var !"));
                return;
            }
        }

        $('#MdlWizard').modal('show');

        $scope.Wizard.Seri = ""

        $scope.Wizard.CurrentPage = "1";

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
                if($scope.Wizard.Seri == "")
                {
                    alertify.alert(db.Language($scope.Lang,"Lütfen sipariş serisi giriniz !"));
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
            Kaydet();
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
}