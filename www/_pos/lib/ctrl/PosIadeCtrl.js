function POSIadeCtrl($scope,$window)
{
    function Init()
    {
        UserParam = Param[$window.sessionStorage.getItem('User')];

        $scope.Firma = $window.sessionStorage.getItem('Firma');

        $scope.CariKodu = "";
        $scope.CariAdi = "";
        $scope.Sube = "0";

        $scope.CmbStokAra = "0";
        $scope.TxtStokAra = "";
        
        $scope.Stok = [];
        $scope.StokListe = [];
    


    }
    function InitIslemGrid()
    {   
        $("#TblIslem").jsGrid({
            responsive: true,
            width: "100%",
            height: "385px",
            updateOnResize: true,
            heading: false,
            selecting: true,
            data : $scope.IadeList,
            rowClass: function (item, itemIndex)
            {
                return "rowheight";
            },
            fields: 
            [{
                name: "MIKTAR",
                title: "MIKTAR",
                type: "number",
                align: "center",
                width: 60
            }, 
            {
                name: "BIRIM",
                title: "BIRIM",
                type: "text",
                align: "center",
                width: 50
            }, 
            {
                name: "SADI",
                title: "ADI",
                type: "text",
                align: "center",
                width: 150,
                itemTemplate: function(value,item)
                {
                    return "<div style='white-space: nowrap;overflow: hidden;text-overflow: ellipsis;'>" + value + "</div>";
                }
            },
            {
                name: "FIYAT",
                title: "FIYAT",
                type: "number",
                align: "center",
                width: 60
            },
            {
                name: "TUTAR",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 60
            }],
            rowClick: function(args)
            {
                $scope.IslemListeRowClick(args.itemIndex,args.item);
                $scope.$apply();
            }
        });
    }
    function TxtBarkodKeyPress()
    {
        $scope.StokGetir($scope.TxtBarkod);
    }
    $scope.TxtBarkodPress = function(keyEvent)
    {
        if(keyEvent.which == 13)
        {
            TxtBarkodKeyPress();
        }
    }
    $scope.YeniEvrak = function ()
    {
        Init();
        InitIslemGrid();
    }
    $scope.StokGetir = function(pBarkod)
    {
        if(pBarkod != '')
        {
            db.StokBarkodGetir($scope.Firma,pBarkod,$scope.Sube,function(BarkodData)
            {
                if(BarkodData.Lengh > 0)
                {
                    $scope.Stok = BarkodData;
                    $scope.Stok[0].FIYAT = 0;
                    $scope.Stok[0].TUTAR = 0;
                    $scope.Stok[0].INDIRIM = 0;
                    $scope.Stok[0].KDV = 0;
                    $scope.Stok[0].TOPTUTAR = 0;

                    let FiyatParam = 
                    {
                        CariKodu : $scope.CariKodu,
                        CariFiyatListe : 1,
                        DepoNo : $scope.DepoNo,
                        OdemeNo : 0,
                        AlisSatis : 1
                    }
                }
            })
        }
    }
    $scope.BtnMusteriListesi = function()
    {
        $("#MdlStokAra").modal("show");
        FocusAraToplam = false;
        FocusBarkod = false;
        FocusMusteri = true;
        FocusStok = false;
    }
}