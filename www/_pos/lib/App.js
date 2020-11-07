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
    .when("/KullaniciParametre",
    {
        templateUrl : "html/ayarlar/KullaniciParametre.html"
    })
    .when("/CihazParametre",
    {
        templateUrl : "html/ayarlar/CihazParametre.html"
    })
});