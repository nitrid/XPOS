function StokCtrl ($scope,$window,db)
{
    let UserParam = {};
    let TblStokSecim;

    function TblFiyatInit(pData)
    {
        $("#TblFiyat").DataTable().destroy();
        $("#TblFiyat").DataTable(
            {
                pageLength : 5,
                lengthChange : false,
                ordering:false,
                info:false,
                searching:false,
                data : pData,
                columns : 
                [
                    {data : "TYPENAME"},
                    {data : "DEPOT"},
                    {data : "START_DATE"},
                    {data : "FINISH_DATE"},
                    {data : "PRICE"},
                    {data : "CUSTOMER"}
                ]
            }
        );
    }
    function TblBirimInit(pData)
    {
        $("#TblBirim").DataTable().destroy();

        $("#TblBirim").DataTable(
            {
                pageLength : 5,
                lengthChange : false,
                ordering:false,
                info:false,
                searching:false,
                data : pData,
                columns : 
                [
                    {data : "TYPENAME"},
                    {data : "NAME"},
                    {data : "FACTOR"},
                    {data : "WEIGHT"},
                    {data : "VOLUME"},
                    {data : "WIDTH"},
                    {data : "HEIGHT"},
                    {data : "SIZE"}
                ]
            }
        );
    }
    function TblBarkodInit(pData)
    {
        $("#TblBarkod").DataTable().destroy();

        $("#TblBarkod").DataTable(
            {
                pageLength : 5,
                lengthChange : false,
                ordering:false,
                info:false,
                searching:false,
                data : pData,
                columns : 
                [
                    {data : "BARCODE"},
                    {data : "UNIT"},
                    {data : "TYPE"}
                ]
            }
        );
    }
    function TblTedarikciInit(pData)
    {
        $("#TblTedarikci").DataTable().destroy();
        $("#TblTedarikci").DataTable(
            {
                pageLength : 5,
                lengthChange : false,
                ordering:false,
                info:false,
                searching:false,
                data : pData,
                columns : 
                [
                    {data : "CUSTOMER_CODE"},
                    {data : "CUSTOMER_NAME"}
                ]
            }
        );
    }
    function TblStokSecimInit(pData)
    {
        $("#TblStokSecim").DataTable().destroy();

        TblStokSecim = $("#TblStokSecim").DataTable
        ({
            pageLength : 10,
            lengthChange : false,
            ordering:false,
            info:false,
            searching : true,
            data : pData,
            autoWidth: true,
            select : true,
            columns : 
            [
                {data : "CODE"},
                {data : "NAME"}
            ]
        });

        
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
                TblFiyatInit($scope.FiyatListe);
            });
            //BIRIM LİSTESİ GETİR
            db.GetData($scope.Firma,'StokKartBirimListeGetir',[pKodu],function(BirimData)
            {
                $scope.BirimListe = BirimData;
                TblBirimInit($scope.BirimListe);
            });
            //BARKOD LİSTESİ GETİR
            db.GetData($scope.Firma,'StokKartBarkodListeGetir',[pKodu],function(BarkodData)
            {
                $scope.BarkodListe = BarkodData;
                TblBarkodInit($scope.BarkodListe);
            });
            //TEDARİKÇİ LİSTESİ GETİR
            db.GetData($scope.Firma,'StokKartTedarikciListeGetir',[pKodu],function(TedarikciData)
            {
                $scope.TedaikciListe = TedarikciData;
                TblTedarikciInit($scope.TedaikciListe);
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

        TblFiyatInit($scope.FiyatListe);
        TblBirimInit($scope.BirimListe);
        TblBarkodInit($scope.BarkodListe);
        TblTedarikciInit($scope.TedaikciListe);        
        TblStokSecimInit([]);

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
    $scope.BtnStokGridSec = function()
    {
        StokGetir(TblStokSecim.rows('.selected').data()[0].CODE);
        $("#MdlStokSecim").modal('hide');
    }
    $scope.BtnModalStokSecim = function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT [CODE],[NAME] FROM ITEMS"
        }
        db.GetDataQuery(TmpQuery,function(Data)
        {
            TblStokSecimInit(Data);
            $("#MdlStokSecim").modal('show');
        });
    }
    $scope.BtnModalFiyatEkle = function()
    {
        $("#MdlFiyatEkle").modal('show');
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