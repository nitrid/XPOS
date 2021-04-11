function Pos($scope,$window,$rootScope,db)
{
    let IslemSelectedRow = null;
    let CariSelectedRow = null;
    let StokSelectedRow = null;
    let StokGrupSelectedRow = null;
    let BarkodSelectedRow = null;
    let ParkIslemSelectedRow = null;
    let TahIslemSelectedRow = null;
    let SonSatisSelectedRow = null;
    let SonSatisTahDetaySelectedRow = null;
    let FocusBarkod = true;
    let FocusAraToplam = false;
    let FocusMusteri = false;
    let FocusStok = false;
    let FocusStokGrup = false;
    let FocusMiktarGuncelle = false;
    let FocusFiyatGuncelle = false;
    let FocusKartOdeme = false;
    let FocusSonTahGuncelle = false;
    let FocusSadakatIndirim = false;
    let FocusIskontoYuzde = false;
    let FocusIskontoTutar = false;    
    let FocusAvans = false;
    let FocusPluKodu = false;
    let FocusPluAdi = false;
    let FocusTeraziFiyat = false;
    let FocusRepasMiktar = false;
    let FocusTicketBarkod = false;
    let FirstKey = false;
    let SonTahIndex = 0;
    let CariParam = "";
    let IskontoTip = "";
    let UrunListeTip = "StokAra";
    let PluTip = 0;
    
    $scope.ModalMsg = {};
    
    $('#MdlAraToplam').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusStokGrup = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusKartOdeme = false;
        FocusSonTahGuncelle = false;
        FocusSadakatIndirim = false;
        FocusIskontoYuzde = false;
        FocusIskontoTutar = false;
        FocusAvans = false;
        FocusPluKodu = false;
        FocusPluAdi = false;
    });
    $('#MdlNakitOdeme').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusStokGrup = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusKartOdeme = false;
        FocusSonTahGuncelle = false;
        FocusSadakatIndirim = false;
        FocusIskontoYuzde = false;
        FocusIskontoTutar = false;
        FocusAvans = false;
        FocusPluKodu = false;
        FocusPluAdi = false;
    });
    $('#MdlMusteriListele').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusStokGrup = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusKartOdeme = false;
        FocusSonTahGuncelle = false;
        FocusSadakatIndirim = false;
        FocusIskontoYuzde = false;
        FocusIskontoTutar = false;
        FocusPluKodu = false;
        FocusPluAdi = false;
    });
    $('#MdlStokListele').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false
        FocusStok = false;
        FocusStokGrup = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusSonTahGuncelle = false;
        FocusSadakatIndirim = false;
        FocusIskontoYuzde = false;
        FocusIskontoTutar = false;
        FocusAvans = false;
        FocusKartOdeme = false;
    });
    $('#MdlStokGrupListele').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false
        FocusStok = false;
        FocusStokGrup = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusSonTahGuncelle = false;
        FocusSadakatIndirim = false;
        FocusIskontoYuzde = false;
        FocusIskontoTutar = false;
        FocusAvans = false;

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
        FocusStokGrup = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusSonTahGuncelle = false;
        FocusKartOdeme = false;
        FocusSadakatIndirim = false;
        FocusIskontoYuzde = false;
        FocusIskontoTutar = false;
        FocusAvans = false;
        FocusPluKodu = false;
        FocusPluAdi = false;
    });
    $('#MdlMiktarGuncelle').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusStokGrup = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusSonTahGuncelle = false;
        FocusKartOdeme = false;
        FocusSadakatIndirim = false;
        FocusIskontoYuzde = false;
        FocusIskontoTutar = false;
        FocusAvans = false;
        FocusPluKodu = false;
        FocusPluAdi = false;
    });
    $('#MdlFiyatGuncelle').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusStokGrup = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusSonTahGuncelle = false;
        FocusKartOdeme = false;
        FocusSadakatIndirim = false;
        FocusIskontoYuzde = false;
        FocusIskontoTutar = false;
        FocusAvans = false;
        FocusPluKodu = false;
        FocusPluAdi = false;
    });
    $('#MdlKartOdeme').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusStokGrup = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusSonTahGuncelle = false;
        FocusKartOdeme = false;
        FocusSadakatIndirim = false;
        FocusAvans = false;
        FocusPluKodu = false;
        FocusPluAdi = false;
    });
    $('#MdlParaUstu').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusStokGrup = false;
        FocusMiktarGuncelle = false;
        FocusKartOdeme = false;
        FocusSadakatIndirim = false;
        FocusAvans = false;
        FocusPluKodu = false;
        FocusPluAdi = false;
    });
    $('#MdlPluEdit').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;        
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusStokGrup = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusKartOdeme = false;
        FocusSonTahGuncelle = false;
        FocusSadakatIndirim = false;
        FocusAvans = false;
        FocusPluKodu = false;
        FocusPluAdi = false;

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
        FocusStokGrup = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusKartOdeme = false;
        FocusSonTahGuncelle = false;
        FocusSadakatIndirim = false;
        FocusIskontoYuzde = false;
        FocusIskontoTutar = false;
        FocusAvans = false;
        FocusPluKodu = false;
        FocusPluAdi = false;
    });
    $('#MdlIskonto').on('hide.bs.modal', function () 
    {        
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusStokGrup = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusKartOdeme = false;
        FocusSonTahGuncelle = false;
        FocusSadakatIndirim = false;
        FocusIskontoYuzde = false;
        FocusIskontoTutar = false;
        FocusAvans = false;
        FocusPluKodu = false;
        FocusPluAdi = false;
    });
    $('#MdlAvans').on('hide.bs.modal', function () 
    {        
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusStokGrup = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusKartOdeme = false;
        FocusSonTahGuncelle = false;
        FocusSadakatIndirim = false;
        FocusIskontoYuzde = false;
        FocusIskontoTutar = false;
        FocusAvans = false;
        FocusPluKodu = false;
        FocusPluAdi = false;
    });
    $('#MdlTeraziFiyat').on('hide.bs.modal', function () 
    {        
        FocusBarkod = true;
        FocusTeraziFiyat = false;
    });
    $('#MdlRepasGiris').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusStokGrup = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusSonTahGuncelle = false;
        FocusKartOdeme = false;
        FocusSadakatIndirim = false;
        FocusIskontoYuzde = false;
        FocusIskontoTutar = false;
        FocusAvans = false;
        FocusPluKodu = false;
        FocusPluAdi = false;
        FocusRepasMiktar = false;
    });
    $('#MdlTicketPay').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusStokGrup = false;
        FocusMiktarGuncelle = false;
        FocusFiyatGuncelle = false;
        FocusSonTahGuncelle = false;
        FocusKartOdeme = false;
        FocusSadakatIndirim = false;
        FocusIskontoYuzde = false;
        FocusIskontoTutar = false;
        FocusAvans = false;
        FocusPluKodu = false;
        FocusPluAdi = false;
        FocusRepasMiktar = false;
        FocusTicketBarkod = false;
    });
    if(typeof require != 'undefined')
    {
        //BURAYA TEKRAR BAKILACAK (CALLBACK DESTROY)
        db.CardPayment.On("PaymentEvent",function(pData)
        {
            if(pData.tag == "response")
            {
                console.log(pData)
                if(JSON.parse(pData.msg).transaction_result != 0)
                {
                    $("#MdlKartYukleniyor").modal("hide"); 
                    alertify.confirm(db.Language($scope.Lang,'Ödeme gerçekleşmedi'), function()
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
                            $("#MdlKalanOdeme").modal("show");
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
                port : $scope.ComPorts.EkranPort,
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
        $scope.Kullanici = $window.sessionStorage.getItem('User');
        $scope.CihazID = $window.localStorage.getItem('device');
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
        $scope.PluGrupIndex = "";
        $scope.PluStokKod = "";
        $scope.PluIndex = 0;          
        $scope.TxtMiktarGuncelle = 0;
        $scope.TxtFiyatGuncelle = 0;
        $scope.TxtSonTahGuncelle = 0;
        $scope.TxtSadakatIndirim = 0;
        $scope.TxtIskontoYuzde = 0;
        $scope.TxtIskontoTutar = 0;
        $scope.TxtIskontoSatisOnce = 0;
        $scope.TxtIskontoSatisSonra = 0;
        $scope.TxtTeraziFiyat = 0;
        $scope.TxtAvans = 0;
        $scope.AvansTip = 2;
        $scope.SonTahDetayKalan = 0;
        $scope.SonSatisIlkTarih = new Date().toLocaleDateString('fr-FR',{ year: 'numeric', month: 'numeric', day: 'numeric' });
        $scope.SonSatisSonTarih = new Date().toLocaleDateString('fr-FR',{ year: 'numeric', month: 'numeric', day: 'numeric' });
        $scope.SonSatisOdemeTip = "-1"
        $scope.ToplamTicket = 0;
        $scope.SonTicket = 0;
        $scope.TxtRepasMiktar = 0;
        $scope.TxtTicketBarkod = "";
        $scope.TicketSonTutar = 0;
        $scope.TicketTopTutar = 0;

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
        $scope.TxtCariAra = "";
        $scope.TxtStokAra = "";
        $scope.TxtStokGrupAra = "";

        $scope.CariListe = [];
        $scope.StokListe = [];
        $scope.StokGrupListe = [];
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
        $scope.TicketPayListe = [];
        
        $scope.ComPorts = {EkranPort : "",OdemePort:"",TeraziPort:""};

        setInterval(()=>
        {
            db.SafeApply($scope,function()
            {
                $scope.Tarih = new Date().toLocaleDateString('tr-TR',{ year: 'numeric', month: 'numeric', day: 'numeric' });
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
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 6,
            pagerContainer: "#externalPager",
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
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
                    type: "decimal",
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
    function InitStokGrupGrid()
    {
        $("#TblStokGrup").jsGrid
        ({
            width: "100%",
            height: "300px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokGrupListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
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
                }
            ],
            rowClick: function(args)
            {
                $scope.StokGrupListeRowClick(args.itemIndex,args.item,this);
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
                    type: "decimal",
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
                title: db.Language($scope.Lang,"NO"),
                type: "text",
                align: "center",
                width: 30
            },
            {
                name: "ITEM_NAME",
                title: db.Language($scope.Lang,"ADI"),
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
                title: db.Language($scope.Lang,"MIKTAR"),
                type: "decimal",
                align: "center",
                width: 60
            },         
            {
                name: "PRICE",
                title: db.Language($scope.Lang,"FIYAT"),
                type: "decimal",
                align: "center",
                width: 60
            },
            {
                name: "CAMOUNT",
                title: db.Language($scope.Lang,"TUTAR"),
                type: "decimal",
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
                title: db.Language($scope.Lang,"TIP"),
                type: "number",
                align: "center",
                width: 60
            }, 
            {
                name: "AMOUNT",
                title: db.Language($scope.Lang,"TUTAR"),
                type: "decimal",
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
                title: db.Language($scope.Lang,"KULLANICI"),
                type: "text",
                align: "center",
                width: 75
            },
            {
                name: "DATE",
                title: db.Language($scope.Lang,"TARIH"),
                type: "number",
                align: "center",
                width: 75
            },
            {
                name: "REF",
                title: db.Language($scope.Lang,"SERI"),
                type: "text",
                align: "center",
                width: 50
            }, 
            {
                name: "REF_NO",
                title: db.Language($scope.Lang,"SIRA"),
                type: "text",
                align: "center",
                width: 50
            },
            {
                name: "AMOUNT",
                title: db.Language($scope.Lang,"TUTAR"),
                type: "decimal",
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
                title: db.Language($scope.Lang,"TARIH"),
                type: "date",
                align: "center",
                width: 50
            },
            {
                name: "CHOUR",
                title: db.Language($scope.Lang,"SAAT"),
                type: "date",
                align: "center",
                width: 50
            },
            {
                name: "REF",
                title: db.Language($scope.Lang,"SERI"),
                type: "TEXT",
                align: "center",
                width: 35
            },
            {
                name: "REF_NO",
                title: db.Language($scope.Lang,"SIRA"),
                type: "number",
                align: "center",
                width: 35
            },
            {
                name: "LINE_NO",
                title: db.Language($scope.Lang,"SATIR"),
                type: "number",
                align: "center",
                width: 30
            },
            {
                name: "CUSTOMER_CODE",
                title: db.Language($scope.Lang,"MÜŞTERİ"),
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "USER",
                title: db.Language($scope.Lang,"KULLANICI"),
                type: "TEXT",
                align: "center",
                width: 50
            },
            {
                name: "DISCOUNT",
                title: db.Language($scope.Lang,"INDIRIM"),
                type: "decimal",
                align: "center",
                width: 50
            },
            {
                name: "LOYALTY_AMOUNT",
                title: db.Language($scope.Lang,"SADAKAT"),
                type: "decimal",
                align: "center",
                width: 50
            },
            {
                name: "TTC",
                title: db.Language($scope.Lang,"TUTAR"),
                type: "decimal",
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
                title: db.Language($scope.Lang,"BARKOD"),
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "NAME",
                title: db.Language($scope.Lang,"NAME"),
                type: "TEXT",
                align: "center",
                width: 150
            },            
            {
                name: "QUANTITY",
                title: db.Language($scope.Lang,"MIKTAR"),
                type: "decimal",
                align: "center",
                width: 50
            },
            {
                name: "PRICE",
                title: db.Language($scope.Lang,"FIYAT"),
                type: "decimal",
                align: "center",
                width: 50
            },
            {
                name: "AMOUNT",
                title: db.Language($scope.Lang,"TUTAR"),
                type: "decimal",
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
        $("#TblSonSatisTahDetay,#TblSonSatisTahDetay").each(function()
        {
            $(this).jsGrid({
                width: "100%",
                height: "150px",
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
                    title: db.Language($scope.Lang,"TIP"),
                    align: "center",
                    width: 75
                },
                {
                    name: "AMOUNT",
                    title: db.Language($scope.Lang, "AMOUNT"),
                    type: "decimal",
                    align: "center",
                    width: 35
                }
                ],
                rowClick: function(args)
                {
                    $('#MdlSonSatisTahGuncelle').modal('show'); 
                    $scope.SonTahDetayKalan = $scope.SonSatisList[$scope.SonSatisListeSelectedIndex].TTC - db.SumColumn($scope.SonSatisTahDetayList,"AMOUNT")
                    $scope.SonSatisTahDetayRowClick(args.itemIndex,args.item);
                    $scope.$apply();                                      
                }
            });
        })
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
                    type: "decimal",
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
    function InitTicketPay()
    {
        $("#TblTicketPay").jsGrid
        ({
            width: "100%",
            height: "300px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.TicketPayListe,
            fields: 
            [
                {
                    name: "CODE",
                    type: "string",
                    align: "center",
                    width: 300
                    
                },
                {
                    name: "AMOUNT",
                    type: "decimal",
                    align: "center",
                    width: 100
                    
                }
            ]
        });
    }
    function InsertSonYenile(pData)
    {    
        $scope.SatisList = pData;                          
        DipToplamHesapla();
        $("#TblIslem").jsGrid({data : $scope.SatisList}); 
        
        $scope.TxtBarkod = "";
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
            $scope.ToplamKdv += value.TVA; 
            $scope.AraToplam += value.HT;
            $scope.ToplamIskonto += value.DISCOUNT;
            $scope.GenelToplam += value.TTC;
        });

        $scope.ToplamKdv = $scope.ToplamKdv.toDigit2(); 
        $scope.AraToplam = $scope.AraToplam.toDigit2();
        $scope.ToplamIskonto = $scope.ToplamIskonto.toDigit2();
        $scope.GenelToplam = $scope.GenelToplam.toDigit2()
        $scope.ToplamKalan = $scope.GenelToplam.toDigit2() - db.SumColumn($scope.TahList,"AMOUNT").toDigit2();
        
        db.LCDPrint
        (
            {
                port : $scope.ComPorts.EkranPort,
                blink : 0,
                text :  db.PrintText($scope.SatisList[0].ITEM_NAME,11) + " " + 
                        db.PrintText(parseFloat($scope.SatisList[0].PRICE).toDigit2().toString() + "EUR" ,8,"Start") +
                        "TOTAL : " + db.PrintText(parseFloat($scope.ToplamKalan.toFixed(2)).toDigit2().toString() + "EUR",12,"Start")
            }                        
        );

        $scope.ToplamMiktar = parseFloat(db.SumColumn($scope.SatisList,"QUANTITY")).toDigit2(); 
        $scope.ToplamSatir =  $scope.SatisList.length  

        $scope.SatisList = SubTotalBuild($scope.SatisList);
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
        
        $scope.FisGenelToplam = parseFloat($scope.FisAraToplam - $scope.FisToplamIskonto).toDigit2();
    }
    function TxtBarkodKeyPress()
    {   
        $scope.StokGetir($scope.TxtBarkod);
    }
    function TahSonYenile()
    {  
        FirstKey = false;      
        $("#TblTahIslem").jsGrid({data : $scope.TahList}); 
        
        if($scope.TahList.length > 0)
        {            
            $scope.TahKalan = parseFloat($scope.GenelToplam).toDigit2() - db.SumColumn($scope.TahList,"AMOUNT").toDigit2();
            $scope.TahParaUstu = db.SumColumn($scope.TahList,"CHANGE"); 
            $scope.TahIslemListeRowClick($scope.TahList.length-1,$scope.TahList[$scope.TahList.length-1]); 
        }
        else
        {    
            $scope.TahKalan = parseFloat($scope.GenelToplam).toDigit2();
            $scope.TahParaUstu = 0; 
        }

        $scope.TxtAraToplamTutar = parseFloat($scope.TahKalan).toDigit2();
    }  
    function SatirBirlestir(pTip)
    {
        let TmpStatus = false;
        let TmpIndex = -1;

        if(pTip == "SATIS")
        {
            for (let i = 0; i < $scope.SatisList.length; i++) 
            {
                if($scope.SatisList[i].SUBTOTAL == 0)
                {
                    if($scope.SatisList[i].ITEM_CODE == $scope.Stok[0].CODE)
                    {
                        if($scope.Stok[0].SALE_JOIN_LINE == 1 && $scope.Stok[0].WEIGHING == 0)
                        {
                            TmpStatus = true;
                            TmpIndex = i;
                        }
                    }
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
            db.ExecuteTag($scope.Firma,'PosSatisKapatUpdate',[$scope.Tarih,$scope.Sube,$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
            {   
                let TmpQuery = 
                {
                    db : $scope.Firma,
                    query:  "SELECT " +
                            "MAX(VAT_TYPE) AS VAT_TYPE," +
                            "VAT AS VAT," +
                            "SUM(HT) AS HT," +
                            "SUM(TVA) AS TVA," +
                            "SUM(TTC) AS TTC," +
                            "MAX(REF_NO) AS TICKET " +
                            "FROM [POS_SALES_VW_01] AS POS " +
                            "WHERE DEPARTMENT = @DEPARTMENT AND TYPE = @TYPE AND REF = @REF AND REF_NO = @REF_NO AND STATUS >= 0 " +
                            "GROUP BY VAT",
                    param:  ['DEPARTMENT','TYPE','REF','REF_NO'],
                    type:   ['int','int','string|25','int'],
                    value:  [$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira]
                }
                db.GetDataQuery(TmpQuery,function(pData)
                {
                    //EĞER MÜŞTERİ KARTI İSE PUAN KAYIT EDİLİYOR.
                    if($scope.CariKodu != CariParam)
                    {
                        let TmpPuanData = 
                        [
                            $scope.Kullanici,
                            $scope.Tarih,
                            $scope.Kullanici,
                            $scope.Tarih,
                            0,
                            $scope.CariKodu,
                            $scope.Seri,
                            $scope.Sira,
                            Math.floor($scope.GenelToplam),
                            ''
                        ]

                        db.ExecuteTag($scope.Firma,'MusteriPuanInsert',TmpPuanData);

                        if($scope.CariKullanPuan > 0)
                        {
                            let TmpPuanData = 
                            [
                                $scope.Kullanici,
                                $scope.Tarih,
                                $scope.Kullanici,
                                $scope.Tarih,
                                1,
                                $scope.CariKodu,
                                $scope.Seri,
                                $scope.Sira,
                                $scope.CariKullanPuan,
                                ''
                            ]
                            db.ExecuteTag($scope.Firma,'MusteriPuanInsert',TmpPuanData);
                        }
                    }

                    let TmpBondA = ''

                    if($scope.TahParaUstu > 0 && db.Equal($scope.TahList,"TYPE",4))
                    {
                        //BONDAVOIR İÇİN BARKOD DESENİ OLUŞTURULUYOR.
                        TmpBondA = 'Q' + new Date().toISOString().substring(2, 10).replace('-','').replace('-','') + Math.round(parseFloat($scope.TahParaUstu).toDigit2() * 100).toString().padStart(5,'0') + Date.now().toString().substring(7,12);
                        //İADE TİPİ BONDAVOIR İSE TİCKET TABLOSUNU BARKOD KAYIT EDİLİYOR.                            
                        db.ExecuteTag($scope.Firma,'TicketInsert',[$scope.Kullanici,$scope.Kullanici,TmpBondA,parseFloat($scope.TahParaUstu.toDigit2()),$scope.Seri,$scope.Sira,1]);
                    }
                    else if($scope.TahParaUstu > 0)
                    {
                        if(db.Equal($scope.TahList,"TYPE",0))
                        {
                            //SATIŞ SONUNDA PARA ÜSTÜ MODAL EKRANI AÇILIYOR. TMPPARAUSTU DEĞİŞKENİ EKRAN YENİLENDİĞİ İÇİN KULLANILDI. 
                            $scope.TmpParaUstu = $scope.TahParaUstu;
                            $("#MdlParaUstu").modal("show");                    
                            setTimeout(()=>{$("#MdlParaUstu").modal("hide")},10000);
                        }
                    }

                    try
                    {
                        //EĞER TAHSİLAT İÇERİSİNDE NAKİT VARSA KASAYI AÇ YOKSA KASAYI AÇMA
                        for(let item of $scope.TahList)
                        {
                            if(item.TYPE == 0)
                            {
                                db.EscposCaseOpen();
                                break;    
                            }
                        }

                        let ParamData = 
                        [
                            CariParam,
                            $scope.CariPuan,
                            Math.floor($scope.GenelToplam),
                            $scope.CariKullanPuan,
                            $scope.CariPuan + Math.floor($scope.GenelToplam),
                            TmpBondA,
                            $scope.CihazID
                        ]   
                        db.ReceiptPrint($scope.SatisList,$scope.TahList,pData,ParamData,'Fis',false,function()
                        {
                            
                        });
                    }
                    catch(err)
                    {

                    }
    
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
                                    port : $scope.ComPorts.EkranPort,
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
                                    port : $scope.ComPorts.EkranPort,
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
    function SubTotalBuild(pData)
    {
        for( var i = 0; i < pData.length; i++)
        { 
            if (pData[i].GUID === "") 
            { 
                pData.splice(i, 1); 
            }
        }

        let TmpData = [];
        let SubIndex = -1;

        for (let i = 0;i < pData.length;i++)
        {
            if(SubIndex != pData[i].SUBTOTAL)
            {
                SubIndex = pData[i].SUBTOTAL;
                if(pData[i].SUBTOTAL > 0)
                {
                   let TmpObj = 
                   {
                        AMOUNT: 0,
                        BARCODE: "",
                        CUSER: "",
                        CUSTOMER_CODE: "",
                        CUSTOMER_NAME: "",
                        CUSTOMER_POINT: 0,
                        DEVICE: "",
                        DISCOUNT: 0,
                        GUID: "",
                        HT: 0,
                        ITEM_CODE: "",
                        ITEM_NAME: "Sous-Total",
                        LINE_NO: 0,
                        LOYALTY: 0,
                        MIN_PRICE: 0,
                        NO: 0,
                        PRICE: 0,
                        QUANTITY: 0,
                        REF: "",
                        REF_NO: 0,
                        SUBTOTAL: SubIndex,
                        TTC: 0,
                        TVA: 0,
                        UNIT: " ",
                        UNIT_ID: "",
                        UNIT_SHORT: "",
                        VAT: 0,
                        VAT_TYPE: "",
                        CAMOUNT:db.SumColumn(pData,"AMOUNT","SUBTOTAL = " + SubIndex)
                   }
                   TmpData.push(TmpObj) 
                }
            }
            
            TmpData.push(pData[i]);
        }
        return TmpData;
    }
    document.onkeydown = function(e)
    {
        if(FocusBarkod)
        {
            if ($scope.TxtBarkod.indexOf('*') == -1)
            {
                $window.document.getElementById("TxtBarkod").focus();
            }

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
            else if(e.which == 123)
            {
                require('electron').remote.getCurrentWindow().toggleDevTools();
            }
        }
        else if(FocusAraToplam)
        {
            $window.document.getElementById("TxtAraToplamTutar").focus();
        }
        else if(FocusMusteri)
        {
            $window.document.getElementById("TxtCariAra").focus();
            if(e.which == 13)
            {
                $scope.BtnCariGridGetir();
            }
        }
        else if(FocusStok)
        {
            $window.document.getElementById("TxtStokAra").focus();
        }
        else if(FocusStokGrup)
        {
            $window.document.getElementById("TxtStokGrupAra").focus();
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
        else if(FocusKartOdeme)
        {
            $window.document.getElementById("TxtKartOdemeTutar").focus();
        }
        else if(FocusSadakatIndirim)
        {
            $window.document.getElementById("TxtSadakatIndirim").focus();
        }
        else if(FocusIskontoYuzde)
        {
            $window.document.getElementById("TxtIskontoYuzde").focus();
        }
        else if(FocusIskontoTutar)
        {
            $window.document.getElementById("TxtIskontoTutar").focus();
        }
        else if(FocusAvans)
        {
            $window.document.getElementById("TxtAvans").focus();
        }
        else if(FocusPluKodu)
        {
            $window.document.getElementById("PluGrupKodu").focus();
        }
        else if(FocusPluAdi)
        {
            $window.document.getElementById("PluGrupAdi").focus();
        }
        else if(FocusTeraziFiyat)
        {
            $window.document.getElementById("TxtTeraziFiyat").focus();
        }
        else if(FocusRepasMiktar)
        {
            $window.document.getElementById("TxtRepasMiktar").focus();
        }
        else if(FocusTicketBarkod)
        {
            $window.document.getElementById("TxtTicketBarkod").focus();
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
        if($scope.TxtBarkod.indexOf('*') > -1)
        {
            $scope.TxtBarkod = $scope.TxtBarkod + $scope.StokListe[pIndex].CODE;
        }
        else
        {
            $scope.TxtBarkod = $scope.StokListe[pIndex].CODE;
        }
        $scope.PluStokKod = $scope.StokListe[pIndex].CODE;
        $scope.PluGrupAdi = $scope.StokListe[pIndex].NAME;
    }
    $scope.StokGrupListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( StokGrupSelectedRow ) { StokGrupSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        StokGrupSelectedRow = $row;

        $scope.PluStokKod = $scope.StokGrupListe[pIndex].CODE;
        $scope.PluGrupAdi = $scope.StokGrupListe[pIndex].NAME;
    }
    $scope.BarkodListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( BarkodSelectedRow ) { BarkodSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        BarkodSelectedRow = $row;
        
        if($scope.TxtBarkod.indexOf('*') > -1)
            $scope.TxtBarkod = $scope.TxtBarkod.split('*')[0] + '*' + $scope.BarkodListe[pIndex].BARCODE;
        else
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
            $("#TblSonSatisTahDetay,#TblSonSatisTahDetay").each(function()
            {
                $(this).jsGrid({data : $scope.SonSatisTahDetayList});
            });
        });
    }
    $scope.SonSatisTahDetayRowClick = function(pIndex,pItem,pObj)
    {
        if ( SonSatisTahDetaySelectedRow ) { SonSatisTahDetaySelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        $("#TblSonSatisTahDetay,#TblSonSatisTahDetay").each(function()
        {
            $(this).jsGrid("rowByItem", pItem).children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            SonSatisTahDetaySelectedRow = $(this).jsGrid("rowByItem", pItem);
        });

        SonTahIndex = pIndex;
        $scope.TxtSonTahGuncelle = pItem.AMOUNT
        FocusSonTahGuncelle = true;
        FocusBarkod = false;    
       
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
            InitStokGrupGrid();
            InitBarkodGrid();
            InitSonSatisGrid();
            InitSonSatisDetayGrid();
            InitSonSatisTahDetayGrid();
            InitTRDetayGrid();
            InitTicketPay();

            $scope.ParamListe = await db.GetPromiseTag($scope.Firma,'ParamGetir',[$scope.CihazID]);
            $scope.KullaniciListe = await db.GetPromiseTag($scope.Firma,'KullaniciGetir',[$scope.Kullanici]);

            if($scope.ParamListe.length > 0)
            {
                for (let i = 0; i < $scope.ParamListe.length; i++) 
                {
                    if($scope.ParamListe[i].NAME == 'SatisSeri')
                    {
                        $scope.Seri = $scope.ParamListe[i].VALUE;
                    }
                    else if($scope.ParamListe[i].NAME == 'CariKodu')
                    {
                        $scope.CariKodu = $scope.ParamListe[i].VALUE;
                        CariParam = $scope.ParamListe[i].VALUE;
                    }
                    else if($scope.ParamListe[i].NAME == 'DepoNo')
                    {
                        $scope.Sube = $scope.ParamListe[i].VALUE;
                    }
                    else if($scope.ParamListe[i].NAME == 'EkranPort')
                    {
                        $scope.ComPorts.EkranPort = $scope.ParamListe[i].VALUE;
                    }
                    else if($scope.ParamListe[i].NAME == 'OdemePort')
                    {
                        $scope.ComPorts.OdemePort = $scope.ParamListe[i].VALUE;
                    }
                    else if($scope.ParamListe[i].NAME == 'TeraziPort')
                    {
                        $scope.ComPorts.TeraziPort = $scope.ParamListe[i].VALUE;
                    }
                }
            }
            else
            {
                alertify.alert(db.Language($scope.Lang,"Parametre Getirme İşlemi Başarısız Oldu, Lütfen CihazID'nizi Kontrol Edin."))
            }
            
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

        if($scope.SatisList.length > 0)
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
        $("#TblStok").jsGrid("reset");
        db.GetData($scope.Firma,'StokGetir',[Kodu,Adi],function(StokData)
        {
            $scope.StokListe = StokData;
            $("#TblStok").jsGrid({data : $scope.StokListe});
        });

    }
    $scope.BtnStokGridSec = function()
    {        
        if(UrunListeTip == 'StokAra')
        {
            $scope.StokGetir($scope.TxtBarkod);            
            $("#MdlStokListele").modal('hide');
        }
        else if(UrunListeTip == 'Plu')
        {
            $("#MdlStokListele").modal('hide');
            FocusBarkod = false;
            FocusStok = false;
            FocusPluKodu = false;
            FocusPluAdi = true;        
            FirstKey = false;
            $("#MdlPluEdit").modal("show");
            
        }        
    }  
    $scope.BtnStokGrupGridGetir = function()
    {
        db.GetData($scope.Firma,'StokGrupGetir',[$scope.TxtStokGrupAra],function(pData)
        {
            $scope.StokGrupListe = pData;
            $("#TblStokGrup").jsGrid({data : $scope.StokGrupListe});
        });

    }
    $scope.BtnStokGrupGridSec = function()
    {        
        console.log(StokGrupSelectedRow);
        $("#MdlStokGrupListele").modal('hide');
        FocusBarkod = false;
        FocusStokGrup = false;
        FocusPluKodu = false;
        FocusPluAdi = true;        
        FirstKey = false;
        $("#MdlPluEdit").modal("show");      
    }    
    $scope.StokGetir = async function(pBarkod)
    {
        if(pBarkod != '')
        {   
            //EĞER CARİ SEÇ BUTONUNA BASILDIYSA CARİ BARKODDAN SEÇİLECEK.
            if($scope.Class.BtnCariBarSec == "form-group btn btn-danger btn-block my-1")
            {
                if(pBarkod.toString().substring(0,6) == "202012")
                {
                    pBarkod = pBarkod.toString().substring(0,6) + pBarkod.toString().substring(7,pBarkod.toString().length - 1) 
                    console.log(pBarkod)
                }

                let TmpCari = await db.GetPromiseTag($scope.Firma,'PosCariGetir',[pBarkod,'']);
                if(TmpCari.length > 0)
                {
                    $scope.CariKodu = TmpCari[0].CODE;
                    $scope.CariAdi = TmpCari[0].NAME;  
                    $scope.CariPuan = TmpCari[0].POINT;    

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
                        db.ExecuteQuery(TmpQuery,() =>
                        {
                            $scope.SatisList[0].CUSTOMER_CODE = TmpCari[0].CODE;
                        });
                    }
                    
                }
                else
                {
                    alertify.alert(db.Language($scope.Lang,"Müşteri bulunamadı !"));
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
            if(pBarkod.length >= 16 && pBarkod.length <= 24)
            {
                let TmpTicket = pBarkod.substring(11,16)
                let TmpYear = pBarkod.substring(pBarkod.length - 1, pBarkod.length);
                let TmpType = 0

                if($scope.SatisList.length == 0)
                {
                    alertify.alert(db.Language($scope.Lang,"Satış olmadan ödeme alamazsınız !"));
                    $scope.TxtBarkod = "";
                    return;
                }
                if(pBarkod.substring(0,1) == "Q")
                {
                    TmpType = 2    
                    TmpTicket = pBarkod.substring(7,12)
                    $scope.TahTip = 4;

                    if(db.Equal($scope.TahList,"TYPE",0))
                    {
                        alertify.alert(db.Language($scope.Lang,"Bon d'avoir girmeden önce girili tahsilatları temizleyiniz !"));
                        $scope.TxtBarkod = "";
                        return;
                    }
                }
                else
                {
                    alertify.alert(db.Language($scope.Lang,"Bu barkod tipini bu bölümden okutamazsınız !"));
                    $scope.TxtBarkod = "";
                    return;
                    // if(pBarkod.length == 22)
                    // {
                    //     TmpTicket = pBarkod.substring(9,14)
                    // }                
                    // else if(pBarkod.length == 18)
                    // {
                    //     TmpTicket = pBarkod.substring(5,10)
                    // }

                    // if(TmpYear == "9")
                    // {
                    //     TmpYear = -1
                    // }

                    // if(moment(new Date()).format("M") > 9 && moment(new Date()).format("Y").toString().substring(3,4) > TmpYear)
                    // {
                    //     alertify.alert(db.Language($scope.Lang,"Geçersiz ticket."));
                    //     $scope.TxtBarkod = "";
                    //     return;
                    // }

                    // if(parseFloat(TmpTicket / 100).toDigit2() > 21)
                    // {
                    //     alertify.alert(db.Language($scope.Lang,"Bu tutarda  ticket olamaz !"));
                    //     $scope.TxtBarkod = "";
                    //     return;
                    // }
                    // $scope.TahTip = 3;
                }
                
                db.GetData($scope.Firma,'TicketControl',[pBarkod],function(data)
                {
                    if(data.length <= 0)
                    {
                        db.GetData($scope.Firma,'PosTahGetir',[$scope.Sube,0,$scope.Seri,$scope.Sira],function(PosTahData)
                        {
                            $scope.TahList = PosTahData;
                            TahSonYenile(); 
                            
                            $scope.TxtAraToplamTutar = parseFloat(TmpTicket / 100).toDigit2();                                                                                    
                            
                            db.ExecuteTag($scope.Firma,'TicketInsert',[$scope.Kullanici,$scope.Kullanici,pBarkod,$scope.TxtAraToplamTutar,$scope.Seri,$scope.Sira,TmpType],function(InsertResult)
                            {
                                $scope.PosTahInsert(function()
                                {   
                                    $scope.ToplamTicket += 1;
                                    $scope.SonTicket = parseFloat(TmpTicket / 100).toDigit2();
                                    DipToplamHesapla();
                                    $scope.TahTip = 0;
                                });
                            })
                            
                        });
                    }
                    else
                    {
                        if(data[0].CODE == '001')
                        {
                            alertify.alert(db.Language($scope.Lang,"Çalıntı Ticket !"));
                        }
                        else
                        {
                            alertify.alert(db.Language($scope.Lang,"Daha önce kullanılmıştır !"));
                        }
                        
                    }

                });

                $scope.TxtBarkod = "";
                return;
            }
            //***************************** */
            let TmpFiyat = 0;

            if(db.IsUnitBarcode(pBarkod))
            {                
                if(pBarkod.length == 12)
                {
                    TmpFiyat = parseFloat((parseFloat(pBarkod.substring(6,pBarkod.length)) / 1000) * 0.152445).toDigit2();
                    pBarkod = pBarkod.substring(0,6) + "MMMCCF";
                }
                if(pBarkod.length == 13)
                {
                    TmpFiyat = (((pBarkod.substring(7,pBarkod.length)) / 1000) * 0.15244).toDigit2();
                    pBarkod = pBarkod.substring(0,7) + "MMMCCF";
                }
            }

            db.StokBarkodGetir($scope.Firma,pBarkod,async function(BarkodData)
            {
                if(BarkodData.length > 0)
                {   
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
                        if($scope.Stok[0].PRICE > 0)
                        {
                            $("#MdlTeraziYukleniyor").modal("show");
                            db.ScaleSend($scope.ComPorts.TeraziPort,$scope.Stok[0].PRICE,(pResult) =>
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
                            $("#MdlTeraziFiyat").modal("show");
                            FirstKey = false;
                            FocusBarkod = false;
                            FocusTeraziFiyat = true;
                        }                        
                    }
                    else
                    {
                        if($scope.Stok[0].PRICE == 0)
                        {
                            let TmpConfirm = await db.Confirm(db.Language($scope.Lang,"Ürünün fiyat bilgisi tanımsız ! Devam etmek istermisiniz ?"));

                            if(TmpConfirm == false)
                            {
                                $scope.TxtBarkod = "";
                                return;
                            }
                            else
                            {
                                $scope.PosSatisInsert(()=> 
                                {
                                    $scope.IslemListeSelectedIndex = 0;
                                    $scope.BtnFiyatGuncelle();
                                });
                            }
                        }   
                        else
                        {
                            $scope.PosSatisInsert();
                        }
                    }
                }
                else   
                {
                    alertify.alert(db.Language($scope.Lang,"Okuttuğunuz Barkod Sistemde Bulunamadı."));
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
    $scope.PosSatisInsert = function(pCallBack)
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
            $scope.Kullanici,
            $scope.Kullanici,
            $scope.CihazID,
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
            $scope.Stok[0].PRICE = parseFloat($scope.Stok[0].PRICE).toDigit2(),
            0, //ISKONTO TUTAR 1
            $scope.CariKullanPuan / 100, //SADAKAT TUTAR 1
            $scope.Stok[0].VAT,
            0,  //DURUM
            0
        ];
        
        db.ExecuteTag($scope.Firma,'PosSatisInsert',InsertData,async function(InsertResult)
        {         
            if(typeof(InsertResult.result.err) == 'undefined')
            {   
                $scope.TxtBarkod = ""; 
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
                    InsertSonYenile(PosSatisData);                         
                    
                    $scope.IslemListeRowClick(0,$scope.SatisList[0]);                    

                    if(typeof pCallBack != 'undefined')
                    {
                        pCallBack()
                    }
                });
            }
            else
            {
                if(typeof pCallBack != 'undefined')
                {
                    pCallBack()
                }
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
        
        if(parseFloat($scope.TxtAraToplamTutar.toString().replace(',','.')) <= 0 || parseFloat($scope.TahKalan) <= 0)
        {
            if(typeof(pCallBack) != 'undefined')
            {
                pCallBack();
            }
            return;
        }
        
        TahTutar = parseFloat($scope.TxtAraToplamTutar.toString().replace(',','.'));
        if($scope.GenelToplam < (db.SumColumn($scope.TahList,"AMOUNT") + parseFloat($scope.TxtAraToplamTutar.toString().replace(',','.'))))
        {
            // if($scope.TahTip != 3)
            // {
                TahParaUstu = parseFloat((db.SumColumn($scope.TahList,"AMOUNT") + parseFloat($scope.TxtAraToplamTutar.toString().replace(',','.'))) - $scope.GenelToplam).toDigit2();
            // }
            TahTutar = parseFloat(parseFloat($scope.TxtAraToplamTutar.toString().replace(',','.')) - TahParaUstu).toDigit2();
        }
               
        if($scope.TxtAraToplamTutar.toString().replace(',','.') > 0)
        {
            let Result;            
            //SATIR BİRLEŞTİRME İŞLEMİ
            let TmpSatirBirlestir = SatirBirlestir("TAHSILAT");
            if(TmpSatirBirlestir.Status)
            {                
                let UpdateData =
                [
                    parseFloat($scope.TahList[TmpSatirBirlestir.Index].AMOUNT) + parseFloat(TahTutar),
                    0,
                    $scope.TahList[TmpSatirBirlestir.Index].GUID
                ];

                Result = await db.ExecutePromiseTag($scope.Firma,'PosTahTutarUpdate',UpdateData);
            }
            else
            {
                let InsertData = 
                [
                    $scope.Kullanici,
                    $scope.Kullanici,
                    $scope.CihazID,
                    $scope.Sube,
                    $scope.TahTip,
                    0, //EVRAKTIP
                    $scope.Tarih,
                    $scope.Seri,
                    $scope.Sira,
                    $scope.CariKodu,
                    "",
                    TahTutar,
                    TahParaUstu,
                    1
                ];
                Result = await db.ExecutePromiseTag($scope.Firma,'PosTahInsert',InsertData);
            }
            
            if(typeof(Result.result.err) == 'undefined')
            {
                db.GetData($scope.Firma,'PosTahGetir',[$scope.Sube,0,$scope.Seri,$scope.Sira],function(PosTahData)
                {   
                    db.LCDPrint
                    (
                        {
                            port : $scope.ComPorts.EkranPort,
                            blink : 0,
                            text :  db.PrintText(PosTahData[0].TYPE_NAME,9) + " " + 
                                    db.PrintText(parseFloat(PosTahData[0].AMOUNT).toDigit2().toString() + "EUR" ,10,"Start") +
                                    "Reste  :" + db.PrintText(parseFloat($scope.GenelToplam - PosTahData[0].AMOUNT).toDigit2().toString() + "EUR",12,"Start")
                        }                        
                    );
                    $scope.TahList = PosTahData;
                    DipToplamHesapla();
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
    }
    $scope.PosSatisMiktarUpdate = function(pData,pMiktar)
    {   
        pData.QUANTITY = pMiktar;

        db.GetData($scope.Firma,'PosSatisMiktarUpdate',[pMiktar,pData.ITEM_CODE,pData.GUID],async function(data)
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
                
                db.GetData($scope.Firma,'PosFisSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisFisData)
                {  
                    InsertFisYenile(PosSatisFisData);   
                }); 
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
                
                db.GetData($scope.Firma,'PosFisSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisFisData)
                {  
                    InsertFisYenile(PosSatisFisData);   
                }); 
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
    $scope.TxtTicketBarkodPress = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            if($scope.TxtTicketBarkod.length >= 16 && $scope.TxtTicketBarkod.length <= 24)
            {
                //TICKET RESTORANT İÇİN YAPILDI
                let TmpTicketBarkod = $scope.TxtTicketBarkod;
                let TmpTicket = TmpTicketBarkod.substring(11,16)
                let TmpYear = TmpTicketBarkod.substring(TmpTicketBarkod.length - 1, TmpTicketBarkod.length);
                let TmpType = 0

                if($scope.SatisList.length == 0)
                {
                    alertify.alert(db.Language($scope.Lang,"Satış olmadan ödeme alamazsınız !"));
                    $scope.TxtTicketBarkod = "";
                    return;
                }
                
                if(TmpTicketBarkod.length == 22)
                {
                    TmpTicket = TmpTicketBarkod.substring(9,14)
                }                
                else if(TmpTicketBarkod.length == 18)
                {
                    TmpTicket = TmpTicketBarkod.substring(5,10)
                }

                if(TmpYear == "9")
                {
                    TmpYear = -1
                }

                if(moment(new Date()).format("M") > 9 && moment(new Date()).format("Y").toString().substring(3,4) > TmpYear)
                {
                    alertify.alert(db.Language($scope.Lang,"Geçersiz ticket."));
                    $scope.TxtTicketBarkod = "";
                    return;
                }

                if(parseFloat(TmpTicket / 100).toDigit2() > 21)
                {
                    alertify.alert(db.Language($scope.Lang,"Bu tutarda  ticket olamaz !"));
                    $scope.TxtTicketBarkod = "";
                    return;
                }
                $scope.TahTip = 3;
                
                db.GetData($scope.Firma,'TicketControl',[TmpTicketBarkod],function(data)
                {
                    if(data.length <= 0)
                    {
                        db.GetData($scope.Firma,'PosTahGetir',[$scope.Sube,0,$scope.Seri,$scope.Sira],function(PosTahData)
                        {
                            $scope.TahList = PosTahData;
                            TahSonYenile(); 
                            
                            $scope.TxtAraToplamTutar = parseFloat(TmpTicket / 100).toDigit2();                                                                                    
                            
                            db.ExecuteTag($scope.Firma,'TicketInsert',[$scope.Kullanici,$scope.Kullanici,TmpTicketBarkod,$scope.TxtAraToplamTutar,$scope.Seri,$scope.Sira,TmpType],function(InsertResult)
                            {
                                $scope.PosTahInsert(function()
                                {   
                                    $scope.ToplamTicket += 1;
                                    $scope.SonTicket = parseFloat(TmpTicket / 100).toDigit2();
                                    DipToplamHesapla();
                                    $scope.TahTip = 0;

                                    let TmpQuery = 
                                    {
                                        db : $scope.Firma,
                                        query:  "SELECT CODE AS CODE, AMOUNT AS AMOUNT FROM TICKET WHERE REF = @REF AND REF_NO = @REF_NO ORDER BY LDATE DESC",
                                        param:  ['REF','REF_NO'],
                                        type:   ['string|25','int'],
                                        value:  [$scope.Seri,$scope.Sira]
                                    }
                                    db.GetDataQuery(TmpQuery,function(pTicketData)
                                    {
                                        if(pTicketData.length > 0)
                                        {
                                            $scope.TicketPayListe = pTicketData;
                                            $scope.TicketSonTutar = $scope.TicketPayListe[0].AMOUNT;
                                            $scope.TicketTopTutar = parseFloat(db.SumColumn($scope.TicketPayListe,"AMOUNT")).toDigit2()

                                            $("#TblTicketPay").jsGrid({data : $scope.TicketPayListe});
                                        }
                                    });
                                });
                            })
                            
                        });
                    }
                    else
                    {
                        if(data[0].CODE == '001')
                        {
                            alertify.alert(db.Language($scope.Lang,"Çalıntı Ticket !"));
                        }
                        else
                        {
                            alertify.alert(db.Language($scope.Lang,"Daha önce kullanılmıştır !"));
                        }
                        
                    }

                });

                $scope.TxtTicketBarkod = "";
                return;
                //***************************** */
            }
            else
            {
                $scope.TxtTicketBarkod = "";
                alertify.alert(db.Language($scope.Lang,"Geçersiz ticket."));
                return;
            }
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
            if($scope.TxtFiyatGuncelle > $scope.SatisList[$scope.IslemListeSelectedIndex].MIN_PRICE)
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
            else
            {
                console.log($scope.SatisList[$scope.IslemListeSelectedIndex].MIN_PRICE)
                FirstKey = false;
                alertify.alert(db.Language($scope.Lang,"Geçersiz fiyat girdiniz !"))
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
        else if(FocusStokGrup)
        {
            $scope.TxtStokGrupAra = $scope.TxtStokGrupAra.toString().substring(0,$scope.TxtStokGrupAra.length-1);
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
        else if(FocusIskontoYuzde)
        {
            $scope.TxtIskontoYuzde = $scope.TxtIskontoYuzde.toString().substring(0,$scope.TxtIskontoYuzde.length-1); 
        }
        else if(FocusIskontoTutar)
        {
            $scope.TxtIskontoTutar = $scope.TxtIskontoTutar.toString().substring(0,$scope.TxtIskontoTutar.length-1); 
        }
        else if(FocusAvans)
        {
            $scope.TxtAvans = $scope.TxtAvans.toString().substring(0,$scope.TxtAvans.length-1); 
        }
        else if(FocusPluKodu)
        {
            $scope.PluStokKod = $scope.PluStokKod.toString().substring(0,$scope.PluStokKod.length-1); 
        }
        else if(FocusPluAdi)
        {
            $scope.PluGrupAdi = $scope.PluGrupAdi.toString().substring(0,$scope.PluGrupAdi.length-1); 
        }
        else if(FocusTeraziFiyat)
        {
            $scope.TxtTeraziFiyat = $scope.TxtTeraziFiyat.toString().substring(0,$scope.TxtTeraziFiyat.length-1); 
        }
        else if(FocusRepasMiktar)
        {
            $scope.TxtRepasMiktar = $scope.TxtRepasMiktar.toString().substring(0,$scope.TxtRepasMiktar.length-1); 
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
            $window.document.getElementById("TxtBarkod").focus();
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
            if(FirstKey)
            {
                $scope.TxtCariAra = $scope.TxtCariAra + Key; 
            }
            else
            {
                $scope.TxtCariAra = Key; 
                FirstKey = true;
            }            
        }
        else if(FocusStok)
        {
            if(FirstKey)
            {
                $scope.TxtStokAra = $scope.TxtStokAra + Key; 
            }
            else
            {
                $scope.TxtStokAra = Key; 
                FirstKey = true;
            }            
        }
        else if(FocusStokGrup)
        {
            if(FirstKey)
            {
                $scope.TxtStokGrupAra = $scope.TxtStokGrupAra + Key; 
            }
            else
            {
                $scope.TxtStokGrupAra = Key; 
                FirstKey = true;
            }            
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
        else if(FocusIskontoYuzde)
        {
            if(Key.length == 2)
            {
                $scope.TxtIskontoYuzde = Key
                return;
            }

            if(FirstKey)
            {
                $scope.TxtIskontoYuzde = $scope.TxtIskontoYuzde + Key; 
            }
            else
            {
                $scope.TxtIskontoYuzde = Key; 
                FirstKey = true;
            }
        }
        else if(FocusIskontoTutar)
        {
            if(Key.length == 2)
            {
                $scope.TxtIskontoYuzde = Key
                return;
            }

            if(FirstKey)
            {
                $scope.TxtIskontoTutar = $scope.TxtIskontoTutar + Key; 
            }
            else
            {
                $scope.TxtIskontoTutar = Key; 
                FirstKey = true;
            }
        }
        else if(FocusAvans)
        {
            if(FirstKey)
            {
                $scope.TxtAvans = $scope.TxtAvans + Key; 
            }
            else
            {
                $scope.TxtAvans = Key; 
                FirstKey = true;
            }
        }
        else if(FocusPluKodu)
        {
            if(FirstKey)
            {
                $scope.PluStokKod = $scope.PluStokKod + Key; 
            }
            else
            {
                $scope.PluStokKod = Key; 
                FirstKey = true;
            }
        }
        else if(FocusPluAdi)
        {
            if(FirstKey)
            {
                $scope.PluGrupAdi = $scope.PluGrupAdi + Key; 
            }
            else
            {
                $scope.PluGrupAdi = Key; 
                FirstKey = true;
            }
        }
        else if(FocusTeraziFiyat)
        {
            if(FirstKey)
            {
                $scope.TxtTeraziFiyat = $scope.TxtTeraziFiyat + Key; 
            }
            else
            {
                $scope.TxtTeraziFiyat = Key; 
                FirstKey = true;
            }
        }
        else if(FocusRepasMiktar)
        {
            if(FirstKey)
            {
                $scope.TxtRepasMiktar = $scope.TxtRepasMiktar + Key; 
            }
            else
            {
                $scope.TxtRepasMiktar = Key; 
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
        alertify.okBtn(db.Language($scope.Lang,'Evet'));
        alertify.cancelBtn(db.Language($scope.Lang,'Hayır'));

        alertify.confirm(db.Language($scope.Lang,'Evrağı iptal etmek istediğinize eminmisiniz ?'), 
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
                alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                alertify.alert(db.Language($scope.Lang,"Kayıtlı evrak olmadan evrak'ı iptal edemezsiniz !"));
            }
        }
        ,function(){});
    }
    $scope.BtnSatirIptal = function()
    {
        alertify.okBtn(db.Language($scope.Lang,'Evet'));
        alertify.cancelBtn(db.Language($scope.Lang,'Hayır'));

        alertify.confirm(db.Language($scope.Lang,'Satırı iptal etmek istediğinize eminmisiniz ?'), 
        async function()
        {   
            if($scope.IslemListeSelectedIndex > -1)
            {
                //SUB TOTAL SİLME İŞLEMİ 
                if($scope.SatisList[$scope.IslemListeSelectedIndex].GUID == "")
                {
                    let TmpQuery = 
                    {
                        db : $scope.Firma,
                        query:  "UPDATE POS_SALES SET SUBTOTAL = @SUBTOTAL WHERE SUBTOTAL > 0 AND DEPARTMENT = @DEPARTMENT AND TYPE = @TYPE AND REF = @REF AND REF_NO = @REF_NO ",
                        param:  ['SUBTOTAL','DEPARTMENT','TYPE','REF','REF_NO'],
                        type:   ['int','int','int','string|25','int'],
                        value:  [0,$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira]
                    }
                            
                    await db.GetPromiseQuery(TmpQuery)

                    db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],(pData)=>
                    {
                        InsertSonYenile(pData)
                    })
                }
                else
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
                                    DipToplamHesapla();
                                    $("#TblIslem").jsGrid({data : $scope.SatisList});  
                                    $scope.TxtBarkod = ""; 
                                    $scope.IslemListeRowClick(0,$scope.SatisList[0]);   
                                });
                            }
                        }
                        else
                        {
                            console.log(data.result.err);
                        }                                        
                    });    
                }
            }
            else
            {
                alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                alertify.alert(db.Language($scope.Lang,"Seçili satır olmadan evrak iptal edemezsiniz !"));
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
                if(data.length > 0)
                {
                    $scope.CariAdi = data[0].NAME;
                    $scope.CariKodu = data[0].CODE;
                    $scope.CariPuan = data[0].POINT;  
                }
            });
            db.GetData($scope.Firma,'PosTahGetir',[$scope.Sube,0,$scope.Seri,$scope.Sira],function(PosTahData)
            {
                $scope.TahList = PosTahData;
                TahSonYenile(); 
                InsertSonYenile(PosSatisData);
                $scope.TxtBarkod = ""; 
                $scope.IslemListeRowClick($scope.SatisList.length-1,$scope.SatisList[$scope.SatisList.length-1]);                  

                $('#MdlParkIslemler').modal('hide');
            });
            db.GetData($scope.Firma,'TicketGetir',[$scope.Seri,$scope.Sira],function(Data)
            {
                if(Data.length > 0)
                {
                    $scope.TRDetayListe = Data;
                    $scope.ToplamTicket = parseFloat(db.SumColumn($scope.TRDetayListe,"COUNT")).toDigit2();
                    $scope.SonTicket = $scope.TRDetayListe[0].AMOUNT;
                }
            });
        });
    }
    $scope.BtnAraToplam = function()
    {   
        if($scope.SatisList.length < 1)
        {
            alertify.okBtn(db.Language($scope.Lang,"Tamam"));
            alertify.alert(db.Language($scope.Lang,"Satış işlemi yapmadan tahsilat giremezsiniz !"));
            return;
        }
        
        $("#MdlAraToplam").modal("show");
        FocusAraToplam = true;
        FocusBarkod = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusKartOdeme = false;

        FirstKey = false;

        if($scope.TahTip == 0)
        {
            angular.element('#ChkNakit').trigger('click');
        }
        else if($scope.TahTip == 1)
        {
            angular.element('#ChkKredi').trigger('click');
        }
        else if($scope.TahTip == 2)
        {
            angular.element('#ChkCek').trigger('click');
        }
        else if($scope.TahTip == 3)
        {
            angular.element('#ChkTr').trigger('click');
        }

        TahSonYenile();
    }
    $scope.BtnMusteriListesi = function()
    {
        $("#MdlMusteriListele").modal("show");
        FirstKey = false;
        FocusMusteri = true;
        FocusAraToplam = false;
        FocusBarkod = false;        
        FocusStok = false;
        FocusKartOdeme = false;
    }
    $scope.BtnStokListesi = function(pTip)
    {
        $("#MdlStokListele").modal("show");
        FirstKey = false;
        FocusStok = true;
        FocusAraToplam = false;
        FocusBarkod = false;
        FocusMusteri = false;        
        FocusKartOdeme = false;

        UrunListeTip = pTip

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
            console.log($scope.TxtBarkod.split('*')[1])
            let TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT [BARCODE] AS BARCODE,ISNULL((SELECT NAME FROM ITEMS WHERE CODE = [ITEM_CODE]),'') NAME,dbo.FN_PRICE_SALE(ITEM_CODE,1,GETDATE()) AS PRICE FROM [dbo].[ITEM_BARCODE] WHERE BARCODE LIKE '%' + @BARCODE AND ISNULL((SELECT STATUS FROM ITEMS WHERE CODE = [ITEM_CODE]),0) = 1",
                param : ["BARCODE:string|50"],
                value : [$scope.TxtBarkod.indexOf('*') > 0 ? $scope.TxtBarkod.split('*')[1] : $scope.TxtBarkod]
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                $scope.BarkodListe = Data;
                if(Data.length == 1)
                {
                    if($scope.TxtBarkod.indexOf('*') > -1)
                        $scope.TxtBarkod = $scope.TxtBarkod.split('*')[0] + '*' + $scope.BarkodListe[0].BARCODE;
                    else
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
                    db.GetData($scope.Firma,'PosTahGetir',[$scope.Sube,0,$scope.Seri,$scope.Sira],function(data)
                    {
                        $scope.TahList = data;
                        TahSonYenile();
                        DipToplamHesapla();
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
            db.ExecuteTag($scope.Firma,'PosTahIptal',[$scope.Seri,$scope.Sira,0],function(data)
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
    $scope.BtnIadeModal = function()
    {
        if($scope.SatisList.length > 0)
        {
            $('#MdlIadeTip').modal('show');
        }
        else
        {
            alertify.alert(db.Language($scope.Lang,"Henüz iade edilecek bir ürün girişi yapmadınız !"))
        }
    }
    $scope.BtnIadeAl = function(pTip)
    {
        $('#MdlIadeTip').modal('hide'); 

        alertify.okBtn(db.Language($scope.Lang,'Evet'));
        alertify.cancelBtn(db.Language($scope.Lang,'Hayır'));

        alertify.confirm(db.Language($scope.Lang,'Iade almak istediğinize eminmisiniz ?'), 
        function()
        { 
            if($scope.SatisList.length > 0)
            {
                //POS SATIS UPDATE
                var TmpQuery = 
                {
                    db : $scope.Firma,
                    query:  "UPDATE POS_SALES SET TYPE = 1,STATUS = 1 WHERE DEPARTMENT = @DEPARTMENT AND TYPE = @TYPE AND REF = @REF AND REF_NO = @REF_NO AND STATUS >= 0",
                    param:  ['DEPARTMENT','TYPE','REF','REF_NO'],
                    type:   ['int','int','string|25','int'],
                    value:  [$scope.Sube,0,$scope.Seri,$scope.Sira]
                }

                db.ExecuteQuery(TmpQuery,function(UpdateResult)
                {
                    //BONDAVOIR İÇİN BARKOD DESENİ OLUŞTURULUYOR.
                    let TmpBondA = 'Q' + new Date().toISOString().substring(2, 10).replace('-','').replace('-','') + Math.round(parseFloat($scope.GenelToplam).toDigit2() * 100).toString().padStart(5,'0') + Date.now().toString().substring(7,12);

                    //TİP 0 İSE NAKİT İADE 1 İSE BONDAVOIR
                    if(pTip == 0)
                    {
                        $scope.ModalMsg.IadeParaUstu = db.Language($scope.Lang,"Tutarı iade ediniz !")
                    }
                    else
                    {       
                        $scope.ModalMsg.IadeParaUstu = db.Language($scope.Lang,"Tutarın daki iade fişini müşteriye teslim ediniz !");

                        //İADE TİPİ BONDAVOIR İSE TİCKET TABLOSUNU BARKOD KAYIT EDİLİYOR.                            
                        db.ExecuteTag($scope.Firma,'TicketInsert',[$scope.Kullanici,$scope.Kullanici,TmpBondA,parseFloat($scope.GenelToplam.toDigit2()),$scope.Seri,$scope.Sira,1])
                    }                        

                    //EĞER MÜŞTERİ KARTI İSE PUAN KAYIT EDİLİYOR.
                    if($scope.CariKodu != CariParam)
                    {
                        let TmpPuanData = 
                        [
                            $scope.Kullanici,
                            $scope.Tarih,
                            $scope.Kullanici,
                            $scope.Tarih,
                            1,
                            $scope.CariKodu,
                            $scope.Seri,
                            $scope.Sira,
                            Math.floor($scope.GenelToplam),
                            ''
                        ]
                        db.ExecuteTag($scope.Firma,'MusteriPuanInsert',TmpPuanData);
                    }


                    $scope.IadeParaUstu = $scope.GenelToplam;
                    $("#MdlIadeParaUstu").modal("show"); 

                    if(typeof(UpdateResult.result.err) == 'undefined')
                    {                       
                        var InsertData = 
                        [
                            $scope.Kullanici,
                            $scope.Kullanici,
                            $scope.CihazID,
                            $scope.Sube,
                            pTip, //TIP
                            1, //EVRAKTIP
                            $scope.Tarih,
                            $scope.Seri,
                            $scope.Sira,
                            $scope.CariKodu,
                            "",
                            $scope.GenelToplam,
                            0, //PARA USTU
                            1
                        ];
            
                        db.ExecuteTag($scope.Firma,'PosTahInsert',InsertData,async function(InsertResult)
                        {                            
                            if(typeof(InsertResult.result.err) == 'undefined')
                            {      
                                let pTahData = await db.GetPromiseTag($scope.Firma,'PosTahGetir',[$scope.Sube,1,$scope.Seri,$scope.Sira]);
                                if(pTahData.length > 0)
                                {
                                    //TİCKET YAZDIRMAK İÇİN DATALAR GETİRİLİYOR.
                                    let TmpQuery = 
                                    {
                                        db : $scope.Firma,
                                        query:  "SELECT " +
                                                "MAX(VAT_TYPE) AS VAT_TYPE," +
                                                "VAT AS VAT," +
                                                "SUM(HT) AS HT," +
                                                "SUM(TVA) AS TVA," +
                                                "SUM(TTC) AS TTC," +
                                                "MAX(REF_NO) AS TICKET " +
                                                "FROM [POS_SALES_VW_01] AS POS " +
                                                "WHERE DEPARTMENT = @DEPARTMENT AND TYPE = @TYPE AND REF = @REF AND REF_NO = @REF_NO AND STATUS >= 0 " +
                                                "GROUP BY VAT",
                                        param:  ['DEPARTMENT','TYPE','REF','REF_NO'],
                                        type:   ['int','int','string|25','int'],
                                        value:  [$scope.Sube,1,$scope.Seri,$scope.Sira]
                                    }

                                    db.GetDataQuery(TmpQuery,function(pData)
                                    {
                                        let ParamData = 
                                        [
                                            CariParam,
                                            $scope.CariPuan,
                                            Math.floor($scope.GenelToplam) * -1,
                                            0,
                                            $scope.CariPuan + (Math.floor($scope.GenelToplam) * -1),
                                            TmpBondA,
                                            $scope.CihazID
                                        ]   

                                        db.ReceiptPrint($scope.SatisList,pTahData,pData,ParamData,'Fis',false,function()
                                        {
                                            $scope.YeniEvrak();
                                            $scope.TxtBarkod = "";
                                            
                                            if(pTip == 0)
                                            {
                                                db.EscposCaseOpen();
                                            }
                                        });
                                    })
                                }
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
                alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                alertify.alert(db.Language($scope.Lang,"Kayıtlı evrak olmadan iade alamazsınız !"));
            }
        }
        ,function(){});
    }
    $scope.BtnKullaniciDegistir = function()
    {   
        alertify.confirm(db.Language($scope.Lang,"Kullanıcı değiştirmek istediğinize eminmisiniz ?"),

        function(){
            alertify.okBtn(db.Language($scope.Lang,'Evet'));
            var url = "index.html";
            $window.location.href = url;
        },
        function(){
            alertify.cancelBtn(db.Language($scope.Lang,'Vazgeç'));
        });
    }
    $scope.BtnSonSatis = function()
    {   
        $("#TbSonSatisListesi").addClass('active');
        $("#TbMain").removeClass('active');

        db.GetData($scope.Firma,'PosSonSatisGetir',[$scope.Sube,$scope.Seri,$scope.SonSatisIlkTarih,$scope.SonSatisSonTarih,$scope.SonSatisOdemeTip],function(PosSonSatis)
        {  
            $scope.SonSatisList = PosSonSatis;
            $("#TblSonSatis").jsGrid({data : $scope.SonSatisList});
            $scope.TxtBarkod = "";
        });
    }    
    $scope.StokListeleEvent = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.BtnStokGridGetir()
        }
    }
    $scope.BtnTahTip = function(pTip,pModal)
    {   
        $scope.TahTip = pTip;

        if(typeof pModal != 'undefined' && pModal == 'KalanOdeme')
        {
            $("#MdlKalanOdeme").modal("hide");
            if($scope.TahTip != 3)
            {
                $scope.BtnAraToplam();    
            }
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
        FocusBarkod = false;
        FirstKey = false;
    }
    $scope.BtnFiyatGuncelle = function()
    {
        $("#MdlFiyatGuncelle").modal("show");
        $scope.TxtFiyatGuncelle = $scope.SatisList[$scope.IslemListeSelectedIndex].PRICE.toString();

        FocusFiyatGuncelle = true;
        FocusBarkod = false;     

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
            alertify.okBtn(db.Language($scope.Lang,"Tamam"));
            alertify.alert(db.Language($scope.Lang,"Satış işlemi yapmadan tahsilat giremezsiniz !"));
            return;
        }

        $("#MdlKartOdeme").modal("show");
        
        $scope.TahTip = 1;
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
        $("#MdlKartOdeme").modal("hide");
        $("#MdlKartYukleniyor").modal("show");        

        db.PaymentSend($scope.ComPorts.OdemePort,$scope.TxtAraToplamTutar);        
    }    
    $scope.BtnKartVazgec = function()
    {
        $("#MdlKartYukleniyor").modal("hide");
    } 
    $scope.BtnKartZorla = function()
    {
        alertify.confirm(db.Language($scope.Lang,'Ödemeyi aldığınıza eminmisiniz ?'), () => 
        {
            $scope.TahTip = 1;

            $("#MdlKartYukleniyor").modal("hide");
            $scope.PosTahInsert(() =>
            {
                if($scope.TahKalan > 0)
                {
                    $("#MdlKalanOdeme").modal("show");
                }
            });
        },() => {});        
    }   
    $scope.BtnTahOnay = function(pCallBack)
    {
        if($scope.TahTip == 0)
        {
            $scope.PosTahInsert(() =>
            {
                if(typeof pCallBack != 'undefined')
                {
                    pCallBack();
                }
            });
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
    $scope.BtnNakitOdeme = function()
    {                
        if($scope.SatisList.length < 1)
        {
            alertify.okBtn(db.Language($scope.Lang,"Tamam"));
            alertify.alert(db.Language($scope.Lang,"Satış işlemi yapmadan tahsilat giremezsiniz !"));
            return;
        }

        $("#MdlNakitOdeme").modal("show");

        $scope.TahTip = 0;
        FocusBarkod = false;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
        FocusKartOdeme = true;

        FirstKey = false;

        TahSonYenile();
    }
    $scope.BtnNakitOdemeOnay = function(pMoney)
    {
        if(typeof pMoney != 'undefined')
        {
            $scope.TxtAraToplamTutar = pMoney
        }

        $("#MdlNakitOdeme").modal("hide");
        $scope.BtnTahOnay(() =>
        {
            if($scope.TahKalan > 0)
            {
                $("#MdlKalanOdeme").modal("show");
            }
        });
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
            alertify.alert(db.Language($scope.Lang,"Miktar 1 den küçük olamaz."))
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
    $scope.BtnYazdir = function(pType)
    {
        let TmpSeri = $scope.SonSatisList[$scope.SonSatisListeSelectedIndex].REF;
        let TmpSira = $scope.SonSatisList[$scope.SonSatisListeSelectedIndex].REF_NO;
        let TmpEvrakTip = $scope.SonSatisList[$scope.SonSatisListeSelectedIndex].TYPE;

        db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,TmpEvrakTip,TmpSeri,TmpSira],function(PosSatisData)
        {   
            db.GetData($scope.Firma,'PosTahGetir',[$scope.Sube,TmpEvrakTip,TmpSeri,TmpSira],function(PosTahData)
            {
                let TmpBondA = ''

                let TmpQuery = 
                {
                    db : $scope.Firma,
                    query:  "SELECT " +
                            "MAX(VAT_TYPE) AS VAT_TYPE," +
                            "VAT AS VAT," +
                            "SUM(HT) AS HT," +
                            "SUM(TVA) AS TVA," +
                            "SUM(TTC) AS TTC," +
                            "MAX(REF_NO) AS TICKET " +
                            "FROM [POS_SALES_VW_01] AS POS " +
                            "WHERE DEPARTMENT = @DEPARTMENT AND TYPE = @TYPE AND REF = @REF AND REF_NO = @REF_NO AND STATUS >= 0 " +
                            "GROUP BY VAT",
                    param:  ['DEPARTMENT','TYPE','REF','REF_NO'],
                    type:   ['int','int','string|25','int'],
                    value:  [$scope.Sube,TmpEvrakTip,TmpSeri,TmpSira]
                }
                
                db.GetDataQuery(TmpQuery,async function(pData)
                {
                    //TICKET GETIRILIYOR
                    TmpQuery = 
                    {
                        db : $scope.Firma,
                        query:  "SELECT TOP 1 CODE AS CODE FROM TICKET WHERE REF = @REF AND REF_NO = @REF_NO AND TYPE = 1",
                        param:  ['REF','REF_NO'],
                        type:   ['string|25','int'],
                        value:  [TmpSeri,TmpSira]
                    }
                    
                    let TmpTicket = await db.GetPromiseQuery(TmpQuery)
                    if(TmpTicket.length > 0)
                    {
                        TmpBondA = TmpTicket[0].CODE 
                    }
                
                    let ParamData = 
                    [
                        CariParam,
                        PosSatisData[0].CUSTOMER_POINT + Math.floor(PosSatisData[0].LOYALTY * 100),
                        Math.floor(db.SumColumn(PosSatisData,"TTC")),
                        Math.floor(PosSatisData[0].LOYALTY * 100),
                        PosSatisData[0].CUSTOMER_POINT + Math.floor(PosSatisData[0].LOYALTY * 100),
                        TmpBondA,
                        $scope.CihazID
                    ]   

                    PosSatisData = SubTotalBuild(PosSatisData);
                    if(pType == 'Repas')
                    {
                        PosSatisData.Repas = $scope.TxtRepasMiktar;
                        $("#MdlRepasGiris").modal("hide");
                    }
                    db.ReceiptPrint(PosSatisData,PosTahData,pData,ParamData,pType,true,()=>{});
                });
            });
        });
    }
    $scope.BtnTeraziManuelGiris = function()
    {
        $scope.Miktar = 1;
        $scope.PosSatisInsert(() =>
        {
            $("#MdlTeraziYukleniyor").modal('hide');
            $scope.TxtBarkod = "";
            $scope.BtnMiktarGuncelle();
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
            alertify.alert(db.Language($scope.Lang,"Dikkat Plu Düzenleme Aktifleştirildi."));
            $scope.Class.BtnEdit = "icon wb-unlock"
        }
        else
        {
            alertify.alert(db.Language($scope.Lang,"Dikkat Plu Düzenleme Devre Dışı Bırakıldı."));
            $scope.Class.BtnEdit = "icon wb-lock"
        }
    }
    $scope.PluGetir = async function(pIndex,pType)
    {    
        $scope.PluIndex = pIndex;
        PluTip = pType;

        if($scope.Class.BtnEdit == "icon wb-unlock")
        {            
            if(pType >= 1 || typeof pType == 'undefined')
            {
                document.getElementById('PluGrup').style = "visibility : visible";
            } 
            else
            {
                document.getElementById('PluGrup').style = "visibility : hidden";
            }                
            console.log(pType)
            if(pType == 0)
            {
                $("#MdlPluEdit").modal("show");
                FocusBarkod = false;
                FocusStok = false;
                FocusPluKodu = false;
                FocusPluAdi = true;        
                FirstKey = false;
            }
            else if(pType == 1)
            {
                $scope.BtnStokListesi('Plu')  
            }
            else if(pType == 2)
            {
                $("#MdlStokGrupListele").modal("show");
                FirstKey = false;
                FocusStokGrup = true;
                FocusBarkod = false;
            }          
        }
        else
        {
            if(pType == 0)
            {
                db.GetData($scope.Firma,'PosPluGetir',[$scope.Kullanici,-1,pIndex,pType],function(PluData)
                {                    
                    if(PluData.length > 0)
                    {
                        $scope.PluGrupIndex = PluData[0].GRUP_INDEX;
                        db.GetData($scope.Firma,'PosPluGetir',[$scope.Kullanici,-1,PluData[0].GRUP_INDEX,'1,2'],function(PluData)
                        {
                            $scope.PluList = PluData;
                        });
                    }
                });
            }
            else if (pType == 1)
            {
                if($scope.TxtBarkod.indexOf('*') > -1)
                    $scope.TxtBarkod = $scope.TxtBarkod + $scope.PluList.find(x => x.LOCATION == pIndex && x.TYPE == 1).ITEMS_CODE;
                else
                    $scope.TxtBarkod = $scope.PluList.find(x => x.LOCATION == pIndex && x.TYPE == 1).ITEMS_CODE;

                $scope.StokGetir($scope.TxtBarkod);
            }
            else if(pType == 2)
            {
                if(typeof $scope.PluStokGrupList == 'undefined')
                {
                    db.GetData($scope.Firma,'PosPluStokGrupGetir',[$scope.PluList.find(x => x.LOCATION == pIndex && x.TYPE == 2).ITEMS_CODE,''],function(PluData)
                    {
                        $scope.PluStokGrupStartIndex = 0
                        $scope.PluStokGrupEndIndex = 24
                        $scope.PluStokGrupList = PluData
                        $scope.PagePluStokGrupList = $scope.PluStokGrupList.slice($scope.PluStokGrupStartIndex,$scope.PluStokGrupEndIndex);
    
                        $("#TbPluStokGrup").addClass('active');
                        $("#TbMain").removeClass('active');
                    });
                }
                else
                {
                    $scope.PluStokGrupStartIndex = 0
                    $scope.PluStokGrupEndIndex = 24
                    $scope.PagePluStokGrupList = $scope.PluStokGrupList.slice($scope.PluStokGrupStartIndex,$scope.PluStokGrupEndIndex);

                    $("#TbPluStokGrup").addClass('active');
                    $("#TbMain").removeClass('active');
                }
            }
        }
    }
    $scope.BtnPluKaydet = async function()
    {
        if(document.getElementById('PluGrup').style.visibility == 'visible')
        {
            if($scope.PluGrupIndex.toString() == "")
            {
                alertify.alert(db.Language($scope.Lang,'Lütfen önce grup tanımlayınız !'))
                return;
            }
        }
        else
        {
            $scope.PluGrupIndex = $scope.PluIndex
        }

        let PluData = await db.GetPromiseTag($scope.Firma,'PosPluGetir',[$scope.Kullanici,$scope.PluIndex,$scope.PluGrupIndex,PluTip])
            
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
                PluTip, //TYPE
                $scope.PluStokKod,//ITEMS CODE
                $scope.PluGrupIndex  //GRUPINDEX
            ]

            db.ExecuteTag($scope.Firma,'PosPluInsert',InsertData,function(InsertResult)
            {
                if(typeof(InsertResult.result.err) == 'undefined')
                {   
                    alert(db.Language($scope.Lang,"Kayıt İşlemi Başarıyla Gerçekleşti."))
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
            db.ExecuteTag($scope.Firma,'PosPluUpdate',[$scope.PluGrupAdi,$scope.PluStokKod,PluTip,$scope.PluIndex,$scope.PluGrupIndex],function(InsertResult)
            {
                if(typeof(InsertResult.result.err) == 'undefined')
                {   
                    alert(db.Language($scope.Lang,"Güncelleme İşlemi Başarıyla Gerçekleşti."))
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

        // if($scope.DivPlu) //GRUP INSERT Mİ PLU İNSERT Mİ İŞLEMİNİ BURADAN ANLIYORUZ.
        // {
        //     if($scope.PluGrupIndex.toString() == "")
        //     {
        //         alertify.alert('Lütfen önce grup tanımlayınız !')
        //         return;
        //     }

        //     let PluData = await db.GetPromiseTag($scope.Firma,'PosPluGetir',[$scope.Kullanici,$scope.PluIndex,$scope.PluGrupIndex,1])
            
        //     if(PluData.length == 0)
        //     {
        //         let TmpType = 1;
                
        //         if($scope.PluStokGrup == true)
        //         {
        //             TmpType = 2;
        //         }

        //         let InsertData = 
        //         [
        //             $scope.Kullanici,
        //             $scope.Kullanici,
        //             $scope.Tarih,
        //             $scope.Tarih,
        //             $scope.PluGrupAdi,
        //             $scope.PluIndex,
        //             TmpType, //TYPE
        //             $scope.PluStokKod,//ITEMS CODE
        //             $scope.PluGrupIndex  //GRUPINDEX
        //         ]
    
        //         db.ExecuteTag($scope.Firma,'PosPluInsert',InsertData,function(InsertResult)
        //         {
        //             if(typeof(InsertResult.result.err) == 'undefined')
        //             {   
        //                 alert("Kayıt İşlemi Başarıyla Gerçekleşti.")
        //                 $("#MdlPluEdit").modal("hide");
        //                 $scope.PluGrupAdi = "";
        //                 $scope.PluIndex = "";
        //                 $scope.PluStokKod = "";
        //                 $scope.YeniEvrak();
        //             }
        //             else
        //             {
        //                 console.log(InsertResult.result.err);
        //             }
        //         });
        //     }
        //     else
        //     {
        //         db.ExecuteTag($scope.Firma,'PosPluUpdate',[$scope.PluGrupAdi,$scope.PluStokKod,1,$scope.PluIndex,PluData[0].GRUP_INDEX],function(InsertResult)
        //         {
        //             if(typeof(InsertResult.result.err) == 'undefined')
        //             {   
        //                 alert("Güncelleme İşlemi Başarıyla Gerçekleşti.")
        //                 $("#MdlPluEdit").modal("hide");
        //                 $scope.PluGrupAdi = "";
        //                 $scope.PluIndex = "";
        //                 $scope.PluStokKod = "";
        //                 $scope.YeniEvrak();
        //             }
        //             else
        //             {
        //                 console.log(InsertResult.result.err);
        //             }
        //         });
        //     }
        // }
        // else
        // {            
        //     let PluData = await db.GetPromiseTag($scope.Firma,'PosPluGetir',[$scope.Kullanici,-1,$scope.PluIndex,0])
        //     if(PluData.length == 0)
        //     {                
        //         let InsertData = 
        //         [
        //             $scope.Kullanici,
        //             $scope.Kullanici,
        //             $scope.Tarih,
        //             $scope.Tarih,
        //             $scope.PluGrupAdi,
        //             $scope.PluIndex,
        //             0, //TYPE
        //             '',//ITEMS CODE
        //             $scope.PluIndex  //GRUPINDEX
        //         ]
    
        //         db.ExecuteTag($scope.Firma,'PosPluInsert',InsertData,function(InsertResult)
        //         {
        //             if(typeof(InsertResult.result.err) == 'undefined')
        //             {   
        //                 alert("Kayıt İşlemi Başarıyla Gerçekleşti.")
        //                 $("#MdlPluEdit").modal("hide");
        //                 $scope.PluGrupAdi = "";
        //                 $scope.PluIndex = "";
        //                 $scope.YeniEvrak();
        //             }
        //             else
        //             {
        //                 console.log(InsertResult.result.err);
        //             }
        //         });
        //     }
        //     else
        //     {
        //         db.ExecuteTag($scope.Firma,'PosPluGrupUpdate',[$scope.PluGrupAdi,'',$scope.PluIndex,0,$scope.PluIndex],function(InsertResult)
        //         {
        //             if(typeof(InsertResult.result.err) == 'undefined')
        //             {   
        //                 alert("Güncelleme İşlemi Başarıyla Gerçekleşti.")
        //                 $("#MdlPluEdit").modal("hide");
        //                 $scope.PluGrupAdi = "";
        //                 $scope.PluIndex = "";
        //                 $scope.YeniEvrak();
        //             }
        //             else
        //             {
        //                 console.log(InsertResult.result.err);
        //             }
        //         });
        //     }
        // }
    }
    $scope.BtnPluStokGrupNext = function()
    {   
        if($scope.PluStokGrupEndIndex + 24 > $scope.PluStokGrupList.length)
        {
            $scope.PluStokGrupStartIndex += 24
            $scope.PluStokGrupEndIndex = $scope.PluStokGrupList.length;
            $scope.PagePluStokGrupList = $scope.PluStokGrupList.slice($scope.PluStokGrupStartIndex,$scope.PluStokGrupEndIndex);
        }
        else if($scope.PluStokGrupEndIndex + 24 <= $scope.PluStokGrupList.length)
        {
            $scope.PluStokGrupStartIndex += 24
            $scope.PluStokGrupEndIndex = $scope.PluStokGrupStartIndex + 24;
            $scope.PagePluStokGrupList = $scope.PluStokGrupList.slice($scope.PluStokGrupStartIndex,$scope.PluStokGrupEndIndex);
        }
    }
    $scope.BtnPluStokGrupLast = function()
    {
        if($scope.PluStokGrupStartIndex - 24 >= 0)
        {
            $scope.PluStokGrupStartIndex -= 24
            $scope.PluStokGrupEndIndex = $scope.PluStokGrupStartIndex + 24;
            $scope.PagePluStokGrupList = $scope.PluStokGrupList.slice($scope.PluStokGrupStartIndex,$scope.PluStokGrupEndIndex);
        }
    }
    $scope.BtnPluStokHarfGetir = function(pKey)
    {   
        db.GetData($scope.Firma,'PosPluStokGrupGetir',[$scope.PluList.find(x => x.LOCATION == $scope.PluIndex && x.TYPE == 2).ITEMS_CODE,pKey],function(PluData)
        {
            $scope.PluStokGrupStartIndex = 0
            $scope.PluStokGrupEndIndex = 24
            $scope.PluStokGrupList = PluData
            $scope.PagePluStokGrupList = $scope.PluStokGrupList.slice($scope.PluStokGrupStartIndex,$scope.PluStokGrupEndIndex);
            

            $("#TbPluStokGrup").addClass('active');
            $("#TbMain").removeClass('active');
        });
    }
    $scope.PluStokGrupGetir = function(pBarkod)
    {
        $("#TbMain").addClass('active');
        $("#TbPluStokGrup").removeClass('active');
        
        if($scope.TxtBarkod.indexOf('*') > -1)
            $scope.TxtBarkod = $scope.TxtBarkod + pBarkod;    
        else
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
    $scope.BtnTRDetay = function(pSeri,pSira)
    {
        let TmpSeri = $scope.Seri;
        let TmpSira = $scope.Sira;

        if(typeof pSeri != 'undefined' || typeof pSira != 'undefined')
        {
            TmpSeri = pSeri;
            TmpSira = pSira;
        }
        db.GetData($scope.Firma,'TicketGetir',[TmpSeri,TmpSira],function(Data)
        {
            $scope.TRDetayListe = Data;
            if(Data.length > 0)
            {
                $("#TblTRDetay").jsGrid({data : $scope.TRDetayListe});
                $('#MdlAraToplam').modal('hide');
                $('#MdlSonSatisTahGuncelle').modal('hide')
                $('#MdlTRDetay').modal('show');
            }
        });
    }
    $scope.BtnSonTahTip = function(pTip)
    {
        FirstKey = false;
        if(pTip == 0)
        {
            const index = $scope.SonSatisTahDetayList.indexOf($scope.SonSatisTahDetayList[SonTahIndex]);
            if (index > -1) 
            {
                $scope.SonSatisTahDetayList.splice(index, 1);
            }
        }
        else if(pTip == 1)
        {
            $scope.SonSatisTahDetayList[SonTahIndex].AMOUNT = parseFloat($scope.TxtSonTahGuncelle);
            $scope.SonSatisTahDetayList[SonTahIndex].TYPENO = $scope.TahTip;
    
            if($scope.TahTip == 0)
            {
                $scope.SonSatisTahDetayList[SonTahIndex].TYPE = 'ESC';
            }
            else if($scope.TahTip == 1)
            {
                $scope.SonSatisTahDetayList[SonTahIndex].TYPE = 'CB';
            }
            else if($scope.TahTip == 2)
            {
                $scope.SonSatisTahDetayList[SonTahIndex].TYPE = 'Chq';
            }
            else if($scope.TahTip == 3)
            {
                $scope.SonSatisTahDetayList[SonTahIndex].TYPE = 'CHQe';
            }
        }
        else if(pTip == 2)
        {
            let TmpData =
            {
                AMOUNT : parseFloat($scope.TxtSonTahGuncelle),
                TYPENO : $scope.TahTip
            }
            
            $scope.SonSatisTahDetayList.push(TmpData);

            $scope.SonSatisTahDetayList[$scope.SonSatisTahDetayList.length - 1].AMOUNT = parseFloat($scope.TxtSonTahGuncelle);
            $scope.SonSatisTahDetayList[$scope.SonSatisTahDetayList.length - 1].TYPENO = $scope.TahTip;
    
            if($scope.TahTip == 0)
            {
                $scope.SonSatisTahDetayList[$scope.SonSatisTahDetayList.length - 1].TYPE = 'ESC';
            }
            else if($scope.TahTip == 1)
            {
                $scope.SonSatisTahDetayList[$scope.SonSatisTahDetayList.length - 1].TYPE = 'CB';
            }
            else if($scope.TahTip == 2)
            {
                $scope.SonSatisTahDetayList[$scope.SonSatisTahDetayList.length - 1].TYPE = 'Chq';
            }
            else if($scope.TahTip == 3)
            {
                $scope.SonSatisTahDetayList[$scope.SonSatisTahDetayList.length - 1].TYPE = 'CHQe';
            }
        }
        
        $scope.SonTahDetayKalan = $scope.SonSatisList[$scope.SonSatisListeSelectedIndex].TTC - db.SumColumn($scope.SonSatisTahDetayList,"AMOUNT")

        $("#TblSonSatisTahDetay,#TblSonSatisTahDetay").each(function()
        {
            $(this).jsGrid({data : $scope.SonSatisTahDetayList});
        });
    }
    $scope.BtnSonTahKaydet = async function()
    {
        $('#MdlSonSatisTahGuncelle').modal('hide');

        if(db.SumColumn($scope.SonSatisTahDetayList,"AMOUNT").toDigit2() == $scope.SonSatisList[$scope.SonSatisListeSelectedIndex].TTC)
        {
            TmpQuery = 
            {
                db : $scope.Firma,
                query:  "DELETE FROM POS_PAYMENT WHERE REF = @REF AND REF_NO = @REF_NO",
                param:  ['REF','REF_NO'],
                type:   ['string|25','int'],
                value:  [$scope.SonSatisDetayList[0].REF,$scope.SonSatisDetayList[0].REF_NO]
            }

            await db.ExecutePromiseQuery(TmpQuery);

            for (let i = 0; i < $scope.SonSatisTahDetayList.length; i++) 
            {

                let InsertData = 
                [
                    $scope.Kullanici,
                    $scope.Kullanici,
                    $scope.SonSatisDetayList[0].DEVICE,
                    $scope.SonSatisDetayList[0].DEPARTMENT,
                    $scope.SonSatisTahDetayList[i].TYPENO,
                    $scope.SonSatisDetayList[0].TYPE, //EVRAKTIP
                    moment($scope.SonSatisDetayList[0].DOC_DATE).format("DD.MM.YYYY"),
                    $scope.SonSatisDetayList[0].REF,
                    $scope.SonSatisDetayList[0].REF_NO,
                    $scope.SonSatisDetayList[0].CUSTOMER_CODE,
                    "",
                    $scope.SonSatisTahDetayList[i].AMOUNT,
                    0,//TahParaUstu,
                    1
                ];

                await db.ExecutePromiseTag($scope.Firma,'PosTahInsert',InsertData);
            }
        }
        else
        {
            db.GetData($scope.Firma,'PosSonSatisTahDetayGetir',[$scope.Sube,$scope.SonSatisList[$scope.SonSatisListeSelectedIndex].REF,$scope.SonSatisList[$scope.SonSatisListeSelectedIndex].REF_NO],function(PosSonSatisTahDetay)
            {  
                $scope.SonSatisTahDetayList = PosSonSatisTahDetay;
                
                $("#TblSonSatisTahDetay,#TblSonSatisTahDetay").each(function()
                {
                    $(this).jsGrid({data : $scope.SonSatisTahDetayList});
                });
            });
            alertify.alertdb.Language($scope.Lang,("Girilen tutar hatalıdır !"))
        }
    }
    $scope.BtnCariDegistir = function()
    {
        if($scope.CariKodu != CariParam)
        {
            alertify.okBtn(db.Language($scope.Lang,'Evet'));
            alertify.cancelBtn(db.Language($scope.Lang,'Hayır'));

            alertify.confirm(db.Language($scope.Lang,'Müşteriden çıkış yapmak istiyormusunuz ?'), () => 
            {
                $scope.CariKodu = CariParam
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
            alertify.alert(db.Language($scope.Lang,"Satış yapmadan puan kullanamazsınız !"));
            return;
        }
        if($scope.CariPuan == 0)
        {
            alertify.alert(db.Language($scope.Lang,"Kullanılacak puan yok !"));
            return;
        }

        $('#MdlSadakatIndirim').modal('show');

        $scope.TxtSadakatIndirim = $scope.CariPuan - $scope.CariKullanPuan;
        
        FirstKey = false;
        FocusSadakatIndirim = true;
        FocusBarkod = false;
    }
    $scope.BtnSadakatIndirimOnay = function()
    {
        let TmpPuanTutar = $scope.TxtSadakatIndirim / 100;
        if($scope.TxtSadakatIndirim > ($scope.CariPuan - $scope.CariKullanPuan))
        {
            FirstKey = false;
            alertify.alert(db.Language($scope.Lang,"Girdiğiniz puan mevcut puandan fazla olamaz !"));
            return;
        }
        if(TmpPuanTutar > $scope.GenelToplam)
        {
            FirstKey = false;
            alertify.alert(db.Language($scope.Lang,"Girdiğiniz puan satış tutarından fazla olamaz !"));
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
            });
        });        
    }
    $scope.BtnIskonto = function()
    {   
        if($scope.SatisList.length > 0)
        {
            $('#MdlIskonto').modal('show');

            FirstKey = false;
            FocusIskontoYuzde = true;
            FocusIskontoTutar = false;        
            FocusBarkod = false;     

            IskontoTip = "Evrak";

            document.getElementById("RdEvrakIskonto").checked = true;
            $window.document.getElementById("TxtIskontoYuzde").focus();

            $scope.TxtIskontoSatisOnce = db.SumColumn($scope.SatisList,"TTC") + db.SumColumn($scope.SatisList,"DISCOUNT");
            $scope.TxtIskontoTutar = db.SumColumn($scope.SatisList,"DISCOUNT");
            $scope.TxtIskontoYuzde = parseFloat(($scope.TxtIskontoTutar / $scope.TxtIskontoSatisOnce) * 100).toFixed(3)
            $scope.TxtIskontoSatisSonra = db.SumColumn($scope.SatisList,"TTC");
        }
    }
    $scope.BtnRdIskontoTip = function(pTip)
    {
        IskontoTip = pTip
        if(pTip == 'Evrak')
        {
            $scope.TxtIskontoSatisOnce = db.SumColumn($scope.SatisList,"TTC") + db.SumColumn($scope.SatisList,"DISCOUNT");
            $scope.TxtIskontoTutar = db.SumColumn($scope.SatisList,"DISCOUNT");
            $scope.TxtIskontoYuzde = parseFloat(($scope.TxtIskontoTutar / $scope.TxtIskontoSatisOnce) * 100).toFixed(3)
            $scope.TxtIskontoSatisSonra = db.SumColumn($scope.SatisList,"TTC");
        }
        else
        {
            $scope.TxtIskontoSatisOnce = $scope.SatisList[$scope.IslemListeSelectedIndex].TTC + $scope.SatisList[$scope.IslemListeSelectedIndex].DISCOUNT;
            $scope.TxtIskontoTutar = $scope.SatisList[$scope.IslemListeSelectedIndex].DISCOUNT;
            $scope.TxtIskontoYuzde = parseFloat(($scope.TxtIskontoTutar / $scope.TxtIskontoSatisOnce) * 100).toFixed(3)
            $scope.TxtIskontoSatisSonra = $scope.SatisList[$scope.IslemListeSelectedIndex].TTC;
        }
            
    }
    $scope.TxtIskontoYuzdeFocus = function()
    {
        FirstKey = false;
        FocusIskontoYuzde = true;
        FocusIskontoTutar = false;

        $window.document.getElementById("TxtIskontoYuzde").focus();
    }
    $scope.TxtIskontoTutarFocus = function()
    {
        FirstKey = false;
        FocusIskontoTutar = true;
        FocusIskontoYuzde = false;
        $window.document.getElementById("TxtIskontoTutar").focus();
    }
    $scope.$watch('TxtIskontoYuzde', function TxtIskontoYuzde(pNew, pOld) 
    {
        if (pNew !== pOld) 
        {
            if(FocusIskontoYuzde)
            {
                if(pNew == "")
                {
                    pNew = 0;
                }                    
                $scope.TxtIskontoTutar = parseFloat($scope.TxtIskontoSatisOnce * (pNew / 100)).toDigit2();
                $scope.TxtIskontoSatisSonra = parseFloat($scope.TxtIskontoSatisOnce - $scope.TxtIskontoTutar).toDigit2();
            }
        }
    });
    $scope.$watch('TxtIskontoTutar', function TxtIskontoTutar(pNew, pOld) 
    {
        if (pNew !== pOld) 
        {
            if(FocusIskontoTutar)
            {
                if(pNew == "")
                {
                    pNew = 0;
                }  
                $scope.TxtIskontoYuzde = parseFloat((pNew / $scope.TxtIskontoSatisOnce) * 100).toFixed(3)
                $scope.TxtIskontoSatisSonra = parseFloat($scope.TxtIskontoSatisOnce - $scope.TxtIskontoTutar).toDigit2();
            }
        }
    });
    $scope.BtnIskontoKaydet = function()
    {
        if($scope.TxtIskontoTutar <= 0 || $scope.TxtIskontoYuzde <= 0)
        {
            alertify.alert(db.Language($scope.Lang,"Sıfır İskonto Yapılamaz.!"));
            return;
        }
        if($scope.TxtIskontoSatisSonra < 0)
        {
            alertify.alert(db.Language($scope.Lang,"Tutardan Fazla İskonto Yapılamaz.!"));
            return;
        }
        
        if(IskontoTip == 'Evrak')
        {
            for (let i = 0; i < $scope.SatisList.length; i++) 
            {
                if($scope.SatisList[i].GUID != "")
                {
                    let TmpDiscount = parseFloat($scope.SatisList[i].TTC * ($scope.TxtIskontoYuzde / 100));
                    db.ExecuteTag($scope.Firma,'PosSatisIskonto',[TmpDiscount,$scope.SatisList[i].GUID]);
                }
            }

            db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisData)
            {   
                db.GetData($scope.Firma,'PosFisSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisFisData)
                {  
                    InsertFisYenile(PosSatisFisData);   
                }); 
                InsertSonYenile(PosSatisData);      
                $scope.IslemListeRowClick($scope.IslemListeSelectedIndex,$scope.SatisList[$scope.IslemListeSelectedIndex]);  

                $('#MdlIskonto').modal('hide');
            });
        }
        else
        {
            if($scope.SatisList[$scope.IslemListeSelectedIndex].GUID == "")
            {
                return
            }
            db.ExecuteTag($scope.Firma,'PosSatisIskonto',[$scope.TxtIskontoTutar,$scope.SatisList[$scope.IslemListeSelectedIndex].GUID],function(pData)
            {   
                db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisData)
                {   
                    db.GetData($scope.Firma,'PosFisSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisFisData)
                    {  
                        InsertFisYenile(PosSatisFisData);   
                    }); 
                    InsertSonYenile(PosSatisData);      
                    $scope.IslemListeRowClick($scope.IslemListeSelectedIndex,$scope.SatisList[$scope.IslemListeSelectedIndex]);  

                    $('#MdlIskonto').modal('hide');
                });
            });
        }
    }
    $scope.BtnIskontoTemizle = function()
    {
        for (let i = 0; i < $scope.SatisList.length; i++) 
        {
            if($scope.SatisList[i].GUID != "")
            {
                db.ExecuteTag($scope.Firma,'PosSatisIskonto',[0,$scope.SatisList[i].GUID]);            
            }
        }

        db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisData)
        {   
            db.GetData($scope.Firma,'PosFisSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisFisData)
            {  
                InsertFisYenile(PosSatisFisData);   
            }); 
            InsertSonYenile(PosSatisData);      
            $scope.IslemListeRowClick($scope.IslemListeSelectedIndex,$scope.SatisList[$scope.IslemListeSelectedIndex]);  

            $('#MdlIskonto').modal('hide');
        });
    }
    $scope.BtnAvansTip = function(pTip)
    {
        if(pTip == 0){$scope.AvansTip = 2;}else{$scope.AvansTip = 3;}
    }
    $scope.BtnAvans = function()
    {
        $("#MdlAvans").modal("show");
        FirstKey = false;        
        FocusAvans = true;
        FocusBarkod = false;
        $scope.TxtAvans = 0;
    }
    $scope.BtnAvansKaydet = function()
    {
        if($scope.TxtAvans <= 0)
        {
            alertify.alert(db.Language($scope.Lang,"Tutar sıfır girilemez !"));
            return;
        }

        let InsertData = 
        [
            $scope.Kullanici,
            $scope.Kullanici,
            $scope.CihazID,
            $scope.Sube,
            0, //SATIŞ TİPİ(NAKİT-KREDİ KARTI)
            $scope.AvansTip, //EVRAKTIP
            $scope.Tarih,
            $scope.Seri,
            $scope.Sira,
            "", //CUSTOMER CODE
            "",
            $scope.TxtAvans,
            0, //CHANGE
            2 //STATUS
        ];

        db.ExecuteTag($scope.Firma,'PosTahInsert',InsertData);
        $("#MdlAvans").modal("hide");        
    }
    $scope.PluGrupKoduFocus = function()
    {
        FirstKey = false;
        FocusPluKodu = true;
        FocusPluAdi = false;

    }
    $scope.PluGrupAdiFocus = function()
    {
        FirstKey = false;
        FocusPluAdi = true;
        FocusPluKodu = false;
    }
    $scope.BtnXReport = async function()
    {
        let TmpData = await db.ExecutePromiseTag($scope.Firma,'XRaporGetir',[$scope.CihazID]);
        db.XReportPrint(TmpData.result.recordsets)
        
    }
    $scope.BtnCikis = function()
    {
        alertify.confirm(db.Language($scope.Lang,"Çıkmak istediğinize eminmisiniz"),
        () => 
        {
            $window.location.href = "index.html";
        });
    }    
    $scope.BtnTeraziFiyatGonder = function()
    {
        if($scope.TxtTeraziFiyat > 0)
        {
            $scope.Stok[0].PRICE = $scope.TxtTeraziFiyat;
            $("#MdlTeraziFiyat").modal("hide");
            $("#MdlTeraziYukleniyor").modal("show");
            db.ScaleSend($scope.ComPorts.TeraziPort,$scope.Stok[0].PRICE,(pResult) =>
            {
                console.log(pResult)
                if(pResult.Type == "02")
                {
                    setTimeout(()=> {$("#MdlTeraziYukleniyor").modal("hide");},500); 
                    $scope.Miktar = pResult.Result.Scale;
                    $scope.PosSatisInsert();
                }
            });
        }
    }
    $scope.BtnRefresh = function()
    {
        window.location.reload();
    }
    $scope.BtnRepasGiris = function()
    {
        $("#MdlRepasGiris").modal("show");
        $scope.TxtRepasMiktar = 0

        FocusRepasMiktar = true;
        FocusBarkod = false;
        FirstKey = false;
    }
    $scope.BtnSubTotal = async function()
    {
        let TmpMax = db.MaxColumn($scope.SatisList,"SUBTOTAL") + 1;
         
        for(let i = 0;i < $scope.SatisList.length;i++)
        {
            if($scope.SatisList[i].SUBTOTAL == 0)
            {
                let TmpQuery = 
                {
                    db : $scope.Firma,
                    query:  "UPDATE POS_SALES SET SUBTOTAL = @SUBTOTAL WHERE GUID = @GUID",
                    param:  ['SUBTOTAL','GUID'],
                    type:   ['int','string'],
                    value:  [TmpMax,$scope.SatisList[i].GUID]
                }
                        
                await db.GetPromiseQuery(TmpQuery)
            }
        }

        db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],(pData)=>
        {
            InsertSonYenile(pData)
        })
    }
    $scope.BtnTicketPay = function()
    {
        if($scope.SatisList.length == 0)
        {
            alertify.alert(db.Language($scope.Lang,"Satış olmadan ödeme alamazsınız !"));
            return;
        }

        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT CODE AS CODE, AMOUNT AS AMOUNT FROM TICKET WHERE REF = @REF AND REF_NO = @REF_NO ORDER BY LDATE DESC",
            param:  ['REF','REF_NO'],
            type:   ['string|25','int'],
            value:  [$scope.Seri,$scope.Sira]
        }
        db.GetDataQuery(TmpQuery,function(pTicketData)
        {
            if(pTicketData.length > 0)
            {
                $scope.TicketPayListe = pTicketData;
                $scope.TicketSonTutar = $scope.TicketPayListe[0].AMOUNT;
                $scope.TicketTopTutar = parseFloat(db.SumColumn($scope.TicketPayListe,"AMOUNT")).toDigit2()
                
                $("#TblTicketPay").jsGrid({data : $scope.TicketPayListe});
            }
            else
            {
                $scope.TicketPayListe = [];
                $scope.TicketSonTutar = 0;
                $scope.TicketTopTutar = 0;
                $("#TblTicketPay").jsGrid({data : $scope.TicketPayListe});
            }

            $("#MdlTicketPay").modal("show");
            FocusTicketBarkod = true;
            FocusBarkod = false;
        });        
    }
}