function EtiketBasimCtrl ($scope,$window,db)
{
    let SelectedData = []
    let TmpGrid;

    function InitBarkodGrid()
    {
        $("#TblBarkodListesi").dxDataGrid(
        {
            dataSource: $scope.BarkodListe,
            allowColumnReordering: true,
            showBorders: true,
            filterRow: 
            { 
                visible: true
            },
            headerFilter: {
                visible: true
            },
            selection: 
            {
                mode: "single"
            },
            editing: 
            {
                mode: "row",
                allowUpdating: true,
                allowDeleting: true,
                selectTextOnEditStart: true,
                startEditAction: "click"
            },
            columns: 
            [
                {
                    dataField: "CODE",
                    caption: db.Language($scope.Lang,"TEDARİKÇİ KODU"),
                    dataType: "string",
                    allowEditing: false
                },
                {
                    dataField: "BARCODE",
                    caption: db.Language($scope.Lang,"BARKOD"),
                    dataType: "string",
                    allowEditing: false
                },
                {
                    dataField: "NAME",
                    caption: db.Language($scope.Lang,"ADI"),
                    dataType: "string"
                },
                {
                    dataField: "PRICE",
                    caption: db.Language($scope.Lang,"FİYAT"),
                    dataType: "number"
                },
                {
                    dataField: "UNDER_UNIT_VALUE",
                    caption: db.Language($scope.Lang,"ALT B. DEGER"),
                    dataType: "string"
                },
                {
                    dataField: "UNDER_UNIT_PRICE",
                    caption: db.Language($scope.Lang,"ALT B. FİYAT"),
                    dataType: "string",
                }
            ],
        });
    }
    function InitStokSecimGrid()
    {
        if(typeof TmpGrid != 'undefined')
        {
            TmpGrid.deselectAll();
            TmpGrid.clearSelection();
        }
        

        TmpGrid = $("#TblStokSecim").dxDataGrid(
        {
            dataSource: $scope.StokSecimListe,
            allowColumnReordering: true,
            showBorders: true,
            selection: 
            {
                mode: "multiple"
            },
            filterRow: 
            { 
                visible: true
            },
            headerFilter: {
                visible: true
            },
            paging: 
            {
                pageSize: 15
            },
            pager: 
            {
                showPageSizeSelector: true,
                allowedPageSizes: [15, 30, 90, 120, 500, 1000],
                showInfo: true
            },
            columns: 
            [
                {
                    dataField: "CODE",
                    caption: db.Language($scope.Lang,"KODU"),
                    dataType: "string"
                },
                {
                    dataField: "BARCODE",
                    caption: db.Language($scope.Lang,"BARKOD"),
                    dataType: "string"
                },
                {
                    dataField: "NAME",
                    caption: db.Language($scope.Lang,"ADI"),
                    dataType: "string"
                },
                {
                    dataField: "ITEM_GRP_NAME",
                    caption: db.Language($scope.Lang,"GRUP"),
                    dataType: "string"
                },
                {
                    dataField: "PRICE",
                    caption: db.Language($scope.Lang,"FİYAT"),
                    dataType: "string"
                }
            ],
            onSelectionChanged: function(selectedItems) 
            {
                SelectedData = selectedItems.selectedRowsData;
            }
        }).dxDataGrid("instance");        
    }
    function BarkodGetir(pBarkod)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db : $scope.Firma,
                query:  "SELECT " +
                        "CUSTOMER_ITEM_CODE AS CODE, " +
                        "ITEM_BARCODE.BARCODE AS BARCODE, " +
                        "ITEMS.NAME AS NAME, " +
                        "ITEMS.ITEM_GRP AS ITEM_GRP, " +
                        "ISNULL((SELECT NAME FROM ITEM_GROUP WHERE ITEM_GROUP.CODE = ITEMS.ITEM_GRP),'') AS ITEM_GRP_NAME, " +
                        "dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) AS PRICE, " +
                        "ISNULL((SELECT TOP 1 CONVERT(NVARCHAR,FACTOR) + ' ' + ISNULL((SELECT TOP 1 SHORT FROM UNIT WHERE UNIT.NAME = ITEM_UNIT.NAME),'') FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEMS.CODE AND TYPE = 1),0) AS UNDER_UNIT_VALUE, " +
                        "CASE WHEN dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) = 0 OR ISNULL((SELECT TOP 1 FACTOR FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEMS.CODE AND TYPE = 1),0) = 0 THEN " +
                        "'0' + ' €' ELSE CONVERT(NVARCHAR,ROUND(dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) / ISNULL((SELECT TOP 1 FACTOR FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEMS.CODE AND TYPE = 1),0),2)) + ' €' END AS UNDER_UNIT_PRICE " +
                        "FROM ITEMS " +
                        "INNER JOIN ITEM_BARCODE ON  " +
                        "ITEM_BARCODE.ITEM_CODE = ITEMS.CODE  " +
                        "INNER JOIN ITEM_CUSTOMER ON " +
                        "ITEM_CUSTOMER.ITEM_CODE = ITEMS.CODE " +
                        "WHERE ((BARCODE = @BARCODE) OR (ITEMS.CODE = @BARCODE) OR (@BARCODE = '')) AND ITEMS.STATUS = 1",
                param : ['BARCODE:string|25'],
                value : [pBarkod]
            }

            let TmpData = await db.GetPromiseQuery(TmpQuery);
            
            resolve(TmpData)
        });
        
    }
    $scope.Init = async function()
    {
        SelectedData = [];

        $scope.Kullanici = $window.sessionStorage.getItem('User');
        $scope.Sube = "1";

        $scope.Firma = 'PIQPOS';

        $scope.StokSecimListe = [];
        $scope.BarkodListe = [];
        $scope.EtiketListe = [];
        $scope.EtiketObj = {};
        $scope.EtiketName = "";

        InitBarkodGrid();
        InitStokSecimGrid();

        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT DESIGN_NAME,TAG,PAGE_COUNT FROM LABEL_DESIGN",
        }

        let TmpData = await db.GetPromiseQuery(TmpQuery);
        $scope.EtiketListe = TmpData;
        $scope.$apply();

       
    }
    $scope.BtnStokSecim = async function()
    {
        let TmpData = await BarkodGetir('');

        $scope.StokSecimListe = TmpData
        InitStokSecimGrid();

        $("#MdlStokSecim").modal('show');
    }    
    $scope.BtnStokGridSec = async function()
    {
        $("#MdlStokSecim").modal('hide');
        
        for(let i = 0;i < SelectedData.length;i++)
        {
            $scope.BarkodListe.push(SelectedData[i]);
        }

        InitBarkodGrid();
    }
    $scope.TxtBarkodPress = async function(e)
    {
        if(e.which === 13)
        {
            let TmpData = await BarkodGetir($scope.Barkodu);
            
            if(TmpData.length > 0)
            {
                $scope.BarkodListe.push(TmpData[0]);
            }
            $scope.Barkodu = ""
            $scope.$apply();
            InitBarkodGrid();
        }
    }
    $scope.DesignChange = function()
    {
        for(let i = 0;i < $scope.EtiketListe.length;i++)
        {
            if($scope.EtiketListe[i].DESIGN_NAME == $scope.EtiketName)
            {
                $scope.EtiketObj = $scope.EtiketListe[i];
            }
        }
    }
    $scope.Kaydet = function()
    {
        if(typeof $scope.EtiketObj.DESIGN_NAME != 'undefined')
        {
            let Data = {data:$scope.BarkodListe}

            let InsertData = 
            [
                $scope.Kullanici,
                $scope.Kullanici,
                JSON.stringify(Data),
                $scope.EtiketObj.TAG,
                1,
                0
            ]
            db.ExecuteTag($scope.Firma,'LabelQueueInsert',InsertData)

            alertify.alert(db.Language($scope.Lang,"Yazdırma emri gönderildi."))
        }
    }
    function base64ToBlob(base64) {
        //const binaryString = window.atob(base64);
        const len = base64.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; ++i) {
          bytes[i] = base64.charCodeAt(i);
        }
      
        return new Blob([bytes], { type: 'application/pdf' });
      };
    $scope.OnIzleme = function()
    {
        db.Emit('DevPrint',"{TYPE:'REVIEW',PATH:'C:/Project/Nitrogen/XPOS/devprint/repx/d.repx',DATA:[{NAME:'KELAM',PRICE1:15,PRICE2:55,UNDER_UNIT_PRICE2:'XXXX'}]}",(pResult)=>
        {
            
            console.log(pResult)
            if(pResult.split('|')[0] != 'ERR')
            {
                // The Base64 string of a simple PDF file
                var b64 = 'JVBERi0xLjUKJYCBgoMKMSAwIG9iago8PC9GaWx0ZXIvRmxhdGVEZWNvZGUvRmlyc3QgMTQxL04gMjAvTGVuZ3RoIDg0OC9UeXBlL09ialN0bT4+CnN0cmVhbQp4AZVVbW/iOBD+K/NtW1W9+CUvzmlVCcjCcl26CLjrnaJ88BIvGylglBip/fc347QUdku3SFEyjmfGjx/PMxbAQAIXKYTAYw4RSJlCDJFkkEAcKlAQpxGkoJgCziBVAjhHC0M4mXECHDPICF+YQ6YMeISmpIT4VTiPT5zgGDMkmINjqBISBJoqxi/mSxMGHz8G890397g1wWCcDe3GLdAWNJg/ts6sx5vvlrIzmAXZPTCaWdjROJvobTAuzcZV7jGgoICi/Ssz7bKpts42hIci+7o1fro/vbsfja5Geuf0urq5IQCL2U+JPj240dxpZ7r59wO8z3mSi0QVcZrHnBdJ6D8qyqVKIYriQin/p6C94PjM3UTHm5n+ezv8MrnqNZWur/u2LieLDjHNDqvaCBDKhxBa40AkfjRH2P+AZGEwdrqulr3NqjZILa2EEOBaJohMbz+bavXD4cGHSdDrprw9rPWqhRjxK79Uv28f8usYs1MknrGU3rHws3d6bV6D+rLNlx0eE04Oz6hKjVtC3zYPaQ9F8GmztGW1We1pu/58QNzC/r2p0MGAeC9pE+N0qZ0G0dXMVK9MS4VOA595gLO1Xb0HZHoeSJTeEcjsv+yvwaID+YzvnDKMVJ6GYZGwPGKsSEROtZekuRAClJSF6v74MsR6PVdU4vdoZwn1BnKboeZR7p1Jsn8yBXhqO/cB5sFlWxAHfNMJ4LGUlaYCI4piXDpJRRHMLOkTa3aqG1+XXdjMtHbXLE37JALqQ/R/r2jqZ/5wG7tEReTBNBsGC/Pgipubn7UjxaF2JH+ndkR4pB15oB15Ujtx6CNRO0J5xwPtHNN7WjYDu6NVgtuqbHPOuwrcE9k+NbtbcM3OBF+nE3TtT4I726x1faLxbbe1WRN2FnxtStNgKV8818clsr2qWtc8XvRK+81c/tJ7wqPekx7wJyJ1ij/FxSF/XIZ7/sh+nT8e4kVGoXjgQnjPAwKPm/5pAmdYHF2/nHF/dXUmXoovhfq27MWZvUn8/nZaajynQQ9fvfEcvuu6Na8e1sSWGQ4usj8F44pzwVmCjZhfMfGBsQ+XwaAx2lV287YXCqPcLU1zMZp+gdEP27qOI0j/EOxyD4kRJPYWpP8Bsoh9UgplbmRzdHJlYW0KZW5kb2JqCjIyIDAgb2JqCjw8L0xlbmd0aCAxNjIvRmlsdGVyL0ZsYXRlRGVjb2RlPj4Kc3RyZWFtCnicXY8xDoMwDEX3nMI3CLBVQix0YWhV0V4gOA7KgBOFMPT2TQK0Ui3Z0rf95G/ZD9eBbQT5CA6fFMFY1oFWtwUkmGi2LOoGtMV4qFJxUV7I/qb86+0J0gKZXd/VQnJsLqVT7ww6TatXSEHxTKKtUnStSdEJYv03PqDJ/Lbr7qhNVU2FOacZz17O04BbCMSxGC6GshHL9P3JO58pSCk+UhVVCwplbmRzdHJlYW0KZW5kb2JqCjIzIDAgb2JqCjw8L0xlbmd0aCAzMDAvRmlsdGVyL0ZsYXRlRGVjb2RlPj4Kc3RyZWFtCngBrVHBSsQwEI2sP+BJvM2xFWwzado0HsUV2Ytuia4gnlZbESvs+v/gS3Zbg1TwIIHmzbzpvDeTDcmMSfqzv9d93hjqPonD2XYhW7GSZCw+2xdq/5jaIGWyckizAgaxOqWPaSbuouTYuEMnDh6Ha93Thcsb9onM2pJcSzv7jD/JSIuGrn9MxHkqs6K2XJhEXIub9Axzcq10Iq7AsDKVAdOIWx9ZW2vl62aIlC6LCtEqwg2YJ7eAso6UK85kXSqou+dEHKTuDQUmKpCBgpu5d8OmVNC8FPdQOhHH4ihSWHhcAzxEpXfetqwUm4I9Aws0d7Sk/bb7AbxPgFdq8wYIT/rbGvXEGtmarNY87nI3WJBFO/6fdj+ecNzTYRi+0ozhZ9/jemXllZdf4PGMdQplbmRzdHJlYW0KZW5kb2JqCjI0IDAgb2JqCjw8L0xlbmd0aCAxNDQ2L0ZpbHRlci9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nO1XX2xTVRj/zr3t2q3MdTClUMk9l0ObLd0suolzVri2vbVYme02kttBwu3Wji6BUB3MaZA0RuK4gOHVRJNpYrKYGE/xwcITvhgS3YP4giaShRhdAiTGwANGNr9z2y0bUZ+N2Tm393zf7/tzvj+357ZAAKARyiCDd3TyOFX17ROIfABAYKx0+OhPZz75FGnknScOH3ljDOzhnsZbtFjI5W8Mn7oM0DKL/K4iAk0/uK8DuNqQ31E8enyqpt8yI4yOHBvN1e2/BWi4djQ3VXK2Nyyhfi+CtPRaoXRm+NofyBu4Z1hekH8HWLoNMzivwiycxM+Ujby9xBEpOr52nlq0oHi/DHnpN2le7lm8CWkyD/+p4Uw60xj1dfgIPoZ3YAFz4LBkI2fgO9dNvIP8vXxr8QTkHYdQYxY+hFnpR60vk36lf9/LqZf2Jl9M6PFY9AVtz+7nI8/1Pdv7zK6nw090dbYHAzvYdsXX1uptafY0NbpdDU6HLBHo1FnCpDxockeQJZNdgmc5BHKrAJNThBJrdTg1bTW6VlNDzbGHNLWapraiSbw0ApGuTqozyufijFbJcMZA+nycZSm/Y9P7bNoRtJlmZFQVLajuK8YpJybVeWKyaOlmHP1VPE0xFis0dXVCpcmDpAcp3s5KFdK+m9iE1K73VSRwN4ttuRzQc3mezhh63K+qWRuDmO2LN8S4y/ZFx0XMcJZWOq9Y56peGDFDG/IsnztocDmHRpasW9a7vDXEO1icd7z5sw9TLvBOFtd5iKGz1MDKBoQ7A15GrXuAwbM7t9ciuTrSEPDeA0GKFFfKhPJlGjA2jBDzU1URy9mqBiPI8HLGqPEURvwXQQuHslwyheTKsuTR/UJSXpasmJtMFa3Szfo1WfTx8gjt6sTq21cAL5RTLgfNkdGiWHMFi8XjtboNGVyLI6Hl6rnqlZ1h1M+ZmMS4KEPG4GFW4m0sWlNAgIoejA8atkndjLfFOJijdSse1uMiLqpbZrwWoPDFMsYl6F6ar/RQ/xfd0ANZEQd/LIZNCeqWkR/jiunP4/M5Rg2/yrUsli/LjEJWdIl5ecc8bqfaO9pWmNtD2svKInNXwE0NyS9nRbcQoAm8sWgEBV5sl82KjkYj1CB+WFbDXeoaglrjBxk5EEsKkSxMY0m/mlVr419C8tdjcga4e5UvLwIrMdX2+cfQatoioA6qF+KrAlzj1FkPsO7t7+OURC3qG6OFW7QzuSySA/jNRUxCNzYkuuijHNLUYAWWZfgMaWlD5CZqbfc3NchSmWHD7nb9KRlaw9XkvSuyOrU8qeVmqUFL6LC6CKi1lwM+fBp+zXo39tTQBJ5TlpVgNGGZVq66VB5h1MusSipllXRTBGlgwatLl8/6eeJclnvNIukT/tnevMUGjQiWoUsc2PhOdOXvl8nBR9x3+x/82nxVIGuGJBC5CJ+BG96HJuS9oMEAmiacJ8AJkjbR6GhTWhxUaXb4FJdDVV4tblbeOqkq40VVmTlFZk6SmSJpcAYVpyOoPCJtUmRJVcISKR1TlQ0eJI+RsIe0Qpvy+qSqbPZ1K+EpEt5KwltIeJKEfUTAhbyqEEDlPAkDwWMwenFzK5mmfHvGYlNcG5iqNNFpPOH2T1UkEuXy46pK+MYUpIaifBPBdTDKpZgBKR4ZSPHG9AGjQsh7WX+qSi6sBvBkma4SGOKO6aqEy8bY8AGjSrYI4Wn/JSAEeMo8fT7L09t4PjVo8PK2LH9KEBe2ZWFiIhQKTYhhr/gJ1YBQbYiKlrGiZXkBf4m4YKvmccqNDnARcKBoz9yeORKe896Ye3Jnd6vaGlBb1bIMD8oSLIK88KevLC3YfVHX5/pcn+tzfa7P/8HEt594L9Z+k4Dzl7EK//zyoZbIPfC7bbjyVeFLsX7Tf8tzt/9+uflqo/jv3YgvTXv8Bcy9sskKZW5kc3RyZWFtCmVuZG9iagoyNSAwIG9iago8PC9MZW5ndGggMjE4L0ZpbHRlci9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nF2QwY7CIBCG7zwFb1BpC7iJmYt78bBmo74A0qnhICVYD779tjM6hyXhS/jgJ5m/2R++DznNuvmtUzzjrMeUh4qP6Vkj6iveUlam1UOK8/tEjPdQVLP/CeXyKqiXBzjy+Rju2JzaLRnDmTgN+CghYg35hmq3WRbsxmWBwjz8uzYbTl1HeW4MCFsEUh6EXc/qC4SdI9X3IHSGlQWha1ltQegsqwBC50lZijA9B60Doe9Y0S9Mb2m+zyDrqGtvn5p0fNaKeaZyqby1tJRR+i9TWVN62eoPnDx4GQplbmRzdHJlYW0KZW5kb2JqCjI2IDAgb2JqCjw8L0xlbmd0aCAxMzQ0L1N1YnR5cGUvWE1ML1R5cGUvTWV0YWRhdGE+PgpzdHJlYW0KPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPD9hZG9iZS14YXAtZmlsdGVycyBlc2M9IkNSTEYiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLycgeDp4bXB0az0nWE1QIHRvb2xraXQgMi45LjEtMTMsIGZyYW1ld29yayAxLjYnPgo8cmRmOlJERiB4bWxuczpyZGY9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnIHhtbG5zOmlYPSdodHRwOi8vbnMuYWRvYmUuY29tL2lYLzEuMC8nPgo8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0ndXVpZDo0YTIzZDZiNi1lZmE2LTExZTgtMDAwMC05ZmIzZWU2NTk2YjMnIHhtbG5zOnBkZj0naHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLycgcGRmOlByb2R1Y2VyPSdHUEwgR2hvc3RzY3JpcHQgOS4yMCcvPgo8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0ndXVpZDo0YTIzZDZiNi1lZmE2LTExZTgtMDAwMC05ZmIzZWU2NTk2YjMnIHhtbG5zOnhtcD0naHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyc+PHhtcDpNb2RpZnlEYXRlPjIwMTgtMTEtMjFUMDc6MDM6MzErMDI6MDA8L3htcDpNb2RpZnlEYXRlPgo8eG1wOkNyZWF0ZURhdGU+MjAxOC0xMS0yMVQwNzowMzozMSswMjowMDwveG1wOkNyZWF0ZURhdGU+Cjx4bXA6Q3JlYXRvclRvb2w+VW5rbm93bkFwcGxpY2F0aW9uPC94bXA6Q3JlYXRvclRvb2w+PC9yZGY6RGVzY3JpcHRpb24+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSd1dWlkOjRhMjNkNmI2LWVmYTYtMTFlOC0wMDAwLTlmYjNlZTY1OTZiMycgeG1sbnM6eGFwTU09J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8nIHhhcE1NOkRvY3VtZW50SUQ9J3V1aWQ6NGEyM2Q2YjYtZWZhNi0xMWU4LTAwMDAtOWZiM2VlNjU5NmIzJy8+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSd1dWlkOjRhMjNkNmI2LWVmYTYtMTFlOC0wMDAwLTlmYjNlZTY1OTZiMycgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJyBkYzpmb3JtYXQ9J2FwcGxpY2F0aW9uL3BkZic+PGRjOnRpdGxlPjxyZGY6QWx0PjxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+VW50aXRsZWQ8L3JkZjpsaT48L3JkZjpBbHQ+PC9kYzp0aXRsZT48L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+CmVuZHN0cmVhbQplbmRvYmoKMjcgMCBvYmoKPDwvTGVuZ3RoIDIyL0ZpbHRlci9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nGNgcHRgAAKeBWwNDIMVAAAMFQG0CmVuZHN0cmVhbQplbmRvYmoKMjggMCBvYmoKPDwvTGVuZ3RoIDgxMjEvRmlsdGVyL0ZsYXRlRGVjb2RlPj4Kc3RyZWFtCnic7XsJdFRVtvY+594aU8OtSs0Z7q1UqhJSCZkTIpG6CUkEIxBGU2KkAgRBbQlCRGkFRBENCjjPEu0WaCduKoAVhiZq220PNtjaNtqD+RXb1ibdvG5E2yZVb59bAfH/ff3/b7311nr/Wt7LvvsM+zvD3vvsc04SgACAAdYDB8Ki61dJfzl2/y+w5HEA3YQl3Vd+52nuLw5Mvw2guejKa25cAuqTgzKWtqVdnYt/tjWjGqAW66FmKRbYX7W9DmDOxnz+0u+suiEtX9MNQBZfs3xRZzpfjPXGWd/pvKHblGE7hfIyFkrd13V1f8+1wYn5GIBwjWY/ZKu0E7L5ECAmdfwsJZeljrM6xumn2HpOmsaeODwPvyGFRIIB8iW44QviJeUwFXj4HGe6G0bhAXDAHHiQ2CEfXDAXphIeZcJwF3ksdX3qE7gQ7oWnUy+RDalnsX4r/Bi+wBH8gSdQC9NRfi50wSfcRxBNPQp62AQZMBFmERd0wjv4foZjuA/uhx+Sm1JfYK8O2IDt1UMDNKReTp2BIriL36Y5ZtgL98ABok0tSi2DXMiDXhpOvZN6H0IQhe/B8zimMBnip4AfroaN8DDxcj/G1APwfUgSE+3gJmsOY09TYR5cC6uhF56FnxE7adMc05xMfTf1MWghEwpxTMvgE1JNptFneFNqUuo9mA+D8DrOl71D/Hx+p2Z+MpJ6IvUKOOElYiQHycuaCs2W0VtST6VeBBOOpxw1Mh37WQi3wsvwU/g3+Btdl1oHU2A29vwaySESCaHG36Feupau5d6C8TjbDhxtD2wHBS2yHw7AIdTNb2EYPiIOkkUuJgvJPeRv1EQX0yPcY9we7m2e8D9AfQcgiDpaBc/APvgFvAFHiAbbLyNt5CqynDxEniDDVKEn6Oe8nr+V/yc/qgklh5P/TE1PfQYe8MElsAbWoW6/BwOwB34Jv4a/wd/hNBHIBLKUPEUUMkxOUAPNozNoN32QPkNf4KZz93Av89V8I381/wb/nuZ2zWZdpy55ZkfyvuQLyTdTL6XeRN+xYPshaEGN3oJe8Qwchrew9Xfh9/AB8x9sfyK5jFyBvawkd5D7yQvkNfIm+RRnCeqbRyfSJux1Ob0O9bSB3kfvx96P4HuUvkd/T/9MP+M0XB5Xw63gnuIULsEd5f7IC3yIH8+X8zP4y/gUWqZCc5FmtmaX5jnNK5qT2nrtYm239k+6Dbrb9L8YLRr9QxKSS5NKcgB9V4+etAY18SQ8jX6/B23wM9ToL3HEw3AKreAjflKA464jLaSVTCOXkstJF9lANpF7ycPkMfI0eRFngHOgOhx7mDbQ2bSTdtHb6CZ6N92D7376U/oOPUZHcORuLsCFuXJuKncZN5+7FuewilvL3YaavYd7ljvCvcV9zP2JG0Gruflcvodfwz/C7+T38G9qLtF8B9+nNYc1Q5o3NWc0Z7RU69Nma0u1V2l3aT/QaXU1ujbdnbq3dX/Xd5NsUoQjl+C8h3pxDebSZ6mDX0dGWJAiPFhx5mG0w2xcFX+HCJdEu1hYPY7NSb18JkNqZV5B/CpyAKrJa7BOSzmMivwwxMnv6DD/Kr0Qfk1ixMvv5K7V/Iz64TmMRtvoQXqANMIeWk/n0cc5IB+RXfAR+vsNcD+5mqyE58gIuYDcTGrJOniburjZ5DaoTz1NeWIgU8lJwBHALfxiuAL+5UPq4HfwSfJJ3szfhPEpAQ+iRZ+H98kP4EuiSZ3A6MZhNOrEKHMX+vtGYFGvA9fZOlyPXowg12iPwB6ixSheq53Er4GT8A/4RLMfPaoRI+nHyWX8k/yHqdpUCa4wXGWwC9fdUrgIV8xH6CWHMM9yl+NKN2IsqcBV3QaXwWK4GaPePSkl9Xjq1tSNqeXwc8R+SYrJl6QPV0QCEfXwOr5b4V2yGdfhRf96nv/Rk1wMQ/Ap8ZAgqcD1MKK5XrNN86xmj+aHmje05ajt2+Ax9OgP0JuNOINF8CZ8Cp8TPdrGC8VQheOdgGNvh2tolDsEk4kPunHNFmIcbxybyUpsZQNq73Fcz4dwbZzEOHE5/BCOEUrcOKNF2L8e22lFPS9A6R1owVvJAJYsxqhdBH/GeVvIBLoK+5OxpQcxag3hmH4Hf0Rtp9RxFWNcaCLzsK3P4VJYjD3UQBvph5bUPoxU06GJ+wXqO58I0EjyyPcRF8MVaoEcqNN8SCgUJ6enJtBl3CHcY1JY3oe7VxZcSFbgKKw4j1FwkhlQnZwFxbIsRyZdWD/xgroJtdVVlRXlZaXjS4rDReMKC0LB/ECeXxJzc7KzfF6P2+V0ZNptgtViNmUYDXqdVsNzlEBxc6AlJimhmMKHAlOmlLB8oBMLOs8riCkSFrV8XUaRYqqY9HVJGSWX/G+SclpSPidJBKke6kuKpeaApLzRFJAS5LKZ7Zi+uykQlZQRNT1NTW9T02ZM+/0IkJo9S5skhcSkZqXl+qW9zbEmbK4/wzg5MLnLWFIM/cYMTGZgSnEHuvuJexJRE9TdfEE/Bb0ZB6X4Ak3NijfQxEagcMHmzsVK28z25qYsvz9aUqyQyYsCCxUINCrWsCoCk9VuFO1kRad2Iy1js4HNUn/xUO9dCQEWxsKmxYHFnZe3K1xnlPVhC2O/TYp7zXHPV1ls3D65fdP5tVlcb7NnmcSyvb2bJGVoZvv5tX72jUaxDcTSYEustwW7vguV2Dpbwt7oxmi7QjZilxKbCZtVen5dgWZWErtKUgyBxsDS3qtiaBpfrwKzbvTHfT55MDUMvmapd057wK9EsgLRzqbsfgf0zrpxwCtL3q/XlBT3C7a0Yvst1rGEyXx+outcnZpSxVmqddY5zRI2osBUdAhFWiThSNoDOKcJ7NM1AXoXTUAxfKIEUcpitMgyxTA51itcwMoZXtEEhYDU+xmgBwRGTny9pHOsRBsUPgOWZH5yztWw/mxaCYeVoiLmIrrJaFMc4yQ1X11SfH2C1gS6BQkZqg/aULed0QtKUf1+PzPw5oQMCzGjrJ/Zns5LsDArDnJpOKrQGKsZOlvjnMtq1p+tOQePBdCT9wA7jzsVfejcP6vgymxeeoFCXP+iuitd3zo70DrzsnapuTc2ptvWOV/LpesnnKsbSymZk9u5LDqWolmcWotOefk5YZZpNyl8EP9pVaderHDolGoBkVoUITYl/Y0a/f7/EJPQ6c8DJVInGUplX8HGRqlcEP56fuLX8l8bnamXw/HyIdo657LeXuPX6lowAPX2tgSklt5Yb2citX5hQBICvYN0J93Z290cO2vQRGr/5iyl5a4oTmIpuaAEmLJ1k5LTYbIAX36ZnCk0q+o//4myEk0h7pX1sAg0eMAToBQjMminCdfgvkwPcY+ClRAQU0PcwwOCo0JOcI8MWDMr5AaBewDakCgo3DQYQqKwnLsH1iFRFG+Nl5RXDLLEgNFSIaD8ZpCQ1iNx0IdfouZlJCa/eSDTxZq/NW61qbjvxsuq0okBwVPR1uDgbgDCdXHX4vFaxGPZtbh5idwi5DnIF3KLwayOUx6wChXrsb8IikfwlDIOqxs4F+79ItfE+XDfYWI9cUu6n554YVFFg5GbzHlUEStnxm1X5PScLl4hSgc4GUcqc3cMGDLY+O6IC86KQ9xGTofXIpFbj1Ju0XqIM0IpEpvJnAGDuWJbg4mbg9Ocg2oRcYwEtqtfmbs2jg1hf81cNl4VRO5qLgevLSLXwuXGneLQAe4+Vexe1gr2Nymur2RswGypGGowcJOwVuG2oMa3qL1tGwhNwFNNiCuEMiSKSl2HqXXMmFwvpnrRTL1oml40TS+OohevVcDdiTV3okwptwa6udWwDWk7pnls0hlHDQ6qifzCikHOy3lQE8IB1B3BUt+AwcJG5onbM1Uxz4DJUhE5xK2EGUgUB79qwO2pWH6AK1KnUjzgyWKA7rjBhKpzp22BQBezwSEum8tVNZGjakBpEDFPwMqJQOjP6FGmHfoW/TWzL7toqPznY/yNMf7LNE8N0aMD2IucoL9ifLghm36EjS2gv4ftmKL0AH0VyhDwHk2wUdB36SBEkB/D/GLkg8grke+P+18XEzQxgAzH/ljc7GKTpa/Gw6VjCTE4lnBnjSXsroqGIH2FvoyXbZH+Bnk+8pfpEF6ORXoYuQf5EB61Xke+l1bjtVvES0ia/4geZD5NX6L78NAn0oG4hQ1BiesY2x3XMvZiHNK5tlLxIH2RPof3RZG+EA/5sHTXQChftB7A9ghey1bFc0R7g5E+RdrJKRTqwyMhcrDTp+O1rJFt8YOSOEi30W2yp1YOyiXyDq4sWFZStoOTglKJVCvtkBoEugVDw3aKC5Zuxm8tSBS9B0lG2kbvjPO1SsMozonNi8J6/PapqRh+u9UUXk9AOFd7Uk1F6EaYgUSxjbVI65DWI92CV4FtdA3Sd5FuQrpZLVmF1IO0GsNHNyK6EdGNiG4V0Y2IbkR0I6JbRXSrvfcgMUQMETFExBARUxExRMQQEUNETEWw8cYQEVMRbYhoQ0QbItpURBsi2hDRhog2FdGGiDZEtKkIGREyImREyCpCRoSMCBkRsoqQESEjQlYRZYgoQ0QZIspURBkiyhBRhogyFVGGiDJElKkICRESIiRESCpCQoSECAkRkoqQECEhQlIRAiIERAiIEFSEgAgBEQIiBBUhqPbpQWKIYUQMI2IYEcMqYhgRw4gYRsSwihhGxDAihunqfu5ow2sIOYqQowg5qkKOIuQoQo4i5KgKOYqQowg5Ojb1VaoyKLrNWqR1SOuRGHYIsUOIHULskIodUt2rB4lhFUQoiFAQoagIBREKIhREKCpCQYSCCEVF9CGiDxF9iOhTEX2I6ENEHyL6VESf6rg9SAzxn3fK/7Rp6C2kXY+bK11Pxql8HZxQ+Vo4pvKboV/lN8EOlX8XNqh8DdSqfDWEVI7tqXwViHoSF2utDS4MATOQFiAtR9qOtBvpMJJOTR1Beh8pRavlPN6qm6HbrtutO6zT7NYN66hVO0O7Xbtbe1ir2a0d1lKpIYua1TiKoQW2qt91+P0rEm4i+I2oqQitwn6rMM5W41tFq2TbiPTXInKkiBwuIruLyNYi0mCgFxFejXQS1OJ9TSTtsik0STyGVBsqmISRacu+E24xHqoRE+Rgmo2Tw8hPIPUj7UDagFSLVIFUghREEtWyIpRvl/PGmjyIVIDkR5JYF+By4eHHbtPLg9RMdgy8ZgYD66egEHEH4gVlyBLxghnIXooXLBQbDGQfFLBjENmLlnsO+e64eByrX0iz5+PiAWS74mIVso54wXhk8+MFb4gNZjIXRJ5B54zx2ThvxmfFxXkoNjMujkMWjheEmHQRdhTE2nGkHY4jD46h8tM9BeLiRGR5cbGOSeuhgBmeaKFEHZ4GiXFuAAf010HSzhM5QxwR7xNPIPzPqFh0j3elBI/sSDBB5slG8WDJkyjcIMYbjEwe94f+Ma4wvlfcEbxTfAzbIsF94iPieHFLSUKPxXfjuO9Uu4iLG/Bu8ZycKa4Xy8RVJcfFleLFYqc4S+wIYnlcvFw8yIYJUdJOn9sntmGDU3EWwbh4UTChDrFFvFGUxQKxTjrI9AsT0u3WlhxkGoCKdO/FqN+iYIL5+NzaBLHJRbqTum26+bpG3URdQJeny9Xl6Bx6u17QW/QmvVGv12v1vJ7qQe9IpIblMDsUO7QCY1qefXk1LVD2paCemSnRU7gYlEyulbbObiStytAiaF0oKadnBxLEiEd3TaCRKPZWaJ3TqEwItyZ0qVlKbbhV0bXNb+8nZEsUSxV6R4LAnPYESbGijVnsjtxPYOPdWYNAiHfj3dEoeFzXRzwR+yRbXUvTN3xiY9/wV4/n/GSO8mDr7Hbl2ZyoUsESqZxoq3ILu0EPUis1NzcNUgtj0fZBvptam2excr67KYpix1Ux9GYLikEBYyimbwSJiWE8aWRiaKO0XAjhKOdnDOWMZgipciGjWZXjCZPrPyY1N/VLkioTBDimyhwLwnky6DGIbeoPhVSpgETamRRpD0jqwMapDYkiipSIqgjBc53akEjUzpTSr0SCYyLV50Sq1b448pWMmJZxFJ6VcRSiTPi/+HQ1hslAec/aV9kPJWKB5i6kmLL5+qUeZf1CSepf2zP204pQbOGipYx3dik9ga4mZW2gSeovf/Ubql9l1eWBpn54tXlOe/+rcldTvFwubw50NkUHIvXtDV/r685zfbXXf0Nj9ayxdtZXpOEbqhtYdYT11cD6amB9ReSI2lfzMub3be39emiM4iVY5QM0w4g+HMvyRxtdQvck5tCDE/2etVn7eSC7ICMcVUyBRsWMxKpKGkoaWBWuM1ZlYT95GqvyrJ3oz9pPdo1VCVhsCzTCWdUCE2pVqme2Kv7Zl7UzV1Hkzm+22Ur2qNUeaF7WhP8wv0olfM+XhJXf+Kz6pqenp2cl+/SEVwK0KkWzW5UavMP363TYVawpimXjz5ZxnFrWbzA0J1JDWBnGQZBVrDuWCpMwalA24q1LR/u0fTrKrgqrBnw5FcsP4Q6+DgnvcXR1vFS9L9PVA3lBdn9ZNVBaneZ4P2U87vNXYA8DtQhlPJjmsq0EE9uC20q21fYF+0r6arVYum8HFoo72FYaL93BwarwyrOKwOSqKCobh8X6eyqenaN23McS4XA0vJKo+vo/lU3OKv2cYleOtbpSbX7VWYOky1dCWjhdGe45C+oZg6iVPSqE9UfZjyc0+OJZSgeNeyhJanUJGpEzQcMnOTDq+CQBr16rSVLuIAmBgSjEA56wcLp+tH66cKp+2mg9RDAtnMFPeZnf5rcF8YNhHs5I3NAZWQP/BIkfYnH+Pvw8T7zYV77spBPASENW3GkkvBzy4OWvvN4TxiY7po1CZNpIeVkltnUf+4Vj8mPcIiAEwDdphsCIl86fynUmyVxnMHlNYdNs09WmD0zaETPR8i4+yBeap5jnm3eaXzL/2GwguBOZtGadxphh1oHJZDYnyIuyj+MdHMdz1MSbOTPljaCTzUPmo5g5QApBj4rZsw94HgGA55o9mq1GYkwQKtsFPLMd1nE6nzVC11FKvZb95BIyBdjQj68QTndMO9VRz3QSQeWMdtQTm73OXlcHKtukGR/mbxZ+ZLVay8tIRwd0hFFX1aTSVukM2IiN0LWju+hNJ/btS55M7iYFp7nvnbni8+S7NJd8lsxAHVya+pgvQh24IQCD8sSrMnr0m/QPeXdqdup/YHk2c9Cyz3Yoc8h2JNPs1NTYmoQ1rr30V8JRh+4AHEE4T3Qeu5AlZdEs5sVZdldV1g6rWfSX+qlfxpx/h2w4akgZODyczRjYTQhJEL+cJ/KlPOWZAL/DqSHHYHXusRkmYvIFPcfs3vy3XlENN21kunB6xbSRUyMQGQ2vONVxumMkvCKCxJTANNDBZg0dRBMKBfK0uprKCrvTAYE8sAlQWeEiDldlRU11FavkrcmTxjmTo98Vlj2u/DP5xZE/JD8gRX/Z+dvRp9bOnL60e87Mbn527py2vtGbkqfe/l/JkyRK7iT3kcUHznxy5wNrNm/dyH4cMzX1J348Pwm1VUGmy0t1Pn22JsfluzhrSvbU4G+F922GGm+L99LQEu+VodtD93rv8+3wDWb9xPd6lkmrNTtdWq+rQDvOGfWuprfTHdq92h9rTYer3hVoTn5Fua3YnC+Hx1fly3mF+PHmVC3PP5NP81tymHLLLNaqC3MI5Ag5Ss4/cvicnGJSCTKWMp+nMNcvZ9sifjlLwI/HV+XHcLOX15nMxmIWabBO5VitcpQoRglZdmTklof04wyF5qho2m6ioomk0BSyxVVl8s2oIlUxXGlbytB0leP8C9zkfTeZ4V7gXu7m3N7KZQ3pJbbiOjTTipGO6ULH6XA6d5w57QgGhUg9Wi8cPtURPm6vK+1YER7pwCxaj7MI9fW4xskKtOEKUlCD9nO5nJzD5faHCkIFWm0gL1RdVVNTW1ObNiLRanVaJ7MqFtVUk65U+FdHDiZauaxg8tMMQcdN+X7H9w/Ne+ze1y5pW946h1xR82l+bXvTJc2VQgb9YPyj90fvfCmZuGvjJdm1Xn1LS/yOy+5uzQ5K2TObJyZ/Za/wFNRPnFcRqs3vYvFhE9r6fs1+sEI2PDEI9tQXcnlGXW3WRVnUPk87zzjPNc8Tzf5cp63mJ5onZlZnNfOt5tbM5qz7dY8YjCYLwWDoYzFfo3MwTWdmZFjB6Pbrfd25JFcYR7mQld2JTKQb1mN/3pxIWpsr6qeNjNb/cbqw4vQ0dP36yAi+qCdY0UE6JrfLGUu0S4xLXEs8y7I1HVFc8yywMd9Hr0eNFTgzHe6vHH8T8W6Iv5JMjg7O75ftVVNv7Lj1tiu7btfsHz15f/Lj5D8wMrw3P/o4LXpmRvf25/Y99QSbewPOvQD93AHZ5HuDIODcWzLqHjE8an5Q2KXZaTxgOGBO+PR6B5lCL9K2GGfk7jLv0+7z/cT4uukd4zHTF7rPzeZsa7ZTzsqpcsoWW5XVedh5xMk5me9ZcyMqt7iR07tlk9Vib7PELNTisRO28XmzqkilHZhMjlSl8rxxaR4uSXNPtsplKy6APnbmF3DYC+x2ttnyGXYP03h+hg78pNTpn2EhFl9p7oLc5bnbc/lcq18vm61Vem/OmP+GWajB8JKONSNss3d45EJHxCPnWvGDi8bDVhfb7qKRUbbroj8MDaCEnQ0Ghexji4vx+FlRXBjqPqkCACswbLF6N2PKgME4Sc02+CPqVh09zpZFh9q9RUYtWVinFta9RUZlqXtxtLQel9N14TBuBZUs/q1ADyAaXCxSQaiaxT3g/C5m/0wWFXVaN/2SeGo+2Z3888ZlxPHWCLFrR2VuQ2fjZQXcDfMur68nZFbpo0/tvef3RE/CyZ8kD928eQq5Zs26yZNXMl+Yk5zJx9SYV0oq5NjqnE051G4yd5ffbl5fzkskQANcGamklZxMJtPJXNQadUSD88bNw6F+Yfsi0zbRXOmaWFhZ3GpucrUWNhWfNI26jVswxmSYzBlFJnOBxeV2lphNbhfvyWf236vaXzWzxaaqaCDDlOaFRWnzB4JpXl6VdgODM0sNVAs0bMWJ1gLGLMYS5gYZTp3Hqy0alxHyediCM3i9Pt/WclKOm1ECT3WV+X67t6y9fmzTOTXCVl79NGFEGD1+dvmNnrouffA5HsbNx63uPnWMdHrh7NJcgWvTvMy6zLEseOW4JeFlpVq2Ot0al/tswKrGiDZmJHe13+aw0ICEES7zvH3qRtKgzymcd21tMNO8duidmxcScvi19UQ3qfvA1uTfPjhza+zKLXcs7bq1pWCCM9fvKg9c8djze7f+mmQQ3wsPnLno4P6r6ge3WOitP3jiqSef6XsCVbIJD2O1aD8BdsmFD2mIwUJma5ZoejRcqb3dstTSbeeNBqtJNNGtppSJRkwzTNSUoKvlcTodASNHtcZCMAiGMkO3gTf41tm32+kC+zr7bvtRO28XIEQ4ptUMSteTPgx6XltkkGTD2VDG1Ignu44Vpzu8046DBxWKKsU9oq4ivXuvwJO4eza7K+BJ3FgxAXXmx1OMk20Hbh3TidZG+pIfE83kq5ti0UsvunDirFI+9NDVTdWfjW94NvlvOMcyjFcCzrGIXis/qbVpA/oCt80deNj+sOOhggeKDDpHi4PaD5gHLT/xfxT4wnw6TzvOPNfcZX4g4yH7zrxBk64hIOc3ha7MWxzaZN/kuD3v1nxDbahZ25JxsXmGtcXfmKfLyy8I1Zqq/dV51YHqfJ3WqLEZ/B5zgSkvLy+gy8+Ti1eabnDc6Lx+XE/RHc7bih51PlC0J29PwLyebHXf5Xmk6AdFSrE2L5H6OfNi/xjH/PBAbj7LDw+I+em816fm5SxMXG0mNXkteQ+b78/7Ud7beVp/nsnM8z4YWydQyVbMgLskQsZCiprPC1YxLuf4ME6SMiKTNsLHyHpyknBABMzFCK9KZrpQkhC5G09zC/iTeC5rKcxwydi0q9ItY7tuGRt1y9W1VW52OnHLwXH4wXatblE9CPDuuT45L7/K6iNtvpSP+loydW6/S/YHqlxytlglusj7LuKq1PvbgluDNCh7cqqCPnYKkd02Y6StmJQVk9JiUpzrLxOIUEn86tK2GiIqR5H0EjeYq8AbviHBPOsMLkX1yME867rw6TA7J2IizM6KGHVPdZxdrix7ip1J0lm2eMeicjh99FiBT0eHGqLzUz+VDRn2iLUQP2iBE/vMdSaHqY4l46Y6tM2n/Rl1MHaPiuKqzwy61MVdXYUHFnQQPK7gIcatSYdeJ27EPPsTF3aSKSM++7WLvlMbdDinJp+fv/a9j957uzD5uW1B+/IyKTtEXo62n/rru6OkNDxrbmF2qeR02FonzXuk9+CWzeWTGkVXINeZveTi1tvv/ZWCHn83evxsPgQueFx2X2q70vaghjNovdp6Wm9rpa22j6nOyoKfjc9wgdHpcBgN2kxHyOkEtlgtLlnKr9rtIik0DEZFVK8LLbjN0+eh3Z6THvpXD/EYM0IGvbrHomyfnpzUE73XHUnHSdQnu6uNqR9p2ki9oN7d6gV1hWNQxJjor1ZPcaFqPKI41F2phiW56RccWnb1s5cQrzgrMuW6IuLdPnfhFc8+SPuSnuGuiTN6jpOhf77Hfr9d83995573/gZ+Q5b/d7y0i37IXu4T7hP+p9/0aiZq92j36Aq/fb99v32/fb99v32/fb99v33/J70AWvaL4/8i0Tq475uIXwmhMbr0/yOayn8Im87RSmhQ6UOY8/9KXI6KK1PpQ7hb/StV+uaJfmX3/gXW+s/0Xr36x6pPf1iv/g+5vRfGj3z55ZlRoVm/EGUNZ/+q9d8B16TbfgplbmRzdHJlYW0KZW5kb2JqCjI5IDAgb2JqCjw8L0xlbmd0aCAxMi9GaWx0ZXIvRmxhdGVEZWNvZGU+PgpzdHJlYW0KeJxzYKAjAAAbrQBBCmVuZHN0cmVhbQplbmRvYmoKMzAgMCBvYmoKPDwvTGVuZ3RoIDIwOS9GaWx0ZXIvRmxhdGVEZWNvZGU+PgpzdHJlYW0KeJxdkE0OAiEMRvecghvMP6OJ6UY3LjRGvQBCMSyGITguvL0zRWsiCS/po03oV2z3u33wkyxOaTQXnKTzwSZ8jM9kUN7w7oOoamm9mT4V0Qw6imJ70PH6iijnBnS5PuoBi3NTkqnyjBktPqI2mHS4o9iU84GNmw8IDPbveZ2Hbu7X3QCzLoFUC8y6ItVoYHY9qVYBUzVZrYCpuqwcMJUh1ZXAVDarGpjKZdUDs29pl++vl7WWjL6RSPNMCcNEQVJQS0A+IGcdx7hMyfmKN6KGdLoKZW5kc3RyZWFtCmVuZG9iagozMSAwIG9iago8PC9MZW5ndGggMTkvRmlsdGVyL0ZsYXRlRGVjb2RlPj4Kc3RyZWFtCnick2AAAwWmxoUMgxYAANUuAV0KZW5kc3RyZWFtCmVuZG9iagozMiAwIG9iago8PC9MZW5ndGggNjEzMy9GaWx0ZXIvRmxhdGVEZWNvZGU+PgpzdHJlYW0KeJztOmt4FEW2p6q7p2cmk0zP5DGTZMj0ZDKDZMIrCeRBNpmQTIANgfA0g4kkQCQgSCC8XBEGFZHwXFZRcFfwsYq6SucBOwnuBQVfIML6YNfHAmpWcTWCXsVVSfqe6gkIu+799v653/3uR585jzp1qurUqVPV1QQgAGCAEHAgzVy6WN7W+MZS1PwaQDfkpsbZ85f1f/IblF8DEJTZ8269CbTHdhAb6Rvq62YdybuwGSBjBSqHN6DCOt/yFICJldMa5i9eHrH3OQBI7bwFM+siZfkVAOPE+XXLGw2vm36F9ruYsnFRfeNnzyz8EMvYv7FH6IRExCThCUjkvWAHUD9BPMt47xz1LKtnnP4NW4f7EGA3PEPmwDNwAF4g57HVHuiAdngFbFCK81oB98Ja0ME01KyDiQgC6u8liWo7DIaHMQ4PwzG0vR5WQickELv6KayCNdyb2GoNREMqFEMlLICNZKy6BKrhNH8n5MBYuAUaSUitUjepW9XH4LfQwb2i9kAUJMFMhGPqF8Kf1fdhILa4D7bDabLVsBf8OEoILX8Di2AHV8MTdbb6PXrggmXoAw8VcIwcpD7svR4+IXaygivBXh5VFfUwWjmgBhpgB3SSYWQUdQnVaoV6DBJwjOXY63ZohX0IYfgDvEtMwnn1MfU8JEIGjMH5tMPr5CDX27O6twgjJmCUBkAe1iyA/4CX4QRxk+fpAsEkZAp+4RfqWxAHQ2EKevsEtvyYfEtXIqziXuLL1JEQg3H5JYs2vAgfkCQymIwnU+kAuoA+xC0CPY44FGEWzMF4P4C9nyI+so+a6HHuUf5p/gddv94zagyuiBcehN/A8yQaZyqTJnIHOUk+oiV0On2Qfsjdyz/JvyHW4axvhPmwEZ6Gb4mV5JIJ5AbSQFaQteSXZDs5Rk6Qs7SYTqY303NcA7eQ+wM/EmES38TfKdwtrNed7a3qPdz7x95v1Uz1bpiA+bAavb8PHsKZdcBxeAfhNHxIBBJFYhBk4iJTyG0IK8lG8gjZTZ4k7TjKCfIh+ZR8Rb4hP1BA0NFk6qKpCG66iC6j99Jf0+MIJ+jn9DvOxqVyPm4YV8AFuQXo1VpuC8Je7gM+iT/OqxjnTGGbsFPYLTwtvCCc15nEO/Sgf+3ioz3pPad6ofee3m29rb3t6gcQj2uYhFFwQgF6X4cwF9d7G2bcHniTmDB2SSSdFJKxGJnpZC5ZSJZjJO8iO8hvNd+fJc9hlP5EzqHP0dSh+TyIDqMj6XiEG2k9XUi30K20nZ6k33MiF8WZuXgunRvF1XD13GLuVm4bp3CvcX/hPuQucBcRVN7IO/lU3sv7+FH8dH4J/xD/Cf+JUC0cFf6qM+rm6+7WhXVfisPFQrFSnCDWiJvFfeJb+lrMzkOwF34PVzzkDLeaC3B7YRPN4hPp6/R1zOfpMIuroJipdDe5h95O2mmasFw3go4g4+A878VYv0R30gt0BFdByskkmEuHRnrTxfF4GkEBfwi6+edwbq9jz8t1JrKSntOZoJUAzcMxX+SG8D7uKLzLnSYi/zC8xxuJjXTTJ7hKzII/8IVCFbi4X8Oz3EJyO+ylATydftBvwDweR57Cc2EyySR/51Tg6DjMohzuI7gTbqZ/hm7cx/fA/WQWPxs2QRZZAZ/A47grBgi36NJ18eRVOodvprGkHSj/JM4uj6QRToiDu0gNt0N3jr4DS+A4b4RT3O/Q++P0Wa6CPy9MJA24A26Hu2GhuhpuFar4N8hs4MhU8PBn8HRbwWXyLuSr8FSpxjNtH+7uTjwHirkK1Ngxc8ZiXkzBE2IHwgN4TvCYQXNwj1+Pp9jr0K6bTMMwW4gheOoA8Ed7J8I09XHYrs6GW9StMBDPg7XqCuxxN/wVNsNusqb3NmiEFNw5p8hYoYweF8rUgbSZvkMn0W1Xry9G20Ps8DeEZ6EMCoX90Mz/CSZBkbpBfRuz+zo8YbfDDPg5dOEsv8ARRnMHIat3HG1Ry7hGnO9pmKA+oTqJERrUeTAenoPfigLUiT5/cbG/qPBnBSPy83JzhmVnZQ4dMnjQwAxf+oDr+ns9ae5Ul+xM6edITkq02xLi42KtFskcE22KMhr0ok7gOUogI+Auq5UVb63Ce92jRw9kZXcdKuquUNQqMqrKrrZR5FrNTL7a0o+WN/2DpT9i6b9sSSS5AAoGZsgBt6wcK3XLYTJtQhXKG0vdQVnp1uQKTd6iydEou1zYQA7YG0plhdTKAaVsaUNzoLYUu2uJMpa4S+qNAzOgxRiFYhRKis3d2EJshUQTqC2Q30JBH41OKUnu0oCS6C5lHiicJ1A3S6mcUBUoTXa5ggMzFFIy0z1DAfdIxezTTKBEG0bRlSiiNow8h80G1sstGQebN4QlmFHrM81yz6qrrlK4uiAbw+LDcUsV2y+67D8WsXNrSdXaK2uTueaAfY7Mis3Na2Vl14SqK2tdjAaD2Ae2pZ6y2uYyHHoDBrF8koyj0TXBKoWswSFlNhM2q8j86t0BpqmdKysG90h3Q/PcWlyapGYFJt7qak1K8neoZyApIDdPrnK7lKJkd7Cu1NESB80Tb21L9MuJV9cMzGiRLJHAtsSY+wRT9JVC/eU6TdLMmVQ+8XJkCfPIPQYTQpFnyuhJlRvnlMtIfS40z8xFM3yCBFsps3BF5iiGktpmKZ/pWXtF8EhuufkbwAxwd39+taauT6PzSN8AE1meXE41rL8kKz6fkp7OUkQswTVFHwu18rCBGUvD1O1ulGRkGD6oxNjWBfMHY/hdLrbA68N+mIEFJTShKlKWYUZyK/gH+4IKrWU1By/VxE9hNaFLNZeb17oxk9uBXUTjFb338s8sJcQGGvIVkvDfVNdH6ssnucsnTKuSA821fbEtn3xVKVKfe7muT1JiS6q4ZNon0WROq8WkrL5szApVJoX34E+nJfWssKjHrNQ0RC5TpNrRERo0ulz/ZqOwep610tiPzfrcVPJ9V5dHXFW+yj1TM4cO40uwfPK05mbjVXWYapEBx/QxzHiYXOWSSxSYgjvTg7+wejCXYTBZ8WPISpgB5l9E1Ve8yjC5Tw7iw7JzYEYZHnTNzWVuuay5trkurIZmuGXJ3dxBX6AvNDcGai8lTljtXJ+slG0IYqwaSP5AtqZiYe84KJHg+z29WVK+tspXPlVMI1yHpAhv0QJetCR8o43Et5LJ2IN3YFrsBjNng3OIKiIHTqSDEccjTkfcjLgTUafZMc0CxFWIBxDPazV+zta6NcsfRrZeY21z52VqxbpIsbpGK7ZdH4zwigkRXjomYpYfMRuaHVEPGhnh/TMi3OrJDDFujM48WJzAJcAJRAqNSAk9DGZC8KW8i4sHBZFyuj6Nn7O2pXkzdx7geCAc5Qheop3qQY60Rlsyi41UpefACk76Be2O1NDuthhL5s7in9MPYQ/iAUSOfojwAf0AVtEzGE0z0iLEnYgHEI8jnkPU0TMIpxFO0VNo9RcYjFiEOB1xJ+IBxHOIIv0LUom+z9ZGo0wuQqT0faQSfQ+n9R5SM30XpXfpu+jam605eZkdmuAb3Cc4PX2CLblPsCZkhukbrd8NcIbpR22yz7mreAh9CxREioO9hZ2/BTJiJWItYiOiDqWTKJ2EEOIWxF2ICqIO25zENiexzRHE1xBPwhBEP2Ilop6eaMVhwvR4q3ekszgBb5wv49efkx6jr2j8NfqSxo/SFzX+KvIU5EfoS60pTiiOwnrANhJyCflgrBfo821pVqdabKEHMDxOpIMRixDHI05H3IyoowdoausspxU72Q9H9ICWrfCpxh+HR/Tgn+v0e0swx2RGvPk/QwnJTnmnl/q927ZjkRHvpq0oMeK9awNKjHh/sRolRrzzlqLEiHfWXJQY8U6bjhIj3vGTUUISpg/9Pq2/M2f8zUQuNtNlGKVlGKVlGKVlwOMHDQJ8xzPfHmxNT8eI7fD7BqQ7Q50k9BwJTSShR0ionoRWktBqEiogoRtJyEdCDhJKISE/Ce0nuRiKEPG3X1XM89tJ6AgJPUNCTSTkJSEPCaWRkExy/GHqah2TpbGAxtqK2b5C/rPCTDP66MKIujCtXbjtDyA9jqhqJT8ayakR48QUxlPb0osi5UH5mQuKR9ND2PAQLsMhOI3I4wIdwjQ6hJ0cwg7MSIsQpyMeRDyHqCLq0DoVHd+sUTPSwYhFiNMRVyGeQ9Rp7pxDpLCgz8U9mmOD+5wez0r0EAL7YnRRl7+f5JB80mhus4OYU8j4FDWF5kBCAp6BVoveEibR+76N/vu30WAoNtBNdDP0w4XY0sc3t37XzxkmD7R69zuL48n9kMJj1pE88BIP8lxo0srDwKFnPBsc9Gnkma2OqdjM3OrNcHaSGNZqn/M7R5fzU0eYonjWsd/5JznMk1bn26h5ep/zLcc656uDw3rUPOcNE2Sdsmba4ch1PnNEM12NFTtanSsZ2+e83THKebNDq6iPVNzYhCW/2TnRO805Gvsrdcxw+puwz33OIseNzoKI1TDWZp9zCLrgi4jp6OwAhzaoO0XrcEpOmDT4M8RtYpU4Hj8vM8UM0SU6xX5ishint+olfYzepDfq9XqdntdT/KCOC6tn/D78BoE4ncSYjmeU12SJMkrZJwruaKKn+A2ixHLltHzSSFKuHJwJ5TNk5cIkd5gY8SUsuEcSxVoO5ZNHKrm+8rCoTlRyfOWKWHlDVQshm4KoVeg9YYJv0DBRmWpNMrvudgAhljUbkxm/bs3GYBDsCUuL7EXWQkteWelPkNo+6vvxsV8l91O2lU+qUp7qF1QymaD2C5Yrv2L34Q7yFTkfKO0gXzIWrOrgCslXgYlMzxWWBoPlYTJVswOZfIl2mDFfanb6FJCZHcj6lIjdjoidB9ujXRpjaGcwgEez8xgMmh1PmF1LU1qgtCUtTbOxydCk2TTZ5CttjnjQxuPRbBJCcESzOZIQYjZKoWbicKBJikMzIUng0EwcJEkzmfqjyeA+k3WXTdZpI3HkRxtHxCb6zCWb6DNo4/t3n/qRPh9pGxGcWc2+JWrdgXrEWmX90ga7Epohyy0zg30fGd7aGTMbGK+rV4Lu+lJlprtUbhlR/RPV1ax6hLu0BaoDk6taqv31pa0j/CMC7rrSYNuoyuycq8Zad3ms7Mqf6KySdZbNxhqV8xPVOax6FBsrh42Vw8Ya5R+ljQVajldWtehhZBCvrhpvo1FGzNfaZFdwZILUWKgl7wiXfWVyJ15IdkMU3uRN+FUYjciqBhYPLGZVuKdYVQz7YOyrsq8c4UruJLv7qiRUW9wjwbd4SdMSsAfmlEZ+TfigavESFvAI9TX9qwfrAvjtV9q0GKBcSZ9UrhThXblFFFFby6ak5F/SRUUF8MoaUQ5CZT5TctxlQ6YrYDqDoc/wn9d/SR8vYbsgRPe3EX8KWQxNQU5JKZ9M8SiY3Hcz78TrEns9NAVxgk3ER5ou9aG5DREZ2Hwv4eIlfVJfHBb38UgrbNJ0KRyXH2zDbsiUaP+AKwC+XUQY2U5Jl04M0+3+WBD4Lg6MIt9FIFGvE7oo9xwdCgaynQwCu0+6UNBTME76uqCipwCKUJYuIhk6xGVxWTxI8FiEizJ38KJfgB9A5g/iWKDg4bhZ6MThDHB9i0MI0z1+r75AR0FnjDrKGfKFXL4AcnX5hCugVCaEHDUao1a7Hn4ATywcrKagQuqWurp6urqkL6CoqELq+RhPrDYBE4pIBVJBcOiQWM6SZeG4YVnxn+Sczn70OJnHGUigd//Fb3vvPXaMnc6J+N2wFL2wkw3+0gHgtQyweu15MNySZx1uHwOjLGOso+xVcL2lynq9XXpA/4CZcrwgUJ2o1wvGKJPJEB1jNpviYq3W+ASb3R4fVgvaBLDLjJusFsb90+L1BhmvcjgLiMP7uF3Q61Pi7XHx8XaryWBIibeiaLWYzGZZssRJksVqMOnt8YLZIpmACvEmgbNLZrPBoNdTSqjdarVYQJ9ksyVJxQYyAWQwIY1H9INAJuyTWbQSE8NkfctuuxarpMSKniR7T09SYo99XKC+9GNcJhajCGVgteURa16e5RLm5a2tGORbe/vhtYPs/8wwadbGSIcPIyk4fEm6kuBbzow7wYI7odVqtIfVC7m5QVR6UJmOyg4A9uGHGyYKNTGoaTP5BT8aDR1CFtW4SFZsgm14DjIrstgs4ibe/jqRkId6b3v5dFpSrpHY/vbGeLdj4MeHem/Z33u0v2iL631V6LxYdP99n6Vxp3qSej//z/Xt3LPfl/E1G+T6UT88yta7Uj3LdfOFkATH/KMMJuJ0lMSW2CbFTrLVxtbaHqQPcjuiH5MeSzLpoxONc+kcbq6wxNQYHYp+3LTXsM+412RKMN1t+ohyManTzQvMq8ycmYTpU/4xQzD2lVALjbAFdsEZOI9pbTZH4eel1REl2h18lMNMzGkxqcnoRVqUz4l5gKs0xhGfdlwkTrFIpOLQ5OzDbDfVLOxGsqjvkx1f7ixU3Yu+7l4ERd1F3da8wZa8wVJNF/6GDoGahQR/Np3OnQqWbOvwrMwEm+j1ulN18XEJWZnDuYKWfueefbf320WfrnvmfeeexFXT7nnqsbvmbiJrbL8/TvoR4+8IXb3n4eSb5x168+QLd+DeLFfP8ikYpXi8E57yz3KCI55O4WqEGsOUqHruZmGBoT5KL4FEJNrf+o7wfdyFJHGoNT9xqKPYWpFU7JhgrU6c6Kizzk+qcyzXLY+/QC/YJUgg5mibrTKhNqERv1wd5i3SLolKEp/sMIrAgmgg98VioGz+aDw5/Yb+6dlKNIlOcmKpzePNZtzfL8WdPcRJnAlZUproT0vPZqEbL3JiYkp2TiTZfRU9XeOkhT7fhYW+im4MWU+XFrSagp6FBYRltzUPs6wGasjCRZcCJ0FWJljiRFcCixlxefuzCHI3dmZ80fFp7zkS9/7bJIZcPGtsXTNzQ8+7dIIpd+q6FU+SqbZH24mTcMRErus91fudJO/pbCD33V3S8DjLtzuR5OD5wsGGDhBwHjm52QKbT/awCB8yNMJTPRr3e+Jt2WbBKewUTgv8eCTnBc4pNAohQRXw6g1GynkIhCM9Me5PyhqWvRPIQUw5vHHKcAKzj4dx/KjKSC4t8vkK2LlcxObMSvhk4bl4Z7vQ+X0Z+rgWQOfF1XbDSx1gUP/sL46KzvbwXXyX4QPbX2XhbeGCTG162W2wJ8sGjnOnOHTxjqgo3I46d1KiZDzhIVs8uzzUgydSjGeLheBHRs1eu2dLMklGyZ8INMvtISeAsL1BnVAE4zEiiWmeMFne5mKO+sZ9jb7hC6QLF7D765oe7ZRaiAlfUFBQVKSd9d0WPKNw+djqldzqj8FT1xtnsiQTa3R8MgEf8flWs1Vls4sfru0DRuItbkt2ZD9oEgoorX048/G5S+93rjzy0FNt7urCxnvbq2aNXZ3Pe+8bN31GVeeefT396W/mTc+/77Ge+2nr8uWVO37Z8w5GuBT3Rn+MVjS+O57311hFY6JplG60fqouqJ+tm6PXZ0v51vyEYfaAVG4tTwjYq4Vqw0SpxlqTMNE+X5hvmCXNt85PmGVfRuINOiH6Bm6yMNl4g2keVy/UG+eZjDYHL1owvHFpIlve2DRP9hCRgCiJMqb50NMsqKhPZBsB5Zg08KMJCyqFoUlsE+Cq+7pxA9RcqEFBOzNw7RfWwEK8cfgNk4RJhhnCDANPaoKxUg7GCOLjtF0Qqx0Yw7QYlT627sX3SMJtn60/3dvd0br27ta2NWtbaSzpv2lp7wc9xz67g6SQ6NeOvvbHF48eYWea+hVNF7aDDUIdYMT8dHuzDczRYhRCiXjamaKNhIMEyeAzG3UJDi7KLKVCKom2ekxEFfUBQ6BWbBRD4haRB5zrLlERD4onRJ3YSefiC3p4y02RhP66S+pml4yurwvY3FDEt3WeJStLepWluM/nseFkvN5hFvewLEsOJoPbEse2NZWSxhbMmJdx111te/fG+q5LeXinVFj/CJ25gYjzejdu6PlVRUYSuwkN74Nb//eALPxpoDzCk1fBD9xWbiuez5fgrmtwDa7BNbgG1+AaXINr8H8L8PuK/YGgD9n/E0NU/j+iuBES/yfIA1Rq2ATl/wrJy3Cn7ilYyxDLpf+IOG6a9td++sfPW5Q9ndPNBd/ok/XaH/0f+ah/OuN7f9b6yvd7emZL+fqx2v9S7vvfAf8Fjg3ofQplbmRzdHJlYW0KZW5kb2JqCjMzIDAgb2JqCjw8L0ZpbHRlci9GbGF0ZURlY29kZS9UeXBlL1hSZWYvTGVuZ3RoIDc0L1Jvb3QgNyAwIFIvV1sxIDIgMV0vU2l6ZSAzMy9JRFsoLHv08KD69FR7eaTQP3nxwikoLHv08KD69FR7eaTQP3nxwildL0luZm8gMjAgMCBSL0RlY29kZVBhcm1zPDwvQ29sdW1ucyA0L1ByZWRpY3RvciAxMj4+Pj4Kc3RyZWFtCngBtc6hEYAwFAPQJBxoFBZGwnHHFgzCSMyDaU0X+M0fouZdohIhAiJXgwYB4EBi+qrA30N6zFIMdzO/mW5zRN44s26ZLnQdSAs8CmVuZHN0cmVhbQplbmRvYmoKc3RhcnR4cmVmCjE5NzExCiUlRU9GCg==';

                var mywindow = window.open('', 'my div');
                let TmpMeta = mywindow.document.createElement('meta');
                TmpMeta.httpEquiv = "Content-Security-Policy";
                TmpMeta.content = 'object-src "self" http://* https://* file://* "unsafe-inline" "unsafe-eval"'
                mywindow.document.getElementsByTagName('head')[0].appendChild(TmpMeta)
                // Decode Base64 to binary and show some information about the PDF file (note that I skipped all checks)
                var bin = atob(b64);
                console.log('File Size:', Math.round(bin.length / 1024), 'KB');
                console.log('PDF Version:', bin.match(/^.PDF-([0-9.]+)/)[1]);
                console.log('Create Date:', bin.match(/<xmp:CreateDate>(.+?)<\/xmp:CreateDate>/)[1]);
                console.log('Modify Date:', bin.match(/<xmp:ModifyDate>(.+?)<\/xmp:ModifyDate>/)[1]);
                console.log('Creator Tool:', bin.match(/<xmp:CreatorTool>(.+?)<\/xmp:CreatorTool>/)[1]);

                // Embed the PDF into the HTML page and show it to the user
                var obj = mywindow.document.createElement('object');
                obj.style.width = '100%';
                obj.style.height = '842pt';
                obj.type = 'application/pdf';
                obj.data = 'data:application/pdf;base64,' + b64;
                mywindow.document.body.appendChild(obj);

                // Insert a link that allows the user to download the PDF file
                var link = mywindow.document.createElement('a');
                link.innerHTML = 'Download PDF file';
                link.download = 'file.pdf';
                link.href = 'data:application/octet-stream;base64,' + b64;
                mywindow.document.body.appendChild(link);
                // var mywindow = window.open('', 'my div');
                // mywindow.document.write('<object data="data:application/pdf;base64,' + pResult.split('|')[1] + ' type="application/pdf" width="100%" height="100%"></object>');
            }
            

            //mywindow.print();
            //mywindow.close();
        })
    }
}