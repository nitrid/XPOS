function FaturaListesiCtrl ($scope,db)
{
    let StartDate = moment();
    let EndDate = moment();
    let RefSelectedData = [];

    $('#Date').on('apply.daterangepicker', function(ev, picker) 
    {
        StartDate = picker.startDate;
        EndDate = picker.endDate;
    });
    function DateTitle(start, end) 
    {
        $('#Date span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }
    function TblFaturaListeInit()
    {
        $("#TblFaturaListe").dxDataGrid(
        {
            dataSource: $scope.FaturaListe,
            allowColumnReordering: true,
            allowColumnResizing: true,
            showBorders: true,
            columnResizingMode: "nextColumn",
            columnMinWidth: 50,
            columnAutoWidth: true,
            filterRow: 
            {
                visible: true,
                applyFilter: "auto"
            },
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
                mode: "multiple"
            },
            export: 
            {
                enabled: true,
                allowExportSelectedData: true
            },
            onExporting: function(e) 
            {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('INVOICE');
                
                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function() {
                    workbook.xlsx.writeBuffer().then(function(buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'INVOICE.xlsx');
                    });
            });
            e.cancel = true;
            },
            columns: 
            [
                {
                    dataField: "DOC_DATE",
                    caption : db.Language($scope.Lang,"DATE"),
                    dataType: "datetime",
                    format: 'dd/MM/yyyy',
                },
                {
                    dataField: "REF",
                    caption : db.Language($scope.Lang,"REF"),
                    dataType : "string",
                },
                {
                    dataField: "REF_NO",
                    caption : db.Language($scope.Lang,"REF NO"),
                    dataType : "string",
                },
                {
                    dataField: "CUSTOMER_NAME",
                    caption : db.Language($scope.Lang,"CUSTOMER"),
                    dataType : "string",
                },
                {
                    dataField: "TOTAL",
                    caption : db.Language($scope.Lang,"TOTAL"),
                    dataType : "number",
                    format: 
                    {
                        type: "fixedPoint",
                        precision: 2
                    }
                }
            ],
            summary: 
            {
                totalItems: 
                [
                    {
                        column: "TOTAL",
                        summaryType: "sum",
                        valueFormat: {
                            type: "fixedPoint",
                            precision: 2
                        },
                        displayFormat: "{0} €",
                    }
                ]
            },
            onRowDblClick: function(e)
            {
                if(typeof e.data.REF != 'undefined')
                {                 
                    if($scope.Tip == 0)
                    {
                        window.location.href = "#!FiyatFarkiEvrak?REF=" + e.data.REF + "&REF_NO=" + e.data.REF_NO;    
                    }   
                    else if($scope.Tip == 1)
                    {
                        window.location.href = "#!IadeEvrak?REF=" + e.data.REF + "&REF_NO=" + e.data.REF_NO; 
                    }
                    else if($scope.Tip == 2)
                    {
                        window.location.href = "#!FireEvrak?REF=" + e.data.REF + "&REF_NO=" + e.data.REF_NO; 
                    }
                }
            },
            onSelectionChanged: function(selectedItems) 
            {
                RefSelectedData = selectedItems.selectedRowsData;
            }
        });
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
        
        TblFaturaListeInit();

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

        $scope.Tip = "";

        $scope.FaturaListe = [];

        $scope.CmbTip = 
        {
            width: "100%",
            dataSource: [{CODE:"0",NAME: (db.Language($scope.Lang,"Fiyat Farkı"))},{CODE:"1",NAME: (db.Language($scope.Lang,"İade"))},{CODE:"2",NAME: (db.Language($scope.Lang,"Fire"))},{CODE:"3",NAME: (db.Language($scope.Lang,"Şubeler Arası Satış"))}],
            displayExpr: "NAME",
            valueExpr: "CODE",
            value: "",
            showClearButton: true,
            searchEnabled: true,
            bindingOptions: 
            {
                value: "Tip"
            },
            onSelectionChanged : function(e)
            {
                if(e.selectedItem == null)
                {
                    $scope.Tip = ""
                }
            }
        }
    }
    $scope.BtnAra = async function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT * FROM INVOICE_M_VW_01 WHERE TYPE = 1 AND DOC_TYPE = @DOC_TYPE AND DOC_DATE >= @FIRST_DATE AND DOC_DATE <= @LAST_DATE" ,
            param : ["DOC_TYPE:int","FIRST_DATE:date","LAST_DATE:date"],
            value : [$scope.Tip,moment(StartDate).format("DD.MM.YYYY"),moment(EndDate).format("DD.MM.YYYY")]
        }
        $scope.FaturaListe = await db.GetPromiseQuery(TmpQuery)
        TblFaturaListeInit()
    }
    $scope.BtnSil = function()
    {
        alertify.confirm(db.Language($scope.Lang,'Seçili Satırı Silmek İstediğinize Eminmisiniz ?'), 
        async function()
        { 
            for (let i = 0; i < RefSelectedData.length; i++) 
            {
                await db.ExecutePromiseTag($scope.Firma,'FaturaEvrakDelete',[1,RefSelectedData[i].DOC_TYPE,RefSelectedData[i].REF,RefSelectedData[i].REF_NO]);
            }

            $scope.BtnAra();
        },
        function(){});
    }
    $scope.BtnPrint = function()
    {
        let TmpDesign = "";
        if($scope.Tip == '0')
        {
            TmpDesign = "10";
        }
        else if($scope.Tip == '1')
        {
            TmpDesign = "11";
        }
        else if($scope.Tip == '2')
        {
            TmpDesign = "12";
        }
        else if($scope.Tip == '3')
        {
            TmpDesign = "16";
        }

        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT *, " + 
                    "ISNULL((SELECT PATH FROM LABEL_DESIGN WHERE TAG = @DESIGN),'') AS PATH, " +
                    "ISNULL((SELECT TOP 1 COST_PRICE FROM ITEMS WHERE CODE = INVOICE_VW_01.ITEM_CODE),0) AS COST_PRICE, " + 
                    "ISNULL((SELECT CUSTOMER_ITEM_CODE FROM ITEM_CUSTOMER WHERE ITEM_CUSTOMER.ITEM_CODE = INVOICE_VW_01.ITEM_CODE AND ITEM_CUSTOMER.CUSTOMER_CODE = INVOICE_VW_01.CUSTOMER),'') AS CUSTOMER_ITEM_CODE " +
                    "FROM INVOICE_VW_01 " +
                    "LEFT OUTER JOIN CUSTOMER_ADRESS ON " + 
                    "CUSTOMER_ADRESS.CUSTOMER = INVOICE_VW_01.CUSTOMER " +
                    "WHERE INVOICE_VW_01.TYPE = @TYPE AND INVOICE_VW_01.DOC_TYPE = @DOC_TYPE AND INVOICE_VW_01.REF = @REF AND INVOICE_VW_01.REF_NO = @REF_NO",
            param:  ['TYPE','DOC_TYPE','REF','REF_NO','DESIGN'],
            type:   ['int','int','string|25','int','string|25','string|25'],
            value:  [RefSelectedData[0].TYPE,RefSelectedData[0].DOC_TYPE,RefSelectedData[0].REF,RefSelectedData[0].REF_NO,TmpDesign]
        }
        db.GetDataQuery(TmpQuery,function(pData)
        {
            if(pData.length > 0)
            {
                console.log("{TYPE:'REVIEW',PATH:'" + pData[0].PATH.replaceAll('\\','/') + "',DATA:" + JSON.stringify(pData) + "}")
                db.Emit('DevPrint',"{TYPE:'REVIEW',PATH:'" + pData[0].PATH.replaceAll('\\','/') + "',DATA:" + JSON.stringify(pData) + "}",(pResult) =>
                {
                    if(pResult.split('|')[0] != 'ERR')
                    {
                        var mywindow = window.open('printview.html','_blank',"width=900,height=1000,left=500");      
                        mywindow.onload = function() 
                        {
                            mywindow.document.getElementById("view").innerHTML="<iframe src='data:application/pdf;base64," + pResult.split('|')[1] + "' type='application/pdf' width='100%' height='100%'></iframe>"      
                        }   
                    }
                })
            }
        });
    }
}