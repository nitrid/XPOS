function SktGirisCtrl($scope,$window,db)
{   
    let StokSelectedRow = null;
    document.onkeydown = function(e)
    {       
        if(!$("#MdlSkt").hasClass('show'))
        {
            $window.document.getElementById("Barkod").focus();
        }
        else if($("#MdlSkt").hasClass('show'))
        {
            $window.document.getElementById("Miktar").focus();
        }
    }
    function InitStokGrid()
    {
        $("#TblStok").jsGrid
        ({
            width: "100%",
            height: "auto",
            autoload : true,
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokListe,
            paging : true,

            fields: 
            [
                {
                    name: "CODE",
                    title: "KODU",
                    type: "text",
                    align: "center",
                    width: 125
                }, 
                {
                    name: "NAME",
                    title: "ADI",
                    type: "text",
                    align: "center",
                    width: 200
                }
            ],
            rowClick: function(args)
            {
                $scope.StokListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function BarkodGetir(pBarkod)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT " +
                        "ITEMS.CODE AS CODE, " +
                        "ISNULL((SELECT TOP 1 BARCODE FROM ITEM_BARCODE WHERE ITEM_BARCODE.ITEM_CODE = ITEMS.CODE ORDER BY ITEM_BARCODE.LDATE DESC),'') AS BARCODE, " +
                        "MAX(ITEMS.NAME) AS NAME, " +
                        "MAX(ITEMS.MIN_PRICE) AS MIN_PRICE, " +
                        "ISNULL((SELECT TOP 1 C.NAME FROM CUSTOMERS AS C WHERE C.CODE = MAX(ITEM_CUSTOMER.CUSTOMER_CODE)),'') AS CUSTOMER_NAME, " +
                        "MAX(ITEMS.ITEM_GRP) AS ITEM_GRP, " +
                        "ISNULL((SELECT NAME FROM ITEM_GROUP WHERE ITEM_GROUP.CODE = MAX(ITEMS.ITEM_GRP)),'') AS ITEM_GRP_NAME, " +
                        "dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) AS PRICE, " +
                        "CONVERT(NVARCHAR,MAX(FACTOR)) + ' ' + MAX(SHORT) AS UNDER_UNIT_VALUE, " +
                        "CASE WHEN dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) = 0 OR ISNULL(MAX(FACTOR),0) = 0 THEN '0' ELSE " +
                        "ROUND(dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) / ISNULL(MAX(FACTOR),0),2) END AS UNDER_UNIT_PRICE, " +
                        "'' AS DESCRIPTION " +
                        "FROM ITEMS " +
                        "LEFT OUTER JOIN ITEM_BARCODE ON " +
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
    function TblSktInit()
    {
        $("#TblSkt").dxDataGrid(
        {
            dataSource: $scope.Data,
            allowColumnReordering: true,
            allowColumnResizing: true,
            showBorders: true,
            columnResizingMode: "nextColumn",
            columnMinWidth: 50,
            columnAutoWidth: true,
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
            columns: 
            [
                {
                    dataField: "BARCODE",
                    caption : db.Language($scope.Lang,"BARKOD"),
                    dataType : "string",
                },
                {
                    dataField: "ITEM_CODE",
                    caption : db.Language($scope.Lang,"KODU"),
                    dataType : "string",
                },
                {
                    dataField: "ITEM_NAME",
                    caption : db.Language($scope.Lang,"ÜRÜN ADI"),
                    dataType : "string",
                },
                {
                    dataField: "CUSTOMER_CODE",
                    caption : db.Language($scope.Lang,"TEDARİKÇİ KODU"),
                    dataType : "string",
                },
                {
                    dataField: "CUSTOMER_NAME",
                    caption : db.Language($scope.Lang,"TEDARİKÇİ ADI"),
                    dataType : "string",
                },
                {
                    dataField: "CUSTOMER_ITEM_CODE",
                    caption : db.Language($scope.Lang,"TEDARİKÇİ ÜRÜN ADI"),
                    dataType : "string",
                },
                {
                    dataField: "QUANTITY",
                    caption : db.Language($scope.Lang,"MİKTAR"),
                    dataType : "number",
                },
                {
                    dataField: "EXP_DATE",
                    caption : db.Language($scope.Lang,"SKT"),
                    dataType : "date",
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
            }
        });
    }
    async function SktGetir()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT " +
                    "*, " +
                    "ISNULL((SELECT TOP 1 BARCODE FROM ITEM_BARCODE WHERE ITEM_BARCODE.ITEM_CODE = ITEM_EXPDATE.ITEM_CODE ORDER BY LDATE DESC),'') AS BARCODE, " +
                    "ISNULL((SELECT TOP 1 CUSTOMER_CODE FROM ITEM_CUSTOMER WHERE ITEM_CUSTOMER.ITEM_CODE = ITEM_EXPDATE.ITEM_CODE),'') AS CUSTOMER_CODE, " +
                    "ISNULL((SELECT TOP 1 ISNULL((SELECT TOP 1 NAME FROM CUSTOMERS WHERE CODE = CUSTOMER_CODE),'') FROM ITEM_CUSTOMER WHERE ITEM_CUSTOMER.ITEM_CODE = ITEM_EXPDATE.ITEM_CODE),'') AS CUSTOMER_NAME, " +
                    "ISNULL((SELECT TOP 1 CUSTOMER_ITEM_CODE FROM ITEM_CUSTOMER WHERE ITEM_CUSTOMER.ITEM_CODE = ITEM_EXPDATE.ITEM_CODE),'') AS CUSTOMER_ITEM_CODE, " +
                    "ISNULL((SELECT NAME FROM ITEMS WHERE CODE = ITEM_CODE),'') AS ITEM_NAME " +
                    "FROM ITEM_EXPDATE WHERE CONVERT(NVARCHAR(10),LDATE,112) >= @ILKTARIH AND CONVERT(NVARCHAR(10),LDATE,112) <= @SONTARIH ORDER BY EXP_DATE ASC",
            param:  ['ILKTARIH','SONTARIH'],
            type:   ['date','date'],
            value:  [moment(new Date()).format("DD.MM.YYYY"),moment(new Date()).format("DD.MM.YYYY")]            
        }
        
        $scope.Data = await db.GetPromiseQuery(TmpQuery)
        TblSktInit();
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

        $scope.Kullanici = $window.sessionStorage.getItem('User');
        $scope.Sube = "1";
        $scope.Firma = 'PIQPOS';

        $scope.StokListe = [];
        $scope.BarkodListe = [];

        $scope.Etiket = "";
        $scope.Barkod = "";
        $scope.Kodu = "";
        $scope.Adi = "";
        $scope.Fiyat = "";
        $scope.Birim = "";
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Miktar = 1;

        $scope.StokGridTip = "0";
        $scope.StokGridText = "";

        $scope.TblLoading = true;  
        $scope.FirstKey = false;        

        InitStokGrid();
        TblSktInit();
    }
    $scope.BtnStokBarkodGetir = async function(e)
    {
        if(typeof e != 'undefined' && e.which != 13)
        {
            return;
        }
        
        $scope.BarkodListe = await BarkodGetir($scope.Barkod);
        
        if($scope.BarkodListe.length > 0)
        {
            $scope.Kodu = $scope.BarkodListe[0].CODE;
            $scope.Adi = $scope.BarkodListe[0].NAME;
            $scope.Fiyat = $scope.BarkodListe[0].PRICE;            
            $scope.Birim = $scope.BarkodListe[0].UNDER_UNIT_VALUE;
        }
        else
        {
            document.getElementById("Sound").play();
            $scope.Init()
        }

        $scope.Barkod = ""
        $window.document.getElementById("Barkod").focus();
        $scope.$apply();
    }
    $scope.ManuelAramaClick = function() 
    {
        $("#TbStok").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TblAciklama").removeClass('active');

        $("#TblStok").jsGrid({data : []});
        $scope.StokGridText = "";
        $window.document.getElementById("StokGridText").focus();
    }    
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TblAciklama").removeClass('active');
        $("#TbStok").removeClass('active');
    }
    $scope.StokListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( StokSelectedRow ) { StokSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        StokSelectedRow = $row;
        
        $scope.Barkod = $scope.StokListe[pIndex].CODE;
        $scope.MainClick();
        $scope.BtnStokBarkodGetir();
    }
    $scope.BtnStokGridGetir = function()
    {
        $scope.Loading = true;
        $scope.TblLoading = false;
        let Kodu = '';
        let Adi = '';

        if($scope.StokGridTip == "1")
        {   
            Kodu = $scope.StokGridText.replace("*","%").replace("*","%");
        }
        else
        {
            Adi = $scope.StokGridText.replace("*","%").replace("*","%");
        }

        db.GetData($scope.Firma,'StokGetir',[Kodu,Adi],function(StokData)
        {
            $scope.StokListe = StokData;
            if($scope.StokListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblStok").jsGrid({data : $scope.StokListe});
                $("#TblStok").jsGrid({pageIndex: true});
            }
            else
            {
                alertify.alert(db.Language($scope.Lang,"Stok Bulunamadı"))
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblStok").jsGrid({data : $scope.StokListe});
                $("#TblStok").jsGrid({pageIndex: true});
            }   
        });
    }
    $scope.BtnStokGridSec = function()
    {
        $("#MdlStokGetir").modal('hide');
        StokBarkodGetir($scope.Barkod);
        $scope.BtnStokGridGetir();
        $("#TblStok").jsGrid({pageIndex: true})
    }
    $scope.BtnManuelArama = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.BtnStokGridGetir();
        }
    } 
    $scope.BtnSktModalAc = function()
    {
        $("#MdlSkt").modal('show');
    }
    $scope.BtnSktEkle = async function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "INSERT INTO [dbo].[ITEM_EXPDATE] ( " +
                    "[CUSER] " +
                    ",[CDATE] " +
                    ",[LUSER] " +
                    ",[LDATE] " +
                    ",[ITEM_CODE] " +
                    ",[QUANTITY] " +
                    ",[EXP_DATE] " +
                    ") VALUES ( " +
                    "@CUSER			--<CUSER, nvarchar(25),> \n" +
                    ",GETDATE()		--<CDATE, datetime,> \n" +
                    ",@LUSER		--<LUSER, nvarchar(25),> \n" +
                    ",GETDATE()		--<LDATE, datetime,> \n" +
                    ",@ITEM_CODE	--<ITEM_CODE, nvarchar(25),> \n" +
                    ",@QUANTITY		--<QUANTITY, float,> \n" +
                    ",@EXP_DATE		--<EXP_DATE, datetime,> \n" +
                    ")",
            param:  ['CUSER','LUSER','ITEM_CODE','QUANTITY','EXP_DATE'],
            type:   ['string|25','string|25','string|25','float','date'],
            value:  [$scope.Kullanici,$scope.Kullanici,$scope.Kodu,$scope.Miktar,$scope.Tarih]
        }

        await db.ExecutePromiseQuery(TmpQuery);
        SktGetir();

        $scope.Init();

        $("#MdlSkt").modal('hide');
        $scope.$apply();
    }
}