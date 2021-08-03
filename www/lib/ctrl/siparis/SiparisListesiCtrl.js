function SiparisListesiCtrl ($scope,db)
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
    function TblSiparisListeInit()
    {
        $("#TblSiparisListe").dxDataGrid(
        {
            dataSource: $scope.SiparisListe,
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
                var worksheet = workbook.addWorksheet('ORDER');
                
                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function() {
                    workbook.xlsx.writeBuffer().then(function(buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ORDER.xlsx');
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
                    dataField: "DOC_FROM_NAME",
                    caption : db.Language($scope.Lang,"CUSTOMER"),
                    dataType : "string",
                },
                {
                    dataField: "TOTAL",
                    caption : db.Language($scope.Lang,"TOTAL"),
                    dataType : "string",
                }
            ],
            onRowDblClick: function(e)
            {
                if(typeof e.data.REF != 'undefined')
                {                    
                    window.location.href = "#!VerilenSiparisEvrak?REF=" + e.data.REF + "&REF_NO=" + e.data.REF_NO;
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
        
        TblSiparisListeInit();

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

        $scope.Tedarikci = "";

        $scope.TedaikciListe = [];
        $scope.SiparisListe = [];

        $scope.CmbTedarikci = 
        {
            width: "100%",
            displayExpr: "NAME",
            valueExpr: "CODE",
            value: "",
            showClearButton: true,
            searchEnabled: true,
            bindingOptions: 
            {
                value: "Tedarikci",
                dataSource: 
                {
                    deep: true,
                    dataPath: 'TedarikciData'
                }
            },
            onSelectionChanged : function(e)
            {
                if(e.selectedItem == null)
                {
                    $scope.Tedarikci = ""
                }
            }
        }

        $scope.TedarikciGetir();
    }
    $scope.TedarikciGetir = function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT CODE,NAME FROM CUSTOMERS WHERE TYPE = 1 ORDER BY NAME ASC"
        }
        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.TedarikciData = Data
        });
    } 
    $scope.BtnAra = async function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT * FROM ORDER_M_VW_01 WHERE TYPE = 0 AND DOC_TYPE = 0 AND DOC_DATE >= @FIRST_DATE AND DOC_DATE <= @LAST_DATE AND ((DOC_FROM = @DOC_FROM) OR (@DOC_FROM = ''))" ,
            param : ["FIRST_DATE:date","LAST_DATE:date","DOC_FROM:string|25"],
            value : [moment(StartDate).format("DD.MM.YYYY"),moment(EndDate).format("DD.MM.YYYY"),$scope.Tedarikci]
        }
        $scope.SiparisListe = await db.GetPromiseQuery(TmpQuery)
        TblSiparisListeInit()
    }
    $scope.BtnSil = function()
    {
        alertify.confirm(db.Language($scope.Lang,'Seçili Satırı Silmek İstediğinize Eminmisiniz ?'), 
        async function()
        { 
            for (let i = 0; i < RefSelectedData.length; i++) 
            {
                await db.ExecutePromiseTag($scope.Firma,'SiparisEvrakDelete',[1,RefSelectedData[i].DOC_TYPE,RefSelectedData[i].REF,RefSelectedData[i].REF_NO]);
            }

            $scope.BtnAra();
        },
        function(){});
    }
    $scope.BtnPrint = function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT *, " +
                    "ISNULL((SELECT CUSTOMER_ITEM_CODE FROM ITEM_CUSTOMER WHERE ITEM_CUSTOMER.ITEM_CODE = ORDER_VW_01.ITEM_CODE AND ITEM_CUSTOMER.CUSTOMER_CODE = DOC_FROM),'') AS CUSTOMER_ITEM_CODE " +
                    "FROM ORDER_VW_01 " +
                    "WHERE TYPE = @TYPE AND DOC_TYPE = @DOC_TYPE AND REF = @REF AND REF_NO = @REF_NO",
            param:  ['TYPE','DOC_TYPE','REF','REF_NO'],
            type:   ['int','int','string|25','int','string|25'],
            value:  [RefSelectedData[0].TYPE,RefSelectedData[0].DOC_TYPE,RefSelectedData[0].REF,RefSelectedData[0].REF_NO]
        }
        db.GetDataQuery(TmpQuery,function(pData)
        {
            if(pData.length > 0)
            {
                console.log("{TYPE:'REVIEW',PATH:'D:/Piqpos/devprint/repx/ProdorPlus/commande/Siparis.repx',DATA:" + JSON.stringify(pData) + "}")
                db.Emit('DevPrint',"{TYPE:'REVIEW',PATH:'D:/Piqpos/devprint/repx/ProdorPlus/commande/Siparis.repx',DATA:" + JSON.stringify(pData) + "}",(pResult)=>
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