function StokListeCtrl ($scope,$window,db)
{
    let TmpFields =
    [
        {
            name: "CODE",
            title : "CODE",
            type : "text",
            align: "left",
            width: 100,
            itemTemplate: function(value) 
            {
                return $("<a>").attr("href", "#!Stok?Id='" + value + "'").text(value);
            }            
        },
        {
            name: "NAME",
            title : "NAME",
            align: "left",
            width: 100
        },
        {
            name: "SNAME",
            title : "SNAME",
            align: "left",
            width: 75,
            visible: false
        },
        {
            name: "ITEM_GRP",
            title : "ITEM GRP",
            align: "left",
            width: 75,
            visible: false
        },
        {
            name: "VAT",
            title : "VAT",
            align: "center",
            width: 75,
            visible: false
        },
        {
            name: "COST_PRICE",
            title : "COST PRICE",
            align: "center",
            width: 75,
            visible: false
        },
        {
            name: "MIN_PRICE",
            title : "MIN PRICE",
            align: "center",
            width: 75,
            visible: false
        },
        {
            name: "MAX_PRICE",
            title : "MAX PRICE",
            align: "center",
            width: 75,
            visible: false
        },
        {
            name: "UNIT",
            title : "UNIT",
            align: "left",
            width: 75,
            visible: false
        },
        {
            name: "BARCODE",
            title : "BARCODE",
            align: "left",
            width: 75,
            visible: false
        },
        {
            name: "PRICE",
            title : "PRICE",
            align: "center",
            width: 75,
            visible: false
        },
        {
            name: "CUSTOMER_ITEM_CODE",
            title : "CUSTOMER CODE",
            align: "left",
            width: 75,
            visible: false
        }
    ];

    function TblStokInit()
    {
        $("#TblStok").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.Data,
            paging : true,
            pageSize: 20,
            pageButtonCount: 5,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: TmpFields
        });
    }
    function StokGetir()
    {
        let TmpVal = ""
        for (let i = 0; i < $scope.Barkod.split(',').length; i++) 
        {
            TmpVal += "'" + $scope.Barkod.split(',')[i] + "'"
            if($scope.Barkod.split(',').length > 1 && i !=  ($scope.Barkod.split(',').length - 1))
            {
                TmpVal += ","
            }
        }

        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT " +
                    "ITEMS.CODE AS CODE, " +
                    "ITEMS.NAME AS NAME, " +
                    "ITEMS.SNAME AS SNAME, " +
                    "ITEMS.ITEM_GRP AS ITEM_GRP, " +
                    "ITEMS.VAT AS VAT, " +
                    "ITEMS.COST_PRICE AS COST_PRICE, " +
                    "ITEMS.MIN_PRICE AS MIN_PRICE, " +
                    "ITEMS.MAX_PRICE AS MAX_PRICE, " +
                    "ISNULL(ITEM_UNIT.NAME,'') AS UNIT, " +
                    "ISNULL(ITEM_BARCODE.BARCODE,'') AS BARCODE, " +
                    "ISNULL((SELECT PRICE FROM ITEM_PRICE WHERE ITEM_CODE = ITEMS.CODE AND QUANTITY = 1),0) AS PRICE, " +
                    "ITEM_CUSTOMER.CUSTOMER_ITEM_CODE AS CUSTOMER_ITEM_CODE " +
                    "FROM ITEMS " +
                    "LEFT OUTER JOIN ITEM_UNIT ON " +
                    "ITEMS.CODE = ITEM_UNIT.ITEM_CODE " +
                    "LEFT OUTER JOIN ITEM_BARCODE ON " +
                    "ITEM_BARCODE.ITEM_CODE = ITEMS.CODE AND ITEM_BARCODE.UNIT = ITEM_UNIT.GUID " +
                    "LEFT OUTER JOIN ITEM_CUSTOMER ON " +
                    "ITEM_CUSTOMER.ITEM_CODE = ITEMS.CODE " +
                    "WHERE ((ITEM_BARCODE.BARCODE IN (" + TmpVal + ") OR ITEMS.CODE IN (" + TmpVal + ") OR " + 
                    "ITEM_CUSTOMER.CUSTOMER_ITEM_CODE IN (" + TmpVal + ")) OR (@BARCODE = '')) AND ((ITEMS.NAME LIKE @NAME + '%') OR (@NAME = '')) AND " +
                    "((ITEMS.ITEM_GRP = @ITEM_GRP) OR (@ITEM_GRP = '')) AND ITEMS.STATUS = @STATUS",
            param : ["BARCODE:string|50","NAME:string|250","ITEM_GRP:string|25","STATUS:bit"],
            value : [$scope.Barkod,$scope.Adi,$scope.Grup,$scope.Durum]
        }

        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.Data = Data
            $("#TblStok").jsGrid({data : $scope.Data});
        });
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
    $scope.Init = function()
    {
        $scope.Data = [];
        $scope.GrupList = [];

        $scope.Kolon = ["CODE","NAME"];
        $scope.Barkod = "";
        $scope.Adi = "";
        $scope.Grup = "";
        $scope.Durum = true;

        TblStokInit();
        $scope.GrupGetir();

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

        TblStokInit();
    }
    $scope.BtnAra = function()
    {
        StokGetir();
    }
}