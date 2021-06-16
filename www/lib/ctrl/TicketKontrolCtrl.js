function TicketKontrolCtrl ($scope,$window,db)
{
    document.onkeydown = function(e)
    {       
        if(!ElementFocus())
        {
            $window.document.getElementById("Ticket").focus();
        }
    }
    function ElementFocus()
    {
        for (let i = 0; i < document.getElementsByClassName("dx-texteditor-input").length; i++) 
        {
            if(document.getElementsByClassName("dx-texteditor-input")[i] === document.activeElement)
            {
                return true
            }
        }
        return false
    }
    function InitTicketGrid()
    {
        $("#TblTicketList").dxDataGrid(
        {
            dataSource: $scope.TicketList,
            allowColumnReordering: true,
            showBorders: true,
            filterRow: 
            { 
                visible: true
            },
            headerFilter: 
            {
                visible: true
            },
            selection: 
            {
                mode: "single"
            },
            editing: 
            {
                mode: "row",
                allowDeleting: true
            },
            columns: 
            [
                {
                    dataField: "CODE",
                    caption: db.Language($scope.Lang,"KODU"),
                    dataType: "string",
                    allowEditing: false,
                    width: "500"
                },
                {
                    dataField: "TICKET_NAME",
                    caption: db.Language($scope.Lang,"ADI"),
                    dataType: "string",                    
                    width: "700"
                },
                {
                    dataField: "AMOUNT",
                    caption: db.Language($scope.Lang,"FİYAT"),
                    dataType: "number",
                    width: "100",
                }
            ],
            onRowRemoved: function(e) 
            {
                localStorage.setItem("Data",JSON.stringify($scope.TicketList));
                DipToplam();
            }
        });
    }
    function DipToplam()
    {
        $scope.Toplam = 0;
        for (let i = 0; i < $scope.TicketList.length; i++) 
        {
            $scope.Toplam += $scope.TicketList[i].AMOUNT;
        }
    }
    async function TicketGetir(pBarkod)
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT * FROM TICKET_VW_01 WHERE CODE = @CODE",
            param:  ['CODE'],
            type:   ['string|50'],
            value:  [pBarkod]
        }

        let TmpData = await db.GetPromiseQuery(TmpQuery);
        if(TmpData.length > 0)
        {
            for (let i = 0; i < $scope.TicketList.length; i++) 
            {
                if($scope.TicketList[i].CODE == pBarkod)
                {
                    alertify.alert(db.Language($scope.Lang,"Daha önceden okutulmuş ticket."));
                    $scope.Ticket = "";
                    return;
                }
            }

            $scope.TicketList.push(TmpData[0]);
            InitTicketGrid();
            DipToplam();
            localStorage.setItem("Data",JSON.stringify($scope.TicketList));            
            $scope.Ticket = "";
        }
        else
        {
            alertify.alert(db.Language($scope.Lang,"Ticket Bulunamadı."));
            $scope.Ticket = "";
        }
        $scope.$apply();
        console.log(TmpData)
    }
    $scope.Init = function()
    {
        if(typeof localStorage.Lang != 'undefined')
        {
            $scope.Lang = localStorage.Lang;
        }
        else
        {
            $scope.Lang = "TR";
        }

        $scope.Kullanici = $window.sessionStorage.getItem('User');
        $scope.Firma = 'PIQPOS';
        $scope.Ticket = "";
        $scope.Toplam = 0;
        $scope.TicketList = [];
        
        if(localStorage.getItem("Data") != null)
        {
            $scope.TicketList = JSON.parse(localStorage.getItem("Data"));
            DipToplam();
        }
        InitTicketGrid();
    }
    $scope.TicketPress = async function(e)
    {
        if(e.which === 13)
        {
            TicketGetir($scope.Ticket);
        }
    }
    $scope.BtnTemizle = function()
    {
        localStorage.removeItem("Data");
        $scope.Init();
    }
}