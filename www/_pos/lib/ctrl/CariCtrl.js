function CariCtrl ($scope,$window,db)
{
    $scope.Init = function()
    {
        UserParam = Param[$window.sessionStorage.getItem('User')];
        
        $scope.Deneme = "Mahir"
    }
}