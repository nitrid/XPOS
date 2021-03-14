function TopluTicketGirisCtrl ($scope,$window,db)
{
    $scope.Kaydet = async function(pCallBack)
    {
        //

        var startCode = $scope.TopluTicketGiris[0].STARTCODE;
        var endCode = $scope.TopluTicketGiris[0].ENDCODE;
        var price = $scope.TopluTicketGiris[0].PRICE;
        var type = $scope.TopluTicketGiris[0].TYPE;
        var year = $scope.TopluTicketGiris[0].YEAR;

        if(startCode.length != 9){
            alertify.alert(db.Language($scope.Lang,"Başlangıç Kodu 9 Haneli Olmalıdır."));
            return false;
        } else if(endCode.length != 9){
            alertify.alert(db.Language($scope.Lang,"Bitiş Kodu 9 Haneli Olmalıdır."));
            return false;
        } else if(price.length != 5){
            alertify.alert(db.Language($scope.Lang,"Fiyat 5 Haneli Olmalıdır."));
            return false;
        } else if(type.length != 1){
            alertify.alert(db.Language($scope.Lang,"Tip 1 Haneli Olmalıdır."));
            return false;
        } else if(year.length != 1){
            alertify.alert(db.Language($scope.Lang,"Yıl 1 Haneli Olmalıdır."));
            return false;
        }
        
        var eklenenKodSayisi = 0;
        var eklenemeyenKodSayisi = 0;
        for(i = startCode;i <= endCode;i++)
        {
            console.log(i)
            var rndNumber1 = RandomNumberGenerate(9, 99);
            var rndNumber2 = RandomNumberGenerate(99999, 999999);

            let TicketCodeData = await db.GetPromiseTag($scope.Firma,'CalintiKartSorgula',[i]);

            console.log(TicketCodeData)
            if(TicketCodeData.length == 0)
            {
                let InsertData =
                        [
                            i + "" + rndNumber1 + "" + price + "" + type + "" + rndNumber2 + "" + year,
                            i,
                            rndNumber1,
                            price,
                            type,
                            rndNumber2,
                            year
                        ];
                        
                db.ExecuteTag($scope.Firma,'CalintiKartKaydet',InsertData,function(InsertResult)
                { 
                    eklenenKodSayisi = eklenenKodSayisi + 1;
                });
            }else{
                eklenemeyenKodSayisi = eklenemeyenKodSayisi + 1;
            }
        }

        alertify.alert(db.Language($scope.Lang,"İşlem Başarıyla Tamamlandı."));
    }

    function RandomNumberGenerate(min, max) {  
        return Math.floor(
          Math.random() * (max - min) + min
        )
      }
}