angular.module('app.controller', [])
.controller('Login',['$scope','$rootScope','$window','db',Login])
.controller('Main',['$scope','$rootScope','$window','db',Main])
.controller('KullaniciParametreCtrl',['$scope','$window','db',KullaniciParametreCtrl])
.controller('StokCtrl',['$scope','$window','db',StokCtrl])
.controller('CariCtrl',['$scope','$window','db',CariCtrl])
.controller('PosSatisCtrl',['$scope','$window','db',PosSatisCtrl])