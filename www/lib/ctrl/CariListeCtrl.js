function CariListeCtrl ($scope,$window,db)
{
    let GrdPage = true;
    let TmpFields =
    [
        {
            dataField: "CODE",
            caption : db.Language($scope.Lang,"CODE"),
            dataType : "string",
        },
        {
            dataField: "NAME",
            caption : db.Language($scope.Lang,"NAME"),
            dataType : "string",
        },
        {
            dataField: "GENUS",
            caption : db.Language($scope.Lang,"GENUS"),
            dataType : "string",
            visible: false
        },
        {
            dataField: "LAST_NAME",
            caption : db.Language($scope.Lang,"LAST_NAME"),
            dataType : "string",
            visible: false
        },
        {
            dataField: "CUSTOMER_GRP",
            caption : db.Language($scope.Lang,"CUSTOMER_GRP"),
            dataType : "string",
            visible: false
        },
        {
            dataField: "PHONE1",
            caption : db.Language($scope.Lang,"PHONE1"),
            dataType : "string",
            visible: false
        },
        {
            dataField: "PHONE2",
            caption : db.Language($scope.Lang,"PHONE2"),
            dataType : "string",
            visible: false
        },
        {
            dataField: "GSM_PHONE",
            caption : db.Language($scope.Lang,"GSM_PHONE"),
            dataType : "string",
            visible: false
        },
        {
            dataField: "OTHER_PHONE",
            caption : db.Language($scope.Lang,"OTHER_PHONE"),
            dataType : "string",
            visible: false
        },
        {
            dataField: "EMAIL",
            caption : db.Language($scope.Lang,"EMAIL"),
            dataType : "string",
            visible: false
        },
        {
            dataField: "WEB",
            caption : db.Language($scope.Lang,"WEB"),
            dataType : "string",
            visible: false
        },
        {
            dataField: "SIRET_ID",
            caption : db.Language($scope.Lang,"SIRET_ID"),
            dataType : "string",
            visible: false
        },
        {
            dataField: "APE_CODE",
            caption : db.Language($scope.Lang,"APE_CODE"),
            dataType : "string",
            visible: false
        },
        {
            dataField: "TAX_OFFICE",
            caption : db.Language($scope.Lang,"TAX_OFFICE"),
            dataType : "string",
            visible: false
        },
        {
            dataField: "TAX_NO",
            caption : db.Language($scope.Lang,"TAX_NO"),
            dataType : "string",
            visible: false
        }
    ];
    function TblCariInit()
    {
        $("#TblCari").dxDataGrid(
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
            columns: TmpFields,
            onRowDblClick: function(e)
            {
                $window.location = "#!Cari?Id=" + e.data.CODE
            }
        });
        // $("#TblCari").jsGrid
        // ({
        //     width: "100%",
        //     updateOnResize: true,
        //     heading: true,
        //     selecting: true,
        //     data : $scope.Data,
        //     paging : GrdPage,
        //     pageSize: 200,
        //     pageButtonCount: 5,
        //     pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
        //     fields: TmpFields
        // });
    }
    function CariGetir()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT " + 
                    "CODE AS CODE, " + 
                    "GENUS AS GENUS, " + 
                    "NAME AS NAME, " + 
                    "LAST_NAME AS LAST_NAME, " + 
                    "CUSTOMER_GRP AS CUSTOMER_GRP, " + 
                    "PHONE1 AS PHONE1, " + 
                    "PHONE2 AS PHONE2, " + 
                    "GSM_PHONE AS GSM_PHONE, " + 
                    "OTHER_PHONE AS OTHER_PHONE, " + 
                    "EMAIL AS EMAIL, " + 
                    "WEB AS WEB, " + 
                    "NOTE AS NOTE, " + 
                    "SIRET_ID AS SIRET_ID, " + 
                    "APE_CODE AS APE_CODE, " + 
                    "TAX_OFFICE AS TAX_OFFICE, " + 
                    "TAX_NO AS TAX_NO, " + 
                    "INT_VAT_NO AS INT_VAT_NO " + 
                    "FROM CUSTOMERS WHERE ((UPPER(CODE) = @CODE) OR (@CODE = '')) AND ((UPPER(NAME) LIKE @NAME + '%') OR (@NAME = '')) AND GENUS = @GENUS",
            param : ["CODE:string|50","NAME:string|250","GENUS:int"],
            value : [$scope.Kodu,$scope.Adi,$scope.Tip]
        }

        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.Data = Data
            TblCariInit();
            //$("#TblCari").jsGrid({data : $scope.Data});
        });
    }
    $scope.Init = function()
    {
        GrdPage = true;

        $scope.Data = [];

        $scope.Kolon = ["CODE","NAME"];
        $scope.Kodu = "";
        $scope.Adi = "";
        $scope.Tip = "0";

        TblCariInit();

        setTimeout(function () 
        {
            $('select').selectpicker('refresh');
        },500)
    }
    $scope.KolonChange = function()
    {
        for (let i = 0; i < TmpFields.length; i++) 
        {
            TmpFields[i].visible = false;
        }

        for (let i = 0; i < TmpFields.length; i++) 
        {
            for (let x = 0; x < $scope.Kolon.length; x++) 
            {
                if($scope.Kolon[x] == TmpFields[i].name)    
                {
                    TmpFields[i].visible = true;
                }                
            }            
        }

        TblCariInit();
    }
    $scope.BtnAra = function()
    {
        CariGetir();
    }
    $scope.TxtAra = function(keyEvent)
    {    
        if(keyEvent.which === 13)
        {   
            CariGetir();
        }
    }
    $scope.BtnAll = function()
    {
        GrdPage = false;
        TblCariInit();
    }
}