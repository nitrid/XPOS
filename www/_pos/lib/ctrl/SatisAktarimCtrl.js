function SatisAktarimCtrl($scope,$window,db)
{
    let UserParam = null;
    function InitIslemGrid()
    {
        $("#TblIslem").jsGrid
        ({
            width: "100%",
            height: "600px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.IslemListe,
            fields: 
            [
                {
                    name: "TARIH",
                    type: "text",
                    align: "center",
                    width: 40
                    
                },
                {
                    name: "TIPADI",
                    title: "TIP",
                    type: "text",
                    align: "center",
                    width: 50
                },
                {
                    name: "SERI",
                    type: "text",
                    align: "center",
                    width: 30
                },
                {
                    name: "SUBEADI",
                    title: "SUBE",
                    type: "text",
                    align: "center",
                    width: 80
                },
                {
                    name: "SADI",
                    title: "ADI",
                    type: "text",
                    align: "center",
                    width: 150
                },
                {
                    name: "MIKTAR",
                    type: "number",
                    align: "center",
                    width: 50
                }, 
                {
                    name: "TUTAR",
                    type: "number",
                    align: "center",
                    width: 50
                }, 
                {
                    name: "ISKONTO",
                    type: "number",
                    align: "center",
                    width: 50
                }, 
                {
                    name: "KDV",
                    type: "number",
                    align: "center",
                    width: 50
                }, 
                {
                    name: "TOPLAM",
                    type: "number",
                    align: "center",
                    width: 50
                }
            ]
        });
    }
    function CariHarInsertData(pData,pEvrSira)
    {
        let EvrTip = 63;
        let Tip = 0;
        let Cins = 7;
        let Iade = 0;

        if(pData.TIP == 1)
        {
            EvrTip = 63;
            Tip = 0;
            Cins = 7;
            Iade = 0;
        }
        else if(pData.TIP == 2)
        {
            EvrTip = 0;
            Tip = 1;
            Cins = 7;
            Iade = 1;
        }


        let InsertData = 
        [
            UserParam.MikroId,      //cha_create_user
            UserParam.MikroId,      //cha_lastup_user
            0,                      //cha_firmano
            0,                      //cha_subeno
            EvrTip,                 //cha_evrak_tip
            pData.SERI,             //cha_evrakno_seri
            pEvrSira,               //cha_evrakno_sira
            pData.TARIH,            //cha_tarihi
            Tip,                    //cha_tip
            Cins,                   //cha_cinsi
            Iade,                   //cha_normal_Iade
            0,                      //cha_tpoz
            1,                      //cha_ticaret_turu
            '',                     //cha_belge_no
            pData.TARIH,            //cha_belge_tarih
            '',                     //cha_aciklama
            '',                     //cha_satici_kodu
            '',                     //cha_EXIMkodu
            '',                     //cha_projekodu
            0,                      //cha_cari_cins
            pData.MKODU,            //cha_kod
            pData.MKODU,            //cha_ciro_cari_kodu
            0,                      //cha_d_cins
            1,                      //cha_d_kur
            1,                      //cha_altd_kur
            0,                      //cha_grupno
            '',                     //cha_srmrkkodu
            0,                      //cha_kasa_hizmet
            '',                     //cha_kasa_hizkod
            0,                      //cha_karsidgrupno
            pData.TOPLAM,           //cha_meblag
            pData.TUTAR,            //cha_aratoplam
            0,                      //cha_vade
            pData.ISKONTO,          //cha_ft_iskonto1
            0,                      //cha_ft_iskonto2
            0,                      //cha_ft_iskonto3
            0,                      //cha_ft_iskonto4
            0,                      //cha_ft_iskonto5
            0,                      //cha_ft_iskonto6
            0,                      //cha_ft_masraf1
            0,                      //cha_ft_masraf2
            0,                      //cha_ft_masraf3
            0,                      //cha_ft_masraf4
            pData.KDVPNTR,          //cha_vergipntr
            (pData.KDVPNTR == 1) ? pData.KDV : 0,   //cha_vergi1
            (pData.KDVPNTR == 2) ? pData.KDV : 0,   //cha_vergi2
            (pData.KDVPNTR == 3) ? pData.KDV : 0,   //cha_vergi3
            (pData.KDVPNTR == 4) ? pData.KDV : 0,   //cha_vergi4
            (pData.KDVPNTR == 5) ? pData.KDV : 0,   //cha_vergi5
            (pData.KDVPNTR == 6) ? pData.KDV : 0,   //cha_vergi6
            (pData.KDVPNTR == 7) ? pData.KDV : 0,   //cha_vergi7
            (pData.KDVPNTR == 8) ? pData.KDV : 0,   //cha_vergi8
            (pData.KDVPNTR == 9) ? pData.KDV : 0,   //cha_vergi9
            (pData.KDVPNTR == 10) ? pData.KDV : 0,   //cha_vergi10
            0,                      //cha_vergisiz_fl
            0,                      //cha_otvtutari
            0,                      //cha_otvvergisiz_fl
            0,                      //cha_oivergisiz_fl
            '',                     //cha_trefno
            0,                      //cha_sntck_poz
            0                       //cha_e_islem_turu
        ];

        return InsertData;
    }
    function StokHarInsertData(pData,pEvrSira,pCariGuid)
    {
        let EvrTip = 4;
        let Tip = 1;
        let Cins = 1;
        let Iade = 0;

        if(pData.TIP == 1)
        {
            EvrTip = 4;
            Tip = 1;
            Cins = 1;
            Iade = 0;
        }
        else if(pData.TIP == 2)
        {
            EvrTip = 3;
            Tip = 0;
            Cins = 1;
            Iade = 1;
        }

        let InsertData =
        [
            UserParam.MikroId,              //sth_create_user
            UserParam.MikroId,              //sth_lastup_user
            0,                              //sth_firmano
            0,                              //sth_subeno
            pData.TARIH,                    //sth_tarih
            Tip,                            //sth_tip
            Cins,                           //sth_cins
            Iade,                           //sth_normal_iade
            EvrTip,                         //sth_evraktip
            pData.SERI,                     //sth_evrakno_seri
            pEvrSira,                       //sth_evrakno_sira
            '',                             //sth_belge_no
            pData.TARIH,                    //sth_belge_tarih
            pData.SKODU,                    //sth_stok_kod
            0,                              //sth_isk_mas1
            0,                              //sth_isk_mas2
            0,                              //sth_isk_mas3
            0,                              //sth_isk_mas4
            0,                              //sth_isk_mas5
            0,                              //sth_isk_mas6
            0,                              //sth_isk_mas7
            0,                              //sth_isk_mas8
            0,                              //sth_isk_mas9
            0,                              //sth_isk_mas10
            1,                              //sth_sat_iskmas1
            1,                              //sth_sat_iskmas2
            1,                              //sth_sat_iskmas3
            1,                              //sth_sat_iskmas4
            1,                              //sth_sat_iskmas5
            1,                              //sth_sat_iskmas6
            1,                              //sth_sat_iskmas7
            1,                              //sth_sat_iskmas8
            1,                              //sth_sat_iskmas9
            1,                              //sth_sat_iskmas10
            0,                              //sth_cari_cinsi
            pData.MKODU,                    //sth_cari_kodu
            '',                             //sth_plasiyer_kodu
            0,                              //sth_har_doviz_cinsi
            1,                              //sth_har_doviz_kuru
            1,                              //sth_alt_doviz_kuru
            0,                              //sth_stok_doviz_cinsi
            1,                              //sth_stok_doviz_kuru
            pData.MIKTAR,                   //sth_miktar
            pData.MIKTAR,                   //sth_miktar2
            1,                              //sth_birim_pntr
            pData.TUTAR,                    //sth_tutar
            pData.ISKONTO,                  //sth_iskonto1
            0,                              //sth_iskonto2
            0,                              //sth_iskonto3
            0,                              //sth_iskonto4
            0,                              //sth_iskonto5
            0,                              //sth_iskonto6
            0,                              //sth_masraf1
            0,                              //sth_masraf2
            0,                              //sth_masraf3
            0,                              //sth_masraf4
            pData.KDVPNTR,                  //sth_vergi_pntr          
            pData.KDV,                      //sth_vergi
            0,                              //sth_masraf_vergi_pntr
            0,                              //sth_masraf_vergi
            0,                              //sth_odeme_op
            '',                             //sth_aciklama
            '00000000-0000-0000-0000-000000000000', //sth_sip_uid
            pCariGuid,                      //sth_fat_uid,
            pData.SUBE,                             //sth_giris_depo_no
            pData.SUBE,                             //sth_cikis_depo_no
            pData.TARIH,                            //sth_malkbl_sevk_tarihi
            '',                                     //sth_cari_srm_merkezi
            '',                                     //sth_stok_srm_merkezi
            0,                                      //sth_vergisiz_fl
            1,                                      //sth_adres_no
            '',                                     //sth_parti_kodu
            0,                                      //sth_lot_no
            '',                                     //sth_proje_kodu
            '',                                     //sth_exim_kodu
            0,                                      //sth_disticaret_turu
            0,                                      //sth_otvvergisiz_fl
            0,                                      //sth_oivvergisiz_fl
            0                                       //sth_fiyat_liste_no
        ];

        return InsertData;
    }
    $scope.Init = function()
    {
        InitIslemGrid();
        
        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.Firma = $window.sessionStorage.getItem('Firma');
        $scope.Sube = "";
        $scope.IlkTarih = new Date().toLocaleDateString('tr-TR',{ year: 'numeric', month: 'numeric', day: 'numeric' });
        $scope.SonTarih = new Date().toLocaleDateString('tr-TR',{ year: 'numeric', month: 'numeric', day: 'numeric' });
        $scope.FormLock = false;
        $scope.StatusTitle = "";

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
        $scope.StatusTitle = "";

        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT " +
                    "CONVERT(nvarchar(25),TARIH,104) AS TARIH, " +
                    "TIP, " + 
                    "CASE WHEN TIP = 1 THEN 'SATIS' WHEN TIP = 2 THEN 'IADE' END AS TIPADI, " +
                    "MAX(SERI) AS SERI, " +
                    "SUBE, " +
                    "ISNULL((SELECT dep_adi FROM DEPOLAR WHERE dep_no = MAX(SUBE)),'') AS SUBEADI, " +
                    "MKODU, " +
                    "SKODU, " +
                    "ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod = SKODU),'') AS SADI, " +
                    "MAX(KDVPNTR) AS KDVPNTR, " +
                    "SUM(MIKTAR) AS MIKTAR, " +
                    "CAST(SUM(MIKTAR * FIYAT) AS decimal(10,2)) AS TUTAR, " +
                    "CAST(SUM(ISKONTO) AS decimal(10,2)) AS ISKONTO, " + 
                    "CAST(((SUM(MIKTAR * FIYAT)) - SUM(ISKONTO)) * ((SELECT dbo.fn_VergiYuzde (MAX(KDVPNTR))) / 100) AS decimal(10,2)) AS KDV, " +
                    "CAST(((SUM(MIKTAR * FIYAT)) - SUM(ISKONTO)) * (((SELECT dbo.fn_VergiYuzde (MAX(KDVPNTR))) / 100) + 1) AS decimal(10,2)) AS TOPLAM " + 
                    "FROM TERP_POS_SATIS WHERE ((SUBE = @SUBE) OR (@SUBE = '')) AND TARIH >= @ILKTARIH AND TARIH <= @SONTARIH AND DURUM = 1 " +
                    "GROUP BY SKODU,SUBE,TARIH,MKODU,TIP ORDER BY CONVERT(DATETIME,TARIH),SUBE,MKODU,TIP ASC",
            param:  ['SUBE','ILKTARIH','SONTARIH'],
            type:   ['string|10','date','date'],
            value:  [$scope.Sube,$scope.IlkTarih,$scope.SonTarih]
        }

        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.IslemListe = Data;
            $("#TblIslem").jsGrid({data : $scope.IslemListe});
        });
    }
    $scope.BtnAktar = async function()
    {
        let TmpEvrSira = 1;
        let TmpSube = "";
        let TmpTarih = "";
        let TmpChaGuid = "";
        let TmpCariKodu = "";
        let TmpTip = 0;        

        let TmpKdv1 = 0;
        let TmpKdv2 = 0;
        let TmpKdv3 = 0;
        let TmpKdv4 = 0;
        let TmpKdv5 = 0;
        let TmpKdv6 = 0;
        let TmpKdv7 = 0;
        let TmpKdv8 = 0;
        let TmpKdv9 = 0;
        let TmpKdv10 = 0;
        let TmpIskonto = 0;
        let TmpTutar = 0;
        let TmpToplam = 0;

        $scope.FormLock = true;
        $scope.StatusTitle = "Evraklar Aktarılıyor...";

        for(i = 0;i < $scope.IslemListe.length;i++)
        {
            if($scope.IslemListe[i].SUBE != TmpSube || $scope.IslemListe[i].TARIH != TmpTarih || $scope.IslemListe[i].MKODU != TmpCariKodu || $scope.IslemListe[i].TIP != TmpTip)
            {
                TmpSube = $scope.IslemListe[i].SUBE;
                TmpTarih = $scope.IslemListe[i].TARIH;
                TmpCariKodu = $scope.IslemListe[i].MKODU;
                TmpTip = $scope.IslemListe[i].TIP;                

                TmpKdv1 = 0;
                TmpKdv2 = 0;
                TmpKdv3 = 0;
                TmpKdv4 = 0;
                TmpKdv5 = 0;
                TmpKdv6 = 0;
                TmpKdv7 = 0;
                TmpKdv8 = 0;
                TmpKdv9 = 0;
                TmpKdv10 = 0;
                TmpIskonto = 0;
                TmpTutar = 0;
                TmpToplam = 0;

                let EvrTip = 63;
                if (TmpTip == 1)
                    EvrTip = 63;
                else if(TmpTip == 2)
                    EvrTip = 0;

                await db.GetPromiseTag($scope.Firma,'MaxCariHarSira',[$scope.IslemListe[i].SERI,EvrTip],function(data)
                {
                    TmpEvrSira = data[0].MAXEVRSIRA + 1;
                });

                await db.ExecutePromiseTag($scope.Firma,'CariHarInsert',CariHarInsertData($scope.IslemListe[i],TmpEvrSira),function(data)
                {                    
                    TmpChaGuid = data.result.recordset[0].cha_Guid;
                    //POS SATIS UPDATE
                    var TmpQuery = 
                    {
                        db : '{M}.' + $scope.Firma,
                        query:  "UPDATE [dbo].[TERP_POS_SATIS] SET [DURUM] = 2 WHERE TARIH = CONVERT(DATETIME,@TARIH,104) AND SUBE = @SUBE AND MKODU = @MKODU AND TIP = @TIP",
                        param:  ['TARIH','SUBE','MKODU','TIP'],
                        type:   ['date','int','string|25','int'],
                        value:  [TmpTarih,TmpSube,TmpCariKodu,TmpTip]
                    }
                    db.ExecuteQuery(TmpQuery);
                });                
            }
            
            await db.ExecutePromiseTag($scope.Firma,'StokHarInsert',StokHarInsertData($scope.IslemListe[i],TmpEvrSira,TmpChaGuid),function()
            {
                TmpKdv1 = TmpKdv1 + ($scope.IslemListe[i].KDVPNTR == 1) ? $scope.IslemListe[i].KDV : 0;
                TmpKdv2 = TmpKdv2 + ($scope.IslemListe[i].KDVPNTR == 2) ? $scope.IslemListe[i].KDV : 0;
                TmpKdv3 = TmpKdv3 + ($scope.IslemListe[i].KDVPNTR == 3) ? $scope.IslemListe[i].KDV : 0;
                TmpKdv4 = TmpKdv4 + ($scope.IslemListe[i].KDVPNTR == 4) ? $scope.IslemListe[i].KDV : 0;
                TmpKdv5 = TmpKdv5 + ($scope.IslemListe[i].KDVPNTR == 5) ? $scope.IslemListe[i].KDV : 0;
                TmpKdv6 = TmpKdv6 + ($scope.IslemListe[i].KDVPNTR == 6) ? $scope.IslemListe[i].KDV : 0;
                TmpKdv7 = TmpKdv7 + ($scope.IslemListe[i].KDVPNTR == 7) ? $scope.IslemListe[i].KDV : 0;
                TmpKdv8 = TmpKdv8 + ($scope.IslemListe[i].KDVPNTR == 8) ? $scope.IslemListe[i].KDV : 0;
                TmpKdv9 = TmpKdv9 + ($scope.IslemListe[i].KDVPNTR == 9) ? $scope.IslemListe[i].KDV : 0;
                TmpKdv10 = TmpKdv10 + ($scope.IslemListe[i].KDVPNTR == 10) ? $scope.IslemListe[i].KDV : 0;
                TmpIskonto = TmpIskonto + $scope.IslemListe[i].ISKONTO;
                TmpTutar = TmpTutar + $scope.IslemListe[i].TUTAR;
                TmpToplam = TmpToplam + $scope.IslemListe[i].TOPLAM;

                let CariHarUpdate = 
                [
                    TmpToplam,
                    TmpTutar,
                    TmpKdv1,
                    TmpKdv2,
                    TmpKdv3,
                    TmpKdv4,
                    TmpKdv5,
                    TmpKdv6,
                    TmpKdv7,
                    TmpKdv8,
                    TmpKdv9,
                    TmpKdv10,
                    TmpIskonto,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    TmpChaGuid
                ];

                db.ExecuteTag($scope.Firma,'CariHarUpdate',CariHarUpdate);
            });
        }    

        $scope.BtnGetir();
        $scope.StatusTitle = "Evrak Aktarımı Tamamlandı.";
        $scope.FormLock = false;  
        $scope.$apply();   
    }   
}