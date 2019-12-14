function CariCtrl ($scope,$window,db)
{
    let UserParam = {};
    let SecimSelectedRow = null;
    let ModalTip = "";

    function TblSecimInit(pData)
    {
        
        let TmpColumns = []
           
        if(pData.length > 0)
        {
            Object.keys(pData[0]).forEach(function(item)
            {
                TmpColumns.push({name : item});
            });    
        }
        
        $("#TblSecim").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : pData,
            paging : true,
            pageSize: 5,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: TmpColumns,
            rowClick: function(args)
            {
                SecimListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function CariGetir(pKodu)
    {
        $scope.CariListe = [];
        db.GetData($scope.Firma,'CariKartGetir',[pKodu],function(StokData)
        {
            $scope.CariListe = StokData;
        });
    }
    function SecimListeRowClick(pIndex,pItem,pObj)
    {    
        if ( SecimSelectedRow ) { SecimSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        SecimSelectedRow = $row;
        SecimSelectedRow.Item = pItem
        SecimSelectedRow.Index = pIndex
    }
    $scope.Init = function()
    {
        console.log(11);
        UserParam = Param[$window.sessionStorage.getItem('User')];

        $scope.CariListe = [];

        TblSecimInit([]);

        let TmpCariObj = {};

        TmpCariObj.CODE = "";
        TmpCariObj.NAME = "";

        $scope.CariListe.push(TmpCariObj);

    }
    $scope.BtnGridSec = function()
    {
        if(ModalTip == "Cari")
        {
            CariGetir(SecimSelectedRow.Item.CODE);
            $("#MdlSecim").modal('hide');
        }

        ModalTip = "";
    }
    $scope.BtnModalKapat = function()
    {
        if(ModalTip == "Cari")
        {
            $("#MdlSecim").modal('hide');
        }
        ModalTip = "";
    }
    $scope.BtnModalSecim = function(pTip)
    {
        ModalTip = pTip;
        
        if(ModalTip == "Cari")
        {
            let TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT [CODE],[NAME] FROM [CUSTOMERS]"
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                TblSecimInit(Data);
                $("#MdlSecim").modal('show');
            });
        }
    }
}