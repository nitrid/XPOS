angular.module('app.controller', [])
.controller('Login',['$scope','$rootScope','$window','db',Login])
.controller('Main',['$scope','$rootScope','$window','db',Main])
.controller('KullaniciParametreCtrl',['$route','$scope','$window','$rootScope','db',KullaniciParametreCtrl])
.controller('CihazParametreCtrl',['$route','$scope','$window','$rootScope','db',CihazParametreCtrl])
.controller('StokCtrl',['$scope','$window','$location','db',StokCtrl])
.controller('CariCtrl',['$scope','$window','$location','db',CariCtrl])
.controller('CariListeCtrl',['$scope','$window','db',CariListeCtrl])
.controller('OzelEtiketCtrl',['$scope','$window','db',OzelEtiketCtrl])
.controller('TopluTicketGirisCtrl',['$scope','$window','db',TopluTicketGirisCtrl])
.controller('TopluTicketListesiCtrl',['$scope','$window','db',TopluTicketListesiCtrl])
.controller('SatisFisListesiCtrl',['$scope','$window','db',SatisFisListesiCtrl])
.controller('DegismisFisListesiCtrl',['$scope','$window','db',DegismisFisListesiCtrl])
.controller('MusteriPuanListesiCtrl',['$scope','$window','db',MusteriPuanListesiCtrl])
.controller('EtiketBasimCtrl',['$scope','$window','db',EtiketBasimCtrl])
.controller('FiyatListeYonetimiCtrl',['$scope','$window','db',FiyatListeYonetimiCtrl])
.controller('PosSatisRaporCtrl',['$scope','$window','db',PosSatisRaporCtrl])
.controller('SiparisEvrakCtrl',['$scope','$window','db',SiparisEvrakCtrl])