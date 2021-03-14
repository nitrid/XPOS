function TopluTicketListesiCtrl ($scope,$window,db)
{
    $scope.Init = function()
    {
        db.GetData($scope.Firma,'CalintiKartKGetir',[''],function(data)
        {   
            $scope.CalintiKartListe = data;
            $("#TblCalintiKart").jsGrid({data : $scope.CalintiKartListe});
            console.log(data);
            //$scope.BtnYeni();
        });

        InitCalintiKartGrid();
    }

    function InitCalintiKartGrid()
    {   
        $("#TblCalintiKart").jsGrid({
            responsive: true,
            width: "100%",
            height: "500px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.KullaniciListe,
            autoload: true,
            fields: 
            [
                {
                    name: "Code",
                    title: db.Language($scope.Lang,"Kod"),
                    type: "text",
                    align: "center",
                    width: 80
                },
                {
                    name: "Referance",
                    title: db.Language($scope.Lang,"Referans"),
                    type: "text",
                    align: "center",
                    width: 80
                },
                {
                    name: "Random1",
                    title: db.Language($scope.Lang,"Random 1"),
                    type: "text",
                    align: "center",
                    width: 80
                },
                {
                    name: "Price",
                    title: db.Language($scope.Lang,"Fiyat"),
                    type: "text",
                    align: "center",
                    width: 80
                },
                {
                    name: "Type",
                    title: db.Language($scope.Lang,"Tip"),
                    type: "text",
                    align: "center",
                    width: 80
                },
                {
                    name: "Random2",
                    title: db.Language($scope.Lang,"Random 2"),
                    type: "text",
                    align: "center",
                    width: 80
                },
                {
                    name: "Year",
                    title: db.Language($scope.Lang,"Yıl"),
                    type: "text",
                    align: "center",
                    width: 80
                }
            ],
        });
    }
}