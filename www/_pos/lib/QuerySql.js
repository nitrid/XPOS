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
                "ISNULL((SELECT TOP 1 [PRICE] FROM ITEM_PRICE WHERE [ITEM_CODE] = [CODE] AND [TYPE] = 1 ORDER BY LDATE DESC),ISNULL([COST_PRICE],0)) AS [COST_PRICE], " + 
                "ISNULL((SELECT TOP 1 [PRICE] FROM (SELECT TOP 2 [LDATE],[PRICE] FROM ITEM_PRICE WHERE [ITEM_CODE] = [CODE] AND [TYPE] = 1 ORDER BY LDATE DESC) TMP ORDER BY LDATE ASC),0) AS [LAST_PRICE], " +
                "[MIN_PRICE] AS [MIN_PRICE], " + 
                "[MAX_PRICE] AS [MAX_PRICE], " + 
                "[STATUS] AS [STATUS], " + 
                "ISNULL((SELECT TOP 1 [BARCODE] FROM ITEM_BARCODE WHERE ITEM_CODE = [CODE] ORDER BY LDATE DESC),'') AS [BARCODE], " + 
                "ISNULL((SELECT TOP 1 [CUSTOMER_CODE] FROM ITEM_CUSTOMER WHERE ITEM_CODE = [CODE] ORDER BY LDATE DESC),'') AS [ITEM_CUSTOMER] " +
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
                "WHEN [TYPE] = 1 THEN 'Alış Anlaşması' " + 
                "WHEN [TYPE] = 2 THEN 'Satış Anlaşması' " + 
                "ELSE '' END AS [TYPENAME] " +
                ",[DEPOT] " +
                ",CASE WHEN [START_DATE] = '19700101' THEN '' ELSE CONVERT(nvarchar(25),[START_DATE],104) END AS [START_DATE] " +
                ",CASE WHEN [FINISH_DATE] = '19700101' THEN '' ELSE CONVERT(nvarchar(25),[FINISH_DATE],104) END AS [FINISH_DATE] " +
                ",[PRICE] " +
                ",[CUSTOMER] " +
                "FROM [dbo].[ITEM_PRICE] WHERE [ITEM_CODE] = @ITEM_CODE ORDER BY LDATE DESC",
        param : ['ITEM_CODE:string|25']
    },
    StokKartBirimListeGetir : 
    {
        query : "SELECT " +
                "[GUID] " +
                ",[TYPE] " +
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
                "FROM [dbo].[ITEM_UNIT] WHERE [ITEM_CODE] = @ITEM_CODE ORDER BY LDATE DESC",
        param : ['ITEM_CODE:string|25']
    },
    StokKartBarkodListeGetir : 
    {
        query : "SELECT " + 
                "[GUID] " +
                ",[BARCODE] " +
                ",ISNULL((SELECT TOP 1 [NAME] FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEM_BARCODE.ITEM_CODE),'') AS [UNIT] " +
                ",CASE WHEN [TYPE] = 0 THEN 'EAN8' " +
                "WHEN [TYPE] = 1 THEN 'EAN13' " +
                "WHEN [TYPE] = 2 THEN 'CODE39' " +
                "ELSE '' END AS [TYPE] " +
                "FROM [dbo].[ITEM_BARCODE] WHERE [ITEM_CODE] = @ITEM_CODE ORDER BY LDATE DESC",
        param : ['ITEM_CODE:string|25']
    },
    StokKartTedarikciListeGetir : 
    {
        query : "SELECT " +
                "[GUID], " +
                "[CUSTOMER_CODE], " +
                "ISNULL((SELECT [NAME] FROM CUSTOMERS WHERE [CODE] = [CUSTOMER_CODE]),'') AS [CUSTOMER_NAME], " +
                "[CUSTOMER_ITEM_CODE] " +
                "FROM ITEM_CUSTOMER WHERE ITEM_CODE = @ITEM_CODE ORDER BY LDATE DESC",
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
    },
    FiyatUpdate :
    {
        query : "UPDATE ITEM_PRICE SET PRICE = @PRICE WHERE GUID = CONVERT(NVARCHAR(50),@GUID)",
        param : ['PRICE:float','GUID:string|50']
    },
    BirimKaydet : 
    {
        query : "INSERT INTO [dbo].[ITEM_UNIT] " +
                "([CUSER] " +
                ",[CDATE] " +
                ",[LUSER] " +
                ",[LDATE] " +
                ",[ITEM_CODE] " +
                ",[TYPE] " +
                ",[NAME] " +
                ",[FACTOR] " +
                ",[WEIGHT] " +
                ",[VOLUME] " +
                ",[WIDTH] " +
                ",[HEIGHT] " +
                ",[SIZE] " +
                ") VALUES ( " +
                "@CUSER,				--<CUSER, nvarchar(25),> \n" +
                "GETDATE(),			    --<CDATE, datetime,> \n" +
                "@LUSER,				--<LUSER, nvarchar(25),> \n" +
                "GETDATE(),			    --<LDATE, datetime,> \n" +
                "@ITEM_CODE,		    --<ITEM_CODE, nvarchar(25),> \n" +
                "@TYPE,				    --<TYPE, int,> \n" +
                "@NAME,		    		--<NAME, nvarchar(50),> \n" +
                "@FACTOR,		    	--<FACTOR, float,> \n" +
                "@WEIGHT,		        --<WEIGHT, float,> \n" +
                "@VOLUME,				--<VOLUME, float,> \n" +
                "@WIDTH,			    --<WIDTH, float,> \n" +
                "@HEIGHT,			    --<HEIGHT, float,> \n" +
                "@SIZE			        --<SIZE, float,> \n" +
                ") ",
        param : ['CUSER:string|25','LUSER:string|25','ITEM_CODE:string|25','TYPE:int','NAME:string|50','FACTOR:float','WEIGHT:float',
                 'VOLUME:float','WIDTH:float','HEIGHT:float','SIZE:float']
    },
    BirimSil :
    {
        query : "DELETE FROM ITEM_UNIT WHERE GUID = CONVERT(NVARCHAR(50),@GUID)",
        param : ['GUID:string|50']
    },
    BirimUpdate :
    {
        query : "UPDATE ITEM_UNIT SET FACTOR = @FACTOR, WEIGHT = @WEIGHT, VOLUME = @VOLUME, WIDTH = @WIDTH, " + 
                "HEIGHT = @HEIGHT, SIZE = @SIZE WHERE GUID = CONVERT(NVARCHAR(50),@GUID)",
        param : ['FACTOR:float','WEIGHT:float','VOLUME:float','WIDTH:float','HEIGHT:float','SIZE:float','GUID:string|50']
    },
    BarkodKaydet : 
    {
        query : "INSERT INTO [dbo].[ITEM_BARCODE] " +
                "([CUSER] " +
                ",[CDATE] " +
                ",[LUSER] " +
                ",[LDATE] " +
                ",[ITEM_CODE] " +
                ",[BARCODE] " +
                ",[UNIT] " +
                ",[TYPE] " +
                ") VALUES ( " +
                "@CUSER,				--<CUSER, nvarchar(25),> \n" +
                "GETDATE(),			    --<CDATE, datetime,> \n" +
                "@LUSER,				--<LUSER, nvarchar(25),> \n" +
                "GETDATE(),			    --<LDATE, datetime,> \n" +
                "@ITEM_CODE,		    --<ITEM_CODE, nvarchar(25),> \n" +
                "@BARCODE,				--<BARCODE, nvarchar(50),> \n" +
                "@UNIT,		    	    --<UNIT, uniqueidentifier,> \n" +
                "@TYPE		            --<TYPE, int,> \n" +
                ") ",
        param : ['CUSER:string|25','LUSER:string|25','ITEM_CODE:string|25','BARCODE:string|50','UNIT:string|50','TYPE:int']
    },
    BarkodSil :
    {
        query : "DELETE FROM ITEM_BARCODE WHERE GUID = CONVERT(NVARCHAR(50),@GUID)",
        param : ['GUID:string|50']
    },
    BarkodUpdate :
    {
        query : "UPDATE ITEM_BARCODE SET BARCODE = @BARCODE WHERE GUID = CONVERT(NVARCHAR(50),@GUID)",
        param : ['BARCODE:string|50','GUID:string|50']
    },
    StokTedarikciKaydet : 
    {
        query : "INSERT INTO [dbo].[ITEM_CUSTOMER] " +
                "([CUSER] " +
                ",[CDATE] " +
                ",[LUSER] " +
                ",[LDATE] " +
                ",[ITEM_CODE] " +
                ",[CUSTOMER_CODE] " +
                ",[CUSTOMER_ITEM_CODE] " + 
                ") VALUES ( " +
                "@CUSER,				--<CUSER, nvarchar(25),> \n" +
                "GETDATE(),			    --<CDATE, datetime,> \n" +
                "@LUSER,				--<LUSER, nvarchar(25),> \n" +
                "GETDATE(),			    --<LDATE, datetime,> \n" +
                "@ITEM_CODE,		    --<ITEM_CODE, nvarchar(25),> \n" +
                "@CUSTOMER_CODE, 		--<CUSTOMER_CODE, nvarchar(25),> \n" +
                "@CUSTOMER_ITEM_CODE 	--<CUSTOMER_ITEM_CODE, nvarchar(25),> \n" +
                ") ",
        param : ['CUSER:string|25','LUSER:string|25','ITEM_CODE:string|25','CUSTOMER_CODE:string|25','CUSTOMER_ITEM_CODE:string|25']
    },
    StokTedarikciSil :
    {
        query : "DELETE FROM ITEM_CUSTOMER WHERE GUID = CONVERT(NVARCHAR(50),@GUID)",
        param : ['GUID:string|50']
    },
    StokTedarikciUpdate :
    {
        query : "UPDATE ITEM_CUSTOMER SET CUSTOMER_CODE = @CUSTOMER_CODE,CUSTOMER_ITEM_CODE = @CUSTOMER_ITEM_CODE WHERE GUID = CONVERT(NVARCHAR(50),@GUID)",
        param : ['CUSTOMER_CODE:string|25','CUSTOMER_ITEM_CODE:string|25','GUID:string|50']
    },
    CariKartGetir : 
    {
        query : "SELECT " +
                "CUSTOMERS.[CODE] AS [CODE], " +
                "CONVERT(NVARCHAR,CUSTOMERS.[TYPE]) AS [TYPE], " +
                "CONVERT(NVARCHAR,CUSTOMERS.[GENUS]) AS [GENUS], " +
                "CUSTOMERS.[NAME] AS [NAME], " +
                "CUSTOMERS.[LAST_NAME] AS [LAST_NAME], " +
                "CUSTOMERS.[COMPANY] AS [COMPANY], " +
                "CUSTOMERS.[CUSTOMER_GRP] AS [CUSTOMER_GRP], " +
                "CUSTOMERS.[PHONE1] AS [PHONE1], " +
                "CUSTOMERS.[PHONE2] AS [PHONE2], " +
                "CUSTOMERS.[EMAIL] AS [EMAIL], " +
                "CUSTOMERS.[WEB] AS [WEB], " +
                "CUSTOMERS.[NOTE] AS [NOTE], " +
                "CUSTOMERS.[SIRET_ID] AS [SIRET_ID], " +
                "CUSTOMERS.[APE_CODE] AS [APE_CODE], " +
                "CUSTOMERS.[TAX_OFFICE] AS [TAX_OFFICE], " +
                "CUSTOMERS.[TAX_NO] AS [TAX_NO], " +
                "CUSTOMERS.[INT_VAT_NO] AS [INT_VAT_NO], " +
                "CONVERT(NVARCHAR,CUSTOMERS.[TAX_TYPE]) AS [TAX_TYPE], " +
                "ISNULL(CUSTOMER_ADRESS.[ADRESS],'') AS [ADRESS], " +
                "ISNULL(CUSTOMER_ADRESS.[ZIPCODE],'') AS [ZIPCODE], " +
                "ISNULL(CUSTOMER_ADRESS.[CITY],'') AS [CITY], " +
                "ISNULL(CUSTOMER_ADRESS.[COUNTRY],'') AS [COUNTRY] " +
                "FROM CUSTOMERS " + 
                "LEFT OUTER JOIN CUSTOMER_ADRESS ON " + 
                "CUSTOMER_ADRESS.CUSTOMER = CUSTOMERS.[CODE]  AND CUSTOMER_ADRESS.[TYPE] = 0 " +
                "WHERE CODE = @CODE",
        param : ['CODE'],
        type : ['string|25'] 
    },
    CariKartKaydet : 
    {
        query : "DECLARE @TMPCODE NVARCHAR(25) " +
                "SET @TMPCODE = ISNULL((SELECT CODE FROM CUSTOMERS WHERE CODE = @CODE),'') " +
                "IF @TMPCODE = '' " +
                "INSERT INTO [dbo].[CUSTOMERS] " +
                "([CUSER] " +
                ",[CDATE] " +
                ",[LUSER] " +
                ",[LDATE] " +
                ",[CODE] " +
                ",[TYPE] " +
                ",[GENUS] " +
                ",[NAME] " +
                ",[LAST_NAME] " +
                ",[COMPANY] " +
                ",[CUSTOMER_GRP] " +
                ",[PHONE1] " +
                ",[PHONE2] " +
                ",[EMAIL] " +
                ",[WEB] " +
                ",[NOTE] " +
                ",[SIRET_ID] " +
                ",[APE_CODE] " +
                ",[TAX_OFFICE] " +
                ",[TAX_NO] " +
                ",[INT_VAT_NO] " +
                ",[TAX_TYPE] " +                
                ") VALUES ( " +
                "@CUSER,				--<CUSER, nvarchar(25),> \n" +
                "GETDATE(),			    --<CDATE, datetime,> \n" +
                "@LUSER,				--<LUSER, nvarchar(25),> \n" +
                "GETDATE(),			    --<LDATE, datetime,> \n" +
                "@CODE,				    --<CODE, nvarchar(25),> \n" +
                "@TYPE,				    --<TYPE, smallint,> \n" +
                "@GENUS,				--<GENUS, smallint,> \n" +
                "@NAME,		    	    --<NAME, nvarchar(100),> \n" +
                "@LAST_NAME,		    --<LAST_NAME, nvarchar(100),> \n" +
                "@COMPANY,				--<COMPANY, nvarchar(100),> \n" +
                "@CUSTOMER_GRP,			--<CUSTOMER_GRP, nvarchar(25),> \n" +
                "@PHONE1,			    --<PHONE1, nvarchar(20),> \n" +
                "@PHONE2,			    --<PHONE2, nvarchar(20),> \n" +
                "@EMAIL,				--<EMAIL, nvarchar(100),> \n" +
                "@WEB,			        --<WEB, nvarchar(100),> \n" +
                "@NOTE,			        --<NOTE, nvarchar(max),> \n" +
                "@SIRET_ID,			    --<SIRET_ID, nvarchar(20),> \n" +
                "@APE_CODE,			    --<APE_CODE, nvarchar(10),> \n" +
                "@TAX_OFFICE,			--<TAX_OFFICE, nvarchar(25),> \n" +
                "@TAX_NO,			    --<TAX_NO, nvarchar(30),> \n" +
                "@INT_VAT_NO,			--<INT_VAT_NO, nvarchar(30),> \n" +
                "@TAX_TYPE			    --<TAX_TYPE, smallint,> \n" +
                ") " +
                "ELSE " + 
                "UPDATE [dbo].[CUSTOMERS] SET " +
                "[LUSER] = @LUSER " +
                ",[LDATE] = GETDATE() " +
                ",[TYPE] = @TYPE " +
                ",[GENUS] = @GENUS " +
                ",[NAME] = @NAME " +
                ",[LAST_NAME] = @LAST_NAME " +
                ",[COMPANY] = @COMPANY " +
                ",[CUSTOMER_GRP] = @CUSTOMER_GRP " +
                ",[PHONE1] = @PHONE1 " +
                ",[PHONE2] = @PHONE2 " +
                ",[EMAIL] = @EMAIL " +
                ",[WEB] = @WEB " +
                ",[NOTE] = @NOTE " +
                ",[SIRET_ID] = @SIRET_ID " +
                ",[APE_CODE] = @APE_CODE " +
                ",[TAX_OFFICE] = @TAX_OFFICE " +
                ",[TAX_NO] = @TAX_NO " +
                ",[INT_VAT_NO] = @INT_VAT_NO " +
                ",[TAX_TYPE] = @TAX_TYPE " +
                "WHERE [CODE] = @TMPCODE",
        param : ['CUSER:string|25','LUSER:string|25','CODE:string|25','TYPE:int','GENUS:int','NAME:string|100','LAST_NAME:string|100','COMPANY:string|100',
                 'CUSTOMER_GRP:string|25','PHONE1:string|20','PHONE2:string|20','EMAIL:string|100','WEB:string|100','NOTE:string|200','SIRET_ID:string|20',
                 'APE_CODE:string|10','TAX_OFFICE:string|25','TAX_NO:string|30','INT_VAT_NO:string|30','TAX_TYPE:int']
    },
    AdresKaydet : 
    {
        query : "DECLARE @TMPCODE NVARCHAR(25) " +
                "SET @TMPCODE = ISNULL((SELECT CUSTOMER FROM CUSTOMER_ADRESS WHERE [CUSTOMER] = @CUSTOMER AND [TYPE] = @TYPE),'') " +
                "IF @TMPCODE = '' " +
                "INSERT INTO [dbo].[CUSTOMER_ADRESS] " +
                "([CUSER] " +
                ",[CDATE] " +
                ",[LUSER] " +
                ",[LDATE] " +
                ",[TYPE] " +
                ",[CUSTOMER] " +
                ",[ADRESS] " +
                ",[ZIPCODE] " +
                ",[CITY] " +
                ",[COUNTRY] " +
                ") VALUES ( " +
                "@CUSER,				--<CUSER, nvarchar(25),> \n" +
                "GETDATE(),			    --<CDATE, datetime,> \n" +
                "@LUSER,				--<LUSER, nvarchar(25),> \n" +
                "GETDATE(),			    --<LDATE, datetime,> \n" +
                "@TYPE,				    --<TYPE, smallint,> \n" +
                "@CUSTOMER,				--<CUSTOMER, nvarchar(25),> \n" +
                "@ADRESS,				--<ADRESS, nvarchar(500),> \n" +
                "@ZIPCODE,		    	--<ZIPCODE, nvarchar(10),> \n" +
                "@CITY,		            --<CITY, nvarchar(25),> \n" +
                "@COUNTRY				--<COUNTRY, nvarchar(3),> \n" +
                ") " +
                "ELSE " + 
                "UPDATE [dbo].[CUSTOMER_ADRESS] SET " +
                "[LUSER] = @LUSER " +
                ",[LDATE] = GETDATE() " +
                ",[ADRESS] = @ADRESS " +
                ",[ZIPCODE] = @ZIPCODE " +
                ",[CITY] = @CITY " +
                ",[COUNTRY] = @COUNTRY " +
                "WHERE [CUSTOMER] = @TMPCODE AND [TYPE] = @TYPE",
        param : ['CUSER:string|25','LUSER:string|25','TYPE:int','CUSTOMER:string|25','ADRESS:string|500','ZIPCODE:string|10','CITY:string|25','COUNTRY:string|3']
    },
    CariKartSil :
    {
        query : "DELETE FROM CUSTOMERS WHERE [CODE] = @CODE " + 
                "DELETE FROM CUSTOMER_ADRESS WHERE [CUSTOMER] = @CODE AND [TYPE] = @TYPE",
        param : ['CODE:string|25','TYPE:int']
    },
};


