function OzelEtiketCtrl ($scope,$window,db)
{
    let SecimSelectedRow = null;

    function TblSecimInit(pData)
    {
        let TmpDb = {
            loadData: function(filter)
            {
                return $.grep(pData, function(client)
                {
                    return (!filter.CODE || client.CODE.toLowerCase().indexOf(filter.CODE.toLowerCase()) > -1)
                        && (!filter.NAME || client.NAME.toLowerCase().indexOf(filter.NAME.toLowerCase()) > -1)
                });
            }
        };
        $("#TblSecim").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : pData,
            paging : true,
            filtering : true,
            pageSize: 15,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields:  
            [
                {
                    name: "CODE",
                    title : db.Language($scope.Lang,"CODE"),
                    type : "text",
                    align: "center",
                    width: 100

                },
                {
                    name: "NAME",
                    title : db.Language($scope.Lang,"NAME"),
                    type : "text",
                    align: "center",
                    width: 300
                }
            ],
            rowClick: function(args)
            {
                SecimListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            },
            controller:TmpDb,
        });

        $("#TblSecim").jsGrid("search");
    }
    function SecimListeRowClick(pIndex,pItem,pObj)
    {
        if ( SecimSelectedRow ) { SecimSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        SecimSelectedRow = $row;
        SecimSelectedRow.Item = pItem
        SecimSelectedRow.Index = pIndex
        
        $scope.Kodu = pItem.CODE;
        $scope.Fiyat = pItem.PRICE;

        $("#MdlSecim").modal('hide');
    }
    function UniqInsert(pStokKodu,pPrice)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db : $scope.Firma,
                query:  "DECLARE @CODE AS NVARCHAR(25) " +
                        "SET @CODE = (SELECT ISNULL(REPLACE(STR(MAX(CODE) + 1, 7), SPACE(1), '0'),'2700001') FROM ITEM_UNIQ WHERE CODE LIKE '27%') " +
                        "INSERT INTO [dbo].[ITEM_UNIQ] ( " +
                        " [CUSER] " +
                        ",[CDATE] " +
                        ",[LUSER] " +
                        ",[LDATE] " +
                        ",[CODE] " +
                        ",[ITEM_CODE] " +
                        ",[QUANTITY] " +
                        ",[PRICE] " +
                        ") VALUES ( " +
                        " @CUSER			--<CUSER, nvarchar(25),> \n" +
                        ",GETDATE()		    --<CDATE, datetime,> \n" +
                        ",@LUSER			--<LUSER, nvarchar(25),> \n" +
                        ",GETDATE()		    --<LDATE, datetime,> \n" +
                        ",@CODE			    --<CODE, nvarchar(25),> \n" +
                        ",@ITEM_CODE		--<ITEM_CODE, nvarchar(25),> \n" +
                        ",@QUANTITY		    --<QUANTITY, float,> \n" +
                        ",@PRICE		    --<PRICE, float,> \n" +
                        ") " +
                        "SELECT @CODE AS CODE",
                param: ['CUSER:string|25','LUSER:string|25','ITEM_CODE:string|25','QUANTITY:float','PRICE:float'],
                value: [$scope.Kullanici,$scope.Kullanici,pStokKodu,1,pPrice]
            }

            let TmpResult = await db.ExecutePromiseQuery(TmpQuery);
            if(typeof(TmpResult.result.err) == 'undefined')
            {
                resolve(TmpResult.result.recordset[0].CODE);
            }
            else
            {
                resolve("");
            }
            
        });
    }
    $scope.Init = async function()
    {
        $scope.Kullanici = $window.sessionStorage.getItem('User');

        $scope.Data = 
        [
            {
                Kodu : "",
                Fiyat : "",
                Aciklama : "",
                Kodu : "",
            }
        ];

        $scope.Kodu = "";
        $scope.Fiyat = 0;
        $scope.Aciklama = "";
        $scope.BasimAdeti = 1;
        $scope.RefNo = (await db.GetPromiseQuery({query:"SELECT ISNULL(MAX(REF_NO),0) + 1 AS REF_NO FROM LABEL_QUEUE WHERE REF = @REF",param:['REF:string|25'],value:['X']}))[0].REF_NO;
        $scope.KayitStatus = false;
    }
    $scope.BtnModalSecim = function()
    {
        db.GetData($scope.Firma,'StokGetir',['',''],function(StokData)
        {
            TblSecimInit(StokData);
            $("#MdlSecim").modal('show');
        });
    }
    $scope.Kaydet = async function()
    {
        if(!$scope.KayitStatus)
        {
            if($scope.Kodu != "")
            {
                let Data = {};
                Data.data = [];
    
                for (let i = 0; i < $scope.BasimAdeti; i++) 
                {
                    let TmpCode = (await UniqInsert($scope.Kodu,$scope.Fiyat))
                    if(TmpCode != "")
                    {
                        let TmpData = 
                        {
                            CODE : TmpCode, //'27' + $scope.Kodu.toString().substring(1,$scope.Kodu.length) + (parseFloat(parseFloat($scope.Fiyat).toFixed(2)) * 100).toString().padStart(5,'0'),
                            PRICE : $scope.Fiyat,
                            DESCRIPTION : $scope.Aciklama,
                        }
                        Data.data.push(TmpData)
                    }
                }
                
                let InsertData = 
                [
                    $scope.Kullanici,
                    $scope.Kullanici,
                    'X',
                    $scope.RefNo,
                    JSON.stringify(Data),
                    "1",
                    0
                ]
        
                db.ExecuteTag($scope.Firma,'LabelQueueInsert',InsertData)
                $scope.KayitStatus = true;
                alertify.alert(db.Language($scope.Lang,"Kayıt edildi."));
                //$scope.Init();
            }
        }        
    }
    $scope.OnIzleme = function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT " +
                    "CUSER, " +
                    "CDATE, " +
                    "LUSER, " +
                    "LDATE, " +
                    "REF, " +
                    "REF_NO, " +
                    "PRINT_COUNT, " +
                    "STATUS, " +
                    "CODE, " +
                    "BARCODE, " +
                    "REPLACE(NAME,'|', CHAR(13)) AS NAME, " +
                    "ITEM_GRP, " +
                    "ITEM_GRP_NAME, " +
                    "CUSTOMER_NAME, " +
                    "TRIM(STR(PRICE, 15, 2)) AS PRICE, " +
                    "UNDER_UNIT_VALUE, " +
                    "TRIM(STR([UNDER_UNIT_PRICE], 15, 2)) AS UNDER_UNIT_PRICE, " +
                    "SUBSTRING(TRIM(STR(PRICE, 15, 2)),0,CHARINDEX('.',TRIM(STR(PRICE, 15, 2)))) AS PRICE1, " +
                    "SUBSTRING(TRIM(STR(PRICE, 15, 2)),CHARINDEX('.',TRIM(STR(PRICE, 15, 2))) + 1,LEN(TRIM(STR(PRICE, 15, 2)))) AS PRICE2, " +
                    "TRIM(STR([UNDER_UNIT_PRICE], 15, 2)) + ' / ' + SUBSTRING([UNDER_UNIT_VALUE],CHARINDEX(' ',[UNDER_UNIT_VALUE]) + 1,LEN([UNDER_UNIT_VALUE])) AS UNDER_UNIT_PRICE2, " +
                    "ISNULL((SELECT PATH FROM LABEL_DESIGN WHERE TAG = @DESIGN),'') AS PATH, " +
                    "DESCRIPTION AS DESCRIPTION, " + 
                    "ISNULL((SELECT TOP 1 NAME FROM COUNTRY WHERE CODE = (SELECT TOP 1 ORGINS FROM ITEMS AS ITM WHERE ITM.CODE = JS.CODE)),'') AS ORGINS " +
                    "FROM LABEL_QUEUE AS D " +
                    "CROSS APPLY  " +
                    "(SELECT * FROM OPENJSON(JSON_QUERY (D.DATA, '$.data')) " +
                    "WITH  " +
                    "( " +
                    "[CODE] nvarchar(25) '$.CODE', " +
                    "[BARCODE] nvarchar(50) '$.BARCODE', " +
                    "[NAME] nvarchar(50) '$.NAME', " +
                    "[ITEM_GRP] nvarchar(50) '$.ITEM_GRP', " +
                    "[ITEM_GRP_NAME] nvarchar(50) '$.ITEM_GRP_NAME', " +
                    "[CUSTOMER_NAME] nvarchar(250) '$.CUSTOMER_NAME', " +
                    "[PRICE] nvarchar(50) '$.PRICE', " +
                    "[UNDER_UNIT_VALUE] nvarchar(50) '$.UNDER_UNIT_VALUE', " +
                    "[UNDER_UNIT_PRICE] nvarchar(50) '$.UNDER_UNIT_PRICE', " +
                    "[DESCRIPTION] nvarchar(500) '$.DESCRIPTION' " +
                    ")) JS " +
                    "WHERE STATUS = 0 AND REF = @REF AND REF_NO = @REF_NO",
            param:  ['REF','REF_NO','DESIGN'],
            type:   ['string|25','int','string|25'],
            value:  ['X',$scope.RefNo,9]
        }
        db.GetDataQuery(TmpQuery,function(pData)
        {
            console.log(JSON.stringify(pData))
            if(pData.length > 0)
            {
                db.Emit('DevPrint',"{TYPE:'REVIEW',PATH:'" + pData[0].PATH.replaceAll('\\','/') + "',DATA:" + JSON.stringify(pData) + "}",(pResult)=>
                {
                    console.log(pResult)
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