function StokCtrl ($scope,$window,db)
{
    let UserParam = {};
    let SecimSelectedRow = null;
    let ModalTip = "";

    function TblFiyatInit()
    {        
        $("#TblFiyat").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.FiyatListe,
            paging : true,
            pageSize: 5,
            pageButtonCount: 3,
            editing: true,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
                {
                    name: "TYPENAME",
                    title : "Tip",
                    align: "center",
                    width: 100
                    
                },
                {
                    name: "DEPOT",
                    title : "Depo",
                    align: "center",
                    width: 100
                },
                {
                    name: "START_DATE",
                    title : "Baş.Tarih",
                    type: "date",
                    align: "center",
                    width: 75
                },
                {
                    name: "FINISH_DATE",
                    title : "Bit.Tarih",
                    type: "date",
                    align: "center",
                    width: 75
                },
                {
                    name: "PRICE",
                    title : "Fiyat",
                    type: "decimal",
                    align: "center",
                    width: 75
                },
                {
                    name: "CUSTOMER",
                    title : "Cari",
                    align: "center",
                    width: 100
                },
                { type: "control", modeSwitchButton: true, editButton: false }  
            ],
            confirmDeleting: false,
            onItemDeleting: function (args) 
            {
                if (!args.item.deleteConfirmed) 
                { // custom property for confirmation
                    args.cancel = true; // cancel deleting
                    alertify.okBtn('Evet');
                    alertify.cancelBtn('Hayır');
            
                    alertify.confirm('Fiyatı silmek istediğinize eminmisiniz ?', 
                    function()
                    { 
                        args.item.deleteConfirmed = true;
                        db.ExecuteTag($scope.Firma,'FiyatSil',[args.item.GUID],function(data)
                        {
                            //FİYAT LİSTESİ GETİR
                            db.GetData($scope.Firma,'StokKartFiyatListeGetir',[$scope.StokListe[0].CODE],function(FiyatData)
                            {
                                $scope.FiyatListe = FiyatData;
                                $("#TblFiyat").jsGrid({data : $scope.FiyatListe});
                            });
                        });
                    }
                    ,function(){});
                }
            },
            onItemUpdated: function(args) 
            {
                db.ExecuteTag($scope.Firma,'FiyatUpdate',[args.item.PRICE,args.item.GUID],function(data)
                {
                });
            }
        });
    }
    function TblBirimInit()
    {
        $("#TblBirim").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.BirimListe,
            paging : true,
            pageSize: 5,
            pageButtonCount: 3,
            editing: true,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
                {
                    name: "TYPENAME",
                    title : "Tip",
                    align: "center",
                    width: 100
                    
                },
                {
                    name: "NAME",
                    title : "Adı",
                    align: "center",
                    width: 100
                },
                {
                    name: "FACTOR",
                    title : "Katsayı",
                    type: "number",
                    align: "center",
                    width: 75
                },
                {
                    name: "WEIGHT",
                    title : "Ağırlık",
                    type: "number",
                    align: "center",
                    width: 75
                },
                {
                    name: "VOLUME",
                    title : "Hacim",
                    type: "number",
                    align: "center",
                    width: 75
                },
                {
                    name: "WIDTH",
                    title : "En",
                    type: "number",
                    align: "center",
                    width: 100
                },
                {
                    name: "HEIGHT",
                    title : "Boy",
                    type: "number",
                    align: "center",
                    width: 100
                },
                {
                    name: "SIZE",
                    title : "Yükseklik",
                    type: "number",
                    align: "center",
                    width: 100
                },
                { type: "control", modeSwitchButton: true , editButton: false }  
            ]
        });
    }
    function TblBarkodInit()
    {
        $("#TblBarkod").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.BirimListe,
            paging : true,
            pageSize: 5,
            pageButtonCount: 3,
            editing: true,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
                {
                    name: "BARCODE",
                    title : "Barkod",
                    type : "text",
                    align: "center",
                    width: 100
                    
                },
                {
                    name: "UNIT",
                    title : "Birim",
                    align: "center",
                    width: 100
                },
                {
                    name: "TYPE",
                    title : "Tip",
                    align: "center",
                    width: 75
                },
                { type: "control", modeSwitchButton: true , editButton: false }  
            ]
        });
    }
    function TblTedarikciInit()
    {
        $("#TblTedarikci").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.BirimListe,
            paging : true,
            pageSize: 5,
            pageButtonCount: 3,
            editing: true,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
                {
                    name: "CUSTOMER_CODE",
                    title : "Kodu",
                    type : "text",
                    align: "center",
                    width: 100
                    
                },
                {
                    name: "CUSTOMER_NAME",
                    title : "Adı",
                    align: "center",
                    width: 100
                },
                { type: "control", modeSwitchButton: true , editButton: false }  
            ]
        });
    }
    function TblSecimInit(pData)
    {
        if(pData.length > 0)
        {
            let TmpColumns = []
            
            Object.keys(pData[0]).forEach(function(item)
            {
                TmpColumns.push({name : item});
            });
            
            $("#TblSecim").jsGrid
            ({
                width: "100%",
                updateOnResize: true,
                heading: true,
                selecting: true,
                data : pData,
                paging : true,
                pageSize: 5,
                pageButtonCount: 3,
                pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
                fields: TmpColumns,
                rowClick: function(args)
                {
                    SecimListeRowClick(args.itemIndex,args.item,this);
                    $scope.$apply();
                }
            });
        }
    }
    function SecimListeRowClick(pIndex,pItem,pObj)
    {    
        if ( SecimSelectedRow ) { SecimSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        SecimSelectedRow = $row;
        SecimSelectedRow.Item = pItem
        SecimSelectedRow.Index = pIndex
    }
    function FiyatModalInit()
    {
        $scope.FiyatModal = {};
        $scope.FiyatModal.Tip = "0";
        $scope.FiyatModal.StokKodu = $scope.StokListe[0].CODE;
        $scope.FiyatModal.Depo = "0";
        $scope.FiyatModal.Baslangic = moment(new Date()).format("DD.MM.YYYY");
        $scope.FiyatModal.Bitis = moment(new Date()).format("DD.MM.YYYY");
        $scope.FiyatModal.Fiyat = 0;
        $scope.FiyatModal.Cari = "";
    }
    function StokGetir(pKodu)
    {
        $scope.StokListe = [];
        db.GetData($scope.Firma,'StokKartGetir',[pKodu],function(StokData)
        {
            $scope.StokListe = StokData;
            //FİYAT LİSTESİ GETİR
            db.GetData($scope.Firma,'StokKartFiyatListeGetir',[pKodu],function(FiyatData)
            {
                $scope.FiyatListe = FiyatData;
                $("#TblFiyat").jsGrid({data : $scope.FiyatListe});
            });
            //BIRIM LİSTESİ GETİR
            db.GetData($scope.Firma,'StokKartBirimListeGetir',[pKodu],function(BirimData)
            {
                $scope.BirimListe = BirimData;
                $("#TblBirim").jsGrid({data : $scope.BirimListe});
            });
            //BARKOD LİSTESİ GETİR
            db.GetData($scope.Firma,'StokKartBarkodListeGetir',[pKodu],function(BarkodData)
            {
                $scope.BarkodListe = BarkodData;
                $("#TblBarkod").jsGrid({data : $scope.BarkodListe});
            });
            //TEDARİKÇİ LİSTESİ GETİR
            db.GetData($scope.Firma,'StokKartTedarikciListeGetir',[pKodu],function(TedarikciData)
            {
                $scope.TedaikciListe = TedarikciData;
                $("#TblTedarikci").jsGrid({data : $scope.TedaikciListe});
            });
        });
    }
    $scope.Init = function()
    {
        UserParam = Param[$window.sessionStorage.getItem('User')];
        
        $scope.StokListe = [];
        $scope.FiyatListe = [];
        $scope.BirimListe = [];
        $scope.BarkodListe = [];
        $scope.TedaikciListe = [];

        TblFiyatInit();
        TblBirimInit();
        TblBarkodInit();
        TblTedarikciInit();        
        TblSecimInit([]);

        let TmpStokObj = {};

        TmpStokObj.CODE = "";
        TmpStokObj.NAME = "";
        TmpStokObj.SNAME = "";
        TmpStokObj.ITEM_GRP = "";
        TmpStokObj.TYPE = "0";
        TmpStokObj.VAT = "0";
        TmpStokObj.STATUS = true;
        TmpStokObj.COST_PRICE = 0;
        TmpStokObj.MIN_PRICE = 0;
        TmpStokObj.MAX_PRICE = 0;

        $scope.StokListe.push(TmpStokObj);

        FiyatModalInit();
    }
    $scope.Kaydet = function()
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Kayıt etmek istediğinize eminmisiniz ?', 
        function()
        { 
            if($scope.StokListe[0].CODE != '')
            {
                let InsertData =
                [
                    UserParam.Kullanici,
                    UserParam.Kullanici,
                    $scope.StokListe[0].CODE,
                    $scope.StokListe[0].NAME,
                    $scope.StokListe[0].SNAME,
                    $scope.StokListe[0].ITEM_GRP,
                    $scope.StokListe[0].TYPE,
                    $scope.StokListe[0].VAT,                    
                    $scope.StokListe[0].COST_PRICE,
                    $scope.StokListe[0].MIN_PRICE,
                    $scope.StokListe[0].MAX_PRICE,
                    $scope.StokListe[0].STATUS
                ];
                
                db.ExecuteTag($scope.Firma,'StokKartKaydet',InsertData,function(InsertResult)
                { 
                    if(typeof(InsertResult.result.err) == 'undefined')
                    {  
                        
                    }
                });                
            }
            else
            {
                alertify.okBtn("Tamam");
                alertify.alert("Kodu bölümünü boş geçemezsiniz !");
            }
        }
        ,function(){});
    }
    $scope.Sil = function()
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Stoğu silmek istediğinize eminmisiniz ?', 
        function()
        { 
            if($scope.StokListe[0].CODE != '')
            {
                db.ExecuteTag($scope.Firma,'StokKartSil',[$scope.StokListe[0].CODE],function(data)
                {
                    $scope.Init();
                });
            }
            else
            {
                alertify.okBtn("Tamam");
                alertify.alert("Kayıtlı stok olmadan evrak silemezsiniz !");
            }
        }
        ,function(){});
    }
    $scope.BtnFiyatKaydet = function()
    {
        $("#MdlFiyatEkle").modal('hide');

        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Kayıt etmek istediğinize eminmisiniz ?', 
        function()
        { 
            let InsertData =
            [
                UserParam.Kullanici,
                UserParam.Kullanici,
                $scope.FiyatModal.StokKodu,
                $scope.FiyatModal.Tip,
                $scope.FiyatModal.Depo,
                $scope.FiyatModal.Tip == "0" ? moment(new Date(0)).format("DD.MM.YYYY") : $scope.FiyatModal.Baslangic,
                $scope.FiyatModal.Tip == "0" ? moment(new Date(0)).format("DD.MM.YYYY") : $scope.FiyatModal.Bitis,
                $scope.FiyatModal.Fiyat,                   
                $scope.FiyatModal.Cari
            ];

            db.ExecuteTag($scope.Firma,'FiyatKaydet',InsertData,function(InsertResult)
            { 
                if(typeof(InsertResult.result.err) == 'undefined')
                {  
                    //FİYAT LİSTESİ GETİR
                    db.GetData($scope.Firma,'StokKartFiyatListeGetir',[$scope.StokListe[0].CODE],function(FiyatData)
                    {
                        $scope.FiyatListe = FiyatData;
                        $("#TblFiyat").jsGrid({data : $scope.FiyatListe});
                        //TblFiyatInit($scope.FiyatListe);
                    });
                }
            });    
        }
        ,function()
        {
            $("#MdlFiyatEkle").modal('show')
        });
    }
    $scope.BtnGridSec = function()
    {
        if(ModalTip == "Stok")
        {
            StokGetir(SecimSelectedRow.Item.CODE);
            $("#MdlSecim").modal('hide');
        }
        else if(ModalTip == "FiyatStok")
        {
            $scope.FiyatModal.StokKodu = SecimSelectedRow.Item.CODE;
            $("#MdlSecim").modal('hide');
            $("#MdlFiyatEkle").modal('show');
        }
        else if(ModalTip == "FiyatCari")
        {
            $scope.FiyatModal.Cari = SecimSelectedRow.Item.CODE;
            $("#MdlSecim").modal('hide');
            $("#MdlFiyatEkle").modal('show');
        }
        else if(ModalTip == "FiyatDepo")
        {
            $scope.FiyatModal.Depo = SecimSelectedRow.Item.CODE;
            $("#MdlSecim").modal('hide');
            $("#MdlFiyatEkle").modal('show');
        }

        ModalTip = "";
    }
    $scope.BtnModalKapat = function()
    {
        if(ModalTip == "Stok")
        {
            $("#MdlSecim").modal('hide');
        }
        else if(ModalTip == "FiyatStok")
        {
            $("#MdlSecim").modal('hide');
            $("#MdlFiyatEkle").modal('show');
        }
        else if(ModalTip == "FiyatCari")
        {
            $("#MdlSecim").modal('hide');
            $("#MdlFiyatEkle").modal('show');
        }
        else if(ModalTip == "FiyatDepo")
        {
            $("#MdlSecim").modal('hide');
            $("#MdlFiyatEkle").modal('show');
        }

        ModalTip = "";
    }
    $scope.BtnModalSecim = function(pTip)
    {
        ModalTip = pTip;
        
        if(ModalTip == "Stok")
        {
            let TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT [CODE],[NAME] FROM ITEMS"
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                TblSecimInit(Data);
                $("#MdlSecim").modal('show');
            });
        }
        else if(ModalTip == "FiyatStok")
        {
            let TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT [CODE],[NAME] FROM ITEMS"
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                TblSecimInit(Data);
                $("#MdlSecim").modal('show');
                $("#MdlFiyatEkle").modal('hide');
            });
        }
        else if(ModalTip == "FiyatCari")
        {
            let TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT [CODE],[NAME] FROM CUSTOMERS"
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                TblSecimInit(Data);
                $("#MdlSecim").modal('show');
                $("#MdlFiyatEkle").modal('hide');
            });
        }
        else if(ModalTip == "FiyatDepo")
        {
            let TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT [CODE],[NAME] FROM DEPOT"
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                TblSecimInit(Data);
                $("#MdlSecim").modal('show');
                $("#MdlFiyatEkle").modal('hide');
            });
        }
    }
    $scope.BtnModalFiyatEkle = function()
    {
        if($scope.StokListe[0].CODE != "")
        {
            FiyatModalInit();
            $("#MdlFiyatEkle").modal('show');
        }
        else
        {
            alertify.okBtn("Tamam");
            alertify.alert("Kodu bölümünü girmeden fiyat giriş ekranına giremezsiniz !");
        }
    }
    $scope.CmbFiyatTipChange = function()
    {
        if($scope.FiyatModal.Tip == "0")
        {
            $("#BasTarih").prop('disabled',true);
            $("#BitTarih").prop('disabled',true);
        }
        else
        {
            $("#BasTarih").prop('disabled',false);
            $("#BitTarih").prop('disabled',false);
        }
    }
    $scope.BtnTabFiyat = function()
    {
        $("#TabFiyat").addClass('active');
        $("#TabBirim").removeClass('active');
        $("#TabBarkod").removeClass('active');
        $("#TabTedarikci").removeClass('active');
    }
    $scope.BtnTabBirim = function()
    {
        $("#TabBirim").addClass('active');
        $("#TabFiyat").removeClass('active');
        $("#TabBarkod").removeClass('active');
        $("#TabTedarikci").removeClass('active');
    }
    $scope.BtnTabBarkod = function()
    {
        $("#TabBarkod").addClass('active');
        $("#TabFiyat").removeClass('active');
        $("#TabBirim").removeClass('active');
        $("#TabTedarikci").removeClass('active');
    }
    $scope.BtnTabTedarikci = function()
    {
        $("#TabTedarikci").addClass('active');
        $("#TabFiyat").removeClass('active');
        $("#TabBarkod").removeClass('active');
        $("#TabBirim").removeClass('active');
    }
}