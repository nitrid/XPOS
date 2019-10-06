angular.module("app",
[
    'ngRoute',
    'app.controller',
    'app.db'
])
.config(function($routeProvider)
{       
    $routeProvider 
    .when("/POSSatis",
    {
        templateUrl : "html/evraklar/POSSatis.html"
    })
    .when("/Stok",
    {
        templateUrl : "html/kartlar/Stok.html"
    })
});