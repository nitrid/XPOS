function RptMagazaSatisCtrl($scope,$window,db)
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
                    name: "KODU",
                    type: "text",
                    align: "center",
                    width: 100
                },
                {
                    name: "ADI",
                    type: "text",
                    align: "center",
                    width: 200
                    
                },
                {
                    name: "ALISFIYAT",
                    title: "ALIŞ FİYATI",
                    type: "number",
                    align: "center",
                    width: 110
                },
                {
                    name: "SATISFIYAT",
                    title: "SATIŞ FİYATI",
                    type: "number",
                    align: "center",
                    width: 110
                },
                {
                    name: "MIKTAR",
                    title: "SATIS MIKTARI",
                    type: "number",
                    align: "center",
                    width: 110
                }, 
                {
                    name: "SATISTUTAR",
                    title: "SATIŞ TUTARI",
                    type: "number",
                    align: "center",
                    width: 110
                }, 
                {
                    name: "KAR",
                    title: "NET KAR",
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
        $scope.ToplamSatis = 0;
        $scope.ToplamKar = 0;

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
            query:  "SELECT *, " +
                    "ROUND(ALISFIYAT * MIKTAR,0) AS ALISTUTAR, " +
                    "CAST(SATISTUTAR - (ALISFIYAT * MIKTAR) as DECIMAL(10,2)) AS KAR  " +
                    "FROM (SELECT " +
                    "SKODU AS KODU, " +
                    "ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod = SKODU),'') AS ADI, " +
                    "ISNULL((SELECT TOP 1 sfiyat_fiyati FROM STOK_SATIS_FIYAT_LISTELERI WHERE sfiyat_stokkod = SKODU AND sfiyat_deposirano = 0 AND sfiyat_listesirano = 3),0) AS ALISFIYAT, " +
                    "ISNULL((SELECT TOP 1 sfiyat_fiyati FROM STOK_SATIS_FIYAT_LISTELERI WHERE sfiyat_stokkod = SKODU AND sfiyat_deposirano = 0 AND sfiyat_listesirano = 1),0) AS SATISFIYAT, " +
                    "SUM(CASE WHEN TIP = 1 THEN MIKTAR ELSE MIKTAR * -1 END) AS MIKTAR, " +
                    "SUM(CASE WHEN TIP = 1 THEN ROUND(((MIKTAR * FIYAT) - ISKONTO),0) ELSE ROUND(((MIKTAR * FIYAT ) - ISKONTO) * -1,0) END) AS SATISTUTAR  " +
                    "FROM TERP_POS_SATIS WHERE SUBE = @SUBE AND TARIH >= @ILKTARIH AND TARIH <= @SONTARIH " +
                    "GROUP BY SKODU) AS SATIS",
            param:  ['SUBE','ILKTARIH','SONTARIH'],
            type:   ['string|10','date','date',],
            value:  [$scope.Sube,$scope.IlkTarih,$scope.SonTarih]
        }

        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.IslemListe = Data;

            $("#TblIslem").jsGrid({data : $scope.IslemListe});
            
            $scope.ToplamSatis = db.SumColumn($scope.IslemListe,"SATISTUTAR");
            $scope.ToplamKar = db.SumColumn($scope.IslemListe,"KAR");
        });
    }
}