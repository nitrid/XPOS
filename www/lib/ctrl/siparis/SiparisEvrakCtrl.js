function SiparisEvrakCtrl ($scope,$window,$timeout,$location,db)
{
    let CariSelectedRow = null;
    let IslemSelectedRow = null;
    let StokSelectedRow = null;
    let EvrakSelectedRow = null;
    function Init()
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

        $scope.Seri = "";
        $scope.Sira = 0;
        $scope.EvrakTip = 0;
        $scope.Tip = 0;
        $scope.CariKodu = "";  
        $scope.CariAdi = "";
        $scope.DepoNo;
        $scope.DepoAdi;
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Saat = moment(new Date()).format("LTS");
        $scope.Barkod = "";
        $scope.Birim = "0";
        $scope.StokGridTip = "0";
        $scope.StokGridText = "";
        $scope.ToplamSatir = 0;
        $scope.Fiyat = "";
        $scope.Cins = "0";
        $scope.BtnCariView = true;

        $scope.DepoListe = [];
        $scope.CariListe = [];
        $scope.SiparisListe = [];
        $scope.BirimListe = [];
        $scope.StokListe = [];
        $scope.EvrakListe = [];

        $scope.AraToplam = 0;
        $scope.ToplamIndirim = 0;
        $scope.NetToplam = 0;
        $scope.ToplamKdv = 0;
        $scope.GenelToplam = 0;

        $scope.Stok = [];
        $scope.Miktar = 1;                

        $scope.CmbCariAra = "0";
        $scope.TxtCariAra = ""; 
        $scope.OtoEkle = false;
        $scope.EvrakLock = false;
        $scope.BarkodLock = false;
        $scope.FiyatLock = false;
        $scope.DepoMiktar = false;

        $scope.IslemListeSelectedIndex = -1;  

        // DÜZENLE MODAL
        $scope.MiktarEdit = 0;
        $scope.FiyatEdit = 0;

        $scope.Loading = false;
        $scope.TblLoading = true;        
    }
    function InitCariGrid()
    {
        $("#TblCari").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.CariListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields:
            [
                {
                    name: "CODE",
                    type: "number",
                    align: "center",
                    width: 100
                },
                {
                    name: "NAME",
                    type: "text",
                    align: "center",
                    width: 300
                }
            ],
            rowClick: function(args)
            {
                $scope.CariListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitIslemGrid(pPage)
    {
        $("#TblIslem").jsGrid({
            responsive: true,
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.SiparisListe,
            paging : pPage,
            pageIndex : true,
            pageSize: 3,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
            {
                name: "LINE_NO",
                title: "NO",
                type: "number",
                align: "center",
                width: 75
                
            }, 
            {
                name: "ITEM_CODE",
                title: db.Language($scope.Lang,"Kodu"),
                type: "text",
                align: "center",
                width: 100
            },
            {
                name: "ITEM_NAME",
                title: db.Language($scope.Lang,"ADI"),
                type: "text",
                align: "center",
                width: 200
            }, 
            {
                name: "QUANTITY",
                title: db.Language($scope.Lang,"Miktar"),
                type: "number",
                align: "center",
                width: 100
            }, 
            {
                name: "PRICE",
                title: db.Language($scope.Lang,"Fiyat"),
                type: "number",
                align: "center",
                width: 100
            }, 
            {
                name: "AMOUNT",
                title: db.Language($scope.Lang,"TUTAR"),
                type: "number",
                align: "center",
                width: 100
            }
           ],
            rowClick: function(args)
            {
                $scope.IslemListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
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
                    title: db.Language($scope.Lang,"Kodu"),
                    type: "text",
                    align: "center",
                    width: 125
                }, 
                {
                    name: "NAME",
                    title: db.Language($scope.Lang,"ADI"),
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
    function InitEvrakGrid(pPage)
    {
        $("#TblEvrak").jsGrid
        ({
            width: "100%",
            height: "auto",
            autoload : true,
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.EvrakListe,
            paging : pPage,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
                {
                    name: "REF",
                    title: db.Language($scope.Lang,"Ref"),
                    type: "text",
                    align: "center",
                    width: 70
                }, 
                {
                    name: "REF_NO",
                    title: db.Language($scope.Lang,"Ref No"),
                    type: "text",
                    align: "center",
                    width: 100
                }, 
                {
                    name: "DOC_FROM_NAME",
                    title: db.Language($scope.Lang,"Tedarikçi"),
                    type: "text",
                    align: "center",
                    width: 200
                }, 
                {
                    name: "LINE_COUNT",
                    title: db.Language($scope.Lang,"Satır Sayısı"),
                    type: "text",
                    align: "center",
                    width: 100
                }
            ],
            rowClick: function(args)
            {
                $scope.EvrakListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function BarkodFocus()
    {
        $timeout( function(){$window.document.getElementById("Barkod").focus();},500);  
    }
    function BirimGetir(pKodu)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT " +
                        "[TYPE] AS [TYPE], " +
                        "[NAME] AS [NAME], " +
                        "[FACTOR] AS [FACTOR] " +
                        "FROM ITEM_UNIT WHERE ITEM_CODE = @ITEM_CODE ORDER BY [TYPE] ASC",
                param:  ['ITEM_CODE'],
                type:   ['string|25'],
                value:  [pKodu]
            }
            db.GetDataQuery(TmpQuery,function(pData)
            {
                resolve(pData);
            });
        });
    }
    function StokBarkodGetir(pBarkod)
    {
        if(pBarkod != '')
        {
            db.StokBarkodGetir($scope.Firma,pBarkod,async function(BarkodData)
            { 
                if(BarkodData.length > 0)
                {
                    $scope.Stok = BarkodData;
                    $scope.StokKodu = $scope.Stok[0].CODE;
                    
                    if($scope.EvrakTip == 2)
                    {
                        $scope.Stok[0].PRICE = 0;
                    }
                    
                    $scope.Stok[0].AMOUNT = 0;
                    $scope.Stok[0].DISCOUNT = 0;
                    $scope.Stok[0].VATAMOUNT = 0;
                    $scope.Stok[0].TOPAMOUNT = 0;

                    $scope.BirimListe = await BirimGetir($scope.Stok[0].CODE);
                    $scope.Birim = "0";

                    if($scope.BirimListe.length > 0)
                    {
                        $scope.Stok[0].UNIT = $scope.BirimListe[0].TYPE;
                        $scope.Stok[0].FACTOR = $scope.BirimListe[0].FACTOR;
                    }
                    else
                    {
                        $scope.Stok[0].UNIT = 1;
                        $scope.Stok[0].FACTOR = 1;
                    }

                    $scope.MiktarFiyatValid();
                    $scope.BarkodLock = true;
                    $scope.$apply();

                    if($scope.OtoEkle == true)
                    {
                        $scope.Insert()
                    }
                    else
                    {
                        $window.document.getElementById("Miktar").focus();
                        $window.document.getElementById("Miktar").select();
                    }
                }
                else
                {   
                    alertify.alert("<a style='color:#3e8ef7''>" + db.Language($scope.Lang,"Stok Bulunamamıştır !") + "</a>" );          
                    console.log(db.Language($scope.Lang,"Stok Bulunamamıştır."));
                    Beep();
                }
            });
        }
    }
    function InsertAfterRefresh(pData)
    {    
        $scope.EvrakLock = true;
        $scope.BarkodLock = false;

        $scope.SiparisListe = pData;
        $("#TblIslem").jsGrid({data : $scope.SiparisListe});    
        $scope.BtnTemizle();
        DipToplamHesapla();
        ToplamMiktarHesapla();
        
        $window.document.getElementById("Barkod").focus();
    }  
    function DipToplamHesapla()
    {
        $scope.AraToplam = $scope.SiparisListe[0].TOTAL_AMOUNT - $scope.SiparisListe[0].TOTAL_VAT;
        $scope.ToplamIndirim = $scope.SiparisListe[0].TOTAL_DISCOUNT;
        $scope.ToplamKdv = $scope.SiparisListe[0].TOTAL_VAT;
        $scope.NetToplam = $scope.AraToplam - $scope.ToplamIndirim;
        $scope.GenelToplam = $scope.NetToplam + $scope.ToplamKdv;
    }
    function ToplamMiktarHesapla()
    {
        $scope.ToplamSatir = 0;

        angular.forEach($scope.SiparisListe,function(value)
        {
            $scope.ToplamSatir += 1 ;
        });
    }
    function EvrakGetir(pSeri,pSira,pEvrTip,pTip)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT *, " + 
                        "ISNULL((SELECT VAT FROM ITEMS WHERE CODE = ITEM_CODE),0) AS VATRATE " +
                        "FROM ORDER_VW_01 WHERE REF = @REF AND REF_NO = @REF_NO AND TYPE = @TYPE AND DOC_TYPE = @DOC_TYPE ORDER BY LINE_NO DESC",
                param:  ['REF','REF_NO','DOC_TYPE','TYPE'],
                type:   ['string|25','int','int','int'],
                value:  [pSeri,pSira,pEvrTip,pTip]
            }
            db.GetDataQuery(TmpQuery,function(pData)
            {
                resolve(pData);
            });
        });
    }
    $scope.YeniEvrak = async function(pTip)
    {
        Init();
        InitCariGrid();
        InitIslemGrid(true);
        InitStokGrid();
        InitEvrakGrid();

        if(pTip == 0)
        {
            $scope.EvrakTip = 0;
            $scope.Tip = 1;
        }
        else if(pTip == 1)
        {
            $scope.EvrakTip = 0;
            $scope.Tip = 0;
        }
        
        if(typeof $location.$$search.REF != 'undefined')
        {
            $scope.Seri = $location.$$search.REF;
            $scope.Sira = $location.$$search.REF_NO;
            $scope.EvrakGetir();
            return;
        }

        $scope.EvrakLock = false;
        $scope.Seri = "SIP";
        $scope.Sira = (await db.GetPromiseTag($scope.Firma,'MaxSiparisNo',[$scope.Seri,$scope.EvrakTip]))[0].MAXSIRA;

        $scope.Stok = 
        [
            {
                PRICE : 0,
                AMOUNT : 0,
                DISCOUNT : 0,
                VATAMOUNT : 0,
                TOPAMOUNT :0
            }
        ];

        let TmpQuery =
        {
            db : $scope.Firma,
            query:  "SELECT [CODE] AS CODE,[NAME] AS NAME FROM DEPOT ORDER BY CODE ASC"
        }
        $scope.DepoListe = (await db.GetPromiseQuery(TmpQuery));
        $scope.DepoNo = "1";
        $scope.DepoListe.forEach(function(item) 
        {
            if(item.CODE == $scope.DepoNo)
                $scope.DepoAdi = item.NAME;
        });

        BarkodFocus();
    }
    $scope.CariListeRowClick = function(pIndex,pItem,pObj)
    {    
        if ( CariSelectedRow ) { CariSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        CariSelectedRow = $row;
        
        $scope.CariKodu = $scope.CariListe[pIndex].CODE;
        $scope.CariAdi = $scope.CariListe[pIndex].NAME;
        $scope.MainClick();
    }
    $scope.StokListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( StokSelectedRow ) { StokSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        StokSelectedRow = $row;
        
        $scope.Barkod = $scope.StokListe[pIndex].CODE;
        $scope.BarkodGirisClick();
        StokBarkodGetir($scope.Barkod);
    }
    $scope.EvrakListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( EvrakSelectedRow ) { EvrakSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        EvrakSelectedRow = $row;
        
        $scope.Seri = $scope.EvrakListe[pIndex].REF;
        $scope.Sira = $scope.EvrakListe[pIndex].REF_NO
    }
    $scope.IslemListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( IslemSelectedRow ) { IslemSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        IslemSelectedRow = $row;
        $scope.IslemListeSelectedIndex = pIndex;
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
    $scope.CariSecClick = function() 
    {
        if($scope.Sira == 0 || typeof $scope.Sira == "undefined")
        {            
            alertify.alert("<a style='color:#3e8ef7''>" + (db.Language($scope.Lang,"Lütfen Evrak Siranın Gelmesini Bekleyin!")) + "</a>" );
        }
        else
        {
            console.log($scope.SiparisListe.length)
            $("#TbCariSec").addClass('active');
            $("#TbMain").removeClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbIslemSatirlari").removeClass('active');
            $("#TblAciklama").removeClass('active');
            $("#TbStok").removeClass('active');
        }
    }
    $scope.BelgeBilgisiClick = function() 
    {
        $("#TbBelgeBilgisi").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TblAciklama").removeClass('active');
        $("#TbStok").removeClass('active');
    }
    $scope.BarkodGirisClick = function() 
    {   
        if($scope.Sira == 0 || typeof $scope.Sira == "undefined")
        {            
            alertify.alert("<a style='color:#3e8ef7''>" + (db.Language($scope.Lang,"Lütfen Evrak Siranın Gelmesini Bekleyin!")) + "</a>" );
        }
        else
        {
            if($scope.CariAdi != "" || $scope.Cins == "1")
            {
                $("#TbBarkodGiris").addClass('active');
                $("#TbMain").removeClass('active');
                $("#TbCariSec").removeClass('active');
                $("#TbBelgeBilgisi").removeClass('active');
                $("#TbIslemSatirlari").removeClass('active');
                $("#TblAciklama").removeClass('active');
                $("#TbStok").removeClass('active');

                BarkodFocus();
            }
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + (db.Language($scope.Lang,"Lütfen Cari Seçiniz !")) + "</a>" );
            }
        }
    }
    $scope.TbIslemSatirlariClick = function() 
    {
        $("#TbIslemSatirlari").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TblAciklama").removeClass('active');
        $("#TbStok").removeClass('active');
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
    $scope.BtnCariListeleEnter = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.BtnCariListele();
        }
    }
    $scope.BtnCariListele = function()
    {   
        $scope.Loading = true;
        $scope.TblLoading = false;
        let Kodu = '';
        let Adi = '';
        

        if($scope.TxtCariAra != "")
        {
            if($scope.CmbCariAra == "0")
            {   
                Adi = $scope.TxtCariAra.replace("*","%").replace("*","%");
            }
            else
            {
                Kodu = $scope.TxtCariAra.replace("*","%").replace("*","%");
            }
        }
        
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT " +
                    "CODE AS CODE," +
                    "NAME AS NAME " +
                    "FROM CUSTOMERS WHERE ((UPPER(CODE) LIKE UPPER(@CODE) + '%' ) OR (@CODE = '')) AND ((UPPER(NAME) LIKE  UPPER(@NAME) + '%') OR (@NAME = ''))",
            param: ['CODE:string|25','NAME:string|100'],
            value: [Kodu,Adi]
        }
        db.GetDataQuery(TmpQuery,function(pData)
        {
            $scope.CariListe = pData;
            if($scope.CariListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblCari").jsGrid({data : $scope.CariListe});  
                $("#TblCari").jsGrid({pageIndex: true})
            }
            else
            {
                alertify.alert((db.Language($scope.Lang,"Cari Bulunamadı")))
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblCari").jsGrid({data : $scope.CariListe});
                $("#TblCari").jsGrid({pageIndex: true})
            }
        });
    }
    $scope.DepoChange = function()
    {
        $scope.DepoListe.forEach(function(item) 
        {
            if(item.CODE == $scope.DepoNo)
                $scope.DepoAdi = item.NAME;
        }); 
    }
    $scope.BirimChange = function()
    {
        if($scope.BirimListe.length > 0)
        {
            $scope.Stok[0].UNIT = $scope.BirimListe.filter(function(d){return d.TYPE == $scope.Birim})[0].TYPE;
            $scope.Stok[0].FACTOR = $scope.BirimListe.filter(function(d){return d.TYPE == $scope.Birim})[0].FACTOR;
            $scope.MiktarFiyatValid();
        }
    } 
    $scope.BtnStokBarkodGetir = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            StokBarkodGetir($scope.Barkod);  
        }
    }
    $scope.BtnBarkodGetirClick = function()
    {
        StokBarkodGetir($scope.Barkod);
    }
    $scope.ScanBarkod = function()
    {
        cordova.plugins.barcodeScanner.scan(
            function (result) 
            {
                $scope.Barkod = result.text;
                StokBarkodGetir($scope.Barkod);
            },
            function (error) 
            {
                //alert("Scanning failed: " + error);
            },
            {
                prompt : db.Language($scope.Lang,"Barkod Okutunuz"),
                orientation : "portrait"
            }
        );
    }
    $scope.MiktarFiyatValid = function()
    {
        if($scope.Stok.length > 0)
        {
            let TmpTutar = ($scope.Stok[0].FACTOR * $scope.Miktar) * $scope.Stok[0].PRICE;

            $scope.Stok[0].VATAMOUNT = TmpTutar - (TmpTutar / (($scope.Stok[0].VAT / 100) + 1));
            $scope.Stok[0].AMOUNT = TmpTutar - $scope.Stok[0].VATAMOUNT;
            $scope.Stok[0].DISCOUNT = 0;
            $scope.Stok[0].TOPAMOUNT = TmpTutar;
        }
    }
    $scope.BtnTemizle = function()
    {
        $scope.Barkod = "";
        $scope.Stok = null;
        $scope.Stok = 
        [
            {
                PRICE : 0,
                AMOUNT : 0,
                DISCOUNT : 0,
                VATAMOUNT : 0,
                TOPAMOUNT :0
            }
        ];
        $scope.Miktar = 1;
        $scope.BarkodLock = false;

        $scope.BirimListe = [];
        BarkodFocus();      
    }
    $scope.MiktarPress = function(keyEvent)
    {
        if(keyEvent.which == 40)
        {
            $window.document.getElementById("Fiyat").focus();
            $window.document.getElementById("Fiyat").select();
        }
        if(keyEvent.which == 13)
        {
            $scope.Insert();
        }
    }
    $scope.FiyatPress = function(keyEvent)
    {
        if(keyEvent.which == 38)
        {
            $window.document.getElementById("Miktar").focus();
            $window.document.getElementById("Miktar").select();
        }
        if(keyEvent.which == 13)
        {
            $scope.Insert();
        }
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
    $scope.Insert = function()
    {
        if(typeof($scope.Stok[0].CODE) != 'undefined')
        {   

            $scope.InsertLock = true
            let TmpFrom = "";
            let TmpTo = "";
            
            if($scope.EvrakTip == 0 && $scope.Tip == 1) //ALINAN SİPARİŞ
            {
                TmpFrom = $scope.DepoNo;
                TmpTo = $scope.CariKodu;
            }
            else if($scope.EvrakTip == 0 && $scope.Tip == 0) //VERİLEN SİPARİŞ
            {
                TmpTo = $scope.DepoNo;
                TmpFrom = $scope.CariKodu;
            }
            else if($scope.EvrakTip == 2 && $scope.Tip == 0) //VERİLEN TOPLU SİPARİŞ
            {
                TmpTo = $scope.DepoNo;
            }
            else if($scope.EvrakTip == 2 && $scope.Tip == 1) //ALINAN TOPLU SİPARİŞ
            {
                TmpFrom = $scope.DepoNo;
            }

            let InserData = 
            [
                $scope.Kullanici,
                $scope.Kullanici,
                $scope.Tip,
                $scope.EvrakTip,
                $scope.Seri,
                $scope.Sira,
                $scope.Tarih,
                TmpFrom,
                TmpTo,
                $scope.Stok[0].CODE,
                $scope.Stok[0].FACTOR * $scope.Miktar,
                $scope.Stok[0].PRICE,
                $scope.Stok[0].DISCOUNT,
                $scope.Stok[0].VAT,
                1
            ]
            db.ExecuteTag($scope.Firma,'SiparisInsert',InserData,async function(pData)
            {
                let TmpData = await EvrakGetir($scope.Seri,$scope.Sira,$scope.EvrakTip,$scope.Tip);
                InsertAfterRefresh(TmpData);
                $scope.InsertLock = false;
            });
        }
        else
        {
            console.log(db.Language($scope.Lang,"Barkod Okutunuz!"));
            $scope.InsertLock = false
        }     
        
        BarkodFocus();
    }
    $scope.BtnDuzenle = function()
    {
        $scope.MiktarEdit = $scope.SiparisListe[$scope.IslemListeSelectedIndex].QUANTITY;
        $scope.FiyatEdit = $scope.SiparisListe[$scope.IslemListeSelectedIndex].PRICE;

        $("#MdlDuzenle").modal('show');
    }
    $scope.BtnDuzenleKaydet = function(pIndex)
    {
        let TmpTutar = $scope.MiktarEdit * $scope.FiyatEdit;
        let TmpVat = TmpTutar - (TmpTutar / (($scope.SiparisListe[pIndex].VATRATE / 100) + 1));
        let InserData = 
        [
            $scope.SiparisListe[pIndex].GUID,
            $scope.Kullanici,
            $scope.SiparisListe[pIndex].ITEM_CODE,
            $scope.MiktarEdit,
            $scope.FiyatEdit,
            $scope.SiparisListe[pIndex].DISCOUNT,
            TmpVat
        ]
        db.ExecuteTag($scope.Firma,'SiparisSatirUpdate',InserData,async function(pData)
        {
            let TmpData = await EvrakGetir($scope.Seri,$scope.Sira,$scope.EvrakTip,$scope.Tip);
            InsertAfterRefresh(TmpData);
            $scope.InsertLock = false;
        });

        angular.element('#MdlDuzenle').modal('hide');
    }
    $scope.SatirDelete = function(pAlinanVerilen)
    {
        alertify.okBtn(db.Language($scope.Lang,'Evet'));
        alertify.cancelBtn(db.Language($scope.Lang,'Hayır'));

        alertify.confirm(db.Language($scope.Lang,'Seçili Satırı Silmek İstediğinize Eminmisiniz ?'), 
        function()
        { 
            if($scope.IslemListeSelectedIndex > -1)
            {
                db.ExecuteTag($scope.Firma,'SiparisSatirDelete',[0,$scope.SiparisListe[$scope.IslemListeSelectedIndex].GUID],async function(data)
                {
                    if($scope.SiparisListe.length <= 1)
                    {
                        if($scope.EvrakTip == 0 && $scope.Tip == 1) //ALINAN SİPARİŞ
                        {
                            $scope.YeniEvrak(0);
                        }
                        else if($scope.EvrakTip == 0 && $scope.Tip == 0) //VERİLEN SİPARİŞ
                        {
                            $scope.YeniEvrak(1);
                        }
                        else if($scope.EvrakTip == 2 && $scope.Tip == 0) //VERİLEN TOPLU SİPARİŞ
                        {
                            $scope.YeniEvrak(1);
                        }
                        else if($scope.EvrakTip == 2 && $scope.Tip == 1) //ALINAN TOPLU SİPARİŞ
                        {
                            $scope.YeniEvrak(0);
                        }
                    }
                    else
                    {
                        let TmpData = await EvrakGetir($scope.Seri,$scope.Sira,$scope.EvrakTip,$scope.Tip);

                        $scope.SiparisListe = TmpData;
                        $("#TblIslem").jsGrid({data : $scope.SiparisListe});    
                        $scope.BtnTemizle();
                        DipToplamHesapla();
                        ToplamMiktarHesapla();
                    }
                });
            }
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + db.Language($scope.Lang,"Seçili Satır Olmadan Evrak Silemezsiniz !" + "</a>" ));
            }
        },
        function(){});
    }
    $scope.EvrakGetir = async function()
    {
        let TmpData = await EvrakGetir($scope.Seri,$scope.Sira,$scope.EvrakTip,$scope.Tip);
        if(TmpData.length > 0)
        {
            Init();
            InitCariGrid();
            InitIslemGrid(true);  

            $scope.Seri = TmpData[0].REF;
            $scope.Sira = TmpData[0].REF_NO;
            $scope.EvrakTip = TmpData[0].DOC_TYPE;
            $scope.Tip = TmpData[0].TYPE;

            if($scope.EvrakTip == 0 && $scope.Tip == 1) //ALINAN SİPARİŞ
            {
                $scope.DepoNo = TmpData[0].DOC_FROM;
                $scope.CariKodu = TmpData[0].DOC_TO;
                $scope.Cins = "0";
                $scope.BtnCariView = true;
            }
            else if($scope.EvrakTip == 0 && $scope.Tip == 0) //VERİLEN SİPARİŞ
            {
                $scope.DepoNo = TmpData[0].DOC_TO;
                $scope.CariKodu = TmpData[0].DOC_FROM;
                $scope.Cins = "0";
                $scope.BtnCariView = true;
            }
            else if($scope.EvrakTip == 2 && $scope.Tip == 0) //VERİLEN TOPLU SİPARİŞ
            {
                $scope.DepoNo = TmpData[0].DOC_TO;
                $scope.CariKodu = "";
                $scope.CariAdi = "";
                $scope.Cins = "1";
                $scope.BtnCariView = false;
            }
            else if($scope.EvrakTip == 2 && $scope.Tip == 1) //ALINAN TOPLU SİPARİŞ
            {
                $scope.DepoNo = TmpData[0].DOC_FROM;
                $scope.CariKodu = "";
                $scope.CariAdi = "";
                $scope.Cins = "1";
                $scope.BtnCariView = false;
            }

            $scope.Tarih = new Date(TmpData[0].DOC_DATE).toLocaleDateString();                
            $scope.Barkod = "";
            $scope.Stok = 
            [
                {
                    PRICE : 0,
                    AMOUNT : 0,
                    DISCOUNT : 0,
                    VATAMOUNT : 0,
                    TOPAMOUNT :0
                }
            ];
            $scope.Miktar = 1;

            $scope.AraToplam = 0;
            $scope.ToplamIndirim = 0;
            $scope.NetToplam = 0;
            $scope.ToplamKdv = 0;
            $scope.GenelToplam = 0;

            $scope.CmbCariAra = "0";
            $scope.TxtCariAra = "";

            if($scope.EvrakTip != "2")
            {
                let TmpQuery = 
                {
                    db : $scope.Firma,
                    query:  "SELECT " +
                            "CODE AS CODE," +
                            "NAME AS NAME " +
                            "FROM CUSTOMERS WHERE ((UPPER(CODE) LIKE UPPER(@CODE) + '%' ) OR (@CODE = '')) AND ((UPPER(NAME) LIKE  UPPER(@NAME) + '%') OR (@NAME = ''))",
                    param: ['CODE:string|25','NAME:string|100'],
                    value: [$scope.CariKodu,'']
                }
                db.GetDataQuery(TmpQuery,function(pData)
                {
                    $scope.CariListe = pData;
                    $scope.CariAdi = $scope.CariListe[0].NAME
    
                    $("#TblCari").jsGrid({data : $scope.CariListe});
    
                    let Obj = $("#TblCari").data("JSGrid");
                    let Item = Obj.rowByItem($scope.CariListe[0]);
                    
                    $scope.CariListeRowClick(0,Item,Obj);
                });
            }

            TmpQuery =
            {
                db : $scope.Firma,
                query:  "SELECT [CODE] AS CODE,[NAME] AS NAME FROM DEPOT ORDER BY CODE ASC"
            }
            $scope.DepoListe = (await db.GetPromiseQuery(TmpQuery));
            $scope.DepoNo = $scope.DepoListe[0].CODE.toString();;
            $scope.DepoListe.forEach(function(item) 
            {
                if(item.CODE == $scope.DepoNo)
                    $scope.DepoAdi = item.NAME;
            });

            $scope.SiparisListe = TmpData;
            $("#TblIslem").jsGrid({data : $scope.SiparisListe});  

            ToplamMiktarHesapla();
            DipToplamHesapla();

            $scope.EvrakLock = true;
            $scope.BarkodLock = false;

            angular.element('#MdlEvrakGetir').modal('hide');

            BarkodFocus();
            
            alertify.alert("<a style='color:#3e8ef7''>" + $scope.ToplamSatir + " " + db.Language($scope.Lang,"Satır Kayıt Başarıyla Getirildi.. !") + "</a>" );
        }
        else
        {
            angular.element('#MdlEvrakGetir').modal('hide');
            alertify.alert("<a style='color:#3e8ef7''>" + db.Language($scope.Lang,"Belge Bulunamadı !") + "</a>" );
        }
    }
    $scope.EvrakDelete = function()
    {
        alertify.okBtn(db.Language($scope.Lang,'Evet'));
        alertify.cancelBtn(db.Language($scope.Lang,'Hayır'));

        alertify.confirm(db.Language($scope.Lang,'Evrağı silmek istediğinize eminmisiniz ?'), 
        function()
        { 
            if($scope.SiparisListe.length > 0)
            {
                db.ExecuteTag($scope.Firma,'SiparisEvrakDelete',[1,$scope.EvrakTip,$scope.Seri,$scope.Sira],async function(data)
                {
                    if($scope.EvrakTip == 0 && $scope.Tip == 1) //ALINAN SİPARİŞ
                    {
                        $scope.YeniEvrak(0);
                    }
                    else if($scope.EvrakTip == 0 && $scope.Tip == 0) //VERİLEN SİPARİŞ
                    {
                        $scope.YeniEvrak(1);
                    }
                    else if($scope.EvrakTip == 2 && $scope.Tip == 0) //VERİLEN TOPLU SİPARİŞ
                    {
                        $scope.YeniEvrak(1);
                    }
                    else if($scope.EvrakTip == 2 && $scope.Tip == 1) //ALINAN TOPLU SİPARİŞ
                    {
                        $scope.YeniEvrak(0);
                    }
                    alertify.alert("<a style='color:#3e8ef7''>" + db.Language($scope.Lang,"Evrak Silme İşlemi Başarıyla Gerçekleşti !") + "</a>" );
                });
            }
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + db.Language($scope.Lang,"Silinecek Belge Yok !") + "</a>" );
            }
        }
        ,function(){});
    }
    $scope.CinsChange = async function()
    {
        if($scope.Cins == 0)
        {
            $scope.EvrakTip = 0;
            $scope.BtnCariView = true;
            $scope.CariKodu = "";  
            $scope.CariAdi = "";
            $scope.Sira = (await db.GetPromiseTag($scope.Firma,'MaxSiparisNo',[$scope.Seri,$scope.EvrakTip]))[0].MAXSIRA;
            $scope.$apply();
        }
        else if($scope.Cins == 1)
        {
            $scope.EvrakTip = 2;
            $scope.BtnCariView = false;
            $scope.CariKodu = "";  
            $scope.CariAdi = "";
            $scope.Sira = (await db.GetPromiseTag($scope.Firma,'MaxSiparisNo',[$scope.Seri,$scope.EvrakTip]))[0].MAXSIRA;
            $scope.$apply();
        }
    }
    $scope.BtnEvrakGetir = async function()
    {
        $("#MdlEvrakGetir").modal('show');
        let TmpQuery =
        {
            db : $scope.Firma,
            query:  "SELECT REF,REF_NO,DOC_FROM_NAME, " + 
                    "ISNULL((SELECT COUNT(*) FROM ORDER_VW_01 AS D WHERE D.REF = M.REF AND D.REF_NO = M.REF_NO),0) AS LINE_COUNT " +
                    "FROM ORDER_M_VW_01 AS M WHERE TYPE = @TYPE AND DOC_TYPE = @DOC_TYPE ORDER BY LDATE DESC",
            param:  ['TYPE:int','DOC_TYPE:int'],
            value:  [$scope.Tip,$scope.EvrakTip]
        }
        $scope.EvrakListe = (await db.GetPromiseQuery(TmpQuery));
        InitEvrakGrid();
    }
    $scope.BtnTumu = function()
    {
        InitIslemGrid(false);  
    }
    $scope.BtnEvrakTumu = function()
    {
        InitEvrakGrid(false);  
    }
}