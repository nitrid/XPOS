function StokCtrl ($scope,$window,db)
{
    $scope.Init = function()
    {
        $("#TblFiyat").DataTable(
            {
                "pageLength": 5,
                "lengthChange": false,
                ordering:false,
                info:false,
                searching:false
            }
        );
        $("#TblBirim").DataTable(
            {
                "pageLength": 5,
                "lengthChange": false,
                ordering:false,
                info:false,
                searching:false
            }
        );
        $("#TblBarkod").DataTable(
            {
                "pageLength": 5,
                "lengthChange": false,
                ordering:false,
                info:false,
                searching:false
            }
        );
    }
    $scope.BtnTabFiyat = function()
    {
        $("#TabFiyat").addClass('active');
        $("#TabBirim").removeClass('active');
        $("#TabBarkod").removeClass('active');
        $("#TabTedarikci").removeClass('active');
    }
    $scope.BtnTabBirim = function()
    {
        $("#TabBirim").addClass('active');
        $("#TabFiyat").removeClass('active');
        $("#TabBarkod").removeClass('active');
        $("#TabTedarikci").removeClass('active');
    }
    $scope.BtnTabBarkod = function()
    {
        $("#TabBarkod").addClass('active');
        $("#TabFiyat").removeClass('active');
        $("#TabBirim").removeClass('active');
        $("#TabTedarikci").removeClass('active');
    }
    $scope.BtnTabTedarikci = function()
    {
        $("#TabTedarikci").addClass('active');
        $("#TabFiyat").removeClass('active');
        $("#TabBarkod").removeClass('active');
        $("#TabBirim").removeClass('active');
    }
}