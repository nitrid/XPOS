function ItemCountCtrl ($scope,$window,$timeout,$location,db)
{
    let CariSelectedRow = null;
    let IslemSelectedRow = null;
    let StokSelectedRow = null;
    let EvrakSelectedRow = null;
    function Init()
    {
        DevExpress.localization.locale('fr');
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
       
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
      
        $scope.StokGridTip = "0";
        $scope.StokGridText = "";
        $scope.ToplamSatir = 0;
      

        $scope.BirimListe = [];
        $scope.StokListe = [];
        $scope.EvrakListe = [];
        $scope.SayimListe =[];


        $scope.Stok = [];
        $scope.Miktar = 1;                

        $scope.OtoEkle = false;
        $scope.EvrakLock = false;
        $scope.BarkodLock = false;
        $scope.DepoMiktar = false;

        $scope.IslemListeSelectedIndex = -1;  

        // DÜZENLE MODAL
        $scope.MiktarEdit = 0;

        $scope.Loading = false;
        $scope.TblLoading = true;   
        
        $scope.OzelBirim = ""
        $scope.CmbOzelBirim = 
        {
            width: "100%",
            dataSource: [{CODE:"PALET",NAME:"PALET"},{CODE:"KARTON",NAME:"KARTON"},{CODE:"BOX",NAME:"BOX"}],
            displayExpr: "NAME",
            valueExpr: "CODE",
            value: "",
            showClearButton: true,
            searchEnabled: true,
            bindingOptions: 
            {
                value: 'OzelBirim',
            },
            onSelectionChanged : function(e)
            {
                if(e.selectedItem == null)
                {
                    $scope.OzelBirim = ""
                }
            }
        }
    }
    function InitIslemGrid(pPage)
    {
        $("#TblIslem").jsGrid({
            responsive: true,
            width: "100%",
            updateOnResize: true,
            heading: true,
            editing: true,
            selecting: true,
            data : $scope.SayimListe,
            paging : pPage,
            pageIndex : true,
            pageSize: 3,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            deleteConfirm: db.Language($scope.Lang,"Silmek istediğinize eminmisiniz ?"),
            fields: 
            [
            {
                name: "NO",
                title: "NO",
                type: "number",
                align: "center",
                width: 75,
                editing: false
            }, 
            {
                name: "CODE",
                title: db.Language($scope.Lang,"Kodu"),
                type: "text",
                align: "center",
                width: 100,
                editing: false
            },
            {
                name: "NAME",
                title: db.Language($scope.Lang,"ADI"),
                type: "text",
                align: "center",
                width: 200,
                editing: false
            }, 
            {
                name: "QUANTITY",
                title: db.Language($scope.Lang,"Miktar"),
                type: "text",
                align: "center",
                width: 100
            }, 
            { type: "control",deleteButton: true }
           ],
            rowClick: function(args)
            {
                $scope.IslemListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            },
            onItemUpdated: function(args) 
            {
                let InserData = 
                [
                    args.item.GUID,                   
                    parseFloat(args.item.QUANTITY.toString().replace(",",".")),
                ]
                db.ExecuteTag($scope.Firma,'SayimSatirUpdate',InserData,async function(pData)
                {
                    let TmpData = await EvrakGetir($scope.Seri,$scope.Sira);
                    InsertAfterRefresh(TmpData);
                    $scope.InsertLock = false;
                });
            },
            onItemDeleting: function(args) 
            {
                // cancel deletion of the item with 'protected' field
                db.ExecuteTag($scope.Firma,'SayimSatirDelete',[args.item.GUID],async function(data)
                {
                    let TmpData = await EvrakGetir($scope.Seri,$scope.Sira);

                    $scope.SayimListe = TmpData;
                    $("#TblIslem").jsGrid({data : $scope.SayimListe});    
                    $scope.BtnTemizle();
                    
                    ToplamMiktarHesapla();
                });
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
    function InitEvrakGrid()
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
            paging : true,
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
            db.GetData($scope.Firma,'StokGetirT',[pBarkod,''],async function(BarkodData)
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

        $scope.SayimListe = pData;
        $("#TblIslem").jsGrid({data : $scope.SayimListe});    
        $scope.BtnTemizle();
        ToplamMiktarHesapla();
        
        $window.document.getElementById("Barkod").focus();
    }  
    function ToplamMiktarHesapla()
    {
        $scope.ToplamSatir = 0;

        angular.forEach($scope.SayimListe,function(value)
        {
            $scope.ToplamSatir += 1 ;
        });
    }
    function EvrakGetir(pSeri,pSira)
    {
        return new Promise(async resolve => 
        {
            console.log(144)
            let TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT *, (SELECT NAME FROM ITEMS WHERE ITEMS.CODE = ITEM_COUNT.ITEM_CODE) AS NAME, " + 
                        "ROW_NUMBER() OVER(ORDER BY CDATE) AS NO " +
                        "FROM ITEM_COUNT WHERE REF = @REF AND REF_NO = @REF_NO ORDER BY ROW_NUMBER() OVER(ORDER BY CDATE) DESC",
                param:  ['REF','REF_NO'],
                type:   ['string|25','int'],
                value:  [pSeri,pSira]
            }
            db.GetDataQuery(TmpQuery,function(pData)
            {
                console.log(132)
                resolve(pData);
            });
        });
    }
    $scope.YeniEvrak = async function()
    {
        Init();
        InitIslemGrid(true);
        InitStokGrid();
        InitEvrakGrid();
        
        if(typeof $location.$$search.REF != 'undefined')
        {
            $scope.Seri = $location.$$search.REF;
            $scope.Sira = $location.$$search.REF_NO;
            $scope.EvrakGetir();
            return;
        }

        $scope.EvrakLock = false;
        $scope.Seri = "SYM";
        $scope.Sira = (await db.GetPromiseTag($scope.Firma,'MaxSayimNo',[$scope.Seri,$scope.EvrakTip]))[0].MAXSIRA;

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
           
                $("#TbBarkodGiris").addClass('active');
                $("#TbMain").removeClass('active');
                $("#TbCariSec").removeClass('active');
                $("#TbBelgeBilgisi").removeClass('active');
                $("#TbIslemSatirlari").removeClass('active');
                $("#TblAciklama").removeClass('active');
                $("#TbStok").removeClass('active');

                BarkodFocus();
          
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
        
        if($scope.StokGridText.length > 0 && $scope.StokGridText.substring($scope.StokGridText.length-1,$scope.StokGridText.length) != "*")
        {
            $scope.StokGridText += "*"
        }
        
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
            let TmpItem = $scope.SayimListe.find(x => x.ITEM_CODE == $scope.Stok[0].CODE);
            if(typeof TmpItem != 'undefined')
            {
                alertify.okBtn(db.Language($scope.Lang,'Evet'));
                alertify.cancelBtn(db.Language($scope.Lang,'Hayır'));

                alertify.confirm(db.Language($scope.Lang,'Bu ürünü daha önce eklediniz. Tekrar eklemek istediğinize eminmisiniz ?'), 
                function()
                { 
                    let TmpMiktar = (($scope.Stok[0].FACTOR * $scope.Miktar) + TmpItem.QUANTITY)

                    let InserData = 
                    [
                        TmpItem.GUID,
                        TmpMiktar,
                    ]
                    db.ExecuteTag($scope.Firma,'SayimSatirUpdate',InserData,async function(pData)
                    {
                        let TmpData = await EvrakGetir($scope.Seri,$scope.Sira);
                        InsertAfterRefresh(TmpData);
                        $scope.InsertLock = false;
                        BarkodFocus();
                    });
                },
                async function()
                {
                    let TmpData = await EvrakGetir($scope.Seri,$scope.Sira);
                    InsertAfterRefresh(TmpData);
                    $scope.InsertLock = false;
                    BarkodFocus();
                });                
            }
            else
            {
                let InserData = 
                [
                    $scope.Kullanici,
                    $scope.CihazID,
                    $scope.Seri,
                    $scope.Sira,
                    1,
                    $scope.Stok[0].CODE,
                    $scope.Miktar,
                    $scope.Tarih,
                ]
                db.ExecuteTag($scope.Firma,'SayimInsert',InserData,async function(pData)
                {
                    let TmpData = await EvrakGetir($scope.Seri,$scope.Sira);
                    InsertAfterRefresh(TmpData);
                    $scope.InsertLock = false;
                });
            }
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
        $scope.MiktarEdit = $scope.SayimListe[$scope.IslemListeSelectedIndex].QUANTITY;
        $scope.FiyatEdit = $scope.SayimListe[$scope.IslemListeSelectedIndex].PRICE;
        $scope.OzelBirim = ""
        
        $("#MdlDuzenle").modal('show');
    }
    $scope.BtnDuzenleKaydet = function(pIndex)
    {
      
        let InserData = 
        [
            $scope.SayimListe[pIndex].GUID,
            $scope.MiktarEdit,
           
        ]
        db.ExecuteTag($scope.Firma,'SayimSatirUpdate',InserData,async function(pData)
        {
            let TmpData = await EvrakGetir($scope.Seri,$scope.Sira);
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
                db.ExecuteTag($scope.Firma,'SayimSatirDelete',[$scope.SayimListe[$scope.IslemListeSelectedIndex].GUID],async function(data)
                {
                    if($scope.SayimListe.length <= 1)
                    {
                            $scope.YeniEvrak();
                    }
                    else
                    {
                        let TmpData = await EvrakGetir($scope.Seri,$scope.Sira);

                        $scope.SayimListe = TmpData;
                        $("#TblIslem").jsGrid({data : $scope.SayimListe});    
                        $scope.BtnTemizle();
                        
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
        let TmpData = await EvrakGetir($scope.Seri,$scope.Sira);
        if(TmpData.length > 0)
        {
            Init();
            InitIslemGrid(true);  

            $scope.Seri = TmpData[0].REF;
            $scope.Sira = TmpData[0].REF_NO;
            $scope.EvrakTip = TmpData[0].DOC_TYPE;
            $scope.Tip = TmpData[0].TYPE;

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

            $scope.SayimListe = TmpData;
            $("#TblIslem").jsGrid({data : $scope.SayimListe});  

            ToplamMiktarHesapla();
            

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
            if($scope.SayimListe.length > 0)
            {
                console.log(123)
                db.ExecuteTag($scope.Firma,'SayimEvrakDelete',[$scope.Seri,$scope.Sira],async function(data)
                {
                    $scope.YeniEvrak();
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
    $scope.BtnEvrakGetir = async function()
    {
        $("#MdlEvrakGetir").modal('show');
        let TmpQuery =
        {
            db : $scope.Firma,
            query:  "SELECT REF,REF_NO ," + 
                    "ISNULL((SELECT COUNT(*) FROM ITEM_COUNT AS D WHERE D.REF = M.REF AND D.REF_NO = M.REF_NO),0) AS LINE_COUNT " +
                    "FROM ITEM_COUNT AS M  GROUP BY REF,REF_NO ORDER BY REF_NO DESC",
        }
        $scope.EvrakListe = (await db.GetPromiseQuery(TmpQuery));
        console.log($scope.EvrakListe)
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
    $scope.BtnPrint = function()
    {
        let TmpFirma = Param[0].Firma;
        let TmpBaslik = Param[0].FisBaslik[0] + '\n' + Param[0].FisBaslik[1] + '\n' + Param[0].FisBaslik[2] + '\n' + Param[0].FisBaslik[3] + '\n' + Param[0].FisBaslik[4]

        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT *, " +
                    "CONVERT(NVARCHAR,AMOUNT) AS AMOUNTF, " +
                    "@FIRMA AS FIRMA, " +
                    "@BASLIK AS BASLIK," +
                    "ISNULL((SELECT TOP 1 PATH FROM LABEL_DESIGN WHERE TAG = @DESIGN),'') AS PATH, " +
                    "ISNULL((SELECT TOP 1 CUSTOMER_ITEM_CODE FROM ITEM_CUSTOMER WHERE ITEM_CUSTOMER.ITEM_CODE = ORDER_VW_01.ITEM_CODE AND ITEM_CUSTOMER.CUSTOMER_CODE = DOC_FROM),'') AS CUSTOMER_ITEM_CODE " +
                    "FROM ORDER_VW_01 " +
                    "WHERE TYPE = @TYPE AND DOC_TYPE = @DOC_TYPE AND REF = @REF AND REF_NO = @REF_NO ORDER BY LINE_NO ASC",
            param:  ['TYPE','DOC_TYPE','REF','REF_NO','DESIGN','FIRMA','BASLIK'],
            type:   ['int','int','string|25','int','string|25','string|250','string|250'],
            value:  [0,0,$scope.Seri,$scope.Sira,'14',TmpFirma,TmpBaslik]
        }
        db.GetDataQuery(TmpQuery,function(pData)
        {
            if(pData.length > 0)
            {
                console.log("{TYPE:'REVIEW',PATH:'" + pData[0].PATH.replaceAll('\\','/') + "',DATA:" + JSON.stringify(pData) + "}")
                db.Emit('DevPrint',"{TYPE:'REVIEW',PATH:'" + pData[0].PATH.replaceAll('\\','/') + "',DATA:" + JSON.stringify(pData) + "}",(pResult)=>
                {
                    if(pResult.split('|')[0] != 'ERR')
                    {
                        var mywindow = window.open('printview.html','_blank',"width=900,height=1000,left=500");      
                        mywindow.onload = function() 
                        {
                            mywindow.document.getElementById("view").innerHTML="<iframe src='data:application/pdf;base64," + pResult.split('|')[1] + "' type='application/pdf' width='100%' height='100%'></iframe>"      
                        }   
                    }
                })
            }
        });
    }
}