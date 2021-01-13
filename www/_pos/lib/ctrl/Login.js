function Login ($scope,$rootScope,$window,db)
{
    let FocusObject;
    localStorage.mode = true;

    $scope.server_adress = localStorage.host;
    $scope.socket_port = localStorage.socketport;
    $scope.device = localStorage.device;

    $rootScope.LoadingShow = function() 
    {
        $("#loading").show();
    }
    $rootScope.LoadingHide = function() 
    {
        $("#loading").hide();
    }
    $rootScope.MessageBox = function(pMsg)
    {
        alertify.alert(pMsg);
    }

    $scope.Init = function()
    {
        db.SetHost($scope.server_adress,$scope.socket_port);

        $scope.Kullanici = "";
        $scope.Password = "";
        $scope.Firma = "PIQPOS";
        $scope.KullaniciListe = [];

        if (typeof localStorage.host == 'undefined')
        {
            localStorage.mode = "true";
            $scope.server_adress = window.location.hostname;
            $scope.socket_port = "";
            $scope.device = "";
            $scope.HostSettingSave();
        }
        if(typeof localStorage.Lang != 'undefined')
        {
            $scope.Lang = localStorage.Lang;
        }
        else
        {
            $scope.Lang = "TR";
        }
        db.Connection(function(data)
        {     
            if(data == true)
            {
                db.GetData($scope.Firma,'KullaniciGetir',[''],function(data)
                {   
                    $scope.KullaniciListe = data;
                });
            }
                       
            if(data == true)
            {
                $('#alert').alert('close');
            }
            else
            {
                $('#alert-box').html('<div class="alert alert-icon alert-danger alert-dismissible" role="alert" id="alert">' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<i class="icon wb-bell" aria-hidden="true"></i> Sunucuya erişim sağlanamadı.' +
                '<p class="mt-15">' +
                '<button class="btn btn-primary" data-target="#server-settings" data-toggle="modal"' +
                'type="button" langu>Ayarlar</button></p></div>');
                db.Disconnect();
            }
        });
    }
    $scope.HostSettingSave = function()
    {
        localStorage.host = $scope.server_adress;
        localStorage.socketport = $scope.socket_port;
        localStorage.device = $scope.device;

        db.SetHost($scope.server_adress);
        $window.location.reload();
    }
    $scope.BtnEntry = function()
    {        
        if(typeof(localStorage.device) != 'undefined')
        {      
            $scope.Kullanici = document.getElementById('Kullanici').value;
            $scope.Password = document.getElementById('Password').value;

            for(i = 0;i < $scope.KullaniciListe.length;i++)
            {
                if($scope.KullaniciListe[i].CODE == $scope.Kullanici && $scope.KullaniciListe[i].PASSWORD == $scope.Password)
                {
                    console.log("Kullanıcı adı ve şifre doğru");
                    $window.sessionStorage.setItem('User', $scope.Kullanici);
                    localStorage.Lang = $scope.Lang;
                    
                    var url = "";
                    if($scope.KullaniciListe[i].TAG == 0)
                        url = "pos.html";
                    else
                        url = "main.html";

                    $window.location.href = url;
                    return;
                }
            }

            // $scope.Kullanici = "P001";
            // $window.sessionStorage.setItem('User', $scope.Kullanici);
            // $scope.Password = "1";
            // $window.location.href = "pos.html";

            alertify.okBtn(db.Language($scope.Lang,"Tamam"));
            alertify.alert(db.Language($scope.Lang,"Kullanıcı adı veya şifre yanlış"));
        }
        else
        {
            alertify.alert(db.Language($scope.Lang,"CihazID Tanımsız Giriş Yapılamaz."))
        }
    }
    $scope.BtnTryConnect = function()
    {
        db.SetHost($scope.server_adress,$scope.socket_port);

        if(localStorage.mode == 'true')
        {
            db.Disconnect();
        }

        db.Connection(function(data)
        {
            if(data == true)
            {
                $scope.ConnectionStatus = 'Bağlantı Başarılı.';

                if(localStorage.mode == 'false')
                {
                    db.Disconnect();
                }
            }
            else
            {
                $scope.ConnectionStatus = 'Bağlantı Başarısız.';
                db.Disconnect();
            }
            $scope.$apply();            
        });
    }
    $scope.BtnTusClick = function(Key)
    {
        FocusObject.value = FocusObject.value + Key
    }
    $scope.BtnSilClick = function()
    {   
        FocusObject.value = FocusObject.value.toString().substring(0,FocusObject.value.length-1);
    }
    $scope.CmbLang = function()
    {
        localStorage.Lang = $scope.Lang;
        window.location.reload();
    }
    document.getElementById('Kullanici').addEventListener('focus', (event) => 
    {
        FocusObject = document.getElementById('Kullanici');
    });
    document.getElementById('Password').addEventListener('focus', (event) => 
    {
        FocusObject = document.getElementById('Password');
    });
}