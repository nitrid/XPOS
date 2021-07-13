angular.module("app",
[
    'ngRoute',
    'app.controller',
    'app.db',
    'app.compile',
    'dx'
])
.config(function($routeProvider)
{       
    $routeProvider 
    .when("/Stok",
    {
        templateUrl : "html/kartlar/Stok.html"
    })
    .when("/Cari",
    {
        templateUrl : "html/kartlar/Cari.html"
    })
    .when("/CariListesi",
    {
        templateUrl : "html/kartlar/CariListesi.html"
    })
    .when("/OzelEtiket",
    {
        templateUrl : "html/yonetim/OzelEtiket.html"
    })
    .when("/SatisFisListesi",
    {
        templateUrl : "html/yonetim/SatisFisListesi.html"
    })
    .when("/DegismisFisListesi",
    {
        templateUrl : "html/yonetim/DegismisFisListesi.html"
    })
    .when("/MusteriPuanListesi",
    {
        templateUrl : "html/yonetim/MusteriPuanListesi.html"
    })
    .when("/EtiketBasim",
    {
        templateUrl : "html/yonetim/EtiketBasim.html"
    })
    .when("/FiyatGor",
    {
        templateUrl : "html/yonetim/FiyatGor.html"
    })
    .when("/FiyatListeYonetimi",
    {
        templateUrl : "html/yonetim/FiyatListeYonetimi.html"
    })
    .when("/TopluTicketGiris",
    {
        templateUrl : "html/yonetim/TopluTicketGiris.html"
    })
    .when("/TopluTicketListesi",
    {
        templateUrl : "html/yonetim/TopluTicketListesi.html"
    })
    .when("/TicketKontrol",
    {
        templateUrl : "html/yonetim/TicketKontrol.html"
    })
    .when("/PosSatisRapor",
    {
        templateUrl : "html/rapor/PosSatisRapor.html"
    })
    .when("/PosSatisGrupRapor",
    {
        templateUrl : "html/rapor/PosSatisGrupRapor.html"
    })
    .when("/AlinanSiparisEvrak",
    {
        templateUrl : "html/siparis/AlinanSiparisEvrak.html"
    })
    .when("/VerilenSiparisEvrak",
    {
        templateUrl : "html/siparis/VerilenSiparisEvrak.html"
    })
    .when("/TopluSiparisBirlestirme",
    {
        templateUrl : "html/siparis/TopluSiparisBirlestirme.html"
    })
    .when("/SiparisListesi",
    {
        templateUrl : "html/siparis/SiparisListesi.html"
    })
    .when("/DegisenOrgineListesi",
    {
        templateUrl : "html/yonetim/DegisenOrgineListesi.html"
    })
    .when("/FiyatFarkiEvrak",
    {
        templateUrl : "html/fatura/FiyatFarkiEvrak.html"
    })
    .when("/IadeEvrak",
    {
        templateUrl : "html/fatura/IadeEvrak.html"
    })
    .when("/SktGiris",
    {
        templateUrl : "html/yonetim/SktGiris.html"
    })
    .when("/KullaniciParametre",
    {
        templateUrl : "html/ayarlar/KullaniciParametre.html"
    })
    .when("/CihazParametre",
    {
        templateUrl : "html/ayarlar/CihazParametre.html"
    })
});