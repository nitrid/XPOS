function KullaniciParametreCtrl($scope,$window,db)
{
    let KullaniciSelectedRow = null;
    let DGetir = false;
    let File = "./www/_pos/lib/Param.js";

    $scope.Init = function()
    {
        $scope.KullaniciListe = Param;
        $scope.KullaniciListeSelectedIndex = 0;
        $scope.CmbParamList = [];
        $scope.ParamName = "Sistem";

        $scope.Kullanici = "";
        $scope.Sifre = "123456";
        $scope.Adi = "";
        $scope.Soyadi = "";
        $scope.Telefon = "";
        $scope.Email = "";
        $scope.MikroId = "";

        $scope.Yetkili = false;

        InitKullaniciGrid();

        $("#Grup2").hide();

        $scope.CmbParamChange();

    }
    $scope.KullaniciListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( KullaniciSelectedRow ) { KullaniciSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        KullaniciSelectedRow = $row;
        $scope.KullaniciListeSelectedIndex = pIndex;

        $scope.Yetkili = pItem.Yetkili;
    }
    $scope.Kaydet = function()
    {
        if (DGetir)
        {   
            Param[$scope.KullaniciListeSelectedIndex].Kullanici = $scope.Kullanici;
            Param[$scope.KullaniciListeSelectedIndex].Sifre = $scope.Sifre;
            Param[$scope.KullaniciListeSelectedIndex].Adi = $scope.Adi;
            Param[$scope.KullaniciListeSelectedIndex].Soyadi = $scope.Soyadi;
            Param[$scope.KullaniciListeSelectedIndex].Telefon = $scope.Telefon;
            Param[$scope.KullaniciListeSelectedIndex].Email = $scope.Email;
            Param[$scope.KullaniciListeSelectedIndex].MikroId = $scope.MikroId;
            Param[$scope.KullaniciListeSelectedIndex].Yetkili = $scope.Yetkili;
        }
        else
        {
            Param.push(JSON.parse(JSON.stringify(CreateParam())));
            Param[Param.length-1].Kullanici = $scope.Kullanici;
            Param[Param.length-1].Sifre = $scope.Sifre;
            Param[Param.length-1].Adi = $scope.Adi;
            Param[Param.length-1].Soyadi = $scope.Soyadi;
            Param[Param.length-1].Telefon = $scope.Telefon;
            Param[Param.length-1].Email = $scope.Email;
            Param[Param.length-1].MikroId = $scope.MikroId;
            Param[Param.length-1].Yetkili = $scope.Yetkili;
        }
        
        db.Emit('ParamSave',[Param,File]);
        
        $window.location.reload();
    }
    $scope.BtnYeni = function ()
    {
        DGetir = false;

        $scope.Kullanici = "";
        $scope.Sifre = "";
        $scope.Adi = "";
        $scope.Soyadi = "";
        $scope.Telefon = "";
        $scope.Email = "";
        $scope.MikroId = "";
        $scope.Yetkili = false;
    }
    $scope.BtnDuzenle = function()
    {
        DGetir = true;

        $scope.Kullanici = $scope.KullaniciListe[$scope.KullaniciListeSelectedIndex].Kullanici;
        $scope.Sifre = $scope.KullaniciListe[$scope.KullaniciListeSelectedIndex].Sifre;
        $scope.Adi = $scope.KullaniciListe[$scope.KullaniciListeSelectedIndex].Adi;
        $scope.Soyadi = $scope.KullaniciListe[$scope.KullaniciListeSelectedIndex].Soyadi;
        $scope.Telefon = $scope.KullaniciListe[$scope.KullaniciListeSelectedIndex].Telefon;
        $scope.Email = $scope.KullaniciListe[$scope.KullaniciListeSelectedIndex].Email;
        $scope.MikroId = $scope.KullaniciListe[$scope.KullaniciListeSelectedIndex].MikroId;
        $scope.Yetkili = $scope.KullaniciListe[$scope.KullaniciListeSelectedIndex].Yetkili;
    }
    $scope.BtnSil = function()
    {
        if($scope.KullaniciListeSelectedIndex != 0)
        {
            alertify.okBtn('Evet');
            alertify.cancelBtn('Hayır');

            alertify.confirm('Kullanıcıyı silmek istediğinize eminmisiniz ?', 
            function()
            { 
                Param.splice($scope.KullaniciListeSelectedIndex,1);                
                db.Emit('ParamSave',[Param,File]);
                $window.location.reload();
            }
            ,function(){});
            
        }
        else
        {
            alertify.okBtn('Tamam');
            alertify.alert('Admin kullanıcısını silemezsiniz !');
        }                
    }
    $scope.BtnParametre = function()
    {
        $("#Grup1").hide();
        $("#Grup2").show();

        for(i = 0; i < Object.keys(Param[$scope.KullaniciListeSelectedIndex]).length;i++)
        {
            if(typeof Object.values(Param[$scope.KullaniciListeSelectedIndex])[i] == "object")
            {
                $scope.CmbParamList.push({Name : Object.keys(Param[$scope.KullaniciListeSelectedIndex])[i]});
            }
        }
    }
    $scope.CmbParamChange = function()
    {
        let ParamData = GetParamObject($scope.ParamName);
        let HtmlData = "";
        for(i = 0; i < Object.keys(ParamData).length;i++)
        {
            if (i % 2 == 0)
            {
                HtmlData = HtmlData + "<div class='form-group row my-1'>";
                HtmlData = HtmlData + "<div class='col-6'>";
                HtmlData = HtmlData + "<div class='row'>";
                HtmlData = HtmlData + "<label class='form-control-label col-lg-4 col-md-4 col-sm-6 offset-0 pr-20 form-control-sm'><div class='float-right'><span style='color:dodgerblue;'><b>" + GetParamTitle($scope.ParamName,Object.keys(ParamData)[i]) + " : </b></span></div></label>";
                HtmlData = HtmlData + "<input type='text' id = '" + Object.keys(ParamData)[i] + "' class='form-control col-lg-8 col-md-8 col-sm-6 offset-0 form-control-sm' value = '" + Object.values(ParamData)[i] + "'>";
                HtmlData = HtmlData + "</div>";
                HtmlData = HtmlData + "</div>";

                if(Object.keys(ParamData).length == i)
                {
                    HtmlData = HtmlData + "</div>";
                }
            }
            else
            {
                HtmlData = HtmlData + "<div class='col-6'>";
                HtmlData = HtmlData + "<div class='row'>";
                HtmlData = HtmlData + "<label class='form-control-label col-lg-4 col-md-4 col-sm-6 offset-0 pr-20 form-control-sm'><div class='float-right'><span style='color:dodgerblue;'><b>" + GetParamTitle($scope.ParamName,Object.keys(ParamData)[i]) + " : </b></span></div></label>";
                HtmlData = HtmlData + "<input type='text' id = '" + Object.keys(ParamData)[i] + "' class='form-control col-lg-8 col-md-8 col-sm-6 offset-0 form-control-sm' value = '" + Object.values(ParamData)[i] + "'>";
                HtmlData = HtmlData + "</div>";
                HtmlData = HtmlData + "</div>";
                HtmlData = HtmlData + "</div>";
            }
        }
        document.getElementById('ParamView').innerHTML = HtmlData;
    }
    $scope.ParamKaydet = function()
    {
        let ParamData = GetParamObject($scope.ParamName);
        for(i = 0; i < Object.keys(ParamData).length;i++)
        {
            Param[$scope.KullaniciListeSelectedIndex][$scope.ParamName][Object.keys(ParamData)[i]] = document.getElementById(Object.keys(ParamData)[i]).value;
        }

        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Parametreleri kayıt etmek istediğinize eminmisiniz ?', 
        function()
        { 
            db.Emit('ParamSave',[Param,File]);
            $window.location.reload();
        }
        ,function(){});
    }
    $scope.ParamCikis = function()
    {
        $("#Grup1").show();
        $("#Grup2").hide();
    }
    $scope.BtnParamGuncelle = function()
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Parametreleri güncellemek istediğinize eminmisiniz ?', 
        function()
        {   
            for(i = 0;i < Param.length;i++)
            {
                for(let MasterItem in ParamTemp)
                {
                    if(!Param[i].hasOwnProperty(MasterItem))
                    {
                        if(typeof Object.values(Object.values(ParamTemp[MasterItem]))[0] == "object")
                        {
                            Param[i][MasterItem] = {};
                            for(let SubItem in ParamTemp[MasterItem])
                            {
                                if(!Param[i][MasterItem].hasOwnProperty(SubItem))
                                {
                                    Param[i][MasterItem][SubItem] = ParamTemp[MasterItem][SubItem].DefaultValue;
                                }                            
                            }
                        }
                        else
                        {
                            Param[i][MasterItem] = ParamTemp[MasterItem].DefaultValue;
                        }
                    }  
                    else
                    {
                        if(typeof Object.values(Object.values(ParamTemp[MasterItem]))[0] == "object")
                        {
                            Param[i][MasterItem] = {};
                            for(let SubItem in ParamTemp[MasterItem])
                            {
                                if(!Param[i][MasterItem].hasOwnProperty(SubItem))
                                {
                                    Param[i][MasterItem][SubItem] = ParamTemp[MasterItem][SubItem].DefaultValue;
                                }                            
                            }
                        } 
                    }              
                }    
            }
            
            db.Emit('ParamSave',[Param,File]);
            $window.location.reload();
        }
        ,function(){});
    }
    function GetParamObject(pName)
    {
        for(i = 0; i < Object.keys(Param[$scope.KullaniciListeSelectedIndex]).length;i++)
        {
            if(typeof Object.values(Param[$scope.KullaniciListeSelectedIndex])[i] == "object")
            {
                if(Object.keys(Param[$scope.KullaniciListeSelectedIndex])[i] == pName)
                {
                    //ParamTemp objesi döndürülüyor.
                    for(let MasterItem in ParamTemp[pName])
                    {
                        //Param objesinde ParamTemp item karşılaştırlıyor.
                        if(!Param[$scope.KullaniciListeSelectedIndex][pName].hasOwnProperty(MasterItem))
                        {
                            //Eğer Param objesinde o item yoksa param objesine default değeri ekleniyor.
                            Param[$scope.KullaniciListeSelectedIndex][pName][MasterItem] = ParamTemp[pName][MasterItem].DefaultValue;
                        }
                    }
                    return Object.values(Param[$scope.KullaniciListeSelectedIndex])[i];
                }
            }
        }

        // for(i = 0; i < Object.keys(Param[$scope.KullaniciListeSelectedIndex]).length;i++)
        // {
        //     if(typeof Object.values(Param[$scope.KullaniciListeSelectedIndex])[i] == "object")
        //     {
        //         if(Object.keys(Param[$scope.KullaniciListeSelectedIndex])[i] == pName)
        //         {
        //              return Object.values(Param[$scope.KullaniciListeSelectedIndex])[i];
        //         }
        //     }
        // }
    }
    function GetParamTitle(pName,pKey)
    {
        if(ParamTemp[pName].hasOwnProperty(pKey))
        {
            return ParamTemp[$scope.ParamName][pKey].Title;
        }
        return pKey;
    }
    function CreateParam()
    {
        let TmpParam = {};

        for(let MasterItem in ParamTemp)
        {
            if(typeof Object.values(Object.values(ParamTemp[MasterItem]))[0] == "object")
            {
                TmpParam[MasterItem] = {};
                for(let SubItem in ParamTemp[MasterItem])
                {
                    TmpParam[MasterItem][SubItem] = ParamTemp[MasterItem][SubItem].DefaultValue;
                }
            }
            else
            {
                TmpParam[MasterItem] = ParamTemp[MasterItem].DefaultValue;
            }
        }
        return TmpParam;
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
            
            fields: 
            [
            {
                name: "Adi",
                title: "Adi",
                type: "text",
                align: "center",
                width: 75
            },
            {
                name: "Soyadi",
                title: "SOYADI",
                type: "text",
                align: "center",
                width: 75
            },
            {
                name: "Kullanici",
                title: "KULLANICI",
                type: "text",
                align: "center",
                width: 75
            }, 
            {
                name: "Sifre",
                title: "ŞİFRE",
                type: "text",
                align: "center",
                width: 75
            },
            {
                name: "Telefon",
                title: "TELEFON",
                type: "number",
                align: "center",
                width: 75
            },
            {
                name: "Email",
                title: "EMAİL",
                type: "text",
                align: "center",
                width: 75
            },
            {
                name: "MikroId",
                title: "MIKROID",
                type: "number",
                align: "center",
                width: 75
            }],
            rowClick: function(args)
            {
                $scope.KullaniciListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
}