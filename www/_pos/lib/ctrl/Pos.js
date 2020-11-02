function Pos($scope,$window,$rootScope,db)
{
    let IslemSelectedRow = null;
    let CariSelectedRow = null;
    let StokSelectedRow = null;
    let BarkodSelectedRow = null;
    let ParkIslemSelectedRow = null;
    let TahIslemSelectedRow = null;
    let SonSatisSelectedRow = null;
    let FocusBarkod = true;
    let FocusAraToplam = false;
    let FocusMusteri = false;
    let FocusStok = false;
    let FocusMiktarGuncelle = false;
    let FocusFiyatGuncelle = false;
    let FocusKartOdeme = false;
    let FocusSonTahGuncelle = false;
    let FocusSadakatIndirim = false;
    let FirstKey = false;
    let UserParam = null;
    let SonTahIndex = 0;

    $('#MdlAraToplam').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusKartOdeme = false;
        FocusSonTahGuncelle = false;
        FocusSadakatIndirim = false;
    });
    $('#MdlMusteriListele').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusKartOdeme = false;
        FocusSonTahGuncelle = false;
        FocusSadakatIndirim = false;
    });
    $('#MdlStokListele').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false
        FocusStok = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusSonTahGuncelle = false;
        FocusSadakatIndirim = false;

        db.SafeApply($scope,function()
        {
            $scope.TxtBarkod = "";
        })
        FocusKartOdeme = false;
    });
    $('#MdlIadeGetir').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusSonTahGuncelle = false;
        FocusKartOdeme = false;
        FocusSadakatIndirim = false;
    });
    $('#MdlMiktarGuncelle').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusSonTahGuncelle = false;
        FocusKartOdeme = false;
        FocusSadakatIndirim = false;
    });
    $('#MdlFiyatGuncelle').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusSonTahGuncelle = false;
        FocusKartOdeme = false;
        FocusSadakatIndirim = false;
    });
    $('#MdlKartOdeme').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusSonTahGuncelle = false;
        FocusKartOdeme = false;
        FocusSadakatIndirim = false;
    });
    $('#MdlParaUstu').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusMiktarGuncelle = false;
        FocusKartOdeme = false;
        FocusSadakatIndirim = false;
    });
    $('#MdlPluEdit').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusKartOdeme = false;
        FocusSonTahGuncelle = false;
        FocusSadakatIndirim = false;

        $scope.DivPlu = false;
        $scope.PluGrupAdi = "";
        $scope.PluStokKod = "";
        $scope.PluIndex = "";
    });
    $('#MdlBarkodListele').on('hide.bs.modal', function () 
    {
        $scope.TxtBarkod = "";
    });
    $('#MdlSadakatIndirim').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusKartOdeme = false;
        FocusSonTahGuncelle = false;
        FocusSadakatIndirim = false;
    });

    if(typeof require != 'undefined')
    {
        //BURAYA TEKRAR BAKILACAK (CALLBACK DESTROY)
        db.CardPayment.On("PaymentEvent",function(pData)
        {
            if(pData.tag == "response")
            {
                if(JSON.parse(pData.msg).transaction_result != 0)
                {
                    $("#MdlKartYukleniyor").modal("hide"); 
                    alertify.confirm('Ödeme gerçekleşmedi', function()
                    {
                        $("#MdlKartYukleniyor").modal("show");
                    });
                }
                else
                {
                    $("#MdlKartYukleniyor").modal("hide");

                    $scope.PosTahInsert(()=>
                    {
                        if($scope.TahKalan > 0)
                        {
                            $scope.BtnAraToplam();
                        }
                    });
                }
            }
        })
    }

    setTimeout(function()
    { 
        db.LCDPrint
        (
            {
                blink : 0,
                text :  db.PrintText("Bonjour",20) + 
                        db.PrintText(moment(new Date()).format("DD.MM.YYYY"),20)
            }
        );
    }, 1000);

    $rootScope.LoadingShow = function() 
    {
        $("#loading").show();
    }
    $rootScope.LoadingHide = function() 
    {
        $("#loading").hide();
    }
    $rootScope.MessageBox = function(pMsg)
    {
        alertify.alert(pMsg);
    }
    function Init()
    {
        UserParam = Param[$window.sessionStorage.getItem('User')];                

        $scope.Seri = "";
        $scope.TahSeri = "";
        $scope.Sira = 0;
        $scope.TahSira = 0;
        $scope.EvrakTip = 0;
        $scope.CariKodu = "";
        $scope.CariAdi = "";
        $scope.CariPuan = 0;
        $scope.CariKullanPuan = 0;
        $scope.Tarih = new Date().toLocaleDateString('tr-TR',{ year: 'numeric', month: 'numeric', day: 'numeric' });
        $scope.Sube = "0";
        $scope.TxtBarkod = "";
        $scope.AraToplam = 0;
        $scope.ToplamKdv = 0;
        $scope.ToplamIskonto = 0;
        $scope.ToplamKalan = 0;
        $scope.ToplamFisIskonto = 0;
        $scope.GenelToplam = 0;
        $scope.ToplamMiktar = 0;
        $scope.ToplamSatir = 0;
        $scope.ParkIslemSayisi = 0;
        $scope.CiktiTip = 1;
        $scope.PluGrupAdi = "";
        $scope.DivPlu = false;
        $scope.PluGrupIndex = "";
        $scope.PluStokKod = "";
        $scope.PluIndex = 0;
        $scope.PluStokGrup = false;        

        $scope.Kullanici = UserParam.Kullanici;
        $scope.KasaNo = 1;
        $scope.Saat = moment(new Date(),"HH:mm:ss").format("HH:mm:ss");

        $scope.TahPanelKontrol = false;
        $scope.Klavye = false;

        $scope.TahTip = 0;
        $scope.TxtAraToplamTutar = "";
        $scope.TahKalan = 0;
        $scope.TahParaUstu = 0;

        $scope.IslemListeSelectedIndex = 0;
        $scope.TahIslemListeSelectedIndex = 0;
        $scope.ParkIslemListeSelectedIndex = 0;
        $scope.SonSatisListeSelectedIndex = 0;

        $scope.CmbCariAra = "0";
        $scope.CmbStokAra = "0";
        $scope.CmbIadeTip = "0";
        $scope.TxtCariAra = "";
        $scope.TxtStokAra = "";

        $scope.CariListe = [];
        $scope.StokListe = [];
        $scope.BarkodListe = []; 
        $scope.Stok = [];
        $scope.PluList = [];
        $scope.PluGrpList = [];
        $scope.SatisList = [];        
        $scope.SatisFisList = []; 
        $scope.TahList = [];   
        $scope.ParkList =[];     
        $scope.SonSatisList = [];
        $scope.SonSatisDetayList = [];   
        $scope.SonSatisTahDetayList = [];         
        $scope.TRDetayListe = [];

        setInterval(()=>
        {
            db.SafeApply($scope,function()
            {
                $scope.Saat = moment(new Date(),"HH:mm:ss").format("HH:mm:ss");
            })
        },1000);

        InitClass();
    }
    function InitClass()
    {
        $scope.Class = {};
        $scope.Class.BtnFiyatGor = "form-group btn btn-info btn-block my-1";
        $scope.Class.BtnEdit = "icon wb-lock"
        $scope.Class.BtnCariBarSec = "form-group btn btn-info btn-block my-1"
    }
    function InitCariGrid()
    {
        $("#TblCari").jsGrid
        ({
            width: "100%",
            height: "300px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.CariListe,
            paging : true,
            pageSize: 30,
            pageButtonCount: 5,
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
                    title: "LAST NAME",
                    name: "LAST_NAME",
                    type: "text",
                    align: "center",
                    width: 300
                },
                {
                    name: "ADRESS",
                    type: "text",
                    align: "center",
                    width: 300
                },
                {
                    name: "POINT",
                    type: "number",
                    align: "center",
                    width: 100
                }
            ],
            rowClick: function(args)
            {
                $scope.CariListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitStokGrid()
    {
        $("#TblStok").jsGrid
        ({
            width: "100%",
            height: "300px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokListe,
            fields: 
            [
                {
                    name: "CODE",
                    type: "text",
                    align: "center",
                    width: 100
                    
                },
                {
                    name: "NAME",
                    type: "text",
                    align: "center",
                    width: 300
                },
                {
                    name: "PRICE",
                    type: "number",
                    align: "center",
                    width: 100
                }
            ],
            rowClick: function(args)
            {
                $scope.StokListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitBarkodGrid()
    {
        $("#TblBarkod").jsGrid
        ({
            width: "100%",
            height: "300px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.BarkodListe,
            fields: 
            [
                {
                    name: "BARCODE",
                    type: "text",
                    align: "center",
                    width: 100
                    
                },
                {
                    name: "NAME",
                    type: "text",
                    align: "center",
                    width: 300
                },
                {
                    name: "PRICE",
                    type: "text",
                    align: "center",
                    width: 100
                }
            ],
            rowClick: function(args)
            {
                $scope.BarkodListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitIslemGrid()
    {   
        $("#TblIslem").jsGrid({
            responsive: true,
            width: "100%",
            height: "215px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.SatisList,
            rowClass: function (item, itemIndex)
            {
                return "rowheight";
            },
            fields: 
            [
            {
                name: "NO",
                title: "NO",
                type: "text",
                align: "center",
                width: 30
            },
            {
                name: "ITEM_NAME",
                title: "ADI",
                type: "text",
                align: "center",
                width: 200,
                itemTemplate: function(value,item)
                {
                    return "<div style='white-space: nowrap;overflow: hidden;text-overflow: ellipsis;'>" + value + "</div>";
                }
            },
            {
                name: "QUANTITY",
                title: "MIKTAR",
                type: "number",
                align: "center",
                width: 60
            },         
            {
                name: "PRICE",
                title: "FIYAT",
                type: "number",
                align: "center",
                width: 60
            },
            {
                name: "AMOUNT",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 60
            }],
            rowClick: function(args)
            {                   
                if(args.event.target.cellIndex == 2)
                {
                    $scope.IslemListeSelectedIndex = args.itemIndex;
                    $scope.BtnMiktarGuncelle();
                }
                if(args.event.target.cellIndex == 3)
                {
                    $scope.IslemListeSelectedIndex = args.itemIndex;
                    $scope.BtnFiyatGuncelle();
                }

                $scope.IslemListeRowClick(args.itemIndex,args.item);
                $scope.$apply();                
            }
        });
    }
    function InitTahIslemGrid()
    {   
        $("#TblTahIslem").jsGrid({
            responsive: true,
            width: "100%",
            height: "140px",
            updateOnResize: true,
            heading: false,
            selecting: true,
            data : $scope.TahList,
            rowClass: function (item, itemIndex)
            {
                return "rowheight";
            },
            fields: 
            [{
                name: "TYPE_NAME",
                title: "TIP",
                type: "number",
                align: "center",
                width: 60
            }, 
            {
                name: "AMOUNT",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 60
            }],
            rowClick: function(args)
            {
                $scope.TahIslemListeRowClick(args.itemIndex,args.item);
                $scope.$apply();
            }
        });
    }
    function InitParkIslemGrid()
    {   
        $("#TblParkIslem").jsGrid({
            responsive: true,
            width: "100%",
            height: "385px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.ParkList,
            rowClass: function (item, itemIndex)
            {
                return "rowheight";
            },
            fields: 
            [{
                name: "LUSER",
                title: "KULLANICI",
                type: "text",
                align: "center",
                width: 75
            },
            {
                name: "DATE",
                title: "TARIH",
                type: "number",
                align: "center",
                width: 75
            },
            {
                name: "REF",
                title: "SERI",
                type: "text",
                align: "center",
                width: 50
            }, 
            {
                name: "REF_NO",
                title: "SIRA",
                type: "text",
                align: "center",
                width: 50
            },
            {
                name: "AMOUNT",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 60
            }],
            rowClick: function(args)
            {
                $scope.ParkIslemListeRowClick(args.itemIndex,args.item);
                $scope.$apply();
            }
        });
    }
    function InitSonSatisGrid()
    {
        $("#TblSonSatis").jsGrid({
            responsive: true,
            width: "100%",
            height: "250px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            sorting: true,
            data : $scope.SonSatisList,
            rowClass: function (item, itemIndex)
            {
                return "rowheight";
            },
            fields: 
            [
            {
                name: "CDATE",
                title: "TARIH",
                type: "date",
                align: "center",
                width: 50
            },
            {
                name: "CHOUR",
                title: "SAAT",
                type: "date",
                align: "center",
                width: 50
            },
            {
                name: "REF",
                title: "SERI",
                type: "TEXT",
                align: "center",
                width: 35
            },
            {
                name: "REF_NO",
                title: "SIRA",
                type: "number",
                align: "center",
                width: 35
            },
            {
                name: "LINE_NO",
                title: "SATIR",
                type: "number",
                align: "center",
                width: 50
            },
            {
                name: "USER",
                title: "KULLANICI",
                type: "TEXT",
                align: "center",
                width: 75
            },
            {
                name: "AMOUNT",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 50
            }
            ],
            rowClick: function(args)
            {
                $scope.SonSatisRowClick(args.itemIndex,args.item);
                $scope.$apply();
            }
        });
    }
    function InitSonSatisDetayGrid()
    {
        $("#TblSonSatisDetay").jsGrid({
            responsive: true,
            width: "100%",
            height: "250px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            paging : true,
            pageSize: 5,
            pageButtonCount: 3,
            data : $scope.SonSatisDetayList,
            rowClass: function (item, itemIndex)
            {
                return "rowheight";
            },
            fields: 
            [
            {
                name: "BARCODE",
                title: "BARKOD",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "NAME",
                title: "NAME",
                type: "TEXT",
                align: "center",
                width: 150
            },            
            {
                name: "QUANTITY",
                title: "MIKTAR",
                type: "number",
                align: "center",
                width: 50
            },
            {
                name: "PRICE",
                title: "FIYAT",
                type: "number",
                align: "center",
                width: 50
            },
            {
                name: "AMOUNT",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 50
            }],
            rowClick: function(args)
            {
                // $scope.SonSatisDetayRowClick(args.itemIndex,args.item);
                // $scope.$apply();
            }
        });
    }
    function InitSonSatisTahDetayGrid()
    {
        $("#TblSonSatisTahDetay").jsGrid({
            width: "100%",
            height: "250px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            editing: true,
            data : $scope.SonSatisTahDetayList,
            paging : true,
            pageSize: 5,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",            
            rowClass: function (item, itemIndex)
            {
                return "rowheight";
            },
            fields: 
            [
            {
                name: "TYPE",
                title: "TIP",
                align: "center",
                width: 75
            },
            {
                name: "AMOUNT",
                title: "AMOUNT",
                type: "decimal",
                align: "center",
                width: 35
            },
            {
                name: "CHANGE",
                title: "CHANGE",
                align: "center",
                width: 35
            }
            ],
            rowClick: function(args)
            {
                $('#MdlSonSatisTahGuncelle').modal('show');
               
                SonTahIndex = args.itemIndex;
                $scope.TxtSonTahGuncelle = args.item.AMOUNT
                FocusSonTahGuncelle = true;
                FocusFiyatGuncelle = false;
                FocusAraToplam = false;
                FocusBarkod = false;
                FocusMusteri = false;
                FocusStok = false;
                FocusKartOdeme = false;
                FocusMiktarGuncelle = false;   
                FocusSadakatIndirim = false;             
            }
        });
    }
    function InitTRDetayGrid()
    {
        $("#TblTRDetay").jsGrid
        ({
            width: "100%",
            height: "300px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.TRDetayListe,
            fields: 
            [
                {
                    name: "AMOUNT",
                    type: "text",
                    align: "center",
                    width: 300
                    
                },
                {
                    name: "COUNT",
                    type: "text",
                    align: "center",
                    width: 300
                }
            ]
        });
    }
    function InsertSonYenile(pData)
    {    
        $scope.SatisList = pData;
        $("#TblIslem").jsGrid({data : $scope.SatisList});    
        $scope.TxtBarkod = "";
        
        DipToplamHesapla();
        //$scope.Yukleniyor =  false  
        $window.document.getElementById("TxtBarkod").focus();
    } 
    function InsertFisYenile(pData)
    {   
        $scope.SatisFisList = pData;
        $scope.FisSeri = pData[0].REF
        $scope.FisSira = pData[0].REF_NO
        $scope.FisTarih = pData[0].CDATE
        $scope.FisSaat = pData[0].CHOUR
        
        DipToplamFisHesapla();
        //$scope.Yukleniyor =  false  
        $window.document.getElementById("TxtBarkod").focus();
    }  
    function DipToplamHesapla()
    {
        $scope.CariKullanPuan = $scope.SatisList[0].LOYALTY * 100
        $scope.AraToplam = 0;
        $scope.ToplamKdv = 0;
        $scope.GenelToplam = 0;
        $scope.ToplamIskonto = 0;
        $scope.ToplamFisIskonto = 0;

        angular.forEach($scope.SatisList,function(value)
        {
            let TmpKdv = (((value.QUANTITY * value.PRICE) - value.DISCOUNT)) - ((((value.QUANTITY * value.PRICE) - value.DISCOUNT)) / ((value.VAT / 100) + 1)); 
            $scope.ToplamKdv += TmpKdv; 
            $scope.AraToplam += (value.QUANTITY * value.PRICE) - TmpKdv;
            $scope.ToplamIskonto += value.DISCOUNT;
        });

        let TmpKdvOran = ($scope.ToplamKdv / $scope.AraToplam) * 100;
        let TmpAraToplam = ($scope.AraToplam + $scope.ToplamKdv) - $scope.SatisList[0].LOYALTY;
        $scope.AraToplam =  TmpAraToplam / ((TmpKdvOran / 100) + 1)
        $scope.ToplamKdv = TmpAraToplam - $scope.AraToplam

        $scope.ToplamKalan = (($scope.AraToplam - $scope.ToplamIskonto) + $scope.ToplamKdv) - db.SumColumn($scope.TahList,"AMOUNT");
        $scope.GenelToplam = (($scope.AraToplam - $scope.ToplamIskonto) + $scope.ToplamKdv);

        // console.log(parseFloat($scope.GenelToplam - 1) / ((TmpKdvOran.toFixed(2) / 100) + 1))
        // console.log(parseFloat($scope.GenelToplam - 1) - (parseFloat($scope.GenelToplam - 1) / ((TmpKdvOran.toFixed(2) / 100) + 1)))
    }
    function DipToplamFisHesapla()
    {
        $scope.FisAraToplam = 0;
        $scope.FisToplamKdv = 0;
        $scope.FisGenelToplam = 0;
        $scope.FisToplamIskonto = 0;

        angular.forEach($scope.SatisFisList,function(value)
        {
            $scope.FisAraToplam += value.QUANTITY * value.PRICE;
            $scope.FisToplamKdv += ((value.QUANTITY * value.PRICE) - value.DISCOUNT) * (value.VAT / 100);     
            $scope.FisToplamIskonto += value.DISCOUNT + (value.DISCOUNT * (value.VAT / 100));
        });
        
        $scope.FisGenelToplam = parseFloat($scope.FisAraToplam - $scope.FisToplamIskonto).toFixed(2);
    }
    function TxtBarkodKeyPress()
    {   
        if($scope.TxtBarkod.indexOf("-") != -1)
        {   
            $scope.PosSatisMiktarUpdate($scope.SatisList[$scope.IslemListeSelectedIndex],$scope.TxtBarkod.split("-")[1]);
        }
        else if($scope.TxtBarkod.indexOf("/") != -1)
        {
            $scope.BtnIskonto($scope.TxtBarkod.split("/")[1]);
        }
        // else if($scope.TxtBarkod.indexOf("*") != -1)
        // {
        //     $scope.PosSatisMiktarUpdate($scope.SatisList[$scope.IslemListeSelectedIndex],$scope.TxtBarkod.split("*")[1] * $scope.SatisList[$scope.IslemListeSelectedIndex].QUANTITY);
        // }
        else
        {   
            $scope.StokGetir($scope.TxtBarkod);
        }
    }
    function TahSonYenile()
    {  
        FirstKey = false;      
        $("#TblTahIslem").jsGrid({data : $scope.TahList}); 
        
        if($scope.TahList.length > 0)
        {            
            $scope.TahKalan = parseFloat($scope.GenelToplam).toFixed(2) - db.SumColumn($scope.TahList,"AMOUNT").toFixed(2);
            $scope.TahParaUstu = db.SumColumn($scope.TahList,"CHANGE"); 
            $scope.TahIslemListeRowClick($scope.TahList.length-1,$scope.TahList[$scope.TahList.length-1]); 
        }
        else
        {    
            $scope.TahKalan = parseFloat($scope.GenelToplam).toFixed(2);
            $scope.TahParaUstu = 0; 
        }

        $scope.TxtAraToplamTutar = parseFloat($scope.TahKalan).toFixed(2);
    }  
    function FiyatUpdate(pData)
    {
        return new Promise(async resolve => 
        {
            let TmpMiktar = db.SumColumn($scope.SatisList,"QUANTITY","ITEM_CODE = " + pData.ITEM_CODE);
            let TmpFiyat = pData.PRICE;

            let TmpFiyatData = await db.GetPromiseTag($scope.Firma,'PosSatisFiyatGetir',[pData.ITEM_CODE,TmpMiktar]);
                                       
            if(TmpFiyatData.length > 0)
            {
                TmpFiyat = TmpFiyatData[0].PRICE;
            }

            await db.GetPromiseTag($scope.Firma,'PosSatisFiyatUpdate',[TmpFiyat,pData.GUID]);

            resolve();
        });
    }  
    function SatirBirlestir(pTip)
    {
        let TmpStatus = false;
        let TmpIndex = -1;

        if(pTip == "SATIS")
        {
            for (let i = 0; i < $scope.SatisList.length; i++) 
            {
                if($scope.SatisList[i].ITEM_CODE == $scope.Stok[0].CODE)
                {
                    TmpStatus = true;
                    TmpIndex = i;
                }
            }
        }
        else if(pTip == "TAHSILAT")
        {
            for (let i = 0; i < $scope.TahList.length; i++) 
            {
                if($scope.TahList[i].TYPE == $scope.TahTip)
                {
                    TmpStatus = true;
                    TmpIndex = i;
                }
            }
        }

        return {Status : TmpStatus,Index : TmpIndex};
    }
    function SatisKapat()
    {
        if($scope.TahKalan <= 0)
        {
            db.ExecuteTag($scope.Firma,'PosSatisKapatUpdate',[$scope.Sube,$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
            {   
                let TmpQuery = 
                {
                    db : $scope.Firma,
                    query:  "SELECT " + 
                            "CASE WHEN VAT = 20 THEN 'B' WHEN VAT = 5.5 THEN 'C' END AS VAT_TYPE, " + 
                            "VAT AS VAT, " +  
                            "(SUM(QUANTITY) * SUM(PRICE)) - (((SUM(QUANTITY) * SUM(PRICE)) / 100) * VAT) AS HT, " + 
                            "((SUM(QUANTITY) * SUM(PRICE)) / 100) * VAT AS TVA, " +
                            "ROUND(SUM(QUANTITY) * SUM(PRICE),4) AS TTC, " +
                            "ISNULL((SELECT COUNT(REF) AS TICKET FROM (SELECT REF FROM POS_SALES " + 
                            "WHERE DOC_DATE >= CONVERT(NVARCHAR(10),GETDATE(),112) " + 
                            "AND DOC_DATE <= CONVERT(NVARCHAR(10),GETDATE(),112) " + 
                            "AND DEPARTMENT = @DEPARTMENT " + 
                            "AND STATUS = 1 " + 
                            "GROUP BY REF,REF_NO) AS TMP),1) AS TICKET " + 
                            "FROM POS_SALES AS POS " +
                            "WHERE DEPARTMENT = @DEPARTMENT AND TYPE = @TYPE AND REF = @REF AND REF_NO = @REF_NO " +
                            "GROUP BY VAT",
                    param:  ['DEPARTMENT','TYPE','REF','REF_NO'],
                    type:   ['int','int','string|25','int'],
                    value:  [$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira]
                }
                db.GetDataQuery(TmpQuery,function(pData)
                {
                    //EĞER MÜŞTERİ KARTI İSE PUAN KAYIT EDİLİYOR.
                    if($scope.CariKodu != 'C001')
                    {
                        let TmpPuanData = 
                        [
                            UserParam.Kullanici,
                            UserParam.Kullanici,
                            0,
                            $scope.CariKodu,
                            $scope.Seri,
                            $scope.Sira,
                            Math.floor($scope.GenelToplam)
                        ]

                        db.ExecuteTag($scope.Firma,'MusteriPuanInsert',TmpPuanData);

                        if($scope.CariKullanPuan > 0)
                        {
                            let TmpPuanData = 
                            [
                                UserParam.Kullanici,
                                UserParam.Kullanici,
                                1,
                                $scope.CariKodu,
                                $scope.Seri,
                                $scope.Sira,
                                $scope.CariKullanPuan * -1
                            ]
                            db.ExecuteTag($scope.Firma,'MusteriPuanInsert',TmpPuanData);
                        }
                    }
                    //SATIŞ SONUNDA PARA ÜSTÜ MODAL EKRANI AÇILIYOR. TMPPARAUSTU DEĞİŞKENİ EKRAN YENİLENDİĞİ İÇİN KULLANILDI. 
                    //$scope.TmpParaUstu = $scope.TahParaUstu;
                    if($scope.TahParaUstu > 0)
                    {
                        $scope.TmpParaUstu = $scope.TahParaUstu;
                        $("#MdlParaUstu").modal("show");                    
                        setTimeout(()=>{$("#MdlParaUstu").modal("hide")},5000);
                    }
                                        
                    db.EscposPrint($scope.SatisList,$scope.TahList,pData,function()
                    {
                        //EĞER TAHSİLAT İÇERİSİNDE NAKİT VARSA KASAYI AÇ YOKSA KASAYI AÇMA BUNUN İÇİN TAHSİLAT TABLOSUNDAKİ TYPE ALANININ TOPLAM DEĞERİNE BAKIYORUM.
                        if(db.SumColumn($scope.TahList,"TYPE") == 0)
                        {
                            db.EscposCaseOpen();
                        }
                    });
    
                    setTimeout(()=>
                    {
                        $('#MdlAraToplam').modal('hide');
                        $scope.YeniEvrak();
                        $scope.TxtBarkod = "";
                        $scope.TahPanelKontrol = false;

                        setTimeout(function()
                        { 
                            db.LCDPrint
                            (
                                {
                                    blink : 0,
                                    text :  db.PrintText("A tres bientot",20)
                                }
                            );
                        }, 1000); 

                        setTimeout(function()
                        { 
                            db.LCDPrint
                            (
                                {
                                    blink : 0,
                                    text :  db.PrintText("Bonjour",20) + 
                                            db.PrintText(moment(new Date()).format("DD.MM.YYYY"),20)
                                }
                            );
                        }, 3000);

                    },1000)
                    
                });                                  
            });
        }
    }
    document.onkeydown = function(e)
    {
        if(FocusBarkod == true)
        {
            $window.document.getElementById("TxtBarkod").focus();

            if(e.which == 38)
            {
                if($scope.SatisList.length > 0)
                {
                    $scope.BtnUpClick();
                }
            }
            else if(e.which == 40)
            {
                if($scope.SatisList.length > 0)
                {
                    $scope.BtnDownClick();
                }
            }
        }
        else if(FocusAraToplam == true)
        {
            $window.document.getElementById("TxtAraToplamTutar").focus();
        }
        else if(FocusMusteri == true)
        {
            $window.document.getElementById("TxtCariAra").focus();
            if(e.which == 13)
            {
                $scope.BtnCariGridGetir();
            }
        }
        else if(FocusStok == true)
        {
            $window.document.getElementById("TxtStokAra").focus();
        }
        else if(FocusMiktarGuncelle)
        {
            $window.document.getElementById("TxtMiktarGuncelle").focus();
        }
        else if(FocusFiyatGuncelle)
        {
            $window.document.getElementById("TxtFiyatGuncelle").focus();
        }
        else if(FocusSonTahGuncelle)
        {
            $window.document.getElementById("TxtSonTahGuncelle").focus();
        }
        else if(FocusKartOdeme == true)
        {
            $window.document.getElementById("TxtKartOdemeTutar").focus();
        }
        else if(FocusSadakatIndirim)
        {
            $window.document.getElementById("TxtSadakatIndirim").focus();
        }
    }    
    $scope.IslemListeRowClick = function(pIndex,pItem)
    {
        if ( IslemSelectedRow ) { IslemSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = $("#TblIslem").jsGrid("rowByItem", pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        IslemSelectedRow = $row;
        $scope.IslemListeSelectedIndex = pIndex;
    }
    $scope.TahIslemListeRowClick = function(pIndex,pItem)
    {
        if ( TahIslemSelectedRow ) { TahIslemSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = $("#TblTahIslem").jsGrid("rowByItem", pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        TahIslemSelectedRow = $row;
        $scope.TahIslemListeSelectedIndex = pIndex;
    }
    $scope.ParkIslemListeRowClick = function(pIndex,pItem)
    {
        if ( ParkIslemSelectedRow ) { ParkIslemSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = $("#TblParkIslem").jsGrid("rowByItem", pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        ParkIslemSelectedRow = $row;
        $scope.ParkIslemListeSelectedIndex = pIndex;
    }
    $scope.CariListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( CariSelectedRow ) { CariSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        CariSelectedRow = $row;
        
        $scope.CariKodu = $scope.CariListe[pIndex].CODE;
        $scope.CariAdi = $scope.CariListe[pIndex].NAME;
        $scope.CariPuan = $scope.CariListe[pIndex].POINT;
    }
    $scope.StokListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( StokSelectedRow ) { StokSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        StokSelectedRow = $row;

        $scope.TxtBarkod = $scope.StokListe[pIndex].CODE;
    }
    $scope.BarkodListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( BarkodSelectedRow ) { BarkodSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        BarkodSelectedRow = $row;
        $scope.TxtBarkod = $scope.BarkodListe[pIndex].BARCODE;
        $scope.StokGetir($scope.TxtBarkod);
        $("#MdlBarkodListele").modal("hide");
    }
    $scope.SonSatisRowClick = function(pIndex,pItem,pObj)
    {
        if ( SonSatisSelectedRow ) { SonSatisSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = $("#TblSonSatis").jsGrid("rowByItem", pItem);
        
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        SonSatisSelectedRow = $row;
        $scope.SonSatisListeSelectedIndex = pIndex;

        let SonSatisDetay = pItem;
        
        db.GetData($scope.Firma,'PosSonSatisDetayGetir',[$scope.Sube,SonSatisDetay.REF,SonSatisDetay.REF_NO],function(PosSonSatisDetay)
        {  
            $scope.SonSatisDetayList = PosSonSatisDetay;
            $("#TblSonSatisDetay").jsGrid({data : $scope.SonSatisDetayList});
        });
        db.GetData($scope.Firma,'PosSonSatisTahDetayGetir',[$scope.Sube,SonSatisDetay.REF,SonSatisDetay.REF_NO],function(PosSonSatisTahDetay)
        {  
            $scope.SonSatisTahDetayList = PosSonSatisTahDetay;
            $("#TblSonSatisTahDetay").jsGrid({data : $scope.SonSatisTahDetayList});
        });
    }
    $scope.YeniEvrak = async function()
    {
        db.Connection(async function(data)
        {
            db.On("SerialBarcode",function(data)
            {
                $scope.TxtBarkod = data.result.substring(1,data.result.length).toString().trim();
                TxtBarkodKeyPress();
            })

            Init();
            InitIslemGrid();
            InitParkIslemGrid();
            InitTahIslemGrid();
            InitCariGrid();
            InitStokGrid();
            InitBarkodGrid();
            InitSonSatisGrid();
            InitSonSatisDetayGrid();
            InitSonSatisTahDetayGrid();
            InitTRDetayGrid();

            $scope.Seri = UserParam.PosSatis.Seri;
            $scope.TahSeri = UserParam.PosSatis.TahSeri;
            $scope.EvrakTip = UserParam.PosSatis.EvrakTip;
            $scope.CariKodu = UserParam.PosSatis.Cari;
            $scope.Sube = UserParam.PosSatis.Sube;
            $scope.Kullanici = UserParam.Kullanici
            $scope.Miktar = 1;

            $scope.Stok = 
            [
                {
                    BIRIM : '',
                    BIRIMPNTR : 0, 
                    FIYAT : 0,
                    TUTAR : 0,
                    INDIRIM : 0,
                    KDV : 0,
                    TOPTUTAR :0
                }
            ];
            // CARI GETIR
            if($scope.CariKodu != "")
            {
                db.GetData($scope.Firma,'PosCariGetir',[$scope.CariKodu,''],function(data)
                {
                    if(data.length > 0)
                    {
                        $scope.CariListe = data;
                    
                        $("#TblCari").jsGrid({data : $scope.CariListe});
        
                        let Obj = $("#TblCari").data("JSGrid");
                        let Item = Obj.rowByItem(data[0]);
                        
                        $scope.CariListeRowClick(0,Item,Obj);
                    }
                });
            }
            //PLU GRUP GETİR
            db.GetData($scope.Firma,'PosPluGetir',[$scope.Kullanici,-1,-1,0],function(PluGrpData)
            {
                $scope.PluGrpList = PluGrpData;
                if($scope.PluGrpList.length > 0)
                {
                    $scope.PluGrupIndex = PluGrpData[0].GRUP_INDEX
                    db.GetData($scope.Firma,'PosPluGetir',[$scope.Kullanici,-1,$scope.PluGrpList[0].GRUP_INDEX,'1,2'],function(PluGrpData)
                    {   
                        $scope.PluList = PluGrpData
                    });
                }
            });
            //PARKTAKİ ISLEMLER
            db.GetData($scope.Firma,'PosSatisParkListe',[$scope.Sube,$scope.EvrakTip,$scope.Kullanici,0],function(ParkData)
            {   
                $scope.ParkList = ParkData;
                $scope.ParkIslemSayisi = $scope.ParkList.length;
                $("#TblParkIslem").jsGrid({data : $scope.ParkList}); 
            });
            
            await db.MaxSira($scope.Firma,'MaxPosSatisSira',[$scope.Sube,$scope.Seri,$scope.EvrakTip],function(data){$scope.Sira = data});
            await db.MaxSira($scope.Firma,'MaxPosTahSira',[$scope.Sube,$scope.TahSeri,0],function(data){$scope.TahSira = data});
        });
        
    }
    $scope.BtnCariGridGetir = function()
    {
        db.GetData($scope.Firma,'PosCariListeGetir',[$scope.TxtCariAra],function(data)
        {
            $scope.CariListe = data;   
            $("#TblCari").jsGrid({data : $scope.CariListe});
        });
    }
    $scope.BtnCariGridSec = function()
    {   
        $("#MdlMusteriListele").modal('hide');
        $scope.TxtCariAra = "";
        if($scope.SatisList.length > 0)
        {   
            //CARİ UPDATE
            var TmpQuery = 
            {
                db : $scope.Firma,
                query:  "UPDATE POS_SALES SET CUSTOMER_CODE = @CUSTOMER_CODE WHERE REF = @REF AND REF_NO = @REF_NO AND DEPARTMENT = @DEPARTMENT",
                param:  ['CUSTOMER_CODE','REF','REF_NO','DEPARTMENT'],
                type:   ['string|25','string|25','int','int'],
                value:  [$scope.CariKodu,$scope.Seri,$scope.Sira,$scope.Sube]
            }
            db.ExecuteQuery(TmpQuery);
        }

        if($scope.CariKodu != UserParam.PosSatis.Cari && $scope.SatisList.length > 0)
        {
            if($scope.TxtAraToplamTutar.length > 0)
            {   
                $('#MdlMusteriListele').modal('hide');
                //$scope.BtnAraToplam();
            }
        }
    }
    $scope.BtnStokGridGetir = function()
    {
        let Kodu = '';
        let Adi = '';

        if($scope.CmbStokAra == "0")
        {
            Adi = $scope.TxtStokAra + "%";
        }
        else
        {
            Kodu = $scope.TxtStokAra + "%";
        }
        db.GetData($scope.Firma,'StokGetir',[Kodu,Adi],function(StokData)
        {
            $scope.StokListe = StokData;
            $("#TblStok").jsGrid({data : $scope.StokListe});
        });

    }
    $scope.BtnStokGridSec = function()
    {
        $scope.StokGetir($scope.TxtBarkod);
        $("#MdlStokListele").modal('hide');
    }    
    $scope.StokGetir = async function(pBarkod)
    {
        if(pBarkod != '')
        {   
            //EĞER CARİ SEÇ BUTONUNA BASILDIYSA CARİ BARKODDAN SEÇİLECEK.
            if($scope.Class.BtnCariBarSec == "form-group btn btn-danger btn-block my-1")
            {
                let TmpCari = await db.GetPromiseTag($scope.Firma,'PosCariGetir',[pBarkod,'']);
                if(TmpCari.length > 0)
                {
                    $scope.CariKodu = TmpCari[0].CODE;
                    $scope.CariAdi = TmpCari[0].NAME;  
                    $scope.CariPuan = TmpCari[0].POINT;    
                    
                    //CARİ UPDATE
                    var TmpQuery = 
                    {
                        db : $scope.Firma,
                        query:  "UPDATE POS_SALES SET CUSTOMER_CODE = @CUSTOMER_CODE WHERE REF = @REF AND REF_NO = @REF_NO AND DEPARTMENT = @DEPARTMENT",
                        param:  ['CUSTOMER_CODE','REF','REF_NO','DEPARTMENT'],
                        type:   ['string|25','string|25','int','int'],
                        value:  [$scope.CariKodu,$scope.Seri,$scope.Sira,$scope.Sube]
                    }
                    db.ExecuteQuery(TmpQuery);
                }
                else
                {
                    alertify.alert("Müşteri bulunamadı !");
                }                

                $scope.TxtBarkod = ""; 
                $scope.Class.BtnCariBarSec = "form-group btn btn-info btn-block my-1" 
                return;
            }
            $scope.Miktar = 1;

            if(pBarkod.indexOf("*") != -1)
            {
                $scope.Miktar = pBarkod.split("*")[0];
                pBarkod = pBarkod.split("*")[1];
            }
            //TICKET RESTORANT İÇİN YAPILDI
            if(pBarkod.length >= 16)
            {
                let TmpTicket = pBarkod.substring(11,16)
                let TmpYear = pBarkod.substring(pBarkod.length - 1, pBarkod.length);
                
                if(moment(new Date()).format("M") > 1 && moment(new Date()).format("Y").toString().substring(3,4) != TmpYear)
                {
                    alertify.alert("Geçersiz ticket.");
                    $scope.TxtBarkod = "";
                    return;
                }
                
                db.GetData($scope.Firma,'TicketControl',[pBarkod],function(data)
                {
                    if(data.length <= 0)
                    {
                        $scope.TahTip = 3;
                        $scope.TxtAraToplamTutar = parseFloat(TmpTicket / 100).toFixed(2);

                        db.ExecuteTag($scope.Firma,'TicketInsert',[UserParam.Kullanici,UserParam.Kullanici,pBarkod,$scope.TxtAraToplamTutar,$scope.Seri,$scope.Sira],function(InsertResult)
                        {
                            $scope.PosTahInsert(function()
                            {   
                                DipToplamHesapla();
                                $scope.TahTip = 0;
                            });
                        })
                    }
                    else
                    {
                        alertify.alert("Bu Ticket Daha Önce Okutulmuş!. ");
                    }

                });

                $scope.TxtBarkod = "";
                return;
            }
            //***************************** */
            let TmpFiyat = 0;

            if(pBarkod.length >= 12 && pBarkod.length <= 14 && (pBarkod.substring(0,2) == "20" || pBarkod.substring(0,2) == "02"))
            {
                TmpFiyat = parseFloat((parseFloat(pBarkod.substring(6,pBarkod.length)) / 1000) * 0.1524).toFixed(2);
                pBarkod = pBarkod.substring(0,6) + "MMMCCF";
            }

            db.StokBarkodGetir($scope.Firma,pBarkod,function(BarkodData)
            {
                if(BarkodData.length > 0)
                {                     
                    if(BarkodData[0].PRICE == 0)
                    {
                        alertify.alert("Ürünün fiyat bilgisi tanımsız !");
                        $scope.TxtBarkod = "";
                        return;
                    }

                    $scope.Stok = BarkodData;
                    
                    if(TmpFiyat > 0 )
                    {
                        $scope.Stok[0].PRICE = TmpFiyat;
                    }
                    
                    //EĞER BİLGİ BUTONUNA BASILDIYSA FİYAT GÖR EKRANI ÇIKACAK.
                    if($scope.Class.BtnFiyatGor == "form-group btn btn-warning btn-block my-1")
                    {
                        $scope.TxtBarkod = ""; 
                        $scope.Class.BtnFiyatGor = "form-group btn btn-info btn-block my-1"
                        $('#MdlFiyatGor').modal('show');
                        return;
                    }

                    if(BarkodData[0].WEIGHING == true)
                    {
                        $("#MdlTeraziYukleniyor").modal("show");
                        db.ScaleSend($scope.Stok[0].PRICE,(pResult) =>
                        {
                            if(pResult.Type == "02")
                            {
                                setTimeout(()=> {$("#MdlTeraziYukleniyor").modal("hide");},500); 
                                $scope.Miktar = pResult.Result.Scale;
                                $scope.PosSatisInsert();
                            }
                        });
                    }
                    else
                    {
                        $scope.PosSatisInsert();
                    }
                }
                else   
                {
                    alertify.alert("Okuttuğunuz Barkod Sistemde Bulunamadı.");
                    $scope.TxtBarkod = "";
                }
            });
        } 
    }
    $scope.BtnPluClick = function(pBarkod)
    {   
        //$scope.Yukleniyor = true  
        $scope.TxtBarkod = pBarkod;
        $scope.StokGetir($scope.TxtBarkod);
    }
    $scope.PosSatisInsert = function()
    {    
        //SATIR BİRLEŞTİRME İŞLEMİ
        let TmpSatirBirlestir = SatirBirlestir("SATIS");
        if(TmpSatirBirlestir.Status)
        {
            $scope.PosSatisMiktarUpdate($scope.SatisList[TmpSatirBirlestir.Index],$scope.SatisList[TmpSatirBirlestir.Index].QUANTITY + ($scope.Miktar * $scope.Stok[0].FACTOR))
            return;
        }
        
        var InsertData = 
        [
            UserParam.Kullanici,
            UserParam.Kullanici,
            $scope.Sube,
            $scope.EvrakTip,
            $scope.Tarih,
            $scope.Seri,
            $scope.Sira,
            $scope.CariKodu,
            $scope.Stok[0].CODE,
            $scope.Stok[0].BARCODE,
            $scope.Miktar * $scope.Stok[0].FACTOR,
            $scope.Stok[0].UNIT,
            $scope.Stok[0].PRICE = parseFloat($scope.Stok[0].PRICE).toFixed(2),
            0, //ISKONTO TUTAR 1
            $scope.CariKullanPuan / 100, //SADAKAT TUTAR 1
            $scope.Stok[0].VAT,
            0  //DURUM
        ];
        
        db.ExecuteTag($scope.Firma,'PosSatisInsert',InsertData,async function(InsertResult)
        {               
            if(typeof(InsertResult.result.err) == 'undefined')
            {   
                //*********** BİRDEN FAZLA MİKTARLI FİYAT GÜNCELLEME İÇİN YAPILDI. */
                // let TmpSatisData = await db.GetPromiseTag($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira]);
                // $scope.SatisList = TmpSatisData;

                // for (let i = 0; i < $scope.SatisList.length; i++) 
                // {               
                //     await FiyatUpdate($scope.SatisList[i]);
                // }  
                /***************************************************************** */
                db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisData)
                {   
                    db.LCDPrint
                    (
                        {
                            blink : 0,
                            text :  db.PrintText(PosSatisData[PosSatisData.length - 1].ITEM_NAME,11) + " " + 
                                    db.PrintText(parseFloat(PosSatisData[PosSatisData.length - 1].PRICE).toFixed(2).toString() + "EUR" ,8,"Start") +
                                    "TOTAL : " + db.PrintText(parseFloat(db.SumColumn(PosSatisData,"AMOUNT")).toFixed(2).toString() + "EUR",12,"Start")
                        }                        
                    );

                    InsertSonYenile(PosSatisData);      
                    $scope.TxtBarkod = ""; 
                    $scope.IslemListeRowClick(0,$scope.SatisList[0]);
                    $scope.ToplamMiktar = db.SumColumn($scope.SatisList,"QUANTITY"); 
                    $scope.ToplamSatir =  $scope.SatisList.length  
                });
            }
            else
            {
                console.log(InsertResult.result.err);
            }
        });
        db.GetData($scope.Firma,'PosFisSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosFisData)
        {   
            InsertFisYenile(PosFisData);   
        });
    }
    $scope.PosTahInsert = async function(pCallBack)
    {   
        let TahTutar = 0
        let TahParaUstu = 0;
      
        $scope.TahSeri = $scope.Seri;
        $scope.TahSira = $scope.Sira;

        if(parseFloat($scope.TxtAraToplamTutar.replace(',','.')) <= 0 || parseFloat($scope.TahKalan) <= 0)
        {
            if(typeof(pCallBack) != 'undefined')
            {
                pCallBack();
            }
            return;
        }
        
        TahTutar = parseFloat($scope.TxtAraToplamTutar.replace(',','.'));
        if($scope.GenelToplam < (db.SumColumn($scope.TahList,"AMOUNT") + parseFloat($scope.TxtAraToplamTutar.replace(',','.'))))
        {
            TahParaUstu = parseFloat((db.SumColumn($scope.TahList,"AMOUNT") + parseFloat($scope.TxtAraToplamTutar.replace(',','.'))) - $scope.GenelToplam).toFixed(2);
            TahTutar = parseFloat(parseFloat($scope.TxtAraToplamTutar.replace(',','.')) - TahParaUstu).toFixed(2);
        }
                
        if($scope.TxtAraToplamTutar.replace(',','.') > 0)
        {
            let Result;            
            //SATIR BİRLEŞTİRME İŞLEMİ
            let TmpSatirBirlestir = SatirBirlestir("TAHSILAT");
            if(TmpSatirBirlestir.Status)
            {                
                let UpdateData =
                [
                    parseFloat($scope.TahList[TmpSatirBirlestir.Index].AMOUNT) + parseFloat(TahTutar),
                    TahParaUstu,
                    $scope.TahList[TmpSatirBirlestir.Index].GUID
                ];

                Result = await db.ExecutePromiseTag($scope.Firma,'PosTahTutarUpdate',UpdateData);
            }
            else
            {
                let InsertData = 
                [
                    UserParam.Kullanici,
                    UserParam.Kullanici,
                    $scope.Sube,
                    $scope.TahTip,
                    0, //EVRAKTIP
                    $scope.Tarih,
                    $scope.TahSeri,
                    $scope.TahSira,
                    $scope.CariKodu,
                    $scope.Kasa,
                    TahTutar,
                    TahParaUstu,
                    1
                ];
                Result = await db.ExecutePromiseTag($scope.Firma,'PosTahInsert',InsertData);
            }

            if(typeof(Result.result.err) == 'undefined')
            {
                db.GetData($scope.Firma,'PosTahGetir',[$scope.Sube,0,$scope.TahSeri,$scope.TahSira],function(PosTahData)
                {   
                    db.LCDPrint
                    (
                        {
                            blink : 0,
                            text :  db.PrintText(PosTahData[PosTahData.length - 1].TYPE_NAME,9) + " " + 
                                    db.PrintText(parseFloat(PosTahData[PosTahData.length - 1].AMOUNT).toFixed(2).toString() + "EUR" ,10,"Start") +
                                    "Rendu : " + db.PrintText(parseFloat(db.SumColumn(PosTahData,"CHANGE")).toFixed(2).toString() + "EUR",12,"Start")
                        }                        
                    );
                    $scope.TahList = PosTahData;
                    TahSonYenile();                           
                    SatisKapat();                   
                    $scope.TahPanelKontrol = false;                        
                    
                    if(typeof(pCallBack) != 'undefined')
                    {
                        pCallBack();
                    }
                });
            }
            else
            {
                if(typeof(pCallBack) != 'undefined')
                {
                    pCallBack();
                }
            }
        }
    
        localStorage.KasaKodu = $scope.Kasa
    }
    $scope.PosSatisMiktarUpdate = function(pData,pMiktar)
    {   
        pData.QUANTITY = pMiktar;

        db.GetData($scope.Firma,'PosSatisMiktarUpdate',[pMiktar,pData.GUID],async function(data)
        {    
            //*********** BİRDEN FAZLA MİKTARLI FİYAT GÜNCELLEME İÇİN YAPILDI. */      
            // for (let i = 0; i < $scope.SatisList.length; i++) 
            // {               
            //     await FiyatUpdate($scope.SatisList[i]);
            // }
            //**************************************************************** */
            db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisData)
            {  
                InsertSonYenile(PosSatisData);
                $scope.IslemListeSelectedIndex = 0;  
                $scope.IslemListeRowClick($scope.IslemListeSelectedIndex,$scope.SatisList[$scope.IslemListeSelectedIndex]);
                $scope.ToplamMiktar = db.SumColumn($scope.SatisList,"QUANTITY")
                $scope.ToplamSatir =  $scope.SatisList.length    
                
                db.GetData($scope.Firma,'PosFisSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisFisData)
                {  
                    InsertFisYenile(PosSatisFisData);   
                }); 

                db.LCDPrint
                (
                    {
                        blink : 0,
                        text :  db.PrintText(PosSatisData[PosSatisData.length - 1].ITEM_NAME,11) + " " + 
                                db.PrintText(parseFloat(PosSatisData[PosSatisData.length - 1].PRICE).toFixed(2).toString() + "EUR" ,8,"Start") +
                                "TOTAL : " + db.PrintText(parseFloat(db.SumColumn(PosSatisData,"AMOUNT")).toFixed(2).toString() + "EUR",12,"Start")
                    }                        
                );
            });          
        });
    }
    $scope.PosSatisFiyatUpdate = function(pData,pPrice)
    {   
        pData.PRICE = pPrice;

        db.GetData($scope.Firma,'PosSatisFiyatUpdate',[pPrice,pData.GUID],async function(data)
        {    
            db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisData)
            {  
                InsertSonYenile(PosSatisData);
                $scope.IslemListeSelectedIndex = 0;  
                $scope.IslemListeRowClick($scope.IslemListeSelectedIndex,$scope.SatisList[$scope.IslemListeSelectedIndex]);
                $scope.ToplamMiktar = db.SumColumn($scope.SatisList,"QUANTITY")
                $scope.ToplamSatir =  $scope.SatisList.length    
                
                db.GetData($scope.Firma,'PosFisSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisFisData)
                {  
                    InsertFisYenile(PosSatisFisData);   
                }); 

                db.LCDPrint
                (
                    {
                        blink : 0,
                        text :  db.PrintText(PosSatisData[PosSatisData.length - 1].ITEM_NAME,11) + " " + 
                                db.PrintText(parseFloat(PosSatisData[PosSatisData.length - 1].PRICE).toFixed(2).toString() + "EUR" ,8,"Start") +
                                "TOTAL : " + db.PrintText(parseFloat(db.SumColumn(PosSatisData,"AMOUNT")).toFixed(2).toString() + "EUR",12,"Start")
                    }                        
                );
            });          
        });
    }
    $scope.TxtBarkodPress = function(keyEvent)
    {    
        if($scope.TxtBarkod != "")
        {
            if(keyEvent.which === 13)
            {   
                TxtBarkodKeyPress();
            }
        }
    }
    $scope.TxtTahTutarPress = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.PosTahInsert();   
        }
    }
    $scope.TxtMiktarGuncellePress = function(keyEvent)
    {
        if($scope.TxtMiktarGuncelle != "" && $scope.TxtMiktarGuncelle > 0)
        {
            if(typeof keyEvent == 'undefined')
            {
                $scope.PosSatisMiktarUpdate($scope.SatisList[$scope.IslemListeSelectedIndex],$scope.TxtMiktarGuncelle);
                $("#MdlMiktarGuncelle").modal("hide");
            }
            else
            {
                if(keyEvent.which === 13)
                {
                    $scope.PosSatisMiktarUpdate($scope.SatisList[$scope.IslemListeSelectedIndex],$scope.TxtMiktarGuncelle);
                    $("#MdlMiktarGuncelle").modal("hide");
                }
            }
        }
        
    }
    $scope.TxtFiyatGuncellePress = function(keyEvent)
    {
        if($scope.TxtFiyatGuncelle != "" && $scope.TxtFiyatGuncelle > 0)
        {
            if(typeof keyEvent == 'undefined')
            {
                $scope.PosSatisFiyatUpdate($scope.SatisList[$scope.IslemListeSelectedIndex],$scope.TxtFiyatGuncelle);
                $("#MdlFiyatGuncelle").modal("hide");
            }
            else
            {
                if(keyEvent.which === 13)
                {
                    $scope.PosSatisFiyatUpdate($scope.SatisList[$scope.IslemListeSelectedIndex],$scope.TxtFiyatGuncelle);
                    $("#MdlFiyatGuncelle").modal("hide");
                }
            }
        }
        
    }
    $scope.BtnSilClick = function()
    {   
        if(FocusBarkod)
        {
            $scope.TxtBarkod = $scope.TxtBarkod.toString().substring(0,$scope.TxtBarkod.length-1);
        }
        else if(FocusAraToplam)
        {
            $scope.TxtAraToplamTutar = $scope.TxtAraToplamTutar.toString().substring(0,$scope.TxtAraToplamTutar.length-1);
        }
        else if(FocusMusteri)
        {
            $scope.TxtCariAra = $scope.TxtCariAra.toString().substring(0,$scope.TxtCariAra.length-1);
        }
        else if(FocusStok)
        {
            $scope.TxtStokAra = $scope.TxtStokAra.toString().substring(0,$scope.TxtStokAra.length-1);
        }
        else if(FocusMiktarGuncelle)
        {
            $scope.TxtMiktarGuncelle = $scope.TxtMiktarGuncelle.toString().substring(0,$scope.TxtMiktarGuncelle.length-1); 
        }
        else if(FocusFiyatGuncelle)
        {
            $scope.TxtFiyatGuncelle = $scope.TxtFiyatGuncelle.toString().substring(0,$scope.TxtFiyatGuncelle.length-1); 
        }
        else if(FocusSonTahGuncelle)
        {
            $scope.TxtSonTahGuncelle = $scope.TxtSonTahGuncelle.toString().substring(0,$scope.TxtSonTahGuncelle.length-1); 
        }
        else if(FocusKartOdeme)
        {
            $scope.TxtAraToplamTutar = $scope.TxtAraToplamTutar.toString().substring(0,$scope.TxtAraToplamTutar.length-1);
        }
        else if(FocusSadakatIndirim)
        {
            $scope.TxtSadakatIndirim = $scope.TxtSadakatIndirim.toString().substring(0,$scope.TxtSadakatIndirim.length-1); 
        }
    }
    $scope.BtnOnayClick = function()
    {
        TxtBarkodKeyPress();
        $scope.TxtBarkod = "";
    }
    $scope.BtnTusClick = function(Key)
    {   
        if(FocusBarkod)
        {            
            $scope.TxtBarkod = $scope.TxtBarkod + Key; 
        }
        else if(FocusAraToplam)
        {
            if(FirstKey)
            {
                $scope.TxtAraToplamTutar = $scope.TxtAraToplamTutar + Key; 
            }
            else
            {
                $scope.TxtAraToplamTutar = Key; 
                FirstKey = true;
            }
        }
        else if(FocusMusteri)
        {
            $scope.TxtCariAra = $scope.TxtCariAra + Key; 
        }
        else if(FocusStok)
        {
            $scope.TxtStokAra = $scope.TxtStokAra + Key; 
        }
        else if(FocusMiktarGuncelle)
        {
            if(FirstKey)
            {
                $scope.TxtMiktarGuncelle = $scope.TxtMiktarGuncelle + Key; 
            }
            else
            {
                $scope.TxtMiktarGuncelle = Key; 
                FirstKey = true;
            }
        }
        else if(FocusFiyatGuncelle)
        {
            if(FirstKey)
            {
                $scope.TxtFiyatGuncelle = $scope.TxtFiyatGuncelle + Key; 
            }
            else
            {
                $scope.TxtFiyatGuncelle = Key; 
                FirstKey = true;
            }
        }
        else if(FocusSonTahGuncelle)
        {
            if(FirstKey)
            {
                $scope.TxtSonTahGuncelle = $scope.TxtSonTahGuncelle + Key; 
            }
            else
            {
                $scope.TxtSonTahGuncelle = Key; 
                FirstKey = true;
            }
        }
        else if(FocusKartOdeme)
        {
            if(FirstKey)
            {
                $scope.TxtAraToplamTutar = $scope.TxtAraToplamTutar + Key; 
            }
            else
            {
                $scope.TxtAraToplamTutar = Key; 
                FirstKey = true;
            }
        }
        else if(FocusSadakatIndirim)
        {
            if(FirstKey)
            {
                $scope.TxtSadakatIndirim = $scope.TxtSadakatIndirim + Key; 
            }
            else
            {
                $scope.TxtSadakatIndirim = Key; 
                FirstKey = true;
            }
        }
    }
    $scope.TxtSeriSira = function(Data)
    {
        $scope.SeriSira = Data;
    }
    $scope.BtnUpClick = function()
    {
        if($scope.SatisList.length > 0)
        {
            if($scope.IslemListeSelectedIndex == 0)
                $scope.IslemListeSelectedIndex = 0;
            else
                $scope.IslemListeSelectedIndex -= 1;

            $scope.IslemListeRowClick($scope.IslemListeSelectedIndex,$scope.SatisList[$scope.IslemListeSelectedIndex]);

            $("#TblIslem").find( ".jsgrid-grid-body").scrollTop(IslemSelectedRow.position().top)
        }
    }
    $scope.BtnDownClick = function()
    {
        if($scope.SatisList.length > 0)
        {
            if($scope.SatisList.length - 1 <= $scope.IslemListeSelectedIndex)
            $scope.IslemListeSelectedIndex = $scope.SatisList.length - 1;
            else
                $scope.IslemListeSelectedIndex += 1;

            $scope.IslemListeRowClick($scope.IslemListeSelectedIndex,$scope.SatisList[$scope.IslemListeSelectedIndex]);
            $("#TblIslem").find( ".jsgrid-grid-body").scrollTop(IslemSelectedRow.position().top)
        }
    }
    $scope.BtnBelgeIptal = function()
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Evrağı iptal etmek istediğinize eminmisiniz ?', 
        function()
        { 
            if($scope.SatisList.length > 0)
            {
                db.ExecuteTag($scope.Firma,'PosSatisBelgeIptal',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                {
                    if(typeof(data.result.err) == 'undefined')
                    {
                        db.ExecuteTag($scope.Firma,'PosTahIptal',[$scope.Seri,$scope.Sira,0],function(data)
                        {
                            if(typeof(data.result.err) != 'undefined')
                            {
                                console.log(data.result.err);
                            }
                        });

                        $scope.YeniEvrak();
                    }
                    else
                    {
                        console.log(data.result.err);
                    }
                });
            }
            else
            {
                alertify.okBtn("Tamam");
                alertify.alert("Kayıtlı evrak olmadan evrak'ı iptal edemezsiniz !");
            }
        }
        ,function(){});
    }
    $scope.BtnSatirIptal = function()
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Satırı iptal etmek istediğinize eminmisiniz ?', 
        function()
        {   
            if($scope.IslemListeSelectedIndex > -1)
            {
                db.ExecuteTag($scope.Firma,'PosSatisSatirIptal',[$scope.SatisList[$scope.IslemListeSelectedIndex].GUID],async function(data)
                {
                    if(typeof(data.result.err) == 'undefined')
                    {
                        if($scope.SatisList.length <= 1)
                        {
                            db.ExecuteTag($scope.Firma,'PosTahIptal',[$scope.Seri,$scope.Sira,0],function(data)
                            {
                                if(typeof(data.result.err) != 'undefined')
                                {
                                    console.log(data.result.err);
                                }
                            });
                            
                            $scope.YeniEvrak();
                        }
                        else
                        {
                            //*********** BİRDEN FAZLA MİKTARLI FİYAT GÜNCELLEME İÇİN YAPILDI. */
                            // let TmpSatisData = await db.GetPromiseTag($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira]);
                            // $scope.SatisList = TmpSatisData;

                            // for (let i = 0; i < $scope.SatisList.length; i++) 
                            // {               
                            //     await FiyatUpdate($scope.SatisList[i]);
                            // }  
                            /***************************************************************** */
                            db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(data)
                            {
                                $scope.SatisList = data;
                                $("#TblIslem").jsGrid({data : $scope.SatisList});                                    
                                DipToplamHesapla();
                                $scope.TxtBarkod = ""; 
                                $scope.IslemListeRowClick($scope.SatisList.length-1,$scope.SatisList[$scope.SatisList.length-1]);   

                                db.LCDPrint
                                (
                                    {
                                        blink : 0,
                                        text :  db.PrintText(" ",11) + " " + 
                                                db.PrintText(" " ,8,"Start") +
                                                "TOTAL : " + db.PrintText(parseFloat(db.SumColumn($scope.SatisList,"AMOUNT")).toFixed(2).toString() + "EUR",12,"Start")
                                    }                        
                                );
                            });
                        }
                    }
                    else
                    {
                        console.log(data.result.err);
                    }                                        
                });
            }
            else
            {
                alertify.okBtn("Tamam");
                alertify.alert("Seçili satır olmadan evrak iptal edemezsiniz !");
            }
        },
        function(){});
    }
    $scope.BtnParkdakiIslem = function()
    {
        $('#MdlParkIslemler').modal('show');
    }
    $scope.BtnParkaAl = function()
    {
        $scope.YeniEvrak();
    }
    $scope.BtnParkSec = function()
    {
        $scope.Seri = $scope.ParkList[$scope.ParkIslemListeSelectedIndex].REF;
        $scope.Sira = $scope.ParkList[$scope.ParkIslemListeSelectedIndex].REF_NO;

        db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisData)
        {   
            db.GetData($scope.Firma,'PosCariGetir',[PosSatisData[0].CUSTOMER_CODE,''],function(data)
            {
                $scope.CariAdi = data[0].NAME;
                $scope.CariKodu = data[0].CODE;
                $scope.CariPuan = data[0].POINT;  
            });

            InsertSonYenile(PosSatisData);
            $scope.TxtBarkod = ""; 
            $scope.IslemListeRowClick($scope.SatisList.length-1,$scope.SatisList[$scope.SatisList.length-1]);                  

            $('#MdlParkIslemler').modal('hide');

            db.GetData($scope.Firma,'PosTahGetir',[$scope.Sube,0,$scope.Seri,$scope.Sira],function(PosTahData)
            {
                $scope.TahList = PosTahData;
                TahSonYenile(); 
            });

            db.LCDPrint
            (
                {
                    blink : 0,
                    text :  db.PrintText(PosSatisData[PosSatisData.length - 1].ITEM_NAME,11) + " " + 
                            db.PrintText(parseFloat(PosSatisData[PosSatisData.length - 1].PRICE).toFixed(2).toString() + "EUR" ,8,"Start") +
                            "TOTAL : " + db.PrintText(parseFloat(db.SumColumn(PosSatisData,"AMOUNT")).toFixed(2).toString() + "EUR",12,"Start")
                }                        
            );

            $scope.ToplamMiktar = db.SumColumn($scope.SatisList,"QUANTITY");
            $scope.ToplamSatir =  $scope.SatisList.length
        });
    }
    $scope.BtnAraToplam = function()
    {   
        if($scope.SatisList.length < 1)
        {
            alertify.okBtn("Tamam");
            alertify.alert("Satış işlemi yapmadan tahsilat giremezsiniz !");
            return;
        }
        
        $("#MdlAraToplam").modal("show");
        FocusAraToplam = true;
        FocusBarkod = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusKartOdeme = false;

        FirstKey = false;

        //EKRANA GİRDİĞİNDE OTOMATİK NAKİT SEÇİLİ GELSİN
        if($scope.TahTip != 2)
        {
            TahTip = 0;
            angular.element('#ChkNakit').trigger('click');
        }
        TahSonYenile();
    }
    $scope.BtnMusteriListesi = function()
    {
        $("#MdlMusteriListele").modal("show");
        FocusAraToplam = false;
        FocusBarkod = false;
        FocusMusteri = true;
        FocusStok = false;
        FocusKartOdeme = false;
    }
    $scope.BtnStokListesi = function()
    {
        $("#MdlStokListele").modal("show");
        FocusAraToplam = false;
        FocusBarkod = false;
        FocusMusteri = false;
        FocusStok = true;
        FocusKartOdeme = false;

        setTimeout(function()
        {
            document.getElementById('TxtStokAra').focus()
            document.getElementById('TxtStokAra').setSelectionRange(0, document.getElementById('TxtStokAra').value.length)
        },500);
    }
    $scope.BtnBarkodListesi = function()
    {
        if($scope.TxtBarkod != '')
        {
            let TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT [BARCODE] AS BARCODE,ISNULL((SELECT NAME FROM ITEMS WHERE CODE = [ITEM_CODE]),'') NAME,dbo.FN_PRICE_SALE(ITEM_CODE,1,GETDATE()) AS PRICE FROM [dbo].[ITEM_BARCODE] WHERE BARCODE LIKE '%' + @BARCODE",
                param : ["BARCODE:string|50"],
                value : [$scope.TxtBarkod]
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                $scope.BarkodListe = Data;
                if(Data.length == 1)
                {
                    $scope.TxtBarkod = $scope.BarkodListe[0].BARCODE;
                    $scope.StokGetir($scope.TxtBarkod);
                }
                else if(Data.length > 1)
                {
                    $("#TblBarkod").jsGrid({data : $scope.BarkodListe});
                    $("#MdlBarkodListele").modal("show");
                }
            });
        }
    }
    $scope.BtnTahSatirIptal = function()
    {
        if($scope.TahIslemListeSelectedIndex > -1)
        {
            db.ExecuteTag($scope.Firma,'PosTahSatirIptal',[$scope.TahList[$scope.TahIslemListeSelectedIndex].GUID],function(data)
            {
                if(typeof(data.result.err) == 'undefined')
                {
                    db.GetData($scope.Firma,'PosTahGetir',[$scope.Sube,0,$scope.TahSeri,$scope.TahSira],function(data)
                    {
                        $scope.TahList = data;
                        TahSonYenile();
                    });
                 
                }
                else
                {
                    console.log(data.result.err);
                }                                        
            });
        }
    }
    $scope.BtnTahBelgeIptal = function()
    {   
        if($scope.SatisList.length > 0)
        {
            db.ExecuteTag($scope.Firma,'PosTahIptal',[$scope.TahSeri,$scope.TahSira,0],function(data)
            {
                if(typeof(data.result.err) == 'undefined')
                {
                    $scope.TahList = [];
                    TahSonYenile();
                    $("#MdlAraToplam").modal('hide');
                }
                else
                {
                    console.log(data.result.err);
                }
            });
        }
    }
    $scope.BtnIadeAl = function(pTip)
    {
        if(pTip == 0)
        {
            $('#MdlIadeTip').modal('show');
        }
        else
        {    
            $('#MdlIadeTip').modal('hide'); 
            alertify.okBtn('Evet');
            alertify.cancelBtn('Hayır');

            alertify.confirm('Iade almak istediğinize eminmisiniz ?', 
            function()
            { 
                if($scope.SatisList.length > 0)
                {
                    let IadeTip = "";
                    //POS SATIS UPDATE
                    var TmpQuery = 
                    {
                        db : $scope.Firma,
                        query:  "UPDATE POS_SALES SET TYPE = 2,STATUS = 1 WHERE DEPARTMENT = @DEPARTMENT AND TYPE = @TYPE AND REF = @REF AND REF_NO = @REF_NO",
                        param:  ['DEPARTMENT','TYPE','REF','REF_NO'],
                        type:   ['int','int','string|25','int'],
                        value:  [$scope.Sube,1,$scope.Seri,$scope.Sira]
                    }

                    if($scope.CmbIadeTip == "0")
                    {
                        IadeTip = 0; //Nakit
                    }
                    else
                    {
                        IadeTip = 1; //Kredi Kartı
                    }
                    db.ExecuteQuery(TmpQuery,function(UpdateResult)
                    {
                        if(typeof(UpdateResult.result.err) == 'undefined')
                        {                       
                            var InsertData = 
                            [
                                UserParam.Kullanici,
                                UserParam.Kullanici,
                                $scope.Sube,
                                IadeTip, //TIP
                                1, //EVRAKTIP
                                $scope.Tarih,
                                $scope.Seri,
                                $scope.Sira,
                                $scope.CariKodu,
                                UserParam.PosSatis.NakitKasaKodu,
                                $scope.GenelToplam,
                                0, //PARA USTU
                                1
                            ];
                
                            db.ExecuteTag($scope.Firma,'PosTahInsert',InsertData,function(InsertResult)
                            {
                                if(typeof(InsertResult.result.err) == 'undefined')
                                {                       
                                    $scope.YeniEvrak();
                                    $scope.TxtBarkod = "";
                                }
                                else
                                {
                                    console.log(InsertResult.result.err);
                                }
                            });    
                        }
                        else
                        {
                            console.log(UpdateResult.result.err);
                        }
                    });
                }
                else
                {
                    alertify.okBtn("Tamam");
                    alertify.alert("Kayıtlı evrak olmadan iade alamazsınız !");
                }
            }
            ,function(){});
       }
    }
    $scope.BtnKullaniciDegistir = function()
    {   
        alertify.confirm("Kullanıcı değiştirmek istediğinize eminmisiniz ?",

        function(){
            alertify.okBtn('Evet');
            var url = "index.html";
            $window.location.href = url;
        },
        function(){
            alertify.cancelBtn('Vazgeç');
        });
    }
    $scope.BtnSonSatis = function()
    {   
        $("#TbSonSatisListesi").addClass('active');
        $("#TbMain").removeClass('active');

        db.GetData($scope.Firma,'PosSonSatisGetir',[$scope.Sube],function(PosSonSatis)
        {  
            $scope.SonSatisList = PosSonSatis;
            $("#TblSonSatis").jsGrid({data : $scope.SonSatisList});
            $scope.TxtBarkod = "";
        });
    }
    $scope.BtnIskonto = function(pIskonto)
    {   
        let tutar = $scope.SatisList[$scope.IslemListeSelectedIndex].PRICE * $scope.SatisList[$scope.IslemListeSelectedIndex].QUANTITY;
        let hesapla = tutar * (pIskonto.replace(',','.') / 100);

        if($scope.GenelToplam < hesapla)
        {   
            alertify.alert("Genel Toplamdan Fazla İskonto Yapılamaz.!");
            $scope.TxtBarkod = "";
        }
        else
        {
            db.ExecuteTag($scope.Firma,'PosSatisIskonto',[hesapla,$scope.SatisList[$scope.IslemListeSelectedIndex].GUID],function(pData)
            {   
                db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisData)
                {   
                    db.GetData($scope.Firma,'PosFisSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisFisData)
                    {  
                        InsertFisYenile(PosSatisFisData);   
                    }); 
                    InsertSonYenile(PosSatisData);      
                    $scope.IslemListeRowClick($scope.IslemListeSelectedIndex,$scope.SatisList[$scope.IslemListeSelectedIndex]);  
                    $scope.ToplamMiktar = db.SumColumn($scope.SatisList,"QUANTITY")
                    $scope.ToplamSatir =  $scope.SatisList.length
                });
            });
        }
    }
    $scope.StokListeleEvent = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.BtnStokGridGetir()
        }
    }
    $scope.BtnTahTip = function(pTip)
    {   
        $scope.TahTip = pTip;
  
        if($scope.TahTip == 0)
        {
            $scope.Kasa = UserParam.PosSatis.NakitKasaKodu;
            $scope.KasaSecim = false;
        }
    }
    $scope.BtnKlavye = function()
    {
        $scope.Klavye = true;
    }
    $scope.BtnCikti = function(pTip)
    {
        $scope.CiktiTip = pTip;
    }
    $scope.BtnMiktarGuncelle = function()
    {
        $("#MdlMiktarGuncelle").modal("show");
        $scope.TxtMiktarGuncelle = $scope.SatisList[$scope.IslemListeSelectedIndex].QUANTITY.toString();

        FocusMiktarGuncelle = true;
        FocusAraToplam = false;
        FocusBarkod = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusKartOdeme = false;
        FocusFiyatGuncelle = false;
        FocusSonTahGuncelle = false;
        FocusSadakatIndirim = false;
        
        FirstKey = false;
    }
    $scope.BtnFiyatGuncelle = function()
    {
        $("#MdlFiyatGuncelle").modal("show");
        $scope.TxtFiyatGuncelle = $scope.SatisList[$scope.IslemListeSelectedIndex].PRICE.toString();

        FocusFiyatGuncelle = true;
        FocusAraToplam = false;
        FocusBarkod = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusKartOdeme = false;
        FocusMiktarGuncelle = false;
        FocusSonTahGuncelle = false;
        FocusSadakatIndirim = false;

        FirstKey = false;
    }
    $scope.BtnKasaAc = function()
    {
        db.EscposCaseOpen();
    }
    $scope.BtnKartOdeme = function()
    {                
        if($scope.SatisList.length < 1)
        {
            alertify.okBtn("Tamam");
            alertify.alert("Satış işlemi yapmadan tahsilat giremezsiniz !");
            return;
        }

        $("#MdlKartOdeme").modal("show");

        FocusBarkod = false;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusKartOdeme = true;

        FirstKey = false;

        TahSonYenile();
    }
    $scope.BtnKartOdemeGonder = function()
    {
        $scope.TahTip = 1;

        $("#MdlKartOdeme").modal("hide");
        $("#MdlKartYukleniyor").modal("show");        

        db.PaymentSend($scope.TxtAraToplamTutar);        
    }    
    $scope.BtnKartVazgec = function()
    {
        $("#MdlKartYukleniyor").modal("hide");
    } 
    $scope.BtnKartZorla = function()
    {
        $scope.TahTip = 1;

        $("#MdlKartYukleniyor").modal("hide");
        $scope.PosTahInsert();
    }   
    $scope.BtnTahOnay = function()
    {
        if($scope.TahTip == 0)
        {
            $scope.PosTahInsert();
        }
        else if($scope.TahTip == 1)
        {
            $('#MdlAraToplam').modal('hide');
            $scope.BtnKartOdemeGonder();
        }
        else if($scope.TahTip == 2)
        {
            $scope.PosTahInsert();
        }
        else if($scope.TahTip == 3)
        {
            $scope.PosTahInsert();
        }
    }
    $scope.BtnPara = function(pTutar)
    {
        if($scope.TahTip == 0)
        {
            $scope.TxtAraToplamTutar = pTutar;
            $scope.PosTahInsert();
        }
    }
    $scope.BtnArti = function()
    {
        $scope.PosSatisMiktarUpdate($scope.SatisList[$scope.IslemListeSelectedIndex],$scope.SatisList[$scope.IslemListeSelectedIndex].QUANTITY + 1);
    } 
    $scope.BtnEksi = function()
    {
        if($scope.SatisList[$scope.IslemListeSelectedIndex].QUANTITY == 1)
        {
            alertify.alert("Miktar 1 den küçük olamaz.")
            return;
        }
        $scope.PosSatisMiktarUpdate($scope.SatisList[$scope.IslemListeSelectedIndex],$scope.SatisList[$scope.IslemListeSelectedIndex].QUANTITY -1);
    } 
    $scope.BtnHesapMakinesi = function()
    {
        $("#MdlHesapMakinesi").modal('show');
        
        // if(typeof require == 'undefined')
        // {
        //     return;
        // }
        // const exec = require('child_process').exec;

        // exec("calc", (error, stdout, stderr) => { 
        //     console.log(stdout); 
        // });
    }
    $scope.BtnFiyatGor = function()
    {
        if($scope.Class.BtnFiyatGor == "form-group btn btn-info btn-block my-1")
            $scope.Class.BtnFiyatGor = "form-group btn btn-warning btn-block my-1"
        else
            $scope.Class.BtnFiyatGor = "form-group btn btn-info btn-block my-1"
    }
    $scope.BtnFisYazdir = function()
    {
        let TmpSeri = $scope.SonSatisList[$scope.SonSatisListeSelectedIndex].REF;
        let TmpSira = $scope.SonSatisList[$scope.SonSatisListeSelectedIndex].REF_NO;

        db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,TmpSeri,TmpSira],function(PosSatisData)
        {   
            db.GetData($scope.Firma,'PosTahGetir',[$scope.Sube,0,TmpSeri,TmpSira],function(PosTahData)
            {
                let TmpQuery = 
                {
                    db : $scope.Firma,
                    query:  "SELECT " + 
                            "CASE WHEN VAT = 20 THEN 'B' WHEN VAT = 5.5 THEN 'C' END AS VAT_TYPE, " + 
                            "VAT AS VAT, " +  
                            "(SUM(QUANTITY) * SUM(PRICE)) - (((SUM(QUANTITY) * SUM(PRICE)) / 100) * VAT) AS HT, " + 
                            "((SUM(QUANTITY) * SUM(PRICE)) / 100) * VAT AS TVA, " +
                            "ROUND(SUM(QUANTITY) * SUM(PRICE),4) AS TTC, " +
                            "ISNULL((SELECT COUNT(REF) AS TICKET FROM (SELECT REF FROM POS_SALES " + 
                            "WHERE DOC_DATE >= CONVERT(NVARCHAR(10),GETDATE(),112) " + 
                            "AND DOC_DATE <= CONVERT(NVARCHAR(10),GETDATE(),112) " + 
                            "AND DEPARTMENT = @DEPARTMENT " + 
                            "AND STATUS = 1 " + 
                            "GROUP BY REF,REF_NO) AS TMP),1) AS TICKET " + 
                            "FROM POS_SALES AS POS " +
                            "WHERE DEPARTMENT = @DEPARTMENT AND TYPE = @TYPE AND REF = @REF AND REF_NO = @REF_NO " +
                            "GROUP BY VAT",
                    param:  ['DEPARTMENT','TYPE','REF','REF_NO'],
                    type:   ['int','int','string|25','int'],
                    value:  [$scope.Sube,$scope.EvrakTip,TmpSeri,TmpSira]
                }
                db.GetDataQuery(TmpQuery,function(pData)
                {
                    db.EscposPrint(PosSatisData,PosTahData,pData,function()
                    {
                        
                    });
                });
            });
        });
    }
    $scope.BtnTeraziVazgec = function()
    {
        $("#MdlTeraziYukleniyor").modal('hide');
        $scope.TxtBarkod = "";
    }
    $scope.BtnEdit = function()
    {
        if($scope.Class.BtnEdit == "icon wb-lock")
        {
            alertify.alert("Dikkat Plu Düzenleme Aktifleştirildi.");
            $scope.Class.BtnEdit = "icon wb-unlock"
        }
        else
        {
            alertify.alert("Dikkat Plu Düzenleme Devre Dışı Bırakıldı.");
            $scope.Class.BtnEdit = "icon wb-lock"
        }
    }
    $scope.PluGetir = async function(pIndex,pType)
    {
        if($scope.Class.BtnEdit == "icon wb-unlock")
        {
            if(pType == 1 || typeof pType == 'undefined')
            {
                $scope.DivPlu = true;
            }
                    
            $scope.PluIndex = pIndex;
            FocusBarkod = false;
            FocusAraToplam = false;
            FocusMusteri = false;
            FocusStok = false;
            FocusMiktarGuncelle = false;
            FocusFiyatGuncelle = false;
            FocusSonTahGuncelle = false;
            FocusKartOdeme = false;
            FocusYetkiliSifre = false;
            FocusAvans = false;    
            FocusSadakatIndirim = false;

            $("#MdlPluEdit").modal("show");
        }
        else
        {
            if(pType == 0)
            {
                db.GetData($scope.Firma,'PosPluGetir',[$scope.Kullanici,-1,pIndex,pType],function(PluData)
                {
                    $scope.PluGrupIndex = PluData[0].GRUP_INDEX;
                    if(PluData.length > 0)
                    {
                        db.GetData($scope.Firma,'PosPluGetir',[$scope.Kullanici,-1,PluData[0].GRUP_INDEX,'1,2'],function(PluData)
                        {
                            $scope.PluList = PluData;
                        });
                    }
                });
            }
            else if (pType == 1)
            {
                $scope.TxtBarkod = $scope.PluList.find(x => x.LOCATION == pIndex).ITEMS_CODE;
                $scope.StokGetir($scope.TxtBarkod);
            }
            else if(pType == 2)
            {
                db.GetData($scope.Firma,'PosPluStokGrupGetir',[$scope.PluList.find(x => x.LOCATION == pIndex).ITEMS_CODE],function(PluData)
                {
                    $scope.PluStokGrupStartIndex = 0
                    $scope.PluStokGrupEndIndex = 60
                    $scope.PluStokGrupList = PluData
                    $scope.PagePluStokGrupList = $scope.PluStokGrupList.slice($scope.PluStokGrupStartIndex,$scope.PluStokGrupEndIndex);
                    

                    $("#TbPluStokGrup").addClass('active');
                    $("#TbMain").removeClass('active');
                });
            }
        }
    }
    $scope.BtnPluKaydet = async function()
    {
        if($scope.DivPlu) //GRUP INSERT Mİ PLU İNSERT Mİ İŞLEMİNİ BURADAN ANLIYORUZ.
        {
            let PluData = await db.GetPromiseTag($scope.Firma,'PosPluGetir',[$scope.Kullanici,$scope.PluIndex,$scope.PluGrupIndex,1])
            
            if(PluData.length == 0)
            {
                let TmpType = 1;
                if($scope.PluStokGrup == true)
                {
                    TmpType = 2;
                }

                let InsertData = 
                [
                    $scope.Kullanici,
                    $scope.Kullanici,
                    $scope.Tarih,
                    $scope.Tarih,
                    $scope.PluGrupAdi,
                    $scope.PluIndex,
                    TmpType, //TYPE
                    $scope.PluStokKod,//ITEMS CODE
                    $scope.PluGrupIndex  //GRUPINDEX
                ]
    
                db.ExecuteTag($scope.Firma,'PosPluInsert',InsertData,function(InsertResult)
                {
                    if(typeof(InsertResult.result.err) == 'undefined')
                    {   
                        alert("Kayıt İşlemi Başarıyla Gerçekleşti.")
                        $("#MdlPluEdit").modal("hide");
                        $scope.PluGrupAdi = "";
                        $scope.PluIndex = "";
                        $scope.PluStokKod = "";
                        $scope.YeniEvrak();
                    }
                    else
                    {
                        console.log(InsertResult.result.err);
                    }
                });
            }
            else
            {
                db.ExecuteTag($scope.Firma,'PosPluUpdate',[$scope.PluGrupAdi,$scope.PluStokKod,1,$scope.PluIndex,PluData[0].GRUP_INDEX],function(InsertResult)
                {
                    if(typeof(InsertResult.result.err) == 'undefined')
                    {   
                        alert("Güncelleme İşlemi Başarıyla Gerçekleşti.")
                        $("#MdlPluEdit").modal("hide");
                        $scope.PluGrupAdi = "";
                        $scope.PluIndex = "";
                        $scope.PluStokKod = "";
                        $scope.YeniEvrak();
                    }
                    else
                    {
                        console.log(InsertResult.result.err);
                    }
                });
            }
        }
        else
        {            
            let PluData = await db.GetPromiseTag($scope.Firma,'PosPluGetir',[$scope.Kullanici,-1,$scope.PluIndex,0])
            if(PluData.length == 0)
            {                
                let InsertData = 
                [
                    $scope.Kullanici,
                    $scope.Kullanici,
                    $scope.Tarih,
                    $scope.Tarih,
                    $scope.PluGrupAdi,
                    $scope.PluIndex,
                    0, //TYPE
                    '',//ITEMS CODE
                    $scope.PluIndex  //GRUPINDEX
                ]
    
                db.ExecuteTag($scope.Firma,'PosPluInsert',InsertData,function(InsertResult)
                {
                    if(typeof(InsertResult.result.err) == 'undefined')
                    {   
                        alert("Kayıt İşlemi Başarıyla Gerçekleşti.")
                        $("#MdlPluEdit").modal("hide");
                        $scope.PluGrupAdi = "";
                        $scope.PluIndex = "";
                        $scope.YeniEvrak();
                    }
                    else
                    {
                        console.log(InsertResult.result.err);
                    }
                });
            }
            else
            {
                db.ExecuteTag($scope.Firma,'PosPluGrupUpdate',[$scope.PluGrupAdi,'',$scope.PluIndex,0,$scope.PluIndex],function(InsertResult)
                {
                    if(typeof(InsertResult.result.err) == 'undefined')
                    {   
                        alert("Güncelleme İşlemi Başarıyla Gerçekleşti.")
                        $("#MdlPluEdit").modal("hide");
                        $scope.PluGrupAdi = "";
                        $scope.PluIndex = "";
                        $scope.YeniEvrak();
                    }
                    else
                    {
                        console.log(InsertResult.result.err);
                    }
                });
            }
        }
    }
    $scope.BtnPluStokGrupNext = function()
    {   
        if($scope.PluStokGrupEndIndex + 60 > $scope.PluStokGrupList.length)
        {
            $scope.PluStokGrupEndIndex = $scope.PluStokGrupList.length;
            $scope.PagePluStokGrupList = $scope.PluStokGrupList.slice($scope.PluStokGrupStartIndex + 60,$scope.PluStokGrupEndIndex);
        }
        else if($scope.PluStokGrupEndIndex + 60 <= $scope.PluStokGrupList.length)
        {
            $scope.PluStokGrupStartIndex += 60
            $scope.PluStokGrupEndIndex = $scope.PluStokGrupStartIndex + 60;
            $scope.PagePluStokGrupList = $scope.PluStokGrupList.slice($scope.PluStokGrupStartIndex,$scope.PluStokGrupEndIndex);
        }
        
    }
    $scope.BtnPluStokGrupLast = function()
    {
        if($scope.PluStokGrupStartIndex - 60 >= 0)
        {
            $scope.PluStokGrupStartIndex -= 60
            $scope.PluStokGrupEndIndex = $scope.PluStokGrupStartIndex + 60;
            $scope.PagePluStokGrupList = $scope.PluStokGrupList.slice($scope.PluStokGrupStartIndex,$scope.PluStokGrupEndIndex);
        }
    }
    $scope.PluStokGrupGetir = function(pBarkod)
    {
        $("#TbMain").addClass('active');
        $("#TbPluStokGrup").removeClass('active');
        
        $scope.TxtBarkod = pBarkod;
        $scope.StokGetir($scope.TxtBarkod);
    }
    $scope.BtnCariBarSec = function()
    {
        if($scope.Class.BtnCariBarSec == "form-group btn btn-info btn-block my-1")
            $scope.Class.BtnCariBarSec = "form-group btn btn-danger btn-block my-1"
        else
            $scope.Class.BtnCariBarSec = "form-group btn btn-info btn-block my-1"
    }
    $scope.BtnTRDetay = function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT AMOUNT AS AMOUNT,COUNT(AMOUNT) AS COUNT FROM TICKET WHERE REF = @REF AND REF_NO = @REF_NO GROUP BY AMOUNT",
            param : ["REF:string|25",'REF_NO:int'],
            value : [$scope.Seri,$scope.Sira]
        }
        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.TRDetayListe = Data;
            if(Data.length > 0)
            {
                $("#TblTRDetay").jsGrid({data : $scope.TRDetayListe});
                $('#MdlAraToplam').modal('hide');
                $('#MdlTRDetay').modal('show');
            }
        });
    }
    $scope.BtnSonTahTip = function(pTip)
    {
        $scope.SonSatisTahDetayList[SonTahIndex].AMOUNT = parseFloat($scope.TxtSonTahGuncelle);
        $scope.SonSatisTahDetayList[SonTahIndex].TYPENO = pTip;

        if(pTip == 0)
        {
            $scope.SonSatisTahDetayList[SonTahIndex].TYPE = 'ESC';
        }
        else if(pTip == 1)
        {
            $scope.SonSatisTahDetayList[SonTahIndex].TYPE = 'CB';
        }
        else if(pTip == 2)
        {
            $scope.SonSatisTahDetayList[SonTahIndex].TYPE = 'CHQ';
        }

        $("#TblSonSatisTahDetay").jsGrid({data : $scope.SonSatisTahDetayList});
        $('#MdlSonSatisTahGuncelle').modal('hide');
    }
    $scope.BtnSonTahKaydet = function()
    {
        if(db.SumColumn($scope.SonSatisTahDetayList,"AMOUNT") == $scope.SonSatisList[$scope.SonSatisListeSelectedIndex].AMOUNT)
        {
            for (let i = 0; i < $scope.SonSatisTahDetayList.length; i++) 
            {
                let TmpQuery = 
                {
                    db : $scope.Firma,
                    query:  "UPDATE POS_PAYMENT SET AMOUNT = @AMOUNT,TYPE = @TYPE WHERE GUID = @GUID",
                    param:  ['AMOUNT','TYPE','GUID'],
                    type:   ['float','int','string|50'],
                    value:  [$scope.SonSatisTahDetayList[i].AMOUNT,$scope.SonSatisTahDetayList[i].TYPENO,$scope.SonSatisTahDetayList[i].GUID]
                }
                db.ExecuteQuery(TmpQuery,function(){});
            }
        }
        else
        {
            db.GetData($scope.Firma,'PosSonSatisTahDetayGetir',[$scope.Sube,$scope.SonSatisList[$scope.SonSatisListeSelectedIndex].REF,$scope.SonSatisList[$scope.SonSatisListeSelectedIndex].REF_NO],function(PosSonSatisTahDetay)
            {  
                $scope.SonSatisTahDetayList = PosSonSatisTahDetay;
                $("#TblSonSatisTahDetay").jsGrid({data : $scope.SonSatisTahDetayList});
            });
            alertify.alert("Girilen tutar hatalıdır !")
        }
    }
    $scope.BtnCariDegistir = function()
    {
        if($scope.CariKodu != 'C001')
        {
            alertify.okBtn('Evet');
            alertify.cancelBtn('Hayır');

            alertify.confirm('Müşteriden çıkış yapmak istiyormusunuz ?', () => 
            {
                $scope.CariKodu = 'C001'
                $scope.CariAdi = ''
                $scope.CariPuan = 0;  
                //CARİ UPDATE
                var TmpQuery = 
                {
                    db : $scope.Firma,
                    query:  "UPDATE POS_SALES SET CUSTOMER_CODE = @CUSTOMER_CODE WHERE REF = @REF AND REF_NO = @REF_NO AND DEPARTMENT = @DEPARTMENT",
                    param:  ['CUSTOMER_CODE','REF','REF_NO','DEPARTMENT'],
                    type:   ['string|25','string|25','int','int'],
                    value:  [$scope.CariKodu,$scope.Seri,$scope.Sira,$scope.Sube]
                }
                db.ExecuteQuery(TmpQuery);
            },() => {});
            
        }
    }
    $scope.BtnSadakatIndirim = function()
    {            
        if($scope.SatisList.length == 0)
        {
            alertify.alert("Satış yapmadan puan kullanamazsınız !");
            return;
        }
        if($scope.CariPuan == 0)
        {
            alertify.alert("Kullanılacak puan yok !");
            return;
        }

        $('#MdlSadakatIndirim').modal('show');

        $scope.TxtSadakatIndirim = $scope.CariPuan - $scope.CariKullanPuan;
        
        FirstKey = false;
        FocusSadakatIndirim = true;
        FocusAraToplam = false;
        FocusBarkod = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusKartOdeme = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusSonTahGuncelle = false;     
        
    }
    $scope.BtnSadakatIndirimOnay = function()
    {
        let TmpPuanTutar = $scope.TxtSadakatIndirim / 100;
        if($scope.TxtSadakatIndirim > ($scope.CariPuan - $scope.CariKullanPuan))
        {
            FirstKey = false;
            alertify.alert("Girdiğiniz puan mevcut puandan fazla olamaz !");
            return;
        }
        if(TmpPuanTutar > $scope.GenelToplam)
        {
            FirstKey = false;
            alertify.alert("Girdiğiniz puan satış tutarından fazla olamaz !");
            return;
        }

        db.ExecuteTag($scope.Firma,'PosSatisSadakat',[TmpPuanTutar,$scope.Seri,$scope.Sira],function(pData)
        {  
            $('#MdlSadakatIndirim').modal('hide');
            $scope.CariKullanPuan = $scope.TxtSadakatIndirim;

            db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisData)
            {   
                db.GetData($scope.Firma,'PosFisSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisFisData)
                {  
                    InsertFisYenile(PosSatisFisData);   
                }); 

                InsertSonYenile(PosSatisData);      
                $scope.IslemListeRowClick($scope.IslemListeSelectedIndex,$scope.SatisList[$scope.IslemListeSelectedIndex]);  
                $scope.ToplamMiktar = db.SumColumn($scope.SatisList,"QUANTITY")
                $scope.ToplamSatir =  $scope.SatisList.length
            });
        });        
    }
    $scope.BtnSadakatIndirimTemizle = function()
    {
        db.ExecuteTag($scope.Firma,'PosSatisSadakat',[0,$scope.Seri,$scope.Sira],function(pData)
        {  
            $scope.CariKullanPuan = 0;
            
            db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisData)
            {   
                db.GetData($scope.Firma,'PosFisSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisFisData)
                {  
                    InsertFisYenile(PosSatisFisData);   
                }); 

                InsertSonYenile(PosSatisData);      
                $scope.IslemListeRowClick($scope.IslemListeSelectedIndex,$scope.SatisList[$scope.IslemListeSelectedIndex]);  
                $scope.ToplamMiktar = db.SumColumn($scope.SatisList,"QUANTITY")
                $scope.ToplamSatir =  $scope.SatisList.length
            });
        });        
    }
}