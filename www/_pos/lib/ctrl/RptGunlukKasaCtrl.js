function RptGunlukKasaCtrl($scope,$window,db)
{
    function InitIslemGrid()
    {
        $("#TblIslem").jsGrid
        ({
            width: "100%",
            height: "350px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.IslemListe,
            fields: 
            [
                {
                    name: "TIPADI",
                    title: "TİPİ",
                    type: "text",
                    align: "center",
                    width: 75
                },
                {
                    name: "TIP",
                    type: "number",
                    align: "center",
                    width: 100
                },
                {
                    name: "TUTAR",
                    type: "number",
                    align: "center",
                    width: 75
                }
            ]
        });
    }
    $scope.Init = function()
    {
        InitIslemGrid();
        
        $scope.Firma = $window.sessionStorage.getItem('Firma');
        UserParam = Param[$window.sessionStorage.getItem('User')];

        $scope.IlkTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.SonTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Sube = "0";
        $scope.GenelToplam = 0;

        $scope.IslemListe = [];
        $scope.SubeListe = [];

          db.FillCmbDocInfo($scope.Firma,'CmbDepoGetir',function(data)
        {
            $scope.SubeListe = data; 
            
            if(UserParam.PosSatis.Sube == 0)
            {
                $scope.Sube = data[0].KODU.toString();
            }
            else
            {   
                $scope.Sube = UserParam.PosSatis.Sube;
                $scope.SubeLock = true;
            }
        });
    }
    $scope.BtnGetir = function()
    {
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT " +
                    "CASE WHEN EVRAKTIP = 0 THEN 'ÖDEME' WHEN EVRAKTIP = 1 THEN 'TEDİYE' END AS TIPADI, " +
                    "EVRAKTIP AS EVRAKTIP, " +
                    "CASE WHEN TIP = 0 THEN " +
                    "'NAKİT' " +
                    "WHEN TIP = 1 THEN " +
                    "'KREDİ KARTI' " +
                    "WHEN TIP = 2 THEN " +
                    "'AÇIK HESAP' " +
                    "END AS TIP, " +
                    "CAST(SUM(TUTAR) AS decimal(10,2)) AS TUTAR " +
                    "FROM TERP_POS_TAHSILAT WHERE SUBE = @SUBE AND TARIH >= @ILKTARIH AND TARIH <= @SONTARIH " +
                    "GROUP BY TIP,EVRAKTIP",
            param:  ['SUBE','ILKTARIH','SONTARIH'],
            type:   ['int','date','date'],
            value:  [$scope.Sube,$scope.IlkTarih,$scope.SonTarih]
        }

        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.IslemListe = Data;
            $("#TblIslem").jsGrid({data : $scope.IslemListe});
            $scope.GenelToplam = db.SumColumn($scope.IslemListe,"TUTAR","EVRAKTIP = 0") - db.SumColumn($scope.IslemListe,"TUTAR","EVRAKTIP = 1") - db.SumColumn($scope.IslemListe,"TUTAR","TIP = AÇIK HESAP");
        });
    }
}