function MusteriPuanListesiCtrl ($scope,$window,db)
{
    let MusteriSecimSelectedRow = null;

    function InitMusteriSecim(pData)
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

        $("#TblMusteriSecim").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            filtering : true,
            data : pData,
            paging : true,
            pageSize: 20,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
                {
                    name: "CODE",
                    type: "text",
                    align: "center",
                    width: 100
                    
                },
                {
                    title: "NAME",
                    name: "NAME",
                    type: "text",
                    align: "center",
                    width: 300
                }
            ],
            rowClick: function(args)
            {
                MusteriSecimRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            },
            controller:db,
        });
    }
    function InitMusteriPuanListesiGrid()
    {
        $("#TblMusteriPuanListesi").dxDataGrid(
        {
            dataSource: $scope.MusteriPuanListesi,
            allowColumnReordering: true,
            showBorders: true,
            paging: 
            {
                enabled: true
            },
            selection: 
                {
                mode: "single"
            },
            columns: 
            [
                {
                    dataField: "CODE",
                    caption: "CODE",
                    dataType: "string"
                },
                {
                    dataField: "LAST_NAME",
                    caption: "LAST NAME",
                    dataType: "string"
                },
                {
                    dataField: "NAME",
                    caption: "NAME",
                    dataType: "string"
                },
                {
                    dataField: "POINT",
                    caption: "POINT",
                    dataType: "number"
                }
            ],
            onRowDblClick: function(e)
            {
                $scope.Musteri =  e.data.CODE;
                $scope.BtnMusteriPuanDetayListeGetir()
                
                $("#TbDetay").addClass('active');
                $("#TbMain").removeClass('active');      
            }
        });
    }
    function InitMusteriPuanDetayListesiGrid()
    {
        $("#TblMusteriPuanDetayListesi").dxDataGrid(
        {
            dataSource: $scope.MusteriPuanDetayListesi,
            allowColumnReordering: true,
            showBorders: true,
            paging: 
            {
                enabled: false
            },
            scrolling: 
            {
                columnRenderingMode: "virtual"
            },
            editing: 
            {
                mode: "row",
                allowAdding: true
            }, 
            columns: 
            [
                {
                    dataField: "DATE",
                    caption: "DATE",
                    dataType: "date",
                },
                {
                    dataField: "DESCRIPTION",
                    caption: "DESCRIPTION",
                    dataType: "string"
                },
                {
                    dataField: "POINTP",
                    caption: "POINT +",
                    dataType: "number"
                },
                {
                    dataField: "POINTN",
                    caption: "POINT -",
                    dataType: "number"
                },
                {
                    dataField: "POINT",
                    caption: "POINT",
                    dataType: "number"
                }
            ],
            summary: 
            {
                totalItems: 
                [
                    {
                        column: "POINT",
                        summaryType: "sum",
                        customizeText: function(data) 
                        {
                            return "Total : " + data.value
                        }
                    }
                ]
            },
            onRowInserting: function(e) 
            {
                if(typeof e.data.DATE == 'undefined')
                {
                    alertify.alert("Lütfen tarih alanını boş geçmeyiniz.")
                    e.cancel = true
                    return;
                }
                else if(typeof e.data.DESCRIPTION == 'undefined')
                {
                    alertify.alert("Lütfen açıklama alanını boş geçmeyiniz.")
                    e.cancel = true
                    return;
                }
                else if(typeof e.data.POINTP == 'undefined' && typeof e.data.POINTN == 'undefined')
                {
                    alertify.alert("Lütfen puan alanını boş geçmeyiniz.")
                    e.cancel = true
                    return;
                }
                else if(e.data.POINTP == 0 && e.data.POINTN == 0)
                {
                    alertify.alert("Lütfen iki puan alanınada sıfır giremezsiniz.")
                    e.cancel = true;
                    return;
                }
                
                console.log(e);
                
                if(e.cancel == false)
                {
                    if(typeof e.data.POINTP == 'undefined')
                    {
                        e.data.POINTP = 0;
                    }

                    if(typeof e.data.POINTN == 'undefined')
                    {
                        e.data.POINTN = 0;
                    }

                    let TmpPuan = 0;
                    let TmpPuanTip = 0;

                    if(e.data.POINTP > 0)
                    {
                        TmpPuanTip = 0;  
                        TmpPuan = e.data.POINTP;   
                        e.data.POINTN = 0
                        e.data.POINT = e.data.POINTP;        
                    }
                    else if(e.data.POINTN > 0)
                    {
                        TmpPuanTip = 0;  
                        TmpPuan = e.data.POINTN;                     
                        e.data.POINTP = 0
                        e.data.POINT = e.data.POINTN * -1;
                    }

                    let TmpPuanData = 
                    [
                        $scope.Kullanici,
                        moment(e.data.DATE).format("DD.MM.YYYY"),
                        $scope.Kullanici,
                        moment(e.data.DATE).format("DD.MM.YYYY"),
                        TmpPuanTip,
                        $scope.Musteri,
                        '',
                        0,
                        TmpPuan,
                        e.data.DESCRIPTION
                    ]

                    console.log(TmpPuanData)
                    db.ExecuteTag($scope.Firma,'MusteriPuanInsert',TmpPuanData);
                }
            },
    });
    }
    function MusteriSecimRowClick(pIndex,pItem,pObj)
    {    
        if ( MusteriSecimSelectedRow ) { MusteriSecimSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        MusteriSecimSelectedRow = $row;

        $scope.Musteri = pItem.CODE; 
        $("#MdlMusteriSecim").modal('hide');
    }
    $scope.Init = function()
    {

        $scope.Kullanici = $window.sessionStorage.getItem('User');
        $scope.Sube = "1";

        $scope.Firma = 'PIQPOS';
        $scope.IlkTarih = moment(new Date('1 January ' + new Date().getFullYear() + ' 00:00:00')).format("DD/MM/YYYY");
        $scope.SonTarih = moment(Date.now()).format("DD/MM/YYYY");
        $scope.Musteri = "";

        $scope.MusteriPuanListesi = [];
        $scope.MusteriPuanDetayListesi = []

        InitMusteriSecim();
        InitMusteriPuanListesiGrid();
        InitMusteriPuanDetayListesiGrid();
    }
    $scope.BtnMusteriSecim = function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT [CODE],[NAME] FROM [CUSTOMERS]"
        }
        db.GetDataQuery(TmpQuery,function(Data)
        {
            InitMusteriSecim(Data);
            $("#MdlMusteriSecim").modal('show');
        });
    }    
    $scope.BtnMusteriPuanListeGetir = async function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT " +
                    "CODE AS CODE, " +
                    "LAST_NAME AS LAST_NAME, " +
                    "NAME AS NAME, " +
                    "dbo.FN_CUSTOMER_TOTAL_POINT(CODE,GETDATE()) AS POINT " +
                    "FROM CUSTOMERS WHERE ((CODE = @CODE) OR (@CODE = ''))",
            param:  ['CODE'],
            type:   ['string|25'],
            value:  [$scope.Musteri]            
        }
        
        let TmpData = await db.GetPromiseQuery(TmpQuery)
        $scope.MusteriPuanListesi = TmpData;
        
        InitMusteriPuanListesiGrid();
    }
    $scope.BtnMusteriPuanDetayListeGetir = async function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT " +
                    "CONVERT(NVARCHAR,CONVERT(NVARCHAR(10),CDATE,103)) AS [DATE], " +
                    "CASE WHEN REF_NO = 0 THEN '' ELSE REF + '' + CONVERT(NVARCHAR,REF_NO) END AS [DESCRIPTION], " +
                    "CASE WHEN TYPE = 0 THEN POINT ELSE 0 END AS [POINTP], " +
                    "CASE WHEN TYPE = 1 THEN POINT * -1 ELSE 0 END AS [POINTN], " + 
                    "CASE WHEN TYPE = 0 THEN POINT ELSE CASE WHEN POINT > 0 THEN  POINT * -1 ELSE POINT END END AS [POINT] " + 
                    "FROM CUSTOMER_POINT " +
                    "WHERE CONVERT(NVARCHAR(10),CDATE,112) >= @ILKTARIH AND CONVERT(NVARCHAR(10),CDATE,112) <= @SONTARIH " +
                    "AND CUSTOMER = @CUSTOMER ORDER BY CDATE ASC",
            param:  ['ILKTARIH','SONTARIH','CUSTOMER'],
            type:   ['date','date','string|25'],
            value:  [$scope.IlkTarih,$scope.SonTarih,$scope.Musteri]            
        }
        
        let TmpData = await db.GetPromiseQuery(TmpQuery)
        $scope.MusteriPuanDetayListesi = TmpData;

        InitMusteriPuanDetayListesiGrid();
    }
}