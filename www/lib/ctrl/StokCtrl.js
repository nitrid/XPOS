function StokCtrl ($scope,$window,$location,db)
{
    let SecimSelectedRow = null;
    let ModalTip = "";
    let StokListePage = false;
    $scope.Birim =
    [
        {Kodu:"Unité",Symbol:"U"},
        {Kodu:"Kilogramme",Symbol:"KG"},
        {Kodu:"Colis",Symbol:"CO"},
        {Kodu:"Heure",Symbol:"H"},
        {Kodu:"Litre",Symbol:"L"},
        {Kodu:"Metre",Symbol:"M"},
        {Kodu:"Metre Carre",Symbol:"M2"},
        {Kodu:"Jour",Symbol:"J"}
    ];    
    let DateField = function (config)
    {
        jsGrid.Field.call(this, config);
    };
    DateField.prototype = new jsGrid.Field(
    {
        sorter: function (date1, date2)
        {
            return new Date(date1) - new Date(date2);
        },
        itemTemplate: function (value,item)
        {
            if(item.TYPE != 0)
            {
                if (value.toLowerCase().indexOf("Date") == -1)
                {
                    return moment(new Date(value)).format("MM.DD.YYYY");
                }
                else
                {
                    return moment(new Date(value)).attr("style", "visibility: hidden")
                }
            }
        },
        insertTemplate: function (value)
        {
            return this._insertPicker = $("<input>").datepicker({
                format: 'dd.mm.yyyy'
            });
        },
        editTemplate: function (value,item)
        {
            if(item.TYPE != 0)
            {
                return this._editPicker = $("<input>").datepicker({
                    format: 'dd.mm.yyyy'
                }).datepicker("setDate", moment(new Date(value)).format("MM.DD.YYYY"));
            }
            
        },
        insertValue: function ()
        {
            return this._insertPicker.datepicker({
                format: 'dd.mm.yyyy'
            }).val();
        },
        editValue: function ()
        {
            if(this._editPicker != null)
            {
                return this._editPicker.datepicker({
                    format: 'dd.mm.yyyy'
                }).val();
            }
        }
    });
    jsGrid.fields.DateField = DateField;
    //#region "STOK LISTESİ"
    let TmpFields =
    [
        {
            dataField: "CODE",
            caption : db.Language($scope.Lang,"ÜRÜN KODU"),
            dataType : "string",
        },
        {
            dataField: "NAME",
            caption : db.Language($scope.Lang,"ÜRÜN TAM ADI"),
            dataType : "string",
        },
        {
            dataField: "BARCODE",
            caption : db.Language($scope.Lang,"BARKODU"),
            dataType : "string",
        },
        {
            dataField: "SNAME",
            caption : db.Language($scope.Lang,"ÜRÜN KISA ADI"),
            dataType : "string",
            visible: false
        },
        {
            dataField: "ITEM_GRP",
            caption : db.Language($scope.Lang,"ÜRÜN GRUBU"),
            dataType : "string",
            visible: false
        },        
        {
            dataField: "VAT",
            caption : db.Language($scope.Lang,"VERGİ DİLİMİ"),
            dataType : "number",
            visible: false
        },
        {
            dataField: "COST_PRICE",
            caption : db.Language($scope.Lang,"MALİYET FİYATI"),
            dataType : "number",
            visible: false
        },
        {
            dataField: "MIN_PRICE",
            caption : db.Language($scope.Lang,"MİNİMUM SATIŞ FİYATI"),
            dataType : "number",
            visible: false
        },
        {
            dataField: "MAX_PRICE",
            caption : db.Language($scope.Lang,"MAKSİMUM SATIŞ FİYATI"),
            dataType : "number",
            visible: false
        },
        {
            dataField: "UNIT",
            caption : db.Language($scope.Lang,"BİRİM"),
            dataType : "string",
            visible: false
        },        
        {
            dataField: "PRICE",
            caption : db.Language($scope.Lang,"SATIŞ FİYATI"),
            dataType : "number",
            visible: false
        },
        {
            dataField: "CUSTOMER_ITEM_CODE",
            caption : db.Language($scope.Lang,"TEDARİKÇİ ÜRÜN KODU"),
            dataType : "string",
            visible: true
        },
        {
            dataField: "CUSTOMER",
            caption : db.Language($scope.Lang,"TEDARİKÇİ"),
            dataType : "string",
            visible: true
        },
        {
            dataField: "BRUTMARJ",
            caption : db.Language($scope.Lang,"BRUTMARJ"),
            dataType : "string",
            visible: false,
            cellTemplate: function(element, info)
            {
                if(typeof info.data.PRICE != 'undefined')
                {
                    let TmpExVat = info.data.PRICE / ((info.data.VAT / 100) + 1)
                    let TmpMarj = TmpExVat - info.data.COST_PRICE;
                    let TmpMarjOran = ((TmpExVat - info.data.COST_PRICE) / TmpExVat) * 100

                    if(TmpMarjOran.toFixed(0) < 30)
                    {
                        element.append("<div style='color:red;font-weight: bold'>" + TmpMarj.toFixed(2) + '€ / %' +  TmpMarjOran.toFixed(0) + "</div>")
                    }
                    else
                    {
                        element.append("<div style='color:blue;font-weight: bold'>" + TmpMarj.toFixed(2) + '€ / %' +  TmpMarjOran.toFixed(0) + "</div>")
                    }
                }
            }
        },
        {
            dataField: "NETMARJ",
            caption : db.Language($scope.Lang,"NETMARJ"),
            dataType : "string",
            visible: false,
            cellTemplate: function(element, info)
            {
                if(typeof info.data.PRICE != 'undefined')
                {
                    let TmpExVat = info.data.PRICE / ((info.data.VAT / 100) + 1)
                    let TmpMarj = (TmpExVat - info.data.COST_PRICE) / 1.12;
                    let TmpMarjOran = (((TmpExVat - info.data.COST_PRICE) / 1.12) / TmpExVat) * 100

                    if(TmpMarjOran.toFixed(0) < 30)
                    {
                        element.append("<div style='color:red;font-weight: bold'>" + TmpMarj.toFixed(2) + '€ / %' +  TmpMarjOran.toFixed(0) + "</div>")
                    }
                    else
                    {
                        element.append("<div style='color:blue;font-weight: bold'>" + TmpMarj.toFixed(2) + '€ / %' +  TmpMarjOran.toFixed(0) + "</div>")
                    }
                }
            }
        },
        {
            dataField: "STATUS",
            caption : db.Language($scope.Lang,"DURUM"),
            dataType : "string",
            visible: false
        }
    ];
    let QueryField = 
    {
        Unit:
        {
            Field : "",
            Outer : ""
        },
        Price:
        {
            Field : "",
            Outer : ""
        },
        Customer:
        {
            Field : "",
            Outer : "",
            Where : ""
        },
        Barcode:
        {
            Field : "",
            Outer : "",
            Where : ""
        },
        Code:
        {
            Where : ""
        }
    }
    function TblStokListeInit()
    {
        $("#TblStokListe").dxDataGrid(
        {
            dataSource: $scope.StokListesi.Data,
            allowColumnReordering: true,
            allowColumnResizing: true,
            showBorders: true,
            columnResizingMode: "nextColumn",
            columnMinWidth: 50,
            columnAutoWidth: true,
            filterRow: 
            {
                visible: true,
                applyFilter: "auto"
            },
            headerFilter: 
            {
                visible: true
            },
            paging: 
            {
                pageSize: 50
            },
            pager: 
            {
                showPageSizeSelector: true,
                allowedPageSizes: [25, 50, 100, 200, 500, 1000],
                showInfo: true
            },
            selection: 
            {
                mode: "multiple"
            },
            export: 
            {
                enabled: true,
                allowExportSelectedData: true
            },
            onExporting: function(e) 
            {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('ITEMS');
                
                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function() {
                    workbook.xlsx.writeBuffer().then(function(buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ITEMS.xlsx');
                    });
            });
            e.cancel = true;
            },
            columns: TmpFields,
            onRowDblClick: function(e)
            {
                if(typeof e.data.NAME != 'undefined')
                {
                    StokListePage = true;
                    StokGetir(e.data.CODE);
    
                    $("#TbDetay").addClass('active');
                    $("#TbMain").removeClass('active');
                }
            },
            onRowPrepared: function (rowInfo) 
            {  
                if(typeof rowInfo.data != 'undefined')
                {
                    if(rowInfo.data.STATUS == 'Pasif')
                    {
                        rowInfo.rowElement.css('background', '#dce1e2');
                    }
                }
            }  
        });
    }
    function StokListeGetir()
    {
        QueryField.Unit.Field = "";
        QueryField.Unit.Outer = "";
        QueryField.Price.Field = "";
        QueryField.Price.Outer = "";
        QueryField.Customer.Field = "";
        QueryField.Customer.Outer = "";        
        QueryField.Customer.Where = "";
        QueryField.Barcode.Field = "";
        QueryField.Barcode.Outer = "";
        QueryField.Barcode.Where = "";
        QueryField.Code.Where = "";

        let TmpVal = ""
        
        for (let i = 0; i < $scope.StokListesi.Barkod.split(' ').length; i++) 
        {
            TmpVal += "'" + $scope.StokListesi.Barkod.split(' ')[i] + "'"
            if($scope.StokListesi.Barkod.split(' ').length > 1 && i !=  ($scope.StokListesi.Barkod.split(' ').length - 1))
            {
                TmpVal += ","
            }
        }

        for (let x = 0; x < $scope.StokListesi.Kolon.length; x++) 
        {
            
            if($scope.StokListesi.Kolon[x].CODE == "UNIT")    
            {
                QueryField.Unit.Field = "ISNULL(ITEM_UNIT.NAME,'') AS UNIT, ";
                QueryField.Unit.Outer = "LEFT OUTER JOIN ITEM_UNIT ON ITEMS.CODE = ITEM_UNIT.ITEM_CODE ";
            } 
            if($scope.StokListesi.Kolon[x].CODE == "PRICE")    
            {
                QueryField.Price.Field = "ISNULL(ITEM_PRICE.PRICE,0) AS PRICE, ";
                QueryField.Price.Outer = "LEFT OUTER JOIN ITEM_PRICE ON ITEM_PRICE.ITEM_CODE = ITEMS.CODE AND ITEM_PRICE.TYPE = 0 ";
            } 
            if($scope.StokListesi.Kolon[x].CODE == "CUSTOMER_ITEM_CODE")    
            {
                QueryField.Customer.Field = "ISNULL(ITEM_CUSTOMER.CUSTOMER_ITEM_CODE,'') AS CUSTOMER_ITEM_CODE, ISNULL((SELECT TOP 1 NAME FROM CUSTOMERS WHERE CODE = ITEM_CUSTOMER.CUSTOMER_CODE),'') AS CUSTOMER, ";
                QueryField.Customer.Outer = "LEFT OUTER JOIN ITEM_CUSTOMER ON ITEM_CUSTOMER.ITEM_CODE = ITEMS.CODE ";
                QueryField.Customer.Where = "OR ITEM_CUSTOMER.CUSTOMER_ITEM_CODE IN (" + TmpVal + ") "
            }   
            if($scope.StokListesi.Kolon[x].CODE == "BARCODE")    
            {
                QueryField.Barcode.Field = "ISNULL(ITEM_BARCODE.BARCODE,'') AS BARCODE, ";
                QueryField.Barcode.Outer = "LEFT OUTER JOIN ITEM_BARCODE ON ITEM_BARCODE.ITEM_CODE = ITEMS.CODE ";

                if($scope.StokListesi.Barkod.split(' ').length > 1)
                {
                    QueryField.Barcode.Where = "ITEM_BARCODE.BARCODE IN (" + TmpVal + ") OR "
                }
                else
                {
                    QueryField.Barcode.Where = "ITEM_BARCODE.BARCODE LIKE " + TmpVal + " + '%' OR "
                }
            }  
        } 

        if($scope.StokListesi.Barkod.split(' ').length > 1)
        {
            QueryField.Code.Where = " ITEMS.CODE IN (" + TmpVal + ")) ";
        }
        else
        {
            QueryField.Code.Where = " ITEMS.CODE LIKE " + TmpVal + " + '%') ";
        }
        
        if($scope.StokListesi.Adi.length > 0 && $scope.StokListesi.Adi.substring($scope.StokListesi.Adi.length-1,$scope.StokListesi.Adi.length) != "*")
        {
            $scope.StokListesi.Adi += "*"
        }
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT " +
                    "ITEMS.CODE AS CODE, " +
                    "ITEMS.NAME AS NAME, " +
                    "ITEMS.SNAME AS SNAME, " +
                    "ITEMS.ITEM_GRP AS ITEM_GRP, " +
                    "ITEMS.VAT AS VAT, " +
                    "ITEMS.COST_PRICE AS COST_PRICE, " +
                    "ITEMS.MIN_PRICE AS MIN_PRICE, " +
                    "ITEMS.MAX_PRICE AS MAX_PRICE, " +
                    QueryField.Unit.Field +
                    QueryField.Barcode.Field +
                    QueryField.Price.Field +
                    QueryField.Customer.Field +
                    "CASE WHEN ITEMS.STATUS = 0 THEN 'Pasif' ELSE 'Aktif' END AS STATUS " +
                    "FROM ITEMS " +
                    QueryField.Unit.Outer +
                    QueryField.Barcode.Outer + 
                    QueryField.Price.Outer +
                    QueryField.Customer.Outer +
                    "WHERE ((" + QueryField.Barcode.Where + 
                    QueryField.Code.Where +
                    QueryField.Customer.Where + 
                    "OR (@BARCODE = '')) AND ((UPPER(ITEMS.NAME) LIKE UPPER(@NAME)) OR (@NAME = '')) AND " +
                    "((ITEMS.ITEM_GRP = @ITEM_GRP) OR (@ITEM_GRP = '')) AND ((ITEMS.STATUS = @STATUS) OR (@STATUS = 0)) AND " +
                    "(((SELECT TOP 1 CUSTOMER_CODE FROM ITEM_CUSTOMER WHERE ITEM_CODE = ITEMS.CODE) = @CUSTOMER) OR (@CUSTOMER='')) " ,
            param : ["BARCODE:string|50","NAME:string|250","ITEM_GRP:string|25","STATUS:bit","CUSTOMER:string|25"],
            value : [$scope.StokListesi.Barkod,$scope.StokListesi.Adi.replaceAll('*','%'),$scope.StokListesi.Grup,$scope.StokListesi.Durum,$scope.StokListesi.Tedarikci]
        }
        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.StokListesi.Data = Data;
            
            for (let i = 0; i < $scope.StokListesi.Barkod.split(' ').length; i++) 
            {
                let TmpData = $scope.StokListesi.Data.find((item) => item.CODE === $scope.StokListesi.Barkod.split(' ')[i] || item.BARCODE === $scope.StokListesi.Barkod.split(' ')[i] || item.CUSTOMER_ITEM_CODE === $scope.StokListesi.Barkod.split(' ')[i]);
                
                if(typeof TmpData == 'undefined')
                {
                    $scope.StokListesi.Data.push({CODE : $scope.StokListesi.Barkod.split(' ')[i]})
                }
                // for (let x = 0; x < $scope.StokListesi.Data.length; x++) 
                // {
                //     if($scope.StokListesi.Data[x].CODE != $scope.StokListesi.Barkod.split(' ')[i] && $scope.StokListesi.Data[x].BARCODE != $scope.StokListesi.Barkod.split(' ')[i] && (typeof $scope.StokListesi.Data[x].CUSTOMER_ITEM_CODE != 'undefined' && $scope.StokListesi.Data[x].CUSTOMER_ITEM_CODE != $scope.StokListesi.Barkod.split(' ')[i]))
                //     {
                //         console.log($scope.StokListesi.Barkod.split(' ')[i])
                //     }
                    
                // }
            }
            TblStokListeInit();
        });
    }
    function DrpDwnInitKolon()
    {
        let TmpKolon = 
        [            
            {CODE : "NAME",NAME : db.Language($scope.Lang,"ÜRÜN TAM ADI")},
            {CODE : "SNAME",NAME : db.Language($scope.Lang,"ÜRÜN KISA ADI")},
            {CODE : "ITEM_GRP",NAME : db.Language($scope.Lang,"ÜRÜN GRUBU")},                                   
            {CODE : "UNIT",NAME : db.Language($scope.Lang,"BİRİM")},
            {CODE : "CODE",NAME : db.Language($scope.Lang, "ÜRÜN KODU")},
            {CODE : "BARCODE",NAME : db.Language($scope.Lang,"BARKODU")},
            {CODE : "CUSTOMER_ITEM_CODE",NAME : db.Language($scope.Lang,"TEDARİKÇİ ÜRÜN KODU")},
            {CODE : "CUSTOMER",NAME : db.Language($scope.Lang,"TEDARİKÇİ")},
            {CODE : "COST_PRICE",NAME : db.Language($scope.Lang,"MALİYET FİYATI")},
            {CODE : "PRICE",NAME : db.Language($scope.Lang,"SATIŞ FİYATI")},    
            {CODE : "VAT",NAME : db.Language($scope.Lang,"VERGİ DİLİMİ")},         
            {CODE : "BRUTMARJ",NAME : db.Language($scope.Lang,"BRUTMARJ")},
            {CODE : "NETMARJ",NAME : db.Language($scope.Lang,"NETMARJ")},
            {CODE : "MIN_PRICE",NAME : db.Language($scope.Lang,"MİNİMUM SATIŞ FİYATI")},
            {CODE : "MAX_PRICE",NAME : db.Language($scope.Lang,"MAKSİMUM SATIŞ FİYATI")},
            {CODE : "STATUS",NAME : db.Language($scope.Lang,"DURUM")}
        ]
        
        $scope.StokListesi.CmbKolon = 
        {
            bindingOptions: 
            {
                value: 'StokListesi.Kolon'
            },
            width: "100%",
            keyExpr: "CODE",
            displayExpr: "NAME",
            dataSource: TmpKolon,
            List :
            {
                dataSource: TmpKolon,
                selectionMode: "multiple",
                showSelectionControls: true,
                keyExpr: "CODE",
                displayExpr: "NAME",
                bindingOptions: 
                {
                    selectedItems: "StokListesi.Kolon",
                },
                onSelectionChanged :function(arg)
                {
                    $scope.KolonChange();
                }
            }
        }
    }
    $scope.GrupGetir = function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT [NAME],[CODE] FROM ITEM_GROUP ORDER BY [NAME] ASC"
        }
        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.StokListesi.GrupData = Data
        });
    }
    $scope.TedarikciGetir = function()
    {
        let TmpQuery = 
        {
            db : $scope.Firma,
            query:  "SELECT CODE,NAME FROM CUSTOMERS WHERE TYPE = 1 ORDER BY NAME ASC"
        }
        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.StokListesi.TedarikciData = Data
        });
    } 
    $scope.KolonChange = function()
    {
        for (let i = 0; i < TmpFields.length; i++) 
        {
            TmpFields[i].visible = false;
        }

        for (let i = 0; i < TmpFields.length; i++) 
        {
            for (let x = 0; x < $scope.StokListesi.Kolon.length; x++) 
            {
                if($scope.StokListesi.Kolon[x].CODE == TmpFields[i].name)    
                {
                    TmpFields[i].visible = true;
                }                
            }            
        }

        TblStokListeInit();
    }
    $scope.BtnAra = function()
    {
        StokListeGetir();
    }
    $scope.TxtAra = function(keyEvent)
    {    
        if(keyEvent.which === 13)
        {   
            StokListeGetir();
        }
    }
    //#endregion    
    function TblFiyatInit()
    {
        let Grd = $("#TblFiyat").dxDataGrid(
        {
            dataSource: $scope.FiyatListe,
            allowColumnReordering: true,
            allowColumnResizing: true,
            showBorders: true,
            columnResizingMode: "nextColumn",
            columnMinWidth: 50,
            columnAutoWidth: true,
            width:"100%",
            paging: 
            {
                enabled: false
            },
            editing: 
            {
                mode: "batch",
                allowUpdating: true,
                allowDeleting: true,
                allowAdding: true
            },
            columns: 
            [
                {
                    dataField: "TYPENAME",
                    caption: db.Language($scope.Lang,"Tip"),
                    allowEditing: false,
                    width: "10%"
                },     
                {
                    dataField: "DEPOT",
                    caption: db.Language($scope.Lang,"Depo"),
                    alignment: "center",
                    allowEditing: false,
                    width: "5%"
                }, 
                {
                    dataField: "START_DATE",
                    caption: db.Language($scope.Lang,"Baş.Tarih"),
                    dataType: "date",
                    format: 'dd/MM/yyyy',
                    alignment: "center",
                    allowEditing: true,
                    width: "10%",
                    cellTemplate: function(element, info)
                    {
                        if(moment().diff(moment(info.data.START_DATE),'year') > 1)
                        {
                            element.append("<div></div>")
                        }
                        else
                        {
                            element.append("<div>" + info.text + "</div>")
                        }
                    }
                }, 
                {
                    dataField: "FINISH_DATE",
                    caption: db.Language($scope.Lang,"Bit.Tarih"),
                    dataType: "date",
                    format: 'dd/MM/yyyy',
                    alignment: "center",
                    allowEditing: true,
                    width: "10%",
                    cellTemplate: function(element, info)
                    {        
                        if(moment().diff(moment(info.data.FINISH_DATE),'year') > 1)
                        {
                            element.append("<div></div>")
                        }
                        else
                        {
                            
                            element.append("<div>" + info.text + "</div>")
                        }
                    }
                }, 
                {
                    dataField: "QUANTITY",
                    caption: db.Language($scope.Lang,"Miktar"),
                    dataType: "number",
                    width: "5%"
                }, 
                {
                    dataField: "PRICE",
                    caption : db.Language($scope.Lang,"Fiyat"),
                    dataType: "number",
                    alignment: "center",
                    width: "10%"
                },
                {
                    dataField: "CUSTOMER",
                    caption : db.Language($scope.Lang,"Cari"),
                    alignment: "center",
                    allowEditing: false,
                    width: "10%"
                },
                {
                    dataField: "EXVAT",
                    caption : db.Language($scope.Lang,"Vergi Hariç"),
                    alignment: "center",
                    allowEditing: false,
                    width: "10%"
                },       
                {
                    dataField: "BRUTMARJ",
                    caption : db.Language($scope.Lang,"Brut Marj"),
                    alignment: "center",
                    width: "10%",
                    allowEditing: false,
                    cellTemplate: function(element, info)
                    {
                        if(info.data.BRUTMARJORAN < 30)
                        {
                            element.append("<div style='color:red;font-weight: bold'>" + info.text + "</div>")
                        }
                        else
                        {
                            element.append("<div style='color:blue;font-weight: bold'>" + info.text + "</div>")
                        }
                    }
                },  
                {
                    dataField: "NETMARJ",
                    caption : db.Language($scope.Lang,"Net Marj"),
                    alignment: "center",
                    width: "10%",
                    allowEditing: false,
                    cellTemplate: function(element, info)
                    {
                        if(info.data.NETMARJORAN < 30)
                        {
                            element.append("<div style='color:red;font-weight: bold'>" + info.text + "</div>")
                        }
                        else
                        {
                            element.append("<div style='color:blue;font-weight: bold'>" + info.text + "</div>")
                        }
                    }
                }, 
            ],
            onRowUpdated: function(e) 
            {                         
                db.ExecuteTag($scope.Firma,'FiyatUpdate',[$scope.StokListe[0].CODE,e.data.TYPE,e.data.DEPOT,e.data.PRICE,e.data.QUANTITY,moment(e.data.START_DATE).format("DD.MM.YYYY"),moment(e.data.FINISH_DATE).format("DD.MM.YYYY"),e.data.GUID],function(data)
                {
                    // console.log(data)
                    // if(data.result.recordset[0].ITEM_CODE != '')
                    // {
                    //     alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                    //     alertify.alert(db.Language($scope.Lang,"Benzer kayıt oluşturamazsınız !"));
                    // }
                    
                    //FİYAT LİSTESİ GETİR
                    db.GetData($scope.Firma,'StokKartFiyatListeGetir',[$scope.StokListe[0].CODE],function(FiyatData)
                    {
                        $scope.FiyatListe = FiyatData;                                              
                        $scope.CmbAltBirimChange(); 
                        TblFiyatInit();
                    });
                });
            },
            onRowUpdating: function(e) 
            {
                if(typeof e.newData.PRICE != 'undefined')
                {
                    if($scope.StokListe[0].COST_PRICE == "" || $scope.StokListe[0].COST_PRICE == 0)
                    {
                        alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                        alertify.alert(db.Language($scope.Lang,"Maliyet fiyatı girmeden fiyat tanımlayamazsınız !"));
                        e.cancel = true;
                        return;
                    }
                    if(parseFloat(e.newData.PRICE.toString().replace(',','.')) < parseFloat($scope.StokListe[0].COST_PRICE.toString().replace(',','.')))
                    {
                        alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                        alertify.alert(db.Language($scope.Lang,"Girdiğiniz fiyat maliyet fiyatından küçük olamaz !"));
                        e.cancel = true;
                        return;
                    }                    
                    if(parseFloat($scope.StokListe[0].MIN_PRICE.toString().replace(',','.')) > 0 && parseFloat($scope.StokListe[0].MIN_PRICE.toString().replace(',','.')) > parseFloat(e.newData.PRICE.toString().replace(',','.')))
                    {
                        alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                        alertify.alert(db.Language($scope.Lang,"Girdiğiniz fiyat minimum fiyatdan küçük olamaz !"));
                        e.cancel = true;
                        return;
                    }
                    if(parseFloat($scope.StokListe[0].MAX_PRICE.toString().replace(',','.')) > 0 && parseFloat($scope.StokListe[0].MAX_PRICE.toString().replace(',','.')) < parseFloat(e.newData.PRICE.toString().replace(',','.')))
                    {
                        alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                        alertify.alert(db.Language($scope.Lang,"Girdiğiniz fiyat maximum fiyatdan büyük olamaz !"));
                        e.cancel = true;
                        return;
                    }
                }
                if(typeof e.newData.QUANTITY != 'undefined')
                {
                    if(parseFloat(e.newData.QUANTITY.toString().replace(',','.')) <= 0)
                    {
                        alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                        alertify.alert(db.Language($scope.Lang,"Miktar sıfır giremezsiniz !"));
                        e.cancel = true;
                        return;
                    }
                }
            },
            onRowRemoved: function(e) 
            {
                db.ExecuteTag($scope.Firma,'FiyatSil',[e.data.GUID],function(data)
                {
                    //FİYAT LİSTESİ GETİR
                    db.GetData($scope.Firma,'StokKartFiyatListeGetir',[$scope.StokListe[0].CODE],function(FiyatData)
                    {
                        $scope.FiyatListe = FiyatData;
                        $scope.CmbAltBirimChange();
                    });
                });
            },
            onInitNewRow: function(e) 
            {
                e.data.TYPENAME = 'Standart'
                e.data.DEPOT = 0
                e.data.START_DATE = moment(new Date(0)).format("DD.MM.YYYY") 
                e.data.FINISH_DATE = moment(new Date(0)).format("DD.MM.YYYY") 
                e.data.QUANTITY = 1
                e.data.PRICE = 0
                e.data.CUSTOMER = ""
            },
            onRowInserted: function(e) 
            {
                $scope.FiyatModal = {};
                $scope.FiyatModal.Tip = "0";
                $scope.FiyatModal.StokKodu = $scope.StokListe[0].CODE;
                $scope.FiyatModal.Depo = e.data.DEPOT;
                $scope.FiyatModal.Baslangic = moment(e.data.START_DATE).format("DD.MM.YYYY")
                $scope.FiyatModal.Bitis = moment(e.data.FINISH_DATE).format("DD.MM.YYYY")
                $scope.FiyatModal.Fiyat = e.data.PRICE;
                $scope.FiyatModal.Miktar = e.data.QUANTITY;
                $scope.FiyatModal.Cari = e.data.CUSTOMER;

                $scope.BtnFiyatKaydet();
            },
            onRowInserting: function(e) 
            {                
                if($scope.StokListe[0].COST_PRICE == "" || $scope.StokListe[0].COST_PRICE == 0)
                {
                    alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                    alertify.alert(db.Language($scope.Lang,"Maliyet fiyatı girmeden fiyat tanımlayamazsınız !"));
                    e.cancel = true;
                    return;
                }
                if(parseFloat(e.data.PRICE.toString().replace(',','.')) < parseFloat($scope.StokListe[0].COST_PRICE.toString().replace(',','.')))
                {
                    alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                    alertify.alert(db.Language($scope.Lang,"Girdiğiniz fiyat maliyet fiyatından küçük olamaz !"));
                    e.cancel = true;
                    return;
                }
                if(parseFloat(e.data.QUANTITY.toString().replace(',','.')) <= 0)
                {
                    alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                    alertify.alert(db.Language($scope.Lang,"Miktar sıfır giremezsiniz !"));
                    e.cancel = true;
                    return;
                }
                if(parseFloat($scope.StokListe[0].MIN_PRICE.toString().replace(',','.')) > 0 && parseFloat($scope.StokListe[0].MIN_PRICE.toString().replace(',','.')) > parseFloat(e.data.PRICE.toString().replace(',','.')))
                {
                    alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                    alertify.alert(db.Language($scope.Lang,"Girdiğiniz fiyat minimum fiyatdan küçük olamaz !"));
                    e.cancel = true;
                    return;
                }
                if(parseFloat($scope.StokListe[0].MAX_PRICE.toString().replace(',','.')) > 0 && parseFloat($scope.StokListe[0].MAX_PRICE.toString().replace(',','.')) < parseFloat(e.data.PRICE.toString().replace(',','.')))
                {
                    alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                    alertify.alert(db.Language($scope.Lang,"Girdiğiniz fiyat maximum fiyatdan büyük olamaz !"));
                    e.cancel = true;
                    return;
                }
            },
        }).dxDataGrid("instance");
    }
    function TblBirimInit()
    {
        $("#TblBirim").dxDataGrid(
        {
            dataSource: $scope.BirimListe,
            allowColumnReordering: true,
            allowColumnResizing: true,
            showBorders: true,
            columnResizingMode: "nextColumn",
            columnMinWidth: 50,
            columnAutoWidth: true,
            width:"100%",
            paging: 
            {
                enabled: false
            },
            editing: 
            {
                mode: "batch",
                allowUpdating: true,
                allowDeleting: true
            },
            columns: 
            [
                {
                    dataField: "TYPENAME",
                    caption: db.Language($scope.Lang,"Tip"),
                    alignment: "center",
                    allowEditing: false,
                    width: "10%"
                },     
                {
                    dataField: "NAME",
                    caption: db.Language($scope.Lang,"Adı"),
                    alignment: "center",
                    allowEditing: false,
                    width: "10%"
                }, 
                {
                    dataField: "FACTOR",
                    caption: db.Language($scope.Lang,"Katsayı"),
                    dataType: "number",
                    alignment: "center",
                    width: "10%"
                }, 
                {
                    dataField: "WEIGHT",
                    caption: db.Language($scope.Lang,"Ağırlık"),
                    dataType: "number",
                    alignment: "center",
                    width: "5%"
                }, 
                {
                    dataField: "VOLUME",
                    caption: db.Language($scope.Lang,"Hacim"),
                    dataType: "number",
                    alignment: "center",
                    width: "5%"
                }, 
                {
                    dataField: "WIDTH",
                    caption : db.Language($scope.Lang,"En"),
                    dataType: "number",
                    alignment: "center",
                    width: "10%"
                },
                {
                    dataField: "HEIGHT",
                    caption : db.Language($scope.Lang,"Boy"),
                    dataType: "number",
                    alignment: "center",
                    width: "10%"
                },
                {
                    dataField: "SIZE",
                    caption : db.Language($scope.Lang,"Yükseklik"),
                    alignment: "center",
                    dataType: "number",
                    width: "10%"
                }       
            ],
            onRowUpdated: function(e) 
            {   
                let TmpVal =
                [
                    e.data.FACTOR,
                    e.data.WEIGHT,
                    e.data.VOLUME,
                    e.data.WIDTH,
                    e.data.HEIGHT,
                    e.data.SIZE,
                    e.data.GUID
                ]
                db.ExecuteTag($scope.Firma,'BirimUpdate',TmpVal,function(data){});
            },
            onRowRemoved: function(e) 
            {
                db.ExecuteTag($scope.Firma,'BirimSil',[e.data.GUID],function(data)
                {
                    //BIRIM LİSTESİ GETİR
                    db.GetData($scope.Firma,'StokKartBirimListeGetir',[$scope.StokListe[0].CODE],function(BirimData)
                    {
                        $scope.BirimListe = BirimData;
                    });
                });
            }
        })
    }
    function TblBarkodInit()
    {
        $("#TblBarkod").dxDataGrid(
        {
            dataSource: $scope.BarkodListe,
            allowColumnReordering: true,
            allowColumnResizing: true,
            showBorders: true,
            columnResizingMode: "nextColumn",
            columnMinWidth: 50,
            columnAutoWidth: true,
            width:"100%",
            paging: 
            {
                enabled: false
            },
            editing: 
            {
                mode: "batch",
                allowUpdating: true,
                allowDeleting: true
            },
            columns: 
            [
                {
                    dataField: "BARCODE",
                    caption: db.Language($scope.Lang,"Barkod"),
                    alignment: "center",
                    allowEditing: true,
                    width: "40%"
                },     
                {
                    dataField: "UNIT",
                    caption: db.Language($scope.Lang,"Birim"),
                    alignment: "center",
                    allowEditing: false,
                    width: "20%"
                }, 
                {
                    dataField: "TYPE",
                    caption: db.Language($scope.Lang,"Tip"),
                    alignment: "center",
                    allowEditing: false,
                    width: "40%"
                }    
            ],
            onRowUpdated: function(e) 
            {   
                let TmpVal =
                [
                    e.data.BARCODE,
                    e.data.GUID
                ]
                db.ExecuteTag($scope.Firma,'BarkodUpdate',TmpVal,function(data)
                {
                });
            },
            onRowRemoved: function(e) 
            {
                db.ExecuteTag($scope.Firma,'BarkodSil',[e.data.GUID],function(data)
                {
                    //BARKOD LİSTESİ GETİR
                    db.GetData($scope.Firma,'StokKartBarkodListeGetir',[$scope.StokListe[0].CODE],function(BarkodData)
                    {
                        $scope.BarkodListe = BarkodData;                        
                    });
                });
            }
        })
    }
    function TblTedarikciInit()
    {
        $("#TblTedarikci").dxDataGrid(
        {
            dataSource: $scope.TedaikciListe,
            allowColumnReordering: true,
            allowColumnResizing: true,
            showBorders: true,
            columnResizingMode: "nextColumn",
            columnMinWidth: 50,
            columnAutoWidth: true,
            width:"100%",
            paging: 
            {
                enabled: false
            },
            editing: 
            {
                mode: "batch",
                allowUpdating: true,
                allowDeleting: true
            },
            columns: 
            [
                {
                    dataField: "CUSTOMER_CODE",
                    caption: db.Language($scope.Lang,"Kodu"),
                    alignment: "center",
                    width: "10%"
                },     
                {
                    dataField: "CUSTOMER_NAME",
                    caption: db.Language($scope.Lang,"Adı"),
                    alignment: "center",
                    allowEditing: false,
                    width: "10%"
                }, 
                {
                    dataField: "USER",
                    caption: db.Language($scope.Lang,"Kullanıcı"),
                    alignment: "center",
                    allowEditing: false,
                    width: "10%"
                }, 
                {
                    dataField: "PRICE_LDATE",
                    caption: db.Language($scope.Lang,"Son Fiyat Tarih"),
                    dataType: "date",
                    alignment: "center",
                    allowEditing: false,
                    width: "10%"
                }, 
                {
                    dataField: "PRICE",
                    caption: db.Language($scope.Lang,"Fiyat"),
                    dataType: "number",
                    alignment: "center",
                    allowEditing: true,
                    width: "10%"
                }, 
                {
                    dataField: "CUSTOMER_ITEM_CODE",
                    caption: db.Language($scope.Lang,"Tedarikçi Stok Kodu"),
                    alignment: "center",
                    width: "10%"
                }       
            ],
            onRowUpdated: async function(e) 
            {   
                let TmpVal =
                [
                    e.data.CUSTOMER_CODE,
                    e.data.CUSTOMER_ITEM_CODE,
                    e.data.GUID
                ]
                await db.ExecutePromiseTag($scope.Firma,'StokTedarikciUpdate',TmpVal);

                let TmpQuery =
                {
                    db : $scope.Firma,
                    query:  "DECLARE @TMPCODE NVARCHAR(25) " +
                            "SET @TMPCODE = ISNULL((SELECT TOP 1 [ITEM_CODE] FROM ITEM_PRICE WHERE [TYPE] = 1 AND [ITEM_CODE] = @ITEM_CODE AND [DEPOT] = 0 AND [CUSTOMER] = @CUSTOMER),'') " +
                            "IF @TMPCODE = '' " +
                            "BEGIN " +
                            "INSERT INTO [dbo].[ITEM_PRICE] " +
                            "([CUSER] " +
                            ",[CDATE] " +
                            ",[LUSER] " +
                            ",[LDATE] " +
                            ",[ITEM_CODE] " +
                            ",[TYPE] " +
                            ",[DEPOT] " +
                            ",[START_DATE] " +
                            ",[FINISH_DATE] " +
                            ",[PRICE] " +
                            ",[QUANTITY] " +
                            ",[CUSTOMER] " +
                            ") VALUES ( " +
                            "@CUSER,				--<CUSER, nvarchar(25),> \n" +
                            "GETDATE(),			    --<CDATE, datetime,> \n" +
                            "@LUSER,				--<LUSER, nvarchar(25),> \n" +
                            "GETDATE(),			    --<LDATE, datetime,> \n" +
                            "@ITEM_CODE,		    --<ITEM_CODE, nvarchar(25),> \n" +
                            "1,		    		    --<TYPE, int,> \n" +
                            "0,				        --<DEPOT, nvarchar(25),> \n" +
                            "'19700101',			--<START_DATE, datetime,> \n" +
                            "'19700101',		    --<FINISH_DATE, datetime,> \n" +
                            "@PRICE,				--<PRICE, float,> \n" +
                            "1,     				--<QUANTITY, float,> \n" +
                            "@CUSTOMER			    --<CUSTOMER, nvarchar(25),> \n" +
                            ") " +
                            "END " + 
                            "ELSE " +
                            "BEGIN " +
                            "UPDATE ITEM_PRICE SET PRICE = @PRICE WHERE CUSTOMER = @CUSTOMER AND ITEM_CODE = @ITEM_CODE AND TYPE = 1 " + 
                            "END",
                    param: ['CUSER:string|25','LUSER:string|25','ITEM_CODE:string|25','PRICE:float','CUSTOMER:string|25'],
                    value: [$scope.Kullanici,$scope.Kullanici,$scope.StokListe[0].CODE,e.data.PRICE,e.data.CUSTOMER_CODE]
                }
                await db.ExecutePromiseQuery(TmpQuery);
                $scope.StokListe[0].COST_PRICE = e.data.PRICE;
            },
            onRowRemoved: function(e) 
            {
                db.ExecuteTag($scope.Firma,'StokTedarikciSil',[e.data.GUID],function(data)
                {
                    //TEDARİKÇİ LİSTESİ GETİR
                    db.GetData($scope.Firma,'StokKartTedarikciListeGetir',[$scope.StokListe[0].CODE],function(TedarikciData)
                    {
                        $scope.TedaikciListe = TedarikciData;
                    });
                });
            }
        })
    }
    function TblTedarikciFiyatInit()
    {
        $("#TblTedarikciFiyat").dxDataGrid(
        {
            dataSource: $scope.TedarikciFiyatListe,
            allowColumnReordering: true,
            allowColumnResizing: true,
            showBorders: true,
            columnResizingMode: "nextColumn",
            columnMinWidth: 50,
            columnAutoWidth: true,
            width:"100%",
            paging: 
            {
                enabled: false
            },
            columns: 
            [
                {
                    dataField: "CUSTOMER_CODE",
                    caption: db.Language($scope.Lang,"Kodu"),
                    alignment: "center",
                    width: "10%"
                },     
                {
                    dataField: "CUSTOMER_NAME",
                    caption: db.Language($scope.Lang,"Adı"),
                    alignment: "center",
                    allowEditing: false,
                    width: "10%"
                }, 
                {
                    dataField: "PRICE_LDATE",
                    caption: db.Language($scope.Lang,"Son Fiyat Tarih"),
                    dataType: "date",
                    alignment: "center",
                    allowEditing: false,
                    width: "10%"
                }, 
                {
                    dataField: "PRICE",
                    caption: db.Language($scope.Lang,"Fiyat"),
                    dataType: "number",
                    alignment: "center",
                    allowEditing: false,
                    width: "10%"
                }, 
                {
                    dataField: "CUSTOMER_ITEM_CODE",
                    caption: db.Language($scope.Lang,"Tedarikçi Stok Kodu"),
                    alignment: "center",
                    width: "10%"
                }       
            ]
        })
    }
    function TblSecimInit(pData)
    {        
        let TmpColumns = []

        if(pData.length > 0)
        {
            Object.keys(pData[0]).forEach(function(item)
            {
                if(item == "CODE")
                {
                    TmpColumns.push({dataField : item,dataType: "string",width:"100"});
                }
                else
                {
                    TmpColumns.push({dataField : item,dataType: "string"});
                }
            });
        }

        let Grd = $("#TblSecim").dxDataGrid(
        {
            dataSource: pData,
            allowColumnReordering: true,
            allowColumnResizing: true,
            showBorders: true,
            columnResizingMode: "nextColumn",
            columnMinWidth: 50,
            columnAutoWidth: true,
            width:"100%",
            filterRow: 
            {
                visible: true,
                applyFilter: "auto"
            },
            paging: 
            {
                pageSize: 20
            },
            pager: 
            {
                showPageSizeSelector: true,
                allowedPageSizes: [25, 50, 100, 200, 500, 1000],
                showInfo: true
            },
            selection: 
            {
                mode: "single"
            },
            columns: TmpColumns,
            onRowDblClick: function(e)
            {
                SecimSelectedRow = {};
                SecimSelectedRow.Item = e.data
                $scope.BtnGridSec();
                $scope.$apply();
            }
        }).dxDataGrid("instance");
    }
    function FiyatModalInit()
    {
        $scope.FiyatModal = {};
        $scope.FiyatModal.Tip = "0";
        $scope.FiyatModal.StokKodu = $scope.StokListe[0].CODE;
        $scope.FiyatModal.Depo = "0";
        $scope.FiyatModal.Baslangic = moment(new Date()).format("DD.MM.YYYY");
        $scope.FiyatModal.Bitis = moment(new Date()).format("DD.MM.YYYY");
        $scope.FiyatModal.Fiyat = 0;
        $scope.FiyatModal.Miktar = 0;
        $scope.FiyatModal.Cari = "";        
    }
    function BirimModalInit()
    {
        $scope.BirimModal = {};
        $scope.BirimModal.Tip = "0";
        $scope.BirimModal.Adi = "ADET";
        $scope.BirimModal.Katsayi = "0";
        $scope.BirimModal.Agirlik = "0";
        $scope.BirimModal.Hacim = "0";
        $scope.BirimModal.En = "0";
        $scope.BirimModal.Boy = "0";
        $scope.BirimModal.Yukseklik = "0";
    }
    function BarkodModalInit()
    {
        $scope.BarkodModal = {};
        $scope.BarkodModal.Barkod = "";
        $scope.BarkodModal.Birim = "0";
        $scope.BarkodModal.Tip = "0";
        $scope.BarkodModal.BirimListe = [];

        if($scope.BirimListe.length > 0)
        {
            $scope.BarkodModal.Birim = $scope.BirimListe[0].GUID;
            $scope.BarkodModal.BirimListe = $scope.BirimListe;
        }
    }
    function TedarikciModalInit()
    {
        $scope.TedarikciModal = {};
        $scope.TedarikciModal.Kodu = "";
        $scope.TedarikciModal.Adi = "";
        $scope.TedarikciModal.StokKodu = "";
    }
    function UrunGrupModalInit()
    {
        $scope.UrunGrupModal = {};
        $scope.UrunGrupModal.Kodu = "";
        $scope.UrunGrupModal.Adi = "";
    }
    function StokGetir(pKodu,pCallback)
    {
        db.GetData($scope.Firma,'StokKartGetir',[pKodu],function(StokData)
        {
            if(StokData.length > 0)
            {                
                ResimGetir('dropify', StokData[0].IMAGE, 'Image.jpg');

                $scope.StyleAll = {'visibility': 'visible'};
                $scope.RefReadOnly = true;

                $scope.StokListe = [];
                $scope.StokListe = StokData;
                //FİYAT LİSTESİ GETİR
                db.GetData($scope.Firma,'StokKartFiyatListeGetir',[pKodu],function(FiyatData)
                {
                    $scope.FiyatListe = FiyatData;
                    TblFiyatInit();

                    let TmpSymbol = "";
                    for(let i=0;i<$scope.Birim.length;i++)
                    {
                        if($scope.StokListe[0].UNDER_UNIT_NAME == $scope.Birim[i].Kodu)
                        {
                            TmpSymbol = $scope.Birim[i].Symbol;
                        }
                    }
                    if($scope.FiyatListe.length > 0)
                    {
                        $scope.AltBirimFiyati = ($scope.FiyatListe[0].PRICE / $scope.StokListe[0].UNDER_UNIT_FACTOR).toFixed(2) + "€ / " + TmpSymbol;
                    }
                });
                //BIRIM LİSTESİ GETİR
                db.GetData($scope.Firma,'StokKartBirimListeGetir',[pKodu],function(BirimData)
                {
                    $scope.BirimListe = BirimData;
                    TblBirimInit();
                });
                //BARKOD LİSTESİ GETİR
                db.GetData($scope.Firma,'StokKartBarkodListeGetir',[pKodu],function(BarkodData)
                {
                    $scope.BarkodListe = BarkodData;
                    TblBarkodInit()
                });
                //TEDARİKÇİ LİSTESİ GETİR
                db.GetData($scope.Firma,'StokKartTedarikciListeGetir',[pKodu],function(TedarikciData)
                {
                    $scope.TedaikciListe = TedarikciData;
                    TblTedarikciInit();

                    if($scope.TedaikciListe.length > 0)
                    {
                        $scope.StokListe[0].CUSTOMER_ITEM_CODE = TedarikciData[0].CUSTOMER_ITEM_CODE + ' / ' + TedarikciData[0].CUSTOMER_NAME;
                    }
                });
                //TEDARİKÇİ FİYAT LİSTESİ GETİR
                db.GetData($scope.Firma,'StokKartTedarikciFiyatListeGetir',[pKodu],function(TedarikciFiyatData)
                {
                    $scope.TedarikciFiyatListe = TedarikciFiyatData;
                    TblTedarikciFiyatInit()
                });

                BarkodModalInit();
                TedarikciModalInit();
            }

            if(typeof pCallback != 'undefined')
            {
                pCallback(StokData)
            }
        });
    }
    function BirimKaydet(pData,pCallback)
    {
        let InsertData = [];

        if(typeof pData == 'undefined')
        {
            InsertData =
            [
                $scope.Kullanici,
                $scope.Kullanici,
                $scope.StokListe[0].CODE,
                $scope.BirimModal.Tip,
                $scope.BirimModal.Adi,
                $scope.BirimModal.Katsayi,
                $scope.BirimModal.Agirlik,
                $scope.BirimModal.Hacim,
                $scope.BirimModal.En,
                $scope.BirimModal.Boy,
                $scope.BirimModal.Yukseklik
            ];
        }
        else
        {
            InsertData =
            [
                $scope.Kullanici,
                $scope.Kullanici,
                $scope.StokListe[0].CODE,
                pData[0],
                pData[1],
                pData[2],
                0,
                0,
                0,
                0,
                0
            ];
        }

        db.ExecuteTag($scope.Firma,'BirimKaydet',InsertData,function(InsertResult)
        {
            if(typeof pCallback != 'undefined')
            {
                pCallback(InsertResult.result.recordset[0].GUID);
            }

            if(typeof(InsertResult.result.err) == 'undefined')
            {
                //BIRIM LİSTESİ GETİR
                db.GetData($scope.Firma,'StokKartBirimListeGetir',[$scope.StokListe[0].CODE],function(BirimData)
                {
                    $scope.BirimListe = BirimData;
                    TblBirimInit();

                    BarkodModalInit();
                });
            }
        });
    }
    function ResimGetir(pName, pSrc, pFName='')
    {
        let input 	 = $('input[name="'+pName+'"]');
        let wrapper  = input.closest('.dropify-wrapper');
        let preview  = wrapper.find('.dropify-preview');
        let filename = wrapper.find('.dropify-filename-inner');
        let render 	 = wrapper.find('.dropify-render').html('');
        
        input.val('').attr('title', pFName);        
        wrapper.removeClass('has-error').addClass('has-preview');
        filename.html(pFName);
        
        render.append($('<img />').attr('src', pSrc).css('max-height', input.data('height') || ''));
        preview.fadeIn();
    }
    function MenseiGetir()
    {
        db.GetData($scope.Firma,'MenseiGetir',['FR',''],function(pData)
        {
            $scope.MenseiListe = pData;
        });
    }
    function TedarikciFiyatKaydet()
    {
        let InsertData =
        [
            $scope.Kullanici,
            $scope.Kullanici,
            $scope.StokListe[0].CODE,
            1,
            0,
            moment(new Date(0)).format("DD.MM.YYYY"),
            moment(new Date(0)).format("DD.MM.YYYY"),
            parseFloat($scope.StokListe[0].COST_PRICE.toString().replace(',','.')),
            1,
            $scope.StokListe[0].ITEM_CUSTOMER
        ];
        db.ExecuteTag($scope.Firma,'FiyatKaydet',InsertData,function(InsertResult)
        {
            if(typeof(InsertResult.result.err) == 'undefined')
            {
                //TEDARİKÇİ LİSTESİ GETİR
                db.GetData($scope.Firma,'StokKartTedarikciListeGetir',[$scope.StokListe[0].CODE],function(TedarikciData)
                {
                    $scope.TedaikciListe = TedarikciData;
                    TblTedarikciInit();
                });
                //TEDARİKÇİ FİYAT LİSTESİ GETİR
                db.GetData($scope.Firma,'StokKartTedarikciFiyatListeGetir',[$scope.StokListe[0].CODE],function(TedarikciFiyatData)
                {
                    $scope.TedarikciFiyatListe = TedarikciFiyatData;
                    TblTedarikciFiyatInit()
                });
            }
        });
    }
    $scope.Init = function()
    {        
        DevExpress.localization.locale('fr');
        StokListePage = false;
        $scope.Kullanici = $window.sessionStorage.getItem('User');
        $scope.Firma = 'PIQPOS' 
        
        if(typeof $location.$$search.mode == 'undefined')
        {
            $("#TbMain").removeClass('active');  
            $("#TbDetay").addClass('active');
        }
        else
        {
            $("#TbMain").addClass('active');  
            $("#TbDetay").removeClass('active');
        }
        //STOK LISTESİ TANIMLARI *************************
        $scope.StokListesi = {}
        $scope.StokListesi.Data = [];        
        DrpDwnInitKolon();

        $scope.StokListesi.CmbGrup = 
        {
            width: "100%",
            displayExpr: "NAME",
            valueExpr: "CODE",
            value: "",
            showClearButton: true,
            searchEnabled: true,
            bindingOptions: 
            {
                value: 'StokListesi.Grup',
                dataSource: 
                {
                    deep: true,
                    dataPath: 'StokListesi.GrupData'
                }
            },
            onSelectionChanged : function(e)
            {
                if(e.selectedItem == null)
                {
                    $scope.StokListesi.Grup = ""
                }
            }
        }
        $scope.StokListesi.CmbTedarikci = 
        {
            width: "100%",
            displayExpr: "NAME",
            valueExpr: "CODE",
            value: "",
            showClearButton: true,
            searchEnabled: true,
            bindingOptions: 
            {
                value: "StokListesi.Tedarikci",
                dataSource: 
                {
                    deep: true,
                    dataPath: 'StokListesi.TedarikciData'
                }
            },
            onSelectionChanged : function(e)
            {
                if(e.selectedItem == null)
                {
                    $scope.StokListesi.Tedarikci = ""
                }
            }
        }

        $scope.StokListesi.Kolon = [{"CODE" : "CODE","NAME" : "ÜRÜN KODU"},{"CODE" : "NAME","NAME" : "ÜRÜN TAM ADI"},{"CODE" : "BARCODE","NAME" : "BARKODU"},{"CODE" : "CUSTOMER_ITEM_CODE","NAME" : "TEDARİKÇİ ÜRÜN KODU"},{"CODE" : "CUSTOMER","NAME" : "TEDARİKÇİ"}];
        $scope.StokListesi.Barkod = "";
        $scope.StokListesi.Adi = "";
        $scope.StokListesi.Grup = "";
        $scope.StokListesi.Tedarikci = "";
        $scope.StokListesi.Durum = true;

        TblStokListeInit();
        $scope.GrupGetir();
        $scope.TedarikciGetir();
        //********************************************* */

        $scope.StyleAll = {'visibility': 'hidden'};
        $scope.RefReadOnly = false;

        $scope.AltBirimFiyati = "0.00 €";
        $scope.FiyatListe = [];
        $scope.BirimListe = [];
        $scope.BarkodListe = [];
        $scope.TedaikciListe = [];
        $scope.TedarikciFiyatListe = [];
        $scope.MenseiListe = [];

        TblFiyatInit();
        TblBirimInit();
        TblBarkodInit();
        TblTedarikciInit();
        TblTedarikciFiyatInit();
        TblSecimInit([]);                

        $scope.StokListe = [];

        let TmpStokObj = {};

        TmpStokObj.CODE = "";
        TmpStokObj.NAME = "";
        TmpStokObj.SNAME = "";
        TmpStokObj.ITEM_GRP = "";
        TmpStokObj.TYPE = "0";
        TmpStokObj.VAT = "5.5";
        TmpStokObj.STATUS = true;
        TmpStokObj.ORGINS = "";
        TmpStokObj.COST_PRICE = 0;
        TmpStokObj.MIN_PRICE = 0;
        TmpStokObj.MAX_PRICE = 0;
        TmpStokObj.UNDER_UNIT_NAME = "Unité";
        TmpStokObj.UNDER_UNIT_FACTOR = 0;
        TmpStokObj.MAIN_UNIT_NAME = "Unité";
        TmpStokObj.MAIN_UNIT_FACTOR = 1;
        TmpStokObj.WEIGHING = false;
        TmpStokObj.BARCODE = "";
        TmpStokObj.SPECIAL1 = "";
        TmpStokObj.SALE_JOIN_LINE = false;

        $scope.StokListe.push(TmpStokObj);

        FiyatModalInit();
        BirimModalInit();
        BarkodModalInit();
        TedarikciModalInit();
        UrunGrupModalInit();

        $('.dropify').dropify()

        MenseiGetir();

        $scope.Cmb = {};
        $scope.Cmb.AnaBirim = 
        {
            width: "50%",
            dataSource: $scope.Birim,
            displayExpr: "Kodu",
            valueExpr: "Kodu",
            showClearButton: true,
            value: typeof $scope.StokListe != 'undefined' ? $scope.StokListe[0].MAIN_UNIT_NAME : '',
            bindingOptions: 
            {
                value: "StokListe[0].MAIN_UNIT_NAME",
            },
            onSelectionChanged : function(e)
            {
                $scope.CmbAnaBirimChange();
                if(e.selectedItem == null)
                {
                    $scope.StokListe[0].MAIN_UNIT_NAME = ""
                }
            }
        }
        $scope.Cmb.AltBirim = 
        {
            width: "50%",
            dataSource: $scope.Birim,
            displayExpr: "Kodu",
            valueExpr: "Kodu",
            showClearButton: true,
            value: typeof $scope.StokListe != 'undefined' ? $scope.StokListe[0].UNDER_UNIT_NAME : '',
            bindingOptions: 
            {
                value: "StokListe[0].UNDER_UNIT_NAME",
            },
            onSelectionChanged : function(e)
            {
                $scope.CmbAltBirimChange();
                if(e.selectedItem == null)
                {
                    $scope.StokListe[0].UNDER_UNIT_NAME = ""
                }
            }
        }
        $scope.Cmb.Cins = 
        {
            width: "100%",
            dataSource: [{CODE : "0",NAME : db.Language($scope.Lang,"Mal")},{CODE : "1",NAME : db.Language($scope.Lang,"Hizmet")},{CODE : "2",NAME : db.Language($scope.Lang,"Depozit")}],
            displayExpr: "NAME",
            valueExpr: "CODE",
            value: "0",
            showClearButton: true,
            bindingOptions: 
            {
                value: "StokListe[0].TYPE",
            },
            onSelectionChanged : function(e)
            {
                if(e.selectedItem == null)
                {
                    $scope.StokListe[0].TYPE = "0"
                }
            }
        }
        $scope.Cmb.Vergi = 
        {
            width: "100%",
            dataSource: [{CODE : "0",NAME : "0"},{CODE : "5.5",NAME : "5.5"},{CODE : "10",NAME : "10"},{CODE : "20",NAME : "20"}],
            displayExpr: "NAME",
            valueExpr: "CODE",
            value: "5.5",
            showClearButton: true,
            bindingOptions: 
            {
                value: "StokListe[0].VAT",
            },
            onSelectionChanged : function(e)
            {                
                if(e.selectedItem == null)
                {
                    $scope.StokListe[0].VAT = ""
                }

                $scope.CmbVatBlur()
            }
        }
        $scope.Cmb.Mensei = 
        {
            width: "100%",
            dataSource: $scope.MenseiListe,
            displayExpr: "NAME",
            valueExpr: "CODE",
            value: "",
            showClearButton: true,
            searchEnabled: true,
            bindingOptions: 
            {
                value: "StokListe[0].ORGINS",
                dataSource : "MenseiListe"
            },
            onSelectionChanged : function(e)
            {                
                if(e.selectedItem == null)
                {
                    $scope.StokListe[0].ORGINS = ""
                }
            }
        }
    }
    $scope.Yeni = function()
    {
        window.location.href = "#!Stok";
    }
    $scope.Kaydet = function(pCallBack)
    {        
        if($scope.StokListe[0].CODE == '')
        {
            alertify.okBtn(db.Language($scope.Lang,"Tamam"));
            alertify.alert(db.Language($scope.Lang,"Kodu bölümünü boş geçemezsiniz !"));
            return;
        }
        
        if(($scope.StokListe[0].ITEM_GRP != null && $scope.StokListe[0].ITEM_GRP.split('/')[0] == '017') && ($scope.StokListe[0].ORGINS == '' || $scope.StokListe[0].ORGINS == null))
        {
            alertify.okBtn(db.Language($scope.Lang,"Tamam"));
            alertify.alert(db.Language($scope.Lang,"Menşei bölümünü boş geçemezsiniz !"));
            return;
        }

        if($scope.StyleAll.visibility != 'hidden')
        {
            if($scope.StokListe[0].ITEM_CUSTOMER == "")
            {
                alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                alertify.alert(db.Language($scope.Lang,"Tedarikçi bölümünü boş geçemezsiniz !"));
                return;
            }
            if($scope.StokListe[0].ITEM_GRP == null)
            {
                alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                alertify.alert(db.Language($scope.Lang,"Ürün grubu bölümünü boş geçemezsiniz !"));
                return;
            }
            
            if($scope.StokListe[0].VAT == "")
            {
                alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                alertify.alert(db.Language($scope.Lang,"Lütfen vergi dilimini seçiniz !"));
                return;
            }
            if($scope.StokListe[0].UNDER_UNIT_NAME == "")
            {
                alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                alertify.alert(db.Language($scope.Lang,"Lütfen alt birimi seçiniz !"));
                return;
            }
            if($scope.StokListe[0].UNDER_UNIT_FACTOR == 0)
            {
                alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                alertify.alert(db.Language($scope.Lang,"Lütfen alt birimi giriniz "));
                return;
            }
        }
        
        let InsertData =
        [
            $scope.Kullanici,
            $scope.Kullanici,
            $scope.StokListe[0].CODE,
            $scope.StokListe[0].NAME,
            $scope.StokListe[0].SNAME,
            $scope.StokListe[0].ITEM_GRP != null ? $scope.StokListe[0].ITEM_GRP.split('/')[0] : '',
            $scope.StokListe[0].TYPE,
            $scope.StokListe[0].VAT,
            parseFloat($scope.StokListe[0].COST_PRICE.toString().replace(',','.')),
            parseFloat($scope.StokListe[0].MIN_PRICE.toString().replace(',','.')),
            parseFloat($scope.StokListe[0].MAX_PRICE.toString().replace(',','.')),
            $scope.StokListe[0].STATUS,            
            $scope.StokListe[0].WEIGHING,
            $scope.StokListe[0].SPECIAL1,
            $scope.StokListe[0].ORGINS,
            $scope.StokListe[0].SALE_JOIN_LINE,
        ];

        db.ExecuteTag($scope.Firma,'StokKartKaydet',InsertData,async function(InsertResult)
        {
            if(typeof(InsertResult.result.err) == 'undefined')
            {
                // ANA BİRİM KAYIT İŞLEMİ
                if($scope.StokListe[0].MAIN_UNIT_FACTOR > 0)
                {
                    let TmpVal = ["0",$scope.StokListe[0].MAIN_UNIT_NAME,parseFloat($scope.StokListe[0].MAIN_UNIT_FACTOR.toString().replace(',','.'))];
                    BirimKaydet(TmpVal,function(pGuid)
                    {
                        if($scope.StokListe[0].BARCODE != '')
                        {
                            $scope.BarkodModal.Barkod = $scope.StokListe[0].BARCODE
                            $scope.BarkodModal.Birim = pGuid
                            $scope.BarkodModal.Tip = 0
                            console.log($scope.BarkodModal.Barkod)
                            $scope.BtnBarkodKaydet();
                        }
                    });
                }
                // ALT BİRİM KAYIT İŞLEMİ
                if(parseFloat($scope.StokListe[0].UNDER_UNIT_FACTOR.toString().replace(',','.')) > 0)
                {
                    BirimKaydet(["1",$scope.StokListe[0].UNDER_UNIT_NAME,parseFloat($scope.StokListe[0].UNDER_UNIT_FACTOR.toString().replace(',','.'))]);
                }
                //ÜRÜN RESİM KAYIT İŞLEMİ
                if(typeof document.getElementById('dropify').files[0] != 'undefined')
                {
                    var filerdr = new FileReader();                    
                    filerdr.readAsDataURL(document.getElementById('dropify').files[0]);
                 
                    filerdr.onload = function(e) 
                    {
                        var img = new Image();
                        img.src = e.target.result;  

                        img.onload = function() 
                        {
                            var canvas = document.createElement('canvas');
                            var ctx = canvas.getContext('2d');
                            canvas.width = 120;
                            canvas.height = canvas.width * (img.height / img.width);
                            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                            var data = canvas.toDataURL('image/png');

                            let InsertData =
                            [
                                $scope.Kullanici,
                                $scope.Kullanici,
                                $scope.StokListe[0].CODE,
                                data
                            ];

                            db.ExecuteTag($scope.Firma,'StokImageInsert',InsertData);
                        }                        
                    }
                }
                // else
                // {
                //     db.ExecuteTag($scope.Firma,'StokImageDelete',[$scope.StokListe[0].CODE]);
                // }

                if(typeof pCallBack != 'undefined')
                {
                    pCallBack(true);
                }
            }
            else
            {
                if(typeof pCallBack != 'undefined')
                {
                    pCallBack(false);
                }
            }
            //window.location.href = "#!Stok?Id=" + $scope.StokListe[0].CODE;
        });
    }
    $scope.Sil = function()
    {
        alertify.okBtn(db.Language($scope.Lang,'Evet'));
        alertify.cancelBtn(db.Language($scope.Lang,'Hayır'));

        alertify.confirm(db.Language($scope.Lang,'Stoğu silmek istediğinize eminmisiniz ?'),
        function()
        {
            if($scope.StokListe[0].CODE != '')
            {
                db.ExecuteTag($scope.Firma,'StokKartSil',[$scope.StokListe[0].CODE],function(data)
                {
                    $('#TbMain').addClass('active');$('#TbDetay').removeClass('active');
                    //$scope.Yeni();
                });
            }
            else
            {
                alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                alertify.alert(db.Language($scope.Lang,"Kayıtlı stok olmadan evrak silemezsiniz !"));
            }
        }
        ,function(){});
    }
    $scope.Clone = function()
    {
        $scope.Init(true);
    }
    $scope.BtnFiyatKaydet = function()
    {
        $("#MdlFiyatEkle").modal('hide');

        if($scope.FiyatModal.StokKodu == "")
        {
            alertify.okBtn(db.Language($scope.Lang,"Tamam"));
            alertify.alert(db.Language($scope.Lang,"Stok kodu bölümünü girmeden kayıt edemezsiniz !"));
            return;
        }                
        let InsertData =
        [
            $scope.Kullanici,
            $scope.Kullanici,
            $scope.FiyatModal.StokKodu,
            $scope.FiyatModal.Tip,
            $scope.FiyatModal.Depo,
            $scope.FiyatModal.Baslangic,
            $scope.FiyatModal.Bitis,
            parseFloat($scope.FiyatModal.Fiyat.toString().replace(',','.')),
            $scope.FiyatModal.Miktar,
            $scope.FiyatModal.Cari
        ];

        db.ExecuteTag($scope.Firma,'FiyatKaydet',InsertData,function(InsertResult)
        {
            if(typeof(InsertResult.result.err) == 'undefined')
            {
                if(InsertResult.result.recordset[0].ITEM_CODE != '')
                {
                    alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                    alertify.alert(db.Language($scope.Lang,"Benzer kayıt oluşturamazsınız !"));
                }
                //FİYAT LİSTESİ GETİR
                db.GetData($scope.Firma,'StokKartFiyatListeGetir',[$scope.StokListe[0].CODE],function(FiyatData)
                {
                    $scope.FiyatListe = FiyatData;
                    TblFiyatInit();
                    $scope.CmbAltBirimChange();
                });
            }
        });
    }
    $scope.BtnBirimKaydet = function()
    {
        $("#MdlBirimEkle").modal('hide');

        if($scope.BirimModal.Adi == "")
        {
            alertify.okBtn(db.Language($scope.Lang,"Tamam"));
            alertify.alert(db.Language($scope.Lang,"Adı bölümünü girmeden kayıt edemezsiniz !"));
            return;
        }

        BirimKaydet();
    }
    $scope.BtnBarkodKaydet = async function(keyEvent)
    {
        if(typeof keyEvent != 'undefined')
        {
            if(keyEvent.which != 13)
            {
                return;
            }
        }

        $("#MdlBarkodEkle").modal('hide');

        if($scope.BarkodModal.Barkod == "")
        {
            alertify.okBtn(db.Language($scope.Lang,"Tamam"));
            alertify.alert(db.Language($scope.Lang,"Barkod bölümünü girmeden kayıt edemezsiniz !"));
            return;
        }

        let TmpQuery =
        {
            db : $scope.Firma,
            query:  "SELECT [BARCODE] FROM ITEM_BARCODE WHERE [BARCODE] = @BARCODE AND [ITEM_CODE] <> @ITEM_CODE",
            param: ['BARCODE:string|50','ITEM_CODE:string|25'],
            value: [$scope.BarkodModal.Barkod,$scope.StokListe[0].CODE]
        }

        let TmpResult = await db.GetPromiseQuery(TmpQuery);

        if(TmpResult.length > 0)
        {
            alertify.okBtn(db.Language($scope.Lang,"Tamam"));
            alertify.alert(db.Language($scope.Lang,"Girimiş olduğunuz barkod sistemde kayıtlı !"));
            return;
        }
        
        let InsertData =
        [
            $scope.Kullanici,
            $scope.Kullanici,
            $scope.StokListe[0].CODE,
            $scope.BarkodModal.Barkod,
            $scope.BarkodModal.Birim,
            $scope.BarkodModal.Tip
        ];

        db.ExecuteTag($scope.Firma,'BarkodKaydet',InsertData,function(InsertResult)
        {
            if(typeof(InsertResult.result.err) == 'undefined')
            {
                //BARKOD LİSTESİ GETİR
                db.GetData($scope.Firma,'StokKartBarkodListeGetir',[$scope.StokListe[0].CODE],function(BarkodData)
                {
                    if(BarkodData.length > 0)
                    {
                        $scope.BarkodListe = BarkodData;
                        $scope.StokListe[0].BARCODE = BarkodData[0].BARCODE;
                        TblBarkodInit()
                    }                    
                });
            }
        });
    }
    $scope.BtnTedarikciKaydet = async function()
    {
        $("#MdlTedarikciEkle").modal('hide');

        if($scope.TedarikciModal.Kodu == "")
        {
            alertify.okBtn(db.Language($scope.Lang,"Tamam"));
            alertify.alert(db.Language($scope.Lang,"Tedarikçi kodu bölümünü girmeden kayıt edemezsiniz !"));
            return;
        }
        if($scope.StokListe[0].CODE == "")
        {
            alertify.okBtn(db.Language($scope.Lang,"Tamam"));
            alertify.alert(db.Language($scope.Lang,"Stok kodu bölümünü girmeden kayıt edemezsiniz !"));
            return;
        }
        let InsertData =
        [
            $scope.Kullanici,
            $scope.Kullanici,
            $scope.StokListe[0].CODE,
            $scope.TedarikciModal.Kodu,
            $scope.TedarikciModal.StokKodu
        ];

        let TmpQuery =
        {
            db : $scope.Firma,
            query:  "SELECT [CUSTOMER_ITEM_CODE],[ITEM_CODE] FROM ITEM_CUSTOMER WHERE [CUSTOMER_CODE] = @CUSTOMER_CODE AND [CUSTOMER_ITEM_CODE] = @CUSTOMER_ITEM_CODE",
            param: ['CUSTOMER_CODE:string|25','CUSTOMER_ITEM_CODE:string|25'],
            value: [$scope.TedarikciModal.Kodu,$scope.TedarikciModal.StokKodu]
        }

        let TmpResult = await db.GetPromiseQuery(TmpQuery);

        if(TmpResult.length > 0)
        {
            alertify.okBtn(db.Language($scope.Lang,'Tamam'));
            alertify.cancelBtn(db.Language($scope.Lang,'Ürüne Git'));
            alertify.confirm(db.Language($scope.Lang,"Girimiş olduğunuz tedarikçi stok kodu sistemde kayıtlı"),function()
            {
                $("#MdlTedarikciEkle").modal('show');
            },function()
            {
                db.ExecuteTag($scope.Firma,'StokKartSil',[$scope.StokListe[0].CODE],function(data)
                {
                    console.log(11)
                    StokGetir(TmpResult[0].ITEM_CODE);
                });
            });
        }
        else
        {
            db.ExecuteTag($scope.Firma,'StokTedarikciKaydet',InsertData,function(InsertResult)
            {
                if(typeof(InsertResult.result.err) == 'undefined')
                {
                    TedarikciFiyatKaydet();
                    //TEDARİKÇİ LİSTESİ GETİR
                    db.GetData($scope.Firma,'StokKartTedarikciListeGetir',[$scope.StokListe[0].CODE],function(TedarikciData)
                    {
                        $scope.TedaikciListe = TedarikciData;
                        $scope.StokListe[0].ITEM_CUSTOMER = $scope.TedarikciModal.Kodu;
                        $scope.StokListe[0].CUSTOMER_ITEM_CODE = $scope.TedarikciModal.StokKodu + ' / ' + $scope.TedarikciModal.Adi;
                        TblTedarikciInit();
                    });
                }
            });
        }
    }
    $scope.BtnUrunGrupKaydet = function()
    {
        $("#MdlUrunGrupEkle").modal('hide');

        if($scope.UrunGrupModal.Kodu == "")
        {
            alertify.okBtn(db.Language($scope.Lang,"Tamam"));
            alertify.alert(db.Language($scope.Lang,"Kodu bölümünü girmeden kayıt edemezsiniz !"));
            return;
        }

        let InsertData =
        [
            $scope.Kullanici,
            $scope.Kullanici,
            $scope.UrunGrupModal.Kodu,
            $scope.UrunGrupModal.Adi
        ];

        db.ExecuteTag($scope.Firma,'UrunGrupKaydet',InsertData,function(InsertResult)
        {
            if(typeof(InsertResult.result.err) == 'undefined')
            {

            }
        });
    }
    $scope.BtnGridSec = function()
    {
        if(ModalTip == "Stok")
        {
            StokGetir(SecimSelectedRow.Item.CODE);
            $("#MdlSecim").modal('hide');
        }
        else if(ModalTip == "FiyatStok")
        {
            $scope.FiyatModal.StokKodu = SecimSelectedRow.Item.CODE;
            $("#MdlSecim").modal('hide');
            $("#MdlFiyatEkle").modal('show');
        }
        else if(ModalTip == "FiyatCari")
        {
            $scope.FiyatModal.Cari = SecimSelectedRow.Item.CODE;
            $("#MdlSecim").modal('hide');
            $("#MdlFiyatEkle").modal('show');
        }
        else if(ModalTip == "FiyatDepo")
        {
            $scope.FiyatModal.Depo = SecimSelectedRow.Item.CODE;
            $("#MdlSecim").modal('hide');
            $("#MdlFiyatEkle").modal('show');
        }
        else if(ModalTip == "TedarikciCari")
        {
            $scope.TedarikciModal.Kodu = SecimSelectedRow.Item.CODE;
            $scope.TedarikciModal.Adi = SecimSelectedRow.Item.NAME;
            $("#MdlSecim").modal('hide');
            $("#MdlTedarikciEkle").modal('show');
        }
        else if(ModalTip == "UrunGrup")
        {
            $scope.StokListe[0].ITEM_GRP = SecimSelectedRow.Item.CODE + '/' + SecimSelectedRow.Item.NAME;
            $("#MdlSecim").modal('hide');
        }
        ModalTip = "";
    }
    $scope.BtnModalKapat = function()
    {
        if(ModalTip == "Stok")
        {
            $("#MdlSecim").modal('hide');
        }
        else if(ModalTip == "FiyatStok")
        {
            $("#MdlSecim").modal('hide');
            $("#MdlFiyatEkle").modal('show');
        }
        else if(ModalTip == "FiyatCari")
        {
            $("#MdlSecim").modal('hide');
            $("#MdlFiyatEkle").modal('show');
        }
        else if(ModalTip == "FiyatDepo")
        {
            $("#MdlSecim").modal('hide');
            $("#MdlFiyatEkle").modal('show');
        }
        else if(ModalTip == "TedarikciCari")
        {
            $("#MdlSecim").modal('hide');
            $("#MdlTedarikciEkle").modal('show');
        }
        else if(ModalTip == "TedarikciMaliyet")
        {
            $("#MdlSecim").modal('hide');
        }
        else if(ModalTip == "UrunGrup")
        {
            $("#MdlSecim").modal('hide');
        }
        ModalTip = "";
    }
    $scope.BtnModalSecim = function(pTip)
    {
        ModalTip = pTip;

        if(ModalTip == "Stok")
        {
            let TmpQuery =
            {
                db : $scope.Firma,
                query:  "SELECT [CODE],[NAME] FROM ITEMS"
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                TblSecimInit(Data);
                $("#MdlSecim").modal('show');
            });
        }
        else if(ModalTip == "FiyatStok")
        {
            let TmpQuery =
            {
                db : $scope.Firma,
                query:  "SELECT [CODE],[NAME] FROM ITEMS"
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                TblSecimInit(Data);
                $("#MdlSecim").modal('show');
                $("#MdlFiyatEkle").modal('hide');
            });
        }
        else if(ModalTip == "FiyatCari")
        {
            let TmpQuery =
            {
                db : $scope.Firma,
                query:  "SELECT [CODE],[NAME] FROM CUSTOMERS"
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                TblSecimInit(Data);
                $("#MdlSecim").modal('show');
                $("#MdlFiyatEkle").modal('hide');
            });
        }
        else if(ModalTip == "FiyatDepo")
        {
            let TmpQuery =
            {
                db : $scope.Firma,
                query:  "SELECT [CODE],[NAME] FROM DEPOT"
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                TblSecimInit(Data);
                $("#MdlSecim").modal('show');
                $("#MdlFiyatEkle").modal('hide');
            });
        }
        else if(ModalTip == "TedarikciCari")
        {
            let TmpQuery =
            {
                db : $scope.Firma,
                query:  "SELECT [CODE],[NAME] FROM CUSTOMERS WHERE TYPE = 1 ORDER BY [NAME] ASC"
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                TblSecimInit(Data);
                $("#MdlSecim").modal('show');
                $("#MdlTedarikciEkle").modal('hide');
            });
        }
        // else if(ModalTip == "TedarikciMaliyet")
        // {
        //     let TmpQuery =
        //     {
        //         db : $scope.Firma,
        //         query:  "SELECT [CODE],[NAME] FROM CUSTOMERS"
        //     }
        //     db.GetDataQuery(TmpQuery,function(Data)
        //     {
        //         TblSecimInit(Data);
        //         $("#MdlSecim").modal('show');
        //         $("#MdlTedarikciEkle").modal('hide');
        //     });
        // }
        else if(ModalTip == "UrunGrup")
        {
            let TmpQuery =
            {
                db : $scope.Firma,
                query:  "SELECT [CODE],[NAME] FROM ITEM_GROUP ORDER BY [NAME] ASC"
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                TblSecimInit(Data);
                $("#MdlSecim").modal('show');
            });
        }
    }
    $scope.BtnModalFiyatEkle = function()
    {
        if($scope.StokListe[0].CODE != "")
        {
            FiyatModalInit();
            $("#MdlFiyatEkle").modal('show');
        }
        else
        {
            alertify.okBtn(db.Language($scope.Lang,"Tamam"));
            alertify.alert(db.Language($scope.Lang,"Kodu bölümünü girmeden fiyat giriş ekranına giremezsiniz !"));
        }
    }
    $scope.BtnModalBirimEkle = function()
    {
        if($scope.StokListe[0].CODE != "")
        {
            BirimModalInit();
            $("#MdlBirimEkle").modal('show');
        }
        else
        {
            alertify.okBtn(db.Language($scope.Lang,"Tamam"));
            alertify.alert(db.Language($scope.Lang,"Kodu bölümünü girmeden birim giriş ekranına giremezsiniz !"));
        }
    }
    $scope.BtnModalBarkodEkle = function()
    {
        if($scope.StokListe[0].CODE != "" && $scope.BirimListe.length > 0)
        {
            BarkodModalInit();
            $("#MdlBarkodEkle").modal('show');
            setTimeout(() => {$window.document.getElementById("TxtBarkod").focus();},500)
        }
        else
        {
            if($scope.StokListe[0].CODE == "")
            {
                alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                alertify.alert(db.Language($scope.Lang,"Kodu bölümünü girmeden barkod giriş ekranına giremezsiniz !"));
            }
            else if($scope.BirimListe.length == 0)
            {
                alertify.okBtn(db.Language($scope.Lang,"Tamam"));
                alertify.alert(db.Language($scope.Lang,"Birim bölümünü girmeden barkod giriş ekranına giremezsiniz !"));
            }
        }
    }
    $scope.BtnModalTedarikciEkle = function()
    {
        TedarikciModalInit();
        $("#MdlTedarikciEkle").modal('show');
    }
    $scope.BtnModalUrunGrupEkle = function()
    {
        let TmpQuery =
            {
                db : $scope.Firma,
                query:  "SELECT (ISNULL(MAX(CODE),'') + 1) AS CODE FROM ITEM_GROUP"
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                if(typeof Data[0].CODE != 'undefined')
                {
                    if(Data[0].CODE < 10)
                    {
                        $scope.UrunGrupModal.Kodu = ('00' +Data[0].CODE)
                    }
                    else if(Data[0].CODE < 100)
                    {
                        $scope.UrunGrupModal.Kodu = ('0' +Data[0].CODE)
                    }
                    else
                    {
                        $scope.UrunGrupModal.Kodu = Data[0].CODE
                    }
                }
                else
                {
                    $scope.UrunGrupModal.Kodu = '001'
                }
            });
        UrunGrupModalInit();
        $("#MdlUrunGrupEkle").modal('show');
    }
    $scope.CmbFiyatTipChange = function()
    {
        if($scope.FiyatModal.Tip == "0")
        {
            $("#BasTarih").prop('disabled',true);
            $("#BitTarih").prop('disabled',true);
        }
        else
        {
            $("#BasTarih").prop('disabled',false);
            $("#BitTarih").prop('disabled',false);
        }
    }
    $scope.TxtAdiChange = function()
    {
        $scope.StokListe[0].SNAME = $scope.StokListe[0].NAME.substring(0, 20);
    }
    $scope.BtnTabFiyat = function()
    {
        $("#TabFiyat").addClass('active');
        $("#TabBirim").removeClass('active');
        $("#TabBarkod").removeClass('active');
        $("#TabTedarikci").removeClass('active');
        $("#TabTedarikciFiyat").removeClass('active');
        $("#TabBilgi").removeClass('active');
    }
    $scope.BtnTabBirim = function()
    {
        $("#TabBirim").addClass('active');
        $("#TabFiyat").removeClass('active');
        $("#TabBarkod").removeClass('active');
        $("#TabTedarikci").removeClass('active');
        $("#TabTedarikciFiyat").removeClass('active');
        $("#TabBilgi").removeClass('active');
    }
    $scope.BtnTabBarkod = function()
    {
        $("#TabBarkod").addClass('active');
        $("#TabFiyat").removeClass('active');
        $("#TabBirim").removeClass('active');
        $("#TabTedarikci").removeClass('active');
        $("#TabTedarikciFiyat").removeClass('active');
        $("#TabBilgi").removeClass('active');
    }
    $scope.BtnTabTedarikci = function()
    {
        $("#TabTedarikci").addClass('active');
        $("#TabFiyat").removeClass('active');
        $("#TabBarkod").removeClass('active');
        $("#TabBirim").removeClass('active');
        $("#TabTedarikciFiyat").removeClass('active');
        $("#TabBilgi").removeClass('active');
    }
    $scope.BtnTabTedarikciFiyat = function()
    {
        $("#TabTedarikciFiyat").addClass('active');
        $("#TabTedarikci").removeClass('active');
        $("#TabFiyat").removeClass('active');
        $("#TabBarkod").removeClass('active');
        $("#TabBirim").removeClass('active');
        $("#TabBilgi").removeClass('active');
    }
    $scope.BtnBilgi = function()
    {
        $("#TabBilgi").addClass('active');        
        $("#TabTedarikci").removeClass('active');
        $("#TabFiyat").removeClass('active');
        $("#TabBarkod").removeClass('active');
        $("#TabBirim").removeClass('active');
        $("#TabTedarikciFiyat").removeClass('active');
    }
    $scope.TxtCostPriceValid = function()
    {
        var TmpQuery =
        {
            db : $scope.Firma,
            query:  "SELECT TOP 1 [PRICE] FROM ITEM_PRICE WHERE [ITEM_CODE] = '" + $scope.StokListe[0].CODE + "' AND [TYPE] = 1 ORDER BY LDATE DESC",
            param:  ['ITEM_CODE'],
            type:   ['strimg|25'],
            value:  [$scope.StokListe[0].CODE]
        }

        db.GetDataQuery(TmpQuery,function(Data)
        {
            if(Data.length == 0 || Data[0].PRICE != $scope.StokListe[0].COST_PRICE)
            {
                alertify.okBtn(db.Language($scope.Lang,'Evet'));
                alertify.cancelBtn(db.Language($scope.Lang,'Hayır'));

                alertify.confirm(db.Language($scope.Lang,'Maliyet fiyatınıza tedarikçi bağlamak istermisiniz ?'),
                function()
                {
                    TedarikciFiyatKaydet();

                    //$scope.BtnModalSecim('TedarikciMaliyet');
                }
                ,function()
                {
                });
            }
        });
    }
    $scope.TxtCostPricePress = function(pKey)
    {
        if(pKey.which === 13)
        {
            $("#TxtCostPrice").blur();
        }
    }
    $scope.CmbAnaBirimChange = function()
    {
        setTimeout( function()
        {
            $window.document.getElementById("TxtAnaBirim").focus();
            $window.document.getElementById("TxtAnaBirim").setSelectionRange(0, $window.document.getElementById("TxtAnaBirim").value.length);
        },100);
    }
    $scope.CmbAltBirimChange = function()
    {
        let TmpSymbol = "";
        let TmpFiyat = 0;

        for(let i = 0; i < $scope.Birim.length; i++)
        {
            if($scope.StokListe[0].UNDER_UNIT_NAME == $scope.Birim[i].Kodu)
            {
                TmpSymbol = $scope.Birim[i].Symbol;
            }
        }

        for (let i = 0; i < $scope.FiyatListe.length; i++)
        {
            if($scope.FiyatListe[i].TYPE == 0 && $scope.FiyatListe[i].QUANTITY == 1 || $scope.FiyatListe[i].QUANTITY == 0)
            {
                TmpFiyat = $scope.FiyatListe[i].PRICE;
            }
        }

        $scope.AltBirimFiyati = (TmpFiyat / $scope.StokListe[0].UNDER_UNIT_FACTOR).toFixed(2) + "€ / " + TmpSymbol;

        setTimeout( function(){
            $window.document.getElementById("TxtAltBirim").focus();
            $window.document.getElementById("TxtAltBirim").setSelectionRange(0, $window.document.getElementById("TxtAltBirim").value.length);
        },100);
    }
    $scope.TxtStokKeyPress = function(keyEvent)
    {
        if(typeof keyEvent == 'undefined')
        {
            StokGetir($scope.StokListe[0].CODE);
        }
        else
        {
            if(keyEvent.which === 13)
            {
                StokGetir($scope.StokListe[0].CODE);
            }
        }

    }
    $scope.TxtTedarikciKeyPress = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            if($scope.StokListe[0].ITEM_CUSTOMER != "")
            {
                let TmpQuery =
                {
                    db : $scope.Firma,
                    query:  "SELECT [CODE],[NAME] FROM CUSTOMERS WHERE TYPE = 1 AND (CODE LIKE @CODE + '%' OR NAME LIKE @CODE + '%')",
                    param : ["CODE:string|100"],
                    value : [$scope.StokListe[0].ITEM_CUSTOMER]
                }
                db.GetDataQuery(TmpQuery,function(Data)
                {
                    if(Data.length == 1)
                    {
                        $scope.TedarikciModal.Kodu = Data[0].CODE;
                        $scope.TedarikciModal.Adi = Data[0].NAME;
                        $("#MdlSecim").modal('hide');
                        $("#MdlTedarikciEkle").modal('show');
                    }
                    else if(Data.length > 1)
                    {
                        ModalTip = "TedarikciCari"
                        TblSecimInit(Data);
                        $("#MdlSecim").modal('show');
                        $("#MdlTedarikciEkle").modal('hide');
                    }
                });
            }
        }
    }
    $scope.BtnKodOlustur = function()
    {
        if($scope.StyleAll.visibility == 'hidden')
        {
            $scope.StokListe[0].CODE = Math.floor(Date.now() / 1000);
        }
    }
    $scope.BtnRefKaydet = function()
    {
        if($scope.StyleAll.visibility == 'hidden')
        {
            StokGetir($scope.StokListe[0].CODE,function(pData)
            {
                if(pData.length == 0)
                {
                    $scope.Kaydet((status => 
                    {
                        if(status)
                        {
                            StokGetir($scope.StokListe[0].CODE);
                        }
                    }));
                }
            })
        }
    }
    $scope.BtnKaydet = function()
    {
        $scope.Kaydet((status => 
        {
            if(status)
            {
                StokGetir($scope.StokListe[0].CODE);
            }
        }));
    }
    $scope.TxtBarkodBlur = async function()
    {
        if($scope.StokListe[0].BARCODE != '')
        {
            let TmpQuery =
            {
                db : $scope.Firma,
                query:  "SELECT [BARCODE],[ITEM_CODE] FROM ITEM_BARCODE WHERE [BARCODE] = @BARCODE",
                param: ['BARCODE:string|50'],
                value: [$scope.StokListe[0].BARCODE]
            }

            let TmpResult = await db.GetPromiseQuery(TmpQuery);
            if(TmpResult.length > 0)
            {
                alertify.okBtn(db.Language($scope.Lang,'Tamam'));
                alertify.cancelBtn(db.Language($scope.Lang,'Ürüne Git'));
                alertify.confirm(db.Language($scope.Lang,"Girimiş olduğunuz barkod sistemde kayıtlı"),function()
                {
                    $scope.StokListe[0].BARCODE = "";
                },function()
                {
                    // db.ExecuteTag($scope.Firma,'StokKartSil',[$scope.StokListe[0].CODE],function(data)
                    // {
                    //     StokGetir(TmpResult[0].ITEM_CODE);
                    // });
                });
            }
        }
    }
    $scope.CmbVatBlur = function()
    {
        if($scope.StokListe[0].VAT == "0")
        {
            alertify.okBtn(db.Language($scope.Lang,"Tamam"));
            alertify.alert(db.Language($scope.Lang,"Vergi dilimi yuzde sıfır.Eminmisiniz ?"));
            return;
        }
    }
}