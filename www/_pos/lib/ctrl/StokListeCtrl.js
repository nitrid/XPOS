function StokListeCtrl ($scope,$window,db)
{
    $scope.Init = function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT [CODE],[NAME],[SNAME] FROM ITEMS"
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
                    { data: "SNAME",width:"100" }
                ],
                columnDefs: 
                [ 
                    {
                        targets: 0,
                        data: "CODE",
                        render : function ( data, type, row, meta ) 
                        {
                            return '<a href="#!Stok?Id='+data+'">' + data + '</a>';
                        }
                    } 
                ]
            } );
        });
        
    }
}