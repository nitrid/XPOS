function RptMagazaStokCtrl($scope,$window,db)
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
                    name: "DEPOMIKTAR",
                    title: "DEPO MİKTAR",
                    type: "number",
                    align: "center",
                    width: 110
                }, 
                {
                    name: "ALISENVANTER",
                    title : "ALIŞ ENVANTER",
                    type: "number",
                    align: "center",
                    width: 110
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
        $scope.AlisEnvanter = 0;

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
                    "sto_kod AS KODU, " + 
                    "sto_isim AS ADI, " + 
                    "ISNULL((SELECT TOP 1 ROUND(sfiyat_fiyati,2) FROM STOK_SATIS_FIYAT_LISTELERI WHERE sfiyat_stokkod = sto_kod AND sfiyat_deposirano = 0 AND sfiyat_listesirano = 3),0) AS ALISFIYAT, " + 
                    "ISNULL((SELECT TOP 1 ROUND(sfiyat_fiyati,2) FROM STOK_SATIS_FIYAT_LISTELERI WHERE sfiyat_stokkod = sto_kod AND sfiyat_deposirano = 0 AND sfiyat_listesirano = 1),0) AS SATISFIYAT, " + 
                    "(SELECT dbo.fn_DepodakiMiktar(sto_kod,@SUBE,GETDATE())) - " + 
                    "ISNULL((SELECT SUM(CASE WHEN TIP = 1 THEN MIKTAR ELSE MIKTAR * -1 END) FROM TERP_POS_SATIS WHERE SKODU = sto_kod AND SUBE = @SUBE AND DURUM = 1),0) AS DEPOMIKTAR, " + 
                    "((SELECT dbo.fn_DepodakiMiktar(sto_kod,@SUBE,GETDATE())) - ISNULL((SELECT SUM(CASE WHEN TIP = 1 THEN MIKTAR ELSE MIKTAR * -1 END) FROM TERP_POS_SATIS WHERE SKODU = sto_kod AND SUBE = @SUBE AND DURUM = 1),0)) " + 
                    "* ISNULL((SELECT TOP 1 ROUND(sfiyat_fiyati,0) FROM STOK_SATIS_FIYAT_LISTELERI WHERE sfiyat_stokkod = sto_kod AND sfiyat_deposirano = 0 AND sfiyat_listesirano = 3),0) AS ALISENVANTER " + 
                    "FROM STOKLAR " + 
                    "WHERE (SELECT dbo.fn_DepodakiMiktar(sto_kod,@SUBE,GETDATE())) > 0",
            param:  ['SUBE'],
            type:   ['string|10'],
            value:  [$scope.Sube]
        }

        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.IslemListe = Data;
            $("#TblIslem").jsGrid({data : $scope.IslemListe});
            
            $scope.AlisEnvanter = db.SumColumn($scope.IslemListe,"ALISENVANTER");
        });
    }
}