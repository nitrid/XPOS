function KullaniciParametreCtrl($route,$scope,$window,$rootScope,db)
{
    let KullaniciListeRow = null;
    $('#MdlKullanici').on('hide.bs.modal', function () 
    {
        $scope.Kullanici = "";
        $scope.Kodu = "";
        $scope.Sifre = "";
        $scope.Yetki = "0";
        $scope.AktifPasif = true;
    });
    $('#MdlKullaniciGuncelle').on('hide.bs.modal', function () 
    {
        $scope.Kullanici = "";
        $scope.Kodu = "";
        $scope.Sifre = "";
        $scope.Yetki = "0";
        $scope.AktifPasif = true;
    });
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
        $scope.Firma = 'PIQPOS'
        $scope.Kullanici = "";
        $scope.Kodu = "";
        $scope.Sifre = "";
        $scope.Yetki = "0";
        $scope.AktifPasif = true;

        $scope.KullaniciListe = [];
    }
    function InitKullaniciGrid()
    {   
        $("#TblKullanici").jsGrid({
            responsive: true,
            width: "100%",
            height: "500px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.KullaniciListe,
            autoload: true,
            fields: 
            [
                {
                    name: "CODE",
                    title: db.Language($scope.Lang,"KULLANICI ID"),
                    type: "text",
                    align: "center",
                    width: 80
                },
                {
                    name: "NAME",
                    title: db.Language($scope.Lang,"KULLANICI"),
                    type: "text",
                    align: "center",
                    width: 120
                },
                {
                    name: "YETKI",
                    title: db.Language($scope.Lang,"TAG"),
                    type: "text",
                    align: "center",
                    width: 25
                },
                {
                    name: "DURUM",
                    title: db.Language($scope.Lang,"DURUM"),
                    type: "number",
                    align: "center",
                    width: 25
                },
                [
                    { 
                        itemTemplate: function(_, item) 
                        {
                            return $("<button type='submit' style='height:30px; font-size: 12px;' class='btn btn-info btn-block'></button>").text(db.Language($scope.Lang,"Güncelle"))
                                .on("click", function() 
                                {
                                    $scope.BtnKullaniciGuncelle(0,item);
                                    $scope.$apply();
                                });
                        },
                        width: 25
                    }
                ],
                [
                    { 
                        itemTemplate: function(_, item) 
                        {
                            return $("<button type='submit' style='height:30px; font-size: 12px;' class='btn btn-danger btn-block'></button>").text(db.Language($scope.Lang,"Sil"))
                                .on("click", function() 
                                {
                                    alertify.okBtn(db.Language($scope.Lang,'Evet'));
                                    alertify.cancelBtn(db.Language($scope.Lang,'Hayır'));

                                    alertify.confirm(db.Language($scope.Lang,'Kullanıcı Silmek İstediğinize Emin Misiniz ?'), 
                                    function()
                                    { 
                                        KullaniciDelete(item);
                                        $scope.$apply();
                                    }
                                    ,function(){});
                                });
                        },
                        width: 25
                    }
                ],
                [
                    { 
                        itemTemplate: function(_, item) 
                        {
                            return $("<button type='submit' style='height:30px; font-size: 12px;' class='btn btn-primary btn-block' langu></button>").text(db.Language($scope.Lang,"Ayarlar"))
                                .on("click", function() 
                                {
                                    // ParamGetir(item.ID);
                                    // $scope.KasaID = item.ID
                                    $("#TbMain").removeClass('active');
                                    $("#TbParametre").addClass('active');
                                    $scope.$apply();
                                });
                        },
                        width: 25
                    }
                ]
            ],
        });
    }
    function KullaniciGetir()
    {
        db.GetData($scope.Firma,'KullaniciGetir',[''],function(data)
        {   
            $scope.KullaniciListe = data;
            $("#TblKullanici").jsGrid({data : $scope.KullaniciListe});
            $scope.BtnYeni();
        });
    }
    function KullaniciInsert()
    {
        var InsertData = 
        [
            $scope.Kodu,
            $scope.Kullanici,
            $scope.Sifre,
            $scope.Yetki,
            $scope.AktifPasif == true ? 1 : 0
        ];

        db.ExecuteTag($scope.Firma,'KullaniciInsert',InsertData,async function(InsertResult)
        {              
            if(typeof(InsertResult.result.err) == 'undefined')
            {   
                alertify.alert(db.Language($scope.Lang,"Kayıt İşlemi Gerçekleşti."));
                $('#MdlKullanici').modal('hide');
                KullaniciGetir();
            }   
            else
            {
                alertify.alert(db.Language($scope.Lang,"Kayıt İşleminde Hata."));
                console.log(InsertResult.result.err);
            }
        });
    }
    function KullaniciUpdate(pData)
    {
        console.log(pData)
        db.ExecuteTag($scope.Firma,'KullaniciUpdate',pData,async function(InsertResult)
        {         
            if(typeof(InsertResult.result.err) == 'undefined')
            {   
                alertify.alert(db.Language($scope.Lang,"Kullanıcı Güncellendi."));
                $('#MdlKullaniciGuncelle').modal('hide');
                KullaniciGetir();
            }   
            else
            {
                alertify.alert(db.Language($scope.Lang,"Kullanıcı Güncelleme İşleminde Hata."));
                console.log(InsertResult.result.err);
            }
        });
    }
    function KullaniciDelete(pData)
    {
        db.ExecuteTag($scope.Firma,'KullaniciDelete',[pData.GUID],async function(InsertResult)
        {              
            if(typeof(InsertResult.result.err) == 'undefined')
            {   
                alertify.alert(db.Language($scope.Lang,"Kullanıcı Silme İşlemi Gerçekleşti"));
                KullaniciGetir();
            }   
            else
            {
                alertify.alert(db.Language($scope.Lang,"Kullanıcı Silme İşleminde Hata."));
                console.log(InsertResult.result.err);
            }
        });
    }
    function ParamGetir(pId,pTag)
    {
        db.GetData($scope.Firma,'ParamGetir',[pId,'CİHAZ'],function(data)
        {   
            for (let i = 0; i < data.length; i++) 
            {
                if(data[i].NAME == "SatisSeri")
                {
                    $scope.SatisSeri = data[i].VALUE;
                }
                else if(data[i].NAME == "CariKodu")
                {
                    $scope.CariKodu = data[i].VALUE;
                }
                else if(data[i].NAME == "DepoNo")
                {
                    $scope.SubeKodu = data[i].VALUE;
                }
                else if(data[i].NAME == "EkranPort")
                {
                    $scope.EkranPort = data[i].VALUE;
                }
                else if(data[i].NAME == "OdemePort")
                {
                    $scope.OdemePort = data[i].VALUE;
                }
                else if(data[i].NAME == "TeraziPort")
                {
                    $scope.TeraziPort = data[i].VALUE;
                }
                else if(data[i].NAME == "ScannerPort")
                {
                    $scope.ScannerPort = data[i].VALUE;
                }
            }
            db.GetData($scope.Firma,'CmbDepoGetir',['TÜMÜ'],function(data)
            {   
                $scope.SubeListe = data;
            });
        });
    }
    function ParamDelete(pData)
    {
        db.ExecuteTag($scope.Firma,'ParamDelete',[pData.ID,'CİHAZ'],async function(InsertResult)
        {              
            if(typeof(InsertResult.result.err) == 'undefined')
            {   
             
            }   
            else
            {
                console.log(InsertResult.result.err);
            }
        });
    }
    function ParamInsert(pKeys,pValues,pKasaID,pTag)
    {
        let InsertData = 
        [
            pKasaID,
            pKasaID,
            pKeys[0],
            pValues[0],
            pTag,
            pKasaID
        ];

        db.ExecuteTag($scope.Firma,'ParamInsert',InsertData,async function(InsertResult)
        {              
            if(typeof(InsertResult.result.err) == 'undefined')
            {   
            }   
            else
            {
                console.log(InsertResult.result.err);
            }
        });
    }
    function ParamUpdate(pKeys,pValues,pId,pTag)
    {
        var UpdateData = 
        [
            pValues[0],
            pKeys[0],
            pId,
            pTag
        ];

        db.ExecuteTag($scope.Firma,'ParamUpdate',UpdateData,async function(UpdateResult)
        {              
            if(typeof(UpdateResult.result.err) == 'undefined')
            {   
                //alert("Parametre Güncellendi.");
            }   
            else
            {
                alertify.alert(db.Language($scope.Lang,"Parametre Güncelleme İşleminde Hata."));
                console.log(UpdateResult.result.err);
            }
        });
    }
    $scope.KullaniciRowClick = function(pIndex,pItem,pObj)
    {
        if ( KullaniciListeRow ) { KullaniciListeRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = $("#TblKullanici").jsGrid("rowByItem", pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        KullaniciListeRow = $row;
    }
    $scope.BtnKullaniciInsert = function(pTip)
    {
        if(pTip == 0)
        {
            $("#MdlKullanici").modal("show");
            $scope.BtnYeni();
        }
        else
        {
            if($scope.Kodu != '' && $scope.Kullanici != '' && $scope.Sifre != '')
            {
                KullaniciInsert();
            }
            else
            {
                alertify.alert(db.Language($scope.Lang,"Lütfen Boş Alanları Doldurun."));
            }
        }
    }
    $scope.BtnKullaniciGuncelle = function(pTip,pData)
    {
        if(pTip == 0)
        {
            $scope.Kodu = pData.CODE;
            $scope.Kullanici = pData.NAME;
            $scope.Sifre = pData.PASSWORD;
            $scope.Yetki = pData.TAG;
            $scope.AktifPasif = pData.STATUS == 0 ? false : true;
            $scope.KullaniciGuid = pData.GUID;
            $('#MdlKullaniciGuncelle').modal('show');
            console.log($scope.KullaniciGuid)
        }
        else
        {
            let UpdateData = 
            [
                $scope.Kodu,
                $scope.Kullanici,
                $scope.Yetki,
                $scope.Sifre,
                $scope.AktifPasif == true ? 1 : 0,
                $scope.KullaniciGuid 
            ]

            KullaniciUpdate(UpdateData);
        }
    }
    $scope.YeniEvrak = function()
    {
        Init();
        InitKullaniciGrid();
        KullaniciGetir();
    }
    $scope.BtnYeni = function()
    {
        $scope.Kullanici = "";
        $scope.Kodu = "";
        $scope.Sifre = "";
        $scope.Yetki = "0";
        $scope.AktifPasif = true;
    }
    $scope.BtnPluKaydet = async function()
    {
        if($scope.Kodu != '' && $scope.Kullanici != '' && $scope.Sifre != '')
        {
            let TmpQuery = 
            {
                db : $scope.Firma,
                query:  "DELETE FROM [POS_PLU] WHERE CUSER = @DUSER " +
                        "INSERT INTO [dbo].[POS_PLU] ( " +
                        " [CUSER] " +
                        ",[LUSER] " +
                        ",[CDATE] " +
                        ",[LDATE] " +
                        ",[NAME] " +
                        ",[LOCATION] " +
                        ",[TYPE] " +
                        ",[ITEMS_CODE] " +
                        ",[GRUP_INDEX] " +
                        ")  " +
                        "SELECT  " +
                        "@DUSER, " +
                        "@DUSER, " +
                        "GETDATE(), " +
                        "GETDATE(), " +
                        "[NAME], " +
                        "[LOCATION], " +
                        "[TYPE], " +
                        "[ITEMS_CODE], " +
                        "[GRUP_INDEX] " +
                        "FROM [POS_PLU] WHERE CUSER = @SUSER",
                param : ['SUSER:string|25','DUSER:string|25'],
                value : ['MAHO',$scope.Kullanici]
            }

            await db.ExecutePromiseQuery(TmpQuery);
        }
        else
        {
            alertify.alert(db.Language($scope.Lang,"Lütfen Boş Alanları Doldurun."));
        }
    }
}