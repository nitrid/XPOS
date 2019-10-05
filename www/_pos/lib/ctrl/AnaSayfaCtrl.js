function AnaSayfaCtrl($scope,$window,db)
{
    function Init()
    {
        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.Firma = $window.sessionStorage.getItem('Firma');
        
        $scope.Kullanici = UserParam.Kullanici
        $scope.Adi = UserParam.Adi
        $scope.SoyAdi = UserParam.Soyadi
        $scope.Sube = UserParam.PosSatis.Sube

        $scope.AlisEnvanter = 0;
        $scope.GenelToplam = 0;
        $scope.GunlukMusteriSayisi = 0;
        $scope.GenelGunlukToplam = 0;
        $scope.GenelAylikToplam = 0;
        $scope.GenelYillikToplam = 0;
        $scope.YoneticiPaneli = false;
        $scope.KullaniciPaneli = false;
        
        $scope.EnvanterListe = [];
        $scope.GunlukSatisListe = [];
        $scope.AylikSatisListe = [];
        $scope.GunlukKasaListe = [];
        $scope.MusteriSayisiListe = [];

    }
    function DivShowHide()
    {   
        if(UserParam.Yetkili == true)
        {
            $scope.YoneticiPaneli = true;
        }
        else
        {
            $scope.YoneticiPaneli = false;
            $scope.KullaniciPaneli = true;
        }
    }
    function AnaSayfaRaporlari()
    {
        var TmpEnvanter = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT " + 
                    "sto_kod AS KODU, " + 
                    "sto_isim AS ADI, " + 
                    "ISNULL((SELECT TOP 1 sfiyat_fiyati FROM STOK_SATIS_FIYAT_LISTELERI WHERE sfiyat_stokkod = sto_kod AND sfiyat_deposirano = 0 AND sfiyat_listesirano = 3),0) AS ALISFIYAT, " + 
                    "ISNULL((SELECT TOP 1 sfiyat_fiyati FROM STOK_SATIS_FIYAT_LISTELERI WHERE sfiyat_stokkod = sto_kod AND sfiyat_deposirano = 0 AND sfiyat_listesirano = 1),0) AS SATISFIYAT, " + 
                    "(SELECT dbo.fn_DepodakiMiktar(sto_kod,@SUBE,GETDATE())) - " + 
                    "ISNULL((SELECT SUM(CASE WHEN TIP = 1 THEN MIKTAR ELSE MIKTAR * -1 END) FROM TERP_POS_SATIS WHERE SKODU = sto_kod AND SUBE = @SUBE AND DURUM = 1),0) AS DEPOMIKTAR, " + 
                    "((SELECT dbo.fn_DepodakiMiktar(sto_kod,@SUBE,GETDATE())) - ISNULL((SELECT SUM(CASE WHEN TIP = 1 THEN MIKTAR ELSE MIKTAR * -1 END) FROM TERP_POS_SATIS WHERE SKODU = sto_kod AND SUBE = @SUBE AND DURUM = 1),0)) " + 
                    "* ISNULL((SELECT TOP 1 sfiyat_fiyati FROM STOK_SATIS_FIYAT_LISTELERI WHERE sfiyat_stokkod = sto_kod AND sfiyat_deposirano = 0 AND sfiyat_listesirano = 3),0) AS ALISENVANTER " + 
                    "FROM STOKLAR " + 
                    "WHERE (SELECT dbo.fn_DepodakiMiktar(sto_kod,@SUBE,GETDATE())) > 0",
            param:  ['SUBE'],
            type:   ['string|10'],
            value:  [$scope.Sube]
        }
        //GUNLUK SATIS
        if(UserParam.Yetkili == true)
        {
            var TmpGunlukSatis = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT " +
                        "SKODU AS KODU, " +
                        "TIP AS TIP, " +
                        "CASE WHEN TIP = 1 THEN 'SATIŞ' WHEN TIP = 2 THEN 'İADE' END AS TIPADI, " +
                        "CAST(SUM(MIKTAR) AS decimal(10,2)) AS MIKTAR, " +
                        "CAST(MAX(FIYAT) AS decimal(10,2))  AS FIYAT, " +
                        "CAST(SUM(MIKTAR * FIYAT) AS decimal(10,2)) AS TUTAR, " +
                        "CAST(SUM(ISKONTO) AS decimal(10,2)) AS ISKONTO, " +
                        "CAST(((SUM(MIKTAR) * MAX(FIYAT)) - SUM(ISKONTO)) * ((SELECT dbo.fn_VergiYuzde (MAX(KDVPNTR))) / 100) AS decimal(10,2)) AS KDV, " +
                        "CAST(((SUM(MIKTAR) * MAX(FIYAT)) - SUM(ISKONTO)) * (((SELECT dbo.fn_VergiYuzde (MAX(KDVPNTR))) / 100) + 1) AS decimal(10,2)) AS TOPLAM " +
                        "FROM TERP_POS_SATIS WHERE SUBE = @SUBE AND TARIH = CONVERT(VARCHAR, GETDATE(), 102) AND DURUM IN (1,2) " +
                        "GROUP BY SKODU,TIP",
                param:  ['SUBE'],
                type:   ['int'],
                value:  [$scope.Sube]
            }
        }
        else
        {   
            var TmpGunlukSatis = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT " +
                        "KULLANICI AS KULLANICI, " +
                        "SKODU AS KODU, " +
                        "TIP AS TIP, " +
                        "CASE WHEN TIP = 1 THEN 'SATIŞ' WHEN TIP = 2 THEN 'İADE' END AS TIPADI, " +
                        "CAST(SUM(MIKTAR) AS decimal(10,2)) AS MIKTAR, " +
                        "CAST(MAX(FIYAT) AS decimal(10,2))  AS FIYAT, " +
                        "CAST(SUM(MIKTAR * FIYAT) AS decimal(10,2)) AS TUTAR, " +
                        "CAST(SUM(ISKONTO) AS decimal(10,2)) AS ISKONTO, " +
                        "CAST(((SUM(MIKTAR) * MAX(FIYAT)) - SUM(ISKONTO)) * ((SELECT dbo.fn_VergiYuzde (MAX(KDVPNTR))) / 100) AS decimal(10,2)) AS KDV, " +
                        "CAST(((SUM(MIKTAR) * MAX(FIYAT)) - SUM(ISKONTO)) * (((SELECT dbo.fn_VergiYuzde (MAX(KDVPNTR))) / 100) + 1) AS decimal(10,2)) AS TOPLAM " +
                        "FROM TERP_POS_SATIS WHERE SUBE = @SUBE AND TARIH = CONVERT(VARCHAR, GETDATE(), 102) AND KULLANICI = @KULLANICI AND DURUM IN (1,2) " +
                        "GROUP BY SKODU,TIP,KULLANICI",
                param:  ['SUBE','KULLANICI'],
                type:   ['int','string|25'],
                value:  [$scope.Sube,$scope.Kullanici]
            }
        }
        //AYLIK SATIS
        if(UserParam.Yetkili == true)
        {
            var TmpAylikSatis = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT " +
                        "SKODU AS KODU, " +
                        "TIP AS TIP, " +
                        "CASE WHEN TIP = 1 THEN 'SATIŞ' WHEN TIP = 2 THEN 'İADE' END AS TIPADI, " +
                        "CAST(SUM(MIKTAR) AS decimal(10,2)) AS MIKTAR, " +
                        "CAST(MAX(FIYAT) AS decimal(10,2))  AS FIYAT, " +
                        "CAST(SUM(MIKTAR * FIYAT) AS decimal(10,2)) AS TUTAR, " +
                        "CAST(SUM(ISKONTO) AS decimal(10,2)) AS ISKONTO, " +
                        "CAST(((SUM(MIKTAR) * MAX(FIYAT)) - SUM(ISKONTO)) * ((SELECT dbo.fn_VergiYuzde (MAX(KDVPNTR))) / 100) AS decimal(10,2)) AS KDV, " +
                        "CAST(((SUM(MIKTAR) * MAX(FIYAT)) - SUM(ISKONTO)) * (((SELECT dbo.fn_VergiYuzde (MAX(KDVPNTR))) / 100) + 1) AS decimal(10,2)) AS TOPLAM " +
                        "FROM TERP_POS_SATIS WHERE SUBE = @SUBE AND TARIH > DATEADD(DAY,-30,GETDATE()) AND DURUM IN (1,2) " +
                        "GROUP BY SKODU,TIP",
                param:  ['SUBE'],
                type:   ['int'],
                value:  [$scope.Sube]
            }
        }
        else
        {
            var TmpAylikSatis = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT " +
                        "KULLANICI AS KULLANICI, " +
                        "SKODU AS KODU, " +
                        "TIP AS TIP, " +
                        "CASE WHEN TIP = 1 THEN 'SATIŞ' WHEN TIP = 2 THEN 'İADE' END AS TIPADI, " +
                        "CAST(SUM(MIKTAR) AS decimal(10,2)) AS MIKTAR, " +
                        "CAST(MAX(FIYAT) AS decimal(10,2))  AS FIYAT, " +
                        "CAST(SUM(MIKTAR * FIYAT) AS decimal(10,2)) AS TUTAR, " +
                        "CAST(SUM(ISKONTO) AS decimal(10,2)) AS ISKONTO, " +
                        "CAST(((SUM(MIKTAR) * MAX(FIYAT)) - SUM(ISKONTO)) * ((SELECT dbo.fn_VergiYuzde (MAX(KDVPNTR))) / 100) AS decimal(10,2)) AS KDV, " +
                        "CAST(((SUM(MIKTAR) * MAX(FIYAT)) - SUM(ISKONTO)) * (((SELECT dbo.fn_VergiYuzde (MAX(KDVPNTR))) / 100) + 1) AS decimal(10,2)) AS TOPLAM " +
                        "FROM TERP_POS_SATIS WHERE SUBE = @SUBE AND TARIH > DATEADD(DAY,-30,GETDATE()) AND KULLANICI = @KULLANICI AND DURUM IN (1,2) " +
                        "GROUP BY SKODU,TIP,KULLANICI",
                param:  ['SUBE','KULLANICI'],
                type:   ['int','string|25'],
                value:  [$scope.Sube,$scope.Kullanici]
            }
        }
        //YILLIK SATIS
        if(UserParam.Yetkili == true)
        {
            var TmpYillikSatis = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT " +
                        "SKODU AS KODU, " +
                        "TIP AS TIP, " +
                        "CASE WHEN TIP = 1 THEN 'SATIŞ' WHEN TIP = 2 THEN 'İADE' END AS TIPADI, " +
                        "CAST(SUM(MIKTAR) AS decimal(10,2)) AS MIKTAR, " +
                        "CAST(MAX(FIYAT) AS decimal(10,2))  AS FIYAT, " +
                        "CAST(SUM(MIKTAR * FIYAT) AS decimal(10,2)) AS TUTAR, " +
                        "CAST(SUM(ISKONTO) AS decimal(10,2)) AS ISKONTO, " +
                        "CAST(((SUM(MIKTAR) * MAX(FIYAT)) - SUM(ISKONTO)) * ((SELECT dbo.fn_VergiYuzde (MAX(KDVPNTR))) / 100) AS decimal(10,2)) AS KDV, " +
                        "CAST(((SUM(MIKTAR) * MAX(FIYAT)) - SUM(ISKONTO)) * (((SELECT dbo.fn_VergiYuzde (MAX(KDVPNTR))) / 100) + 1) AS decimal(10,2)) AS TOPLAM " +
                        "FROM TERP_POS_SATIS WHERE SUBE = @SUBE AND TARIH > DATEADD(DAY,-365,GETDATE()) AND DURUM IN (1,2) " +
                        "GROUP BY SKODU,TIP",
                param:  ['SUBE'],
                type:   ['int'],
                value:  [$scope.Sube]
            }
        }
        else
        {
            var TmpYillikSatis = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT " +
                        "KULLANICI AS KULLANICI, " +
                        "SKODU AS KODU, " +
                        "TIP AS TIP, " +
                        "CASE WHEN TIP = 1 THEN 'SATIŞ' WHEN TIP = 2 THEN 'İADE' END AS TIPADI, " +
                        "CAST(SUM(MIKTAR) AS decimal(10,2)) AS MIKTAR, " +
                        "CAST(MAX(FIYAT) AS decimal(10,2))  AS FIYAT, " +
                        "CAST(SUM(MIKTAR * FIYAT) AS decimal(10,2)) AS TUTAR, " +
                        "CAST(SUM(ISKONTO) AS decimal(10,2)) AS ISKONTO, " +
                        "CAST(((SUM(MIKTAR) * MAX(FIYAT)) - SUM(ISKONTO)) * ((SELECT dbo.fn_VergiYuzde (MAX(KDVPNTR))) / 100) AS decimal(10,2)) AS KDV, " +
                        "CAST(((SUM(MIKTAR) * MAX(FIYAT)) - SUM(ISKONTO)) * (((SELECT dbo.fn_VergiYuzde (MAX(KDVPNTR))) / 100) + 1) AS decimal(10,2)) AS TOPLAM " +
                        "FROM TERP_POS_SATIS WHERE SUBE = @SUBE AND TARIH > DATEADD(DAY,-365,GETDATE()) AND KULLANICI = @KULLANICI AND DURUM IN (1,2) " +
                        "GROUP BY SKODU,TIP,KULLANICI",
                param:  ['SUBE','KULLANICI'],
                type:   ['int','string|25'],
                value:  [$scope.Sube,$scope.Kullanici]
            }
        }
        //MUSTERI SAYISI
        if(UserParam.Yetkili == true)
        {
            var TmpMusteriSayisi = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT " +
                        "SERI,SIRA,COUNT(RECID) AS TOPLAM " +
                        "FROM TERP_POS_TAHSILAT WHERE SUBE = @SUBE AND TARIH = CONVERT(VARCHAR, GETDATE(), 102) " +
                        "GROUP BY SERI,SIRA ORDER BY SIRA",
                param:  ['SUBE'],
                type:   ['int'],
                value:  [$scope.Sube]
            }
        }
        else
        {
            var TmpMusteriSayisi = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT " +
                        "KULLANICI AS KULLANICI, " +
                        "SERI,SIRA,COUNT(RECID) AS TOPLAM " +
                        "FROM TERP_POS_TAHSILAT WHERE SUBE = @SUBE AND TARIH = CONVERT(VARCHAR, GETDATE(), 102) AND KULLANICI = @KULLANICI " +
                        "GROUP BY SERI,SIRA,KULLANICI ORDER BY SIRA",
                param:  ['SUBE','KULLANICI'],
                type:   ['int','string|25'],
                value:  [$scope.Sube,$scope.Kullanici]
            }
        }
        //GUNLUK KASA
        if(UserParam.Yetkili == true)
        {
            var TmpGunlukKasa = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT " +
                        "ISNULL((SELECT SUM(TUTAR) FROM TERP_POS_TAHSILAT " +
                        "WHERE TIP = 0 AND SUBE = @SUBE AND TARIH = CONVERT(VARCHAR, GETDATE(), 102)),0) AS NAKIT, " +
                        "ISNULL((SELECT SUM(TUTAR) FROM TERP_POS_TAHSILAT  " +
                        "WHERE TIP = 1 AND SUBE = @SUBE AND TARIH = CONVERT(VARCHAR, GETDATE(), 102)),0) AS KKARTI " ,
                param:  ['SUBE'],
                type:   ['int'],
                value:  [$scope.Sube]
            }
        }
        else
        {
            var TmpGunlukKasa = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT " +
                        "ISNULL((SELECT SUM(TUTAR) FROM TERP_POS_TAHSILAT " +
                        "WHERE TIP = 0 AND KULLANICI = @KULLANICI AND SUBE = @SUBE AND TARIH = CONVERT(VARCHAR, GETDATE(), 102)),0) AS NAKIT, " +
                        "ISNULL((SELECT SUM(TUTAR) FROM TERP_POS_TAHSILAT  " +
                        "WHERE TIP = 1 AND KULLANICI = @KULLANICI AND SUBE = @SUBE AND TARIH = CONVERT(VARCHAR, GETDATE(), 102)),0) AS KKARTI " ,
                param:  ['SUBE','KULLANICI'],
                type:   ['int','string|25'],
                value:  [$scope.Sube,$scope.Kullanici]
            }
        }
        db.GetDataQuery(TmpEnvanter,function(Data)
        {
            $scope.EnvanterListe = Data;
            $scope.AlisEnvanter = db.SumColumn($scope.EnvanterListe,"ALISENVANTER");
            $scope.AlisEnvanter = $scope.AlisEnvanter.toFixed(2);
        });
        db.GetDataQuery(TmpGunlukSatis,function(Data)
        {   
            $scope.GunlukSatisListe = Data;
            $scope.GenelGunlukToplam = db.SumColumn($scope.GunlukSatisListe,"TOPLAM","TIP = 1") - db.SumColumn($scope.GunlukSatisListe,"TOPLAM","TIP = 2");
        });
        db.GetDataQuery(TmpAylikSatis,function(Data)
        {   
            $scope.AylikSatisListe = Data;
            $scope.GenelAylikToplam = db.SumColumn($scope.AylikSatisListe,"TOPLAM","TIP = 1") - db.SumColumn($scope.AylikSatisListe,"TOPLAM","TIP = 2");
        });
        db.GetDataQuery(TmpYillikSatis,function(Data)
        {   
            $scope.GenelYillikToplam = Data;
            $scope.GenelYillikToplam = db.SumColumn($scope.GenelYillikToplam,"TOPLAM","TIP = 1") - db.SumColumn($scope.GenelYillikToplam,"TOPLAM","TIP = 2");
        });
        db.GetDataQuery(TmpMusteriSayisi,function(Data)
        {
            $scope.MusteriSayisiListe = Data;
            $scope.GunlukMusteriSayisi = $scope.MusteriSayisiListe.length;
        });
        db.GetDataQuery(TmpGunlukKasa,function(Data)
        {   
            $scope.GunlukKasaListe = Data;

            if($scope.GunlukKasaListe.length > 0)
            {   
                $scope.GunlukKasaNakit = $scope.GunlukKasaListe[0].NAKIT;
                $scope.GunlukKasaKKarti = $scope.GunlukKasaListe[0].KKARTI;
            }
            else
            {   
                $scope.GunlukKasaNakit = 1;
                $scope.GunlukKasaKKarti = 1;
            }
            
            (function () {
                var pieData = {
                  labels: ["Nakit","Kredi Kartı"],
                  datasets: [{
                    data: [$scope.GunlukKasaNakit,$scope.GunlukKasaKKarti],
                    backgroundColor: [Config.colors("blue", 600), Config.colors("red", 600)],
                    hoverBackgroundColor: [Config.colors("blue", 900), Config.colors("red", 900)]
                  }]
                };
                var myPie = new Chart(document.getElementById("GunlukSatisKKartiNakit").getContext("2d"), {
                  type: 'pie',
                  data: pieData,
                  options: {
                    responsive: true
                  }
                });
            })();
        });
    }
    $scope.Yeni = function()
    {
        Init();
        DivShowHide();
        AnaSayfaRaporlari();
    }
}