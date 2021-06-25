function PosSatisGrupRaporCtrl ($scope,$window,db)
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
    function InitReportPivot()
    {
        $("#salesgrid").dxPivotGrid(
        {
            allowSortingBySummary: true,
            allowFiltering: true,
            showColumnGrandTotals: false,
            showRowGrandTotals: true,
            showRowTotals: true,
            showColumnTotals: false,
            showBorders: true,
            height: 800,            
            fieldChooser: 
            {
                enabled: true,
                height: 400
            },
            dataSource: 
            {
                retrieveFields: false,
                fields: 
                [
                    {
                        caption: "GRUP ADI",
                        dataField: "ITEM_GRP_NAME",
                        width: 250,
                        area: "row",
                    },
                    {
                        dataField: "TITLE",
                        caption: "TITLE",
                        width: 80,
                        area: "column"
                    },
                    {
                        caption: "HT",
                        dataField: "HT",
                        dataType: "number",
                        summaryType: "sum",
                        format: 
                        {
                            style: "currency", currency: "EUR",
                        },
                        area: "data"
                    },
                    {
                        caption: "TTC",
                        dataField: "TTC",
                        dataType: "number",
                        summaryType: "sum",
                        format: 
                        {
                            style: "currency", currency: "EUR",
                        },
                        area: "data"
                    }
                ],
                store: $scope.SaleData
            },
            export: 
            {
                enabled: true
            },
            onCellPrepared: function(e) 
            {        
                if(e.cell.columnType === "GT" || e.cell.rowType === "GT")
                {
                    e.cellElement.css("backgroundColor", "#ea863e")
                    e.cellElement.css("font-weight", "bold") 
                    e.cellElement.css("color", "white") 
                }
                if(e.cell.columnType === "T" || e.cell.rowType === "T")
                {
                    e.cellElement.css("backgroundColor", "#488ce4")
                    e.cellElement.css("font-weight", "bold") 
                    e.cellElement.css("color", "white") 
                }                    
            },
            onExporting: function(e) 
            {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('Sales');
                
                DevExpress.excelExporter.exportPivotGrid(
                {
                    component: e.component,
                    worksheet: worksheet
                }).then(function() 
                {
                    workbook.xlsx.writeBuffer().then(function(buffer) 
                    {
                        //DOSYA ADINA İLERİDE FİRMA ADI EKLENECEK
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Detaille Ventes.xlsx');
                    });
                });
                e.cancel = true;
            }
        })
    }
    $scope.Init =function()
    {                
        if(typeof localStorage.Lang != 'undefined')
        {
            $scope.Lang = localStorage.Lang;
        }
        else
        {
            $scope.Lang = "TR";
        }

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

        // InitReportPivot();          
        $scope.SaleData = [];
        $scope.PaymentData = [];
        $scope.PayDetailData = [];

        $scope.BtnRunReport()
    }
    $scope.BtnRunReport = async function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT " +
                    "ISNULL(ITEM_GRP,'') AS ITEM_GRP, " +
                    "ISNULL((SELECT NAME FROM ITEM_GROUP WHERE CODE = ITEM_GRP),'') AS ITEM_GRP_NAME, " +
                    "'' AS TITLE, " +
                    "CASE WHEN SALES.TYPE = 0 THEN SUM(SALES.HT) ELSE SUM(SALES.HT) * -1 END AS HT, " +
                    "CASE WHEN SALES.TYPE = 0 THEN SUM(SALES.TTC) ELSE SUM(SALES.TTC) * -1 END AS TTC " +
                    "FROM POS_SALES_VW_01 AS SALES " +
                    "LEFT OUTER JOIN ITEMS ON " +
                    "SALES.ITEM_CODE = ITEMS.CODE " +
                    "WHERE SALES.DOC_DATE >= @ILKTARIH AND SALES.DOC_DATE <= @SONTARIH AND SALES.STATUS = 1 " +
                    "GROUP BY ITEM_GRP,SALES.[TYPE] ORDER BY ITEM_GRP",
            param:  ['ILKTARIH','SONTARIH'],
            type:   ['date','date'],
            value:  [moment(StartDate).format("DD.MM.YYYY"),moment(EndDate).format("DD.MM.YYYY")]            
        }
        
        let TmpData = await db.GetPromiseQuery(TmpQuery)
        $scope.SaleData = TmpData;
console.log(TmpData)
        InitReportPivot();
    }
}