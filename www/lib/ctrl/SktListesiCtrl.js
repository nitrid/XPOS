function SktListesiCtrl ($scope,$window,db)
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
    function TblSktInit()
    {
        $("#TblSkt").dxDataGrid(
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
                    dataField: "BARCODE",
                    caption : db.Language($scope.Lang,"BARKOD"),
                    dataType : "string",
                },
                {
                    dataField: "ITEM_CODE",
                    caption : db.Language($scope.Lang,"KODU"),
                    dataType : "string",
                },
                {
                    dataField: "ITEM_NAME",
                    caption : db.Language($scope.Lang,"ÜRÜN ADI"),
                    dataType : "string",
                },
                {
                    dataField: "CUSTOMER_CODE",
                    caption : db.Language($scope.Lang,"TEDARİKÇİ KODU"),
                    dataType : "string",
                },
                {
                    dataField: "CUSTOMER_NAME",
                    caption : db.Language($scope.Lang,"TEDARİKÇİ ADI"),
                    dataType : "string",
                },
                {
                    dataField: "CUSTOMER_ITEM_CODE",
                    caption : db.Language($scope.Lang,"TEDARİKÇİ ÜRÜN ADI"),
                    dataType : "string",
                },
                {
                    dataField: "QUANTITY",
                    caption : db.Language($scope.Lang,"MİKTAR"),
                    dataType : "number",
                },
                {
                    dataField: "EXP_DATE",
                    caption : db.Language($scope.Lang,"SKT"),
                    dataType : "date",
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

        TblSktInit();

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
    $scope.BtnAra = async function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT " +
                    "*, " +
                    "ISNULL((SELECT PATH FROM LABEL_DESIGN WHERE TAG = '13'),'') AS PATH, " +
                    "ISNULL((SELECT TOP 1 BARCODE FROM ITEM_BARCODE WHERE ITEM_BARCODE.ITEM_CODE = ITEM_EXPDATE.ITEM_CODE ORDER BY LDATE DESC),'') AS BARCODE, " +
                    "ISNULL((SELECT TOP 1 CUSTOMER_CODE FROM ITEM_CUSTOMER WHERE ITEM_CUSTOMER.ITEM_CODE = ITEM_EXPDATE.ITEM_CODE),'') AS CUSTOMER_CODE, " +
                    "ISNULL((SELECT TOP 1 ISNULL((SELECT TOP 1 NAME FROM CUSTOMERS WHERE CODE = CUSTOMER_CODE),'') FROM ITEM_CUSTOMER WHERE ITEM_CUSTOMER.ITEM_CODE = ITEM_EXPDATE.ITEM_CODE),'') AS CUSTOMER_NAME, " +
                    "ISNULL((SELECT TOP 1 CUSTOMER_ITEM_CODE FROM ITEM_CUSTOMER WHERE ITEM_CUSTOMER.ITEM_CODE = ITEM_EXPDATE.ITEM_CODE),'') AS CUSTOMER_ITEM_CODE, " +
                    "ISNULL((SELECT NAME FROM ITEMS WHERE CODE = ITEM_CODE),'') AS ITEM_NAME, " +
                    "ISNULL((SELECT TOP 1 COST_PRICE * ((VAT / 100) + 1) FROM ITEMS WHERE CODE = ITEM_CODE),0) AS PRICE, " +
                    "ISNULL((SELECT TOP 1 COST_PRICE * (VAT / 100) FROM ITEMS WHERE CODE = ITEM_CODE),0) AS VAT, " +
                    "ISNULL((SELECT TOP 1 COST_PRICE * ((VAT / 100) + 1) FROM ITEMS WHERE CODE = ITEM_CODE),0) * QUANTITY AS AMOUNT " +
                    "FROM ITEM_EXPDATE WHERE EXP_DATE >= @ILKTARIH AND EXP_DATE <= @SONTARIH ORDER BY EXP_DATE ASC",
            param:  ['ILKTARIH','SONTARIH'],
            type:   ['date','date'],
            value:  [moment(StartDate).format("DD.MM.YYYY"),moment(EndDate).format("DD.MM.YYYY")]            
        }
        
        let TmpData = await db.GetPromiseQuery(TmpQuery)
        $scope.Data = TmpData;
        
        TblSktInit();
    }
    $scope.BtnPrint = function()
    {
        if($scope.Data.length > 0)
        {
            console.log("{TYPE:'REVIEW',PATH:'" + pData[0].PATH.replaceAll('\\','/') + "',DATA:" + JSON.stringify(pData) + "}")
            db.Emit('DevPrint',"{TYPE:'REVIEW',PATH:'" + pData[0].PATH.replaceAll('\\','/') + "',DATA:" + JSON.stringify($scope.Data) + "}",(pResult)=>
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
    }
}