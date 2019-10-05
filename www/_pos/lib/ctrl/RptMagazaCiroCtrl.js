function RptMagazaCiroCtrl($scope,$window,db)
{
    function InitIslemGrid()
    {
        $("#TblIslem").jsGrid
        ({
            width: "100%",
            height: "600px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            sorting: true,
            paging: true,
            autoload: true,
            
            data : $scope.IslemListe,
            fields: 
            [
                {
                    name: "SUBEADI",
                    title: "ŞUBE ADI",
                    type: "text",
                    align: "center",
                    width: 100
                },
                {
                    name: "ARATOPLAM",
                    type: "number",
                    align: "center",
                    width: 100
                }, 
                {
                    name: "ISKONTO",
                    type: "number",
                    align: "center",
                    width: 100
                }, 
                {
                    name: "GENELTOPLAM",
                    type: "number",
                    align: "center",
                    width: 100
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
        $scope.Sube = "";
        $scope.AraToplam = 0;
        $scope.ToplamIndirim = 0;
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
                    "ISNULL((SELECT dep_adi FROM DEPOLAR WHERE dep_no = SUBE),'') AS SUBEADI, " + 
                    "CAST(SUM(CASE WHEN TIP = 1 THEN MIKTAR * FIYAT ELSE (MIKTAR * FIYAT) * -1 END) AS decimal(10,2)) AS ARATOPLAM, " + 
                    "CAST(SUM(CASE WHEN TIP = 1 THEN ISKONTO ELSE ISKONTO * -1 END) AS decimal(10,2)) AS ISKONTO, " + 
                    "CAST(((SUM(CASE WHEN TIP = 1 THEN MIKTAR * FIYAT ELSE (MIKTAR * FIYAT) * -1 END)) - SUM(CASE WHEN TIP = 1 THEN ISKONTO ELSE ISKONTO * 1 END)) AS decimal(10,2)) AS GENELTOPLAM " + 
                    "FROM TERP_POS_SATIS WHERE TARIH >= @ILKTARIH AND TARIH <= @SONTARIH AND ((SUBE = @SUBE) OR (@SUBE = '')) AND DURUM IN (1,2) " + 
                    "GROUP BY SUBE ORDER BY SUBE DESC",
            param:  ['SUBE','ILKTARIH','SONTARIH'],
            type:   ['string|10','date','date',],
            value:  [$scope.Sube,$scope.IlkTarih,$scope.SonTarih]
        }

        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.IslemListe = Data;
            $("#TblIslem").jsGrid({data : $scope.IslemListe});
            
            $scope.AraToplam = db.SumColumn($scope.IslemListe,"ARATOPLAM");
            $scope.ToplamIndirim = db.SumColumn($scope.IslemListe,"ISKONTO");
            $scope.GenelToplam = db.SumColumn($scope.IslemListe,"GENELTOPLAM");
        });
    }
}