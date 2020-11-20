function OzelEtiketCtrl ($scope,$window,db)
{
    let SecimSelectedRow = null;

    function TblSecimInit(pData)
    {
        let db = {
            loadData: function(filter)
            {
                return $.grep(pData, function(client)
                {
                    return (!filter.CODE || client.CODE.toLowerCase().indexOf(filter.CODE.toLowerCase()) > -1)
                        && (!filter.NAME || client.NAME.toLowerCase().indexOf(filter.NAME.toLowerCase()) > -1)
                });
            }
        };
        $("#TblSecim").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : pData,
            paging : true,
            filtering : true,
            pageSize: 15,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields:  
            [
                {
                    name: "CODE",
                    title : "CODE",
                    type : "text",
                    align: "center",
                    width: 100

                },
                {
                    name: "NAME",
                    title : "NAME",
                    type : "text",
                    align: "center",
                    width: 300
                }
            ],
            rowClick: function(args)
            {
                SecimListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            },
            controller:db,
        });

        $("#TblSecim").jsGrid("search");
    }
    function SecimListeRowClick(pIndex,pItem,pObj)
    {
        if ( SecimSelectedRow ) { SecimSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        SecimSelectedRow = $row;
        SecimSelectedRow.Item = pItem
        SecimSelectedRow.Index = pIndex
        
        $scope.Kodu = pItem.SPECIAL1;
        $scope.Fiyat = pItem.PRICE;

        $("#MdlSecim").modal('hide');
    }
    $scope.Init = function()
    {
        $scope.Kullanici = $window.sessionStorage.getItem('User');

        $scope.Data = 
        [
            {
                Kodu : "",
                Fiyat : "",
                Aciklama : "",
                Kodu : "",
            }
        ];

        $scope.Kodu = "";
        $scope.Fiyat = 0;
        $scope.Aciklama = "";
        $scope.BasimAdeti = 1;
    }
    $scope.BtnModalSecim = function()
    {
        db.GetData($scope.Firma,'StokGetir',['',''],function(StokData)
        {
            TblSecimInit(StokData);
            $("#MdlSecim").modal('show');
        });
    }
    $scope.Kaydet = function()
    {
        if($scope.Kodu != "")
        {
            let Data = 
            {
                data : 
                [   
                    {
                        Kodu : '27' + $scope.Kodu.toString().substring(1,$scope.Kodu.length) + (parseFloat(parseFloat($scope.Fiyat).toFixed(2)) * 100).toString().padStart(5,'0'),
                        Fiyat : $scope.Fiyat,
                        Aciklama : $scope.Aciklama,
                    }
                ]
            }
            
            let InsertData = 
            [
                $scope.Kullanici,
                $scope.Kullanici,
                JSON.stringify(Data),
                "1",
                $scope.BasimAdeti,
                0
            ]
    
            db.ExecuteTag($scope.Firma,'LabelQueueInsert',InsertData)

            $scope.Init();
        }
    }
}