function CariListeCtrl ($scope,$window,db)
{
    let TmpFields =
    [
        {
            name: "CODE",
            title : "CODE",
            type : "text",
            align: "center",
            width: 100,
            itemTemplate: function(value) 
            {
                return $("<a>").attr("href", "#!Cari?Id='" + value + "'").text(value);
            }            
        },
        {
            name: "NAME",
            title : "NAME",
            align: "center",
            width: 100
        },
        {
            name: "GENUS",
            title : "GENUS",
            align: "center",
            width: 75,
            visible: false
        },
        {
            name: "LAST_NAME",
            title : "LAST NAME",
            align: "center",
            width: 75,
            visible: false
        },
        {
            name: "COMPANY",
            title : "COMPANY",
            align: "center",
            width: 75,
            visible: false
        },
        {
            name: "CUSTOMER_GRP",
            title : "CUSTOMER GRP",
            align: "center",
            width: 75,
            visible: false
        },
        {
            name: "PHONE1",
            title : "PHONE1",
            align: "center",
            width: 75,
            visible: false
        },
        {
            name: "PHONE2",
            title : "PHONE2",
            align: "center",
            width: 75,
            visible: false
        },
        {
            name: "GSM_PHONE",
            title : "GSM_PHONE",
            align: "center",
            width: 75,
            visible: false
        },
        {
            name: "OTHER_PHONE",
            title : "OTHER_PHONE",
            align: "center",
            width: 75,
            visible: false
        },
        {
            name: "EMAIL",
            title : "EMAIL",
            align: "center",
            width: 75,
            visible: false
        },
        {
            name: "WEB",
            title : "WEB",
            align: "center",
            width: 75,
            visible: false
        },
        {
            name: "SIRET_ID",
            title : "SIRET_ID",
            align: "center",
            width: 75,
            visible: false
        },
        {
            name: "APE_CODE",
            title : "APE_CODE",
            align: "center",
            width: 75,
            visible: false
        },
        {
            name: "TAX_OFFICE",
            title : "TAX_OFFICE",
            align: "center",
            width: 75,
            visible: false
        },
        {
            name: "TAX_NO",
            title : "TAX_NO",
            align: "center",
            width: 75,
            visible: false
        }
    ];
    function TblCariInit()
    {
        $("#TblCari").jsGrid
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
            fields: TmpFields
        });
    }
    function CariGetir()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT " + 
                    "CODE AS CODE, " + 
                    "GENUS AS GENUS, " + 
                    "NAME AS NAME, " + 
                    "LAST_NAME AS LAST_NAME, " + 
                    "COMPANY AS COMPANY, " + 
                    "CUSTOMER_GRP AS CUSTOMER_GRP, " + 
                    "PHONE1 AS PHONE1, " + 
                    "PHONE2 AS PHONE2, " + 
                    "GSM_PHONE AS GSM_PHONE, " + 
                    "OTHER_PHONE AS OTHER_PHONE, " + 
                    "EMAIL AS EMAIL, " + 
                    "WEB AS WEB, " + 
                    "NOTE AS NOTE, " + 
                    "SIRET_ID AS SIRET_ID, " + 
                    "APE_CODE AS APE_CODE, " + 
                    "TAX_OFFICE AS TAX_OFFICE, " + 
                    "TAX_NO AS TAX_NO, " + 
                    "INT_VAT_NO AS INT_VAT_NO " + 
                    "FROM CUSTOMERS WHERE ((CODE = @CODE) OR (@CODE = '')) AND ((NAME = @NAME) OR (@NAME = ''))",
            param : ["CODE:string|50","NAME:string|250"],
            value : [$scope.Kodu,$scope.Adi,]
        }

        db.GetDataQuery(TmpQuery,function(Data)
        {
            console.log(Data)
            $scope.Data = Data
            $("#TblCari").jsGrid({data : $scope.Data});
        });
    }
    $scope.Init = function()
    {
        $scope.Data = [];

        $scope.Kolon = ["CODE","NAME"];
        $scope.Kodu = "";
        $scope.Adi = "";

        TblCariInit();

        setTimeout(function () 
        {
            $('select').selectpicker('refresh');
        },500)
    }
    $scope.KolonChange = function()
    {
        for (let i = 0; i < TmpFields.length; i++) 
        {
            TmpFields[i].visible = false;
        }

        for (let i = 0; i < TmpFields.length; i++) 
        {
            for (let x = 0; x < $scope.Kolon.length; x++) 
            {
                if($scope.Kolon[x] == TmpFields[i].name)    
                {
                    TmpFields[i].visible = true;
                }                
            }            
        }

        TblCariInit();
    }
    $scope.BtnAra = function()
    {
        CariGetir();
    }
}