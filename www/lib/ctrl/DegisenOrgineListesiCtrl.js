function DegisenOrgineListesiCtrl ($scope,$window,db)
{
    let StartDate = moment();
    let EndDate = moment();

    $('#Date').on('apply.daterangepicker', function(ev, picker) 
    {
        StartDate = picker.startDate;
        EndDate = picker.endDate;
    });
    function DateTitle(start, end) 
    {
        $('#Date span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }
    function TblOrgineInit()
    {
        $("#TblOrgine").dxDataGrid(
        {
            dataSource: $scope.Data,
            allowColumnReordering: true,
            allowColumnResizing: true,
            showBorders: true,
            columnResizingMode: "nextColumn",
            columnMinWidth: 50,
            columnAutoWidth: true,
            headerFilter: 
            {
                visible: true
            },
            paging: 
            {
                pageSize: 50
            },
            pager: 
            {
                showPageSizeSelector: true,
                allowedPageSizes: [25, 50, 100, 200, 500, 1000],
                showInfo: true
            },
            selection: 
            {
                mode: "single"
            },
            columns: 
            [
                {
                    dataField: "CODE",
                    caption : db.Language($scope.Lang,"KODU"),
                    dataType : "string",
                },
                {
                    dataField: "NAME",
                    caption : db.Language($scope.Lang,"ÜRÜN ADI"),
                    dataType : "string",
                },
                {
                    dataField: "ORGINS",
                    caption : db.Language($scope.Lang,"ORGINS"),
                    dataType : "string",
                }
            ],
            onRowPrepared: function (rowInfo) 
            {  
                if(typeof rowInfo.data != 'undefined')
                {
                    if(rowInfo.data.STATUS == false)
                    {
                        rowInfo.rowElement.css('background', '#dce1e2');
                    }
                   
                }
            }
        });
    }
    $scope.Init = async function()
    {
        $scope.Kullanici = $window.sessionStorage.getItem('User');
        $scope.Firma = 'PIQPOS'     

        $scope.Data = [];
        $scope.GrupList = [];

        $scope.Grup = "";

        $scope.GrupGetir();
        $scope.CmbGrup = 
        {
            width: "100%",
            displayExpr: "NAME",
            valueExpr: "CODE",
            value: "",
            showClearButton: true,
            searchEnabled: true,
            bindingOptions: 
            {
                value: 'Grup',
                dataSource: 
                {
                    deep: true,
                    dataPath: 'GrupList'
                }
            },
            onSelectionChanged : function(e)
            {
                if(e.selectedItem == null)
                {
                    $scope.Grup = ""
                }
            }
        }
        TblOrgineInit();

        $('#Date').daterangepicker(
            {
                startDate: StartDate,
                endDate: EndDate,
                alwaysShowCalendars: true,
                ranges: 
                {
                    [db.Language($scope.Lang,"Bugün")] : [moment(), moment()],
                    [db.Language($scope.Lang,"Dün")]: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    [db.Language($scope.Lang,"Bu Hafta")] : [moment().startOf('week'), moment().endOf('week')],
                    [db.Language($scope.Lang,"Geçen Hafta")]: [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
                    [db.Language($scope.Lang,"Bu Ay")]: [moment().startOf('month'), moment().endOf('month')],
                    [db.Language($scope.Lang,"Geçen Ay")]: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                    [db.Language($scope.Lang,"Bu Yıl")]: [moment().startOf('year'), moment().endOf('year')],
                    [db.Language($scope.Lang,"Geçen Yıl")]: [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
                }
            }, DateTitle);
        
            DateTitle(StartDate, EndDate);     
    }
    $scope.GrupGetir = function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT [NAME],[CODE] FROM ITEM_GROUP"
        }
        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.GrupList = Data
        });
    }
    $scope.BtnAra = async function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT " +
                    "CODE AS CODE, " +
                    "NAME AS NAME, " +
                    "ISNULL((SELECT NAME FROM COUNTRY WHERE CODE = ORGINS),'') AS ORGINS " +
                    "FROM ITEMS WHERE ITEM_GRP = '017' AND LDATE >= @ILKTARIH AND LDATE <= @SONTARIH",
            param:  ['ITEM_GRP','ILKTARIH','SONTARIH'],
            type:   ['string|25','date','date'],
            value:  [$scope.Grup,moment(StartDate).format("DD.MM.YYYY"),moment(EndDate).format("DD.MM.YYYY")]            
        }
        
        let TmpData = await db.GetPromiseQuery(TmpQuery)
        $scope.Data = TmpData;
        
        TblOrgineInit();
    }
}