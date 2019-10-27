function Main ($scope,$rootScope,$window,db)
{
    $scope.Init = function()
    {
        db.Connection(function(data)
        {
            
        });
    }
}