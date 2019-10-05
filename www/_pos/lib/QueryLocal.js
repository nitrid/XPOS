var QueryLocal = 
{
    Stok : 
    {
        query : "SELECT * FROM STOK WHERE ((KODU = @KODU) OR (@KODU = ''))",
        param : ['KODU'],
        type : ['string|25']
    },
    //#region "LOCAL TABLOLAR OLUŞTURMA VE AKTARIM"
    AdresTbl : 
    {
        tag : "ADRES",
        query : "CREATE TABLE IF NOT EXISTS ADRES (" +
                "CARIKODU NVARCHAR (25)," + 
                "ADRESNO INTEGER," + 
                "CADDE NVARCHAR(50), " + 
                "SOKAK NVARCHAR(50), " +
                "ILCE NVARCHAR(15)," +
                "IL NVARCHAR(15), " +
                "SEKTOR NVARCHAR(25), " +
                "GRUBU NVARCHAR(25), " + 
                "BOLGE NVARCHAR (25), " +
                "TEMSILCI NVARCHAR (25))",
        insert : "INSERT INTO ADRES VALUES (?,?,?,?,?,?,?,?,?,?)"                
    },
    AlisSartiTbl : 
    {
        tag : "ALISSARTI",
        query : "CREATE TABLE IF NOT EXISTS ALISSARTI (" +
                "STOKKOD NVARCHAR (25)," + 
                "CARIKOD NVARCHAR (25)," + 
                "BITIS DATETIME, " + 
                "BASLANGIC DATETIME, " +
                "FIYAT FLOAT," +
                "ISKONTOM1 FLOAT, " +
                "ISKONTOM2 FLOAT, " +
                "ISKONTOM3 FLOAT, " + 
                "ISKONTOM4 FLOAT, " +
                "ISKONTOM5 FLOAT, " +
                "ISKONTOY1 FLOAT, " +
                "ISKONTOY2 FLOAT, " +
                "ISKONTOY3 FLOAT, " + 
                "ISKONTOY4 FLOAT, " +
                "ISKONTOY5 FLOAT, " +
                "ODEPLAN INTEGER, " +
                "DOVIZ TINYINT, " +
                "DEPO INTEGER, " +
                "LISTENO INTEGER, " +
                "DOVIZSEMBOL NVARCHAR (25), " +
                "DOVIZKUR FLOAT, " +
                "SEKTOR NVARCHAR (25), " +
                "BOLGE NVARCHAR (25), " +
                "GRUP NVARCHAR (25), " +
                "TEMSILCI NVARCHAR (25))",
        insert : "INSERT INTO ALISSARTI VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"                
    },
    AltGrupTbl : 
    {
        tag : "ALTGRUP",
        query : "CREATE TABLE IF NOT EXISTS ALTGRUP (" +
                "KODU NVARCHAR (25)," + 
                "ADI NVARCHAR (40))",
        insert : "INSERT INTO ALTGRUP VALUES (?,?)"                
    },
    AnaGrupTbl : 
    {
        tag : "ANAGRUP",
        query : "CREATE TABLE IF NOT EXISTS ANAGRUP (" +
                "KODU NVARCHAR (25)," + 
                "ADI NVARCHAR (40))",
        insert : "INSERT INTO ANAGRUP VALUES (?,?)"                
    },
    BankaTbl : 
    {
        tag : "BANKA",
        query : "CREATE TABLE IF NOT EXISTS BANKA (" +
                "BANKAKODU NVARCHAR (25)," + 
                "BANKAISMI NVARCHAR (40)," + 
                "BANKADOVIZCINSI TINYINT," + 
                "DOVIZSEMBOL NVARCHAR (25)," + 
                "DOVIZKUR FLOAT)",
        insert : "INSERT INTO BANKA VALUES (?,?,?,?,?)"                
    },
    BarkodTbl : 
    {
        tag : "BARKOD",
        query : "CREATE TABLE IF NOT EXISTS BARKOD (" +
                "KODU NVARCHAR (25)," + 
                "BARKOD NVARCHAR (25)," + 
                "CARPAN FLOAT, " + 
                "BIRIMPNTR TINYINT, " +
                "BEDENPNTR TINYINT," +
                "RENKPNTR TINYINT, " +
                "BARKODTIP TINYINT, " +
                "BEDEN NVARCHAR(25), " + 
                "RENK NVARCHAR (25), " +
                "PARTI NVARCHAR (25), " +
                "LOT INTEGER, " + 
                "KIRILIMMIKTAR FLOAT, " + 
                "KIRILIMMIKTAR2 FLOAT)",
        insert : "INSERT INTO BARKOD VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"                
    },
    BedenHarTbl : 
    {
        tag : "BEDENHAR",
        query : "CREATE TABLE IF NOT EXISTS BEDENHAR (" +
                "BdnHar_Guid INTEGER PRIMARY KEY AUTOINCREMENT," + 
                "BdnHar_create_user SMALLINT," + 
                "BdnHar_create_date DATETIME," + 
                "BdnHar_lastup_user SMALLINT," + 
                "BdnHar_lastup_date DATETIME," + 
                "BdnHar_special1 NVARCHAR(4)," + 
                "BdnHar_special2 NVARCHAR(4)," + 
                "BdnHar_special3 NVARCHAR(4)," + 
                "BdnHar_Tipi SMALLINT," + 
                "BdnHar_DRECid_RECno INTEGER," + 
                "BdnHar_BedenNo SMALLINT," + 
                "BdnHar_HarGor FLOAT," + 
                "BdnHar_KnsIsGor FLOAT," + 
                "BdnHar_KnsFat FLOAT," + 
                "BdnHar_TesMik FLOAT)",
        insert : "INSERT INTO BEDENHAR VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"                
    },
    CariTbl : 
    {
        tag : "CARI",
        query : "CREATE TABLE IF NOT EXISTS CARI (" +
                "KODU NVARCHAR(25)," + 
                "CKILIT INTEGER," + 
                "UNVAN1 NVARCHAR(50)," + 
                "UNVAN2 NVARCHAR(50)," + 
                "DOVIZCINSI TINYINT," + 
                "DOVIZCINSI1 TINYINT," + 
                "DOVIZCINSI2 TINYINT," + 
                "VDADI NVARCHAR(20)," + 
                "VDNO NVARCHAR(15)," + 
                "SATISFK INTEGER," + 
                "ISKONTOKOD NVARCHAR(4)," + 
                "SEKTOR NVARCHAR(25)," + 
                "BOLGE NVARCHAR(25)," + 
                "GRUP NVARCHAR(25)," + 
                "TEMSILCI NVARCHAR(25)," + 
                "DOVIZSEMBOL NVARCHAR(25)," + 
                "DOVIZSEMBOL1 NVARCHAR(25)," + 
                "DOVIZSEMBOL2 NVARCHAR(25)," + 
                "DOVIZKUR FLOAT," + 
                "DOVIZKUR1 FLOAT," + 
                "DOVIZKUR2 FLOAT," + 
                "ALTDOVIZKUR FLOAT," + 
                "RISK FLOAT," + 
                "ODEMEPLANI INTEGER," + 
                "BAKIYE FLOAT," + 
                "BELGENO NVARCHAR(20)," + 
                "BELGETARIH DATETIME," + 
                "VERGISIZ BIT," + 
                "EFATURA BIT)",
        insert : "INSERT INTO CARI VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"                
    },
    CariFoyTbl : 
    {
        tag : "CARIFOY",
        query : "CREATE TABLE IF NOT EXISTS CARIFOY (" +
                "KODU NVARCHAR(25)," + 
                "ADI NVARCHAR(50)," + 
                "SERI NVARCHAR(25)," + 
                "SIRA INTEGER," + 
                "TARIH DATETIME," + 
                "EVRAKTIP NVARCHAR(250)," + 
                "CINSI NVARCHAR(250)," + 
                "NI NVARCHAR(50)," + 
                "BA NVARCHAR(50)," + 
                "BORC FLOAT," + 
                "ALACAK FLOAT," + 
                "BAKIYE FLOAT," + 
                "TBAKIYE FLOAT," + 
                "GUNFARK INTEGER)",
        insert : "INSERT INTO CARIFOY VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)"                
    },
    CariHarTbl : 
    {
        tag : "CARIHAR",
        query : "CREATE TABLE IF NOT EXISTS CARIHAR (" +
                "cha_Guid INTEGER PRIMARY KEY AUTOINCREMENT," + 
                "cha_create_user SMALLINT," + 
                "cha_create_date DATETIME," + 
                "cha_lastup_user SMALLINT," + 
                "cha_lastup_date DATETIME," + 
                "cha_special1 NVARCHAR(4)," + 
                "cha_special2 NVARCHAR(4)," + 
                "cha_special3 NVARCHAR(4)," + 
                "cha_firmano INTEGER," + 
                "cha_subeno INTEGER," + 
                "cha_evrak_tip TINYINT," + 
                "cha_evrakno_seri NVARCHAR(20)," + 
                "cha_evrakno_sira INTEGER," + 
                "cha_satir_no INTEGER," + 
                "cha_tarihi DATETIME," + 
                "cha_tip TINYINT," + 
                "cha_cinsi TINYINT," + 
                "cha_normal_Iade TINYINT," + 
                "cha_tpoz TINYINT," + 
                "cha_ticaret_turu TINYINT," + 
                "cha_belge_no NVARCHAR(50)," + 
                "cha_belge_tarih DATETIME," + 
                "cha_aciklama NVARCHAR(40)," + 
                "cha_satici_kodu NVARCHAR(25)," + 
                "cha_projekodu NVARCHAR(25)," + 
                "cha_cari_cins TINYINT," + 
                "cha_kod NVARCHAR(25)," + 
                "cha_ciro_cari_kodu NVARCHAR(25)," + 
                "cha_d_cins TINYINT," + 
                "cha_d_kur FLOAT," + 
                "cha_altd_kur FLOAT," + 
                "cha_grupno TINYINT," + 
                "cha_srmrkkodu NVARCHAR(25)," + 
                "cha_kasa_hizmet TINYINT," + 
                "cha_kasa_hizkod NVARCHAR(25)," + 
                "cha_karsidcinsi TINYINT," + 
                "cha_karsid_kur FLOAT," + 
                "cha_karsidgrupno TINYINT," + 
                "cha_karsisrmrkkodu NVARCHAR(25)," + 
                "cha_miktari FLOAT," + 
                "cha_meblag FLOAT," + 
                "cha_aratoplam FLOAT," + 
                "cha_vade INTEGER," + 
                "cha_ft_iskonto1 FLOAT," + 
                "cha_ft_iskonto2 FLOAT," + 
                "cha_ft_iskonto3 FLOAT," + 
                "cha_ft_iskonto4 FLOAT," + 
                "cha_ft_iskonto5 FLOAT," + 
                "cha_ft_iskonto6 FLOAT," + 
                "cha_ft_masraf1 FLOAT," + 
                "cha_ft_masraf2 FLOAT," + 
                "cha_ft_masraf3 FLOAT," + 
                "cha_ft_masraf4 FLOAT," + 
                "cha_isk_mas1 TINYINT," + 
                "cha_isk_mas2 TINYINT," + 
                "cha_isk_mas3 TINYINT," + 
                "cha_isk_mas4 TINYINT," + 
                "cha_isk_mas5 TINYINT," + 
                "cha_isk_mas6 TINYINT," + 
                "cha_isk_mas7 TINYINT," + 
                "cha_isk_mas8 TINYINT," + 
                "cha_isk_mas9 TINYINT," + 
                "cha_isk_mas10 TINYINT," + 
                "cha_vergipntr TINYINT," + 
                "cha_vergi1 FLOAT," + 
                "cha_vergi2 FLOAT," + 
                "cha_vergi3 FLOAT," + 
                "cha_vergi4 FLOAT," + 
                "cha_vergi5 FLOAT," + 
                "cha_vergi6 FLOAT," + 
                "cha_vergi7 FLOAT," + 
                "cha_vergi8 FLOAT," + 
                "cha_vergi9 FLOAT," + 
                "cha_vergi10 FLOAT," + 
                "cha_vergisiz_fl BIT," + 
                "cha_otvtutari FLOAT," + 
                "cha_otvvergisiz_fl BIT," + 
                "cha_oiv_pntr TINYINT," + 
                "cha_oivtutari FLOAT," + 
                "cha_oiv_vergi FLOAT," + 
                "cha_oivergisiz_fl BIT," + 
                "cha_trefno NVARCHAR(25)," + 
                "cha_sntck_poz TINYINT," + 
                "cha_reftarihi DATETIME," + 
                "cha_e_islem_turu TINYINT," + 
                "cha_fatura_belge_turu TINYINT," + 
                "cha_diger_belge_adi NVARCHAR(50)," + 
                "cha_adres_no INTEGER)",
        insert : "INSERT INTO CARIHAR VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"                
    },
    DepoTbl : 
    {
        tag : "DEPO",
        query : "CREATE TABLE IF NOT EXISTS DEPO (" +
                "DEPONO INTEGER," + 
                "DEPOADI NVARCHAR(50)," + 
                "DEPOCADDE NVARCHAR(50)," + 
                "DEPOSOKAK NVARCHAR(50)," + 
                "DEPOILCE NVARCHAR(15)," + 
                "DEPOIL NVARCHAR(15))",
        insert : "INSERT INTO DEPO VALUES (?,?,?,?,?,?)"                
    },
    DepoSiparisTbl : 
    {
        tag : "DEPOSIPARIS",
        query : "CREATE TABLE IF NOT EXISTS DEPOSIPARIS (" +
                "ssip_Guid INTEGER PRIMARY KEY AUTOINCREMENT," + 
                "ssip_create_user SMALLINT," + 
                "ssip_create_date DATETIME," + 
                "ssip_lastup_user SMALLINT," + 
                "ssip_lastup_date DATETIME," + 
                "ssip_special1 NVARCHAR(4)," + 
                "ssip_special2 NVARCHAR(4)," + 
                "ssip_special3 NVARCHAR(4)," + 
                "ssip_firmano INTEGER," + 
                "ssip_subeno INTEGER," + 
                "ssip_tarih DATETIME," + 
                "ssip_teslim_tarih DATETIME," + 
                "ssip_evrakno_seri NVARCHAR(20)," + 
                "ssip_evrakno_sira INTEGER," + 
                "ssip_satirno INTEGER," + 
                "ssip_belgeno NVARCHAR(50)," + 
                "ssip_belge_tarih DATETIME," + 
                "ssip_stok_kod NVARCHAR(25)," + 
                "ssip_miktar FLOAT," + 
                "ssip_b_fiyat FLOAT," + 
                "ssip_tutar FLOAT," + 
                "ssip_teslim_miktar FLOAT," + 
                "ssip_aciklama NVARCHAR(50)," + 
                "ssip_girdepo INTEGER," + 
                "ssip_cikdepo INTEGER," + 
                "ssip_kapat_fl BIT," + 
                "ssip_birim_pntr TINYINT," + 
                "ssip_fiyat_liste_no INTEGER," + 
                "ssip_stal_uid INTEGER," + 
                "ssip_paket_kod  NVARCHAR(25))",
        insert : "INSERT INTO DEPOSIPARIS VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"                
    },
    DepoSiparisStokTbl : 
    {
        tag : "DEPOSIPARISSTOK",
        query : "CREATE TABLE IF NOT EXISTS DEPOSIPARISSTOK (" +
                "GUID NVARCHAR(50)," + 
                "KODU NVARCHAR(25)," + 
                "TARIH DATETIME," + 
                "TESLIMTARIH DATETIME," + 
                "SERI NVARCHAR(20)," + 
                "SIRA INTEGER," + 
                "SATIRNO INTEGER," + 
                "BELGENO NVARCHAR(50)," + 
                "BFIYAT FLOAT," + 
                "SIPMIKTAR FLOAT," + 
                "BIRIMPNTR TINYINT," + 
                "TESLIMMIKTAR FLOAT," + 
                "TUTAR FLOAT," + 
                "GDEPO INTEGER," + 
                "CDEPO INTEGER," + 
                "BMIKTAR FLOAT," + 
                "MIKTAR FLOAT," + 
                "BIRIM NVARCHAR(20)," + 
                "DEPOMIKTAR FLOAT," + 
                "DETAYTAKIP INTEGER)",
        insert : "INSERT INTO DEPOSIPARISSTOK VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"                
    },
    EtiketBasTbl : 
    {
        tag : "ETIKETBAS",
        query : "CREATE TABLE IF NOT EXISTS ETIKETBAS (" +
                "Etkb_Guid INTEGER PRIMARY KEY AUTOINCREMENT," + 
                "Etkb_create_user SMALLINT," + 
                "Etkb_create_date DATETIME," + 
                "Etkb_lastup_user SMALLINT," + 
                "Etkb_lastup_date DATETIME," + 
                "Etkb_special1 NVARCHAR(4)," + 
                "Etkb_special2 NVARCHAR(4)," + 
                "Etkb_special3 NVARCHAR(4)," + 
                "Etkb_evrakno_seri NVARCHAR(20)," + 
                "Etkb_evrakno_sira INTEGER," + 
                "Etkb_evrak_tarihi DATETIME," + 
                "Etkb_aciklama NVARCHAR(40)," + 
                "Etkb_satirno INTEGER," + 
                "Etkb_belge_no NVARCHAR(50)," + 
                "Etkb_belge_tarih DATETIME," + 
                "Etkb_EtiketTip TINYINT," + 
                "Etkb_BasimTipi TINYINT," + 
                "Etkb_BasimAdet SMALLINT," + 
                "Etkb_DepoNo INTEGER," + 
                "Etkb_StokKodu NVARCHAR(25)," + 
                "Etkb_RenkNo INTEGER," + 
                "Etkb_BedenNo INTEGER," + 
                "Etkb_Barkodu NVARCHAR(50)," + 
                "Etkb_BasilacakMiktar SMALLINT)",
        insert : "INSERT INTO ETIKETBAS VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"                
    },
    EvrakAciklamaTbl : 
    {
        tag : "EVRAKACIKLAMA",
        query : "CREATE TABLE IF NOT EXISTS EVRAKACIKLAMA (" +
                "egk_Guid INTEGER PRIMARY KEY AUTOINCREMENT," + 
                "egk_create_user SMALLINT," + 
                "egk_create_date DATETIME," + 
                "egk_lastup_user SMALLINT," + 
                "egk_lastup_date DATETIME," + 
                "egk_special1 NVARCHAR(4)," + 
                "egk_special2 NVARCHAR(4)," + 
                "egk_special3 NVARCHAR(4)," + 
                "egk_dosyano NVARCHAR(20)," + 
                "egk_hareket_tip INTEGER," + 
                "egk_evr_tip DATETIME," + 
                "egk_evr_seri NVARCHAR(40)," + 
                "egk_evr_sira INTEGER," + 
                "egk_evr_ustkod NVARCHAR(50)," + 
                "egk_evr_doksayisi DATETIME," + 
                "egk_evracik1 TINYINT," + 
                "egk_evracik2 TINYINT," + 
                "egk_evracik3 SMALLINT," + 
                "egk_evracik4 INTEGER," + 
                "egk_evracik5 NVARCHAR(25)," + 
                "egk_evracik6 INTEGER," + 
                "egk_evracik7 INTEGER," + 
                "egk_evracik8 NVARCHAR(50)," + 
                "egk_evracik9 NVARCHAR(50)," + 
                "egk_evracik10 NVARCHAR(50)," + 
                "egk_sipgenkarorani NVARCHAR(50)," + 
                "egk_kargokodu NVARCHAR(50)," + 
                "egk_kargono NVARCHAR(50)," + 
                "egk_tesaltarihi NVARCHAR(50)," + 
                "egk_tesalkisi SMALLINT)",
        insert : "INSERT INTO EVRAKACIKLAMA VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"                
    },
    FiyatTbl:
    {
        tag : "FIYAT",
        query : "CREATE TABLE IF NOT EXISTS FIYAT (" +
                 "STOKKODU NVARCHAR(25)," +
                 "LISTENO iNnt," +
                 "LISTEADI nvarchar (25)," +
                 "DEPONO int," +
                 "ODEMENO int," +
                 "FIYAT float," +
                 "DOVIZ tinyint," +
                 "DOVIZSEMBOL nvarchar (25)," +
                 "DOVIZKUR float," +
                 "STOKADI nvarchar (50)," +
                 "ANAGRUP nvarchar (25)," +
                 "ALTGRUP nvarchar (25)," +
                 "URETICI nvarchar (25)," +
                 "SEKTOR nvarchar (25)," +
                 "REYON nvarchar (25)," +
                 "MARKA nvarchar (25)," +
                 "ISKONTOKOD nvarchar (4))",               
        insert : "INSERT INTO FIYAT VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"               
    },
    IsEmirleriTbl:
    {
         tag : "ISEMIRLERI",
         query : "CREATE TABLE IF NOT EXISTS ISEMIRLERI (" +
                "KODU nvarchar(25)," +
                "ADI nvarchar(80))", 
         insert : "INSERT INTO ISEMIRLERI VALUES (?,?)"
    },
    IskontoTbl:
    {
         tag : "ISKONTO",
         query : "CREATE TABLE IF NOT EXISTS ISKONTO (" +
                "STOK nvarchar (4)," +
                "CARI nvarchar (4)," +
                "ISIM nvarchar (50)," +
                "ODEMEPLANI int," +
                "ISKONTO1 float," +
                "ISKONTO2 float," +
                "ISKONTO3 float," +
                "ISKONTO4 float," +
                "ISKONTO5 float)",
         insert : "INSERT INTO ISKONTO VALUES(?,?,?,?,?,?,?,?,?)"
    },
    KasaTbl : 
    {
         tag : "KASA",
         query : "CREATE TABLE IF NOT EXISTS KASA (" +
                "KASAKODU nvarchar(25)," +
                "KASAISMI nvarchar(40)," +
                "KASATIP tinyint," +
                "KASADOVIZCINSI tinyint," +
                "DOVIZSEMBOL nvarchar (25)," +
                "DOVIZKUR float)",
        insert : "INSERT INTO KASA VALUES(?,?,?,?,?,?)"   
    },  
    KonharTbl : 
    {
        tag : "KONHAR",
        query : "CREATE TABLE IF NOT EXISTS KONHAR (" +
                "kon_RECid_DBCno smallint," +
                "kon_RECid_RECno int," +
                "kon_SpecRecno int," +
                "kon_iptal bit," +
                "kon_fileid smallint," +
                "kon_hidden bit," +
                "kon_kilitli bit," +
                "kon_degisti bit," +
                "kon_checksum int," +
                "kon_create_user smallint," +
                "kon_create_date datetime," +
                "kon_lastup_user smallint," +
                "kon_lastup_date datetime," +
                "kon_special1 nvarchar(4)," +
                "kon_special2 nvarchar(4)," +
                "kon_special3 nvarchar(4)," +
                "kon_firmano int," +
                "kon_subeno int," +
                "kon_tarih datetime," +
                "kon_tip tinyint," +
                "kon_normal_iade tinyint," +
                "kon_evrakno_seri nvarchar(4)," +
                "kon_evrakno_sira int," +
                "kon_satirno int," +
                "kon_belge_no nvarchar(15)," +
                "kon_belge_tarih datetime," +
                "kon_stok_kod nvarchar(25)," +
                "kon_cari_kod nvarchar(25)," +
                "kon_satici_kod nvarchar(25)," +
                "kon_miktar float," +
                "kon_faturalanan float," +
                "kon_aciklama nvarchar(50)," +
                "kon_giris_depo_no int," +
                "kon_cikis_depo_no int," +
                "kon_malkabul_tarih datetime," +
                "kon_sip_RECid_DBCno smallint," +
                "kon_sip_RECid_RECno int," +
                "kon_islemgoren float," +
                "kon_karkonRecId_DBCn smallint," +
                "kon_karkonRecId_RECn int," +
                "kon_netagirlik float," +
                "kon_brutagirlik float," +
                "kon_rehinmiktari float," +
                "kon_rehinfiyati float," +
                "kon_miktar2 float," +
                "kon_islemgoren2 float," +
                "kon_sandikmiktari float," +
                "kon_sandikfiyati float," +
                "kon_sevk_adresno smallint," +
                "kon_cari_srm_merkez nvarchar(25)," +
                "kon_stok_srm_merkez nvarchar(25)," +
                "kons_parti_kodu nvarchar(25)," +
                "kons_lot_no int," +
                "kons_projekodu nvarchar(25)," +
                "kons_har_doviz_cinsi tinyint," +
                "kons_har_doviz_kuru float," +
                "kons_alt_doviz_kuru float," +
                "kons_stok_doviz_cinsi tinyint," +
                "kons_stok_doviz_kuru float," +
                "kons_odeme_op int," +
                "kons_birim_pntr tinyint," +
                "kons_tutar float," +
                "kons_isk_mas1 tinyint," +
                "kons_isk_mas2 tinyint," +
                "kons_isk_mas3 tinyint," +
                "kons_isk_mas4 tinyint," +
                "kons_isk_mas5 tinyint," +
                "kons_isk_mas6 tinyint," +
                "kons_isk_mas7 tinyint," +
                "kons_isk_mas8 tinyint," +
                "kons_isk_mas9 tinyint," +
                "kons_isk_mas10 tinyint," +
                "kons_sat_iskmas1 bit," +
                "kons_sat_iskmas2 bit," +
                "kons_sat_iskmas3 bit," +
                "kons_sat_iskmas4 bit," +
                "kons_sat_iskmas5 bit," +
                "kons_sat_iskmas6 bit," +
                "kons_sat_iskmas7 bit," +
                "kons_sat_iskmas8 bit," +
                "kons_sat_iskmas9 bit," +
                "kons_sat_iskmas10 bit," +
                "kons_iskonto1 float," +
                "kons_iskonto2 float," +
                "kons_iskonto3 float," +
                "kons_iskonto4 float," +
                "kons_iskonto5 float," +
                "kons_iskonto6 float," +
                "kons_masraf1 float," +
                "kons_masraf2 float," +
                "kons_masraf3 float," +
                "kons_masraf4 float," +
                "kons_vergi_pntr tinyint," +
                "kons_vergi float," +
                "kons_masraf_vergi_pntr tinyint," +
                "kons_masraf_vergi float," +
                "kons_vergisiz_fl bit," +
                "kons_otv_pntr tinyint," +
                "kons_otv_vergi float," +
                "kons_otvtutari float," +
                "kons_otvvergisiz_fl bit," +
                "kons_oiv_pntr tinyint," +
                "kons_oiv_vergi float," +
                "kons_oivvergisiz_fl bit," +
                "kons_fiyat_liste_no int," +
                "kon_cins tinyint," +
                "kon_evraktip tinyint," +
                "kon_gider_kodu nvarchar(25)," +
                "kons_oivtutari float," +
                "kon_irs_RECid_DBCno smallint," +
                "kon_irs_RECid_RECno int," +
                "kon_yetkili_recid_dbcno smallint," +
                "kon_yetkili_recid_recno int," +
                "kon_nakliyedeposu int," +
                "kon_nakliyedurumu tinyint)", 
        insert : "INSERT INTO KONHAR VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"               
    },
    MarkaTbl : 
    {
        tag : "MARKA", 
        query : "CREATE TABLE IF NOT EXISTS MARKA (" +
                "KODU nvarchar (25)," +
                "ADI nvarchar (40))",
        insert : "INSERT INTO MARKA VALUES (?,?)"
    },
    OdemePlanTbl :
    {
        tag: "ODEMEPLAN",
        query: "CREATE TABLE IF NOT EXISTS ODEMEPLAN (" +
                "ODEMENO int," +
                "ODEMEKODU nvarchar(25)," +
                "ODEMEADI nvarchar(50))",
        insert : "INSERT INTO ODEMEPLAN VALUES (?,?,?)" 
    },
    PersonelTbl : 
    {
        tag : "PERSONEL",
        query : "CREATE TABLE IF NOT EXISTS PERSONEL (" +
                "PERSONELKODU nvarchar(25)," +
                "PERSONELADI nvarchar(50)," +
                "PERSONELSOYADI nvarchar(50))",
        insert : "INSERT INTO PERSONEL VALUES (?,?,?)"
    },
    ProjelerTbl : 
    {
        tag : "PROJELER",
        query : "CREATE TABLE IF NOT EXISTS PROJELER (" +
                "KODU nvarchar(25)," +
                "ADI nvarchar(40)," +
                "MUSTERI nvarchar(25))",
        insert : "INSERT INTO PROJELER VALUES (?,?,?)" 
    },
    ReyonTbl : 
    {
        tag : "REYON",
        query : "CREATE TABLE IF NOT EXISTS REYON (" +
                "KODU nvarchar (25)," +
                "ADI nvarchar (40))",
        insert : "INSERT INTO REYON VALUES (?,?)"
    },    
    SatisSartiTbl : 
    {
        tag : "SATISSARTI",
        query : "CREATE TABLE IF NOT EXISTS SATISSARTI (" +
                "STOKKOD nvarchar(25)," +
                "CARIKOD nvarchar(25)," +
                "BITIS datetime," +
                "BASLANGIC datetime," +
                "FIYAT float," +
                "ISKONTOM1 float," +
                "ISKONTOM2 float," +
                "ISKONTOM3 float," +
                "ISKONTOM4 float," +
                "ISKONTOM5 float," +
                "ISKONTOM6 float," +
                "ISKONTOY1 float," +
                "ISKONTOY2 float," +
                "ISKONTOY3 float," +
                "ISKONTOY4 float," +
                "ISKONTOY5 float," +
                "ISKONTOY6 float," +
                "ODEPLAN int," +
                "DOVIZ tinyint," +
                "DEPO int," +
                "LISTENO int," +
                "DOVIZSEMBOL nvarchar (25)," +
                "DOVIZKUR float," +
                "SEKTOR nvarchar (25)," +
                "BOLGE nvarchar (25)," +
                "GRUP nvarchar (25)," +
                "TEMSILCI nvarchar (25))",
        insert : "INSERT INTO SATISSARTI VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    },
    SayimTbl : 
    {
        tag : "SAYIM",
        query : "CREATE TABLE IF NOT EXISTS SAYIM (" +
                "sym_RECid_DBCno smallint," +
                "sym_RECid_RECno int," +
                "sym_SpecRECno int," +
                "sym_iptal bit," +
                "sym_fileid smallint," +
                "sym_hidden bit," +
                "sym_kilitli bit," +
                "sym_degisti bit," +
                "sym_checksum int," +
                "sym_create_user smallint," +
                "sym_create_date datetime," +
                "sym_lastup_user smallint," +
                "sym_lastup_date datetime," +
                "sym_special1 nvarchar (4)," +
                "sym_special2 nvarchar (4)," +
                "sym_special3 nvarchar (4)," +
                "sym_tarihi datetime," +
                "sym_depono int," +
                "sym_evrakno int," +
                "sym_satirno int," +
                "sym_Stokkodu nvarchar (25)," +
                "sym_reyonkodu nvarchar (4)," +
                "sym_koridorkodu nvarchar (4)," +
                "sym_rafkodu nvarchar (4)," +
                "sym_miktar1 float," +
                "sym_miktar2 float," +
                "sym_miktar3 float," +
                "sym_miktar4 float," +
                "sym_miktar5 float," +
                "sym_birim_pntr tinyint," +
                "sym_barkod nvarchar (25)," +
                "sym_renkno int," +
                "sym_bedenno int," +
                "sym_parti_kodu nvarchar (25)," +
                "sym_lot_no int," +
                "sym_serino nvarchar (25))", 
        insert : "INSERT INTO SAYIM VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    },
    SenetTbl : 
    {
        tag : "SENET",
        query : "CREATE TABLE IF NOT EXISTS SENET (" +
                "REFNO nvarchar(50)," +
                "VADE datetime," +
                "TUTAR float," +
                "ODENEN float," +
                "SONPOZ tinyint," +
                "NEREDECARI nvarchar(25)," +
                "CARIADI nvarchar(50)," +
                "TIP tinyint," +
                "DOVIZ tinyint," +
                "DOVIZKUR float," +
                "RECNO int," +
                "SEKTOR nvarchar (25)," +
                "BOLGE nvarchar (25)," +
                "GRUP nvarchar (25)," +
                "TEMSILCI nvarchar (25))",
        insert : "INSERT INTO SENET VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    },
    SenetCekTbl : 
    {
        tag : "SENETCEK",
        query : "CREATE TABLE IF NOT EXISTS SENETCEK (" +
                "sck_RECid_DBCno smallint," +
                "sck_RECid_RECno int," +
                "sck_SpecRECno int," +
                "sck_iptal bit," +
                "sck_fileid smallint," +
                "sck_hidden bit," +
                "sck_kilitli bit," +
                "sck_degisti bit," +
                "sck_checksum int," +
                "sck_create_user smallint," +
                "sck_create_date datetime," +
                "sck_lastup_user smallint," +
                "sck_lastup_date datetime," +
                "sck_special1 nvarchar (4)," +
                "sck_special2 nvarchar (4)," +
                "sck_special3 nvarchar (4)," +
                "sck_firmano int," +
                "sck_subeno int," +
                "sck_tip tinyint," +
                "sck_refno nvarchar (25)," +
                "sck_bankano nvarchar (25)," +
                "sck_borclu nvarchar (30)," +
                "sck_vdaire_no nvarchar (40)," +
                "sck_vade datetime," +
                "sck_tutar float," +
                "sck_doviz tinyint," +
                "sck_odenen float," +
                "sck_degerleme_islendi tinyint," +
                "sck_banka_adres1 nvarchar (50)," +
                "sck_sube_adres2 nvarchar (50)," +
                "sck_borclu_tel nvarchar (15)," +
                "sck_hesapno_sehir nvarchar (20)," +
                "sck_no nvarchar (25)," +
                "sck_duzen_tarih datetime," +
                "sck_sahip_cari_cins tinyint," +
                "sck_sahip_cari_kodu nvarchar (25)," +
                "sck_sahip_cari_grupno tinyint," +
                "sck_nerede_cari_cins tinyint," +
                "sck_nerede_cari_kodu nvarchar (25)," +
                "sck_nerede_cari_grupno tinyint," +
                "sck_ilk_hareket_tarihi datetime," +
                "sck_ilk_evrak_seri nvarchar (4)," +
                "sck_ilk_evrak_sira_no int," +
                "sck_ilk_evrak_satir_no int," +
                "sck_son_hareket_tarihi datetime," +
                "sck_doviz_kur float," +
                "sck_sonpoz tinyint," +
                "sck_imza tinyint," +
                "sck_srmmrk nvarchar (25)," +
                "sck_kesideyeri nvarchar (14)," +
                "Sck_TCMB_Banka_kodu nvarchar (4)," +
                "Sck_TCMB_Sube_kodu nvarchar (8)," +
                "Sck_TCMB_il_kodu nvarchar (3)," +
                "SckTasra_fl bit," +
                "sck_projekodu nvarchar (25)," +
                "sck_masraf1 float," +
                "sck_masraf1_isleme tinyint," +
                "sck_masraf2 float," +
                "sck_masraf2_isleme tinyint," +
                "sck_odul_katkisi_tutari float," +
                "sck_servis_komisyon_tutari float," +
                "sck_erken_odeme_faiz_tutari float," +
                "sck_odul_katkisi_tutari_islendi_fl bit," +
                "sck_servis_komisyon_tutari_islendi_fl bit," +
                "sck_erken_odeme_faiz_tutari_islendi_fl bit," +
                "sck_kredi_karti_tipi tinyint," +
                "sck_taksit_sayisi smallint," +
                "sck_kacinci_taksit smallint," +
                "sck_uye_isyeri_no nvarchar (25)," +
                "sck_kredi_karti_no nvarchar (16)," +
                "sck_provizyon_kodu nvarchar (10))",
        insert : "INSERT INTO SENETCEK VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    },
    SeriNoTbl : 
    {
        tag : "SERINO",
        query : "CREATE TABLE IF NOT EXISTS SERINO (" +
                "chz_RECid_DBCno smallint," +
                "chz_RECid_RECno int," +
                "chz_Spec_Rec_no int," +
                "chz_iptal bit," +
                "chz_fileid smallint," +
                "chz_hidden bit," +
                "chz_kilitli bit," +
                "chz_degisti bit," +
                "chz_checksum int," +
                "chz_create_user smallint," +
                "chz_create_date datetime," +
                "chz_lastup_user smallint," +
                "chz_lastup_date datetime," +
                "chz_special1 nvarchar(4)," +
                "chz_special2 nvarchar(4)," +
                "chz_special3 nvarchar(4)," +
                "chz_serino nvarchar(25)," +
                "chz_stok_kodu nvarchar(25)," +
                "chz_grup_kodu nvarchar(25)," +
                "chz_Tuktckodu nvarchar(25)," +
                "chz_GrnBasTarihi datetime," +
                "chz_GrnBitTarihi datetime," +
                "chz_aciklama1 nvarchar(80)," +
                "chz_aciklama2 nvarchar(80)," +
                "chz_aciklama3 nvarchar(80)," +
                "chz_al_tarih datetime," +
                "chz_al_evr_seri nvarchar(6)," +
                "chz_al_evr_sira int," +
                "chz_al_cari_kodu nvarchar(25)," +
                "chz_st_tarih datetime," +
                "chz_st_evr_seri nvarchar(6)," +
                "chz_st_evr_sira int," +
                "chz_st_cari_kodu nvarchar(25)," +
                "chz_al_fiati_ana float," +
                "chz_al_fiati_alt float," +
                "chz_al_fiati_orj float," +
                "chz_st_fiati_ana float," +
                "chz_st_fiati_alt float," +
                "chz_st_fiati_orj float," +
                "chz_parca_garantisi bit," +
                "chz_parca_serino nvarchar(25)," +
                "chz_parca_garanti_baslangic datetime," +
                "chz_parca_garanti_bitis datetime)",
        insert : "INSERT INTO SERINO VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    },
    SeriNoHarTbl :
    {
        tag : "SERINOHAR",
        query : "CREATE TABLE IF NOT EXISTS SERINOHAR (" +
                "ChHar_RECid_DBCno smallint," +
                "ChHar_RECid_RECno int," +
                "ChHar_Spec_Rec_no int," +
                "ChHar_iptal bit," +
                "ChHar_fileid smallint," +
                "ChHar_hidden bit," +
                "ChHar_kilitli bit," +
                "ChHar_degisti bit," +
                "ChHar_checksum int," +
                "ChHar_create_user smallint," +
                "ChHar_create_date datetimeİ" +
                "ChHar_lastup_user smallint," +
                "ChHar_lastup_date datetime," +
                "ChHar_special1 nvarchar(4)," +
                "ChHar_special2 nvarchar(4)," +
                "ChHar_special3 nvarchar(4)," +
                "ChHar_SeriNo nvarchar(25)," +
                "ChHar_StokKodu nvarchar(25)," +
                "ChHar_master_tablo tinyint," +
                "ChHar_master_dbcno smallint," +
                "ChHar_master_recno int)",
        insert : "INSERT INTO SERINOHAR VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    },
    SiparisTbL : 
    {
        tag : "SIPARIS",
        query : "CREATE TABLE IF NOT EXISTS SIPARIS (" +
                "sip_RECid_DBCno smallint," +
                "sip_RECid_RECno int," +
                "sip_SpecRECno int," +
                "sip_iptal bit," +
                "sip_fileid smallint," +
                "sip_hidden bit," +
                "sip_kilitli bit," +
                "sip_degisti bit," +
                "sip_checksum int," +
                "sip_create_user smallint," +
                "sip_create_date datetime," +
                "sip_lastup_user smallint," +
                "sip_lastup_date datetime," +
                "sip_special1 nvarchar (4)," +
                "sip_special2 nvarchar (4)," +
                "sip_special3 nvarchar (4)," +
                "sip_firmano int," +
                "sip_subeno int," +
                "sip_tarih datetime," +
                "sip_teslim_tarih datetime," +
                "sip_tip tinyint," +
                "sip_cins tinyint," +
                "sip_evrakno_seri nvarchar (4)," +
                "sip_evrakno_sira int," +
                "sip_satirno int," +
                "sip_belgeno nvarchar (15)," +
                "sip_belge_tarih datetime," +
                "sip_satici_kod nvarchar (25)," +
                "sip_musteri_kod nvarchar (25)," +
                "sip_stok_kod nvarchar (25)," +
                "sip_b_fiyat float," +
                "sip_miktar float," +
                "sip_birim_pntr tinyint," +
                "sip_teslim_miktar float," +
                "sip_tutar float," +
                "sip_iskonto_1 float," +
                "sip_iskonto_2 float," +
                "sip_iskonto_3 float," +
                "sip_iskonto_4 float," +
                "sip_iskonto_5 float," +
                "sip_iskonto_6 float," +
                "sip_masraf_1 float," +
                "sip_masraf_2 float," +
                "sip_masraf_3 float," +
                "sip_masraf_4 float," +
                "sip_vergi_pntr tinyint," +
                "sip_vergi float," +
                "sip_masvergi_pntr tinyint," +
                "sip_masvergi float," +
                "sip_opno int," +
                "sip_aciklama nvarchar (40)," +
                "sip_aciklama2 nvarchar (40)," +
                "sip_depono int," +
                "sip_OnaylayanKulNo smallint," +
                "sip_vergisiz_fl bit," +
                "sip_kapat_fl bit," +
                "sip_promosyon_fl bit," +
                "sip_cari_sormerk nvarchar (25)," +
                "sip_stok_sormerk nvarchar (25)," +
                "sip_cari_grupno tinyint," +
                "sip_doviz_cinsi tinyint," +
                "sip_doviz_kuru float," +
                "sip_alt_doviz_kuru float," +
                "sip_adresno int," +
                "sip_teslimturu nvarchar (4)," +
                "sip_cagrilabilir_fl bit," +
                "sip_prosiprecDbId smallint," +
                "sip_prosiprecrecI int," +
                "sip_iskonto1 tinyint," +
                "sip_iskonto2 tinyint," +
                "sip_iskonto3 tinyint," +
                "sip_iskonto4 tinyint," +
                "sip_iskonto5 tinyint," +
                "sip_iskonto6 tinyint," +
                "sip_masraf1 tinyint," +
                "sip_masraf2 tinyint," +
                "sip_masraf3 tinyint," +
                "sip_masraf4 tinyint," +
                "sip_isk1 bit," +
                "sip_isk2 bit," +
                "sip_isk3 bit," +
                "sip_isk4 bit," +
                "sip_isk5 bit," +
                "sip_isk6 bit," +
                "sip_mas1 bit," +
                "sip_mas2 bit," +
                "sip_mas3 bit," +
                "sip_mas4 bit," +
                "sip_Exp_Imp_Kodu nvarchar (25)," +
                "sip_kar_orani float," +
                "sip_durumu tinyint," +
                "sip_stalRecId_DBCno smallint," +
                "sip_stalRecId_RECno int," +
                "sip_planlananmiktar float," +
                "sip_teklifRecId_DBCno smallint," +
                "sip_teklifRecId_RECno int," +
                "sip_parti_kodu nvarchar (25)," +
                "sip_lot_no int," +
                "sip_projekodu nvarchar (25)," +
                "sip_fiyat_liste_no int," +
                "sip_Otv_Pntr tinyint," +
                "sip_Otv_Vergi float," +
                "sip_otvtutari float," +
                "sip_OtvVergisiz_Fl tinyint," +
                "sip_paket_kod nvarchar (25)," +
                "sip_RezRecId_DBCno smallint," +
                "sip_RezRecId_RECno int," +
                "sip_harekettipi tinyint)",
        insert : "INSERT INTO SIPARİS VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    },
    SiparisStokTbl : 
    {
        tag : "SIPARISSTOK",
        query : "CREATE TABLE IF NOT EXISTIS SIPARISSTOK (" +
                "RECNO nvarchar (50)," +
                "BARKOD nvarchar (25)," +
                "KODU nvarchar (25)," +
                "ADI nvarchar (50)," +
                "TARIH datetime," +
                "TESLIMTARIH datetime," +
                "TIP tinyint," +
                "CINS tinyint," +
                "SERI nvarchar (6)," +
                "SIRA int," +
                "SATIRNO int," +
                "BELGENO nvarchar (15)," +
                "BELGETARIH datetime," +
                "SATICIKOD nvarchar (25)," +
                "CARI nvarchar (25)," +
                "BFIYAT float," +
                "SIPMIKTAR float," +
                "BIRIMPNTR tinyint," +
                "TESLIMMIKTAR float," +
                "TUTAR float," +
                "ISKONTO_1 float," +
                "ISKONTO_2 float," +
                "ISKONTO_3 float," +
                "ISKONTO_4 float," +
                "ISKONTO_5 float," +
                "ISKONTO_6 float," +
                "VERGIPNTR tinyint," +
                "VERGI float," +
                "ODEMENO int," +
                "DEPO int," +
                "CARISORUMLU nvarchar (25)," +
                "STOKSORUMLU nvarchar (25)," +
                "DOVIZCINSI tinyint," +
                "DOVIZKURU float," +
                "ALTDOVIZKURU float," +
                "ADRESNO int," +
                "ISKONTO1 tinyint," +
                "ISKONTO2 tinyint," +
                "ISKONTO3 tinyint," +
                "ISKONTO4 tinyint," +
                "ISKONTO5 tinyint," +
                "ISKONTO6 tinyint," +
                "ISK1 bit," +
                "ISK2 bit," +
                "ISK3 bit," +
                "ISK4 bit," +
                "ISK5 bit," +
                "ISK6 bit," +
                "BEDEN nvarchar (25)," +
                "RENK nvarchar (25)," +
                "BEDENNO tinyint," +
                "MIKTAR float," +
                "BIRIM nvarchar (25)," +
                "BEDENPNTR int," +
                "RENKPNTR int," +
                "KATSAYI float," +
                "VERGIORAN float," +
                "DEPOMIKTAR float," +
                "BARBIRIMPNTR int," +
                "EXIMKODU nvarchar(25)," +
                "PARTI nvarchar(25)," +
                "LOT int," +
                "DETAYTAKIP tinyint," +
                "SIPARISDURSUN tinyint," +
                "MALKABULDURSUN tinyint," +
                "ACIKLAMA nvarchar(50))",
        insert : "INSERT INTO SIPARISSTOK VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    },
    SonAlisFiyatiTbl :
    {
        tag : "SONALISFIYATI",
        query : "CREATE TABLE IF NOT EXISTS SONALISFIYATI (" +
                "CARI nvarchar(30)," +
                "STOK nvarchar(30)," +
                "SONFIYAT float)",
        insert : "INSERT INTO SONALISFIYATI VALUES (?,?,?)"
    },
    SonSatisFiyatiTbl :
    {
        tag : "SONSATİSFIYATI",
        query : "CREATE TABLE IF NOT EXISTS SONSATİSFIYATI (" +
                "CARI nvarchar(30)," +
                "STOK nvarchar(30)," +
                "SONFIYAT float)",
        insert : "INSERT INTO SONALISFIYATI VALUES (?,?,?)"
    },
    SorumlulukMrkzTbl : 
    {
        tag : "SORUMLULUKMRKZ",
        query : "CREATE TABLE IF NOT EXISTS SORUMLULUKMRKZ (" +
                 "SORUMLULUKKODU nvarchar(25)," +
                 "SORUMLULUKISMI nvarchar(40))" ,
        insert : "INSERT INTO SORUMLULUKMRKZ VALUES (?,?)"
    },
    StokTbl : 
    {
        tag : "STOK",
        query : "CREATE TABLE IF NOT EXISTS STOK (" + 
                "KODU NVARCHAR (25)," + 
                "ADI NVARCHAR (50)," + 
                "KISAAD NVARCHAR (25)," +
                "YABANCIAD NVARCHAR (50)," + 
                "DOVIZCINSI TINYINT," + 
                "PERAKENDEVERGIPNTR TINYINT," + 
                "TOPTANVERGIPNTR TINYINT," +
                "ALTGRUP NVARCHAR (25)," + 
                "ANAGRUP NVARCHAR (25)," + 
                "URETICI NVARCHAR (25)," + 
                "SEKTOR NVARCHAR (25)," + 
                "REYON NVARCHAR (25)," + 
                "MARKA NVARCHAR (25)," + 
                "BEDENKODU NVARCHAR (25)," + 
                "RENKKODU NVARCHAR (25)," + 
                "AKTIFPASIF BOOLEAN," + 
                "PERAKENDEVERGI FLOAT," + 
                "TOPTANVERGI FLOAT," + 
                "DETAYTAKIP TINYINT," +
                "DEPOMIKTAR FLOAT," + 
                "DEPOMIKTAR2 FLOAT," + 
                "SIPARISDURSUN TINYINT," + 
                "MALKABULDURSUN TINYINT," + 
                "OTVTUTAR FLOAT)",
        insert : "INSERT INTO STOK VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    },
    StokHarTbl :
    {
        tag : "STOKHAR",
        query : "CREATE TABLE IF NOT EXISTS STOKHAR (" +
                "sth_RECid_DBCno smallint," +
                "sth_RECid_RECno int," +
                "sth_SpecRECno int," +
                "sth_iptal bit," +
                "sth_fileid smallint," +
                "sth_hidden bit," +
                "sth_kilitli bit," +
                "sth_degisti bit," +
                "sth_checksum int," +
                "sth_create_user smallint," +
                "sth_create_date datetime," +
                "sth_lastup_user smallint," +
                "sth_lastup_date datetime," +
                "sth_special1 nvarchar(4)," +
                "sth_special2 nvarchar(4)," +
                "sth_special3 nvarchar(4)," +
                "sth_firmano int," +
                "sth_subeno int," +
                "sth_tarih datetime," +
                "sth_tip tinyint," +
                "sth_cins tinyint," +
                "sth_normal_iade tinyint," +
                "sth_evraktip tinyint," +
                "sth_evrakno_seri nvarchar(4)," +
                "sth_evrakno_sira int," +
                "sth_satirno int," +
                "sth_belge_no nvarchar(15)," +
                "sth_belge_tarih datetime," +
                "sth_stok_kod nvarchar(25)," +
                "sth_isk_mas1 tinyint," +
                "sth_isk_mas2 tinyint," +
                "sth_isk_mas3 tinyint," +
                "sth_isk_mas4 tinyint," +
                "sth_isk_mas5 tinyint," +
                "sth_isk_mas6 tinyint," +
                "sth_isk_mas7 tinyint," +
                "sth_isk_mas8 tinyint," +
                "sth_isk_mas9 tinyint," +
                "sth_isk_mas10 tinyint," +
                "sth_sat_iskmas1 bit," +
                "sth_sat_iskmas2 bit," +
                "sth_sat_iskmas3 bit," +
                "sth_sat_iskmas4 bit," +
                "sth_sat_iskmas5 bit," +
                "sth_sat_iskmas6 bit," +
                "sth_sat_iskmas7 bit," +
                "sth_sat_iskmas8 bit," +
                "sth_sat_iskmas9 bit," +
                "sth_sat_iskmas10 bit," +
                "sth_pos_satis bit," +
                "sth_promosyon_fl bit," +
                "sth_cari_cinsi tinyint," +
                "sth_cari_kodu nvarchar(25)," +
                "sth_cari_grup_no tinyint," +
                "sth_isemri_gider_kodu nvarchar(25)," +
                "sth_ismerkezi_kodu nvarchar(25)," +
                "sth_plasiyer_kodu nvarchar(25)," +
                "sth_kur_tarihi datetime," +
                "sth_har_doviz_cinsi tinyint," +
                "sth_har_doviz_kuru float," +
                "sth_alt_doviz_kuru float," +
                "sth_stok_doviz_cinsi tinyint," +
                "sth_stok_doviz_kuru float," +
                "sth_miktar float," +
                "sth_miktar2 float," +
                "sth_birim_pntr tinyint," +
                "sth_tutar float," +
                "sth_iskonto1 float," +
                "sth_iskonto2 float," +
                "sth_iskonto3 float," +
                "sth_iskonto4 float," +
                "sth_iskonto5 float," +
                "sth_iskonto6 float," +
                "sth_masraf1 float," +
                "sth_masraf2 float," +
                "sth_masraf3 float," +
                "sth_masraf4 float," +
                "sth_vergi_pntr tinyint," +
                "sth_vergi float," +
                "sth_masraf_vergi_pntr tinyint," +
                "sth_masraf_vergi float," +
                "sth_netagirlik float," +
                "sth_odeme_op int," +
                "sth_aciklama nvarchar(40)," +
                "sth_sip_recid_dbcno smallint," +
                "sth_sip_recid_recno nvarchar(50)," +
                "sth_fat_recid_dbcno smallint," +
                "sth_fat_recid_recno nvarchar(50)," +
                "sth_giris_depo_no int," +
                "sth_cikis_depo_no int," +
                "sth_malkbl_sevk_tarihi datetime," +
                "sth_cari_srm_merkezi nvarchar(25)," +
                "sth_stok_srm_merkezi nvarchar(25)," +
                "sth_fis_tarihi datetime," +
                "sth_fis_sirano int," +
                "sth_vergisiz_fl bit," +
                "sth_maliyet_ana float," +
                "sth_maliyet_alternatif float," +
                "sth_maliyet_orjinal float," +
                "sth_adres_no int," +
                "sth_parti_kodu nvarchar(25)," +
                "sth_lot_no int," +
                "sth_kons_recid_dbcno smallint," +
                "sth_kons_recid_recno int," +
                "sth_subesip_recid_dbcno smallint," +
                "sth_subesip_recid_recno nvarchar(50)," +
                "sth_vardiya_tarihi datetime," +
                "sth_vardiya_no tinyint," +
                "sth_satistipi tinyint," +
                "sth_proje_kodu nvarchar(25)," +
                "sth_ihracat_kredi_kodu nvarchar(4)," +
                "sth_exim_kodu nvarchar(25)," +
                "sth_otv_pntr tinyint," +
                "sth_otv_vergi float," +
                "sth_bkm_recid_dbcno smallint," +
                "sth_bkm_recid_recno int," +
                "sth_karsikons_recid_dbcno smallint," +
                "sth_karsikons_recid_recno int," +
                "sth_iade_evrak_seri nvarchar(4)," +
                "sth_iade_evrak_sira int," +
                "sth_diib_belge_no nvarchar(25)," +
                "sth_diib_satir_no tinyint," +
                "sth_mensey_ulke_tipi tinyint," +
                "sth_mensey_ulke_kodu nvarchar(4)," +
                "sth_brutagirlik float," +
                "sth_halrehmiktari float," +
                "sth_halrehfiyati float," +
                "sth_halsandikmiktari float," +
                "sth_halsandikfiyati float," +
                "sth_halsandikkdvtutari float" +
                "sth_disticaret_turu tinyint," +
                "sth_otvtutari float," +
                "sth_otvvergisiz_fl bit," +
                "sth_direkt_iscilik_1 float," +
                "sth_direkt_iscilik_2 float," +
                "sth_direkt_iscilik_3 float," +
                "sth_direkt_iscilik_4 float," +
                "sth_direkt_iscilik_5 float," +
                "sth_genel_uretim_1 float," +
                "sth_genel_uretim_2 float," +
                "sth_genel_uretim_3 float," +
                "sth_genel_uretim_4 float," +
                "sth_genel_uretim_5 float," +
                "sth_yat_tes_kodu nvarchar(25)," +
                "sth_oiv_pntr tinyint," +
                "sth_oiv_vergi float," +
                "sth_oivvergisiz_fl bit," +
                "sth_fiyat_liste_no int," +
                "sth_fis_tarihi2 datetime," +
                "sth_fis_sirano2 int," +
                "sth_rez_recid_dbcno smallint," +
                "sth_rez_recid_recno int," +
                "sth_fiyfark_esas_evrak_seri nvarchar(6)," +
                "sth_fiyfark_esas_evrak_sira int," +
                "sth_fiyfark_esas_satir_no int," +
                "sth_optamam_recid_dbcno smallint," +
                "sth_optamam_recid_recno int," +
                "sth_oivtutari float," +
                "sth_Tevkifat_turu tinyint," +
                "sth_HalKomisyonuKdv float," +
                "sth_iadeTlp_recid_dbcno smallint," +
                "sth_iadeTlp_recid_recno int," +
                "sth_HalSatisRecid_dbcno smallint," +
                "sth_HalSatisRecid_recno int," +
                "sth_nakliyedeposu int," +
                "sth_nakliyedurumu tinyint," +
                "sth_ciroprim_dbcno smallint," +
                "sth_ciroprim_recno int," +
                "sth_yetkili_recid_dbcno smallint," +
                "sth_yetkili_recid_recno int," +
                "sth_taxfree_fl bit)",
        insert : "INSERT INTO STOKHAR VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"           
    },
    UreticiTbl :
   {
       tag : "URETICI",
       query : "CREATE TABLE IF NOT EXISTS URETICI (" +
              "KODU nvarchar (25)," +
              "ADI nvarchar (40))",
        insert : "INSERT INTO URETICI VALUES (?,?)"
    },
    UretimStokTbl :
   {
       tag : "URETIMSTOK",
       query : "CREATE TABLE IF NOT EXISTS URETIMSTOK (" +
               "RECNO nvarchar (50)," +
               "BARKOD nvarchar (25)," +
               "KODU nvarchar (25)," +
               "ADI nvarchar (50)," +
               "TARIH datetime," +
               "SATIRNO int," +
               "TIP tinyint," +
               "ISEMRI nvarchar (25)," +
               "PMIKTAR float," +
               "GMIKTAR float," +
               "DEPO int," +
               "MIKTAR float," +
               "BEDENPNTR int," +
               "RENKPNTR int," +
               "KATSAYI float," +
               "PARTI nvarchar(25)," +
               "LOT int," +
               "DETAYTAKIP int)", 
        insert : "INSERT INTO URETIMSTOK VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    },
    VergiTbl :
   {
       tag : "VERGI",
       query : "CREATE TABLE IF NOT EXISTS VERGI (" +
               "PNTR int," +
               "ORAN float)" ,
        insert : "INSERT INTO VERGI VALUES (?,?)"
   }

    //#endregion "LOCAL TABLOLAR OLUŞTURMA VE AKTARIM"
};