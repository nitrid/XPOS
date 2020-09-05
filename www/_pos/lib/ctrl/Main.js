function Main ($scope,$rootScope,$window,db)
{
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
            
        });
    }
}