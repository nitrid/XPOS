function StokListeCtrl ($scope,$window,db)
{
    function TblStokInit()
    {
        $("#TblStok").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.Data,
            paging : true,
            pageSize: 20,
            pageButtonCount: 5,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
                {
                    name: "CODE",
                    title : "KODU",
                    type : "text",
                    align: "center",
                    width: 100
                    
                },
                {
                    name: "NAME",
                    title : "ADI",
                    align: "center",
                    width: 100
                },
                {
                    name: "TYPE",
                    title : "Tip",
                    align: "center",
                    width: 75
                },
                { type: "control", modeSwitchButton: true , editButton: false }  
            ]
        });
    }
    $scope.Init = function()
    {
        TblStokInit();
        // let TmpQuery = 
        // {
        //     db : $scope.Firma,
        //     query:  "SELECT [CODE],[NAME],[SNAME],[ITEM_GRP] FROM ITEMS"
        // }
        // db.GetDataQuery(TmpQuery,function(Data)
        // {
        //     $scope.TableData = Data
        //     $scope.TableCreate();
        // });
        // $scope.GroupSelect = '0';
        // $scope.GroupRead()
    }
    // $scope.GroupRead = function()
    // {
    //     let TmpQuery = 
    //     {
    //         db : $scope.Firma,
    //         query:  "SELECT [NAME],[CODE] FROM ITEM_GROUP"
    //     }
    //     db.GetDataQuery(TmpQuery,function(Data)
    //     {
    //         $scope.GroupList = Data
    //     });
    // } 
    // $scope.CmbGroupChange = function()
    // {
    //     console.log($scope.GroupSelect)
    //     if($scope.GroupSelect == '0')
    //     {
    //         let TmpQuery = 
    //         {
    //             db : $scope.Firma,
    //             query:  "SELECT [CODE],[NAME],[SNAME],[ITEM_GRP] FROM ITEMS"
    //         }
    //         db.GetDataQuery(TmpQuery,function(Data)
    //         {
    //             $scope.TableData = Data
    //             $scope.TableCreate();
    //         });
    //     }
    //     else
    //     {
    //         let TmpQuery = 
    //         {
    //             db : $scope.Firma,
    //             query:  "SELECT [CODE],[NAME],[SNAME],[ITEM_GRP] FROM ITEMS WHERE ITEM_GRP =  '" + $scope.GroupSelect + "'"
    //         }
    //         db.GetDataQuery(TmpQuery,function(Data)
    //         {
    //             console.log(Data)
    //             $scope.TableData = Data
    //             $scope.TableCreate();
    //         });
    //     }
       
        
    // }
    // $scope.TableCreate = function()
    // {
    //     $('#Table').DataTable( {
    //         destroy: true,
    //         paging: true,
    //         lengthChange: false,
    //         pageLength: 50,
    //         searching: true,
    //         data: $scope.TableData,
    //         columns: 
    //         [
    //             { data: "CODE",width:"100" },
    //             { data: "NAME",width:"200" },
    //             { data: "SNAME",width:"100" },
    //             { data: "ITEM_GRP",width:"100"}
    //         ],
    //         columnDefs: 
    //         [ 
    //             {
    //                 targets: 0,
    //                 data: "NAME",
    //                 render : function ( data, type, row, meta ) 
    //                 {
    //                     return '<a href="#!Stok?Id='+data+'">' + data + '</a>';
    //                 }
    //             }, 
    //             {
    //                 targets: 1,
    //                 data: "CODE",
    //                 render : function ( data, type, row, meta ) 
    //                 {
    //                     return '<a href="#!Stok?Id='+row.CODE+'">' + data + '</a>';
    //                 }
    //             },
    //         ]
    //     } );
    // }
}