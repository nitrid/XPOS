var QuerySql = 
{
    StokKartGetir : 
    {
        query : "SELECT " + 
                "[CODE] AS [CODE], " +
                "[NAME] AS [NAME], " + 
                "[SNAME] AS [SNAME], " + 
                "[ITEM_GRP] AS [ITEM_GRP], " + 
                "CONVERT(nvarchar(5),[TYPE]) AS [TYPE], " + 
                "CONVERT(nvarchar(5),[VAT]) AS [VAT], " + 
                "[COST_PRICE] AS [COST_PRICE], " + 
                "[MIN_PRICE] AS [MIN_PRICE], " + 
                "[MAX_PRICE] AS [MAX_PRICE], " + 
                "[STATUS] AS [STATUS] " + 
                "FROM ITEMS WHERE CODE = @CODE",
        param : ['CODE'],
        type : ['string|25'] 
    },
    StokKartKaydet : 
    {
        query : "DECLARE @TMPCODE NVARCHAR(25) " +
                "SET @TMPCODE = ISNULL((SELECT CODE FROM ITEMS WHERE CODE = @CODE),'') " +
                "IF @TMPCODE = '' " +
                "INSERT INTO [dbo].[ITEMS] " +
                "([CUSER] " +
                ",[CDATE] " +
                ",[LUSER] " +
                ",[LDATE] " +
                ",[CODE] " +
                ",[NAME] " +
                ",[SNAME] " +
                ",[ITEM_GRP] " +
                ",[TYPE] " +
                ",[VAT] " +
                ",[COST_PRICE] " +
                ",[MIN_PRICE] " +
                ",[MAX_PRICE] " +
                ",[STATUS] " +
                ") VALUES ( " +
                "@CUSER,				--<CUSER, nvarchar(25),> \n" +
                "GETDATE(),			    --<CDATE, datetime,> \n" +
                "@LUSER,				--<LUSER, nvarchar(25),> \n" +
                "GETDATE(),			    --<LDATE, datetime,> \n" +
                "@CODE,				    --<CODE, nvarchar(25),> \n" +
                "@NAME,				    --<NAME, nvarchar(250),> \n" +
                "@SNAME,				--<SNAME, nvarchar(20),> \n" +
                "@ITEM_GRP,			    --<ITEM_GRP, nvarchar(25),> \n" +
                "@TYPE,				    --<TYPE, int,> \n" +
                "@VAT,				    --<VAT, float,> \n" +
                "@COST_PRICE,			--<COST_PRICE, float,> \n" +
                "@MIN_PRICE,			--<MIN_PRICE, float,> \n" +
                "@MAX_PRICE,			--<MAX_PRICE, float,> \n" +
                "@STATUS				--<STATUS, bit,> \n" +
                ") " +
                "ELSE " + 
                "UPDATE [dbo].[ITEMS] SET " +
                "[LUSER] = @LUSER " +
                ",[LDATE] = GETDATE() " +
                ",[NAME] = @NAME " +
                ",[SNAME] = @SNAME " +
                ",[ITEM_GRP] = @ITEM_GRP " +
                ",[TYPE] = @TYPE " +
                ",[VAT] = @VAT " +
                ",[COST_PRICE] = @COST_PRICE " +
                ",[MIN_PRICE] = @MIN_PRICE " +
                ",[MAX_PRICE] = @MAX_PRICE " +
                ",[STATUS] = @STATUS " +
                "WHERE [CODE] = @TMPCODE",
        param : ['CUSER:string|25','LUSER:string|25','CODE:string|25','NAME:string|250','SNAME:string|20','ITEM_GRP:string|25','TYPE:int','VAT:float',
                 'COST_PRICE:float','MIN_PRICE:float','MAX_PRICE:float','STATUS:bit']
    },
    StokKartSil :
    {
        query : "DELETE FROM ITEMS WHERE CODE = @CODE",
        param : ['CODE:string|25']
    },
    StokKartFiyatListeGetir : 
    {
        query : "SELECT " +
                "[GUID] " +
                ",[TYPE] " +
                ",CASE WHEN [TYPE] = 0 THEN 'Standart' " +
                "WHEN [TYPE] = 1 THEN 'Satış Anlaşması' " + 
                "WHEN [TYPE] = 2 THEN 'Alış Anlaşması' " + 
                "ELSE '' END AS [TYPENAME] " +
                ",[DEPOT] " +
                ",CASE WHEN [START_DATE] = '19700101' THEN '' ELSE CONVERT(nvarchar(25),[START_DATE],104) END AS [START_DATE] " +
                ",CASE WHEN [FINISH_DATE] = '19700101' THEN '' ELSE CONVERT(nvarchar(25),[FINISH_DATE],104) END AS [FINISH_DATE] " +
                ",[PRICE] " +
                ",[CUSTOMER] " +
                "FROM [dbo].[ITEM_PRICE] WHERE [ITEM_CODE] = @ITEM_CODE",
        param : ['ITEM_CODE:string|25']
    },
    StokKartBirimListeGetir : 
    {
        query : "SELECT " +
                "[TYPE] " +
                ",CASE WHEN [TYPE] = 0 THEN 'Alt Birim' " +
                "WHEN [TYPE] = 1 THEN 'Ana Birim' " +
                "WHEN [TYPE] = 2 THEN 'Üst Birim' " +
                "ELSE '' END AS [TYPENAME] " +
                ",[NAME] " +
                ",[FACTOR] " +
                ",[WEIGHT] " +
                ",[VOLUME] " +
                ",[WIDTH] " +
                ",[HEIGHT] " +
                ",[SIZE] " +
                "FROM [dbo].[ITEM_UNIT] WHERE [ITEM_CODE] = @ITEM_CODE",
        param : ['ITEM_CODE:string|25']
    },
    StokKartBarkodListeGetir : 
    {
        query : "SELECT " + 
                "[BARCODE] " +
                ",ISNULL((SELECT TOP 1 [NAME] FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEM_BARCODE.ITEM_CODE),'') AS [UNIT] " +
                ",CASE WHEN [TYPE] = 0 THEN 'EAN8' " +
                "WHEN [TYPE] = 1 THEN 'EAN13' " +
                "WHEN [TYPE] = 2 THEN 'CODE39' " +
                "ELSE '' END AS [TYPE] " +
                "FROM [dbo].[ITEM_BARCODE] WHERE [ITEM_CODE] = @ITEM_CODE",
        param : ['ITEM_CODE:string|25']
    },
    StokKartTedarikciListeGetir : 
    {
        query : "SELECT " +
                "[CUSTOMER_CODE], " +
                "ISNULL((SELECT [NAME] FROM CUSTOMERS WHERE [CODE] = [CUSTOMER_CODE]),'') AS [CUSTOMER_NAME] " +
                "FROM ITEM_CUSTOMER WHERE ITEM_CODE = @ITEM_CODE",
        param : ['ITEM_CODE:string|25']
    },
    FiyatKaydet : 
    {
        query : "INSERT INTO [dbo].[ITEM_PRICE] " +
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
                ",[CUSTOMER] " +
                ") VALUES ( " +
                "@CUSER,				--<CUSER, nvarchar(25),> \n" +
                "GETDATE(),			    --<CDATE, datetime,> \n" +
                "@LUSER,				--<LUSER, nvarchar(25),> \n" +
                "GETDATE(),			    --<LDATE, datetime,> \n" +
                "@ITEM_CODE,		    --<ITEM_CODE, nvarchar(25),> \n" +
                "@TYPE,				    --<TYPE, int,> \n" +
                "@DEPOT,				--<DEPOT, nvarchar(25),> \n" +
                "@START_DATE,			--<START_DATE, datetime,> \n" +
                "@FINISH_DATE,		    --<FINISH_DATE, datetime,> \n" +
                "@PRICE,				--<PRICE, float,> \n" +
                "@CUSTOMER			    --<CUSTOMER, nvarchar(25),> \n" +
                ") ",
        param : ['CUSER:string|25','LUSER:string|25','ITEM_CODE:string|25','TYPE:int','DEPOT:string|25','START_DATE:date','FINISH_DATE:date',
                 'PRICE:float','CUSTOMER:string|25']
    },
    FiyatSil :
    {
        query : "DELETE FROM ITEM_PRICE WHERE GUID = CONVERT(NVARCHAR(50),@GUID)",
        param : ['GUID:string|50']
    }
};


