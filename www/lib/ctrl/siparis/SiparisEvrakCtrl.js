function SiparisEvrakCtrl ($scope,$window,$timeout,db)
{
    let CariSelectedRow = null;
    let IslemSelectedRow = null;
    let StokSelectedRow = null;
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
        $scope.Sira;
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

        $scope.DepoListe = [];
        $scope.CariListe = [];
        $scope.SiparisListe = [];
        $scope.BirimListe = [];
        $scope.StokListe = [];

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
    function InitIslemGrid()
    {
        $("#TblIslem").jsGrid({
            responsive: true,
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.SiparisListe,
            paging : true,
            pageIndex : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
           
            fields: 
            [
            {
                name: "NO",
                title: "NO",
                type: "number",
                align: "center",
                width: 75
                
            }, 
            {
                name: "ITEM_CODE",
                title: "KODU",
                type: "text",
                align: "center",
                width: 100
            },
            {
                name: "ITEM_NAME",
                title: "ADI",
                type: "text",
                align: "center",
                width: 200
            }, 
            {
                name: "QUANTITY",
                title: "MİKTAR",
                type: "number",
                align: "center",
                width: 100
            }, 
            {
                name: "PRICE",
                title: "FİYAT",
                type: "number",
                align: "center",
                width: 100
            }, 
            {
                name: "AMOUNT",
                title: "TUTAR",
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
    function BarkodFocus()
    {
        $timeout( function(){$window.document.getElementById("Barkod").focus();},100);  
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
                    alertify.alert("<a style='color:#3e8ef7''>" + "Stok Bulunamamıştır !" + "</a>" );          
                    console.log("Stok Bulunamamıştır.");
                    Beep();
                }
            });
        }
    }
    $scope.YeniEvrak = async function(pTip)
    {
        Init();
        InitCariGrid();
        InitIslemGrid();
        InitStokGrid();

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

        $scope.EvrakLock = false;
        $scope.Seri = "SIP";
        $scope.Sira = (await db.GetPromiseTag($scope.Firma,'MaxSiparisNo',[$scope.TxtSeri,$scope.EvrTip]))[0].MAXSIRA;

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
            alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Evrak Siranın Gelmesini Bekleyin!" + "</a>" );
        }
        else
        {
            if($scope.SiparisListe.length == 0)
            {
                $("#TbCariSec").addClass('active');
                $("#TbMain").removeClass('active');
                $("#TbBelgeBilgisi").removeClass('active');
                $("#TbIslemSatirlari").removeClass('active');
                $("#TblAciklama").removeClass('active');
                $("#TbStok").removeClass('active');
            }        
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Cari Seçim Ekranına Girmeye Yetkiniz Yok !" + "</a>" );
            }
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
            alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Evrak Siranın Gelmesini Bekleyin!" + "</a>" );
        }
        else
        {
            if($scope.CariAdi != "")
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
                alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Cari Seçiniz !" + "</a>" );
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
                alertify.alert("Cari Bulunamadı")
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
                prompt : "Barkod Okutunuz",
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
}