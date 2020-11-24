angular.module("app",
[
    'ngRoute',
    'app.controller',
    'app.db'
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
    .when("/StokListesi",
    {
        templateUrl : "html/kartlar/StokListesi.html"
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
    .when("/FiyatListeYonetimi",
    {
        templateUrl : "html/yonetim/FiyatListeYonetimi.html"
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