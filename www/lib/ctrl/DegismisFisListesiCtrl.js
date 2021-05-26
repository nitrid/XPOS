function DegismisFisListesiCtrl ($scope,$window,db)
{
    function InitDegismisFisListesiGrid()
    {   
        $("#TblDegismisFisListesi").jsGrid({
            responsive: true,
            width: "100%",
            height: "550px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            sorting: true,
            data : $scope.DegismisFisListesi,
            fields: 
            [
            {
                name: "DOC_DATE",
                title: "DATE",
                type: "text",
                align: "center",
                width: 30
            },
            {
                name: "REF",
                title: "REF",
                type: "text",
                align: "center",
                width: 60
            },         
            {
                name: "REF_NO",
                title: "REF NO",
                type: "number",
                align: "center",
                width: 60
            },
            {
                name: "DESCRIPTION",
                title: "DESCRIPTION",
                type: "text",
                align: "center",
                width: 200
            }]
        });
    }
    $scope.Init = function()
    {
        $scope.Kullanici = $window.sessionStorage.getItem('User');
        $scope.Sube = "1";

        $scope.Firma = 'PIQPOS';
        $scope.IlkTarih = moment(Date.now()).format("DD/MM/YYYY");
        $scope.SonTarih = moment(Date.now()).format("DD/MM/YYYY");
        $scope.FisTipi = "0";

        $scope.DegismisFisListesi = [];

        InitDegismisFisListesiGrid();
    }
    $scope.BtnDegismisFisListeGetir = async function()
    {
        let TmpQuery = {};

        
        if($scope.FisTipi == 0)
        {
            TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT " +
                        "CONVERT(NVARCHAR(10),CONVERT(NVARCHAR(10),LDATE,103)) AS DOC_DATE, " +
                        "REF AS REF, " +
                        "REF_NO AS REF_NO, " +
                        "DESCRIPTION AS DESCRIPTION " +
                        "FROM POS_MASTER_EXTRA " +
                        "WHERE CONVERT(NVARCHAR(10),LDATE,112) >= @ILKTARIH AND CONVERT(NVARCHAR(10),LDATE,112) <= @SONTARIH",
                param:  ['ILKTARIH','SONTARIH'],
                type:   ['date','date'],
                value:  [$scope.IlkTarih,$scope.SonTarih]            
            }
        }
        else if($scope.FisTipi == 1)
        {
            TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT " +
                        "CONVERT(NVARCHAR(10),MAX(DOC_DATE)) AS DOC_DATE, " +
                        "REF AS REF, " +
                        "REF_NO AS REF_NO, " +
                        "'' AS DESCRIPTION " +
                        "FROM POS_SALES  " +
                        "WHERE DOC_DATE >= @ILKTARIH AND DOC_DATE <= @SONTARIH " +
                        "AND STATUS = -2 " +
                        "GROUP BY REF,REF_NO",
                param:  ['ILKTARIH','SONTARIH'],
                type:   ['date','date'],
                value:  [$scope.IlkTarih,$scope.SonTarih]            
            }
        }
        else if($scope.FisTipi == 2)
        {
            TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT " +
                        "CONVERT(NVARCHAR(10),MAX(DOC_DATE)) AS DOC_DATE, " +
                        "REF AS REF, " +
                        "REF_NO AS REF_NO, " +
                        "'' AS DESCRIPTION " +
                        "FROM POS_SALES  " +
                        "WHERE DOC_DATE >= @ILKTARIH AND DOC_DATE <= @SONTARIH " +
                        "AND STATUS = -1 " +
                        "GROUP BY REF,REF_NO",
                param:  ['ILKTARIH','SONTARIH'],
                type:   ['date','date'],
                value:  [$scope.IlkTarih,$scope.SonTarih]            
            }
        }
        
        let TmpData = await db.GetPromiseQuery(TmpQuery)
        $scope.DegismisFisListesi = TmpData;

        InitDegismisFisListesiGrid();
    }
}