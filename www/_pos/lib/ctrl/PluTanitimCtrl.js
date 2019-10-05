function PluTanitimCtrl($scope,$window,db)
{   
    let PluSelectedRow = null;

    function Init()
    {   
        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.Firma = $window.sessionStorage.getItem('Firma');

        UserParam.PosSatis.Sube
        $scope.Kodu = "";
        $scope.PluAdi = "";
        $scope.StokAdi = "";
        $scope.Grup = "";

        $scope.PluLock = false;
        $scope.PluListeSelectedIndex = 0;

        $scope.PluListe = [];

    }
    function InitPluGrid()
    {    
        $("#TblPlu").jsGrid
        ({
            width: "100%",
            height: "500px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.PluListe,
            fields: [
                {
                    name: "SUBE",
                    title: "SUBE",
                    type: "number",
                    align: "center",
                    width: 50
                }, 
                {
                    name: "KODU",
                    title: "KODU",
                    type: "text",
                    align: "center",
                    width: 150
                },
                {
                    name: "STOKADI",
                    title: "STOK ADI",
                    type: "text",
                    align: "center",
                    width: 150
                }, 
                {
                    name: "PLUADI",
                    title: "PLU ADI",
                    type: "text",
                    align: "center",
                    width: 150
                },
                {
                    name: "GRUP",
                    title: "GRUP",
                    type: "text",
                    align: "center",
                    width: 150
                } 
            ],
            rowClick: function(args)
            {
                $scope.PluSelectedRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function FormFill(pIndex)
    {   
        $scope.Kodu = $scope.PluListe[pIndex].KODU;
        $scope.StokAdi = $scope.PluListe[pIndex].STOKADI;
        $scope.PluAdi = $scope.PluListe[pIndex].PLUADI;
        $scope.Grup = $scope.PluListe[pIndex].GRUP;
    }
    $scope.Yeni = function()
    {   
        Init();
        InitPluGrid();

        $scope.Sube = 0;
        $scope.Kodu = "";
        $scope.PluAdi = "";
        $scope.StokAdi = "";
        $scope.Grup = "";
        
    }
    $scope.Kaydet = function()
    {
        if($scope.PluListe[$scope.PluListeSelectedIndex].PLUADI == null && $scope.PluListe[$scope.PluListeSelectedIndex].GRUP == null)
        {
            $scope.PluInsert();
        }
        else
        {
            $scope.PluUpdate();
        }
    }
    $scope.PluInsert = function()
    {
        var InsertData =
        [
            UserParam.PosSatis.Sube,
            $scope.Kodu,
            $scope.PluAdi,
            $scope.Grup
        ];

        db.ExecuteTag($scope.Firma,'PluInsert',InsertData,function(InsertResult)
        {   
            if(typeof(InsertResult.result.err) == 'undefined')
            {                                        
                UserParam.PosSatis.Sube
                $scope.Kodu = "";
                $scope.PluAdi = "";
                $scope.StokAdi = "";
                $scope.Grup = "";

                alertify.alert("Plu Kaydedildi.");
                $scope.PluLock = false;
                InitPluGrid();
            }
            else
            {   
                console.log(InsertResult.result.err);
            }
        });
    }
    $scope.BtnPluTanimListeGetir = function()
    {   
        db.GetData($scope.Firma,'PluTanimListeGetir',[''],function(PluData)
        {   
            $scope.PluListe = PluData;
            $("#TblPlu").jsGrid({data : $scope.PluListe});
            $scope.PluLock = false;
        })
    }
    $scope.PluSelectedRowClick = function(pIndex,pItem,pObj)
    {
        if ( PluSelectedRow ) { PluSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        PluSelectedRow = $row;

        $scope.PluListeSelectedIndex = pIndex;

        FormFill($scope.PluListeSelectedIndex);
     
    }
    $scope.BtnPluSec = function()
    {   
        $('#MdlPluAra').modal('hide');
        $scope.PluLock = true;
    }
    $scope.BtnPluGetir = function(keyEvent)
    {   
        if(keyEvent.which == 13)
        {  
            db.GetData($scope.Firma,'PluTanimListeGetir',[$scope.Kodu],function(PluData)
            {   
                $scope.PluListe = PluData;
                $scope.PluListeSelectedIndex = 0;
                FormFill($scope.PluListeSelectedIndex);
                $scope.PluLock = true;
            });
        }
    }
    $scope.PluDelete = function()
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Pluyu silmek istediğinize eminmisiniz ?', 
        function()
        {
            if($scope.PluListe.length > 0)
            {   
                db.ExecuteTag($scope.Firma,'PluDelete',[$scope.PluListe[$scope.PluListeSelectedIndex].RECID],function(Data)
                {  
                    $scope.Yeni();
                });
            }
        });
        
    }
    $scope.PluUpdate = function()
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Pluyu güncellemek istediğinize eminmisiniz ?', 
        function()
        {   
            if($scope.PluListe.length > 0)
            {   
                let Param = 
                [
                    $scope.PluAdi,
                    $scope.Grup,
                    $scope.PluListe[$scope.PluListeSelectedIndex].RECID

                ]

                db.ExecuteTag($scope.Firma,'PluUpdate',Param,function(Data)
                {

                });
            }
        });
    }
}

