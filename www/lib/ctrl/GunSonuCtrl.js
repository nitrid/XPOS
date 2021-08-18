function GunSonuCtrl ($scope,$window,db)
{
    async function OdemeGetir(pTarih,pDevice)
    {
        let TmpQuery = 
        {
            query: "SELECT " +
                   "MAX(DOC_DATE) AS DOC_DATE,TYPE AS TYPE, " +
                   "TYPE_NAME AS TYPE_NAME, " +
                   "CASE WHEN DOC_TYPE = 0 THEN SUM(AMOUNT) ELSE SUM(AMOUNT) * -1 END AS AMOUNT " +
                   "FROM POS_PAYMENT_VW_01 WHERE DOC_DATE >= @ILKTARIH AND DOC_DATE <= @SONTARIH AND DEVICE = @DEVICE " +
                   "GROUP BY TYPE_NAME,DOC_TYPE,TYPE ORDER BY TYPE ASC",
            param: ['ILKTARIH:date','SONTARIH:date','DEVICE:string|25'],
            value: [moment(pTarih).format("DD.MM.YYYY"),moment(pTarih).format("DD.MM.YYYY"),pDevice]
        }

        let TmpData = await db.GetPromiseQuery(TmpQuery);
        return TmpData;
    }
    $scope.Init = function()
    {
        $scope.CurrentPage = 1;
        
        $scope.Tarih = new Date(),
        $scope.Kasa = "";
        $scope.Avans = "";
        $scope.Nakit = "";
        $scope.KKarti = "";
        $scope.Cek = "";
        $scope.Ticket = "";
        $scope.Label = 
        {
            Nakit : 0,
            KKarti : 0,
            Cek : 0,
            Ticket : 0
        }
        $scope.Style = 
        {
            Nakit : {'color':'black'},
            KKarti : {'color':'black'},
            Cek : {'color':'black'},
            Ticket : {'color':'black'}
        }
        $scope.ObjTarih = 
        {
            width: "100%",
            type: "date",
            value: moment(new Date()),
            bindingOptions: 
            {
                value: "Tarih"
            },
        }
        $scope.CmbKasa = 
        {
            width: "100%",
            dataSource: ["001","002","003","004"],
            showClearButton: true,
            bindingOptions: 
            {
                value: "Kasa",
            },
            onSelectionChanged : function(e)
            {
                if(e.selectedItem == null)
                {
                    $scope.Kasa = ""
                }
            }
        }

        $("#Pane1").addClass('active');
        $("#Pane2").removeClass('active');
        $("#Pane3").removeClass('active');

        $("#Pearl1").removeClass('disabled');
        $("#Pearl1").removeClass('done');
        $("#Pearl1").addClass('active');
        $("#Pearl1").addClass('current');

        $("#Pearl2").removeClass('active');
        $("#Pearl2").removeClass('current');
        $("#Pearl2").removeClass('done');
        $("#Pearl2").addClass('disabled');

        $("#Pearl3").removeClass('active');
        $("#Pearl3").removeClass('current');
        $("#Pearl3").removeClass('done');
        $("#Pearl3").addClass('disabled');
        
        $("#Pearl4").removeClass('active');
        $("#Pearl4").removeClass('current');
        $("#Pearl4").removeClass('done');
        $("#Pearl4").addClass('disabled');

        $("#Pearl5").removeClass('active');
        $("#Pearl5").removeClass('current');
        $("#Pearl5").removeClass('done');
        $("#Pearl5").addClass('disabled');

        $("#Pearl6").removeClass('active');
        $("#Pearl6").removeClass('current');
        $("#Pearl6").removeClass('done');
        $("#Pearl6").addClass('disabled');

        $("#Pearl7").removeClass('active');
        $("#Pearl7").removeClass('current');
        $("#Pearl7").removeClass('done');
        $("#Pearl7").addClass('disabled');
    }
    $scope.BtnNext = async function()
    {
        if($scope.CurrentPage == 1)
        {
            if(moment(new Date()).diff($scope.Tarih,'days') > 2)
            {
                alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                alertify.alert(db.Language($scope.Lang,"Seçitiğiniz tarih 2 günden fazla olamaz !"));
                return;
            }
            if($scope.Kasa == "")
            {
                alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                alertify.alert(db.Language($scope.Lang,"Lütfen kasa kodunu seçiniz !"));
                return;
            }
        }
        else if($scope.CurrentPage == 2)
        {
            if($scope.Avans == "")
            {
                alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                alertify.alert(db.Language($scope.Lang,"Lütfen bir tutar giriniz !"));
                return;
            }
        }
        else if($scope.CurrentPage == 3)
        {
            if($scope.Nakit == "")
            {
                alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                alertify.alert(db.Language($scope.Lang,"Lütfen bir tutar giriniz !"));
                return;
            }
        }
        else if($scope.CurrentPage == 4)
        {
            if($scope.KKarti == "")
            {
                alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                alertify.alert(db.Language($scope.Lang,"Lütfen bir tutar giriniz !"));
                return;
            }
        }
        else if($scope.CurrentPage == 5)
        {
            if($scope.Cek == "")
            {
                alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                alertify.alert(db.Language($scope.Lang,"Lütfen bir tutar giriniz !"));
                return;
            }
        }
        else if($scope.CurrentPage == 6)
        {
            if($scope.Ticket == "")
            {
                alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                alertify.alert(db.Language($scope.Lang,"Lütfen bir tutar giriniz !"));
                return;
            }
        }

        if($scope.CurrentPage < 6)
        {            
            $("#Pane" + $scope.CurrentPage).removeClass('active');

            $("#Pearl" + $scope.CurrentPage).removeClass('active');
            $("#Pearl" + $scope.CurrentPage).removeClass('current');
            $("#Pearl" + $scope.CurrentPage).addClass('done');

            $scope.CurrentPage += 1;

            $("#Pane" + $scope.CurrentPage).addClass('active');
    
            $("#Pearl" + $scope.CurrentPage).addClass('active');
            $("#Pearl" + $scope.CurrentPage).addClass('current');
            $("#Pearl" + $scope.CurrentPage).removeClass('disabled');
        }
        else if($scope.CurrentPage == 6)
        {
            $("#Pane" + $scope.CurrentPage).removeClass('active');

            $("#Pearl" + $scope.CurrentPage).removeClass('active');
            $("#Pearl" + $scope.CurrentPage).removeClass('current');
            $("#Pearl" + $scope.CurrentPage).addClass('done');

            $scope.CurrentPage += 1;

            $("#Pane" + $scope.CurrentPage).addClass('active');
    
            $("#Pearl" + $scope.CurrentPage).addClass('active');
            $("#Pearl" + $scope.CurrentPage).addClass('current');
            $("#Pearl" + $scope.CurrentPage).removeClass('disabled');
            
            let TmpData = await OdemeGetir($scope.Tarih,$scope.Kasa);
            let TmpVal = db.SumColumn(TmpData,"AMOUNT","TYPE = 0").toDigit2();
            
            if(TmpVal == ($scope.Nakit - $scope.Avans) && TmpVal == 0)
            {
                $scope.Label.Nakit = "Doğru"
                $scope.Style.Nakit = {'color':'green'}
            }
            else
            {
                if(parseFloat(($scope.Nakit - $scope.Avans) - TmpVal).toDigit2() > 0)
                {
                    $scope.Style.Nakit = {'color':'blue'}
                }
                else
                {
                    $scope.Style.Nakit = {'color':'red'}
                }

                $scope.Label.Nakit = parseFloat(($scope.Nakit - $scope.Avans) - TmpVal).toDigit2() > 0 ? "+" + parseFloat(($scope.Nakit - $scope.Avans) - TmpVal).toDigit2() : parseFloat(($scope.Nakit - $scope.Avans) - TmpVal).toDigit2();
            }
            
            TmpVal = db.SumColumn(TmpData,"AMOUNT","TYPE = 1").toDigit2();
            if(TmpVal == $scope.KKarti && TmpVal == 0)
            {
                $scope.Label.KKarti = "Doğru"
                $scope.Style.KKarti = {'color':'green'}
            }
            else
            {
                if(parseFloat($scope.KKarti - TmpVal).toDigit2() > 0)
                {
                    $scope.Style.KKarti = {'color':'blue'}
                }
                else
                {
                    $scope.Style.KKarti = {'color':'red'}
                }
                $scope.Label.KKarti = parseFloat($scope.KKarti - TmpVal).toDigit2() > 0 ? "+" + parseFloat($scope.KKarti - TmpVal).toDigit2() : parseFloat($scope.KKarti - TmpVal).toDigit2();                
            }

            TmpVal = db.SumColumn(TmpData,"AMOUNT","TYPE = 2").toDigit2();
            if(TmpVal == $scope.Cek && TmpVal == 0)
            {
                $scope.Label.Cek = "Doğru"
                $scope.Style.Cek = {'color':'green'}
            }
            else
            {
                if(parseFloat($scope.Cek - TmpVal).toDigit2() > 0)
                {
                    $scope.Style.Cek = {'color':'blue'}
                }
                else
                {
                    $scope.Style.Cek = {'color':'red'}
                }
                $scope.Label.Cek = parseFloat($scope.Cek - TmpVal).toDigit2() > 0 ? "+" + parseFloat($scope.Cek - TmpVal).toDigit2() : parseFloat($scope.Cek - TmpVal).toDigit2();                
            }

            TmpVal = db.SumColumn(TmpData,"AMOUNT","TYPE = 3").toDigit2();
            if(TmpVal == $scope.Ticket && TmpVal == 0)
            {
                $scope.Label.Ticket = "Doğru"
                $scope.Style.Ticket = {'color':'green'}
            }
            else
            {
                if(parseFloat($scope.Ticket - TmpVal).toDigit2() > 0)
                {
                    $scope.Style.Ticket = {'color':'blue'}
                }
                else
                {
                    $scope.Style.Ticket = {'color':'red'}
                }

                $scope.Label.Ticket = parseFloat($scope.Ticket - TmpVal).toDigit2() > 0 ? "+" + parseFloat($scope.Ticket - TmpVal).toDigit2() : parseFloat($scope.Ticket - TmpVal).toDigit2();                
            }
            $scope.$apply();
        }
    }
    $scope.BtnBack = function()
    {
        if($scope.CurrentPage > 1)
        {
            $("#Pane" + $scope.CurrentPage).removeClass('active');
        
            $("#Pearl" + $scope.CurrentPage).removeClass('active');
            $("#Pearl" + $scope.CurrentPage).removeClass('current');
            $("#Pearl" + $scope.CurrentPage).addClass('disabled');

            $scope.CurrentPage -= 1;

            $("#Pane" + $scope.CurrentPage).addClass('active');
    
            $("#Pearl" + $scope.CurrentPage).addClass('active');
            $("#Pearl" + $scope.CurrentPage).addClass('current');
            $("#Pearl" + $scope.CurrentPage).removeClass('done');          
        }
    }
}