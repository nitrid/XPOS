angular.module("app",
[
    'ngRoute',
    'app.controller',
    'app.db'
])
.config(function($routeProvider)
{       
    $routeProvider 
    .when("/",
    {
        templateUrl : "html/evraklar/Anasayfa.html"
    })
    .when("/POSSatis",
    {
        templateUrl : "html/evraklar/POSSatis.html"
    })
    .when("/POSIade",
    {
        templateUrl : "html/evraklar/POSIade.html"
    })
    .when("/PluTanitim",
    {
        templateUrl : "html/evraklar/PluTanitim.html"
    })
    .when("/SatisAktarim",
    {
        templateUrl : "html/evraklar/SatisAktarim.html"
    })
    .when("/TahsilatAktarim",
    {
        templateUrl : "html/evraklar/TahsilatAktarim.html"
    })
    .when("/RptGunlukSatis",
    {
        templateUrl : "html/rapor/RptGunlukSatis.html"
    })
    .when("/RptGunlukEvrak",
    {
        templateUrl : "html/rapor/RptGunlukEvrak.html"
    })
    .when("/RptGunlukKasa",
    {
        templateUrl : "html/rapor/RptGunlukKasa.html"
    })    
    .when("/RptMagazaCiro",
    {
        templateUrl : "html/rapor/RptMagazaCiro.html"
    })  
    .when("/RptMagazaSatis",
    {
        templateUrl : "html/rapor/RptMagazaSatis.html"
    })  
    .when("/RptMagazaStok",
    {
        templateUrl : "html/rapor/RptMagazaStok.html"
    })  
    .when("/KullaniciParametre",
    {
        templateUrl : "html/ayarlar/KullaniciParametre.html"
    });
});