function PosSatisCtrl($scope,$window,db)
{
    let IslemSelectedRow = null;
    let CariSelectedRow = null;
    let StokSelectedRow = null;
    let ParkIslemSelectedRow = null;
    let TahIslemSelectedRow = null;
    let SonSatisSelectedRow = null;
    let FocusBarkod = true;
    let FocusAraToplam = false;
    let FocusMusteri = false;
    let FocusStok = false;
    let UserParam = null;

    $('#MdlAraToplam').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
    });
    $('#MdlMusteriListele').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
    });
    $('#MdlStokListele').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
    });
    $('#MdlIadeGetir').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusStok = false;
    });
    function Init()
    {
        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.Firma = $window.sessionStorage.getItem('Firma');

        $scope.Kullanici = UserParam.Kullanici
        $scope.Seri = "";
        $scope.TahSeri = "";
        $scope.Sira = 0;
        $scope.TahSira = 0;
        $scope.EvrakTip = 0;
        $scope.CariKodu = "";
        $scope.CariAdi = "";
        $scope.Tarih = new Date().toLocaleDateString('tr-TR',{ year: 'numeric', month: 'numeric', day: 'numeric' });
        $scope.Sube = "0";
        $scope.TxtBarkod = "";
        $scope.AraToplam = 0;
        $scope.ToplamKdv = 0;
        $scope.ToplamIskonto = 0;
        $scope.GenelToplam = 0;
        $scope.ToplamMiktar = 0;
        $scope.ParkIslemSayisi = 0;

        $scope.TahPanelKontrol = false;
       
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

        $scope.CariListe = [];
        $scope.StokListe = [];
        $scope.Stok = [];
        $scope.PluList = [];
        $scope.PluGrpList = [];
        $scope.SatisList = []; 
        $scope.TahList = [];   
        $scope.ParkList =[];     
        $scope.SonSatisList = [];
        $scope.SonSatisDetayList = [];

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
            fields: 
            [
                {
                    name: "KODU",
                    type: "number",
                    align: "center",
                    width: 100
                    
                },
                {
                    name: "UNVAN1",
                    type: "text",
                    align: "center",
                    width: 300
                },
                {
                    name: "BAKIYE",
                    type: "number",
                    align: "center",
                    width: 75
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
                    name: "KODU",
                    type: "number",
                    align: "center",
                    width: 100
                    
                },
                {
                    name: "ADI",
                    type: "text",
                    align: "center",
                    width: 300
                },
                {
                    name: "FIYAT",
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
    function InitIslemGrid()
    {   
        $("#TblIslem").jsGrid({
            responsive: true,
            width: "100%",
            height: "385px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.SatisList,
            rowClass: function (item, itemIndex)
            {
                return "rowheight";
            },
            fields: 
            [{
                name: "MIKTAR",
                title: "MIKTAR",
                type: "number",
                align: "center",
                width: 60
            }, 
            {
                name: "BIRIM",
                title: "BIRIM",
                type: "text",
                align: "center",
                width: 50
            }, 
            {
                name: "SADI",
                title: "ADI",
                type: "text",
                align: "center",
                width: 100,
                itemTemplate: function(value,item)
                {
                    return "<div style='white-space: nowrap;overflow: hidden;text-overflow: ellipsis;'>" + value + "</div>";
                }
            },
            {
                name: "FIYAT",
                title: "FIYAT",
                type: "number",
                align: "center",
                width: 60
            },
            {
                name: "TUTAR",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 60
            },
            {
                name: "BARKOD",
                title: "BARKOD",
                type: "number",
                align: "center",
                width: 75
            }],
            rowClick: function(args)
            {
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
            height: "150px",
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
                name: "STIP",
                title: "TIP",
                type: "number",
                align: "center",
                width: 60
            }, 
            {
                name: "TUTAR",
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
                name: "KULLANICI",
                title: "KULLANICI",
                type: "text",
                align: "center",
                width: 75
            },
            {
                name: "TARIH",
                title: "TARIH",
                type: "number",
                align: "center",
                width: 75
            },
            {
                name: "SERI",
                title: "SERI",
                type: "text",
                align: "center",
                width: 50
            }, 
            {
                name: "SIRA",
                title: "SIRA",
                type: "text",
                align: "center",
                width: 50
            },
            {
                name: "TUTAR",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 60
            },
            {
                name: "TARIH",
                title: "TARIH",
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
            height: "350px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.SonSatisList,
            rowClass: function (item, itemIndex)
            {
                return "rowheight";
            },
            fields: 
            [
            {
                name: "TIP",
                title: "TIP",
                type: "TEXT",
                align: "center",
                width: 75
            },
            {
                name: "SERI",
                title: "SERI",
                type: "TEXT",
                align: "center",
                width: 35
            },
            {
                name: "SIRA",
                title: "SIRA",
                type: "number",
                align: "center",
                width: 35
            },
            {
                name: "SATIR",
                title: "SATIR",
                type: "number",
                align: "center",
                width: 50
            },
            {
                name: "KULLANICI",
                title: "KULLANICI",
                type: "TEXT",
                align: "center",
                width: 75
            },
            {
                name: "MIKTAR",
                title: "MIKTAR",
                type: "number",
                align: "center",
                width: 50
            },
            {
                name: "FIYAT",
                title: "FIYAT",
                type: "number",
                align: "center",
                width: 50
            },
            {
                name: "TUTAR",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 50
            },
            {
                name: "SAAT",
                title: "SAAT",
                type: "date",
                align: "center",
                width: 50
            },
            {
                name: "TARIH",
                title: "TARIH",
                type: "date",
                align: "center",
                width: 50
            },
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
            height: "350px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            
            data : $scope.SonSatisDetayList,
            rowClass: function (item, itemIndex)
            {
                return "rowheight";
            },
            fields: 
            [
            {
                name: "TIP",
                title: "TIP",
                type: "TEXT",
                align: "center",
                width: 75
            },
            {
                name: "SERI",
                title: "SERI",
                type: "TEXT",
                align: "center",
                width: 35
            },
            {
                name: "SIRA",
                title: "SIRA",
                type: "number",
                align: "center",
                width: 35
            },
            {
                name: "MIKTAR",
                title: "MIKTAR",
                type: "number",
                align: "center",
                width: 50
            },
            {
                name: "FIYAT",
                title: "FIYAT",
                type: "number",
                align: "center",
                width: 50
            },
            {
                name: "TUTAR",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 50
            },
            {
                name: "BARKOD",
                title: "BARKOD",
                type: "number",
                align: "center",
                width: 100
            }],
            rowClick: function(args)
            {
                $scope.$apply();
            }
        });
    }
    function InsertSonYenile(pData)
    {    
        $scope.SatisList = pData;
        $("#TblIslem").jsGrid({data : $scope.SatisList});    
        $scope.IslemListeSelectedIndex = 0;
        $scope.TxtBarkod = "";
        
        DipToplamHesapla();
        //$scope.Yukleniyor =  false  
        $window.document.getElementById("TxtBarkod").focus();
    } 
    function DipToplamHesapla()
    {
        $scope.AraToplam = 0;
        $scope.ToplamKdv = 0;
        $scope.GenelToplam = 0;
        $scope.ToplamIskonto = 0;

        angular.forEach($scope.SatisList,function(value)
        {
            $scope.AraToplam += value.MIKTAR * value.FIYAT;
            $scope.ToplamIskonto += value.ISKONTO;
            $scope.ToplamKdv += ((value.MIKTAR * value.FIYAT) - value.ISKONTO) * (value.KDV / 100);            
        });

        $scope.GenelToplam = ($scope.AraToplam - $scope.ToplamIskonto) + $scope.ToplamKdv;
    }
    function TxtBarkodKeyPress()
    {   
        if($scope.TxtBarkod.indexOf("*") != -1)
        {   
            $scope.PosSatisMiktarUpdate($scope.TxtBarkod.split("*")[1]);
        }
        else if($scope.TxtBarkod.indexOf("/") != -1)
        {
            $scope.BtnIskonto($scope.TxtBarkod.split("/")[1]);
        }
        else
        {   
            $scope.StokGetir($scope.TxtBarkod);
        }
    }
    function TahSonYenile()
    {        
        $("#TblTahIslem").jsGrid({data : $scope.TahList}); 
        
        if($scope.OdemeTip == 1)
        {
            if($scope.TahList.length > 0)
            {            
                $scope.TxtAraToplamTutar = "";         
                
                $scope.TahKalan = parseFloat($scope.GenelToplam).toFixed(2) - db.SumColumn($scope.TahList,"TUTAR").toFixed(2);
                $scope.TahParaUstu = db.SumColumn($scope.TahList,"USTU"); 
                $scope.TahIslemListeRowClick($scope.TahList.length-1,$scope.TahList[$scope.TahList.length-1]); 
            }
            else
            {    
                $scope.TahKalan = parseFloat($scope.GenelToplam).toFixed(2);
                $scope.TahParaUstu = 0; 
            }

            $scope.TxtAraToplamTutar = parseFloat($scope.TahKalan).toFixed(2);
        }
        else
        {
            $scope.TxtAraToplamTutar = "";
        }
    }
    document.onkeydown = function(e)
    {
        if($window.location.hash == "#!/POSSatis")
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
            }
            else if(FocusStok == true)
            {
                $window.document.getElementById("TxtStokAra").focus();
            }
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
        if(!$scope.EvrakLock)
        {
            if ( CariSelectedRow ) { CariSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
            var $row = pObj.rowByItem(pItem);
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            CariSelectedRow = $row;
            
            $scope.CariKodu = $scope.CariListe[pIndex].KODU;
            $scope.CariAdi = $scope.CariListe[pIndex].UNVAN1;
        }
    }
    $scope.StokListeRowClick = function(pIndex,pItem,pObj)
    {
        if(!$scope.EvrakLock)
        {
            if ( StokSelectedRow ) { StokSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
            var $row = pObj.rowByItem(pItem);
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            StokSelectedRow = $row;

            $scope.TxtBarkod = $scope.StokListe[pIndex].KODU;
        }
    }
    $scope.SonSatisRowClick = function(pIndex,pItem,pObj)
    {
        if ( SonSatisSelectedRow ) { SonSatisSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = $("#TblSonSatis").jsGrid("rowByItem", pItem);
        
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        SonSatisSelectedRow = $row;
        $scope.SonSatisListeSelectedIndex = pIndex;

         let SonSatisDetay = pItem;
        
        db.GetData($scope.Firma,'PosSonSatisDetayGetir',[$scope.Sube,SonSatisDetay.SERI,SonSatisDetay.SIRA],function(PosSonSatisDetay)
        {  
            $scope.SonSatisDetayList = PosSonSatisDetay;
            $("#TblSonSatisDetay").jsGrid({data : $scope.SonSatisDetayList});
            
        });

        $('#MdlSonSatis').modal('hide');
        $('#MdlSonSatisDetay').modal('show');
    }
    $scope.YeniEvrak = function ()
    {
        Init();
        InitIslemGrid();
        InitParkIslemGrid();
        InitTahIslemGrid();
        InitCariGrid();
        InitStokGrid();
        InitSonSatisGrid();
        InitSonSatisDetayGrid();

        $scope.Seri = UserParam.PosSatis.Seri;
        $scope.TahSeri = UserParam.PosSatis.TahSeri;
        $scope.EvrakTip = UserParam.PosSatis.EvrakTip;
        $scope.CariKodu = UserParam.PosSatis.Cari;
        $scope.Sube = UserParam.PosSatis.Sube;
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
            db.GetData($scope.Firma,'CariGetir',[$scope.CariKodu,''],function(data)
            {
                $scope.CariListe = data;
                $("#TblCari").jsGrid({data : $scope.CariListe});

                let Obj = $("#TblCari").data("JSGrid");
                let Item = Obj.rowByItem(data[0]);
                
                $scope.CariListeRowClick(0,Item,Obj);
            });
        }
        //PLU GRUP GETİR
        db.GetData($scope.Firma,'PluGrpGetir',[$scope.Sube],function(PluGrpData)
        {
            $scope.PluGrpList = PluGrpData;
            if($scope.PluGrpList.length > 0)
            {
                $scope.PluGetir($scope.PluGrpList[0].GRUP);
            }
        });
        //PARKTAKİ ISLEMLER
        db.GetData($scope.Firma,'PosSatisParkListe',[$scope.Sube,$scope.EvrakTip,$scope.Kullanici,0],function(ParkData)
        {   
            $scope.ParkList = ParkData;
            $scope.ParkIslemSayisi = $scope.ParkList.length;

            $("#TblParkIslem").jsGrid({data : $scope.ParkList}); 
        });
        db.MaxSira($scope.Firma,'MaxPosSatisSira',[$scope.Sube,$scope.Seri,$scope.EvrakTip],function(data){$scope.Sira = data});
        db.MaxSira($scope.Firma,'MaxPosTahSira',[$scope.Sube,$scope.TahSeri,$scope.EvrakTip],function(data){$scope.TahSira = data});
    }
    $scope.BtnCariGridGetir = function()
    {
        let Kodu = '';
        let Adi = '';

        if($scope.TxtCariAra != "")
        {
            if($scope.CmbCariAra == "0")
                Kodu = $scope.TxtCariAra;
            else
                Adi = $scope.TxtCariAra;
        }
        
        db.GetData($scope.Firma,'CariListeGetir',[Kodu,Adi],function(data)
        {
            $scope.CariListe = data;      
            $("#TblCari").jsGrid({data : $scope.CariListe});
        });
    }
    $scope.BtnCariGridSec = function()
    {   
        $("#MdlMusteriListele").modal('hide');
        $scope.TxtCariAra = "";
        
        if($scope.CariKodu != UserParam.PosSatis.Cari && $scope.SatisList.length > 0)
        {
            if($scope.TxtAraToplamTutar.length > 0)
            {   
                $('#MdlMusteriListele').modal('hide');
                $scope.BtnAraToplam();
            }
        }
    }
    $scope.BtnStokGridGetir = function()
    {
        let Kodu = '';
        let Adi = '';

        if($scope.CmbStokAra == "0")
        {
            Kodu = $scope.TxtStokAra.replace("*","%").replace("*","%");
        }
        else
        {
            Adi = $scope.TxtStokAra.replace("*","%").replace("*","%");
        }
            
        db.GetData($scope.Firma,'StokGetir',[Kodu,Adi,$scope.Sube],function(StokData)
        {
            $scope.StokListe = StokData;
            $("#TblStok").jsGrid({data : $scope.StokListe});
        });

    }
    $scope.BtnStokGridSec = function()
    {
        $("#MdlStokListele").modal('hide');
        $scope.StokGetir($scope.TxtBarkod);
    }
    $scope.PluGetir = function(pGrup)
    {
        db.GetData($scope.Firma,'PluGetir',[pGrup],function(PluData)
        {
            $scope.PluList = PluData;
        });
    }
    $scope.StokGetir = function(pBarkod)
    {
        if(pBarkod != '')
        {
            db.StokBarkodGetir($scope.Firma,pBarkod,$scope.Sube,function(BarkodData)
            {
                if(BarkodData.length > 0)
                { 
                    $scope.Stok = BarkodData;
                    $scope.Stok[0].FIYAT = 0;
                    $scope.Stok[0].TUTAR = 0;
                    $scope.Stok[0].INDIRIM = 0;
                    $scope.Stok[0].KDV = 0;
                    $scope.Stok[0].TOPTUTAR = 0;

                    if($scope.Stok[0].CARPAN < 0 )
                    {
                        $scope.Stok[0].CARPAN * -1
                    }

                    //**** FİYAT GETİR */

                    $scope.DepoNo = UserParam.PosSatis.Sube

                    let FiyatParam = 
                    {
                        CariKodu : $scope.CariKodu,
                        CariFiyatListe : 1,
                        DepoNo : $scope.DepoNo,
                        OdemeNo : 0,
                        AlisSatis : 1
                    };

                    db.FiyatGetir($scope.Firma,BarkodData,FiyatParam,UserParam.PosSatis,function(pFiyat)
                    {   
                        $scope.Stok[0].FIYAT = pFiyat
                        $scope.Stok[0].TUTAR = ($scope.Stok[0].CARPAN * $scope.Miktar) * $scope.Stok[0].FIYAT;
                        $scope.Stok[0].KDV = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].TOPTANVERGI / 100);
                        $scope.Stok[0].TOPTUTAR = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) + $scope.Stok[0].KDV;
                       
                        $scope.$apply();
                        $scope.PosSatisInsert();
                    });
                }
                else   
                {
                    //$scope.Yukleniyor =  false  
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
        var InsertData = 
        [
            UserParam.Kullanici,
            $scope.Sube,
            $scope.EvrakTip,
            $scope.Tarih,
            $scope.Seri,
            $scope.Sira,
            $scope.CariKodu,
            $scope.Stok[0].KODU,
            $scope.Stok[0].BARKOD,
            $scope.Miktar * $scope.Stok[0].CARPAN,
            $scope.Stok[0].BIRIMPNTR,
            $scope.Stok[0].FIYAT,
            0, //ISKONTO TUTAR 1
            $scope.Stok[0].TOPTANVERGIPNTR,
            0  //DURUM
        ];
        
        db.ExecuteTag($scope.Firma,'PosSatisInsert',InsertData,function(InsertResult)
        {   
            
            if(typeof(InsertResult.result.err) == 'undefined')
            {                                        
                db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisData)
                {   
                    InsertSonYenile(PosSatisData);      
                    $scope.TxtBarkod = ""; 
                    $scope.IslemListeRowClick(0,$scope.SatisList[0]);
                    $scope.ToplamMiktar = db.SumColumn($scope.SatisList,"MIKTAR");                  
                });
            }
            else
            {
                console.log(InsertResult.result.err);
            }
            
        });
    }
    $scope.PosTahInsert = function(pCallBack)
    {   
        let TahTutar = 0
        let TahParaUstu = 0;
        let TahKasa = "";

        if($scope.TahTip == 0)
        {
            TahKasa = UserParam.PosSatis.NakitKasaKodu;
        }
        else if($scope.TahTip == 1)
        {
            TahKasa = UserParam.PosSatis.KrediKartKasa;
        }
        else
        {
            TahKasa = UserParam.PosSatis.AcikHesapKodu;
        }
      

        if($scope.OdemeTip == 1)
        {
            $scope.TahSeri = $scope.Seri;
            $scope.TahSira = $scope.Sira;

            if(parseFloat($scope.TxtAraToplamTutar) <= 0 || parseFloat($scope.TahKalan) <= 0)
            {
                if(typeof(pCallBack) != 'undefined')
                {
                    pCallBack();
                }
                return;
            }
            TahTutar = parseFloat($scope.TxtAraToplamTutar);
            if($scope.GenelToplam < (db.SumColumn($scope.TahList,"TUTAR") + parseFloat($scope.TxtAraToplamTutar)))
            {
                TahParaUstu = parseFloat((db.SumColumn($scope.TahList,"TUTAR") + parseFloat($scope.TxtAraToplamTutar)) - $scope.GenelToplam).toFixed(2);
                TahTutar = parseFloat(parseFloat($scope.TxtAraToplamTutar) - TahParaUstu).toFixed(2);
            }
        }  
        else
        {
            TahTutar = $scope.TxtAraToplamTutar;
        }

        var InsertData = 
        [
            UserParam.Kullanici,
            $scope.Sube,
            $scope.TahTip,
            0, //EVRAKTIP
            $scope.Tarih,
            $scope.TahSeri,
            $scope.TahSira,
            $scope.CariKodu,
            TahKasa,
            TahTutar,
            TahParaUstu,
            1
        ];
            db.ExecuteTag($scope.Firma,'PosTahInsert',InsertData,function(InsertResult)
            {   
                if(typeof(InsertResult.result.err) == 'undefined')
                {                
                    db.GetData($scope.Firma,'PosTahGetir',[$scope.Sube,0,$scope.TahSeri,$scope.TahSira],function(PosTahData)
                    {   
                        $scope.TahList = PosTahData;
                        TahSonYenile();                      
                        $scope.TahPanelKontrol = false;

                        if(typeof(pCallBack) != 'undefined')
                        {
                            pCallBack();
                        }
                    });
                }
                else
                {
                    console.log(InsertResult.result.err);
                    
                    if(typeof(pCallBack) != 'undefined')
                    {
                        pCallBack();
                    }
                }
            }); 
    }
    $scope.PosSatisMiktarUpdate = function(pMiktar)
    {   
        let pIskonto = 0;
        if($scope.SatisList[$scope.IslemListeSelectedIndex].ISKONTO > 0)
        {
            let pOran = $scope.SatisList[$scope.IslemListeSelectedIndex].ISKONTO / ($scope.SatisList[$scope.IslemListeSelectedIndex].MIKTAR * $scope.SatisList[$scope.IslemListeSelectedIndex].FIYAT);
            pIskonto = (pMiktar * $scope.SatisList[$scope.IslemListeSelectedIndex].FIYAT) * pOran;
        }     
        db.GetData($scope.Firma,'PosSatisMiktarUpdate',[pMiktar,pIskonto,$scope.SatisList[$scope.IslemListeSelectedIndex].RECID],function(data)
        {          
            db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisData)
            {                 
                InsertSonYenile(PosSatisData);      
                $scope.IslemListeRowClick(0,$scope.SatisList[0]);  
                $scope.ToplamMiktar = db.SumColumn($scope.SatisList,"MIKTAR")
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
    $scope.BtnSilClick = function()
    {   
        if(FocusBarkod)
        {
            $scope.TxtBarkod = $scope.TxtBarkod.substring(0,$scope.TxtBarkod.length-1);
        }
        else if(FocusAraToplam)
        {
            $scope.TxtAraToplamTutar = $scope.TxtAraToplamTutar.substring(0,$scope.TxtAraToplamTutar.length-1);
        }
        else if(FocusMusteri)
        {
            $scope.TxtCariAra = $scope.TxtCariAra.substring(0,$scope.TxtCariAra.length-1);
        }
        else if(FocusStok)
        {
            $scope.TxtStokAra = $scope.TxtStokAra.substring(0,$scope.TxtStokAra.length-1);
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
            $scope.TxtAraToplamTutar = $scope.TxtAraToplamTutar + Key; 
        }
        else if(FocusMusteri)
        {
            $scope.TxtCariAra = $scope.TxtCariAra + Key; 
        }
        else if(FocusStok)
        {
            $scope.TxtStokAra = $scope.TxtStokAra + Key; 
        }
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
                db.ExecuteTag($scope.Firma,'PosSatisSatirIptal',[$scope.SatisList[$scope.IslemListeSelectedIndex].RECID],function(data)
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
                            db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(data)
                            {
                                $scope.SatisList = data;
                                $("#TblIslem").jsGrid({data : $scope.SatisList});                                    
                                DipToplamHesapla();
                                $scope.TxtBarkod = ""; 
                                $scope.IslemListeRowClick($scope.SatisList.length-1,$scope.SatisList[$scope.SatisList.length-1]);   
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
        $scope.Seri = $scope.ParkList[$scope.ParkIslemListeSelectedIndex].SERI;
        $scope.Sira = $scope.ParkList[$scope.ParkIslemListeSelectedIndex].SIRA;

        db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisData)
        {   
            db.GetData($scope.Firma,'CariGetir',[PosSatisData[0].MKODU,''],function(data)
            {
                $scope.CariAdi = data[0].UNVAN1;
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

            $scope.ToplamMiktar = db.SumColumn($scope.SatisList,"MIKTAR");
        });
    }
    $scope.BtnAraToplam = function(pTip)
    {   
        $scope.OdemeTip = pTip;

        if($scope.OdemeTip == 1 && $scope.SatisList.length < 1)
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
    }
    $scope.BtnStokListesi = function()
    {
        $("#MdlStokListele").modal("show");
        FocusAraToplam = false;
        FocusBarkod = false;
        FocusMusteri = false;
        FocusStok = true;
    }
    $scope.BtnTahSatirIptal = function()
    {
        if($scope.TahIslemListeSelectedIndex > -1)
        {
            db.ExecuteTag($scope.Firma,'PosTahSatirIptal',[$scope.TahList[$scope.TahIslemListeSelectedIndex].RECID],function(data)
            {
                if(typeof(data.result.err) == 'undefined')
                {
                    if($scope.OdemeTip == 0)
                    {
                        $scope.Seri = $scope.TahSeri;
                        $scope.Sira = $scope.TahSira;
                    }
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
    $scope.BtnIadeAl = function()
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Iade almak istediğinize eminmisiniz ?', 
        function()
        { 
            if($scope.SatisList.length > 0)
            {
                 //POS SATIS UPDATE
                 var TmpQuery = 
                 {
                     db : '{M}.' + $scope.Firma,
                     query:  "UPDATE TERP_POS_SATIS SET TIP = 2,DURUM = 1 WHERE SUBE = @SUBE AND TIP = @TIP AND SERI = @SERI AND SIRA = @SIRA",
                     param:  ['SUBE','TIP','SERI','SIRA'],
                     type:   ['int','int','string|25','int'],
                     value:  [$scope.Sube,1,$scope.Seri,$scope.Sira]
                 }

                 db.ExecuteQuery(TmpQuery,function(UpdateResult)
                 {
                    if(typeof(UpdateResult.result.err) == 'undefined')
                    {                       
                        var InsertData = 
                        [
                            UserParam.MikroId,
                            $scope.Sube,
                            0, //TIP
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
    $scope.PosSatisKapatUpdate = function()
    {   
        if($scope.OdemeTip = 1)
        {
            $scope.PosTahInsert(function()
            {   
                $scope.TahPanelKontrol = true;
                if($scope.TahKalan <= 0)
                {
                    db.GetData($scope.Firma,'PosSatisKapatUpdate',[$scope.Sube,$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                    {
                        $('#MdlAraToplam').modal('hide');
                        $scope.YeniEvrak();
                        $scope.TxtBarkod = "";
                        $scope.TahPanelKontrol = false;
                    });
                } 
                else
                {
                    console.log("Kalan Tutarı Kapatınız!");
                }
            });
        }
        else
        {
            $('#MdlAraToplam').modal('hide');
            $scope.YeniEvrak();
            $scope.TxtBarkod = "";
            $scope.TahPanelKontrol = false;
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
        $('#MdlSonSatis').modal('show');

        db.GetData($scope.Firma,'PosSonSatisGetir',[$scope.Sube],function(PosSonSatis)
        {  
            $scope.SonSatisList = PosSonSatis;
            $("#TblSonSatis").jsGrid({data : $scope.SonSatisList});
            $scope.TxtBarkod = "";
        });
    }
    $scope.BtnCikis = function()
    {
        $('#MdlSonSatis').modal('hide');
    }
    $scope.BtnCikiss = function()
    {
        $('#MdlSonSatisDetay').modal('hide');
    }
    $scope.BtnGeri = function()
    {
        $('#MdlSonSatisDetay').modal('hide');
        $('#MdlSonSatis').modal('show');
    }
    $scope.BtnIskonto = function(pIskonto)
    {   
        let tutar = $scope.SatisList[$scope.IslemListeSelectedIndex].FIYAT * $scope.SatisList[$scope.IslemListeSelectedIndex].MIKTAR;
        let hesapla = tutar * (pIskonto / 100);

        if($scope.GenelToplam < hesapla)
        {   
            alertify.alert("Genel Toplamdan Fazla İskonto Yapılamaz.!");
            $scope.TxtBarkod = "";
        }
        else
        {
            db.ExecuteTag($scope.Firma,'PosSatisIskonto',[hesapla,$scope.SatisList[$scope.IslemListeSelectedIndex].RECID],function(pData)
            {   
                db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisData)
                {   
                    InsertSonYenile(PosSatisData);      
                    $scope.IslemListeRowClick(0,$scope.SatisList[0]);  
                });
            });
        }
    }
    $scope.BtnTahTip = function()
    {   
        $scope.TahTip = 2;

        if($scope.CariKodu == UserParam.PosSatis.Cari)
        {   
            $('#MdlAraToplam').modal('hide');
            $('#MdlMusteriListele').modal('show');
        }
    }
}