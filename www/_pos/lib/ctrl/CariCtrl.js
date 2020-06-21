function CariCtrl ($scope,$window,$location,db)
{
    let UserParam = {};
    let SecimSelectedRow = null;
    let ModalTip = "";

    function TblSecimInit(pData)
    {
        
        let TmpColumns = []
           
        if(pData.length > 0)
        {
            Object.keys(pData[0]).forEach(function(item)
            {
                TmpColumns.push({name : item});
            });    
        }
        
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
    function CariGrupModalInit()
    {
        $scope.CariGrupModal = {};
        $scope.CariGrupModal.Kodu = "";
        $scope.CariGrupModal.Adi = "";
    }
    function CariGetir(pKodu)
    {
        $scope.CariListe = [];
        db.GetData($scope.Firma,'CariKartGetir',[pKodu],function(Data)
        {
            $scope.CariListe = Data;
            console.log($scope.CariListe[0].COMPANY);
            $scope.TypeChange();
        });
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
    $scope.Init = function()
    {
        $scope.StyleKurum = {'visibility': 'hidden'};
        UserParam = Param[$window.sessionStorage.getItem('User')];

        $scope.CariListe = [];

        TblSecimInit([]);

        let TmpCariObj = {};

        TmpCariObj.CODE = "";
        TmpCariObj.TYPE = "0";
        TmpCariObj.GENUS = "0";
        TmpCariObj.NAME = "";
        TmpCariObj.LAST_NAME = "";
        TmpCariObj.COMPANY = "";
        TmpCariObj.CUSTOMER_GRP = "";
        TmpCariObj.PHONE1 = "";
        TmpCariObj.PHONE2 = "";
        TmpCariObj.EMAIL = "";
        TmpCariObj.WEB = "";
        TmpCariObj.NOTE = "";
        TmpCariObj.SIRET_ID = "";
        TmpCariObj.APE_CODE = "";
        TmpCariObj.TAX_OFFICE = "";
        TmpCariObj.TAX_NO = "";
        TmpCariObj.INT_VAT_NO = "";
        TmpCariObj.TAX_TYPE = "0";
        TmpCariObj.ADRESS = "";
        TmpCariObj.ZIPCODE = "";
        TmpCariObj.CITY = "";
        TmpCariObj.COUNTRY = "";


        $scope.CariListe.push(TmpCariObj);

        CariGrupModalInit();

        if(typeof $location.$$search.Id != 'undefined')
        {
            CariGetir($location.$$search.Id);
        }
    }
    $scope.Kaydet = function()
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Kayıt etmek istediğinize eminmisiniz ?', 
        function()
        { 
            if($scope.CariListe[0].CODE != '')
            {
                let InsertData =
                [
                    UserParam.Kullanici,
                    UserParam.Kullanici,
                    $scope.CariListe[0].CODE,
                    $scope.CariListe[0].TYPE,
                    $scope.CariListe[0].GENUS,
                    $scope.CariListe[0].NAME,
                    $scope.CariListe[0].LAST_NAME,
                    $scope.CariListe[0].COMPANY,                    
                    $scope.CariListe[0].CUSTOMER_GRP,
                    $scope.CariListe[0].PHONE1,
                    $scope.CariListe[0].PHONE2,
                    $scope.CariListe[0].GSM_PHONE,
                    $scope.CariListe[0].OTHER_PHONE,
                    $scope.CariListe[0].EMAIL,
                    $scope.CariListe[0].WEB,
                    $scope.CariListe[0].NOTE,
                    $scope.CariListe[0].SIRET_ID,
                    $scope.CariListe[0].APE_CODE,
                    $scope.CariListe[0].TAX_OFFICE,
                    $scope.CariListe[0].TAX_NO,
                    $scope.CariListe[0].INT_VAT_NO,
                    $scope.CariListe[0].TAX_TYPE
                ];
                
                db.ExecuteTag($scope.Firma,'CariKartKaydet',InsertData,function(InsertResult)
                { 
                    if(typeof(InsertResult.result.err) == 'undefined')
                    {  
                        if($scope.CariListe[0].ADRESS != "")
                        {
                            let InsertData =
                            [
                                UserParam.Kullanici,
                                UserParam.Kullanici,
                                0,
                                $scope.CariListe[0].CODE,
                                $scope.CariListe[0].ADRESS,
                                $scope.CariListe[0].ZIPCODE,
                                $scope.CariListe[0].CITY,                    
                                $scope.CariListe[0].COUNTRY
                            ];
                            
                            db.ExecuteTag($scope.Firma,'AdresKaydet',InsertData,function(InsertResult)
                            { 
                                
                            });
                        }
                    }

                    $scope.Init();
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

        alertify.confirm('Kaydı silmek istediğinize eminmisiniz ?', 
        function()
        { 
            if($scope.CariListe[0].CODE != '')
            {
                db.ExecuteTag($scope.Firma,'CariKartSil',[$scope.CariListe[0].CODE,0],function(data)
                {
                    $scope.Init();
                });
            }
            else
            {
                alertify.okBtn("Tamam");
                alertify.alert("Kayıt olmadan sileme işlemi yapamazsınız !");
            }
        }
        ,function(){});
    }
    $scope.TypeChange = function()
    {
        if($scope.CariListe[0].TYPE == "0")
        {
            $scope.StyleKurum = {'visibility': 'hidden'};
            //$scope.CariListe[0].COMPANY = "";
        }
        else if($scope.CariListe[0].TYPE == "1")
        {
            $scope.StyleKurum = {'visibility': 'visible'};
            //$scope.CariListe[0].COMPANY = "";
        }
    }
    $scope.BtnGridSec = function()
    {
        if(ModalTip == "Cari")
        {
            CariGetir(SecimSelectedRow.Item.CODE);
            $("#MdlSecim").modal('hide');
        }
        else if(ModalTip == "CariGrup")
        {
            $scope.CariListe[0].CUSTOMER_GRP = SecimSelectedRow.Item.CODE;
            $("#MdlSecim").modal('hide');
        }
        ModalTip = "";
    }
    $scope.BtnModalKapat = function()
    {
        if(ModalTip == "Cari")
        {
            $("#MdlSecim").modal('hide');
        }
        else if(ModalTip == "CariGrup")
        {
            $("#MdlSecim").modal('hide');
        }
        ModalTip = "";
    }
    $scope.BtnModalSecim = function(pTip)
    {
        ModalTip = pTip;
        
        if(ModalTip == "Cari")
        {
            let TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT [CODE],[NAME] FROM [CUSTOMERS]"
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                TblSecimInit(Data);
                $("#MdlSecim").modal('show');
            });
        }
        else if(ModalTip == "CariGrup")
        {
            let TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT [CODE],[NAME] FROM [CUSTOMER_GROUP]"
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                TblSecimInit(Data);
                $("#MdlSecim").modal('show');
            });
        }
    }
    $scope.BtnTabAdres = function()
    {
        $("#TabAdres").addClass('active');
        $("#TabYasal").removeClass('active');
    }
    $scope.BtnTabYasal = function()
    {
        $("#TabYasal").addClass('active');
        $("#TabAdres").removeClass('active');
    }
    $scope.BtnModalCariGrupEkle = function()
    {
        CariGrupModalInit();
        $("#MdlCariGrupEkle").modal('show');
    }
    $scope.BtnCariGrupKaydet = function()
    {
        $("#MdlCariGrupEkle").modal('hide');

        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Kayıt etmek istediğinize eminmisiniz ?', 
        function()
        { 
            if($scope.CariGrupModal.Kodu == "")
            {
                alertify.okBtn("Tamam");
                alertify.alert("Kodu bölümünü girmeden kayıt edemezsiniz !");
                return;
            }

            let InsertData =
            [
                UserParam.Kullanici,
                UserParam.Kullanici,
                $scope.CariGrupModal.Kodu,
                $scope.CariGrupModal.Adi
            ];

            db.ExecuteTag($scope.Firma,'CariGrupKaydet',InsertData,function(InsertResult)
            { 
                if(typeof(InsertResult.result.err) == 'undefined')
                {  
                   
                }
            });    
        }
        ,function()
        {
            $("#MdlCariGrupEkle").modal('show')
        });
    }
}