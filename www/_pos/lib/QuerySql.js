var QuerySql = 
{
    Stok : 
    {
        query : "SELECT * FROM STOKLAR WHERE ((sto_kod = @sto_kod) OR (@sto_kod = ''))",
        param : ['sto_kod'],
        type : ['string|25'] 
    },
    CmbDepoGetir : 
    {
        query : "SELECT dep_no AS KODU,dep_adi AS ADI FROM DEPOLAR"
    },
    CmbSorumlulukGetir : 
    {
        query : "SELECT '' AS KODU, '' AS ADI UNION ALL SELECT som_kod AS KODU,som_isim AS ADI FROM SORUMLULUK_MERKEZLERI"
    },
    CmbPersonelGetir : 
    {
        query : "SELECT '' AS KODU, '' AS ADI,'' AS SOYADI UNION ALL SELECT PER1.cari_per_kod AS KODU,PER1.cari_per_adi AS ADI,PER1.cari_per_soyadi AS SOYADI " +
                "FROM CARI_PERSONEL_TANIMLARI AS PER1 INNER JOIN CARI_PERSONEL_TANIMLARI AS PER2 ON " +
                "PER1.cari_per_kod = PER2.cari_per_kod AND PER1.cari_per_tip = 0 "
    },
    CmbProjeGetir : 
    {
        query : "SELECT '' AS KODU, '' AS ADI UNION ALL SELECT pro_kodu AS KODU,pro_adi AS ADI FROM PROJELER"
    },
    CmbOdemePlanGetir : 
    {
        query : "SELECT '0' AS KODU, 'PEŞİN' AS ADI UNION ALL SELECT odp_no AS KODU, " +
                "odp_adi  AS ADI FROM ODEME_PLANLARI"
    },
    CmbBirimGetir : 
    {
        query : "SELECT sto_birimID AS BIRIMPNTR, " + 
                "sto_birim_ad AS BIRIM, " + 
                "CASE WHEN sto_birim_katsayi > 0 THEN sto_birim_katsayi ELSE sto_birim_katsayi * -1 END AS KATSAYI " + 
                "FROM STOK_BIRIM_TANIMLARI_DIKEY WHERE sto_kod = @sto_kod", 
        param : ['sto_kod'],
        type : ['string|25']
    },    
    CariListeGetir : 
    {
        query : "SELECT cari_kod AS KODU, " +
                "cari_cari_kilitli_flg As CKILIT," +
                "cari_unvan1 AS UNVAN1," +
                "cari_unvan2 AS UNVAN2," +
                "cari_doviz_cinsi AS DOVIZCINSI," +
                "cari_doviz_cinsi1 AS DOVIZCINSI1," +
                "cari_doviz_cinsi2 AS DOVIZCINSI2," +
                "cari_vdaire_adi AS VDADI," +
                "cari_vdaire_no AS VDNO," +
                "cari_satis_fk AS SATISFK," +
                "cari_satis_isk_kod AS ISKONTOKOD," +
                "cari_sektor_kodu AS SEKTOR," +
                "cari_bolge_kodu AS BOLGE," +
                "cari_grup_kodu AS GRUP," +
                "cari_temsilci_kodu AS TEMSILCI," +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi,0))) AS DOVIZSEMBOL," +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi1,0))) AS DOVIZSEMBOL1," + 
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi2,0))) AS DOVIZSEMBOL2," +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi,0),2)) AS DOVIZKUR," +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi1,0),2)) AS DOVIZKUR1," +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi2,0),2)) AS DOVIZKUR2," +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(1,0),2)) AS ALTDOVIZKUR," +
                "ISNULL((SELECT sum(ct_tutari) FROM dbo.CARI_HESAP_TEMINATLARI WHERE ct_carikodu = cari_kod),0) AS RISK," +
                "cari_odemeplan_no AS ODEMEPLANI," +
                "ISNULL((SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi,0,0,0,0)),0) AS BAKIYE," +
                "ISNULL(CARI_MUSTAHSIL_TANIMLARI.Cm_BelgeNo,'') as BELGENO, ISNULL(CARI_MUSTAHSIL_TANIMLARI.Cm_GecerlilikTarihi,GETDATE()) as BELGETARIH," +
                "ISNULL((SELECT adr_ilce + '-' + adr_il FROM CARI_HESAP_ADRESLERI WHERE adr_adres_no = 1 AND adr_cari_kod = cari_kod),'') AS ADRES," +
                "cari_BUV_tabi_fl AS VERGISIZ," +
                "cari_efatura_fl AS EFATURA " +
                "FROM CARI_MUSTAHSIL_TANIMLARI RIGHT OUTER JOIN " +
                "CARI_HESAPLAR AS CARI ON CARI_MUSTAHSIL_TANIMLARI.Cm_carikodu = CARI.cari_kod " +
                "WHERE ((CARI.cari_kod LIKE '%' + @KODU + '%') OR (@KODU = '')) AND ((CARI.cari_unvan1 LIKE '%' + @ADI + '%') OR (@ADI = '')) ORDER BY cari_kod ASC",
            param : ['KODU','ADI'],
            type : ['string|25','string|127']
    },
    CariGetir : 
    {
        query : "SELECT cari_kod AS KODU, " +
                "cari_cari_kilitli_flg As CKILIT," +
                "cari_unvan1 AS UNVAN1," +
                "cari_unvan2 AS UNVAN2," +
                "cari_doviz_cinsi AS DOVIZCINSI," +
                "cari_doviz_cinsi1 AS DOVIZCINSI1," +
                "cari_doviz_cinsi2 AS DOVIZCINSI2," +
                "cari_vdaire_adi AS VDADI," +
                "cari_vdaire_no AS VDNO," +
                "cari_satis_fk AS SATISFK," +
                "cari_satis_isk_kod AS ISKONTOKOD," +
                "cari_sektor_kodu AS SEKTOR," +
                "cari_bolge_kodu AS BOLGE," +
                "cari_grup_kodu AS GRUP," +
                "cari_temsilci_kodu AS TEMSILCI," +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi,0))) AS DOVIZSEMBOL," +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi1,0))) AS DOVIZSEMBOL1," + 
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi2,0))) AS DOVIZSEMBOL2," +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi,0),2)) AS DOVIZKUR," +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi1,0),2)) AS DOVIZKUR1," +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi2,0),2)) AS DOVIZKUR2," +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(1,0),2)) AS ALTDOVIZKUR," +
                "ISNULL((SELECT sum(ct_tutari) FROM dbo.CARI_HESAP_TEMINATLARI WHERE ct_carikodu = cari_kod),0) AS RISK," +
                "cari_odemeplan_no AS ODEMEPLANI," +
                "ISNULL((SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi,0,0,0,0)),0) AS BAKIYE," +
                "ISNULL(CARI_MUSTAHSIL_TANIMLARI.Cm_BelgeNo,'') as BELGENO, ISNULL(CARI_MUSTAHSIL_TANIMLARI.Cm_GecerlilikTarihi,GETDATE()) as BELGETARIH," +
                "ISNULL((SELECT adr_ilce + '-' + adr_il FROM CARI_HESAP_ADRESLERI WHERE adr_adres_no = 1 AND adr_cari_kod = cari_kod),'') AS ADRES," +
                "cari_BUV_tabi_fl AS VERGISIZ," +
                "cari_efatura_fl AS EFATURA " +
                "FROM CARI_MUSTAHSIL_TANIMLARI RIGHT OUTER JOIN " +
                "CARI_HESAPLAR AS CARI ON CARI_MUSTAHSIL_TANIMLARI.Cm_carikodu = CARI.cari_kod " +
                "WHERE ((CARI.cari_kod = @KODU) OR (@KODU = '')) AND ((CARI.cari_unvan1 = @ADI) OR (@ADI = '')) ORDER BY cari_kod ASC",
            param : ['KODU','ADI'],
            type : ['string|25','string|127']
    },
    BarkodGetir:
    {
        query : "SELECT sto_kod AS KODU, " +
                "sto_isim AS ADI, " +
                "sto_kisa_ismi AS KISAAD, " +
                "sto_yabanci_isim AS YABANCIAD, " +
                "sto_doviz_cinsi AS DOVIZCINSI, " +
                "sto_perakende_vergi AS PERAKENDEVERGIPNTR, " +
                "sto_toptan_vergi AS TOPTANVERGIPNTR, " +
                "sto_altgrup_kod AS ALTGRUP, " +
                "sto_anagrup_kod AS ANAGRUP, " +
                "sto_uretici_kodu AS URETICI, " +
                "sto_sektor_kodu AS SEKTOR, " +
                "sto_reyon_kodu AS REYON, " +
                "sto_marka_kodu AS MARKA, " +
                "sto_beden_kodu AS BEDENKODU, " +
                "sto_renk_kodu AS RENKKODU, " +
                "sto_pasif_fl AS AKTIFPASIF, " +
                "bar_kodu AS BARKOD, " +
                "CASE WHEN BARKOD.bar_birimpntr=1 THEN STOK.sto_birim1_katsayi  " +
                "WHEN BARKOD.bar_birimpntr=2 THEN (CASE WHEN STOK.sto_birim2_katsayi < 0  THEN STOK.sto_birim2_katsayi * -1 ELSE STOK.sto_birim2_katsayi END) " +
                "WHEN BARKOD.bar_birimpntr=3 THEN STOK.sto_birim3_katsayi " +
                "WHEN BARKOD.bar_birimpntr=4 THEN STOK.sto_birim4_katsayi " +
                "ELSE 0 END AS CARPAN, " +
                "bar_birimpntr AS BIRIMPNTR, " +
                "bar_bedenpntr AS BEDENPNTR, " +
                "bar_renkpntr AS RENKPNTR, " +
                "bar_special2 AS BOLEN, " +
                "bar_partikodu AS PARTI, " +
                "bar_lotno AS LOT, " +
                "bar_barkodtipi AS BARKODTIP, " +
                "bar_barkodtipi AS BAGLANTITIPI, " +
                "ISNULL( mye_TextData.Data,'') AS ACIKLAMA, " +
                "(SELECT dbo.fn_beden_kirilimi (bar_bedenpntr,sto_beden_kodu)) AS BEDEN, " +
                "(SELECT dbo.fn_renk_kirilimi (bar_renkpntr,sto_renk_kodu)) AS RENK, " +
                "(SELECT dbo.fn_VergiYuzde (sto_perakende_vergi)) AS PERAKENDEVERGI, " +
                "(SELECT dbo.fn_VergiYuzde (sto_toptan_vergi)) AS TOPTANVERGI, " +
                "ISNULL((SELECT dbo.fn_StokBirimHesapla (sto_kod,bar_birimpntr,1,1)),1) AS KATSAYI, " +
                "(SELECT dbo.fn_StokBirimi (sto_kod,bar_birimpntr)) AS BIRIM, " +
                "sto_detay_takip AS DETAYTAKIP, " +
                "ISNULL((SELECT dbo.fn_DepodakiMiktar (STOK.sto_kod,@DEPONO,CONVERT(VARCHAR(10),GETDATE(),112))),0) AS DEPOMIKTAR, " +
                "ISNULL(( SELECT  msg_S_0165  FROM [dbo].[fn_DepolardakiRenkBedenDetayliMiktar] ( sto_kod ,@DEPONO,GETDATE()) WHERE msg_S_0062=CASE WHEN bar_renkpntr=0 THEN bar_bedenpntr ELSE CASE WHEN bar_bedenpntr=0 THEN (bar_renkpntr-1)*40+1 ELSE (bar_renkpntr-1)*40+bar_bedenpntr END  END),0) AS KIRILIMMIKTAR, " +
                "sto_siparis_dursun AS SIPARISDURSUN, " +
                "sto_malkabul_dursun as MALKABULDURSUN, " +
                "sto_otvtutar AS OTVTUTAR " +
                "FROM STOKLAR AS STOK WITH (NOLOCK,INDEX=NDX_STOKLAR_02) " +
                "LEFT JOIN BARKOD_TANIMLARI AS BARKOD WITH (NOLOCK,INDEX=NDX_BARKOD_TANIMLARI_02) ON " +
                "STOK.sto_kod = BARKOD.bar_stokkodu " +
                "LEFT JOIN mye_TextData ON mye_TextData.TableID=13 AND STOK.sto_Guid=mye_TextData.Record_uid " + 
                "WHERE BARKOD.bar_kodu = @BARKOD" ,
        param : ['BARKOD','DEPONO'],
        type : ['string|50','int']
    },
    StokGetir:
    {
        query : "SELECT sto_kod AS KODU, " +
                "ISNULL((SELECT TOP 1 sfiyat_fiyati FROM STOK_SATIS_FIYAT_LISTELERI WHERE sfiyat_listesirano = 1 AND sfiyat_stokkod = STOK.sto_kod),'') AS FIYAT, " +
                "sto_isim AS ADI, " +
                "sto_kisa_ismi AS KISAAD, " +
                "sto_yabanci_isim AS YABANCIAD, " +
                "sto_doviz_cinsi AS DOVIZCINSI, " +
                "sto_perakende_vergi AS PERAKENDEVERGIPNTR, " +
                "sto_toptan_vergi AS TOPTANVERGIPNTR, " +
                "sto_altgrup_kod AS ALTGRUP, " +
                "sto_anagrup_kod AS ANAGRUP, " +
                "sto_uretici_kodu AS URETICI, " +
                "sto_sektor_kodu AS SEKTOR, " +
                "sto_reyon_kodu AS REYON, " +
                "sto_marka_kodu AS MARKA, " +
                "sto_beden_kodu AS BEDENKODU, " +
                "sto_renk_kodu AS RENKKODU, " +
                "sto_pasif_fl AS AKTIFPASIF, " +
                "'' AS BARKOD, " +
                "1 AS CARPAN, " +
                "1 AS BIRIMPNTR, " +
                "0 AS BEDENPNTR, " +
                "0 AS RENKPNTR, " +
                "'' AS BOLEN, " +
                "'' AS PARTI, " +
                "0 AS LOT, " +
                "0 AS BARKODTIP, " +
                "0 AS BAGLANTITIPI, " +
                "'' AS ACIKLAMA, " +
                "'' AS BEDEN, " +
                "'' AS RENK, " +
                "(SELECT dbo.fn_VergiYuzde (sto_perakende_vergi)) AS PERAKENDEVERGI, " +
                "(SELECT dbo.fn_VergiYuzde (sto_toptan_vergi)) AS TOPTANVERGI, " +
                "1 AS KATSAYI, " +
                "'' AS BIRIM, " +
                "sto_detay_takip AS DETAYTAKIP, " +
                "ISNULL((SELECT dbo.fn_DepodakiMiktar (STOK.sto_kod,@DEPONO,CONVERT(VARCHAR(10),GETDATE(),112))),0) AS DEPOMIKTAR, " +
                "0 AS KIRILIMMIKTAR, " +
                "sto_siparis_dursun AS SIPARISDURSUN, " +
                "sto_malkabul_dursun as MALKABULDURSUN, " +
                "sto_otvtutar AS OTVTUTAR " +
                "FROM STOKLAR AS STOK " + 
                "WHERE ((sto_kod LIKE @KODU) OR (@KODU = '')) AND ((sto_isim LIKE @ADI) OR (@ADI = ''))" ,
        param : ['KODU',"ADI",'DEPONO'],
        type : ['string|25','string|50','int']
    },    
    FiyatGetir : 
    {
        query : "SELECT FIYAT.sfiyat_stokkod AS STOKKODU, " +
                "FIYAT.sfiyat_listesirano AS LISTENO, " +
                "ISNULL((SELECT sfl_aciklama FROM STOK_SATIS_FIYAT_LISTE_TANIMLARI WHERE sfl_sirano=FIYAT.sfiyat_listesirano),'') AS LISTEADI, " +
                "FIYAT.sfiyat_deposirano AS DEPONO, " +
                "FIYAT.sfiyat_odemeplan AS ODEMENO, " +
                "FIYAT = CASE (SELECT sfl_kdvdahil FROM STOK_SATIS_FIYAT_LISTE_TANIMLARI WHERE sfl_sirano=FIYAT.sfiyat_listesirano) " +
                "WHEN 0 THEN FIYAT.sfiyat_fiyati " +
                "ELSE FIYAT.sfiyat_fiyati / (((SELECT dbo.fn_VergiYuzde (STOK.sto_toptan_vergi)) / 100) + 1) " +
                "END, " +
                "FIYAT.sfiyat_doviz AS DOVIZ, " +
                "ISNULL((SELECT dbo.fn_DovizSembolu(ISNULL(FIYAT.sfiyat_doviz,0))),'TL') AS DOVIZSEMBOL, " +
                "ISNULL((SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(FIYAT.sfiyat_doviz,0),2)),1) AS DOVIZKUR, " +
                "STOK.sto_isim AS ADI, " +
                "STOK.sto_altgrup_kod AS ALTGRUP, " +
                "STOK.sto_uretici_kodu AS URETICI, " +
                "STOK.sto_reyon_kodu AS REYON, " +
                "STOK.sto_marka_kodu AS MARKA, " +
                "FIYAT.sfiyat_iskontokod AS ISKONTOKOD " +
                "FROM STOK_SATIS_FIYAT_LISTELERI AS FIYAT " +
                "INNER JOIN STOKLAR AS STOK ON " +
                "FIYAT.sfiyat_stokkod = STOK.sto_kod " + 
                "WHERE FIYAT.sfiyat_stokkod = @sfiyat_stokkod AND FIYAT.sfiyat_listesirano = @sfiyat_listesirano " +
                "AND (FIYAT.sfiyat_deposirano = @sfiyat_deposirano OR FIYAT.sfiyat_deposirano = 0) AND FIYAT.sfiyat_odemeplan = @sfiyat_odemeplan " +
                "ORDER BY FIYAT.sfiyat_deposirano DESC", 
        param : ['sfiyat_stokkod','sfiyat_listesirano','sfiyat_deposirano','sfiyat_odemeplan'],
        type : ['string|25','int','int','int']
    },
    SonAlisFiyatGetir : 
    {
        query : "SELECT Hesaplama.sth_cari_kodu AS CARI, " +
                "Hesaplama.sth_stok_kod AS STOK, " +
                "STOKHAREKETLERI.sth_tutar / STOKHAREKETLERI.sth_miktar AS SONFIYAT " +
                "FROM (SELECT     TOP (100) PERCENT MAX(sth_Guid) AS Recno, sth_cari_kodu, sth_stok_kod " +
                "FROM STOK_HAREKETLERI " +
                "WHERE (sth_evraktip IN (13,3)) " +
                "GROUP BY sth_cari_kodu, sth_stok_kod " +
                "ORDER BY Recno DESC) AS Hesaplama INNER JOIN " +
                "STOK_HAREKETLERI AS STOKHAREKETLERI ON Hesaplama.Recno = STOKHAREKETLERI.sth_Guid " +
                "WHERE Hesaplama.sth_cari_kodu  = @sth_cari_kodu AND Hesaplama.sth_stok_kod  = @sth_stok_kod" , 
        param : ['sth_cari_kodu','sth_stok_kod'],
        type : ['string|25','string|25']
    },
    SonSatisFiyatGetir : 
    {
        query : "SELECT Hesaplama.sth_cari_kodu AS CARI, " +
                "Hesaplama.sth_stok_kod AS STOK, " +
                "STOKHAREKETLERI.sth_tutar / STOKHAREKETLERI.sth_miktar AS SONFIYAT " +
                "FROM (SELECT     TOP (100) PERCENT MAX(sth_Guid) AS Recno, sth_cari_kodu, sth_stok_kod " +
                "FROM STOK_HAREKETLERI " +
                "WHERE (sth_evraktip IN (4)) " +
                "GROUP BY sth_cari_kodu, sth_stok_kod " +
                "ORDER BY Recno DESC) AS Hesaplama INNER JOIN " +
                "STOK_HAREKETLERI AS STOKHAREKETLERI ON Hesaplama.Recno = STOKHAREKETLERI.sth_Guid " +
                "WHERE Hesaplama.sth_cari_kodu  = @sth_cari_kodu AND Hesaplama.sth_stok_kod  = @sth_stok_kod" , 
        param : ['sth_cari_kodu','sth_stok_kod'],
        type : ['string|25','string|25']
    },
    SatisSartiGetir : 
    {
        query : "SELECT sat_stok_kod AS STOKKOD " +
                ",sat_cari_kod AS CARIKOD " +
                ",sat_bitis_tarih AS BITIS " +
                ",sat_basla_tarih AS BASLANGIC " +
                ",sat_brut_fiyat AS FIYAT " +
                ",sat_det_isk_miktar1 AS ISKONTOM1 " +
                ",sat_det_isk_miktar2 AS ISKONTOM2 " +
                ",sat_det_isk_miktar3 AS ISKONTOM3 " +
                ",sat_det_isk_miktar4 AS ISKONTOM4 " +
                ",sat_det_isk_miktar5 AS ISKONTOM5 " +
                ",sat_det_isk_miktar6 AS ISKONTOM6 " +
                ",sat_det_isk_yuzde1 AS ISKONTOY1 " +
                ",sat_det_isk_yuzde2 AS ISKONTOY2 " +
                ",sat_det_isk_yuzde3 AS ISKONTOY3 " +
                ",sat_det_isk_yuzde4 AS ISKONTOY4 " +
                ",sat_det_isk_yuzde5 AS ISKONTOY5 " +
                ",sat_det_isk_yuzde6 AS ISKONTOY6 " +
                ",sat_odeme_plan AS ODEPLAN " +
                ",sat_doviz_cinsi AS DOVIZ " +
                ",sat_depo_no AS DEPO " +
                ",sat_fiyat_liste_no AS LISTENO " +
                ",(SELECT dbo.fn_DovizSembolu(ISNULL(sat_doviz_cinsi,0))) AS DOVIZSEMBOL " +
                ",(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(sat_doviz_cinsi,0),2)) AS DOVIZKUR " +
                "FROM SATIS_SARTLARI " +
                "WHERE sat_basla_tarih <= GETDATE() AND (sat_bitis_tarih >= GETDATE() OR sat_bitis_tarih = '18991230') " +
                "AND sat_cari_kod = @sat_cari_kod AND sat_stok_kod = @sat_stok_kod AND (sat_depo_no = @sat_depo_no OR sat_depo_no = 0) " +
                "ORDER BY sat_basla_tarih,sat_depo_no DESC , sat_bitis_tarih ASC" , 
        param : ['sat_cari_kod','sat_stok_kod','sat_depo_no'],
        type : ['string|25','string|25','int']
    },
    AlisSartiGetir : 
    {
        query : "SELECT sas_stok_kod AS STOKKOD, " +
                "sas_cari_kod AS CARIKOD, " +
                "sas_bitis_tarih AS BITIS, " +
                "sas_basla_tarih AS BASLANGIC, " +
                "sas_brut_fiyat AS FIYAT, " +
                "sas_isk_miktar1 AS ISKONTOM1, " +
                "sas_isk_miktar2 AS ISKONTOM2, " +
                "sas_isk_miktar3 AS ISKONTOM3, " +
                "sas_isk_miktar4 AS ISKONTOM4, " +
                "sas_isk_miktar5 AS ISKONTOM5, " +
                "sas_isk_yuzde1 AS ISKONTOY1, " +
                "sas_isk_yuzde2 AS ISKONTOY2, " +
                "sas_isk_yuzde3 AS ISKONTOY3, " +
                "sas_isk_yuzde4 AS ISKONTOY4, " +
                "sas_isk_yuzde5 AS ISKONTOY5, " +
                "sas_odeme_plan AS ODEPLAN, " +
                "sas_doviz_cinsi AS DOVIZ, " + 
                "sas_depo_no AS DEPO, " +
                "1 AS LISTENO, " +
                "(SELECT     dbo.fn_DovizSembolu(ISNULL(sas_doviz_cinsi, 0))) AS DOVIZSEMBOL, " +
                "(SELECT     dbo.fn_KurBul(CONVERT(VARCHAR(10), GETDATE(), 112), ISNULL(sas_doviz_cinsi, 0), 2)) AS DOVIZKUR " +
                "FROM SATINALMA_SARTLARI " +
                "WHERE sas_basla_tarih <= GETDATE() AND (sas_bitis_tarih >= GETDATE() OR sas_bitis_tarih = '18991230') " +
                "AND sas_cari_kod = @sas_cari_kod AND sas_stok_kod = @sas_stok_kod AND (sas_depo_no = @sas_depo_no OR sas_depo_no = 0) " +
                "ORDER BY sas_basla_tarih,sas_depo_no DESC, sas_bitis_tarih ASC" , 
        param : ['sas_cari_kod','sas_stok_kod','sas_depo_no'],
        type : ['string|25','string|25','int']
    },
    RenkGetir :
    {
        query : "SELECT rnk_kirilimID AS PNTR , rnk_kirilim AS KIRILIM " +
                "FROM STOK_RENK_TANIMLARI_DIKEY WHERE rnk_kodu = @rnk_kodu " ,
        param : ['rnk_kodu'],
        type : ['string|25']
    },
    BedenGetir :
    {
        query : "SELECT bdn_kirilimID AS PNTR , bdn_kirilim AS KIRILIM " +
                "FROM STOK_BEDEN_TANIMLARI_DIKEY WHERE bdn_kodu = @bdn_kodu " ,
        param : ['bdn_kodu'],
        type : ['string|25']
    },
    //Beden Hareket
    BedenHarInsert :
    {
        query:  "INSERT INTO [BEDEN_HAREKETLERI] ( " +
                "[BdnHar_DBCno] " + 
                ",[BdnHar_Spec_Rec_no] " +
                ",[BdnHar_iptal] " +
                ",[BdnHar_fileid] " +
                ",[BdnHar_hidden] " +
                ",[BdnHar_kilitli] " +
                ",[BdnHar_degisti] " +
                ",[BdnHar_checksum] " +
                ",[BdnHar_create_user] " +
                ",[BdnHar_create_date] " +
                ",[BdnHar_lastup_user] " +
                ",[BdnHar_lastup_date] " +
                ",[BdnHar_special1] " +
                ",[BdnHar_special2] " +
                ",[BdnHar_special3] " +
                ",[BdnHar_Tipi] " +
                ",[BdnHar_Har_uid] " +
                ",[BdnHar_BedenNo] " +
                ",[BdnHar_HarGor] " +
                ",[BdnHar_KnsIsGor] " +
                ",[BdnHar_KnsFat] " +
                ",[BdnHar_TesMik] " +
                ",[BdnHar_rezervasyon_miktari] " +
                ",[BdnHar_rezerveden_teslim_edilen] " +
                ") VALUES ( " +
                "0			 		                    --BdnHar_DBCno,  smallint,> \n" +
                ",0					                    --<BdnHar_Spec_Rec_no, int,> \n" +
                ",0		 			                    --<BdnHar_iptal, bit,> \n" +
                ",113		 		                    --<BdnHar_fileid, smallint,> \n" +
                ",0		 			                    --<BdnHar_hidden, bit,> \n" +
                ",0					                    --<BdnHar_kilitli, bit,> \n" +
                ",0		 			                    --<BdnHar_degisti, bit,> \n" +
                ",0		 			                    --<BdnHar_checksum, int,> \n" +
                ",@BdnHar_create_user 		            --<BdnHar_create_user, smallint,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112) 	--<BdnHar_create_date, datetime,> \n" +
                ",@BdnHar_lastup_user 		            --<BdnHar_lastup_user, smallint,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112) 	--<BdnHar_lastup_date, datetime,> \n" +
                ",''		 			                --<BdnHar_special1, varchar(4),> \n" +
                ",''		 			                --<BdnHar_special2, varchar(4),> \n" +
                ",''		 			                --<BdnHar_special3, varchar(4),> \n" +
                ",@BdnHar_Tipi		                    --<BdnHar_Tipi, char(1),> \n" +
                ",@BdnHar_Har_uid    		            --<BdnHar_Har_uid, int,> \n" +
                ",@BdnHar_BedenNo 			            --<BdnHar_BedenNo, smallint,> \n" +
                ",@BdnHar_HarGor 			            --<BdnHar_HarGor, float,> \n" +
                ",0		 			                    --<BdnHar_KnsIsGor, float,> \n" +
                ",0		 			                    --<BdnHar_KnsFat, float,> \n" +
                ",0					                    --<BdnHar_TesMik, float,> \n" +
                ",@BdnHar_rezervasyon_miktari			--<BdnHar_rezervasyon_miktari, float,>\n" +
                ",@BdnHar_rezerveden_teslim_edilen		--<BdnHar_rezerveden_teslim_edilen, float,>\n" +
                ")",
        param:  ['BdnHar_create_user:int','BdnHar_lastup_user:int','BdnHar_Tipi:int','BdnHar_Har_uid:string|50','BdnHar_BedenNo:int','BdnHar_HarGor:float',
                 'BdnHar_rezervasyon_miktari:float','BdnHar_rezerveden_teslim_edilen:float']
    },
    BedenHarUpdate :
    {
        query:  "UPDATE BEDEN_HAREKETLERI " +
                "SET BdnHar_HarGor=@BdnHar_HarGor " +
                ",BdnHar_rezervasyon_miktari=@BdnHar_rezervasyon_miktari " + 
                ",BdnHar_rezerveden_teslim_edilen=@BdnHar_rezerveden_teslim_edilen " +
                "WHERE  BdnHar_Har_uid = @BdnHar_Har_uid AND BdnHar_Tipi = @BdnHar_Tipi AND BdnHar_BedenNo = @BdnHar_BedenNo",
        param:  ['BdnHar_Tipi:int','BdnHar_Har_uid:string|50','BdnHar_BedenNo:int','BdnHar_HarGor:float',
                 'BdnHar_rezervasyon_miktari:float','BdnHar_rezerveden_teslim_edilen:float']
    },
    BedenHarGetir:
    {
        query:  "SELECT * FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid IN ((SELECT sip_Guid FROM SIPARISLER WHERE sip_evrakno_seri = @sip_evrakno_seri AND sip_evrakno_sira = @sip_evrakno_sira AND sip_tip = @sip_tip)) AND BdnHar_Tipi = @BdnHar_Tipi",
        param:  ['sip_evrakno_seri','sip_evrakno_sira','sip_tip','BdnHar_Tipi'],
        type:   ['string|20','int','int','int']
    },
    BedenHarDelete : 
    {
        query:  "DELETE BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = @BdnHar_Har_uid AND BdnHar_Tipi = @BdnHar_Tipi",
        param:  ['BdnHar_Har_uid','BdnHar_Tipi'],
        type:   ['string|50','int']
    },
    //Stok Hareket
    StokHarGetir : 
    {
        query:  "SELECT CONVERT(VARCHAR(10),GETDATE(),112) AS sth_kur_tarihi , " +
                "ISNULL((SELECT sto_isim from STOKLAR WHERE sto_kod=sth_stok_kod),'') AS ADI , " +
                "(sth_tutar / sth_miktar) AS FIYAT, " +
                "sth_miktar AS MIKTAR , " +
                "sth_miktar2 AS MIKTAR2 , " +
                "ROW_NUMBER() OVER(ORDER BY sth_Guid) AS NO, " +   
                "* FROM STOK_HAREKETLERI " +
                "WHERE sth_evrakno_seri=@sth_evrakno_seri AND sth_evrakno_sira=@sth_evrakno_sira AND sth_evraktip=@sth_evraktip ORDER BY sth_satirno " ,
        param:   ['sth_evrakno_seri','sth_evrakno_sira','sth_evraktip'],
        type:    ['string|20','int','int']
    },
    StokHarInsert : 
    {
        query : "DECLARE @UIDTABLE table([sth_Guid] [uniqueidentifier]) " +
                "INSERT INTO [STOK_HAREKETLERI] " +
                "([sth_DBCno] " +
                ",[sth_SpecRECno] " +
                ",[sth_iptal] " +
                ",[sth_fileid] " +
                ",[sth_hidden] " +
                ",[sth_kilitli] " +
                ",[sth_degisti] " +
                ",[sth_checksum] " +
                ",[sth_create_user] " +
                ",[sth_create_date] " +
                ",[sth_lastup_user] " +
                ",[sth_lastup_date] " +
                ",[sth_special1] " +
                ",[sth_special2] " +
                ",[sth_special3] " +
                ",[sth_firmano] " +
                ",[sth_subeno] " +
                ",[sth_tarih] " +
                ",[sth_tip] " +
                ",[sth_cins] " +
                ",[sth_normal_iade] " +
                ",[sth_evraktip] " +
                ",[sth_evrakno_seri] " +
                ",[sth_evrakno_sira] " +
                ",[sth_satirno] " +
                ",[sth_belge_no] " +
                ",[sth_belge_tarih] " +
                ",[sth_stok_kod] " +
                ",[sth_isk_mas1] " +
                ",[sth_isk_mas2] " +
                ",[sth_isk_mas3] " +
                ",[sth_isk_mas4] " +
                ",[sth_isk_mas5] " +
                ",[sth_isk_mas6] " +
                ",[sth_isk_mas7] " +
                ",[sth_isk_mas8] " +
                ",[sth_isk_mas9] " +
                ",[sth_isk_mas10] " +
                ",[sth_sat_iskmas1] " +
                ",[sth_sat_iskmas2] " +
                ",[sth_sat_iskmas3] " +
                ",[sth_sat_iskmas4] " +
                ",[sth_sat_iskmas5] " +
                ",[sth_sat_iskmas6] " +
                ",[sth_sat_iskmas7] " +
                ",[sth_sat_iskmas8] " +
                ",[sth_sat_iskmas9] " +
                ",[sth_sat_iskmas10] " +
                ",[sth_pos_satis] " +
                ",[sth_promosyon_fl] " +
                ",[sth_cari_cinsi] " +
                ",[sth_cari_kodu] " +
                ",[sth_cari_grup_no] " +
                ",[sth_isemri_gider_kodu] " +
                ",[sth_plasiyer_kodu] " +
                ",[sth_har_doviz_cinsi] " +
                ",[sth_har_doviz_kuru] " +
                ",[sth_alt_doviz_kuru] " +
                ",[sth_stok_doviz_cinsi] " +
                ",[sth_stok_doviz_kuru] " +
                ",[sth_miktar] " +
                ",[sth_miktar2] " +
                ",[sth_birim_pntr] " +
                ",[sth_tutar] " +
                ",[sth_iskonto1] " +
                ",[sth_iskonto2] " +
                ",[sth_iskonto3] " +
                ",[sth_iskonto4] " +
                ",[sth_iskonto5] " +
                ",[sth_iskonto6] " +
                ",[sth_masraf1] " +
                ",[sth_masraf2] " +
                ",[sth_masraf3] " +
                ",[sth_masraf4] " +
                ",[sth_vergi_pntr] " +
                ",[sth_vergi] " +
                ",[sth_masraf_vergi_pntr] " +
                ",[sth_masraf_vergi] " +
                ",[sth_netagirlik] " +
                ",[sth_odeme_op] " +
                ",[sth_aciklama] " +
                ",[sth_sip_uid] " +
                ",[sth_fat_uid] " +
                ",[sth_giris_depo_no] " +
                ",[sth_cikis_depo_no] " +
                ",[sth_malkbl_sevk_tarihi] " +
                ",[sth_cari_srm_merkezi] " +
                ",[sth_stok_srm_merkezi] " +
                ",[sth_fis_tarihi] " +
                ",[sth_fis_sirano] " +
                ",[sth_vergisiz_fl] " +
                ",[sth_maliyet_ana] " +
                ",[sth_maliyet_alternatif] " +
                ",[sth_maliyet_orjinal] " +
                ",[sth_adres_no] " +
                ",[sth_parti_kodu] " +
                ",[sth_lot_no] " +
                ",[sth_kons_uid] " +
                ",[sth_proje_kodu] " +
                ",[sth_exim_kodu] " +
                ",[sth_otv_pntr] " +
                ",[sth_otv_vergi] " +
                ",[sth_brutagirlik] " +
                ",[sth_disticaret_turu] " +
                ",[sth_otvtutari] " +
                ",[sth_otvvergisiz_fl] " +
                ",[sth_oiv_pntr] " +
                ",[sth_oiv_vergi] " +
                ",[sth_oivvergisiz_fl] " +
                ",[sth_fiyat_liste_no] " +
                ",[sth_oivtutari] " +
                ",[sth_Tevkifat_turu] " +
                ",[sth_nakliyedeposu] " +
                ",[sth_nakliyedurumu] " +
                ",[sth_yetkili_uid] " +
                ",[sth_taxfree_fl] " +
                ",[sth_ilave_edilecek_kdv] " + 
                ",[sth_ismerkezi_kodu]  " +
                ",[sth_HareketGrupKodu1] " +
                ",[sth_HareketGrupKodu2] " +
                ",[sth_HareketGrupKodu3]   " +
                ") " +
                "OUTPUT INSERTED.[sth_Guid] INTO @UIDTABLE " + 
                "VALUES ( " +
                "0					--<sth_DBCno, smallint,> \n" +
                ",0					--<sth_SpecRECno, int,> \n" +
                ",0	 				--<sth_iptal, bit,> \n" +
                ",16					 --<sth_fileid, smallint,> \n" +
                ",0		 			--<sth_hidden, bit,> \n" +
                ",0		 			--<sth_kilitli, bit,> \n" +
                ",0		 			--<sth_degisti, bit,> \n" +
                ",0		 			--<sth_checksum, int,> \n" +
                ",@sth_create_user 			--<sth_create_user, smallint,> \n" +
                ",GETDATE() 			--<sth_create_date, datetime,> \n" +
                ",@sth_lastup_user 			--<sth_lastup_user, smallint,> \n" +
                ",GETDATE() 			--<sth_lastup_date, datetime,> \n" +
                ",''		 			--<sth_special1, varchar(4),> \n" +
                ",''		 			--<sth_special2, varchar(4),> \n" +
                ",''		 			--<sth_special3, varchar(4),> \n" +
                ",@sth_firmano 			--<sth_firmano, int,> \n" +
                ",@sth_subeno 			--<sth_subeno, int,> \n" +
                ",@sth_tarih 				--<sth_tarih, datetime,> \n" +
                ",@sth_tip 				--<sth_tip, tinyint,> \n" +
                ",@sth_cins 				--<sth_cins, tinyint,> \n" +
                ",@sth_normal_iade 			--<sth_normal_iade, tinyint,> \n" +
                ",@sth_evraktip 			--<sth_evraktip, tinyint,> \n" +
                ",@sth_evrakno_seri 			--<sth_evrakno_seri, varchar(4),> \n" +
                ",@sth_evrakno_sira 			--<sth_evrakno_sira, int,> \n" +
                ",(SELECT ISNULL(MAX(sth_satirno),-1) + 1 AS SATIRNO FROM STOK_HAREKETLERI WHERE sth_evrakno_seri = @sth_evrakno_seri AND sth_evrakno_sira = @sth_evrakno_sira AND sth_evraktip = @sth_evraktip)	--<sip_satirno, int,> \n" +
                ",@sth_belge_no 			--sth_belge_no, varchar(15),> \n" +
                ",@sth_belge_tarih 			--<sth_belge_tarih, datetime,> \n" +
                ",@sth_stok_kod 			--<sth_stok_kod, varchar(25),> \n" +
                ",@sth_isk_mas1 			--<sth_isk_mas1, tinyint,> \n" +
                ",@sth_isk_mas2 			--<sth_isk_mas2, tinyint,> \n" +
                ",@sth_isk_mas3 			--<sth_isk_mas3, tinyint,> \n" +
                ",@sth_isk_mas4 			--<sth_isk_mas4, tinyint,> \n" +
                ",@sth_isk_mas5 			--<sth_isk_mas5, tinyint,> \n" +
                ",@sth_isk_mas6 			--<sth_isk_mas6, tinyint,> \n" +
                ",@sth_isk_mas7 			--<sth_isk_mas7, tinyint,> \n" +
                ",@sth_isk_mas8 			--<sth_isk_mas8, tinyint,> \n" +
                ",@sth_isk_mas9 			--<sth_isk_mas9, tinyint,> \n" +
                ",@sth_isk_mas10 			--<sth_isk_mas10, tinyint,> \n" +
                ",@sth_sat_iskmas1 			--<sth_sat_iskmas1, bit,> \n" +
                ",@sth_sat_iskmas2 			--<sth_sat_iskmas2, bit,> \n" +
                ",@sth_sat_iskmas3 			--<sth_sat_iskmas3, bit,> \n" +
                ",@sth_sat_iskmas4 			--<sth_sat_iskmas4, bit,> \n" +
                ",@sth_sat_iskmas5 			--<sth_sat_iskmas5, bit,> \n" +
                ",@sth_sat_iskmas6 			--<sth_sat_iskmas6, bit,> \n" +
                ",@sth_sat_iskmas7 			--<sth_sat_iskmas7, bit,> \n" +
                ",@sth_sat_iskmas8 			--<sth_sat_iskmas8, bit,> \n" +
                ",@sth_sat_iskmas9 			--<sth_sat_iskmas9, bit,> \n" +
                ",@sth_sat_iskmas10 			--<sth_sat_iskmas10, bit,> \n" +
                ",0					--<sth_pos_satis, bit,> \n" +
                ",0					--<sth_promosyon_fl, bit,> \n" +
                ",@sth_cari_cinsi 			--<sth_cari_cinsi, tinyint,> \n" +
                ",@sth_cari_kodu 			--<sth_cari_kodu, varchar(25),> \n" +
                ",0		 			--<sth_cari_grup_no, tinyint,> \n" +
                ",''			 		--<sth_isemri_gider_kodu, varchar(25),> \n" +
                ",@sth_plasiyer_kodu 			--<sth_plasiyer_kodu, varchar(25),> \n" +
                ",@sth_har_doviz_cinsi 		--<sth_har_doviz_cinsi, tinyint,> \n" +
                ",@sth_har_doviz_kuru 		--<sth_har_doviz_kuru, float,> \n" +
                ",@sth_alt_doviz_kuru 		--<sth_alt_doviz_kuru, float,> \n" +
                ",@sth_stok_doviz_cinsi 		--<sth_stok_doviz_cinsi, tinyint,> \n" +
                ",@sth_stok_doviz_kuru 		--<sth_stok_doviz_kuru, float,> \n" +
                ",@sth_miktar 			--<sth_miktar, float,> \n" +
                ",@sth_miktar2 			--<sth_miktar2, float,> \n" +
                ",@sth_birim_pntr 			--<sth_birim_pntr, tinyint,> \n" +
                ",@sth_tutar	 			--<sth_tutar, float,> \n" +
                ",@sth_iskonto1 			--<sth_iskonto1, float,> \n" +
                ",@sth_iskonto2 			--<sth_iskonto2, float,> \n" +
                ",@sth_iskonto3 			--<sth_iskonto3, float,> \n" +
                ",@sth_iskonto4 			--<sth_iskonto4, float,> \n" +
                ",@sth_iskonto5 			--<sth_iskonto5, float,> \n" +
                ",@sth_iskonto6 			--<sth_iskonto6, float,> \n" +
                ",@sth_masraf1 			--<sth_masraf1, float,> \n" +
                ",@sth_masraf2 			--<sth_masraf2, float,> \n" +
                ",@sth_masraf3 			--<sth_masraf3, float,> \n" +
                ",@sth_masraf4 			--<sth_masraf4, float,> \n" +
                ",@sth_vergi_pntr 			--<sth_vergi_pntr, tinyint,> \n" +
                ",@sth_vergi 				--<sth_vergi, float,> \n" +
                ",@sth_masraf_vergi_pntr 		--<sth_masraf_vergi_pntr, tinyint,> \n" +
                ",@sth_masraf_vergi 			--<sth_masraf_vergi, float,> \n" +
                ",0		 			--<sth_netagirlik, float,> \n" +
                ",@sth_odeme_op 			--<sth_odeme_op, int,> \n" +
                ",@sth_aciklama 			--<sth_aciklama, varchar(50),> \n" +
                ",CONVERT(NVARCHAR(50),@sth_sip_uid)			 		--<sth_sip_uid, int,> \n" +
                ",CONVERT(NVARCHAR(50),@sth_fat_uid)  		--<sth_fat_uid, int,> \n" +
                ",@sth_giris_depo_no 			--<sth_giris_depo_no, int,> \n" +
                ",@sth_cikis_depo_no 			--<sth_cikis_depo_no, int,> \n" +
                ",@sth_malkbl_sevk_tarihi 		--<sth_malkbl_sevk_tarihi, datetime,> \n" +
                ",@sth_cari_srm_merkezi 		--<sth_cari_srm_merkezi, varchar(25),> \n" +
                ",@sth_stok_srm_merkezi 		--<sth_stok_srm_merkezi, varchar(25),> \n" +
                ",'18991230'	 			--<sth_fis_tarihi, datetime,> \n" +
                ",0		 			--<sth_fis_sirano, int,> \n" +
                ",@sth_vergisiz_fl		 			--<sth_vergisiz_fl, bit,> \n" +
                ",0		 			--<sth_maliyet_ana, float,> \n" +
                ",0			 		--<sth_maliyet_alternatif, float,> \n" +
                ",0			 		--<sth_maliyet_orjinal, float,> \n" +
                ",@sth_adres_no 			--<sth_adres_no, int,> \n" +
                ",@sth_parti_kodu 			--<sth_parti_kodu, varchar(25),> \n" +
                ",@sth_lot_no	 			--<sth_lot_no, int,> \n" +
                ",cast(cast(0 as binary) as uniqueidentifier)						--<sth_kons_uid, smallint,> \n" +
                ",@sth_proje_kodu		--<sth_proje_kodu, varchar(25),> \n" +
                ",@sth_exim_kodu 			--<sth_exim_kodu, varchar(25),> \n" +
                ",0		 			--<sth_otv_pntr, tinyint,> \n" +
                ",0		 			--<sth_otv_vergi, float,> \n" +
                ",0		 			--<sth_brutagirlik, float,> \n" +
                ",@sth_disticaret_turu		--<sth_disticaret_turu, tinyint,> \n" +
                ",0		 			--<sth_otvtutari, float,> \n" +
                ",@sth_otvvergisiz_fl			--<sth_otvvergisiz_fl, bit,> \n" +
                ",0					--<sth_oiv_pntr, tinyint,> \n" +
                ",0		 			--<sth_oiv_vergi, float,> \n" +
                ",@sth_oivvergisiz_fl	 		--<sth_oivvergisiz_fl, bit,> \n" +
                ",@sth_fiyat_liste_no 		--<sth_fiyat_liste_no, int,> \n" +
                ",0			 		--<sth_oivtutari, float,> \n" +
                ",0			 		--<sth_Tevkifat_turu, tinyint,> \n" +
                ",0					--<sth_nakliyedeposu, int,> \n" +
                ",0					--<sth_nakliyedurumu, tinyint,> \n" +
                ",cast(cast(0 as binary) as uniqueidentifier)					--<sth_yetkili_uid, int,> \n" +
                ",0					--<sth_taxfree_fl, bit,>  \n" +
                ",0					--<sth_ilave_edilecek_kdv,float,> \n" +
                ",''					--<sth_ismerkezi_kodu> \n" +
                ",''					--<sth_HareketGrupKodu1, varchar(25),> \n" + 
                ",''					--<sth_HareketGrupKodu2, varchar(25),>  \n" +
                ",''					--<sth_HareketGrupKodu3, varchar(25),>  \n" +
                ") " +
                "SELECT [sth_Guid] FROM @UIDTABLE ",
        param : ['sth_create_user:int','sth_lastup_user:int','sth_firmano:int','sth_subeno:int','sth_tarih:date','sth_tip:int','sth_cins:int',
            'sth_normal_iade:int','sth_evraktip:int','sth_evrakno_seri:string|25','sth_evrakno_sira:int','sth_belge_no:string|25','sth_belge_tarih:date',
            'sth_stok_kod:string|25','sth_isk_mas1:int','sth_isk_mas2:int','sth_isk_mas3:int','sth_isk_mas4:int','sth_isk_mas5:int','sth_isk_mas6:int','sth_isk_mas7:int',
            'sth_isk_mas8:int','sth_isk_mas9:int','sth_isk_mas10:int','sth_sat_iskmas1:bit','sth_sat_iskmas2:bit','sth_sat_iskmas3:bit','sth_sat_iskmas4:bit','sth_sat_iskmas5:bit',
            'sth_sat_iskmas6:bit','sth_sat_iskmas7:bit','sth_sat_iskmas8:bit','sth_sat_iskmas9:bit','sth_sat_iskmas10:bit','sth_cari_cinsi:int','sth_cari_kodu:string|50',
            'sth_plasiyer_kodu:string|50','sth_har_doviz_cinsi:int','sth_har_doviz_kuru:float','sth_alt_doviz_kuru:float','sth_stok_doviz_cinsi:int','sth_stok_doviz_kuru:float',
            'sth_miktar:float','sth_miktar2:float','sth_birim_pntr:int','sth_tutar:float','sth_iskonto1:float','sth_iskonto2:float','sth_iskonto3:float','sth_iskonto4:float',
            'sth_iskonto5:float','sth_iskonto6:float','sth_masraf1:float','sth_masraf2:float','sth_masraf3:float','sth_masraf4:float','sth_vergi_pntr:int','sth_vergi:float','sth_masraf_vergi_pntr:int',
            'sth_masraf_vergi:float','sth_odeme_op:int','sth_aciklama:string|25','sth_sip_uid:string|50','sth_fat_uid:string|50','sth_giris_depo_no:int','sth_cikis_depo_no:int','sth_malkbl_sevk_tarihi:date',
            'sth_cari_srm_merkezi:string|25','sth_stok_srm_merkezi:string|25','sth_vergisiz_fl:bit','sth_adres_no:int','sth_parti_kodu:string|25','sth_lot_no:int','sth_proje_kodu:string|25',
            'sth_exim_kodu:string|25','sth_disticaret_turu:int','sth_otvvergisiz_fl:bit','sth_oivvergisiz_fl:bit','sth_fiyat_liste_no:int']
    },
    StokHarEvrDelete : 
    {
        query : "DELETE FROM STOK_HAREKETLERI WHERE sth_evrakno_seri = @sth_evrakno_seri AND " +
                "sth_evrakno_sira = @sth_evrakno_sira AND sth_evraktip = @sth_evraktip" ,
        param : ['sth_evrakno_seri','sth_evrakno_sira','sth_evraktip'],
        type : ['string|20','int','int']
    },
    StokHarSatirDelete : 
    {
        query : "DELETE FROM STOK_HAREKETLERI WHERE sth_Guid = @sth_Guid ",
        param : ['sth_Guid'],
        type : ['string|50']
    },
    StokHarUpdate:
    {
        query:  "UPDATE STOK_HAREKETLERI " +
                "SET sth_miktar=@sth_miktar " +
                ",sth_miktar2=@sth_miktar2 " +  
                ",sth_tutar=@sth_tutar " +
                ",sth_vergi= @sth_tutar * (SELECT [dbo].[fn_VergiYuzde] (@sth_vergi_pntr) / 100) " +
                ",sth_iskonto1=@sth_iskonto1 " +
                ",sth_iskonto2=@sth_iskonto2 " +
                ",sth_iskonto3=@sth_iskonto3 " +
                ",sth_iskonto4=@sth_iskonto4 " +
                ",sth_iskonto5=@sth_iskonto5 " +
                ",sth_iskonto6=@sth_iskonto6 " +
                ",sth_sat_iskmas1=@sth_sat_iskmas1 " +
                ",sth_sat_iskmas2=@sth_sat_iskmas2 " +
                ",sth_sat_iskmas3=@sth_sat_iskmas3 " +
                ",sth_sat_iskmas4=@sth_sat_iskmas4 " +
                ",sth_sat_iskmas5=@sth_sat_iskmas5 " +
                ",sth_sat_iskmas6=@sth_sat_iskmas6 " +
                "WHERE  sth_Guid = @sth_Guid",
        param : ['sth_miktar:float','sth_miktar2:float','sth_tutar:float','sth_vergi_pntr:int','sth_iskonto1:float','sth_iskonto2:float','sth_iskonto3:float',
        'sth_iskonto4:float','sth_iskonto5:float','sth_iskonto6:float','sth_sat_iskmas1:bit','sth_sat_iskmas2:bit','sth_sat_iskmas3:bit','sth_sat_iskmas4:bit',
        'sth_sat_iskmas5:bit','sth_sat_iskmas6:bit','sth_Guid:string|50']
    },
    MaxStokHarSira : 
    {
        query: "SELECT ISNULL(MAX(sth_evrakno_sira),0) + 1 AS MAXEVRSIRA FROM STOK_HAREKETLERI " +
                "WHERE sth_evrakno_seri = @sth_evrakno_seri AND sth_evraktip = @sth_evraktip " ,
        param : ['sth_evrakno_seri','sth_evraktip'],
        type : ['string|25','int']
    },
    //Cari Hareket
    CariHarGetir : 
    {
        query:  "SELECT *, " +
                "CONVERT(VARCHAR(10),GETDATE(),112) AS cha_d_kurtar " +
                "FROM CARI_HESAP_HAREKETLERI " +
                "WHERE cha_evrakno_seri=@cha_evrakno_seri AND cha_evrakno_sira=@cha_evrakno_sira " +
                "AND cha_evrak_tip=@cha_evrak_tip" ,
        param:   ['cha_evrakno_seri','cha_evrakno_sira','cha_evrak_tip'],
        type:    ['string|20','int','int']
    },
    CariHarInsert : 
    {
        query:  "DECLARE @UIDTABLE table([cha_Guid] [uniqueidentifier]) " +
                "INSERT INTO [CARI_HESAP_HAREKETLERI] " +
                "([cha_DBCno] " +
                ",[cha_SpecRecNo] " +
                ",[cha_iptal] " +
                ",[cha_fileid] " +
                ",[cha_hidden] " +
                ",[cha_kilitli] " +
                ",[cha_degisti] " +
                ",[cha_CheckSum] " +
                ",[cha_create_user] " +
                ",[cha_create_date] " +
                ",[cha_lastup_user] " +
                ",[cha_lastup_date] " +
                ",[cha_special1] " +
                ",[cha_special2] " +
                ",[cha_special3] " +
                ",[cha_firmano] " +
                ",[cha_subeno] " +
                ",[cha_evrak_tip] " +
                ",[cha_evrakno_seri] " +
                ",[cha_evrakno_sira] " +
                ",[cha_satir_no] " +
                ",[cha_tarihi] " +
                ",[cha_tip] " +
                ",[cha_cinsi] " +
                ",[cha_normal_Iade] " +
                ",[cha_tpoz] " +
                ",[cha_ticaret_turu] " +
                ",[cha_belge_no] " +
                ",[cha_belge_tarih] " +
                ",[cha_aciklama] " +
                ",[cha_satici_kodu] " +
                ",[cha_EXIMkodu] " +
                ",[cha_projekodu] " +
                ",[cha_yat_tes_kodu] " +
                ",[cha_cari_cins] " +
                ",[cha_kod] " +
                ",[cha_ciro_cari_kodu] " +
                ",[cha_d_cins] " +
                ",[cha_d_kur] " +
                ",[cha_altd_kur] " +
                ",[cha_grupno] " +
                ",[cha_srmrkkodu] " +
                ",[cha_kasa_hizmet] " +
                ",[cha_kasa_hizkod] " +
                ",[cha_karsidcinsi] " +
                ",[cha_karsid_kur] " +
                ",[cha_karsidgrupno] " +
                ",[cha_karsisrmrkkodu] " +
                ",[cha_miktari] " +
                ",[cha_meblag] " +
                ",[cha_aratoplam] " +
                ",[cha_vade] " +
                ",[cha_Vade_Farki_Yuz] " +
                ",[cha_ft_iskonto1] " +
                ",[cha_ft_iskonto2] " +
                ",[cha_ft_iskonto3] " +
                ",[cha_ft_iskonto4] " +
                ",[cha_ft_iskonto5] " +
                ",[cha_ft_iskonto6] " +
                ",[cha_ft_masraf1] " +
                ",[cha_ft_masraf2] " +
                ",[cha_ft_masraf3] " +
                ",[cha_ft_masraf4] " +
                ",[cha_isk_mas1] " +
                ",[cha_isk_mas2] " +
                ",[cha_isk_mas3] " +
                ",[cha_isk_mas4] " +
                ",[cha_isk_mas5] " +
                ",[cha_isk_mas6] " +
                ",[cha_isk_mas7] " +
                ",[cha_isk_mas8] " +
                ",[cha_isk_mas9] " +
                ",[cha_isk_mas10] " +
                ",[cha_sat_iskmas1] " +
                ",[cha_sat_iskmas2] " +
                ",[cha_sat_iskmas3] " +
                ",[cha_sat_iskmas4] " +
                ",[cha_sat_iskmas5] " +
                ",[cha_sat_iskmas6] " +
                ",[cha_sat_iskmas7] " +
                ",[cha_sat_iskmas8] " +
                ",[cha_sat_iskmas9] " +
                ",[cha_sat_iskmas10] " +
                ",[cha_yuvarlama] " +
                ",[cha_StFonPntr] " +
                ",[cha_stopaj] " +
                ",[cha_savsandesfonu] " +
                ",[cha_avansmak_damgapul] " +
                ",[cha_vergipntr] " +
                ",[cha_vergi1] " +
                ",[cha_vergi2] " +
                ",[cha_vergi3] " +
                ",[cha_vergi4] " +
                ",[cha_vergi5] " +
                ",[cha_vergi6] " +
                ",[cha_vergi7] " +
                ",[cha_vergi8] " +
                ",[cha_vergi9] " +
                ",[cha_vergi10] " +
                ",[cha_vergisiz_fl] " +
                ",[cha_otvtutari] " +
                ",[cha_otvvergisiz_fl] " +
                ",[cha_oiv_pntr] " +
                ",[cha_oivtutari] " +
                ",[cha_oiv_vergi] " +
                ",[cha_oivergisiz_fl] " +
                ",[cha_fis_tarih] " +
                ",[cha_fis_sirano] " +
                ",[cha_trefno] " +
                ",[cha_sntck_poz] " +
                ",[cha_reftarihi] " +
                ",[cha_istisnakodu] " +
                ",[cha_pos_hareketi] " +
                ",[cha_meblag_ana_doviz_icin_gecersiz_fl] " +
                ",[cha_meblag_alt_doviz_icin_gecersiz_fl] " +
                ",[cha_meblag_orj_doviz_icin_gecersiz_fl] " +
                ",[cha_sip_uid] " +
                ",[cha_kirahar_uid] " +
                ",[cha_vardiya_tarihi] " +
                ",[cha_vardiya_no] " +
                ",[cha_vardiya_evrak_ti] " +
                ",[cha_ebelge_turu] " +
                ",[cha_tevkifat_toplam] " +
                ",[cha_ilave_edilecek_kdv1] " +
                ",[cha_ilave_edilecek_kdv2] " +
                ",[cha_ilave_edilecek_kdv3] " +
                ",[cha_ilave_edilecek_kdv4] " +
                ",[cha_ilave_edilecek_kdv5] " +
                ",[cha_ilave_edilecek_kdv6] " +
                ",[cha_ilave_edilecek_kdv7] " +
                ",[cha_ilave_edilecek_kdv8] " +
                ",[cha_ilave_edilecek_kdv9] " +
                ",[cha_ilave_edilecek_kdv10] " +
                ",[cha_e_islem_turu] " +
                ",[cha_fatura_belge_turu] " +
                ",[cha_diger_belge_adi] " +
                ",[cha_uuid] " +
                ",[cha_adres_no] " +
                ",[cha_vergifon_toplam] " +
                ",[cha_ilk_belge_tarihi] " +
                ",[cha_ilk_belge_doviz_kuru] " +
                ",[cha_HareketGrupKodu1] " +
                ",[cha_HareketGrupKodu2] " +
                ",[cha_HareketGrupKodu3] " +
                ") " + 
                "OUTPUT INSERTED.[cha_Guid] INTO @UIDTABLE " + 
                "VALUES " +
                "(0												--<cha_DBCno, smallint,> \n" + 
                ",0												--<cha_SpecRecNo, int,> \n" + 
                ",0												--<cha_iptal, bit,> \n" + 
                ",51												--<cha_fileid, smallint,> \n" + 
                ",0												--<cha_hidden, bit,> \n" + 
                ",0												--<cha_kilitli, bit,> \n" + 
                ",0												--<cha_degisti, bit,> \n" + 
                ",0												--<cha_CheckSum, int,> \n" + 
                ",@cha_create_user								--<cha_create_user, smallint,> \n" + 
                ",GETDATE()				                        --<cha_create_date, datetime,> \n" + 
                ",@cha_lastup_user								--<cha_lastup_user, smallint,> \n" + 
                ",GETDATE()				                        --<cha_lastup_date, datetime,> \n" + 
                ",''											--<cha_special1, nvarchar(4),> \n" + 
                ",''											--<cha_special2, nvarchar(4),> \n" + 
                ",''											--<cha_special3, nvarchar(4),> \n" + 
                ",@cha_firmano									--<cha_firmano, int,> \n" + 
                ",@cha_subeno									--<cha_subeno, int,> \n" + 
                ",@cha_evrak_tip								--<cha_evrak_tip, tinyint,> \n" + 
                ",@cha_evrakno_seri								--<cha_evrakno_seri, nvarchar_evrakseri,> \n" + 
                ",@cha_evrakno_sira								--<cha_evrakno_sira, int,> \n" + 
                ",(SELECT ISNULL(MAX(cha_satir_no),-1) + 1 AS SATIRNO FROM CARI_HESAP_HAREKETLERI WHERE cha_evrakno_seri = @cha_evrakno_seri AND cha_evrakno_sira = @cha_evrakno_sira AND cha_evrak_tip = @cha_evrak_tip)				--<cha_satir_no, int,> \n" + 
                ",@cha_tarihi									--<cha_tarihi, datetime,> \n" + 
                ",@cha_tip										--<cha_tip, tinyint,> \n" + 
                ",@cha_cinsi									--<cha_cinsi, tinyint,> \n" + 
                ",@cha_normal_Iade								--<cha_normal_Iade, tinyint,> \n" + 
                ",@cha_tpoz										--<cha_tpoz, tinyint,> \n" + 
                ",@cha_ticaret_turu								--<cha_ticaret_turu, tinyint,> \n" + 
                ",@cha_belge_no									--<cha_belge_no, nvarchar_belgeno,> \n" + 
                ",@cha_belge_tarih								--<cha_belge_tarih, datetime,> \n" + 
                ",@cha_aciklama									--<cha_aciklama, nvarchar(40),> \n" + 
                ",@cha_satici_kodu								--<cha_satici_kodu, nvarchar(25),> \n" + 
                ",@cha_EXIMkodu									--<cha_EXIMkodu, nvarchar(25),> \n" + 
                ",@cha_projekodu								--<cha_projekodu, nvarchar(25),> \n" + 
                ",''											--<cha_yat_tes_kodu, nvarchar(25),> \n" + 
                ",@cha_cari_cins								--<cha_cari_cins, tinyint,> \n" + 
                ",@cha_kod										--<cha_kod, nvarchar(25),> \n" + 
                ",@cha_ciro_cari_kodu							--<cha_ciro_cari_kodu, nvarchar(25),> \n" + 
                ",@cha_d_cins									--<cha_d_cins, tinyint,> \n" + 
                ",@cha_d_kur									--<cha_d_kur, float,> \n" + 
                ",@cha_altd_kur									--<cha_altd_kur, float,> \n" + 
                ",@cha_grupno									--<cha_grupno, tinyint,> \n" + 
                ",@cha_srmrkkodu								--<cha_srmrkkodu, nvarchar(25),> \n" + 
                ",@cha_kasa_hizmet								--<cha_kasa_hizmet, tinyint,> \n" + 
                ",@cha_kasa_hizkod								--<cha_kasa_hizkod, nvarchar(25),> \n" + 
                ",0												--<cha_karsidcinsi, tinyint,> \n" + 
                ",1												--<cha_karsid_kur, float,> \n" + 
                ",@cha_karsidgrupno								--<cha_karsidgrupno, tinyint,> \n" + 
                ",''											--<cha_karsisrmrkkodu, nvarchar(25),> \n" + 
                ",0												--<cha_miktari, float,> \n" + 
                ",@cha_meblag									--<cha_meblag, float,> \n" + 
                ",@cha_aratoplam								--<cha_aratoplam, float,> \n" + 
                ",@cha_vade										--<cha_vade, int,> \n" + 
                ",0												--<cha_Vade_Farki_Yuz, float,> \n" + 
                ",@cha_ft_iskonto1								--<cha_ft_iskonto1, float,> \n" + 
                ",@cha_ft_iskonto2								--<cha_ft_iskonto2, float,> \n" + 
                ",@cha_ft_iskonto3								--<cha_ft_iskonto3, float,> \n" + 
                ",@cha_ft_iskonto4								--<cha_ft_iskonto4, float,> \n" + 
                ",@cha_ft_iskonto5								--<cha_ft_iskonto5, float,> \n" + 
                ",@cha_ft_iskonto6								--<cha_ft_iskonto6, float,> \n" + 
                ",@cha_ft_masraf1								--<cha_ft_masraf1, float,> \n" + 
                ",@cha_ft_masraf2								--<cha_ft_masraf2, float,> \n" + 
                ",@cha_ft_masraf3								--<cha_ft_masraf3, float,> \n" + 
                ",@cha_ft_masraf4								--<cha_ft_masraf4, float,> \n" + 
                ",0												--<cha_isk_mas1, tinyint,> \n" + 
                ",0												--<cha_isk_mas2, tinyint,> \n" + 
                ",0												--<cha_isk_mas3, tinyint,> \n" + 
                ",0												--<cha_isk_mas4, tinyint,> \n" + 
                ",0												--<cha_isk_mas5, tinyint,> \n" + 
                ",0												--<cha_isk_mas6, tinyint,> \n" + 
                ",0												--<cha_isk_mas7, tinyint,> \n" + 
                ",0												--<cha_isk_mas8, tinyint,> \n" + 
                ",0												--<cha_isk_mas9, tinyint,> \n" + 
                ",0												--<cha_isk_mas10, tinyint,> \n" + 
                ",0												--<cha_sat_iskmas1, bit,> \n" + 
                ",0												--<cha_sat_iskmas2, bit,> \n" + 
                ",0												--<cha_sat_iskmas3, bit,> \n" + 
                ",0												--<cha_sat_iskmas4, bit,> \n" + 
                ",0												--<cha_sat_iskmas5, bit,> \n" + 
                ",0												--<cha_sat_iskmas6, bit,> \n" + 
                ",0												--<cha_sat_iskmas7, bit,> \n" + 
                ",0												--<cha_sat_iskmas8, bit,> \n" + 
                ",0												--<cha_sat_iskmas9, bit,> \n" + 
                ",0												--<cha_sat_iskmas10, bit,> \n" + 
                ",0												--<cha_yuvarlama, float,> \n" + 
                ",0												--<cha_StFonPntr, tinyint,> \n" + 
                ",0												--<cha_stopaj, float,> \n" + 
                ",0												--<cha_savsandesfonu, float,> \n" + 
                ",0												--<cha_avansmak_damgapul, float,> \n" + 
                ",@cha_vergipntr								--<cha_vergipntr, tinyint,> \n" + 
                ",@cha_vergi1									--<cha_vergi1, float,> \n" + 
                ",@cha_vergi2									--<cha_vergi2, float,> \n" + 
                ",@cha_vergi3									--<cha_vergi3, float,> \n" + 
                ",@cha_vergi4									--<cha_vergi4, float,> \n" + 
                ",@cha_vergi5									--<cha_vergi5, float,> \n" + 
                ",@cha_vergi6									--<cha_vergi6, float,> \n" + 
                ",@cha_vergi7									--<cha_vergi7, float,> \n" + 
                ",@cha_vergi8									--<cha_vergi8, float,> \n" + 
                ",@cha_vergi9									--<cha_vergi9, float,> \n" + 
                ",@cha_vergi10									--<cha_vergi10, float,> \n" + 
                ",@cha_vergisiz_fl								--<cha_vergisiz_fl, bit,> \n" + 
                ",@cha_otvtutari								--<cha_otvtutari, float,> \n" + 
                ",@cha_otvvergisiz_fl							--<cha_otvvergisiz_fl, bit,> \n" + 
                ",0												--<cha_oiv_pntr, tinyint,> \n" + 
                ",0												--<cha_oivtutari, float,> \n" + 
                ",0												--<cha_oiv_vergi, float,> \n" + 
                ",@cha_oivergisiz_fl							--<cha_oivergisiz_fl, bit,> \n" + 
                ",'18991230'									--<cha_fis_tarih, datetime,> \n" + 
                ",0												--<cha_fis_sirano, int,> \n" + 
                ",@cha_trefno									--<cha_trefno, nvarchar(25),> \n" + 
                ",@cha_sntck_poz								--<cha_sntck_poz, tinyint,> \n" + 
                ",'18991230'									--<cha_reftarihi, datetime,> \n" + 
                ",0												--<cha_istisnakodu, tinyint,> \n" + 
                ",0												--<cha_pos_hareketi, bit,> \n" + 
                ",0												--<cha_meblag_ana_doviz_icin_gecersiz_fl, tinyint,> \n" + 
                ",0												--<cha_meblag_alt_doviz_icin_gecersiz_fl, tinyint,> \n" + 
                ",0												--<cha_meblag_orj_doviz_icin_gecersiz_fl, tinyint,> \n" + 
                ",cast(cast(0 as binary) as uniqueidentifier)	--<cha_sip_uid, int,> \n" + 
                ",cast(cast(0 as binary) as uniqueidentifier)	--<cha_kirahar_recid_recno, int,> \n" + 
                ",'18991230'									--<cha_vardiya_tarihi, datetime,> \n" + 
                ",0												--<cha_vardiya_no, tinyint,> \n" + 
                ",0												--<cha_vardiya_evrak_ti, tinyint,> \n" + 
                ",0                                             --<cha_ebelge_turu,tinyint> \n" + 
                ",0												--<cha_tevkifat_toplam, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv1, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv2, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv3, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv4, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv5, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv6, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv7, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv8, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv9, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv10, float,> \n" + 
                ",@cha_e_islem_turu								--<cha_e_islem_turu, tinyint,> \n" + 
                ",0												--<cha_fatura_belge_turu, tinyint,> \n" + 
                ",''											--<cha_diger_belge_adi, nvarchar(50),> \n" + 
                ",''											--<cha_uuid, nvarchar(40),> \n" + 
                ",0												--<cha_adres_no, int,> \n" + 
                ",0												--<cha_vergifon_toplam, float,> \n" + 
                ",'18991230'									--<cha_ilk_belge_tarihi> \n" + 
                ",0												--<cha_ilk_belge_doviz_kuru> \n" + 
                ",''											--<cha_HareketGrupKodu1> \n" + 
                ",''											--<cha_HareketGrupKodu2> \n" + 
                ",''											--<cha_HareketGrupKodu3> \n" + 
                ") " +
                "SELECT [cha_Guid] FROM @UIDTABLE ",
        param : ['cha_create_user:int','cha_lastup_user:int','cha_firmano:int','cha_subeno:int','cha_evrak_tip:int','cha_evrakno_seri:string|25','cha_evrakno_sira:int',
                 'cha_tarihi:date','cha_tip:int','cha_cinsi:int','cha_normal_Iade:int','cha_tpoz:int','cha_ticaret_turu:int','cha_belge_no:string|25','cha_belge_tarih:date',
                 'cha_aciklama:string|40','cha_satici_kodu:string|25','cha_EXIMkodu:string|25','cha_projekodu:string|25','cha_cari_cins:int','cha_kod:string|25','cha_ciro_cari_kodu:string|25',
                 'cha_d_cins:int','cha_d_kur:float','cha_altd_kur:float','cha_grupno:int','cha_srmrkkodu:string|25','cha_kasa_hizmet:int','cha_kasa_hizkod:string|25','cha_karsidgrupno:int',
                 'cha_meblag:float','cha_aratoplam:float','cha_vade:int','cha_ft_iskonto1:float','cha_ft_iskonto2:float','cha_ft_iskonto3:float','cha_ft_iskonto4:float','cha_ft_iskonto5:float',
                 'cha_ft_iskonto6:float','cha_ft_masraf1:float','cha_ft_masraf2:float','cha_ft_masraf3:float','cha_ft_masraf4:float','cha_vergipntr:int','cha_vergi1:float','cha_vergi2:float',
                 'cha_vergi3:float','cha_vergi4:float','cha_vergi5:float','cha_vergi6:float','cha_vergi7:float','cha_vergi8:float','cha_vergi9:float','cha_vergi10:float','cha_vergisiz_fl:bit',
                 'cha_otvtutari:float','cha_otvvergisiz_fl:bit','cha_oivergisiz_fl:bit','cha_trefno:string|25','cha_sntck_poz:int','cha_e_islem_turu:int']
    },
    CariHarEvrDelete : 
    {
        query : "DELETE FROM CARI_HESAP_HAREKETLERI WHERE cha_evrakno_seri=@cha_evrakno_seri AND cha_evrakno_sira=@cha_evrakno_sira AND cha_evrak_tip=@cha_evrak_tip" ,
        param : ['cha_evrakno_seri','cha_evrakno_sira','cha_evrak_tip'],
        type : ['string|20','int','int']
    },
    CariHarSatirDelete : 
    {
        query : "DELETE FROM CARI_HESAP_HAREKETLERI WHERE cha_Guid=@cha_Guid",
        param : ['cha_Guid'],
        type : ['string|50']
    },
    CariHarUpdate:
    {
        query:  "UPDATE CARI_HESAP_HAREKETLERI " +
                "SET cha_meblag=@cha_meblag " +
                ",cha_aratoplam=@cha_aratoplam " +
                ",cha_vergi1=@cha_vergi1 " +
                ",cha_vergi2=@cha_vergi2 " +
                ",cha_vergi3=@cha_vergi3 " + 
                ",cha_vergi4=@cha_vergi4 " + 
                ",cha_vergi5=@cha_vergi5 " + 
                ",cha_vergi6=@cha_vergi6 " + 
                ",cha_vergi7=@cha_vergi7 " + 
                ",cha_vergi8=@cha_vergi8 " + 
                ",cha_vergi9=@cha_vergi9 " + 
                ",cha_vergi10=@cha_vergi10 " +
                ",cha_ft_iskonto1=@cha_ft_iskonto1 " +
                ",cha_ft_iskonto2=@cha_ft_iskonto2 " +
                ",cha_ft_iskonto3=@cha_ft_iskonto3 " +
                ",cha_ft_iskonto4=@cha_ft_iskonto4 " +
                ",cha_ft_iskonto5=@cha_ft_iskonto5 " +
                ",cha_ft_iskonto6=@cha_ft_iskonto6 " +
                ",cha_otvtutari = @cha_otvtutari " +
                "WHERE  cha_Guid = @cha_Guid ",
        param : ['cha_meblag:float','cha_aratoplam:float','cha_vergi1:float','cha_vergi2:float','cha_vergi3:float','cha_vergi4:float','cha_vergi5:float','cha_vergi6:float',
                 'cha_vergi7:float','cha_vergi8:float','cha_vergi9:float','cha_vergi10:float','cha_ft_iskonto1:float','cha_ft_iskonto2:float','cha_ft_iskonto3:float',
                 'cha_ft_iskonto4:float','cha_ft_iskonto5:float','cha_ft_iskonto6:float','cha_otvtutari:float','cha_Guid:string|50']
    },
    MaxCariHarSira : 
    {
        query: "SELECT ISNULL(MAX(cha_evrakno_sira),0) AS MAXEVRSIRA FROM CARI_HESAP_HAREKETLERI WHERE cha_evrakno_seri=@cha_evrakno_seri AND cha_evrak_tip=@cha_evrak_tip" ,
        param : ['cha_evrakno_seri','cha_evrak_tip'],
        type : ['string|25','int']
    },
    //Odeme Emirleri
    CekHarInsert:
    {
        query:  "INSERT INTO [dbo].[ODEME_EMIRLERI] " + 
                "([sck_DBCno] " +
                ",[sck_SpecRECno] " +
                ",[sck_iptal] " +
                ",[sck_fileid] " +
                ",[sck_hidden] " +
                ",[sck_kilitli] " +
                ",[sck_degisti] " +
                ",[sck_checksum] " +
                ",[sck_create_user] " +
                ",[sck_create_date] " +
                ",[sck_lastup_user] " +
                ",[sck_lastup_date] " +
                ",[sck_special1] " +
                ",[sck_special2] " +
                ",[sck_special3] " +
                ",[sck_firmano] " +
                ",[sck_subeno] " +
                ",[sck_tip] " +
                ",[sck_refno] " +
                ",[sck_bankano] " +
                ",[sck_borclu] " +
                ",[sck_vdaire_no] " +
                ",[sck_vade] " +
                ",[sck_tutar] " +
                ",[sck_doviz] " +
                ",[sck_odenen] " +
                ",[sck_degerleme_islendi] " +
                ",[sck_banka_adres1] " +
                ",[sck_sube_adres2] " +
                ",[sck_borclu_tel] " +
                ",[sck_hesapno_sehir] " +
                ",[sck_no] " +
                ",[sck_duzen_tarih] " +
                ",[sck_sahip_cari_cins] " +
                ",[sck_sahip_cari_kodu] " +
                ",[sck_sahip_cari_grupno] " +
                ",[sck_nerede_cari_cins] " +
                ",[sck_nerede_cari_kodu] " +
                ",[sck_nerede_cari_grupno] " +
                ",[sck_ilk_hareket_tarihi] " +
                ",[sck_ilk_evrak_seri] " +
                ",[sck_ilk_evrak_sira_no] " +
                ",[sck_ilk_evrak_satir_no] " +
                ",[sck_son_hareket_tarihi] " +
                ",[sck_doviz_kur] " +
                ",[sck_sonpoz] " +
                ",[sck_imza] " +
                ",[sck_srmmrk] " +
                ",[sck_kesideyeri] " +
                ",[Sck_TCMB_Banka_kodu] " +
                ",[Sck_TCMB_Sube_kodu] " +
                ",[Sck_TCMB_il_kodu] " +
                ",[SckTasra_fl] " +
                ",[sck_projekodu] " +
                ",[sck_masraf1] " +
                ",[sck_masraf1_isleme] " +
                ",[sck_masraf2] " +
                ",[sck_masraf2_isleme] " +
                ",[sck_odul_katkisi_tutari] " +
                ",[sck_servis_komisyon_tutari] " +
                ",[sck_erken_odeme_faiz_tutari] " +
                ",[sck_odul_katkisi_tutari_islendi_fl] " +
                ",[sck_servis_komisyon_tutari_islendi_fl] " +
                ",[sck_erken_odeme_faiz_tutari_islendi_fl] " +
                ",[sck_kredi_karti_tipi] " +
                ",[sck_taksit_sayisi] " +
                ",[sck_kacinci_taksit] " +
                ",[sck_uye_isyeri_no] " +
                ",[sck_kredi_karti_no] " +
                ",[sck_provizyon_kodu]) " +
                "VALUES " +
                "(0                         --<sck_DBCno, smallint,> \n" + 
                ",0                         --<sck_SpecRECno, int,> \n" + 
                ",0                         --<sck_iptal, bit,> \n" + 
                ",54                        --<sck_fileid, smallint,> \n" + 
                ",0                         --<sck_hidden, bit,> \n" + 
                ",0                         --<sck_kilitli, bit,> \n" + 
                ",0                         --<sck_degisti, bit,> \n" + 
                ",0                         --<sck_checksum, int,> \n" + 
                ",@sck_create_user          --<sck_create_user, smallint,> \n" + 
                ",GETDATE()                 --<sck_create_date, datetime,> \n" + 
                ",@sck_lastup_user          --<sck_lastup_user, smallint,> \n" + 
                ",GETDATE()                 --<sck_lastup_date, datetime,> \n" + 
                ",''                        --<sck_special1, nvarchar(4),> \n" + 
                ",''                        --<sck_special2, nvarchar(4),> \n" + 
                ",''                        --<sck_special3, nvarchar(4),> \n" + 
                ",@sck_firmano              --<sck_firmano, int,> \n" + 
                ",@sck_subeno               --<sck_subeno, int,> \n" + 
                ",@sck_tip                  --<sck_tip, tinyint,> \n" + 
                ",@sck_refno                --<sck_refno, nvarchar(25),> \n" + 
                ",''                        --<sck_bankano, nvarchar(25),> \n" + 
                ",@sck_borclu               --<sck_borclu, nvarchar(50),> \n" + 
                ",''                        --<sck_vdaire_no, nvarchar(40),> \n" + 
                ",@sck_vade                 --<sck_vade, datetime,> \n" + 
                ",@sck_tutar                --<sck_tutar, float,> \n" + 
                ",@sck_doviz                --<sck_doviz, tinyint,> \n" + 
                ",@sck_odenen               --<sck_odenen, float,> \n" + 
                ",0                         --<sck_degerleme_islendi, tinyint,> \n" + 
                ",''                        --<sck_banka_adres1, nvarchar(50),> \n" + 
                ",''                        --<sck_sube_adres2, nvarchar(50),> \n" + 
                ",''                        --<sck_borclu_tel, nvarchar(15),> \n" + 
                ",''                        --<sck_hesapno_sehir, nvarchar(30),> \n" + 
                ",''                        --<sck_no, nvarchar(25),> \n" + 
                ",'18991230'                --<sck_duzen_tarih, datetime,> \n" + 
                ",@sck_sahip_cari_cins      --<sck_sahip_cari_cins, tinyint,> \n" + 
                ",@sck_sahip_cari_kodu      --<sck_sahip_cari_kodu, nvarchar(25),> \n" + 
                ",@sck_sahip_cari_grupno    --<sck_sahip_cari_grupno, tinyint,> \n" + 
                ",@sck_nerede_cari_cins     --<sck_nerede_cari_cins, tinyint,> \n" + 
                ",@sck_nerede_cari_kodu     --<sck_nerede_cari_kodu, nvarchar(25),> \n" + 
                ",@sck_nerede_cari_grupno   --<sck_nerede_cari_grupno, tinyint,> \n" + 
                ",@sck_ilk_hareket_tarihi   --<sck_ilk_hareket_tarihi, datetime,> \n" + 
                ",@sck_ilk_evrak_seri       --<sck_ilk_evrak_seri, [dbo].[evrakseri_str],> \n" + 
                ",@sck_ilk_evrak_sira_no    --<sck_ilk_evrak_sira_no, int,> \n" + 
                ",@sck_ilk_evrak_satir_no   --<sck_ilk_evrak_satir_no, int,> \n" + 
                ",@sck_son_hareket_tarihi   --<sck_son_hareket_tarihi, datetime,> \n" + 
                ",@sck_doviz_kur            --<sck_doviz_kur, float,> \n" + 
                ",@sck_sonpoz               --<sck_sonpoz, tinyint,> \n" + 
                ",0                         --<sck_imza, tinyint,> \n" + 
                ",@sck_srmmrk               --<sck_srmmrk, nvarchar(25),> \n" + 
                ",''                        --<sck_kesideyeri, nvarchar(14),> \n" + 
                ",''                        --<Sck_TCMB_Banka_kodu, nvarchar(4),> \n" + 
                ",''                        --<Sck_TCMB_Sube_kodu, nvarchar(8),> \n" + 
                ",''                        --<Sck_TCMB_il_kodu, nvarchar(3),> \n" + 
                ",0                         --<SckTasra_fl, bit,> \n" + 
                ",@sck_projekodu            --<sck_projekodu, nvarchar(25),> \n" + 
                ",0                         --<sck_masraf1, float,> \n" + 
                ",0                         --<sck_masraf1_isleme, tinyint,> \n" + 
                ",0                         --<sck_masraf2, float,> \n" + 
                ",0                         --<sck_masraf2_isleme, tinyint,> \n" + 
                ",0                         --<sck_odul_katkisi_tutari, float,> \n" + 
                ",0                         --<sck_servis_komisyon_tutari, float,> \n" + 
                ",0                         --<sck_erken_odeme_faiz_tutari, float,> \n" + 
                ",0                         --<sck_odul_katkisi_tutari_islendi_fl, bit,> \n" + 
                ",0                         --<sck_servis_komisyon_tutari_islendi_fl, bit,> \n" + 
                ",0                         --<sck_erken_odeme_faiz_tutari_islendi_fl, bit,> \n" + 
                ",0                         --<sck_kredi_karti_tipi, tinyint,> \n" + 
                ",0                         --<sck_taksit_sayisi, smallint,> \n" + 
                ",0                         --<sck_kacinci_taksit, smallint,> \n" + 
                ",''                        --<sck_uye_isyeri_no, nvarchar(25),> \n" + 
                ",''                        --<sck_kredi_karti_no, nvarchar(16),> \n" + 
                ",''                        --<sck_provizyon_kodu, nvarchar(10),> \n" + 
                ")",
        param : ['sck_create_user:int','sck_lastup_user:int','sck_firmano:int','sck_subeno:int','sck_tip:int','sck_refno:string|25','sck_borclu:string|25',
                 'sck_vade:date','sck_tutar:float','sck_doviz:int','sck_odenen:float','sck_sahip_cari_cins:int','sck_sahip_cari_kodu:string|25','sck_sahip_cari_grupno:int','sck_nerede_cari_cins:int',
                 'sck_nerede_cari_kodu:string|25','sck_nerede_cari_grupno:int','sck_ilk_hareket_tarihi:date','sck_ilk_evrak_seri:string|25','sck_ilk_evrak_sira_no:int','sck_ilk_evrak_satir_no:int',
                 'sck_son_hareket_tarihi:date','sck_doviz_kur:float','sck_sonpoz:int','sck_srmmrk:string|25','sck_projekodu:string|25']
    },
    CekHarUpdate:
    {
        query:  "UPDATE ODEME_EMIRLERI " +
                "SET sck_tutar = @sck_tutar " +
                "WHERE sck_ilk_evrak_seri = @sck_ilk_evrak_seri AND sck_ilk_evrak_sira_no = @sck_ilk_evrak_sira_no " +
                "AND sck_ilk_evrak_satir_no = @sck_ilk_evrak_satir_no",
        param : ['sck_tutar:float','sck_ilk_evrak_seri:string|50','sck_ilk_evrak_sira_no:int','sck_ilk_evrak_satir_no:int']
    },
    MaxCekRefNo : 
    {
        query: "SELECT MAX(CONVERT(INT,SUBSTRING(sck_refno,17,25))) AS REFNO FROM ODEME_EMIRLERI WHERE sck_tip = @sck_tip" ,
        param : ['sck_tip'],
        type : ['int']
    },
    //Pos Satis
    PluGrpGetir:
    {
        query : "SELECT GRUP FROM TERP_POS_PLU GROUP BY GRUP",
        param : ['SUBE'],
        type : ['int'] 
    },
    PluGetir:
    {
        query: "SELECT * FROM TERP_POS_PLU WHERE GRUP = @GRUP",
        param : ['GRUP'],
        type : ['string|25']
    },
    PosSatisInsert : 
    {
        query : "INSERT INTO [dbo].[TERP_POS_SATIS] ( " +
                "[OTARIH] " +
                ",[DTARIH] " +
                ",[KULLANICI] " +
                ",[SUBE] " +
                ",[TIP] " +
                ",[TARIH] " +
                ",[SERI] " +
                ",[SIRA] " +
                ",[SATIRNO] " +
                ",[MKODU] " +
                ",[SKODU] " +
                ",[BARKOD] " +
                ",[MIKTAR] " +
                ",[BIRIMPNTR] " +
                ",[FIYAT] " +
                ",[ISKONTO] " +
                ",[KDVPNTR] " +
                ",[DURUM] " +
                ") VALUES ( " +
                "GETDATE()                              --<OTARIH, datetime,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112)    --<DTARIH, datetime,> \n" +
                ",@KULLANICI                            --<KULLANICI, smallint,> \n" +
                ",@SUBE                                 --<SUBE, int,> \n" +
                ",@TIP                                  --<TIP, tinyint,> \n" +
                ",@TARIH                                --<TARIH, datetime,> \n" +
                ",@SERI                                 --<SERI, nvarchar(25),> \n" +
                ",@SIRA                                 --<SIRA, int,> \n" +
                ",(SELECT ISNULL(MAX(SATIRNO),-1) + 1 AS SATIRNO FROM TERP_POS_SATIS WHERE SERI = @SERI AND SIRA = @SIRA AND TIP = @TIP) --<SATIRNO, int,> \n" +
                ",@MKODU                                --<MKODU, nvarchar(25),> \n" +
                ",@SKODU                                --<SKODU, nvarchar(25),> \n" +
                ",@BARKOD                                --<BARKOD, nvarchar(50),> \n" +
                ",@MIKTAR                               --<MIKTAR, float,> \n" +
                ",@BIRIMPNTR                            --<BIRIMPNTR, tinyint,> \n" +
                ",@FIYAT                                --<FIYAT, float,> \n" +
                ",@ISKONTO                              --<ISKONTO, float,> \n" +
                ",@KDVPNTR                              --<KDVPNTR, smallint,> \n" +
                ",@DURUM                                --<DURUM, int,> \n" +
                ") ",
        param : ['KULLANICI:string','SUBE:int','TIP:int','TARIH:date','SERI:string|25','SIRA:int','MKODU:string|25','SKODU:string|25',
                 'BARKOD:string|50','MIKTAR:float','BIRIMPNTR:int','FIYAT:float','ISKONTO:float','KDVPNTR:int',"DURUM:int"]
    },
    PosSatisGetir : 
    {
        query:  "SELECT " +
                "RECID AS RECID, " +
                "SERI AS SERI, " +
                "SIRA AS SIRA, " +
                "SATIRNO AS SATIRNO, " +
                "MKODU AS MKODU, " +
                "SKODU AS SKODU, " +
                "ISNULL((SELECT TOP 1 sto_isim FROM STOKLAR WHERE sto_kod = SKODU),'') AS SADI, " +
                "BARKOD AS BARKOD, " +
                "MIKTAR AS MIKTAR, " +
                "BIRIMPNTR AS BIRIMPNTR, " +
                "(SELECT dbo.fn_StokBirimi (SKODU,BIRIMPNTR)) AS BIRIM, " +
                "FIYAT AS FIYAT, " +
                "ISKONTO AS ISKONTO, " +
                "KDVPNTR AS KDVPNTR, " +
                "(SELECT dbo.fn_VergiYuzde (KDVPNTR)) AS KDV, " +
                "MIKTAR * FIYAT AS TUTAR " +
                "FROM TERP_POS_SATIS WHERE SUBE = @SUBE AND TIP = @TIP AND SERI = @SERI AND SIRA = @SIRA ORDER BY RECID DESC" ,
        param:   ['SUBE','TIP','SERI','SIRA'],
        type:    ['int','int','string|25','int']
    },
    PosSonSatisGetir : 
    {
        query:  "SELECT " +
                "TOP 100 MAX(RECID) AS RECID, " +
                "(SELECT MAX(CASE WHEN TIP = 0 THEN 'NAKİT' WHEN TIP = 1 THEN 'KREDİKARTI' WHEN TIP = 2 THEN 'AÇIKHESAP' END) AS TIP FROM TERP_POS_TAHSILAT AS PT WHERE PT.SERI = PS.SERI AND PT.SIRA = PS.SIRA) AS TIP, " +
                "SERI AS SERI, " +
                "SIRA AS SIRA, " +
                "COUNT(SATIRNO) AS SATIR, " +
                "MAX(KULLANICI) AS KULLANICI, " +
                "CAST(MAX(MIKTAR) AS DECIMAL(10,2)) AS MIKTAR, " +
                "CAST(MAX(FIYAT) AS DECIMAL(10,2))  AS FIYAT, " +
                "CAST((MAX(MIKTAR) * MAX(FIYAT)) AS DECIMAL(10,2)) AS TUTAR, " +
                "CONVERT(VARCHAR(10), MAX(OTARIH), 108) AS SAAT, " +
                "CONVERT(VARCHAR(10), MAX(OTARIH), 104) AS TARIH " +
                "FROM TERP_POS_SATIS AS PS WHERE SUBE = @SUBE AND DURUM <> 0 " +
                "GROUP BY SERI,SIRA ORDER BY RECID DESC " ,
        param: ['SUBE'],
        type: ['int']
    },
    PosSonSatisDetayGetir : 
    {
        query:  "SELECT " +
                "(SELECT MAX(CASE WHEN TIP = 0 THEN 'NAKİT' WHEN TIP = 1 THEN 'KREDİKARTI' WHEN TIP = 2 THEN 'AÇIKHESAP' END) AS TIP FROM TERP_POS_TAHSILAT AS PT WHERE PT.SERI = PS.SERI AND PT.SIRA = PS.SIRA) AS TIP, " +
                "SERI AS SERI, " +
                "SIRA AS SIRA, " +
                "SKODU AS KODU, " + 
                "BARKOD AS BARKOD, " +   
                "ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod = SKODU),'') AS ADI, " +
                "CAST(MIKTAR AS decimal(10,2)) AS MIKTAR, " +
                "CAST(FIYAT AS decimal(10,2))  AS FIYAT, " +
                "CAST((MIKTAR * FIYAT) AS decimal(10,2)) AS TUTAR " +
                "FROM TERP_POS_SATIS AS PS WHERE SUBE = @SUBE AND SERI = @SERI AND SIRA = @SIRA AND DURUM <> 0 " ,
        param: ['SUBE','SERI','SIRA'],
        type: ['int','string|25','int']
    },
    MaxPosSatisSira : 
    {
        query: "SELECT ISNULL(MAX(SIRA),0) + 1 AS MAXEVRSIRA FROM TERP_POS_SATIS " +
                "WHERE SUBE = @SUBE AND SERI = @SERI AND TIP = @TIP " ,
        param : ['SUBE','SERI','TIP'],
        type : ['int','string|25','int']
    },
    MaxPosTahSira : 
    {
        query: "SELECT ISNULL(MAX(SIRA),0) + 1 AS MAXEVRSIRA FROM TERP_POS_TAHSILAT " +
                "WHERE SUBE = @SUBE AND SERI = @SERI AND TIP = @TIP " ,
        param : ['SUBE','SERI','TIP'],
        type : ['int','string|25','int']
    },
    PosSatisMiktarUpdate : 
    {
        query: "UPDATE [dbo].[TERP_POS_SATIS] SET [MIKTAR] = @MIKTAR,[ISKONTO] = @ISKONTO WHERE RECID = @RECID",
        param: ['MIKTAR','ISKONTO','RECID'],
        type:  ['float','float','int']
    },
    PosSatisBelgeIptal : 
    {
        query: "DELETE FROM TERP_POS_SATIS WHERE SERI = @SERI AND SIRA = @SIRA AND TIP = @TIP",
        param: ['SERI','SIRA','TIP'],
        type:  ['string|25','int','int']
    },
    PosSatisSatirIptal : 
    {
        query: "DELETE FROM TERP_POS_SATIS WHERE RECID = @RECID",
        param: ['RECID'],
        type:  ['int']
    },
    PosSatisParkListe:
    {
        query:"SELECT MAX(KULLANICI) AS KULLANICI, SERI AS SERI,SIRA AS SIRA, SUM(FIYAT * MIKTAR) AS TUTAR,MAX(CONVERT(varchar(10),OTARIH, 121)) AS TARIH " +
              "FROM TERP_POS_SATIS WHERE SUBE = @SUBE AND TIP = @TIP AND KULLANICI = @KULLANICI AND DURUM = @DURUM GROUP BY SERI,SIRA",
        param: ['SUBE','TIP','KULLANICI','DURUM'],
        type:  ['int','int','string|25','int']  
    },
    PosTahInsert : 
    {
        query : "INSERT INTO [dbo].[TERP_POS_TAHSILAT] " +
                "([OTARIH] " +
                ",[DTARIH] " +
                ",[KULLANICI] " +
                ",[SUBE] " +
                ",[TIP] " +
                ",[EVRAKTIP] " +
                ",[TARIH] " +
                ",[SERI] " +
                ",[SIRA] " +
                ",[SATIRNO] " +
                ",[MKODU] " +
                ",[KKODU] " +
                ",[TUTAR] " +
                ",[USTU] " +
                ",[DURUM] " +
                ") VALUES ( " +
                "CONVERT(VARCHAR(10),GETDATE(),112)			--<OTARIH, datetime,> \n" +
                ",GETDATE()			--<DTARIH, datetime,> \n" +
                ",@KULLANICI		--<KULLANICI, smallint,> \n" +
                ",@SUBE			--<SUBE, int,> \n" +
                ",@TIP			--<TIP, tinyint,> \n" +
                ",@EVRAKTIP		--<EVRAKTIP, tinyint,> \n" +
                ",@TARIH			--<TARIH, datetime,> \n" +
                ",@SERI			--<SERI, nvarchar(5),> \n" +
                ",@SIRA			--<SIRA, int,> \n" +
                ",(SELECT ISNULL(MAX(SATIRNO),-1) + 1 AS SATIRNO FROM TERP_POS_TAHSILAT WHERE SERI = @SERI AND SIRA = @SIRA AND EVRAKTIP = @EVRAKTIP)		--<SATIRNO, int,> \n" +
                ",@MKODU			--<MKODU, nvarchar(25),> \n" +
                ",@KKODU			--<KKODU, nvarchar(25),> \n" +
                ",@TUTAR			--<TUTAR, float,> \n" +
                ",@USTU			--<USTU, float,> \n" +
                ",@DURUM		--<DURUM, float,> \n" +
                ")",
        param : ['KULLANICI:string','SUBE:int','TIP:int','EVRAKTIP:int','TARIH:date','SERI:string|25','SIRA:int','MKODU:string|25','KKODU:string|25','TUTAR:float',
                 'USTU:float','DURUM:int']
    },
    PosTahIptal : 
    {
        query: "DELETE FROM TERP_POS_TAHSILAT WHERE SERI = @SERI AND SIRA = @SIRA AND EVRAKTIP = @EVRAKTIP",
        param: ['SERI','SIRA','EVRAKTIP'],
        type:  ['string|25','int','int']
    },
    PosTahSatirIptal : 
    {
        query: "DELETE FROM TERP_POS_TAHSILAT WHERE RECID = @RECID",
        param: ['RECID'],
        type:  ['int']
    },
    PosTahGetir : 
    {
        query:  "SELECT " +
                "RECID AS RECID, " +
                "SERI AS SERI, " +
                "SIRA AS SIRA, " +
                "CASE WHEN TIP = 0 THEN " +
                "'Nakit' " +
                "WHEN TIP = 1 THEN " +
                "'Kredi Kartı' " +
                "WHEN TIP = 2 THEN " + 
                "'Açık Hesap' " +
                "END AS STIP, " +
                "TIP AS TIP," +
                "EVRAKTIP AS EVRAKTIP," +
                "SATIRNO AS SATIRNO, " +
                "MKODU AS MKDOU, " +
                "TUTAR AS TUTAR, " +
                "USTU AS USTU " +
                "FROM TERP_POS_TAHSILAT WHERE SUBE = @SUBE AND EVRAKTIP = @EVRAKTIP AND SERI = @SERI AND SIRA = @SIRA" ,
        param:   ['SUBE','EVRAKTIP','SERI','SIRA'],
        type:    ['int','int','string|25','int']
    },
    PosSatisKapatUpdate : 
    {
        query: "UPDATE [dbo].[TERP_POS_SATIS] SET [DURUM] = 1 WHERE SUBE = @SUBE AND SERI = @SERI AND SIRA = @SIRA AND TIP = @TIP",
        param: ['SUBE','SERI','SIRA','TIP'],
        type:  ['int','string|25','int','int']
    },
    PluInsert :
    {
        query : "INSERT [dbo].[TERP_POS_PLU] " +
                "([SUBE], " +
                "[KODU], " +
                "[ADI], " +
                "[GRUP] " +
                ") VALUES ( " +
                "@SUBE           --<SUBE, int,> \n" +
                ",@KODU			--<KODU, nvarchar(25),> \n" +
                ",@ADI			--<ADI, nvarchar(25),> \n" +
                ",@GRUP			--<GRUP, nvarchar(25),> \n" +
                ")",
        param  :['SUBE:int','KODU:string|25','ADI:string|25','GRUP:string|25']
    },
    PluDelete :
    {
        query : "DELETE FROM [dbo].TERP_POS_PLU WHERE RECID = @RECID " ,
        param  :['RECID:int']
    },
    PluUpdate : 
    {
        query : "UPDATE [dbo].TERP_POS_PLU SET ADI = @ADI, GRUP = @GRUP WHERE RECID = @RECID " ,
        param : ['ADI:string|25','GRUP:string|25','RECID:int']
    },
    PluTanimListeGetir : 
    {
        query : "SELECT RECID,SUBE,ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod = BARKOD_TANIMLARI.bar_stokkodu),'') AS STOKADI,ADI AS PLUADI,GRUP,bar_kodu AS KODU " +
                "FROM TERP_POS_PLU RIGHT JOIN BARKOD_TANIMLARI ON TERP_POS_PLU.KODU = BARKOD_TANIMLARI.bar_kodu WHERE ((bar_kodu = @KODU) OR (@KODU = ''))",
        param : ['KODU:string|50']
    },
    PosSatisIskonto :
    {
        query : "UPDATE [dbo].[TERP_POS_SATIS] SET [ISKONTO] = @ISKONTO WHERE RECID = @RECID",
        param : ['ISKONTO','RECID'],
        type : ['float','int']
    },
    //CariListe
    RptCariListe :
    {
        query :"SELECT cari_unvan1 AS CARIAD, cari_kod AS CARIKOD, " +
                "(SELECT ISNULL(adr_sokak+' '+adr_cadde+' '+adr_ilce+' '+adr_il,+'') FROM CARI_HESAP_ADRESLERI WHERE adr_adres_no = 1) AS ADRES " +
                "FROM CARI_HESAPLAR " 
    },
    //#region "AKTARIM"
    AdresTbl : 
    {
        query : "SELECT adr_cari_kod AS CARIKODU," +
                "adr_adres_no AS ADRESNO," +
                "adr_cadde AS CADDE," +
                "adr_sokak AS SOKAK," +
                "adr_ilce AS ILCE," +
                "adr_il AS IL," +
                "cari_sektor_kodu AS SEKTOR," +
                "cari_grup_kodu AS GRUBU," +
                "cari_bolge_kodu AS BOLGE," +
                "cari_temsilci_kodu AS TEMSILCI " +
                "FROM CARI_HESAP_ADRESLERI AS ADRES " +
                "INNER JOIN CARI_HESAPLAR AS CARI ON " +
                "ADRES.adr_cari_kod = CARI.cari_kod" 
    },
    AlisSartiTbl :
    {
        query : "SELECT sas_stok_kod AS STOKKOD, " +
                "sas_cari_kod AS CARIKOD, " +
                "sas_bitis_tarih AS BITIS, " +
                "sas_basla_tarih AS BASLANGIC, " +
                "sas_brut_fiyat AS FIYAT, " +
                "sas_isk_miktar1 AS ISKONTOM1, " +
                "sas_isk_miktar2 AS ISKONTOM2, " +
                "sas_isk_miktar3 AS ISKONTOM2, " +
                "sas_isk_miktar4 AS ISKONTOM2, " +
                "sas_isk_miktar5 AS ISKONTOM2, " +
                "sas_isk_yuzde1 AS ISKONTOY1, " +
                "sas_isk_yuzde2 AS ISKONTOY1, " +
                "sas_isk_yuzde3 AS ISKONTOY1, " +
                "sas_isk_yuzde4 AS ISKONTOY1, " +
                "sas_isk_yuzde5 AS ISKONTOY1, " +
                "sas_odeme_plan AS ODEPLAN, " +
                "sas_odeme_plan AS ODEPLAN, " +
                "sas_depo_no AS DEPO," +
                "1 AS LISTENO, " +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(sas_doviz_cinsi, 0))) AS DOVIZSEMBOL, " +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10), GETDATE(), 112), ISNULL(sas_doviz_cinsi, 0), 2)) AS DOVIZKUR, " +           
                "cari_sektor_kodu AS SEKTOR, " +
                "cari_bolge_kodu AS BOLGE, " +
                "cari_grup_kodu AS GRUP, " +
                "cari_temsilci_kodu AS TEMSILCI " +
                "FROM SATINALMA_SARTLARI AS ALIS " +
                "INNER JOIN CARI_HESAPLAR AS CARI ON " +
                "ALIS.sas_cari_kod = CARI.cari_kod"
    },
    AltGrupTbl :
    {
        query : "SELECT  sta_kod AS KODU, " +
                "sta_isim AS ADI " +
                "FROM STOK_ALT_GRUPLARI"
    },
    AnaGrupTbl : 
    {
        query : "san_kod AS KODU, " +
                "san_isim AS ADI " +
                "FROM STOK_ANA_GRUPLARI"
    },
    BankaTbl : 
    {
        query : "ban_kod AS BANKAKODU, " +
                "ban_ismi AS BANKAISMI, " +
                "ban_doviz_cinsi AS BANKADOVIZCINSI, " +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(ban_doviz_cinsi,0))) AS DOVIZSEMBOL, " +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(ban_doviz_cinsi,0),2)) AS DOVIZKUR " +
                "FROM BANKALAR"
    },
    CariTbl :
    {
        query : "cari_kod AS KODU, " +
                "cari_cari_kilitli_flg AS CKILIT, " +
                "cari_unvan1 AS UNVAN1, " +
                "cari_unvan2 AS UNVAN2, " +
                "cari_doviz_cinsi AS DOVIZCINSI, " +
                "cari_doviz_cinsi1 AS DOVIZCINSI1, " +
                "cari_doviz_cinsi2 AS DOVIZCINSI2, " +
                "cari_vdaire_adi AS VDADI, " +
                "cari_vdaire_no AS VDNO, " +
                "cari_satis_fk AS SATISFK, " +
                "cari_satis_isk_kod AS ISKONTOKOD, " +
                "cari_sektor_kodu AS SEKTOR, " +
                "cari_bolge_kodu AS BOLGE, " +
                "cari_grup_kodu AS GRUP, " +
                "cari_temsilci_kodu AS TEMSILCI, " +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi,0))) AS DOVIZSEMBOL, " +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi1,0))) AS DOVIZSEMBOL1, " +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi2,0))) AS DOVIZSEMBOL2, " +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi,0),2)) AS DOVIZKUR, " +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi1,0),2)) AS DOVIZKUR1, " +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi2,0),2)) AS DOVIZKUR2, " +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(1,0),2)) AS ALTDOVIZKUR, " +
                "ISNULL((SELECT sum(ct_tutari) FROM dbo.CARI_HESAP_TEMINATLARI WHERE ct_carikodu = cari_kod),0) AS RISK, " +
                "cari_odemeplan_no AS ODEMEPLANI, " +
                "ISNULL((SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'',0,cari_doviz_cinsi,0,0,0,0,0)),0) AS BAKIYE, " +
                "CARI_MUSTAHSIL_TANIMLARI.Cm_BelgeNo as BELGENO, CARI_MUSTAHSIL_TANIMLARI.Cm_GecerlilikTarihi as BELGETARIH, " +
                "cari_BUV_tabi_fl AS VERGISIZ, " +
                "cari_efatura_fl AS EFATURA " +
                "FROM CARI_MUSTAHSIL_TANIMLARI RIGHT OUTER JOIN " +
                "CARI_HESAPLAR ON CARI_MUSTAHSIL_TANIMLARI.Cm_carikodu = CARI_HESAPLAR.cari_kod"
    },
    CariFoyTbl :
     {
         query : "SELECT TOP 5, " +
                 "[#msg_S_0200] AS [KODU], " +
                 "[#msg_S_0201] AS [ADI], " +
                 "[msg_S_0090] AS [SERI], " +
                 "[msg_S_0091] AS [SIRA], " +
                 "[#msg_S_0092] AS [TARIH], " +
                 "[msg_S_0094] AS [EVRAKTIP], " +
                 "[msg_S_0003] AS [CINSI], " +
                 "[msg_S_0097] AS [NI], " +
                 "[msg_S_0100] AS [BA], " +
                 "[msg_S_0101\T] AS [BORC], " +
                 "[msg_S_0102\T] AS [ALACAK], " +
                 "[#msg_S_0103\T] AS [BAKIYE], " +
                 "DATEDIFF(DAY,[#msg_S_0092],GETDATE()) AS [GUNFARK], " +
                 "dbo.fn_CariHesapBakiye(0,0,[#msg_S_0200],'','',0,0) as TBAKIYE  " +
                 "FROM [dbo].[fn_CariFoy] " +
                 "(0 ,0 ,@KODU ,0 ,@DEVIRTARIH ,@ILKTARIH ,@SONTARIH ,0 ,'') " +
                 "order by [#msg_S_0092] DESC"
    },
    DepoTbl : 
     {
         query : "dep_no AS DEPONO, " +
                 "dep_adi AS DEPOADI, " +
                 "dep_cadde AS DEPOCADDE, " +
                 "dep_sokak AS DEPOSOKAK, " +
                 "dep_Ilce AS DEPOILCE, " +
                 "dep_Il AS DEPOIL " +
                 "FROM DEPOLAR"
    },
    DepoSiparisStok : 
     {
         query : "SELECT CONVERT(NVARCHAR(50),DEPOSIPARIS.ssip_Guid) AS RECNO, " +
                 "BARKOD.bar_kodu AS BARKOD, " +
                 "DEPOSIPARIS.ssip_stok_kod AS KODU, " +
                 "ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod=DEPOSIPARIS.ssip_stok_kod),'') AS ADI, " +
                 "DEPOSIPARIS.ssip_tarih AS TARIH, " +
                 "DEPOSIPARIS.ssip_teslim_tarih AS TESLIMTARIH, " +
                 "DEPOSIPARIS.ssip_evrakno_seri AS SERI, " +
                 "DEPOSIPARIS.ssip_evrakno_sira AS SIRA, " +
                 "DEPOSIPARIS.ssip_satirno AS SATIRNO, " +
                 "DEPOSIPARIS.ssip_belgeno AS BELGENO, " +
                 "DEPOSIPARIS.ssip_b_fiyat AS BFIYAT, " +
                 "DEPOSIPARIS.ssip_miktar AS SIPMIKTAR, " +
                 "DEPOSIPARIS.ssip_birim_pntr AS BIRIMPNTR, " +
                 "DEPOSIPARIS.ssip_teslim_miktar AS TESLIMMIKTAR, " +
                 "DEPOSIPARIS.ssip_tutar AS TUTAR, " +
                 "DEPOSIPARIS.ssip_girdepo AS GDEPO, " +
                 "DEPOSIPARIS.ssip_cikdepo As CDEPO, " +
                 "(DEPOSIPARIS.ssip_miktar - DEPOSIPARIS.ssip_teslim_miktar) AS BMIKTAR, " +
                 "CAST(ISNULL(NULL,0) AS FLOAT) AS MIKTAR, " +
                 "(SELECT dbo.fn_StokBirimi (DEPOSIPARIS.ssip_stok_kod,DEPOSIPARIS.ssip_birim_pntr)) AS BIRIM, " +
                 "0 AS BEDENNO, " +
                 "BARKOD.bar_bedenpntr AS BEDENPNTR, " +
                 "BARKOD.bar_renkpntr AS RENKPNTR, " +
                 "'' AS RENK, " +
                 "'' AS BEDEN, " +
                 "ISNULL((SELECT dbo.fn_StokBirimHesapla (DEPOSIPARIS.ssip_stok_kod,BARKOD.bar_birimpntr,1,1)),1) AS KATSAYI, " +
                 "0 AS DEPOMIKTAR, " +
                 "STOK.sto_detay_takip AS DETAYTAKIP " +
                 "FROM DEPOLAR_ARASI_SIPARISLER AS DEPOSIPARIS " +
                 "INNER JOIN BARKOD_TANIMLARI AS BARKOD ON " +
                 "DEPOSIPARIS.ssip_stok_kod=BARKOD.bar_stokkodu " +
                 "AND DEPOSIPARIS.ssip_birim_pntr=BARKOD.bar_birimpntr " +
                 "AND DEPOSIPARIS.ssip_teslim_miktar < DEPOSIPARIS.ssip_miktar " +
                 "INNER JOIN STOKLAR AS STOK ON STOK.sto_kod = DEPOSIPARIS.ssip_stok_kod"
    },
    FiyatTbl :
     {
         query : "sfiyat_stokkod AS STOKKODU, " +
                 "sfiyat_listesirano AS LISTENO, " +
                 "ISNULL((SELECT sfl_aciklama FROM STOK_SATIS_FIYAT_LISTE_TANIMLARI WHERE sfl_sirano=FIYAT.sfiyat_listesirano),'') AS LISTEADI, " +
                 "sfiyat_deposirano AS DEPONO, " +
                 "sfiyat_odemeplan AS ODEMENO, " +
                 "CASE (SELECT sfl_kdvdahil FROM STOK_SATIS_FIYAT_LISTE_TANIMLARI WHERE sfl_sirano=FIYAT.sfiyat_listesirano), " +
                 "WHEN 0 THEN FIYAT.sfiyat_fiyati, " +
                 "ELSE FIYAT.sfiyat_fiyati / (((SELECT dbo.fn_VergiYuzde (STOK.sto_toptan_vergi)) / 100) + 1), " +
                 "END AS FIYAT, " +
                 "sfiyat_doviz AS DOVIZ, " +
                 "(SELECT dbo.fn_DovizSembolu(ISNULL(sfiyat_doviz,0))) AS DOVIZSEMBOL, " +
                 "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(sfiyat_doviz,0),2)) AS DOVIZKUR, " +
                 "sto_isim AS ADI, " +
                 "sto_altgrup_kod AS ALTGRUP, " +
                 "sto_uretici_kodu AS URETICI, " +
                 "sto_sektor_kodu AS SEKTOR, " +
                 "sto_reyon_kodu AS REYON, " +
                 "sto_marka_kodu AS MARKA, " +
                 "sfiyat_iskontokod AS ISKONTOKOD " +
                 "FROM STOK_SATIS_FIYAT_LISTELERI AS FIYAT " +
                 "INNER JOIN STOKLAR AS STOK ON " +
                 "FIYAT.sfiyat_stokkod = STOK.sto_kod " +
                 "INNER JOIN BARKOD_TANIMLARI AS BARKOD WITH (NOLOCK,INDEX=NDX_BARKOD_TANIMLARI_02) ON " +
                 "STOK.sto_kod = BARKOD.bar_stokkodu"
    },
    IsEmirleriTbl :
    {
        query : "SELECT is_Kod AS KODU, " +
                "is_Ismi AS ADI " +
                "FROM ISEMIRLERI"
    },
    IskontoTbl :
    {
        query : "SELECT isk_stok_kod AS STOK, " +
                "isk_cari_kod AS CARI, " +
                "isk_isim AS ISIM, " +
                "isk_uygulama_odeme_plani AS ODEMEPLANI, " +
                "isk_isk1_yuzde AS ISKONTO1, " +
                "isk_isk2_yuzde AS ISKONTO2, " +
                "isk_isk3_yuzde AS ISKONTO3, " +
                "isk_isk4_yuzde AS ISKONTO4, " +
                "isk_isk5_yuzde AS ISKONTO5 " +
                "FROM STOK_CARI_ISKONTO_TANIMLARI"                
    },
    KasaTbl :
    {
        query : "kas_kod AS KASAKODU, " +
                "kas_isim AS KASAISMI, " +
                "kas_tip AS KASATIP, " +
                "kas_doviz_cinsi AS KASADOVIZCINSI, " +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(kas_doviz_cinsi,0))) AS DOVIZSEMBOL, " +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(kas_doviz_cinsi,0),2)) AS DOVIZKUR " +
                "FROM KASALAR"
    },
    MarkaTbl :
    {
        query : "SELECT mrk_kod AS KODU, " +
                "mrk_ismi AS ADI " +
                "FROM STOK_MARKALARI"
    },
    OdemePlanTbl : 
    {
        query : "odp_no   AS ODEMENO, " +
                "odp_kodu AS ODEMEKODU, " +
                "odp_adi  AS ODEMEADI " +
                "FROM ODEME_PLANLARI"
    },
    PersonelTbl : 
    {
        query : "SELECT cari_per_kod AS PERSONELKODU, " +
                "cari_per_adi AS PERSONELADI, " +
                "cari_per_soyadi AS PERSONELSOYADI " +
                "FROM CARI_PERSONEL_TANIMLARI"
    },
    ProjelerTbl : 
    {
        query : "SELECT pro_kodu AS KODU, " +
                "pro_adi AS ADI, " +
                "pro_musterikodu AS MUSTERI " +
                "FROM PROJELER"
    },
    ReyonTbl :
    {
        query : "ryn_kod AS KODU, " +
                "ryn_ismi AS ADI " +
                "FROM STOK_REYONLARI"
    },
    SatisSartiTbl :
    {
        query : "SELECT sat_stok_kod AS STOKKOD, " +
                "sat_cari_kod AS CARIKOD, " +
                "sat_bitis_tarih AS BITIS, " +
                "sat_basla_tarih AS BASLANGIC, " +
                "sat_brut_fiyat AS FIYAT, " +
                "sat_det_isk_miktar1 AS ISKONTOM1, " +
                "sat_det_isk_miktar2 AS ISKONTOM2, " +
                "sat_det_isk_miktar3 AS ISKONTOM3, " +
                "sat_det_isk_miktar4 AS ISKONTOM4, " +
                "sat_det_isk_miktar5 AS ISKONTOM5, " +
                "sat_det_isk_miktar6 AS ISKONTOM6, " +
                "sat_det_isk_yuzde1 AS ISKONTOY1, " +
                "sat_det_isk_yuzde2 AS ISKONTOY2, " +
                "sat_det_isk_yuzde3 AS ISKONTOY3, " +
                "sat_det_isk_yuzde4 AS ISKONTOY4, " +
                "sat_det_isk_yuzde5 AS ISKONTOY5, " +
                "sat_det_isk_yuzde6 AS ISKONTOY6, " +
                "sat_odeme_plan AS ODEPLAN, " +
                "sat_doviz_cinsi AS DOVIZ, " +
                "sat_depo_no AS DEPO, " +
                "sat_fiyat_liste_no AS LISTENO, " +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(sat_doviz_cinsi,0))) AS DOVIZSEMBOL, " +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(sat_doviz_cinsi,0),2)) AS DOVIZKUR, " +
                "cari_sektor_kodu AS SEKTOR, " +
                "cari_bolge_kodu AS BOLGE, " +
                "cari_grup_kodu AS GRUP, " +
                "cari_temsilci_kodu AS TEMSILCI " +
                "FROM SATIS_SARTLARI AS SATIS " +
                "INNER JOIN CARI_HESAPLAR AS CARI ON " +
                "SATIS.sat_cari_kod = CARI.cari_kod"
    },
    SenetTbl :
    {
        query : "SELECT sck_refno AS REFNO, " +
                "sck_vade AS VADE, " +
                "sck_tutar AS TUTAR, " +
                "sck_odenen AS ODENEN, " +
                "sck_sonpoz AS SONPOZ, " +
                "sck_nerede_cari_kodu AS NEREDECARI, " +
                "sck_borclu AS CARIADI, " +
                "sck_tip AS TIP, " +
                "sck_doviz AS DOVIZ, " +
                "sck_doviz_kur AS DOVIZKUR, " +
                "CONVERT(nvarchar(50),sck_Guid) AS RECNO, " +
                "cari_sektor_kodu AS SEKTOR, " +
                "cari_bolge_kodu AS BOLGE, " +
                "cari_grup_kodu AS GRUP, " +
                "cari_temsilci_kodu AS TEMSILCI " +
                "FROM ODEME_EMIRLERI AS SENET " +
                "INNER JOIN CARI_HESAPLAR AS CARI ON " +
                "SENET.sck_borclu = CARI.cari_unvan1"
    },
    SiparisStokTbl :
    {
        query : "SELECT CONVERT(NVARCHAR(50),SIPARIS.sip_Guid) AS RECNO, " +
                "ISNULL(BARKOD.bar_kodu,'''') AS BARKOD, " +
                "SIPARIS.sip_stok_kod AS KODU, " +
                "ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod=SIPARIS.sip_stok_kod),'') AS ADI, " +
                "SIPARIS.sip_tarih AS TARIH, " +
                "SIPARIS.sip_teslim_tarih AS TESLIMTARIH, " +
                "SIPARIS.sip_tip AS TIP, " +
                "SIPARIS.sip_cins AS CINS, " +
                "SIPARIS.sip_evrakno_seri AS SERI, " +
                "SIPARIS.sip_evrakno_sira AS SIRA, " +
                "SIPARIS.sip_satirno AS SATIRNO, " +
                "SIPARIS.sip_belgeno AS BELGENO, " +
                "SIPARIS.sip_belge_tarih AS BELGETARIH, " +
                "SIPARIS.sip_satici_kod AS SATICIKOD, " +
                "SIPARIS.sip_musteri_kod AS CARI, " +
                "SIPARIS.sip_b_fiyat AS BFIYAT, " +
                "SIPARIS.sip_miktar AS SIPMIKTAR, " +
                "SIPARIS.sip_birim_pntr AS BIRIMPNTR, " +
                "SIPARIS.sip_teslim_miktar AS TESLIMMIKTAR, " +
                "SIPARIS.sip_tutar AS TUTAR, " +
                "SIPARIS.sip_iskonto_1 AS ISKONTO_1, " +
                "SIPARIS.sip_iskonto_2 AS ISKONTO_2, " +
                "SIPARIS.sip_iskonto_3 AS ISKONTO_3, " +
                "SIPARIS.sip_iskonto_4 AS ISKONTO_4, " +
                "SIPARIS.sip_iskonto_5 AS ISKONTO_5, " +
                "SIPARIS.sip_iskonto_6 AS ISKONTO_6, " +
                "SIPARIS.sip_vergi_pntr AS VERGIPNTR,  " +
                "SIPARIS.sip_vergi AS VERGI, " +
                "SIPARIS.sip_opno AS ODEMENO, " +
                "SIPARIS.sip_depono AS DEPO, " +
                "SIPARIS.sip_cari_sormerk AS CARISORUMLU, " +
                "SIPARIS.sip_stok_sormerk AS STOKSORUMLU, " +
                "SIPARIS.sip_doviz_cinsi AS DOVIZCINSI, " +
                "SIPARIS.sip_doviz_kuru AS DOVIZKURU, " +
                "SIPARIS.sip_alt_doviz_kuru AS ALTDOVIZKURU, " +
                "SIPARIS.sip_adresno AS ADRESNO, " +
                "SIPARIS.sip_iskonto1 AS ISKONTO1, " +
                "SIPARIS.sip_iskonto2 AS ISKONTO2, " +
                "SIPARIS.sip_iskonto3 AS ISKONTO3, " +
                "SIPARIS.sip_iskonto4 AS ISKONTO4, " +
                "SIPARIS.sip_iskonto5 AS ISKONTO5, " +
                "SIPARIS.sip_iskonto6 AS ISKONTO6, " +
                "SIPARIS.sip_isk1 AS ISK1, " +
                "SIPARIS.sip_isk2 AS ISK2, " +
                "SIPARIS.sip_isk3 AS ISK3, " +
                "SIPARIS.sip_isk4 AS ISK4, " +
                "SIPARIS.sip_isk5 AS ISK5, " +
                "SIPARIS.sip_isk6 AS ISK6, " +
                "(SELECT dbo.fn_beden_kirilimi (bar_bedenpntr,sto_beden_kodu)) AS BEDEN, " +
                "(SELECT dbo.fn_renk_kirilimi (bar_renkpntr,sto_renk_kodu)) AS RENK, " +
                "ISNULL(BEDENHAR.BdnHar_BedenNo,0) AS BEDENNO, " +
                "CAST(ISNULL(NULL,0) AS FLOAT) AS MIKTAR, " +
                "(SELECT dbo.fn_StokBirimi (SIPARIS.sip_stok_kod,SIPARIS.sip_birim_pntr)) AS BIRIM, " +
                "ISNULL(BARKOD.bar_bedenpntr,0) AS BEDENPNTR, " +
                "ISNULL(BARKOD.bar_renkpntr,0) AS RENKPNTR, " +
                "ISNULL((SELECT dbo.fn_StokBirimHesapla (SIPARIS.sip_stok_kod,BARKOD.bar_birimpntr,1,1)),1) AS KATSAYI, " +
                "(SELECT dbo.fn_VergiYuzde (SIPARIS.sip_vergi_pntr)) AS VERGIORAN, " +
                "ISNULL((SELECT dbo.fn_DepodakiMiktar (SIPARIS.sip_stok_kod,SIPARIS.sip_depono  ,CONVERT(VARCHAR(10),GETDATE(),112))),0) AS DEPOMIKTAR, " +
                "ISNULL(BARKOD.bar_birimpntr,0) AS BARBIRIMPNTR, " +
                "SIPARIS.sip_Exp_Imp_Kodu AS EXIMKODU, " +
                "SIPARIS.sip_parti_kodu AS PARTI, " +
                "SIPARIS.sip_lot_no AS LOT, " +
                "STOK.sto_detay_takip AS DETAYTAKIP, " +
                "STOK.sto_siparis_dursun as SIPARISDURSUN, " +
                "STOK.sto_malkabul_dursun as MALKABULDURSUN, " +
                "SIPARIS.sip_aciklama AS ACIKLAMA  " +
                "FROM SIPARISLER AS SIPARIS " + 
                "LEFT OUTER JOIN BEDEN_HAREKETLERI AS BEDENHAR ON " +
                "BEDENHAR.[BdnHar_Tipi] = 9 AND [BdnHar_Har_uid] = SIPARIS.sip_Guid " +
                "LEFT JOIN BARKOD_TANIMLARI AS BARKOD ON  " +
                "SIPARIS.sip_stok_kod=BARKOD.bar_stokkodu  " +
                "AND SIPARIS.sip_teslim_miktar < SIPARIS.sip_miktar " +
                "INNER JOIN STOKLAR AS STOK ON  " +
                "SIPARIS.sip_stok_kod=STOK.sto_kod"
    },
    SonAlisFiyatiTbl : 
    {
        query : "SELECT Hesaplama.sth_cari_kodu AS CARI, " +
                "Hesaplama.sth_stok_kod AS STOK, " +
                "CASE WHEN STOKHAREKETLERI.sth_tutar = 0 OR STOKHAREKETLERI.sth_miktar = 0 THEN, " +
                "ELSE STOKHAREKETLERI.sth_tutar / STOKHAREKETLERI.sth_miktar END AS SONFIYAT , " +
                "FROM (SELECT TOP (100) PERCENT MAX(sth_Guid) AS Recno, sth_cari_kodu, sth_stok_kod " +
                "FROM STOK_HAREKETLERI " +
                "WHERE (sth_evraktip = 3 OR sth_evraktip = 13) " +
                "GROUP BY sth_cari_kodu, sth_stok_kod " +
                "ORDER BY Recno DESC) AS Hesaplama INNER JOIN " +
                "STOK_HAREKETLERI AS STOKHAREKETLERI ON Hesaplama.Recno = STOKHAREKETLERI.sth_Guid"
    },
    SonSatisFiyatiTbl :
    {
        query : "SELECT Hesaplama.sth_cari_kodu AS CARI, Hesaplama.sth_stok_kod AS STOK, " +
                "CASE WHEN STOKHAREKETLERI.sth_tutar = 0 OR STOKHAREKETLERI.sth_miktar = 0 THEN 0, " +
                "ELSE STOKHAREKETLERI.sth_tutar / STOKHAREKETLERI.sth_miktar - (STOKHAREKETLERI.sth_tutar / STOKHAREKETLERI.sth_miktar), " +
                "* (STOKHAREKETLERI.sth_iskonto1 + STOKHAREKETLERI.sth_iskonto2 + STOKHAREKETLERI.sth_iskonto3 + STOKHAREKETLERI.sth_iskonto4 + STOKHAREKETLERI.sth_iskonto5, " +
                "+ STOKHAREKETLERI.sth_iskonto6) / 100 END AS SONFIYAT " +
                "FROM (SELECT TOP (100) PERCENT MAX(sth_Guid) AS Recno, sth_cari_kodu, sth_stok_kod " +  
                "FROM STOK_HAREKETLERI " +
                "WHERE (sth_evraktip = 4 OR sth_evraktip = 1) " +
                "GROUP BY sth_cari_kodu, sth_stok_kod " +
                "ORDER BY Recno DESC) AS Hesaplama INNER JOIN " +
                "STOK_HAREKETLERI AS STOKHAREKETLERI ON Hesaplama.Recno = STOKHAREKETLERI.sth_Guid INNER JOIN " +
                "CARI_HESAPLAR ON Hesaplama.sth_cari_kodu = CARI_HESAPLAR.cari_kod"
    },
    SorumlulukMrkzTbl : 
    {
        query : "SELECT som_kod AS SORUMLULUKKODU , " +
                "som_isim AS SORUMLULUKISMI " +
                "FROM SORUMLULUK_MERKEZLERI"
    },
    StokTbl :
    {
        query : "SELECT sto_kod AS KODU, " + 
                "sto_isim AS ADI, " +
                "sto_kisa_ismi AS KISAAD, " + 
                "sto_yabanci_isim AS YABANCIAD, " + 
                "sto_doviz_cinsi AS DOVIZCINSI, " + 
                "sto_perakende_vergi AS PERAKENDEVERGIPNTR, " + 
                "sto_toptan_vergi AS TOPTANVERGIPNTR, " + 
                "sto_altgrup_kod AS ALTGRUP, " + 
                "sto_anagrup_kod AS ANAGRUP, " + 
                "sto_uretici_kodu AS URETICI, " + 
                "sto_sektor_kodu AS SEKTOR, " + 
                "sto_reyon_kodu AS REYON, " + 
                "sto_marka_kodu AS MARKA, " +
                "sto_beden_kodu AS BEDENKODU, " + 
                "sto_renk_kodu AS RENKKODU, " + 
                "sto_pasif_fl AS AKTIFPASIF, " +
                "(SELECT dbo.fn_VergiYuzde (sto_perakende_vergi)) AS PERAKENDEVERGI, " +
                "(SELECT dbo.fn_VergiYuzde (sto_toptan_vergi)) AS TOPTANVERGI, " +
                "sto_detay_takip AS DETAYTAKIP, " +
                "ISNULL((SELECT dbo.fn_DepodakiMiktar (STOK.sto_kod,1,CONVERT(VARCHAR(10),GETDATE(),112))),0) AS DEPOMIKTAR, " + 
                "ISNULL((SELECT dbo.fn_DepodakiMiktar (STOK.sto_kod,2,CONVERT(VARCHAR(10),GETDATE(),112))),0) AS DEPOMIKTAR2, " + 
                "sto_siparis_dursun AS SIPARISDURSUN, " + 
                "sto_malkabul_dursun as MALKABULDURSUN, " + 
                "sto_otvtutar AS OTVTUTAR " + 
                "FROM STOKLAR AS STOK"
    },
    UreticiTbl :
    {
        query : "SELECT  urt_kod AS KODU, " +
                "urt_ismi AS ADI " +
                "FROM STOK_URETICILERI"
    },
    UretimStokTbl :
    {
        query : "SELECT CONVERT(NVARCHAR(50),URETIM.upl_Guid) AS RECNO, " +
                "ISNULL(BARKOD.bar_kodu,'') AS BARKOD, " +
                "URETIM.upl_kodu AS KODU, " +
                "ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod=URETIM.upl_kodu),'') AS ADI, " +
                "URETIM.upl_har_tarih AS TARIH, " +
                "URETIM.upl_satirno AS SATIRNO, " +
                "URETIM.upl_uretim_tuket AS TIP, " +
                "URETIM.upl_isemri AS ISEMRI, " +
                "URETIM.upl_miktar AS PMIKTAR, " +
                "CASE WHEN URETIM.upl_uretim_tuket = 1 THEN " +
                "ISNULL((SELECT SUM(sth_miktar) FROM STOK_HAREKETLERI WHERE sth_isemri_gider_kodu = URETIM.upl_isemri AND sth_stok_kod = URETIM.upl_kodu AND sth_tip = 0 AND sth_cins = 7 AND sth_evraktip = 12),0) " +
                "WHEN URETIM.upl_uretim_tuket = 0 THEN " +
                "ISNULL((SELECT SUM(sth_miktar) FROM STOK_HAREKETLERI WHERE sth_isemri_gider_kodu = URETIM.upl_isemri AND sth_stok_kod = URETIM.upl_kodu AND sth_tip = 1 AND sth_cins = 7 AND sth_evraktip = 0),0) " +
                "ELSE 0 END AS GMIKTAR, " +
                "URETIM.upl_depno AS DEPO, " +
                "CAST(ISNULL(NULL,0) AS FLOAT) AS MIKTAR, " +
                "ISNULL(BARKOD.bar_bedenpntr,0) AS BEDENPNTR, " +
                "ISNULL(BARKOD.bar_renkpntr,0) AS RENKPNTR, " +
                "1 AS KATSAYI, " +
                "URETIM.upl_parti_kod AS PARTI, " +
                "URETIM.upl_lotno AS LOT, " +
                "STOK.sto_detay_takip AS DETAYTAKIP " +
                "FROM URETIM_MALZEME_PLANLAMA AS URETIM " +
                "FULL OUTER JOIN BARKOD_TANIMLARI AS BARKOD ON " + 
                "URETIM.upl_kodu=BARKOD.bar_stokkodu " +
                "INNER JOIN STOKLAR AS STOK ON " +
                "URETIM.upl_kodu=STOK.sto_kod" 
    },
    VergiTbl : 
    {
        query : "SELECT dbo.fn_VergiYuzde ({1}) AS ORAN"
    }
    //#endregion "AKTARIM"
};


