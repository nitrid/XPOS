function PosSatisRaporCtrl ($scope,$window,db)
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
            showBorders: true,
            showColumnGrandTotals: false,
            showRowGrandTotals: true,
            showRowTotals: true,
            showColumnTotals: false,
            fieldChooser: 
            {
                enabled: true,
                height: 400
            },
            dataSource: 
            {
                fields: 
                [
                    {
                        caption: "TARIH",
                        width: 120,
                        dataField: "DOC_DATE",
                        area: "row",
                        expanded: true
                    }, 
                    {
                        caption: "KASA",
                        dataField: "DEVICE",
                        width: 150,
                        area: "row",
                        expanded: true
                    },
                    {
                        caption: "TIP",
                        width: 120,
                        dataField: "TYPE",
                        area: "row",
                        expanded: true
                    }, 
                    {
                        dataField: "TITLE",
                        caption: "TITLE",
                        width: 150,
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
                        caption: "TVA",
                        dataField: "TVA",
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
                    },
                    {
                        caption: "",
                        dataField: "TITLE_BLANK",
                        dataType: "string",
                        summaryType: "max",
                        area: "data"
                    },
                    {
                        caption: "Espece",
                        dataField: "Espece",
                        dataType: "number",
                        summaryType: "sum",
                        format: 
                        {
                            style: "currency", currency: "EUR",
                        },
                        area: "data"
                    },
                    {
                        caption: "Carte B. TPE",
                        dataField: "Carte Bancaire TPE",
                        dataType: "number",
                        summaryType: "sum",
                        format: 
                        {
                            style: "currency", currency: "EUR",
                        },
                        area: "data"
                    },
                    {
                        caption: "Cheque",
                        dataField: "Cheque",
                        dataType: "number",
                        summaryType: "sum",
                        format: 
                        {
                            style: "currency", currency: "EUR",
                        },
                        area: "data"
                    },
                    {
                        caption: "CHEQUEe",
                        dataField: "CHEQUEe",
                        dataType: "number",
                        summaryType: "sum",
                        format: 
                        {
                            style: "currency", currency: "EUR",
                        },
                        area: "data"
                    },
                    {
                        caption: "Bon D'Avoir",
                        dataField: "Bon D''Avoir",
                        dataType: "number",
                        summaryType: "sum",
                        format: 
                        {
                            style: "currency", currency: "EUR",
                        },
                        area: "data"
                    },
                ],
                store: $scope.SaleData
            },
            export: 
            {
                enabled: true
            },
            onCellPrepared: function(e) 
            {        
                if(e.cell.text == 'Espece' || e.cell.text == 'Carte B. TPE' || e.cell.text == 'Cheque' || e.cell.text == 'CHEQUEe' || e.cell.text == "Bon D'Avoir")
                {
                    e.cellElement.css("font-weight", "bold") 
                }
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
    function InitReportPaymentPivot()
    {
        $("#paymentgrid").dxPivotGrid(
        {
            allowSortingBySummary: true,
            allowFiltering: true,
            showBorders: true,
            showColumnGrandTotals: false,
            showRowGrandTotals: true,
            showRowTotals: true,
            showColumnTotals: false,
            fieldChooser: 
            {
                enabled: true,
                height: 400
            },
            dataSource: 
            {
                fields: 
                [
                    {
                        caption: "TARIH",
                        dataField: "DOC_DATE",
                        width: 120,                        
                        area: "row",
                        expanded: true
                    },  
                    {
                        caption: "KASA",
                        dataField: "DEVICE",
                        width: 120,                        
                        area: "row",
                        expanded: true
                    },     
                    {
                        caption: "TİP",
                        dataField: "PAY_TYPE",
                        width: 120,                        
                        area: "row",
                        expanded: true
                    },                     
                    {
                        dataField: "TITLE",
                        caption: "TITLE",
                        width: 150,
                        area: "column"
                    },
                    {
                        caption: "TUTAR",
                        dataField: "PAY_AMOUNT",
                        dataType: "number",
                        summaryType: "sum",
                        format: 
                        {
                            style: "currency", currency: "EUR",
                        },
                        area: "data"
                    },
                    {
                        caption: "ADET",
                        dataField: "PAY_AMOUNT",
                        dataType: "number",
                        summaryType: "count",
                        area: "data"
                    },
                    {
                        caption: "TICKET",
                        dataField: "TICKET",
                        dataType: "number",
                        summaryType: "max",
                        area: "data"
                    }
                ],
                store: $scope.PaymentData
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
    $scope.Init = function()
    {
        $('#Date').daterangepicker(
        {
            startDate: StartDate,
            endDate: EndDate,
            alwaysShowCalendars: true,
            ranges: 
            {
                'Bugün': [moment(), moment()],
                'Dün': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Bu Hafta' : [moment().startOf('week'), moment().endOf('week')],
                'Geçen Hafta': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
                'Bu Ay': [moment().startOf('month'), moment().endOf('month')],
                'Geçen Ay': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'Bu Yıl': [moment().startOf('year'), moment().endOf('year')],
                'Geçen Yıl': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
            }
        }, DateTitle);

        DateTitle(StartDate, EndDate);      

        // InitReportPivot();          
        $scope.SaleData = [];
        $scope.PaymentData = [];

        $scope.BtnRunReport()
    }
    $scope.BtnRunReport = async function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT " +
                    "CONVERT(NVARCHAR,MAX(SALES.DOC_DATE),103) AS DOC_DATE," +
                    "MAX(SALES.DEVICE) AS DEVICE," +
                    "CASE WHEN SALES.TYPE = 0 THEN 'VENTE' ELSE 'REMBOURSEMENT' END AS TYPE," +
                    "'DETAILLE' AS TITLE, " +
                    "CASE WHEN SALES.TYPE = 0 THEN ROUND(SUM(SALES.HT),2) ELSE ROUND(SUM(SALES.HT) * -1,2) END AS HT, " +
                    "CASE WHEN SALES.TYPE = 0 THEN ROUND(SUM(SALES.TVA),2) ELSE ROUND(SUM(SALES.TVA) * -1,2) END AS TVA," +
                    "CASE WHEN SALES.TYPE = 0 THEN ROUND(SUM(SALES.TTC),2) ELSE ROUND(SUM(SALES.TTC) * -1,2) END AS TTC, " +
                    "'' AS TITLE_BLANK, " + 
                    "ISNULL((SELECT CASE WHEN MAX(DOC_TYPE) = 0 THEN SUM(AMOUNT) ELSE SUM(AMOUNT) * -1 END FROM POS_PAYMENT_VW_01 AS PAYMENT WHERE PAYMENT.REF = SALES.REF AND PAYMENT.REF_NO = SALES.REF_NO AND PAYMENT.DOC_TYPE = SALES.TYPE AND PAYMENT.TYPE = 0 AND PAYMENT.STATUS = 1),0) AS [Espece], " + 
                    "ISNULL((SELECT SUM(AMOUNT) FROM POS_PAYMENT_VW_01 AS PAYMENT WHERE PAYMENT.REF = SALES.REF AND PAYMENT.REF_NO = SALES.REF_NO AND PAYMENT.DOC_TYPE = SALES.TYPE AND PAYMENT.TYPE = 1 AND PAYMENT.STATUS = 1),0) AS [Carte Bancaire TPE], " + 
                    "ISNULL((SELECT SUM(AMOUNT) FROM POS_PAYMENT_VW_01 AS PAYMENT WHERE PAYMENT.REF = SALES.REF AND PAYMENT.REF_NO = SALES.REF_NO AND PAYMENT.DOC_TYPE = SALES.TYPE AND PAYMENT.TYPE = 2 AND PAYMENT.STATUS = 1),0) AS [Cheque], " + 
                    "ISNULL((SELECT SUM(AMOUNT) FROM POS_PAYMENT_VW_01 AS PAYMENT WHERE PAYMENT.REF = SALES.REF AND PAYMENT.REF_NO = SALES.REF_NO AND PAYMENT.DOC_TYPE = SALES.TYPE AND PAYMENT.TYPE = 3 AND PAYMENT.STATUS = 1),0) AS [CHEQUEe], " + 
                    "ISNULL((SELECT CASE WHEN MAX(DOC_TYPE) = 0 THEN SUM(AMOUNT) ELSE SUM(AMOUNT) * -1 END FROM POS_PAYMENT_VW_01 AS PAYMENT WHERE PAYMENT.REF = SALES.REF AND PAYMENT.REF_NO = SALES.REF_NO AND PAYMENT.DOC_TYPE = SALES.TYPE AND PAYMENT.TYPE = 4 AND PAYMENT.STATUS = 1),0) AS [Bon D''Avoir] " + 
                    "FROM POS_SALES_VW_01 AS SALES " +
                    "WHERE SALES.DOC_DATE >= @ILKTARIH AND SALES.DOC_DATE <= @SONTARIH AND SALES.STATUS = 1 " +
                    "GROUP BY SALES.REF,SALES.REF_NO,SALES.TYPE ORDER BY REF_NO",
            param:  ['ILKTARIH','SONTARIH'],
            type:   ['date','date'],
            value:  [moment(StartDate).format("DD.MM.YYYY"),moment(EndDate).format("DD.MM.YYYY")]            
        }
        
        let TmpData = await db.GetPromiseQuery(TmpQuery)
        $scope.SaleData = TmpData;

        TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT " +
                    "PAYMENT.REF, " +
                    "PAYMENT.REF_NO, " +
                    "MAX(PAYMENT.DEVICE) AS DEVICE, " +
                    "'' AS TITLE, " +
                    "(SELECT COUNT(REF_NO) FROM (SELECT P1.REF_NO FROM POS_PAYMENT_VW_01 AS P1 WHERE P1.DOC_DATE >= @ILKTARIH AND P1.DOC_DATE <= @SONTARIH AND P1.STATUS = 1 AND P1.REF = PAYMENT.REF GROUP BY P1.REF,P1.REF_NO) AS TBL) AS TICKET, " +
                    "CONVERT(NVARCHAR,MAX(PAYMENT.DOC_DATE),103) AS DOC_DATE, " +
                    "MAX(PAYMENT.TYPE_NAME) AS PAY_TYPE, " +
                    "SUM(PAYMENT.AMOUNT) AS PAY_AMOUNT " +
                    "FROM POS_PAYMENT_VW_01 AS PAYMENT " +
                    "WHERE PAYMENT.DOC_DATE >= @ILKTARIH AND PAYMENT.DOC_DATE <= @SONTARIH AND PAYMENT.STATUS = 1 " +
                    "GROUP BY PAYMENT.REF,PAYMENT.REF_NO,PAYMENT.TYPE ",
            param:  ['ILKTARIH','SONTARIH'],
            type:   ['date','date'],
            value:  [moment(StartDate).format("DD.MM.YYYY"),moment(EndDate).format("DD.MM.YYYY")]            
        }
        
        TmpData = await db.GetPromiseQuery(TmpQuery)
        $scope.PaymentData = TmpData;

        InitReportPivot();
        InitReportPaymentPivot();
    }
}