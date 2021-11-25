function DegismisFisListesiCtrl ($scope,$window,db)
{
    let FisListeSelectedRow = null;
    function InitDegismisFisListesiGrid()
    {   
        $("#TblDegismisFisListesi").jsGrid({
            responsive: true,
            width: "100%",
            height: "550px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            sorting: true,
            data : $scope.DegismisFisListesi,
            fields: 
            [
            {
                name: "DOC_DATE",
                title: "DATE",
                type: "text",
                align: "center",
                width: 30
            },
            {
                name: "REF",
                title: "REF",
                type: "text",
                align: "center",
                width: 60
            },         
            {
                name: "REF_NO",
                title: "REF NO",
                type: "number",
                align: "center",
                width: 60
            },
            {
                name: "DESCRIPTION",
                title: "DESCRIPTION",
                type: "text",
                align: "center",
                width: 200
            }],
            rowClick: function(args)
            {
                FisListeSecimRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function FisListeSecimRowClick(pIndex,pItem,pObj)
    {    
        if ( FisListeSelectedRow ) { FisListeSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        FisListeSelectedRow = $row;
        $scope.FisListeSelectedIndex = pIndex;

        db.GetData($scope.Firma,'PosSonSatisDetayGetir',["1",pItem.REF,pItem.REF_NO,-1],function(pData)
        {  
            $scope.FisDetayList = pData;
            InitFisDetayGrid();
        });
        db.GetData($scope.Firma,'PosSonSatisTahDetayGetir',["1",pItem.REF,pItem.REF_NO,-1],function(pData)
        {              
            $scope.FisTahDetayList = pData;
            $("#TblFisTahDetay,#TblFisTahDetay").each(function()
            {
                $(this).jsGrid({data : $scope.FisTahDetayList});
            });
        });

        $("#TbDetay").addClass('active');
        $("#TbMain").removeClass('active');       
    }
    function InitFisDetayGrid()
    {
        $("#TblFisDetay").jsGrid({
            responsive: true,
            width: "100%",
            height: "450px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.FisDetayList,
            fields: 
            [
                {
                    name: "USERS",
                    title: db.Language($scope.Lang,"KULLANICI"),
                    type: "text",
                    align: "center",
                    width: 100
                },
                {
                    name: "BARCODE",
                    title: db.Language($scope.Lang,"BARKOD"),
                    type: "number",
                    align: "center",
                    width: 100
                },
                {
                    name: "NAME",
                    title: "NAME",
                    type: "TEXT",
                    align: "center",
                    width: 150
                },            
                {
                    name: "QUANTITY",
                    title: db.Language($scope.Lang,"MIKTAR"),
                    type: "number",
                    align: "center",
                    width: 50
                },
                {
                    name: "PRICE",
                    title: db.Language($scope.Lang,"FIYAT"),
                    type: "number",
                    align: "center",
                    width: 50
                },
                {
                    name: "AMOUNT",
                    title: db.Language($scope.Lang,"TUTAR"),
                    type: "number",
                    align: "center",
                    width: 50
                }
            ],
            rowClass : function(item,itemIndex)
            {
                let TmpStyle = ''

                if(item.UPDATE_PRICE != '')
                {
                    TmpStyle = 'bg-blue'
                }
                else if(item.STATUS == 1)
                {
                    TmpStyle = 'bg-green'
                }
                else if(item.STATUS < 0)
                {
                    TmpStyle = 'bg-red'
                }
                else if(item.STATUS == 0)
                {
                    TmpStyle = 'bg-yellow'
                }
                
                return TmpStyle
            }
        });
    }
    function InitFisTahDetayGrid()
    {
        $("#TblFisTahDetay,#TblFisTahDetay").each(function()
        {
            $(this).jsGrid({
                width: "100%",
                height: "200px",
                updateOnResize: true,
                heading: true,
                selecting: true,
                data : $scope.FisTahDetayList,
                fields: 
                [
                    {
                        name: "TYPE",
                        title: "TIP",
                        align: "center",
                        width: 75
                    },
                    {
                        name: "AMOUNT",
                        title: "AMOUNT",
                        type: "decimal",
                        align: "center",
                        width: 35
                    }
                ],
                rowClass : function(item,itemIndex)
                {                    
                    return item.STATUS == 1 ? 'bg-green' : 'bg-red'
                }
            });
        })
    }
    $scope.Init = function()
    {
        $scope.Kullanici = $window.sessionStorage.getItem('User');
        $scope.Sube = "1";

        $scope.Firma = 'PIQPOS';
        $scope.IlkTarih = moment(Date.now()).format("DD/MM/YYYY");
        $scope.SonTarih = moment(Date.now()).format("DD/MM/YYYY");
        $scope.FisTipi = "0";

        $scope.DegismisFisListesi = [];
        $scope.FisDetayList = [];
        $scope.FisTahDetayList = [];

        InitDegismisFisListesiGrid();
        InitFisDetayGrid();
        InitFisTahDetayGrid();
    }
    $scope.BtnDegismisFisListeGetir = async function()
    {
        let TmpQuery = {};
        
        if($scope.FisTipi == 0)
        {
            TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT " +
                        "CONVERT(NVARCHAR(10),CONVERT(NVARCHAR(10),MAX(LDATE),103)) AS DOC_DATE, " +
                        "REF AS REF, " +
                        "REF_NO AS REF_NO, " +
                        "MAX(DESCRIPTION) AS DESCRIPTION " +
                        "FROM POS_MASTER_EXTRA " +
                        "WHERE CONVERT(NVARCHAR(10),LDATE,112) >= @ILKTARIH AND CONVERT(NVARCHAR(10),LDATE,112) <= @SONTARIH AND TAG = 'PARK DESC' " + 
                        "GROUP BY REF, REF_NO",
                param:  ['ILKTARIH','SONTARIH'],
                type:   ['date','date'],
                value:  [$scope.IlkTarih,$scope.SonTarih]            
            }
        }
        else if($scope.FisTipi == 1)
        {
            TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT " +
                        "CONVERT(NVARCHAR(10),CONVERT(NVARCHAR(10),MAX(LDATE),103)) AS DOC_DATE, " +
                        "REF AS REF, " +
                        "REF_NO AS REF_NO, " +
                        "MAX(DESCRIPTION) AS DESCRIPTION " +
                        "FROM POS_MASTER_EXTRA " +
                        "WHERE CONVERT(NVARCHAR(10),LDATE,112) >= @ILKTARIH AND CONVERT(NVARCHAR(10),LDATE,112) <= @SONTARIH AND TAG = 'FULL DELETE' " +
                        "GROUP BY REF, REF_NO",
                param:  ['ILKTARIH','SONTARIH'],
                type:   ['date','date'],
                value:  [$scope.IlkTarih,$scope.SonTarih]            
            }
        }
        else if($scope.FisTipi == 2)
        {
            TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT " +
                        "CONVERT(NVARCHAR(10),CONVERT(NVARCHAR(10),MAX(LDATE),103)) AS DOC_DATE, " +
                        "REF AS REF, " +
                        "REF_NO AS REF_NO, " +
                        "MAX(DESCRIPTION) AS DESCRIPTION " +
                        "FROM POS_MASTER_EXTRA " +
                        "WHERE CONVERT(NVARCHAR(10),LDATE,112) >= @ILKTARIH AND CONVERT(NVARCHAR(10),LDATE,112) <= @SONTARIH AND TAG = 'ROW DELETE' " +
                        "GROUP BY REF, REF_NO",
                param:  ['ILKTARIH','SONTARIH'],
                type:   ['date','date'],
                value:  [$scope.IlkTarih,$scope.SonTarih]            
            }
        }
        else if($scope.FisTipi == 3)
        {
            TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT " +
                        "CONVERT(NVARCHAR(10),CONVERT(NVARCHAR(10),MAX(LDATE),103)) AS DOC_DATE, " +
                        "REF AS REF, " +
                        "REF_NO AS REF_NO, " +
                        "MAX(DESCRIPTION) AS DESCRIPTION " +
                        "FROM POS_MASTER_EXTRA " +
                        "WHERE CONVERT(NVARCHAR(10),LDATE,112) >= @ILKTARIH AND CONVERT(NVARCHAR(10),LDATE,112) <= @SONTARIH AND TAG = 'UPDATE PRICE' " +
                        "GROUP BY REF, REF_NO",
                param:  ['ILKTARIH','SONTARIH'],
                type:   ['date','date'],
                value:  [$scope.IlkTarih,$scope.SonTarih]            
            }
        }
        
        let TmpData = await db.GetPromiseQuery(TmpQuery)
        $scope.DegismisFisListesi = TmpData;

        InitDegismisFisListesiGrid();
    }
}