function SiparisEvrakCtrl ($scope,$window,db)
{
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
                    dataField: "DOC_TO_NAME",
                    caption: db.Language($scope.Lang,"NEREDEN"),
                    dataType: "string"
                },
                {
                    dataField: "DOC_FROM_NAME",
                    caption: db.Language($scope.Lang,"NEREYE"),
                    dataType: "string"
                }
            ],
            onSelectionChanged: function(selectedItems) 
            {
                //SelectedData = selectedItems.selectedRowsData;
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
                //SelectedData = selectedItems.selectedRowsData;
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
                allowDeleting: true,
                allowAdding: true
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
                    dataField: "MIKTAR",
                    caption: db.Language($scope.Lang,"Miktar"),
                    dataType: "number",
                    alignment: "center",
                    allowEditing: true,
                    width: "10%"
                }, 
                {
                    dataField: "PRICE",
                    caption: db.Language($scope.Lang,"Fiyat"),
                    dataType: "number",
                    width: "10%"
                }, 
                {
                    dataField: "AMOUNT",
                    caption : db.Language($scope.Lang,"Tutar"),
                    dataType: "number",
                    alignment: "center",
                    width: "10%"
                }
            ],
        }).dxDataGrid("instance");
    }
    $scope.Init = async function()
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

        $scope.TxtSeri = "SIP";
        $scope.TxtSira = (await db.GetPromiseTag($scope.Firma,'MaxSiparisNo',[]))[0].MAXSIRA;
        $scope.Depo = "";
        $scope.TxtCari = "";
        $scope.TxtBarkod = "";

        $scope.CariSecimListe = [];
        $scope.EvrakSecimListe = [];
        $scope.IslemListe = [];
        $scope.Stok = [];

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
                dataSource : "DepoListe"
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
    }
    $scope.BtnHome = function()
    {
        $("#TbMain").addClass('active');  
        $("#TbBarkod").removeClass('active');
    }
    $scope.BtnBarkodGiris = function()
    {
        $("#TbMain").removeClass('active');  
        $("#TbBarkod").addClass('active');
    }
}