function GunSonuCtrl ($scope,$window,db)
{
    async function OdemeGetir(pTarih,pDevice)
    {
        let TmpQuery = 
        {
            query: "SELECT " +
                   "TYPE AS TYPE, " +
                   "TYPE_NAME AS TYPE_NAME, " +
                   "CASE WHEN DOC_TYPE = 0 THEN SUM(AMOUNT) ELSE SUM(AMOUNT) * -1 END AS AMOUNT " +
                   "FROM POS_PAYMENT_VW_01 WHERE DOC_DATE >= @ILKTARIH AND DOC_DATE <= @SONTARIH AND DEVICE = @DEVICE " +
                   "GROUP BY TYPE_NAME,DOC_TYPE,TYPE ORDER BY TYPE ASC",
            param: ['ILKTARIH:date','SONTARIH:date','DEVICE:string|25'],
            value: [pTarih,pTarih,pDevice]
        }

        let TmpData = await db.GetPromiseQuery(TmpQuery);
        return TmpData;
    }
    $scope.Init = function()
    {
        $scope.CurrentPage = 1;
        
        $scope.Tarih = new Date();
        $scope.Kasa = "";
        $scope.Avans = 0;
        $scope.Nakit = 0;
        $scope.KKarti = 0;
        $scope.Cek = 0;
        $scope.Ticket = 0;
        $scope.Label = 
        {
            Nakit : 0,
            KKarti : 0,
            Cek : 0,
            Ticket : 0
        }
        
        $scope.ObjTarih = 
        {
            type: "date",
            value: new Date(),
            bindingOptions: 
            {
                value: "Tarih"
            },
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
            
            if(TmpVal == $scope.Nakit && TmpVal != 0)
            {
                $scope.Label.Nakit = "Doğru"
            }
            else
            {
                $scope.Label.Nakit = $scope.Nakit - TmpVal;
            }
            
            TmpVal = db.SumColumn(TmpData,"AMOUNT","TYPE = 1").toDigit2();
            if(TmpVal == $scope.KKarti && TmpVal != 0)
            {
                $scope.Label.KKarti = "Doğru"
            }
            else
            {
                $scope.Label.KKarti = $scope.KKarti - TmpVal;
            }

            TmpVal = db.SumColumn(TmpData,"AMOUNT","TYPE = 2").toDigit2();
            if(TmpVal == $scope.Cek && TmpVal != 0)
            {
                $scope.Label.Cek = "Doğru"
            }
            else
            {
                $scope.Label.Cek = $scope.Cek - TmpVal;
            }

            TmpVal = db.SumColumn(TmpData,"AMOUNT","TYPE = 3").toDigit2();
            if(TmpVal == $scope.Ticket && TmpVal != 0)
            {
                $scope.Label.Ticket = "Doğru"
            }
            else
            {
                $scope.Label.Ticket = $scope.Ticket - TmpVal;
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