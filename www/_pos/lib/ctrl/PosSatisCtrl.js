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
    let FocusSeriSira = false;
    let FocusStok = false;
    let UserParam = null;

    $('#MdlAraToplam').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusSeri = false;
        FocusStok = false;
    });
    $('#MdlMusteriListele').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusSeri = false;
        FocusStok = false;
    });
    $('#MdlSeriSira').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false;
        FocusSeri = false;
        FocusStok = false;
    });
    $('#MdlStokListele').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusMusteri = false
        FocusSeri = false;
        FocusStok = false;
    });
    $('#MdlIadeGetir').on('hide.bs.modal', function () 
    {
        FocusBarkod = true;
        FocusAraToplam = false;
        FocusSeri = false;
        FocusMusteri = false;
        FocusStok = false;
    });
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
        $scope.Tarih = new Date().toLocaleDateString('tr-TR',{ year: 'numeric', month: 'numeric', day: 'numeric' });
        $scope.Sube = "0";
        $scope.TxtBarkod = "";
        $scope.AraToplam = 0;
        $scope.ToplamKdv = 0;
        $scope.ToplamIskonto = 0;
        $scope.ToplamFisIskonto = 0;
        $scope.GenelToplam = 0;
        $scope.ToplamMiktar = 0;
        $scope.ToplamSatir = 0;
        $scope.ParkIslemSayisi = 0;
        $scope.CiktiTip = 1;
        
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
        $scope.Stok = [];
        $scope.PluList = [];
        $scope.PluGrpList = [];
        $scope.SatisList = []; 
        $scope.SatisFisList = []; 
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
                },
                {
                    name: "COMPANY",
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
                name: "QUANTITY",
                title: "MIKTAR",
                type: "number",
                align: "center",
                width: 60
            },
            {
                name: "UNIT",
                title: "BIRIM",
                type: "text",
                align: "center",
                width: 50
            }, 
            {
                name: "ITEM_NAME",
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
            },
            {
                name: "BARCODE",
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
                name: "TYPE",
                title: "TIP",
                type: "TEXT",
                align: "center",
                width: 75
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
            },
            {
                name: "CHOUR",
                title: "SAAT",
                type: "date",
                align: "center",
                width: 50
            },
            {
                name: "CDATE",
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
                name: "TYPE",
                title: "TIP",
                type: "TEXT",
                align: "center",
                width: 75
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
            },
            {
                name: "BARCODE",
                title: "BARKOD",
                type: "number",
                align: "center",
                width: 100
            }],
            rowClick: function(args)
            {
                // $scope.SonSatisDetayRowClick(args.itemIndex,args.item);
                // $scope.$apply();
            }
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
        $scope.AraToplam = 0;
        $scope.ToplamKdv = 0;
        $scope.GenelToplam = 0;
        $scope.ToplamIskonto = 0;
        $scope.ToplamFisIskonto = 0;

        angular.forEach($scope.SatisList,function(value)
        {
            $scope.AraToplam += value.QUANTITY * value.PRICE;
            $scope.ToplamIskonto += value.DISCOUNT;
            $scope.ToplamKdv += ((value.QUANTITY * value.PRICE) - value.DISCOUNT) * (value.VAT / 100);        
        });

        $scope.GenelToplam = ($scope.AraToplam - $scope.ToplamIskonto) + $scope.ToplamKdv;
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
            $scope.PosSatisMiktarUpdate($scope.TxtBarkod.split("-")[1]);
        }
        else if($scope.TxtBarkod.indexOf("/") != -1)
        {
            $scope.BtnIskonto($scope.TxtBarkod.split("/")[1]);
        }
        else if($scope.TxtBarkod.indexOf("*") != -1)
        {
            $scope.PosSatisMiktarUpdate1($scope.TxtBarkod.split("*")[1]);
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
                //$scope.TxtAraToplamTutar = "";         
                
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
        else
        {   
            $scope.TxtAraToplamTutar = "";
        }
    }
    function printDiv(divName) 
    {
        if(divName == "A5")
        {
            var printContents = document.getElementById("A5").innerHTML;
        }
        else
        {
            var printContents = document.getElementById("A4").innerHTML;
        }
        
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        $window.print();
        $window.location.reload();
        //document.body.innerHTML = originalContents;
        
        //window.close();
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
            else if(FocusSeriSira == true)
            {   
                if($scope.SeriSira == 'Seri')
                {
                    $window.document.getElementById("Seri").focus();
                }
                else
                {
                    $window.document.getElementById("Sira").focus();
                }
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
            
            $scope.CariKodu = $scope.CariListe[pIndex].CODE;
            $scope.CariAdi = $scope.CariListe[pIndex].NAME;
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
        
        db.GetData($scope.Firma,'PosSonSatisDetayGetir',[$scope.Sube,SonSatisDetay.REF,SonSatisDetay.REF_NO],function(PosSonSatisDetay)
        {  
            $scope.SonSatisDetayList = PosSonSatisDetay;
            $("#TblSonSatisDetay").jsGrid({data : $scope.SonSatisDetayList});
        });

        $('#MdlSonSatis').modal('hide');
        $('#MdlSonSatisDetay').modal('show');
    }
    $scope.YeniEvrak = async function()
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
        db.GetData($scope.Firma,'PosPluGrupGetir',[],function(PluGrpData)
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
        
        await db.MaxSira($scope.Firma,'MaxPosSatisSira',[$scope.Sube,$scope.Seri,$scope.EvrakTip],function(data){$scope.Sira = data});
        await db.MaxSira($scope.Firma,'MaxPosTahSira',[$scope.Sube,$scope.TahSeri,0],function(data){$scope.TahSira = data});
    }
    $scope.BtnCariGridGetir = function()
    {
        let Kodu = '';
        let Adi = '';

        if($scope.TxtCariAra != "")
        {
            if($scope.CmbCariAra == "0")
                Adi = $scope.TxtCariAra;
            else
                Kodu = $scope.TxtCariAra;
        }
        
        db.GetData($scope.Firma,'PosCariListeGetir',[Kodu,Adi],function(data)
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
                db : '{M}.' + $scope.Firma,
                query:  "UPDATE POS_SALES SET CUSTOMER_CODE = @CUSTOMER_CODE WHERE REF = @REF AND REF_NO = @REF_NO AND DEPARTMENT = @DEPARTMENT",
                param:  ['CUSTOMER_CODE','REF','REF_NO','DEPARTMENT'],
                type:   ['string|25','string|25','int','int'],
                value:  [$scope.CariKodu,$scope.Seri,$scope.Sira,$scope.Sube]
            }
            db.ExecuteQuery(TmpQuery,function(UpdateResult)
            {
            
            });
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
            Adi = $scope.TxtStokAra.replace("*","%").replace("*","%");
        }
        else
        {
            Kodu = $scope.TxtStokAra.replace("*","%").replace("*","%");
        }
            
        db.GetData($scope.Firma,'StokGetir',[Kodu,Adi],function(StokData)
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
        db.GetData($scope.Firma,'PosPluGetir',[pGrup],function(PluData)
        {
            $scope.PluList = PluData;
        });
    }
    $scope.StokGetir = function(pBarkod)
    {
        if(pBarkod != '')
        {
            db.StokBarkodGetir($scope.Firma,pBarkod,function(BarkodData)
            {
                if(BarkodData.length > 0)
                { 
                    $scope.Stok = BarkodData;

                    $scope.Stok[0].TUTAR = 0;
                    $scope.Stok[0].INDIRIM = 0;
                    $scope.Stok[0].KDV = 0;
                    $scope.Stok[0].TOPTUTAR = 0;

                    $scope.Stok[0].TUTAR = ($scope.Stok[0].FACTOR * $scope.Miktar) * $scope.Stok[0].PRICE;
                    $scope.Stok[0].KDV = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].VAT / 100);
                    $scope.Stok[0].TOPTUTAR = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) + $scope.Stok[0].KDV;

                    $scope.PosSatisInsert();
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
            $scope.Stok[0].VAT,
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
    $scope.PosTahInsert = function(pCallBack)
    {   
        let TahTutar = 0
        let TahParaUstu = 0;
      
        if($scope.OdemeTip == 1)
        {
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
        }  
        else
        {
            TahTutar = $scope.TxtAraToplamTutar.replace(',','.');
        }

        var InsertData = 
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
        if($scope.TxtAraToplamTutar.replace(',','.') > 0)
        {
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
    
        localStorage.KasaKodu = $scope.Kasa
    }
    $scope.PosSatisMiktarUpdate = function(pMiktar)
    {   
        let pIskonto = 0;
        if($scope.SatisList[$scope.IslemListeSelectedIndex].DISCOUNT > 0)
        {
            let pOran = $scope.SatisList[$scope.IslemListeSelectedIndex].DISCOUNT / ($scope.SatisList[$scope.IslemListeSelectedIndex].QUANTITY * $scope.SatisList[$scope.IslemListeSelectedIndex].PRICE);
            pIskonto = (pMiktar * $scope.SatisList[$scope.IslemListeSelectedIndex].PRICE) * pOran;
        }     
        db.GetData($scope.Firma,'PosSatisMiktarUpdate',[pMiktar,pIskonto,$scope.SatisList[$scope.IslemListeSelectedIndex].GUID],function(data)
        {          
            db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisData)
            {  
                InsertSonYenile(PosSatisData);  
                $scope.IslemListeRowClick($scope.IslemListeSelectedIndex,$scope.SatisList[$scope.IslemListeSelectedIndex]);
                $scope.ToplamMiktar = db.SumColumn($scope.SatisList,"QUANTITY")
                $scope.ToplamSatir =  $scope.SatisList.length    
                
                db.GetData($scope.Firma,'PosFisSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisFisData)
                {  
                    InsertFisYenile(PosSatisFisData);   
                }); 
            });          
        });
    }
    $scope.PosSatisMiktarUpdate1 = function(pMiktar)
    {   
        let pIskonto = 0;
        if($scope.SatisList[$scope.IslemListeSelectedIndex].DISCOUNT > 0)
        {
            let pOran = $scope.SatisList[$scope.IslemListeSelectedIndex].DISCOUNT / ($scope.SatisList[$scope.IslemListeSelectedIndex].QUANTITY * $scope.SatisList[$scope.IslemListeSelectedIndex].PRICE);
            pIskonto = (pMiktar * $scope.SatisList[$scope.IslemListeSelectedIndex].PRICE) * pOran;
        }     
        db.GetData($scope.Firma,'PosSatisMiktarUpdate1',[pMiktar,pIskonto,$scope.SatisList[$scope.IslemListeSelectedIndex].GUID],function(data)
        {          
            db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisData)
            {   
                InsertSonYenile(PosSatisData);      
                $scope.IslemListeRowClick($scope.IslemListeSelectedIndex,$scope.SatisList[$scope.IslemListeSelectedIndex]);  
                $scope.ToplamMiktar = db.SumColumn($scope.SatisList,"QUANTITY")
                $scope.ToplamSatir =  $scope.SatisList.length

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
        else if(FocusSeriSira)
        {
            if($scope.SeriSira == 'Seri')
            {
                $scope.Seri = $scope.Seri + Key; 
            }
            else
            {
                $scope.Sira = $scope.Sira + Key;   
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
                db.ExecuteTag($scope.Firma,'PosSatisSatirIptal',[$scope.SatisList[$scope.IslemListeSelectedIndex].GUID],function(data)
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
        $scope.Seri = $scope.ParkList[$scope.ParkIslemListeSelectedIndex].REF;
        $scope.Sira = $scope.ParkList[$scope.ParkIslemListeSelectedIndex].REF_NO;

        db.GetData($scope.Firma,'PosSatisGetir',[$scope.Sube,$scope.EvrakTip,$scope.Seri,$scope.Sira],function(PosSatisData)
        {   
            db.GetData($scope.Firma,'PosCariGetir',[PosSatisData[0].CUSTOMER_CODE,''],function(data)
            {
                $scope.CariAdi = data[0].NAME;
                $scope.CariKodu = data[0].CODE;
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

            $scope.ToplamMiktar = db.SumColumn($scope.SatisList,"QUANTITY");
            $scope.ToplamSatir =  $scope.SatisList.length
        });
    }
    $scope.BtnAraToplam = function(pTip)
    {   
        $scope.OdemeTip = pTip;

        $("#InputFatura").removeClass("active");
        $("#InputFis").removeClass("active");

        if($scope.CariKodu != UserParam.PosSatis.Cari)
        {   
            $("#InputFatura").addClass("active");
            $("#InputFatura input")[0].checked = true;
        }
        else
        {
            $("#InputFis").addClass("active");
            $("#InputFis input")[0].checked = true;
        }

        if($scope.OdemeTip == 1 && $scope.SatisList.length < 1)
        {
            alertify.okBtn("Tamam");
            alertify.alert("Satış işlemi yapmadan tahsilat giremezsiniz !");
            return;
        }
        if($scope.OdemeTip == 0 && $scope.GenelToplam > 0)
        {   
            alertify.alert("Satış Yapıldıktan Sonra Tahsilat Ekranına Girilemez. !");
        }
        else
        {  
            $("#MdlAraToplam").modal("show");
            FocusAraToplam = true;
            FocusBarkod = false;
            FocusMusteri = false;
            FocusStok = false;
            FocusSeri = false;

            //EKRANA GİRDİĞİNDE OTOMATİK NAKİT SEÇİLİ GELSİN
            if($scope.TahTip != 2)
            {
                TahTip = 0;
                angular.element('#ChkNakit').trigger('click');
            }
            TahSonYenile();
        }
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
            db.ExecuteTag($scope.Firma,'PosTahSatirIptal',[$scope.TahList[$scope.TahIslemListeSelectedIndex].GUID],function(data)
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
        if($scope.SatisList.length > 0 || $scope.OdemeTip == 0)
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
    $scope.PosSatisKapatUpdate = function()
    {      
        if($scope.Kasa != "")
        {
            if($scope.OdemeTip == 1)
            {   
                $scope.PosTahInsert(function()
                {   
                    if($scope.TahKalan <= 0)
                    {   
                        if($scope.CariKodu != UserParam.PosSatis.Cari && $scope.CiktiTip == 1)
                        {  
                            $('#MdlAraToplam').modal('hide');
                            $('#MdlSeriSira').modal('show'); 
                            FocusBarkod = false;
                            FocusSeriSira = true;
                            FocusAraToplam = false;
                            FocusMusteri = false;
                            FocusStok = false;
                        }
                        else
                        {   
                            db.GetData($scope.Firma,'PosSatisKapatUpdate',[$scope.Sube,$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                            {   
                                printDiv("A5");
                                $('#MdlAraToplam').modal('hide');
                                $scope.YeniEvrak();
                                $scope.TxtBarkod = "";
                                $scope.TahPanelKontrol = false;
                            });
                        }
                    } 
                    else
                    {
                        console.log("Kalan Tutarı Kapatınız!");
                    }
                });
            }
            else
            {   
                if($scope.TxtAraToplamTutar.length <= 0)
                {
                    $('#MdlAraToplam').modal('hide');
                    $scope.YeniEvrak();
                    $scope.TxtBarkod = "";
                    $scope.TahPanelKontrol = false;
                }
                else
                {
                    $scope.PosTahInsert(function()
                    {
                        $('#MdlAraToplam').modal('hide');
                        $scope.YeniEvrak();
                        $scope.TxtBarkod = "";
                        $scope.TahPanelKontrol = false;
                    });
                }
            }
        }
        else
        {
            console.log("Lütfen Kredi Kartı Seçimi Yapınız.")
            alertify.okBtn('Lütfen Kredi Kartı Seçimi Yapınız.');
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
        else if($scope.TahTip == 1)
        {   
            // $scope.KasaSecim = true;
            // db.GetData($scope.Firma,'CmbBankaGetir',[],function(KasaData)
            // {
            //     $scope.KasaListe = KasaData;
                
            //     if(typeof localStorage.KasaKodu == 'undefined')
            //     {
            //         $scope.Kasa = UserParam.PosSatis.KrediKartKasa;
            //     }
            //     else
            //     {
            //         $scope.Kasa = localStorage.KasaKodu.toString();
            //     }
            // });
        }

        if($scope.TahTip == 2)
        {
            if($scope.CariKodu == UserParam.PosSatis.Cari)
            {   
                $('#MdlAraToplam').modal('hide');
                alertify.alert("Lütfen Cari Seçin.");
            }
        }
    }
    $scope.BtnKlavye = function()
    {
        $scope.Klavye = true;
    }
    $scope.BtnKaydetYazdir = function()
    {   
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "UPDATE TERP_POS_SATIS SET SERI = @YSERI,SIRA = @YSIRA WHERE SERI = @SERI AND SIRA = @SIRA AND SUBE = @SUBE " +
                    "UPDATE TERP_POS_TAHSILAT SET SERI = @YSERI,SIRA = @YSIRA WHERE SERI = @SERI AND SIRA = @SIRA AND SUBE = @SUBE" ,
            param:  ['SUBE','YSERI','YSIRA','SERI','SIRA'],
            type:   ['int','string|25','int','string|25','int'],
            value:  [$scope.Sube,$scope.Seri,$scope.Sira,$scope.SatisList[0].SERI,$scope.SatisList[0].SIRA]
        }

        db.ExecuteQuery(TmpQuery,function(UpdateResult)
        {
            db.GetData($scope.Firma,'PosSatisKapatUpdate',[$scope.Sube,$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
            {   
                $('#MdlSeriSira').modal('hide');
                $(".modal-backdrop").hide();
                $scope.YeniEvrak();
                $scope.TxtBarkod = "";
                $scope.TahPanelKontrol = false;
                printDiv();
            });
        });
    }
    $scope.BtnCikti = function(pTip)
    {
        $scope.CiktiTip = pTip;
    }
}