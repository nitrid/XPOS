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
                "[PLU] AS [PLU], " + 
                "[TARTIM] AS [TARTIM], " + 
                "ISNULL((SELECT TOP 1 [BARCODE] FROM ITEM_BARCODE WHERE ITEM_CODE = [CODE] ORDER BY LDATE DESC),'') AS [BARCODE], " + 
                "ISNULL((SELECT TOP 1 [CUSTOMER_CODE] FROM ITEM_CUSTOMER WHERE ITEM_CODE = [CODE] ORDER BY LDATE DESC),'') AS [ITEM_CUSTOMER], " +
                "ISNULL((SELECT TOP 1 [CUSTOMER_ITEM_CODE] FROM ITEM_CUSTOMER WHERE ITEM_CODE = [CODE] ORDER BY LDATE DESC),'') AS [CUSTOMER_ITEM_CODE], " +
                "ISNULL((SELECT TOP 1 [NAME] FROM ITEM_UNIT WHERE ITEM_CODE = @CODE AND [TYPE] = 1 ORDER BY LDATE DESC),'') AS [UNDER_UNIT_NAME], " +
                "ISNULL((SELECT TOP 1 [FACTOR] FROM ITEM_UNIT WHERE ITEM_CODE = @CODE AND [TYPE] = 1 ORDER BY LDATE DESC),0) AS [UNDER_UNIT_FACTOR], " +
                "ISNULL((SELECT TOP 1 [NAME] FROM ITEM_UNIT WHERE ITEM_CODE = @CODE AND [TYPE] = 0 ORDER BY LDATE DESC),'') AS [MAIN_UNIT_NAME], " +
                "ISNULL((SELECT TOP 1 [FACTOR] FROM ITEM_UNIT WHERE ITEM_CODE = @CODE AND [TYPE] = 0 ORDER BY LDATE DESC),0) AS [MAIN_UNIT_FACTOR] " +
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
                ",[PLU] " +
                ",[TARTIM] " +
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
                "@STATUS,				--<STATUS, bit,> \n" +
                "@PLU,				    --<PLU, bit,> \n" +
                "@TARTIM			    --<TARTIM, bit,> \n" +
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
                ",[PLU] = @PLU " +
                ",[TARTIM] = @TARTIM " +
                "WHERE [CODE] = @TMPCODE",
        param : ['CUSER:string|25','LUSER:string|25','CODE:string|25','NAME:string|250','SNAME:string|20','ITEM_GRP:string|25','TYPE:int','VAT:float',
                 'COST_PRICE:float','MIN_PRICE:float','MAX_PRICE:float','STATUS:bit','PLU:bit','TARTIM:bit']
    },
    StokKartSil :
    {
        query : "DELETE FROM ITEMS WHERE CODE = @CODE",
        param : ['CODE:string|25']
    },
    StokKartFiyatListeGetir : 
    {
        query : "SELECT *, " + 
                "ROUND((((EXVAT - COST_PRICE) / 1.27) / EXVAT) * 100,0) AS NETMARJORAN, " + 
                "CONVERT(nvarchar,ROUND((EXVAT - COST_PRICE) / 1.27,2)) + '€ / %' + CONVERT(nvarchar,ROUND((((EXVAT - COST_PRICE) / 1.27) / EXVAT) * 100,0)) AS NETMARJ, " + 
                "ROUND(((EXVAT - COST_PRICE) / EXVAT) * 100,0) AS BRUTMARJORAN, " + 
                "CONVERT(nvarchar,ROUND(EXVAT - COST_PRICE,2)) + '€ / %' + CONVERT(nvarchar,ROUND(((EXVAT - COST_PRICE) / EXVAT) * 100,0)) AS BRUTMARJ " + 
                "FROM " + 
                "(SELECT " + 
                "[GUID] " + 
                ",[TYPE] " + 
                ",[LDATE] " + 
                ",CASE WHEN [TYPE] = 0 THEN 'Standart' " + 
                "WHEN [TYPE] = 1 THEN 'Alış Anlaşması' " + 
                "WHEN [TYPE] = 2 THEN 'Satış Anlaşması' " + 
                "ELSE '' END AS [TYPENAME] " + 
                ",[DEPOT] " + 
                ",CONVERT(NVARCHAR,[START_DATE],104) AS [START_DATE] " + 
                ",CONVERT(NVARCHAR,[FINISH_DATE],104) AS [FINISH_DATE] " + 
                ",[PRICE] " + 
                ",[QUANTITY] " + 
                ",[CUSTOMER] " + 
                ",ROUND([PRICE] / (((SELECT VAT FROM ITEMS WHERE CODE = [ITEM_CODE]) / 100) + 1),2) AS EXVAT " + 
                ",ISNULL((SELECT TOP 1 COST_PRICE FROM ITEMS WHERE ITEMS.CODE = ITEM_CODE),0) AS COST_PRICE " + 
                "FROM [dbo].[ITEM_PRICE] WHERE [ITEM_CODE] = @ITEM_CODE AND [TYPE] <> 1) " + 
                "AS TMP ORDER BY LDATE DESC",
        param : ['ITEM_CODE:string|25']
    },
    StokKartBirimListeGetir : 
    {
        query : "SELECT " +
                "[GUID] " +
                ",[TYPE] " +
                ",CASE WHEN [TYPE] = 0 THEN 'Ana Birim' " +
                "WHEN [TYPE] = 1 THEN 'Alt Birim' " +
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
                "[CUSTOMER_ITEM_CODE], " +
                "ISNULL((SELECT TOP 1 CONVERT(nvarchar,[LDATE],104) FROM [ITEM_PRICE] WHERE [ITEM_CODE] = @ITEM_CODE AND [CUSTOMER] = [CUSTOMER_CODE] AND [TYPE] = 1 ORDER BY LDATE DESC),0) AS PRICE_LDATE, " +
                "ISNULL((SELECT TOP 1 [PRICE] FROM [ITEM_PRICE] WHERE [ITEM_CODE] = @ITEM_CODE AND [CUSTOMER] = [CUSTOMER_CODE] AND [TYPE] = 1 ORDER BY LDATE DESC),0) AS PRICE " +
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
                ",[QUANTITY] " +
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
                "@QUANTITY,				--<QUANTITY, float,> \n" +
                "@CUSTOMER			    --<CUSTOMER, nvarchar(25),> \n" +
                ") ",
        param : ['CUSER:string|25','LUSER:string|25','ITEM_CODE:string|25','TYPE:int','DEPOT:string|25','START_DATE:date','FINISH_DATE:date',
                 'PRICE:float','QUANTITY:float','CUSTOMER:string|25']
    },
    FiyatSil :
    {
        query : "DELETE FROM ITEM_PRICE WHERE GUID = CONVERT(NVARCHAR(50),@GUID)",
        param : ['GUID:string|50']
    },
    FiyatUpdate :
    {
        query : "UPDATE ITEM_PRICE SET PRICE = @PRICE,QUANTITY = @QUANTITY,START_DATE = @START_DATE,FINISH_DATE = @FINISH_DATE WHERE GUID = CONVERT(NVARCHAR(50),@GUID)",
        param : ['PRICE:float','QUANTITY:float','START_DATE:date','FINISH_DATE:date','GUID:string|50']
    },
    BirimKaydet : 
    {
        query : "DECLARE @TMPCODE NVARCHAR(25) " +
                "IF @TYPE = 1 " + 
                "SET @TMPCODE = ISNULL((SELECT [ITEM_CODE] FROM ITEM_UNIT WHERE [NAME] = @NAME AND [ITEM_CODE] = @ITEM_CODE),'') " +
                "ELSE " +
                "SET @TMPCODE = ISNULL((SELECT [ITEM_CODE] FROM ITEM_UNIT WHERE [TYPE] = @TYPE AND [ITEM_CODE] = @ITEM_CODE),'') " +
                "IF @TMPCODE = '' " +
                "INSERT INTO [dbo].[ITEM_UNIT] " +
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
                ") " +
                "ELSE " + 
                "UPDATE [dbo].[ITEM_UNIT] SET " +
                "[LUSER] = @LUSER " +
                ",[LDATE] = GETDATE() " +
                ",[TYPE] = @TYPE " +
                ",[NAME] = @NAME " +
                ",[FACTOR] = @FACTOR " +
                ",[WEIGHT] = @WEIGHT " +
                ",[VOLUME] = @VOLUME " +
                ",[WIDTH] = @WIDTH " +
                ",[HEIGHT] = @HEIGHT " +
                ",[SIZE] = @SIZE " +
                "WHERE [ITEM_CODE] = @TMPCODE AND [NAME] = @NAME AND [TYPE] = @TYPE",
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
    UrunGrupKaydet : 
    {
        query : "DECLARE @TMPCODE NVARCHAR(25) " +
                "SET @TMPCODE = ISNULL((SELECT CODE FROM ITEM_GROUP WHERE CODE = @CODE),'') " +
                "IF @TMPCODE = '' " +
                "INSERT INTO [dbo].[ITEM_GROUP] " +
                "([CUSER] " +
                ",[CDATE] " +
                ",[LUSER] " +
                ",[LDATE] " +
                ",[CODE] " +
                ",[NAME] " +
                ") VALUES ( " +
                "@CUSER,				--<CUSER, nvarchar(25),> \n" +
                "GETDATE(),			    --<CDATE, datetime,> \n" +
                "@LUSER,				--<LUSER, nvarchar(25),> \n" +
                "GETDATE(),			    --<LDATE, datetime,> \n" +
                "@CODE,		            --<CODE, nvarchar(25),> \n" +
                "@NAME   		        --<NAME, nvarchar(100),> \n" +
                ") " +
                "ELSE " + 
                "UPDATE [dbo].[ITEM_GROUP] SET " +
                "[LUSER] = @LUSER " +
                ",[LDATE] = GETDATE() " +
                ",[NAME] = @NAME " +
                "WHERE [CODE] = @TMPCODE",
        param : ['CUSER:string|25','LUSER:string|25','CODE:string|25','NAME:string|100']
    },
    CariGrupKaydet : 
    {
        query : "DECLARE @TMPCODE NVARCHAR(25) " +
                "SET @TMPCODE = ISNULL((SELECT CODE FROM CUSTOMER_GROUP WHERE CODE = @CODE),'') " +
                "IF @TMPCODE = '' " +
                "INSERT INTO [dbo].[CUSTOMER_GROUP] " +
                "([CUSER] " +
                ",[CDATE] " +
                ",[LUSER] " +
                ",[LDATE] " +
                ",[CODE] " +
                ",[NAME] " +
                ") VALUES ( " +
                "@CUSER,				--<CUSER, nvarchar(25),> \n" +
                "GETDATE(),			    --<CDATE, datetime,> \n" +
                "@LUSER,				--<LUSER, nvarchar(25),> \n" +
                "GETDATE(),			    --<LDATE, datetime,> \n" +
                "@CODE,		            --<CODE, nvarchar(25),> \n" +
                "@NAME   		        --<NAME, nvarchar(100),> \n" +
                ") " +
                "ELSE " + 
                "UPDATE [dbo].[CUSTOMER_GROUP] SET " +
                "[LUSER] = @LUSER " +
                ",[LDATE] = GETDATE() " +
                ",[NAME] = @NAME " +
                "WHERE [CODE] = @TMPCODE",
        param : ['CUSER:string|25','LUSER:string|25','CODE:string|25','NAME:string|100']
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
                "CUSTOMERS.[GSM_PHONE] AS [GSM_PHONE], " +
                "CUSTOMERS.[OTHER_PHONE] AS [OTHER_PHONE], " +
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
                ",[GSM_PHONE] " +
                ",[OTHER_PHONE] " +
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
                "@GSM_PHONE,			--<GSM_PHONE, nvarchar(20),> \n" +
                "@OTHER_PHONE,			--<OTHER_PHONE, nvarchar(20),> \n" +
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
                ",[GSM_PHONE] = @GSM_PHONE " +
                ",[OTHER_PHONE] = @OTHER_PHONE " +
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
                 'CUSTOMER_GRP:string|25','PHONE1:string|20','PHONE2:string|20','GSM_PHONE:string|20','OTHER_PHONE:string|20','EMAIL:string|100','WEB:string|100',
                 'NOTE:string|200','SIRET_ID:string|20','APE_CODE:string|10','TAX_OFFICE:string|25','TAX_NO:string|30','INT_VAT_NO:string|30','TAX_TYPE:int']
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
    PosCariGetir:
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
                "CUSTOMERS.[GSM_PHONE] AS [GSM_PHONE], " +
                "CUSTOMERS.[OTHER_PHONE] AS [OTHER_PHONE], " +
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
                "WHERE ((CODE = @CODE) OR (@CODE = '')) AND (([NAME] = @NAME) OR (@NAME = ''))",
        param : ['CODE','NAME'],
        type : ['string|25','string|25'] 
    },
    PosCariListeGetir:
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
                "CUSTOMERS.[GSM_PHONE] AS [GSM_PHONE], " +
                "CUSTOMERS.[OTHER_PHONE] AS [OTHER_PHONE], " +
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
                "WHERE (([CODE] LIKE '%' + @CODE + '%') OR (@CODE = '')) AND (([NAME] LIKE '%' + @NAME + '%') OR (@NAME = '')) ORDER BY [CODE] ASC",
        param : ['CODE','NAME'],
        type : ['string|25','string|25'] 
    },
    PosPluGrupGetir:
    {
        query : "SELECT " +
                "ITEM_GRP AS GRUP " +
                "FROM ITEMS WHERE PLU = 1 GROUP BY ITEM_GRP"
    },
    PosPluGetir:
    {
        query : "SELECT " +
                "[CODE] AS [CODE], " +
                "[SNAME] AS [SNAME], " +
                "[ITEM_GRP] AS [ITEM_GRP] " +
                "FROM ITEMS WHERE PLU = 1 AND ITEM_GRP = @ITEM_GRP",
        param : ['ITEM_GRP'],
        type : ['string|25'] 
    },
    PosSatisParkListe:
    {
        query:"SELECT MAX([LUSER]) AS [LUSER], [REF] AS [REF],[REF_NO] AS [REF_NO], SUM([PRICE] * [QUANTITY]) AS [AMOUNT],MAX(CONVERT(varchar(10),CDATE, 121)) AS [DATE] " +
              "FROM POS_SALES WHERE [DEPARTMENT] = @DEPARTMENT AND [TYPE] = @TYPE AND [LUSER] = @LUSER AND STATUS = @STATUS GROUP BY REF,REF_NO",
        param: ['DEPARTMENT','TYPE','LUSER','STATUS'],
        type:  ['int','int','string|25','int']  
    },
    MaxPosSatisSira : 
    {
        query: "SELECT ISNULL(MAX(REF_NO),0) + 1 AS MAXREFNO FROM POS_SALES " +
                "WHERE DEPARTMENT = @DEPARTMENT AND REF = @REF AND [TYPE] = @TYPE " ,
        param : ['DEPARTMENT','REF','TYPE'],
        type : ['int','string|25','int']
    },
    MaxPosTahSira : 
    {
        query: "SELECT ISNULL(MAX(REF_NO),0) + 1 AS MAXREFNO FROM POS_PAYMENT " +
                "WHERE DEPARTMENT = @DEPARTMENT AND REF = @REF AND DOC_TYPE = @DOC_TYPE " ,
        param : ['DEPARTMENT','REF','DOC_TYPE'],
        type : ['int','string|25','int']
    },
    StokGetir : 
    {
        query:  "SELECT ITEMS.CODE AS CODE, " +
                "ISNULL((SELECT TOP 1 PRICE FROM ITEM_PRICE WHERE [TYPE] = 0 AND QUANTITY = 1 AND ITEM_CODE = ITEMS.CODE),'') AS PRICE, " +
                "ITEMS.[NAME] AS [NAME], " +
                "ITEMS.SNAME AS SNAME, " +
                "ITEMS.VAT AS VAT, " +
                "'' AS BARKOD, " +
                "ISNULL(UNIT.FACTOR,1) AS FACTOR, " + 
                "ISNULL(CONVERT(NVARCHAR(50),UNIT.[GUID]),'') AS UNIT " +
                "FROM ITEMS AS ITEMS " +
                "LEFT OUTER JOIN ITEM_UNIT AS UNIT ON " +
                "UNIT.ITEM_CODE = ITEMS.CODE AND UNIT.TYPE = 0" +
                "WHERE ((ITEMS.CODE LIKE @CODE) OR (@CODE = '')) AND ((ITEMS.[NAME] LIKE @NAME) OR (@NAME = '')) " ,
        param : ['CODE','NAME'],
        type : ['string|25','string|250']
    },
    BarkodGetir:
    {
        query : "SELECT ITEMS.CODE AS CODE, " +
                "ISNULL((SELECT TOP 1 PRICE FROM ITEM_PRICE WHERE [TYPE] = 0 AND QUANTITY = 1 AND ITEM_CODE = ITEMS.CODE),'') AS PRICE, " +
                "ITEMS.[NAME] AS [NAME], " +
                "SNAME AS SNAME, " +
                "ITEMS.VAT AS VAT, " +
                "ISNULL(BARCODE.BARCODE,'') AS BARCODE, " + 
                "ISNULL(UNIT.FACTOR,1) AS FACTOR, " +
                "ISNULL(CONVERT(NVARCHAR(50),UNIT.[GUID]),'') AS UNIT " +
                "FROM ITEMS AS ITEMS " +
                "LEFT OUTER JOIN ITEM_UNIT AS UNIT ON " +
                "UNIT.ITEM_CODE = ITEMS.CODE " +
                "LEFT OUTER JOIN ITEM_BARCODE AS BARCODE ON " +
                "BARCODE.ITEM_CODE = ITEMS.CODE AND BARCODE.UNIT = UNIT.[GUID] " + 
                "WHERE BARCODE.BARCODE = @BARCODE" ,
        param : ['BARCODE'],
        type : ['string|50']
    },
    PosSatisInsert : 
    {
        query : "INSERT INTO [dbo].[POS_SALES] ( " +
                "[CUSER] " +
                ",[CDATE] " +
                ",[LUSER] " + 
                ",[LDATE] " +
                ",[DEPARTMENT] " +
                ",[TYPE] " +
                ",[DOC_DATE] " +
                ",[REF] " +
                ",[REF_NO] " +
                ",[LINE_NO] " +
                ",[CUSTOMER_CODE] " +
                ",[ITEM_CODE] " +
                ",[BARCODE] " +
                ",[QUANTITY] " +
                ",[UNIT] " +
                ",[PRICE] " +
                ",[DISCOUNT] " +
                ",[VAT] " +
                ",[STATUS] " +
                ") VALUES ( " +
                "@CUSER                                 --<CUSER, nvarchar(25),> \n" +  
                ",GETDATE()                             --<CDATE, datetime,> \n" +
                ",@LUSER                                --<LUSER, nvarchar(25),> \n" +    
                ",GETDATE()                             --<LDATE, datetime,> \n" +
                ",@DEPARTMENT                           --<DEPARTMENT, int,> \n" +
                ",@TYPE                                 --<TYPE, tinyint,> \n" +
                ",@DOC_DATE                             --<DOC_DATE, datetime,> \n" +
                ",@REF                                  --<REF, nvarchar(25),> \n" +
                ",@REF_NO                               --<REF_NO, int,> \n" +
                ",(SELECT ISNULL(MAX(LINE_NO),-1) + 1 AS LINE_NO FROM POS_SALES WHERE REF = @REF AND REF_NO = @REF_NO AND TYPE = @TYPE) --<LINE_NO, int,> \n" +
                ",@CUSTOMER_CODE                        --<CUSTOMER_CODE, nvarchar(25),> \n" +
                ",@ITEM_CODE                            --<ITEM_CODE, nvarchar(25),> \n" +
                ",@BARCODE                              --<BARCODE, nvarchar(50),> \n" +
                ",@QUANTITY                             --<QUANTITY, float,> \n" +
                ",@UNIT                                 --<UNIT, nvarchar(50),> \n" +
                ",@PRICE                                --<PRICE, float,> \n" +
                ",@DISCOUNT                             --<DISCOUNT, float,> \n" +
                ",@VAT                                  --<VAT, float,> \n" +
                ",@STATUS                               --<STATUS, int,> \n" +
                ") ",
        param : ['CUSER:string','LUSER:string','DEPARTMENT:int','TYPE:int','DOC_DATE:date','REF:string|25','REF_NO:int','CUSTOMER_CODE:string|25','ITEM_CODE:string|25',
                 'BARCODE:string|50','QUANTITY:float','UNIT:string','PRICE:float','DISCOUNT:float','VAT:float',"STATUS:int"]
    },
    PosSatisGetir : 
    {
        query:  "SELECT " +
                "ROW_NUMBER() OVER (ORDER BY ITEM_CODE) AS NO, " +
                "GUID AS GUID, " +
                "CUSER AS CUSER, " +
                "REF AS REF, " +
                "REF_NO AS REF_NO, " +
                "LINE_NO AS LINE_NO, " +
                "CUSTOMER_CODE AS CUSTOMER_CODE, " +
                "ITEM_CODE AS ITEM_CODE, " +
                "ISNULL((SELECT TOP 1 [NAME] FROM ITEMS WHERE CODE = ITEM_CODE),'') AS ITEM_NAME, " +
                "BARCODE AS BARCODE, " +
                "QUANTITY AS QUANTITY, " +
                "UNIT AS UNIT_ID, " +
                "(SELECT UNIT.[NAME] FROM ITEM_UNIT AS UNIT WHERE CONVERT(NVARCHAR(50),UNIT.GUID) = POS.UNIT) AS UNIT, " +
                "PRICE AS PRICE, " +
                "DISCOUNT AS DISCOUNT, " +
                "VAT AS VAT, " +
                "CASE WHEN VAT = 20 THEN 'B' WHEN VAT = 5.5 THEN 'C' END AS VAT_TYPE, " + 
                "ROUND(QUANTITY * PRICE,4) AS AMOUNT " +
                "FROM POS_SALES AS POS WHERE DEPARTMENT = @DEPARTMENT AND TYPE = @TYPE AND REF = @REF AND REF_NO = @REF_NO ORDER BY LINE_NO DESC" ,
        param:   ['DEPARTMENT','TYPE','REF','REF_NO'],
        type:    ['int','int','string|25','int']
    },
    PosFisSatisGetir :
    {
        query: "SELECT " +
                "MAX(GUID) AS GUID, " +
                "REF AS REF, " +
                "REF_NO AS REF_NO, " +
                "MIN(LINE_NO) AS LINE_NO, " +
                "MAX(CUSTOMER_CODE) AS CUSTOMER_CODE, " +
                "ITEM_CODE AS ITEM_CODE, " +
                "ISNULL((SELECT TOP 1 [NAME] FROM ITEMS WHERE CODE = ITEM_CODE),'') AS ITEM_NAME, " +
                "BARCODE AS BARCODE, " +
                "SUM(QUANTITY) AS QUANTITY, " +
                "UNIT AS UNIT_ID, " +
                "(SELECT UNIT.[NAME] FROM ITEM_UNIT AS UNIT WHERE CONVERT(NVARCHAR(50),UNIT.GUID) = POS.UNIT) AS UNIT, " +
                "ROUND(PRICE,4) AS PRICE, " +
                "SUM(DISCOUNT) * ((VAT / 100) + 1) AS DISCOUNT, " +
                "VAT AS VAT, " +
                "MAX(CONVERT(NVARCHAR, CDATE, 104)) AS CDATE, " +
                "MAX(CONVERT(NVARCHAR, CDATE, 108)) AS CHOUR, " +
                "ROUND(SUM(QUANTITY * PRICE),4) AS AMOUNT " +
                "FROM POS_SALES AS POS WHERE DEPARTMENT = @DEPARTMENT AND TYPE = @TYPE AND REF = @REF AND REF_NO = @REF_NO GROUP BY REF,REF_NO,ITEM_CODE,BARCODE,UNIT,PRICE,VAT ",
        param:   ['DEPARTMENT','TYPE','REF','REF_NO'],
        type:    ['int','int','string|25','int']
    },
    PosSatisBelgeIptal : 
    {
        query: "DELETE FROM POS_SALES WHERE REF = @REF AND REF_NO = @REF_NO AND TYPE = @TYPE",
        param: ['REF','REF_NO','TYPE'],
        type:  ['string|25','int','int']
    },
    PosSatisSatirIptal : 
    {
        query: "DELETE FROM POS_SALES WHERE GUID = @GUID",
        param: ['GUID'],
        type:  ['string|50']
    },
    PosTahInsert : 
    {
        query : "INSERT INTO [dbo].[POS_PAYMENT] " +
                "([CUSER] " +
                ",[CDATE] " +
                ",[LUSER] " + 
                ",[LDATE] " +
                ",[DEPARTMENT] " +
                ",[TYPE] " +
                ",[DOC_TYPE] " +
                ",[DOC_DATE] " +
                ",[REF] " +
                ",[REF_NO] " +
                ",[LINE_NO] " +
                ",[CUSTOMER_CODE] " +
                ",[CASE_CODE] " +
                ",[AMOUNT] " +
                ",[CHANGE] " +
                ",[STATUS] " +
                ") VALUES ( " +
                "@CUSER                                 --<CUSER, nvarchar(25),> \n" +  
                ",GETDATE()                             --<CDATE, datetime,> \n" +
                ",@LUSER                                --<LUSER, nvarchar(25),> \n" +    
                ",GETDATE()                             --<LDATE, datetime,> \n" +
                ",@DEPARTMENT	                        --<DEPARTMENT, int,> \n" +
                ",@TYPE			                        --<TYPE, tinyint,> \n" +
                ",@DOC_TYPE		                        --<DOC_TYPE, tinyint,> \n" +
                ",@DOC_DATE			                    --<DOC_DATE, datetime,> \n" +
                ",@REF			                        --<REF, nvarchar(25),> \n" +
                ",@REF_NO			                    --<REF_NO, int,> \n" +
                ",(SELECT ISNULL(MAX(LINE_NO),-1) + 1 AS LINE_NO FROM POS_PAYMENT WHERE REF = @REF AND REF_NO = @REF_NO AND DOC_TYPE = @DOC_TYPE)		--<LINE_NO, int,> \n" +
                ",@CUSTOMER_CODE	                    --<CUSTOMER_CODE, nvarchar(25),> \n" +
                ",@CASE_CODE			                --<CASE_CODE, nvarchar(25),> \n" +
                ",@AMOUNT			                    --<AMOUNT, float,> \n" +
                ",@CHANGE			                    --<CHANGE, float,> \n" +
                ",@STATUS		                        --<STATUS, int,> \n" +
                ")",
        param : ['CUSER:string','LUSER:string','DEPARTMENT:int','TYPE:int','DOC_TYPE:int','DOC_DATE:date','REF:string|25','REF_NO:int','CUSTOMER_CODE:string|25',
                 'CASE_CODE:string|25','AMOUNT:float','CHANGE:float','STATUS:int']
    },
    PosTahIptal : 
    {
        query: "DELETE FROM POS_PAYMENT WHERE REF = @REF AND REF_NO = @REF_NO AND TYPE = @TYPE",
        param: ['REF','REF_NO','TYPE'],
        type:  ['string|25','int','int']
    },
    PosTahSatirIptal : 
    {
        query: "DELETE FROM POS_PAYMENT WHERE GUID = @GUID",
        param: ['GUID'],
        type:  ['string|50']
    },
    PosTahGetir : 
    {
        query:  "SELECT " +
                "GUID AS GUID, " +
                "REF AS REF, " +
                "REF_NO AS REF_NO, " +
                "CASE WHEN TYPE = 0 THEN " +
                "'Espece' " +
                "WHEN TYPE = 1 THEN " +
                "'CB' " +
                "WHEN TYPE = 2 THEN " + 
                "'T.Rest' " +
                "WHEN TYPE = 3 THEN " + 
                "'CHEQUE' " +
                "WHEN TYPE = 4 THEN " + 
                "'BONE AVOIR' " +
                "WHEN TYPE = 5 THEN " + 
                "'AVOIR' " +
                "WHEN TYPE = 6 THEN " + 
                "'VIRMENT' " +
                "WHEN TYPE = 7 THEN " + 
                "'PRLV' " +
                "END AS TYPE_NAME, " +
                "TYPE AS TYPE," +
                "DOC_TYPE AS DOC_TYPE," +
                "LINE_NO AS LINE_NO, " +
                "CUSTOMER_CODE AS CUSTOMER_CODE, " +
                "AMOUNT AS AMOUNT, " +
                "CHANGE AS CHANGE " +
                "FROM POS_PAYMENT WHERE DEPARTMENT = @DEPARTMENT AND DOC_TYPE = @DOC_TYPE AND REF = @REF AND REF_NO = @REF_NO" ,
        param:   ['DEPARTMENT','DOC_TYPE','REF','REF_NO'],
        type:    ['int','int','string|25','int']
    },
    PosSatisIskonto :
    {
        query : "UPDATE [dbo].[POS_SALES] SET [DISCOUNT] = @DISCOUNT WHERE GUID = @GUID",
        param : ['DISCOUNT','GUID'],
        type : ['float','string|50']
    },
    PosSatisKapatUpdate : 
    {
        query: "UPDATE [dbo].[POS_SALES] SET [STATUS] = 1 WHERE DEPARTMENT = @DEPARTMENT AND REF = @REF AND REF_NO = @REF_NO AND TYPE = @TYPE",
        param: ['DEPARTMENT','REF','REF_NO','TYPE'],
        type:  ['int','string|25','int','int']
    },
    PosSonSatisGetir : 
    {
        query:  "SELECT " +
                "TOP 100 MAX(GUID) AS GUID, " +
                "(SELECT MAX(CASE WHEN TYPE = 0 THEN 'NAKİT' WHEN TYPE = 1 THEN 'KREDİKARTI' WHEN TYPE = 2 THEN 'AÇIKHESAP' END) AS TYPE FROM POS_SALES AS PT WHERE PT.REF = PS.REF AND PT.REF_NO = PS.REF_NO) AS TYPE, " +
                "REF AS REF, " +
                "REF_NO AS REF_NO, " +
                "COUNT(LINE_NO) AS LINE_NO, " +
                "MAX(CUSER) AS [USER], " +
                "CAST(MAX(QUANTITY) AS DECIMAL(10,2)) AS QUANTITY, " +
                "CAST(MAX(PRICE) AS DECIMAL(10,2))  AS PRICE, " +
                "CAST((MAX(QUANTITY) * MAX(PRICE)) AS DECIMAL(10,2)) AS AMOUNT, " +
                "CONVERT(VARCHAR(10), MAX(CDATE), 108) AS CHOUR, " +
                "CONVERT(VARCHAR(10), MAX(CDATE), 104) AS CDATE " +
                "FROM POS_SALES AS PS WHERE DEPARTMENT = @DEPARTMENT AND STATUS <> 0 " +
                "GROUP BY REF,REF_NO ORDER BY LINE_NO DESC " ,
        param: ['DEPARTMENT'],
        type: ['int']
    },
    PosSonSatisDetayGetir : 
    {
        query:  "SELECT " +
                "(SELECT MAX(CASE WHEN TYPE = 0 THEN 'NAKİT' WHEN TYPE = 1 THEN 'KREDİKARTI' WHEN TYPE = 2 THEN 'AÇIKHESAP' END) AS TYPE FROM POS_SALES AS PT WHERE PT.REF = PS.REF AND PT.REF_NO = PS.REF_NO) AS TYPE, " +
                "REF AS REF, " +
                "REF AS REF_NO, " +
                "ITEM_CODE AS CODE, " + 
                "BARCODE AS BARCODE, " +   
                "ISNULL((SELECT [NAME] FROM ITEMS WHERE CODE = ITEM_CODE),'') AS [NAME], " +
                "CAST(QUANTITY AS decimal(10,2)) AS QUANTITY, " +
                "CAST(PRICE AS decimal(10,2))  AS PRICE, " +
                "CAST((QUANTITY * PRICE) AS decimal(10,2)) AS AMOUNT " +
                "FROM POS_SALES AS PS WHERE DEPARTMENT = @DEPARTMENT AND REF = @REF AND REF_NO = @REF_NO AND STATUS <> 0 " ,
        param: ['DEPARTMENT','REF','REF_NO'],
        type: ['int','string|25','int']
    },
    PosSatisFiyatGetir : 
    {
        query: "SELECT TOP 1 PRICE FROM ITEM_PRICE WHERE ITEM_CODE = @ITEM_CODE AND TYPE = 0 AND QUANTITY BETWEEN 1 AND @QUANTITY ORDER BY QUANTITY DESC",
        param: ['ITEM_CODE','QUANTITY'],
        type:  ['string|50','float']
    },
    PosSatisMiktarUpdate : 
    {
        query:  "UPDATE [dbo].[POS_SALES] SET [QUANTITY] = @QUANTITY WHERE GUID = @GUID",
        param: ['QUANTITY','GUID'],
        type:  ['float','string|50']
    },
    PosSatisFiyatUpdate : 
    {
        query: "UPDATE [dbo].[POS_SALES] SET [PRICE] = @PRICE WHERE GUID = @GUID",
        param: ['PRICE','GUID'],
        type:  ['float','string|50']
    },    
    TicketInsert :
    {
        query : "INSERT INTO [dbo].[TICKET] (  " +
            "[GUID] " +
            ",[CUSER] " +
            ",[CDATE] " +
            ",[LUSER] " +
            ",[LDATE] " +
            ",[CODE]) " +
        "VALUES " + 
            "(NEWID()                --<GUID, uniqueidentifier,> \n" + 
            ",@CUSER                 --<CUSER, nvarchar(25),> \n" + 
            ",GETDATE()              --<CDATE, datetime,> \n" + 
            ",@LUSER                 --<LUSER, nvarchar(25),> \n" + 
            ",GETDATE()              --<LDATE, datetime,> \n" + 
            ",@CODE                  --<CODE, nvarchar(50),> \n" + 
            " ) ",
        param : ['CUSER:string','LUSER:string','CODE:string']
    },
    TicketControl :
    {
        query : "SELECT * FROM TICKET WHERE CODE = @CODE ",
        param :['CODE:string']
    }
};


