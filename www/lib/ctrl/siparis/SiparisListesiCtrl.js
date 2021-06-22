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
        TblSiparisListeInit();

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
}