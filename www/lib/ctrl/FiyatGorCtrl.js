function FiyatGorCtrl($scope,$window,db)
{   
    let StokSelectedRow = null;
    let FiyatSelectedRow = null;
    document.onkeydown = function(e)
    {       
        if(!$("#MdlFiyatGuncelle").hasClass('show') && !$("#MdlFiyatEkle").hasClass('show'))
        {
            $window.document.getElementById("Barkod").focus();
        }
        else if($("#MdlFiyatGuncelle").hasClass('show'))
        {
            $window.document.getElementById("TxtFiyatGuncelle").focus();
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
    function InitFiyatSecGrid()
    {
        $("#TblFiyatSecim").jsGrid
        ({
            width: "100%",
            height: "auto",
            autoload : true,
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.FiyatListe,
            paging : true,
            fields: 
            [
                {
                    name: "START_DATE",
                    title: db.Language($scope.Lang,"BAS.TARIH"),
                    type: "text",
                    align: "center",
                    width: 125
                }, 
                {
                    name: "FINISH_DATE",
                    title: db.Language($scope.Lang,"BIT.TARIH"),
                    type: "text",
                    align: "center",
                    width: 125
                }, 
                {
                    name: "PRICE",
                    title: db.Language($scope.Lang,"FİYAT"),
                    type: "text",
                    align: "center",
                    width: 100
                }
            ],
            rowClick: function(args)
            {
                $scope.FiyatListeRowClick(args.itemIndex,args.item,this);
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
        $scope.UrunGrupListe = [];
        $scope.FiyatListe = [];

        $scope.Etiket = "";
        $scope.Barkod = "";
        $scope.Kodu = "";
        $scope.Adi = "";
        $scope.Fiyat = "";
        $scope.Birim = "";
        $scope.TxtFiyatGuncelle = 0;

        $scope.StokGridTip = "0";
        $scope.StokGridText = "";

        $scope.TblLoading = true;  
        $scope.FirstKey = false;

        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT [NAME],[CODE] FROM ITEM_GROUP"
        }
        $scope.UrunGrupListe = (await db.ExecutePromiseQuery(TmpQuery)).result.recordset;

        $scope.UrunGrup = {};
        $scope.UrunGrup.Value = "";
        $scope.UrunGrup.Status = false;
        $scope.UrunGrup.Cmb = 
        {
            width: "100%",
            dataSource: $scope.UrunGrupListe,
            displayExpr: db.Language($scope.Lang,"NAME"),
            valueExpr: db.Language($scope.Lang,"CODE"),
            value: "",
            showClearButton: true,
            searchEnabled: true,
            bindingOptions: 
            {
                value: "UrunGrup.Value",
                dataSource : "UrunGrupListe"
            },
            onSelectionChanged : function(e)
            {              
                if(e.selectedItem == null)
                {
                    $scope.UrunGrup.Value = ""
                }
            }
        }

        $scope.FiyatModal = {};
        $scope.FiyatModal.Baslangic = "";
        $scope.FiyatModal.Bitis = "";
        $scope.FiyatModal.Fiyat = 0;
        $scope.FiyatModal.Miktar = 0;

        InitStokGrid();
        InitFiyatSecGrid();
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

            if($scope.UrunGrup.Status)
            {
                let TmpQuery = 
                {
                    db : $scope.Firma,
                    query:  "UPDATE ITEMS SET ITEM_GRP = @ITEM_GRP, LDATE = GETDATE() WHERE CODE = @CODE",
                    param: ['ITEM_GRP:string|25','CODE:string|25'],
                    value: [$scope.UrunGrup.Value,$scope.Kodu]
                }
                console.log(TmpQuery)
                await db.ExecutePromiseQuery(TmpQuery);
            }
            
        }
        else
        {
            document.getElementById("Sound").play();
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

        console.log(Adi)
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
    $scope.BtnFiyatGuncelle = async function()
    {
        if($scope.BarkodListe.length > 0)
        {
            $('#MdlFiyatSecim').modal('show');
            let TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT " +
                        "GUID AS GUID, " +
                        "CASE WHEN START_DATE = '19700101' THEN '' ELSE CONVERT(NVARCHAR,START_DATE,101) END AS START_DATE, " +
                        "CASE WHEN START_DATE = '19700101' THEN '' ELSE CONVERT(NVARCHAR,FINISH_DATE,101) END AS FINISH_DATE, " +
                        "PRICE AS PRICE " +
                        "FROM ITEM_PRICE WHERE TYPE = 0 AND DEPOT = 0 AND ITEM_CODE = @ITEM_CODE",
                param : ['ITEM_CODE:string|25'],
                value : [$scope.Kodu]
            }
    
            $scope.FiyatListe = await db.GetPromiseQuery(TmpQuery);
            InitFiyatSecGrid();
        }
        else
        {
            alertify.alert(db.Language($scope.Lang,"Fiyat değiştirmek için önce ürün okutunuz !"))
        }        
    }
    $scope.TxtFiyatGuncellePress = async function()
    {
        if($scope.TxtFiyatGuncelle != "" && $scope.TxtFiyatGuncelle > 0)
        {
            if($scope.TxtFiyatGuncelle > $scope.BarkodListe[0].MIN_PRICE)
            {
                let TmpQuery = 
                {
                    db : $scope.Firma,
                    query:  "UPDATE ITEM_PRICE SET PRICE = @PRICE, LDATE = GETDATE() WHERE GUID = @GUID",
                    param: ['PRICE:float','GUID:string|50'],
                    value: [$scope.TxtFiyatGuncelle,FiyatSelectedRow.Data.GUID]
                }
                await db.ExecutePromiseQuery(TmpQuery);

                alertify.alert(db.Language($scope.Lang,"Fiyat Güncellendi !"));
                $("#MdlFiyatGuncelle").modal("hide");
                $scope.Barkod = $scope.BarkodListe[0].BARCODE;
                $scope.BtnStokBarkodGetir()
            }
            else
            {
                alertify.alert(db.Language($scope.Lang,"Geçersiz fiyat girdiniz !"))
            }
        }
    }
    $scope.BtnTusClick = function(Key)
    {
        if($scope.FirstKey)
        {
            $scope.TxtFiyatGuncelle = Key;      
            $scope.FirstKey = false;
        }
        else
        {
            $scope.TxtFiyatGuncelle = $scope.TxtFiyatGuncelle + Key;  
        }
        
    }
    $scope.BtnSilClick = function()
    {
        if($scope.FirstKey)
        {
            $scope.TxtFiyatGuncelle = "";      
            $scope.FirstKey = false;
        }
        else
        {
            $scope.TxtFiyatGuncelle = $scope.TxtFiyatGuncelle.toString().substring(0,$scope.TxtFiyatGuncelle.length-1); 
        }        
    }
    $scope.BtnUrunGrupDegis = function()
    {
        $('#MdlUrunGrupGuncelle').modal({backdrop: 'static'});
    }
    $scope.BtnUrunGrupAktif = function()
    {
        $('#MdlUrunGrupGuncelle').modal('hide');
        $scope.UrunGrup.Status = true;
    }
    $scope.BtnUrunGrupPasif = function()
    {
        $('#MdlUrunGrupGuncelle').modal('hide');
        $scope.UrunGrup.Status = false;
    }
    $scope.FiyatListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( FiyatSelectedRow ) { FiyatSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        FiyatSelectedRow = $row;
        FiyatSelectedRow.Data = $scope.FiyatListe[pIndex];
    }
    $scope.BtnFiyatSec = function()
    {
        if(typeof FiyatSelectedRow != 'undefined')
        {
            $('#MdlFiyatSecim').modal('hide');
            $('#MdlFiyatGuncelle').modal({backdrop: 'static'});
            $scope.TxtFiyatGuncelle = FiyatSelectedRow.Data.PRICE;
            $scope.FirstKey = true;  
        }
    }
    $scope.BtnFiyatEkle = function()
    {
        if($scope.BarkodListe.length > 0)
        {
            $('#MdlFiyatEkle').modal('show');
        }
    }
    $scope.BtnFiyatKaydet = async function()
    {
        $("#MdlFiyatEkle").modal('hide');

        let InsertData =
        [
            $scope.Kullanici,
            $scope.Kullanici,
            $scope.Kodu,
            0,
            0,
            $scope.FiyatModal.Baslangic == '' ? '01.01.1970' : moment($scope.FiyatModal.Baslangic).format("DD.MM.YYYY"),
            $scope.FiyatModal.Bitis == '' ? '01.01.1970' : moment($scope.FiyatModal.Bitis).format("DD.MM.YYYY"),
            parseFloat($scope.FiyatModal.Fiyat.toString().replace(',','.')),
            $scope.FiyatModal.Miktar,
            ""
        ];

        let TmpResult = await db.ExecutePromiseTag($scope.Firma,'FiyatKaydet',InsertData);
        if(typeof(TmpResult.result.err) == 'undefined')
        {
            if(TmpResult.result.recordset[0].ITEM_CODE != '')
            {
                alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                alertify.alert(db.Language($scope.Lang,"Benzer kayıt oluşturamazsınız !"));
            }
            else
            {
                alertify.alert(db.Language($scope.Lang,"Yeni fiyat eklendi."));
            }
        }
    }
}