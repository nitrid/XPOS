function CariListeCtrl ($scope,$window,db)
{
    $scope.Init = function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT [CODE],[NAME],[LAST_NAME] FROM CUSTOMERS"
        }
        db.GetDataQuery(TmpQuery,function(Data)
        {
            $('#Table').DataTable( {
                lengthChange: false,
                pageLength: 50,
                data: Data,
                columns: 
                [
                    { data: "CODE",width:"100" },
                    { data: "NAME",width:"200" },
                    { data: "LAST_NAME",width:"100" }
                ],
                columnDefs: 
                [ 
                    {
                        targets: 0,
                        data: "CODE",
                        render : function ( data, type, row, meta ) 
                        {
                            return '<a href="#!Cari?Id='+data+'">' + data + '</a>';
                        }
                    } 
                ]
            } );
        });
        
    }
}