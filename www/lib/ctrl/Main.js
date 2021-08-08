function Main ($scope,$rootScope,$window,db)
{
    let TmpActiveTime;
    function MenuOlustur()
    {   
        if(typeof localStorage.Lang != 'undefined')
        {
            $scope.Lang = localStorage.Lang;
        }
        else
        {
            $scope.Lang = "TR";
        } 

        $scope.User = "0";
        $scope.Kullanici = $window.sessionStorage.getItem('User')
        $scope.Maho = false;
        
        if($scope.Kullanici == "MAHO" || $scope.Kullanici == "ADMIN")
        {
            $scope.Maho = true;
            $scope.$apply();
        }

        let HtmlText = "";
        if($scope.User == "0")
        {
            HtmlText = HtmlText + "<a>";
            HtmlText = HtmlText + "<i class='site-menu-icon wb-settings'></i>";
            HtmlText = HtmlText + "<span class='site-menu-title'>" + db.Language($scope.Lang,"Ayarlar") + "</span>";
            HtmlText = HtmlText + "<span class='site-menu-arrow'></span>";
            HtmlText = HtmlText + "</a>";
            HtmlText = HtmlText + "<ul class='site-menu-sub'>";
            HtmlText = HtmlText + "<li class='site-menu-item'>"
            HtmlText = HtmlText + "<a class='animsition-link' href='#!KullaniciParametre'>";
            HtmlText = HtmlText + "<span class='site-menu-title'>" + db.Language($scope.Lang,"Kullanıcı Tanımlama") + "</span>";
            HtmlText = HtmlText + "</a>";
            HtmlText = HtmlText + "</li>";
            HtmlText = HtmlText + "<li class='site-menu-item'>"
            HtmlText = HtmlText + "<a class='animsition-link' href='#!CihazParametre'>";
            HtmlText = HtmlText + "<span class='site-menu-title'>" + db.Language($scope.Lang,"Cihaz Tanımlama") + "</span>";
            HtmlText = HtmlText + "</a>";
            HtmlText = HtmlText + "</li>";
            HtmlText = HtmlText + "</ul>";
        }
        $("#menu").html(HtmlText);     
    }
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
        db.Connection(function(data)
        {
            MenuOlustur();
            $scope.Lang = localStorage.Lang;
        });
    }
    $scope.FrmActive = function()
    {
        if(typeof TmpActiveTime != 'undefined')
        {
            clearTimeout(TmpActiveTime);
        }
        
        TmpActiveTime = setTimeout(()=>{$window.location.href = "index.html";},3600000);
    }  
}