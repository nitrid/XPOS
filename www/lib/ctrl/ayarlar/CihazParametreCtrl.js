function CihazParametreCtrl($route,$scope,$window,$rootScope,db)
{
    let CihazListeRow = null;
    $('#MdlCihaz').on('hide.bs.modal', function () 
    {
        $scope.KasaID = "";
        $scope.KasaAdi = "";
        $scope.SubeKodu = "1";
    });
    $('#MdlCihazGuncelle').on('hide.bs.modal', function () 
    {
        $scope.KasaID = "";
        $scope.KasaAdi = "";
        $scope.SubeKodu = "1";
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
        $scope.KasaID = "";
        $scope.KasaAdi = "";
        $scope.SubeKodu = "";
        $scope.AktifPasif = true;
        $scope.SatisSeri = "IRS";
        $scope.CariKodu = "1";
        $scope.CihazGuid = "";
        $scope.EkranPort = "";
        $scope.OdemePort = "";
        $scope.TeraziPort = "";
        $scope.ScannerPort = "";

        $scope.CihazListe = [];
        $scope.SubeListe = [];
    }
    function InitCihazGrid()
    {   
        $("#TblCihaz").jsGrid({
            responsive: true,
            width: "100%",
            height: "500px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.CihazListe,
            autoload: true,
            fields: 
            [
                {
                    name: "ID",
                    title: db.Language($scope.Lang,"KASA ID"),
                    type: "text",
                    align: "center",
                    width: 80
                },
                {
                    name: "NAME",
                    title: db.Language($scope.Lang,"KASA ADI"),
                    type: "text",
                    align: "center",
                    width: 120
                },
                {
                    name: "SUBENO",
                    title: db.Language($scope.Lang,"ŞUBE NO"),
                    type: "text",
                    align: "center",
                    width: 120
                },
                {
                    name: "DURUM",
                    title: db.Language($scope.Lang,"KASA DURUM"),
                    type: "number",
                    align: "center",
                    width: 50
                },
                [
                    { 
                        itemTemplate: function(_, item) 
                        {
                            return $("<button type='submit' style='height:30px; font-size: 12px;' class='btn btn-info btn-block'></button>").text(db.Language($scope.Lang,"Güncelle"))
                                .on("click", function() 
                                {
                                    $scope.BtnCihazGuncelle(0,item);
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

                                    alertify.confirm(db.Language($scope.Lang,'Cihaz Silmek İstediğinize Emin Misiniz ?'), 
                                    function()
                                    { 
                                        CihazDelete(item);
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
                            return $("<button type='submit' style='height:30px; font-size: 12px;' class='btn btn-primary btn-block' langu>Ayarlar</button>")
                                .on("click", function() 
                                {
                                    ParamGetir(item.ID);
                                    $scope.KasaID = item.ID
                                    $("#TbMain").removeClass('active');
                                    $("#TbParametre").addClass('active');
                                    $scope.$apply();
                                });
                        },
                        width: 25
                    }
                ],
            ],
        });
    }
    function CihazGetir()
    {
        db.GetData($scope.Firma,'CihazGetir',[''],function(data)
        {   
            $scope.CihazListe = data;
            $("#TblCihaz").jsGrid({data : $scope.CihazListe});
            $scope.BtnYeni();
        });
    }
    function CihazInsert()
    {
        var InsertData = 
        [
            $scope.KasaID,
            $scope.KasaAdi,
            $scope.AktifPasif == true ? 1 : 0
        ];

        db.ExecuteTag($scope.Firma,'CihazInsert',InsertData,async function(InsertResult)
        {              
            if(typeof(InsertResult.result.err) == 'undefined')
            {   
                alertify.alert(db.Language($scope.Lang,"Kayıt İşlemi Gerçekleşti."))
                //PARAM INSERT
                let Param =
                [
                    {
                        SatisSeri : $scope.SatisSeri,
                    },
                    {
                        CariKodu : $scope.CariKodu,
                    },
                    {
                        DepoNo : $scope.SubeKodu,
                    },
                    {
                        EkranPort : $scope.EkranPort
                    },
                    {
                        OdemePort : $scope.OdemePort
                    },
                    {
                        TeraziPort : $scope.TeraziPort
                    },
                    {
                        ScannerPort : $scope.ScannerPort
                    }
                ]

                for (let i = 0; i < Param.length; i++) 
                {
                    ParamInsert(Object.keys(Param[i]),Object.values(Param[i]),$scope.KasaID)
                }
                $('#MdlCihaz').modal('hide');
                CihazGetir();
            }   
            else
            {
                alertify.alert(db.Language($scope.Lang,"Kayıt İşleminde Hata."));
                console.log(InsertResult.result.err);
            }
        });
    }
    function CihazUpdate(pData)
    {
        db.ExecuteTag($scope.Firma,'CihazUpdate',pData,async function(InsertResult)
        {         
            if(typeof(InsertResult.result.err) == 'undefined')
            {   
                alertify.alert(db.Language($scope.Lang,"Cihaz Güncellendi."));
                $('#MdlCihazGuncelle').modal('hide');
                CihazGetir();
            }   
            else
            {
                alertify.alert(db.Language($scope.Lang,"Cihaz Güncelleme İşleminde Hata."));
                console.log(InsertResult.result.err);
            }
        });
    }
    function CihazDelete(pData)
    {
        db.ExecuteTag($scope.Firma,'CihazDelete',[pData.GUID],async function(InsertResult)
        {              
            if(typeof(InsertResult.result.err) == 'undefined')
            {   
                ParamDelete(pData);
                alertify.alert(db.Language($scope.Lang,"Cihaz Silme İşlemi Gerçekleşti"));
                CihazGetir();
            }   
            else
            {
                alertify.alert(db.Language($scope.Lang,"Cihaz Silme İşleminde Hata."));
                console.log(InsertResult.result.err);
            }
        });
    }
    function ParamGetir(pID)
    {
        db.GetData($scope.Firma,'ParamGetir',[pID],function(data)
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
        db.ExecuteTag($scope.Firma,'ParamDelete',[pData.ID],async function(InsertResult)
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
    function ParamInsert(pKeys,pValues,pKasaID)
    {
        let InsertData = 
        [
            pKasaID,
            pKasaID,
            pKeys[0],
            pValues[0],
            'CİHAZ',
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
    function ParamUpdate(pKeys,pValues,pID)
    {
        var UpdateData = 
        [
            pValues[0],
            pKeys[0],
            pID
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
    $scope.CihazRowClick = function(pIndex,pItem,pObj)
    {
        if ( CihazListeRow ) { CihazListeRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = $("#TblCihaz").jsGrid("rowByItem", pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        CihazListeRow = $row;
    }
    $scope.BtnCihazInsert = function(pTip)
    {
        if(pTip == 0)
        {
            $("#MdlCihaz").modal("show");
            $scope.BtnYeni();
        }
        else
        {
            if($scope.KasaID != '' && $scope.KasaAdi != '')
            {
                CihazInsert();
            }
            else
            {
                alertify.alert(db.Language($scope.Lang,"Lütfen Boş Alanları Doldurun."));
            }
        }
    }
    $scope.BtnCihazGuncelle = function(pTip,pData)
    {
        if(pTip == 0)
        {
            $('#MdlCihazGuncelle').modal('show');
            $scope.KasaID = pData.ID;
            $scope.KasaAdi = pData.NAME;
            $scope.AktifPasif = pData.STATUS == 0 ? false : true;
            $scope.CihazGuid = pData.GUID;
        }
        else
        {
            let UpdateData = 
            [
                $scope.KasaID,
                $scope.KasaAdi,
                $scope.AktifPasif == true ? 1 : 0,
                $scope.CihazGuid 
            ]

            CihazUpdate(UpdateData);
        }
    }
    $scope.BtnParamGuncelle = function()
    {
        if($scope.KasaID != "")
        {
            let Param =
            [
                {
                    SatisSeri : $scope.SatisSeri,
                },
                {
                    CariKodu : $scope.CariKodu,
                },
                {
                    DepoNo : $scope.SubeKodu,
                },
                {
                    EkranPort : $scope.EkranPort,
                },
                {
                    OdemePort : $scope.OdemePort,
                },
                {
                    TeraziPort : $scope.TeraziPort,
                },
                {
                    ScannerPort : $scope.ScannerPort,
                },
            ]
            for (let i = 0; i < Param.length; i++) 
            {
                ParamUpdate(Object.keys(Param[i]),Object.values(Param[i]),$scope.KasaID)
            }
        }
        else
        {
            alert(db.Language($scope.Lang,"Parametre Güncellemesi İçin Cihaz Seçmelisiniz."))
        }

        alert(db.Language($scope.Lang,"Parametreler Güncellendi."));
    }
    $scope.YeniEvrak = function()
    {
        Init();
        InitCihazGrid();
        CihazGetir();

        db.GetData($scope.Firma,'CmbDepoGetir',['TÜMÜ'],function(data)
        {   
            $scope.SubeListe = data;
            $scope.SubeKodu = $scope.SubeListe[0].KODU;
        });
    }
    $scope.BtnGeri = function()
    {
        $("#TbMain").addClass('active');
        $("#TbParametre").removeClass('active');
        CihazGetir();
    }
    $scope.BtnYeni = function()
    {
        $scope.KasaID = "";
        $scope.KasaAdi = "";
        $scope.SatisSeri = "IRS";
        $scope.CariKodu = "1";
        $scope.CihazGuid = ""; //CİHAZ GÜNCELLEME SİLME İŞLEMİ İÇİN KULLANILIYOR.
        $scope.EkranPort = "COM1";
        $scope.OdemePort = "COM2";
        $scope.TeraziPort = "COM3";
        $scope.ScannerPort = "COM4";
    }
}