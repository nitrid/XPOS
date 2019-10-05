function TahsilatAktarimCtrl($scope,$window,db)
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
                    name: "EVRAKTIPADI",
                    title: "EVRAK ADI",
                    type: "text",
                    align: "center",
                    width: 80
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
                    name: "TIPADI",
                    title: "TIP",
                    type: "text",
                    align: "center",
                    width: 150
                },
                {
                    name: "TUTAR",
                    type: "number",
                    align: "center",
                    width: 50
                }
            ]
        });
    }
    function CariHarInsertData(pData,pEvrSira,pRefNo)
    {
        let TmpCins = 0;
        let TmpKasaHiz = 0;
        let TmpKarsiGrup = 0;
        let TmpSntCk = 0;

        let TmpEvrTip = 1;
        let TmpTip = 0;

        if(pData.EVRAKTIP == 0)
        {
            TmpEvrTip = 1;
            TmpTip = 1;
        }
        else if(pData.EVRAKTIP == 1)
        {
            TmpEvrTip = 64;
            TmpTip = 0;
        }

        if(pData.TIP == 0)
        {
            TmpCins = 0;
            TmpKasaHiz = 4;
            TmpKarsiGrup = 0;
            TmpSntCk = 0;
        }
        else if(pData.TIP == 1)
        {
            TmpCins = 19;
            TmpKasaHiz = 2;
            TmpKarsiGrup = 7;
            TmpSntCk = 2;
        }

        let InsertData = 
        [
            UserParam.MikroId,      //cha_create_user
            UserParam.MikroId,      //cha_lastup_user
            0,                      //cha_firmano
            0,                      //cha_subeno
            TmpEvrTip,              //cha_evrak_tip
            pData.SERI,             //cha_evrakno_seri
            pEvrSira,               //cha_evrakno_sira
            pData.TARIH,            //cha_tarihi
            TmpTip,                 //cha_tip
            TmpCins,                //cha_cinsi
            0,                      //cha_normal_Iade
            0,                      //cha_tpoz
            0,                      //cha_ticaret_turu
            '',                     //cha_belge_no
            pData.TARIH,            //cha_belge_tarih
            '',                     //cha_aciklama
            '',                     //cha_satici_kodu
            '',                     //cha_EXIMkodu
            '',                     //cha_projekodu
            0,                      //cha_cari_cins
            pData.MKODU,            //cha_kod
            '',                     //cha_ciro_cari_kodu
            0,                      //cha_d_cins
            1,                      //cha_d_kur
            1,                      //cha_altd_kur
            0,                      //cha_grupno
            '',                     //cha_srmrkkodu
            TmpKasaHiz,             //cha_kasa_hizmet
            pData.KKODU,            //cha_kasa_hizkod
            TmpKarsiGrup,           //cha_karsidgrupno
            pData.TUTAR,            //cha_meblag
            pData.TUTAR,            //cha_aratoplam
            0,                      //cha_vade
            0,                      //cha_ft_iskonto1
            0,                      //cha_ft_iskonto2
            0,                      //cha_ft_iskonto3
            0,                      //cha_ft_iskonto4
            0,                      //cha_ft_iskonto5
            0,                      //cha_ft_iskonto6
            0,                      //cha_ft_masraf1
            0,                      //cha_ft_masraf2
            0,                      //cha_ft_masraf3
            0,                      //cha_ft_masraf4
            0,                      //cha_vergipntr
            0,                      //cha_vergi1
            0,                      //cha_vergi2
            0,                      //cha_vergi3
            0,                      //cha_vergi4
            0,                      //cha_vergi5
            0,                      //cha_vergi6
            0,                      //cha_vergi7
            0,                      //cha_vergi8
            0,                      //cha_vergi9
            0,                      //cha_vergi10
            0,                      //cha_vergisiz_fl
            0,                      //cha_otvtutari
            0,                      //cha_otvvergisiz_fl
            0,                      //cha_oivergisiz_fl
            pRefNo,                 //cha_trefno
            TmpSntCk,               //cha_sntck_poz
            0                       //cha_e_islem_turu
        ];

        return InsertData;
    }
    function CekHarInsertData(pData,pEvrSira,pEvrSatir,pRefNo)
    {
        let InsertData =
        [
            UserParam.MikroId,              //sck_create_user
            UserParam.MikroId,              //sck_lastup_user
            0,                              //sck_firmano
            0,                              //sck_subeno
            6,                              //sck_tip
            pRefNo,                         //sck_refno
            pData.MADI,                     //sck_borclu
            pData.TARIH,                    //sck_vade
            pData.TUTAR,                    //sck_tutar
            0,                              //sck_doviz
            0,                              //sck_odenen
            0,                              //sck_sahip_cari_cins
            pData.MKODU,                    //sck_sahip_cari_kodu
            0,                              //sck_sahip_cari_grupno
            2,                              //sck_nerede_cari_cins
            pData.KKODU,                    //sck_nerede_cari_kodu
            7,                              //sck_nerede_cari_grupno
            pData.TARIH,                    //sck_ilk_hareket_tarihi
            pData.SERI,                     //sck_ilk_evrak_seri
            pEvrSira,                       //sck_ilk_evrak_sira_no
            pEvrSatir,                      //sck_ilk_evrak_satir_no
            pData.TARIH,                    //sck_son_hareket_tarihi
            1,                              //sck_doviz_kur
            2,                              //sck_sonpoz
            '',                             //sck_srmmrk
            ''                              //sck_projekodu
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
                    "EVRAKTIP, " + 
                    "CASE WHEN EVRAKTIP = 0 THEN 'TAHSILAT' WHEN EVRAKTIP = 1 THEN 'ODEME' END AS EVRAKTIPADI, " +
                    "MAX(SERI) AS SERI, " + 
                    "SUBE, " + 
                    "ISNULL((SELECT dep_adi FROM DEPOLAR WHERE dep_no = MAX(SUBE)),'') AS SUBEADI, " + 
                    "MKODU, " + 
                    "KKODU, " + 
                    "CASE WHEN TIP = 0 THEN " + 
                    "'Nakit' " +
                    "WHEN TIP = 1 THEN " +
                    "'Kredi Kartı' " +
                    "END AS TIPADI, " +
                    "SUM(TUTAR) AS TUTAR " + 
                    "FROM TERP_POS_TAHSILAT WHERE ((SUBE = @SUBE) OR (@SUBE = '')) AND TARIH >= @ILKTARIH AND TARIH <= @SONTARIH " + 
                    "AND DURUM <> 2 AND TIP IN (0,1) " + 
                    "GROUP BY KKODU,SUBE,TARIH,MKODU,TIP,EVRAKTIP ORDER BY CONVERT(DATETIME,TARIH),SUBE,MKODU,EVRAKTIP ASC",
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
        let TmpRefNo = "";
        let TmpSatirNo = 0;
        let TmpEvrTip = 0; 

        $scope.FormLock = true;
        $scope.StatusTitle = "Evraklar Aktarılıyor...";

        for(i = 0;i < $scope.IslemListe.length;i++)
        {
            if($scope.IslemListe[i].SUBE != TmpSube || $scope.IslemListe[i].TARIH != TmpTarih || $scope.IslemListe[i].MKODU != TmpCariKodu || $scope.IslemListe[i].EVRAKTIP != TmpEvrTip)
            {
                TmpSube = $scope.IslemListe[i].SUBE;
                TmpTarih = $scope.IslemListe[i].TARIH;
                TmpCariKodu = $scope.IslemListe[i].MKODU;
                TmpEvrTip = $scope.IslemListe[i].EVRAKTIP;

                let EvrTip = 1;
                if (TmpEvrTip == 0)
                    EvrTip = 1;
                else if(TmpEvrTip == 1)
                    EvrTip = 64;
                    
                await db.GetPromiseTag($scope.Firma,'MaxCariHarSira',[$scope.IslemListe[i].SERI,EvrTip],function(data)
                {
                    TmpEvrSira = data[0].MAXEVRSIRA + 1;
                });          
                
                //POS SATIS UPDATE
                var TmpQuery = 
                {
                    db : '{M}.' + $scope.Firma,
                    query:  "UPDATE [dbo].[TERP_POS_TAHSILAT] SET [DURUM] = 2 WHERE TARIH = CONVERT(DATETIME,@TARIH,104) AND SUBE = @SUBE AND MKODU = @MKODU AND EVRAKTIP = @EVRAKTIP",
                    param:  ['TARIH','SUBE','MKODU','EVRAKTIP'],
                    type:   ['date','int','string|25','int'],
                    value:  [TmpTarih,TmpSube,TmpCariKodu,TmpEvrTip]
                }
                db.ExecuteQuery(TmpQuery);
            }
            
            if($scope.IslemListe[i].TIP == 1)
            {
                await db.GetPromiseTag($scope.Firma,'MaxCekRefNo',[6],function(data)
                {
                    let TmpYear = new Date($scope.IslemListe[i].TARIH.split('.')[2],$scope.IslemListe[i].TARIH.split('.')[1],$scope.IslemListe[i].TARIH.split('.')[0]).getFullYear();
                    TmpRefNo = 'MK-000-000-' + TmpYear + '-' + (data[0].REFNO + 1).toString().padStart(8, "0");
                    console.log(TmpRefNo);
                });
            }
            else
            {
                TmpRefNo = "";
            }

            await db.ExecutePromiseTag($scope.Firma,'CariHarInsert',CariHarInsertData($scope.IslemListe[i],TmpEvrSira,TmpRefNo),function(data)
            {                    
                TmpChaGuid = data.result.recordset[0].cha_Guid;                                
            });             

            if($scope.IslemListe[i].TIP == 1)
            {
                var TmpQuery = 
                {
                    db : '{M}.' + $scope.Firma,
                    query:  "SELECT cha_satir_no AS SATIRNO FROM CARI_HESAP_HAREKETLERI WHERE cha_Guid = @cha_Guid",
                    param:  ['cha_Guid'],
                    type:   ['string|50'],
                    value:  [TmpChaGuid]
                }
                await db.GetPromiseQuery(TmpQuery,function(data)
                {
                    TmpSatirNo = data[0].SATIRNO;
                });

                await db.ExecutePromiseTag($scope.Firma,'CekHarInsert',CekHarInsertData($scope.IslemListe[i],TmpEvrSira,TmpSatirNo,TmpRefNo),function(){});
            }
        }    
        
        $scope.BtnGetir();
        $scope.StatusTitle = "Evrak Aktarımı Tamamlandı.";
        $scope.FormLock = false;  
        $scope.$apply();  
    }   
}