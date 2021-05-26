function Main ($scope,$rootScope,$window,db)
{
    function MenuOlustur()
    {   
        let HtmlText = "";

        $scope.User = "0";

        if($scope.User == "0")
        {
            HtmlText = HtmlText + "<a>";
            HtmlText = HtmlText + "<i class='site-menu-icon wb-settings'></i>";
            HtmlText = HtmlText + "<span class='site-menu-title' langu>Ayarlar</span>";
            HtmlText = HtmlText + "<span class='site-menu-arrow'></span>";
            HtmlText = HtmlText + "</a>";
            HtmlText = HtmlText + "<ul class='site-menu-sub'>";
            HtmlText = HtmlText + "<li class='site-menu-item'>"
            HtmlText = HtmlText + "<a class='animsition-link' href='#!KullaniciParametre'>";
            HtmlText = HtmlText + "<span class='site-menu-title' langu>Kullanıcı Tanımlama</span>";
            HtmlText = HtmlText + "</a>";
            HtmlText = HtmlText + "</li>";
            HtmlText = HtmlText + "<li class='site-menu-item'>"
            HtmlText = HtmlText + "<a class='animsition-link' href='#!CihazParametre'>";
            HtmlText = HtmlText + "<span class='site-menu-title' langu>Cihaz Tanımlama</span>";
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
}