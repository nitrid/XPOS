function Login ($scope,$rootScope,$window,db)
{
    let Firma = "TEST1";
    localStorage.mode = true;

    $scope.server_adress = localStorage.host;
    $scope.server_port = localStorage.port;
    $scope.socket_port = localStorage.socketport;        
 
    $scope.Init = function()
    {
        db.SetHost($scope.server_adress,$scope.socket_port);

        db.Connection(function(data)
        {                
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
                'type="button">Ayarlar</button></p></div>');
                db.Disconnect();
            }
        });
    }
    $scope.HostSettingSave = function()
    {
        localStorage.host = $scope.server_adress;
        localStorage.port = $scope.server_port;
        localStorage.socketport = $scope.socket_port;

        db.SetHost($scope.server_adress,$scope.socket_port);
        $window.location.reload();
    }
    $scope.BtnEntry = function()
    {
        for(i = 0;i < Param.length;i++)
        {
            if(Param[i].Kullanici == $scope.Kullanici && Param[i].Sifre == $scope.Password)
            {
                console.log("Kullanıcı adı ve şifre doğru");
                
                $window.sessionStorage.setItem('User', i);
                
                var url = "main.html";
                $window.location.href = url;
                return;
            }
        }
        alertify.okBtn("Tamam");
        alertify.alert("Kullanıcı adı veya şifre yanlış");
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
}