function StokListeCtrl ($scope,$window,db)
{
    let TmpFields =
    [
        {
            dataField: "CODE",
            caption : "ÜRÜN KODU",
            dataType : "string",
        },
        {
            dataField: "NAME",
            caption : "ÜRÜN TAM ADI",
            dataType : "string",
        },
        {
            dataField: "BARCODE",
            caption : "BARKODU",
            dataType : "string",
        },
        {
            dataField: "SNAME",
            caption : "ÜRÜN KISA ADI",
            dataType : "string",
            visible: false
        },
        {
            dataField: "ITEM_GRP",
            caption : "ÜRÜN GRUBU",
            dataType : "string",
            visible: false
        },        
        {
            dataField: "VAT",
            caption : "VERGİ DİLİMİ",
            dataType : "number",
            visible: false
        },
        {
            dataField: "COST_PRICE",
            caption : "MALİYET FİYATI",
            dataType : "number",
            visible: false
        },
        {
            dataField: "MIN_PRICE",
            caption : "MİNİMUM SATIŞ FİYATI",
            dataType : "number",
            visible: false
        },
        {
            dataField: "MAX_PRICE",
            caption : "MAKSİMUM SATIŞ FİYATI",
            dataType : "number",
            visible: false
        },
        {
            dataField: "UNIT",
            caption : "BİRİM",
            dataType : "string",
            visible: false
        },        
        {
            dataField: "PRICE",
            caption : "SATIŞ FİYATI",
            dataType : "number",
            visible: false
        },
        {
            dataField: "CUSTOMER_ITEM_CODE",
            caption : "TEDARİKÇİ ÜRÜN KODU",
            dataType : "string",
            visible: false
        },
        {
            dataField: "STATUS",
            caption : "DURUM",
            dataType : "string",
            visible: false
        }
    ];
    let QueryField = 
    {
        Unit:
        {
            Field : "",
            Outer : ""
        },
        Price:
        {
            Field : "",
            Outer : ""
        },
        Customer:
        {
            Field : "",
            Outer : "",
            Where : ""
        },
        Barcode:
        {
            Field : "",
            Outer : "",
            Where : ""
        },
        Code:
        {
            Where : ""
        }
    }
    function TblStokInit()
    {
        $("#TblStok").dxDataGrid(
        {
            dataSource: $scope.Data,
            allowColumnReordering: true,
            allowColumnResizing: true,
            showBorders: true,
            columnResizingMode: "nextColumn",
            columnMinWidth: 50,
            columnAutoWidth: true,
            filterRow: {
                visible: true,
                applyFilter: "auto"
            },
            headerFilter: {
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
                $window.location.href = '#!Stok?Id=' + e.data.CODE;
            },
            onRowPrepared: function (rowInfo) 
            {  
                if(typeof rowInfo.data != 'undefined')
                {
                    if(rowInfo.data.STATUS == 'Pasif')
                    {
                        rowInfo.rowElement.css('background', '#dce1e2');
                    }
                   
                }
            }  
        });

       
    }
    function StokGetir()
    {
        QueryField.Unit.Field = "";
        QueryField.Unit.Outer = "";
        QueryField.Price.Field = "";
        QueryField.Price.Outer = "";
        QueryField.Customer.Field = "";
        QueryField.Customer.Outer = "";        
        QueryField.Customer.Where = "";
        QueryField.Barcode.Field = "";
        QueryField.Barcode.Outer = "";
        QueryField.Barcode.Where = "";
        QueryField.Code.Where = "";

        let TmpVal = ""
        
        for (let i = 0; i < $scope.Barkod.split(' ').length; i++) 
        {
            TmpVal += "'" + $scope.Barkod.split(' ')[i] + "'"
            if($scope.Barkod.split(' ').length > 1 && i !=  ($scope.Barkod.split(' ').length - 1))
            {
                TmpVal += ","
            }
        }

        for (let x = 0; x < $scope.Kolon.length; x++) 
        {
            
            if($scope.Kolon[x] == "UNIT")    
            {
                QueryField.Unit.Field = "ISNULL(ITEM_UNIT.NAME,'') AS UNIT, ";
                QueryField.Unit.Outer = "LEFT OUTER JOIN ITEM_UNIT ON ITEMS.CODE = ITEM_UNIT.ITEM_CODE ";
            } 
            if($scope.Kolon[x] == "PRICE")    
            {
                QueryField.Price.Field = "ISNULL(ITEM_PRICE.PRICE,0) AS PRICE, ";
                QueryField.Price.Outer = "LEFT OUTER JOIN ITEM_PRICE ON ITEM_PRICE.ITEM_CODE = ITEMS.CODE AND ITEM_PRICE.TYPE = 0 ";
            } 
            if($scope.Kolon[x] == "CUSTOMER_ITEM_CODE")    
            {
                QueryField.Customer.Field = "ISNULL(ITEM_CUSTOMER.CUSTOMER_ITEM_CODE,'') AS CUSTOMER_ITEM_CODE, ";
                QueryField.Customer.Outer = "LEFT OUTER JOIN ITEM_CUSTOMER ON ITEM_CUSTOMER.ITEM_CODE = ITEMS.CODE ";
                QueryField.Customer.Where = "OR ITEM_CUSTOMER.CUSTOMER_ITEM_CODE IN (" + TmpVal + ") "
            }   
            if($scope.Kolon[x] == "BARCODE")    
            {
                QueryField.Barcode.Field = "ISNULL(ITEM_BARCODE.BARCODE,'') AS BARCODE, ";
                QueryField.Barcode.Outer = "LEFT OUTER JOIN ITEM_BARCODE ON ITEM_BARCODE.ITEM_CODE = ITEMS.CODE ";

                if($scope.Barkod.split(' ').length > 1)
                {
                    QueryField.Barcode.Where = "ITEM_BARCODE.BARCODE IN (" + TmpVal + ") OR "
                }
                else
                {
                    QueryField.Barcode.Where = "ITEM_BARCODE.BARCODE LIKE " + TmpVal + " + '%' OR "
                }
            }  
        } 

        if($scope.Barkod.split(' ').length > 1)
        {
            QueryField.Code.Where = " ITEMS.CODE IN (" + TmpVal + ")) ";
        }
        else
        {
            QueryField.Code.Where = " ITEMS.CODE LIKE " + TmpVal + " + '%') ";
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
                    QueryField.Unit.Field +
                    QueryField.Barcode.Field +
                    QueryField.Price.Field +
                    QueryField.Customer.Field +
                    "CASE WHEN ITEMS.STATUS = 0 THEN 'Pasif' ELSE 'Aktif' END AS STATUS " +
                    "FROM ITEMS " +
                    QueryField.Unit.Outer +
                    QueryField.Barcode.Outer + 
                    QueryField.Price.Outer +
                    QueryField.Customer.Outer +
                    "WHERE ((" + QueryField.Barcode.Where + 
                    QueryField.Code.Where +
                    QueryField.Customer.Where + 
                    "OR (@BARCODE = '')) AND ((UPPER(ITEMS.NAME) LIKE UPPER(@NAME) + '%') OR (@NAME = '')) AND " +
                    "((ITEMS.ITEM_GRP = @ITEM_GRP) OR (@ITEM_GRP = '')) AND ((ITEMS.STATUS = @STATUS) OR (@STATUS = 0)) AND " +
                    "(((SELECT TOP 1 CUSTOMER_CODE FROM ITEM_CUSTOMER WHERE ITEM_CODE = ITEMS.CODE) = @CUSTOMER) OR (@CUSTOMER=''))",
            param : ["BARCODE:string|50","NAME:string|250","ITEM_GRP:string|25","STATUS:bit","CUSTOMER:string|25"],
            value : [$scope.Barkod,$scope.Adi,$scope.Grup,$scope.Durum,$scope.Tedarikci]
        }

        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.Data = Data;
            TblStokInit();
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
    $scope.Init = function()
    {
        GrdPage = true;

        $scope.Data = [];
        $scope.GrupList = [];
        $scope.TedarikciList = [];

        $scope.Kolon = ["CODE","NAME","BARCODE"];
        $scope.Barkod = "";
        $scope.Adi = "";
        $scope.Grup = "";
        $scope.Tedarikci = "";
        $scope.Durum = true;

        TblStokInit();
        $scope.GrupGetir();
        $scope.TedarikciGetir();

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
    $scope.TxtAra = function(keyEvent)
    {    
        if(keyEvent.which === 13)
        {   
            StokGetir();
        }
    }
}