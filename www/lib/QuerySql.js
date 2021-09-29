var QuerySql = 
{
    StokKartGetir : 
    {
        query : "SELECT " + 
                "[CDATE] AS [CDATE], " + 
                "[LDATE] AS [LDATE], " + 
                "[CUSER] AS [CUSER], " + 
                "[LUSER] AS [LUSER], " + 
                "[CODE] AS [CODE], " +
                "[NAME] AS [NAME], " + 
                "[SNAME] AS [SNAME], " + 
                "[ITEM_GRP] + '/' + (SELECT TOP 1 NAME FROM ITEM_GROUP WHERE CODE = [ITEM_GRP]) AS [ITEM_GRP], " + 
                "CONVERT(nvarchar(5),[TYPE]) AS [TYPE], " + 
                "CONVERT(nvarchar(5),[VAT]) AS [VAT], " + 
                "[COST_PRICE] AS [COST_PRICE], " +
                //"ISNULL((SELECT TOP 1 [PRICE] FROM ITEM_PRICE WHERE [ITEM_CODE] = [CODE] AND [TYPE] = 1 ORDER BY LDATE DESC),ISNULL([COST_PRICE],0)) AS [COST_PRICE], " + 
                "ISNULL((SELECT TOP 1 [PRICE] FROM (SELECT TOP 1 [LDATE],[PRICE] FROM ITEM_PRICE WHERE [ITEM_CODE] = [CODE] AND [TYPE] = 1 ORDER BY LDATE DESC) TMP ORDER BY LDATE ASC),0) AS [LAST_PRICE], " +
                "[MIN_PRICE] AS [MIN_PRICE], " + 
                "[MAX_PRICE] AS [MAX_PRICE], " + 
                "[STATUS] AS [STATUS], " + 
                "[SPECIAL1] AS [SPECIAL1], " + 
                "[ORGINS] AS [ORGINS], " + 
                "[WEIGHING] AS [WEIGHING], " + 
                "[SALE_JOIN_LINE] AS [SALE_JOIN_LINE], " + 
                "[TICKET_REST] AS [TICKET_REST], " + 
                "[TAX_SUGAR] AS [TAX_SUGAR], " + 
                "CASE WHEN TAX_SUGAR >= 4 AND TAX_SUGAR < 5 THEN " +
                "ROUND(ISNULL((SELECT TOP 1 FACTOR / 100 FROM ITEM_UNIT WHERE ITEM_CODE = CODE AND TYPE = 1),0) * 4.66,2) " +
                "WHEN TAX_SUGAR >= 5 AND TAX_SUGAR < 6 THEN " +
                "ROUND(ISNULL((SELECT TOP 1 FACTOR / 100 FROM ITEM_UNIT WHERE ITEM_CODE = CODE AND TYPE = 1),0) * 5.70,2) " +
                "WHEN TAX_SUGAR >= 6 AND TAX_SUGAR < 7 THEN " +
                "ROUND(ISNULL((SELECT TOP 1 FACTOR / 100 FROM ITEM_UNIT WHERE ITEM_CODE = CODE AND TYPE = 1),0) * 6.74,2) " +
                "WHEN TAX_SUGAR >= 7 AND TAX_SUGAR < 8 THEN " +
                "ROUND(ISNULL((SELECT TOP 1 FACTOR / 100 FROM ITEM_UNIT WHERE ITEM_CODE = CODE AND TYPE = 1),0) * 7.77,2) " +
                "WHEN TAX_SUGAR >= 8 AND TAX_SUGAR < 9 THEN " +
                "ROUND(ISNULL((SELECT TOP 1 FACTOR / 100 FROM ITEM_UNIT WHERE ITEM_CODE = CODE AND TYPE = 1),0) * 9.84,2) " +
                "WHEN TAX_SUGAR >= 9 AND TAX_SUGAR < 10 THEN " +
                "ROUND(ISNULL((SELECT TOP 1 FACTOR / 100 FROM ITEM_UNIT WHERE ITEM_CODE = CODE AND TYPE = 1),0) * 11.92,2) " +
                "WHEN TAX_SUGAR >= 10 AND TAX_SUGAR < 11 THEN " +
                "ROUND(ISNULL((SELECT TOP 1 FACTOR / 100 FROM ITEM_UNIT WHERE ITEM_CODE = CODE AND TYPE = 1),0) * 13.98,2) " +
                "WHEN TAX_SUGAR >= 11 AND TAX_SUGAR < 12 THEN " +
                "ROUND(ISNULL((SELECT TOP 1 FACTOR / 100 FROM ITEM_UNIT WHERE ITEM_CODE = CODE AND TYPE = 1),0) * 16.05,2) " +
                "WHEN TAX_SUGAR >= 12 AND TAX_SUGAR < 13 THEN " +
                "ROUND(ISNULL((SELECT TOP 1 FACTOR / 100 FROM ITEM_UNIT WHERE ITEM_CODE = CODE AND TYPE = 1),0) * 18.12,2) " +
                "WHEN TAX_SUGAR >= 13 AND TAX_SUGAR < 20 THEN " +
                "ROUND(ISNULL((SELECT TOP 1 FACTOR / 100 FROM ITEM_UNIT WHERE ITEM_CODE = CODE AND TYPE = 1),0) * 20.20,2) " +
                "ELSE " +
                "0 " +
                "END AS [SUGAR_VAT], " +
                "ISNULL((SELECT TOP 1 [BARCODE] FROM ITEM_BARCODE WHERE ITEM_CODE = [CODE] ORDER BY LDATE ASC),'') AS [BARCODE], " + 
                "ISNULL((SELECT TOP 1 [CUSTOMER_CODE] FROM ITEM_CUSTOMER WHERE ITEM_CODE = [CODE] ORDER BY LDATE DESC),'') AS [ITEM_CUSTOMER], " +
                "ISNULL((SELECT TOP 1 [CUSTOMER_ITEM_CODE] FROM ITEM_CUSTOMER WHERE ITEM_CODE = [CODE] ORDER BY LDATE DESC),'') AS [CUSTOMER_ITEM_CODE], " +
                "ISNULL((SELECT TOP 1 [NAME] FROM ITEM_UNIT WHERE ITEM_CODE = @CODE AND [TYPE] = 1 ORDER BY LDATE DESC),'') AS [UNDER_UNIT_NAME], " +
                "ISNULL((SELECT TOP 1 [FACTOR] FROM ITEM_UNIT WHERE ITEM_CODE = @CODE AND [TYPE] = 1 ORDER BY LDATE DESC),0) AS [UNDER_UNIT_FACTOR], " +
                "ISNULL((SELECT TOP 1 [NAME] FROM ITEM_UNIT WHERE ITEM_CODE = @CODE AND [TYPE] = 0 ORDER BY LDATE DESC),'') AS [MAIN_UNIT_NAME], " +
                "ISNULL((SELECT TOP 1 [FACTOR] FROM ITEM_UNIT WHERE ITEM_CODE = @CODE AND [TYPE] = 0 ORDER BY LDATE DESC),0) AS [MAIN_UNIT_FACTOR], " +
                "ISNULL((SELECT TOP 1 IMAGE FROM ITEM_IMAGE WHERE ITEM_CODE = @CODE),'') AS IMAGE " +
                "FROM ITEMS WHERE CODE = @CODE",
        param : ['CODE'],
        type : ['string|25'] 
    },    
    StokKartKaydet : 
    {
        query : "DECLARE @TMPCODE NVARCHAR(25) " +
                "SET @TMPCODE = ISNULL((SELECT TOP 1 CODE FROM ITEMS WHERE CODE = @CODE),'') " +
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
                ",[WEIGHING] " +
                ",[SPECIAL1] " +
                ",[ORGINS] " +
                ",[SALE_JOIN_LINE] " +
                ",[TICKET_REST] " +
                ",[TAX_SUGAR] " +
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
                "@WEIGHING,			    --<WEIGHING, bit,> \n" +
                "@SPECIAL1,			    --<SPECIAL1, nvarchar(50),> \n" +
                "@ORGINS,			    --<ORGINS, nvarchar(25),> \n" +
                "@SALE_JOIN_LINE,	    --<SALE_JOIN_LINE, bit,> \n" +
                "@TICKET_REST,	        --<TICKET_REST, bit,> \n" +
                "@TAX_SUGAR	            --<TAX_SUGAR, float,> \n" +
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
                ",[WEIGHING] = @WEIGHING " +
                ",[SPECIAL1] = @SPECIAL1 " +
                ",[ORGINS] = @ORGINS " +
                ",[SALE_JOIN_LINE] = @SALE_JOIN_LINE " +
                ",[TICKET_REST] = @TICKET_REST " +
                ",[TAX_SUGAR] = @TAX_SUGAR " +
                "WHERE [CODE] = @TMPCODE",
        param : ['CUSER:string|25','LUSER:string|25','CODE:string|25','NAME:string|250','SNAME:string|32','ITEM_GRP:string|25','TYPE:int','VAT:float',
                 'COST_PRICE:float','MIN_PRICE:float','MAX_PRICE:float','STATUS:bit','WEIGHING:bit','SPECIAL1:string|50','ORGINS:string|25','SALE_JOIN_LINE:bit',
                 'TICKET_REST:bit','TAX_SUGAR:float']
    },
    StokKartSil :
    {
        query : "DELETE FROM ITEMS WHERE CODE = @CODE " + 
                "DELETE FROM ITEM_PRICE WHERE ITEM_CODE = @CODE " + 
                "DELETE FROM ITEM_BARCODE WHERE ITEM_CODE = @CODE " +
                "DELETE FROM ITEM_UNIT WHERE ITEM_CODE = @CODE " + 
                "DELETE FROM ITEM_CUSTOMER WHERE ITEM_CODE = @CODE " ,
        param : ['CODE:string|25']
    },
    StokKartFiyatListeGetir : 
    {
        query : "SELECT *, " + 
                "CASE WHEN EXVAT = 0 OR COST_PRICE = 0 THEN 0 ELSE " + 
                "ROUND((((EXVAT - COST_PRICE) / 1.12) / EXVAT) * 100,0) END AS NETMARJORAN, " + 
                "CASE WHEN EXVAT = 0 OR COST_PRICE = 0 THEN '0€ / %0' ELSE " + 
                "CONVERT(nvarchar,ROUND((EXVAT - COST_PRICE) / 1.12,2)) + '€ / %' + CONVERT(nvarchar,ROUND((((EXVAT - COST_PRICE) / 1.12) / EXVAT) * 100,0)) END AS NETMARJ, " + 
                "CASE WHEN EXVAT = 0 OR COST_PRICE = 0 THEN 0 ELSE " + 
                "ROUND(((EXVAT - COST_PRICE) / EXVAT) * 100,0) END AS BRUTMARJORAN, " + 
                "CASE WHEN EXVAT = 0 OR COST_PRICE = 0 THEN '0€ / %0' ELSE " + 
                "CONVERT(nvarchar,ROUND(EXVAT - COST_PRICE,2)) + '€ / %' + CONVERT(nvarchar,ROUND(((EXVAT - COST_PRICE) / EXVAT) * 100,0)) END AS BRUTMARJ " +  
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
                ",[START_DATE] AS [START_DATE] " + 
                ",[FINISH_DATE] AS [FINISH_DATE] " + 
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
                ",ISNULL((SELECT TOP 1 [NAME] FROM ITEM_UNIT WHERE ITEM_UNIT.ITEM_CODE = ITEM_BARCODE.ITEM_CODE AND ITEM_UNIT.GUID = ITEM_BARCODE.UNIT),'') AS [UNIT] " +
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
                "ISNULL((SELECT TOP 1 NAME FROM USERS WHERE CODE = [LUSER]),'') AS [USER], " +
                "ISNULL((SELECT TOP 1 CONVERT(nvarchar,[LDATE],104) + ' ' + CONVERT(nvarchar,[LDATE],8)  FROM [ITEM_PRICE] WHERE [ITEM_CODE] = @ITEM_CODE AND [CUSTOMER] = [CUSTOMER_CODE] AND [TYPE] = 1 ORDER BY LDATE DESC),0) AS PRICE_LDATE, " +
                "ISNULL((SELECT TOP 1 [PRICE] FROM [ITEM_PRICE] WHERE [ITEM_CODE] = @ITEM_CODE AND [CUSTOMER] = [CUSTOMER_CODE] AND [TYPE] = 1 ORDER BY LDATE DESC),0) AS PRICE " +
                "FROM ITEM_CUSTOMER WHERE ITEM_CODE = @ITEM_CODE ORDER BY LDATE DESC",
        param : ['ITEM_CODE:string|25']
    },
    StokKartTedarikciFiyatListeGetir : 
    {
        query : "SELECT TOP 20 " +
                "[GUID] AS [GUID], " + 
                "[CUSTOMER] AS [CUSTOMER_CODE], " +
                "ISNULL((SELECT TOP 1 [NAME] FROM CUSTOMERS WHERE [CODE] = [CUSTOMER]),'') AS [CUSTOMER_NAME], " +
                "ISNULL((SELECT TOP 1 [CUSTOMER_ITEM_CODE] FROM ITEM_CUSTOMER WHERE ITEM_CUSTOMER.ITEM_CODE = LOG_PRICE.ITEM_CODE),'') AS [CUSTOMER_ITEM_CODE], " +
                "CONVERT(nvarchar,[CDATE],104) + ' ' + CONVERT(nvarchar,[CDATE],8) AS PRICE_LDATE, " +
                "[PRICE] " +
                "FROM LOG_PRICE " +
                "WHERE [ITEM_CODE] = @ITEM_CODE " +
                "ORDER BY [CDATE] DESC",
        param : ['ITEM_CODE:string|25']
    },
    FiyatKaydet : 
    {
        query : "DECLARE @TMPCODE NVARCHAR(25) " +
                "SET @TMPCODE = ISNULL((SELECT TOP 1 [ITEM_CODE] FROM ITEM_PRICE WHERE [TYPE] = CASE WHEN @TYPE = 0 THEN 0 ELSE 9999 END AND [ITEM_CODE] = @ITEM_CODE AND [START_DATE] = @START_DATE AND [FINISH_DATE] = @FINISH_DATE AND [DEPOT] = @DEPOT AND [QUANTITY] = @QUANTITY),'') " +
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
                "@TYPE,				    --<TYPE, int,> \n" +
                "@DEPOT,				--<DEPOT, nvarchar(25),> \n" +
                "@START_DATE,			--<START_DATE, datetime,> \n" +
                "@FINISH_DATE,		    --<FINISH_DATE, datetime,> \n" +
                "@PRICE,				--<PRICE, float,> \n" +
                "@QUANTITY,				--<QUANTITY, float,> \n" +
                "@CUSTOMER			    --<CUSTOMER, nvarchar(25),> \n" +
                ") " +
                "END " + 
                "SELECT @TMPCODE AS ITEM_CODE",
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
        query : "DECLARE @TMPCODE NVARCHAR(25) " +
                "SET @TMPCODE = ISNULL((SELECT TOP 1 [ITEM_CODE] FROM ITEM_PRICE WHERE [TYPE] = @TYPE AND [ITEM_CODE] = @ITEM_CODE AND [DEPOT] = @DEPOT AND [QUANTITY] = @QUANTITY),'') " +
                "IF @TMPCODE <> '' " +
                "BEGIN " +
                "UPDATE ITEM_PRICE SET PRICE = @PRICE,QUANTITY = @QUANTITY,START_DATE = @START_DATE,FINISH_DATE = @FINISH_DATE,LDATE = GETDATE() WHERE GUID = CONVERT(NVARCHAR(50),@GUID)" +
                "END " + 
                "SELECT @TMPCODE AS ITEM_CODE",
        param : ['ITEM_CODE:string|25','TYPE:int','DEPOT:string|25','PRICE:float','QUANTITY:float','START_DATE:date','FINISH_DATE:date','GUID:string|50']
    },
    FiyatKontrol :
    {
        query : "SELECT * FROM ITEM_PRICE WHERE ITEM_CODE = @ITEM_CODE AND TYPE = @TYPE AND DEPOT = @DEPOT AND QUANTITY = @QUANTITY",
        param : ['PRICE:float','QUANTITY:float','START_DATE:date','FINISH_DATE:date','GUID:string|50']
    },
    BirimKaydet : 
    {
        query : "DECLARE @TMPCODE NVARCHAR(25) " +
                // "IF @TYPE = 1 " + 
                // "SET @TMPCODE = ISNULL((SELECT TOP 1 [ITEM_CODE] FROM ITEM_UNIT WHERE [NAME] = @NAME AND [ITEM_CODE] = @ITEM_CODE),'') " +
                // "ELSE " +
                "SET @TMPCODE = ISNULL((SELECT TOP 1 [ITEM_CODE] FROM ITEM_UNIT WHERE [TYPE] = @TYPE AND [ITEM_CODE] = @ITEM_CODE),'') " +
                "IF @TMPCODE = '' " +
                "BEGIN " +
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
                "SELECT [GUID] FROM ITEM_UNIT WHERE ITEM_CODE = @ITEM_CODE AND [TYPE] = @TYPE " +
                "END " +
                "ELSE " +
                "BEGIN " +
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
                "WHERE [ITEM_CODE] = @TMPCODE AND [TYPE] = @TYPE " +
                "SELECT [GUID] FROM ITEM_UNIT WHERE ITEM_CODE = @TMPCODE AND [TYPE] = @TYPE " +
                "END " ,
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
        query : "DECLARE @TMPCODE NVARCHAR(25) " +
                "SET @TMPCODE = ISNULL((SELECT BARCODE FROM ITEM_BARCODE WHERE ITEM_CODE = @ITEM_CODE AND BARCODE = @BARCODE),'') " +
                "IF @BARCODE <> '' " +
                "BEGIN " +
                "IF @TMPCODE = '' " +
                "BEGIN " +
                "INSERT INTO [dbo].[ITEM_BARCODE] " +
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
                ") " +
                "END " +
                "ELSE " +
                "BEGIN " +
                "UPDATE [dbo].[ITEM_BARCODE] SET " +
                "[LUSER] = @LUSER " +
                ",[LDATE] = GETDATE() " +
                ",[ITEM_CODE] = @ITEM_CODE " +
                ",[UNIT] = @UNIT " +
                ",[TYPE] = @TYPE " +
                "WHERE [BARCODE] = @TMPCODE " +
                "END " +
                "END ",
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
    CmbDepoGetir : 
    {
        query : "SELECT CODE AS KODU,NAME AS ADI FROM DEPOT WHERE ((CODE = @CODE) OR (@CODE = 'TÜMÜ')) ",
        param : ['CODE:string|25']
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
        param : ['CUSER:string|25','LUSER:string|25','CODE:string|25','TYPE:int','GENUS:int','NAME:string|100','LAST_NAME:string|100',
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
    StokImageInsert :
    {
        query : "DECLARE @TMPCODE NVARCHAR(25) " +
                "SET @TMPCODE = ISNULL((SELECT ITEM_CODE FROM ITEM_IMAGE WHERE ITEM_CODE = @ITEM_CODE),'') " +
                "IF @TMPCODE = ''  " +
                "INSERT INTO [dbo].[ITEM_IMAGE] ( " +
                " [CUSER] " +
                ",[CDATE] " +
                ",[LUSER] " +
                ",[LDATE] " +
                ",[ITEM_CODE] " +
                ",[IMAGE] " +
                ") VALUES ( " +
                " @CUSER			--<CUSER, nvarchar(25),> \n" +
                ",GETDATE()		--<CDATE, datetime,> \n" +
                ",@LUSER	    --<LUSER, nvarchar(25),> \n" +
                ",GETDATE()		--<LDATE, datetime,> \n" +
                ",@ITEM_CODE	--<ITEM_CODE, nvarchar(25),> \n" +
                ",@IMAGE		--<IMAGE, nvarchar(MAX),> \n" +
                ") " +
                "ELSE " +
                "UPDATE [ITEM_IMAGE] SET [LUSER] = @LUSER ,[LDATE] = GETDATE(),[IMAGE] = @IMAGE WHERE [ITEM_CODE] = @TMPCODE",
        param : ['CUSER:string|25','LUSER:string|25','ITEM_CODE:string|25','IMAGE:string|max']
    },
    StokImageDelete :
    {
        query : "DELETE FROM [dbo].[ITEM_IMAGE] WHERE ITEM_CODE = @ITEM_CODE",
        param : ['ITEM_CODE:string|25']
    },
    LabelQueueInsert :
    {
        query : "DECLARE @TMPCODE NVARCHAR(25) " +
                "SET @TMPCODE = ISNULL((SELECT TOP 1 DATA FROM LABEL_QUEUE WHERE REF = @REF AND REF_NO = @REF_NO AND STATUS = 0),'') " +
                "IF @TMPCODE = '' " +
                "INSERT INTO [dbo].[LABEL_QUEUE] ( " +
                " [CUSER] " +
                ",[CDATE] " +
                ",[LUSER] " +
                ",[LDATE] " +
                ",[REF] " +
                ",[REF_NO] " +
                ",[DATA] " +
                ",[PRINT_COUNT] " +
                ",[STATUS] " +
                ") VALUES ( " +
                " @CUSER		--<CUSER, nvarchar(25),> \n" +
                ",GETDATE()		--<CDATE, datetime,> \n" +
                ",@LUSER		--<LUSER, nvarchar(25),> \n" +
                ",GETDATE()		--<LDATE, datetime,> \n" +
                ",@REF  	    --<REF, nvarchar(25),> \n" +
                ",@REF_NO	    --<REF_NO, int,> \n" +
                ",@DATA			--<DATA, nvarchar(max),> \n" +
                ",@PRINT_COUNT	--<PRINT_COUNT, int,> \n" +
                ",@STATUS		--<STATUS, int,> \n" +
                ") \n" +
                "ELSE " + 
                "UPDATE [dbo].[LABEL_QUEUE] SET [DATA] = @DATA WHERE [REF] = @REF AND [REF_NO] = @REF_NO AND [STATUS] = 0",
        param : ['CUSER:string|25','LUSER:string|25','REF:string|25','REF_NO:int','DATA:string|max','PRINT_COUNT:int','STATUS:int']
    },
    LabelQueueUpdate :
    {
        query : "UPDATE [dbo].[LABEL_QUEUE] SET [DATA] = @DATA" +
                " [CUSER] " +
                ",[CDATE] " +
                ",[LUSER] " +
                ",[LDATE] " +
                ",[DATA] " +
                ",[DESIGN] " +
                ",[PRINT_COUNT] " +
                ",[STATUS] " +
                ") VALUES ( " +
                " @CUSER		--<CUSER, nvarchar(25),> \n" +
                ",GETDATE()		--<CDATE, datetime,> \n" +
                ",@LUSER		--<LUSER, nvarchar(25),> \n" +
                ",GETDATE()		--<LDATE, datetime,> \n" +
                ",@DATA			--<DATA, nvarchar(max),> \n" +
                ",@DESIGN		--<DESIGN, nvarchar(50),> \n" +
                ",@PRINT_COUNT	--<PRINT_COUNT, int,> \n" +
                ",@STATUS		--<STATUS, int,> \n" +
                ")",
        param : ['CUSER:string|25','LUSER:string|25','DATA:string|max','DESIGN:string|50','PRINT_COUNT:int','STATUS:int']
    },
    CalintiKartKaydet : 
    {
        query : "INSERT INTO [dbo].STOLEN_TICKET ([Code], [Referance], [Random1], [Price], [Type], [Random2], [Year]) VALUES (@Code, @Referance, @Random1, @Price, @Type, @Random2, @Year)",
        param : ['Code:string|45', 'Referance:string|45','Random1:string|45','Price:string|45','Type:string|45','Random2:string|45','Year:string|45']
    },
    CalintiKartKGetir :
    {
        query : "SELECT * FROM STOLEN_TICKET;" ,
        param : []
    },
    CalintiKartSorgula : 
    {
        query : "SELECT * FROM [dbo].STOLEN_TICKET WHERE Referance=@Referance",
        param : ['Referance'],
        type : ['string|45'] 
    }, 
    MenseiGetir : 
    {
        query : "SELECT * FROM [dbo].[COUNTRY] WHERE LANG = @LANG AND ((CODE = @CODE) OR (@CODE = '')) ORDER BY CODE ASC",
        param : ['LANG','CODE'],
        type : ['string|10','string|10'] 
    },    
    //POS
    PosCariGetir:
    {
        query : "SELECT " +
                "CUSTOMERS.[CODE] AS [CODE], " +
                "CONVERT(NVARCHAR,CUSTOMERS.[TYPE]) AS [TYPE], " +
                "CONVERT(NVARCHAR,CUSTOMERS.[GENUS]) AS [GENUS], " +
                "CUSTOMERS.[LAST_NAME] + ' ' + CUSTOMERS.[NAME] AS [NAME], " +
                "CUSTOMERS.[LAST_NAME] AS [LAST_NAME], " +
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
                "ISNULL(CUSTOMER_ADRESS.[COUNTRY],'') AS [COUNTRY], " +
                "dbo.FN_CUSTOMER_TOTAL_POINT(CUSTOMERS.[CODE],GETDATE()) AS [POINT] " +
                "FROM CUSTOMERS " + 
                "LEFT OUTER JOIN CUSTOMER_ADRESS ON " + 
                "CUSTOMER_ADRESS.CUSTOMER = CUSTOMERS.[CODE]  AND CUSTOMER_ADRESS.[TYPE] = 0 " +
                "WHERE ((CODE LIKE @CODE + '%') OR (@CODE = '')) AND (([NAME] = @NAME) OR (@NAME = ''))",
        param : ['CODE','NAME'],
        type : ['string|25','string|25'] 
    },
    PosCariListeGetir:
    {
        query : "SELECT " +
                "CUSTOMERS.[CODE] AS [CODE], " +
                "CONVERT(NVARCHAR,CUSTOMERS.[TYPE]) AS [TYPE], " +
                "CONVERT(NVARCHAR,CUSTOMERS.[GENUS]) AS [GENUS], " +
                "CUSTOMERS.[LAST_NAME] + ' ' + CUSTOMERS.[NAME] AS [NAME], " +
                "CUSTOMERS.[LAST_NAME] AS [LAST_NAME], " +
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
                "ISNULL(CUSTOMER_ADRESS.[COUNTRY],'') AS [COUNTRY], " +
                "dbo.FN_CUSTOMER_TOTAL_POINT(CUSTOMERS.[CODE],GETDATE()) AS [POINT] " +
                "FROM CUSTOMERS " + 
                "LEFT OUTER JOIN CUSTOMER_ADRESS ON " + 
                "CUSTOMER_ADRESS.CUSTOMER = CUSTOMERS.[CODE]  AND CUSTOMER_ADRESS.[TYPE] = 0 " +
                "WHERE ((UPPER([CODE]) LIKE UPPER(@ARA) + '%') OR (UPPER([NAME]) LIKE UPPER(@ARA) + '%') OR (@ARA = '')) ORDER BY [CODE] ASC",
        param : ['ARA'],
        type : ['string|25'] 
    },
    PosPluGetir:
    {
        query : "SELECT * FROM POS_PLU WHERE CUSER = @CUSER AND ((LOCATION = @LOCATION) OR (@LOCATION = -1)) AND ((GRUP_INDEX = @GRUP_INDEX) OR (@GRUP_INDEX = -1)) AND " +
                "TYPE IN(SELECT CONVERT(INT,VALUE) FROM STRING_SPLIT(@TYPE,',')) ORDER BY LOCATION ",
        param : ['CUSER','LOCATION','GRUP_INDEX','TYPE'],
        type : ['string|10','int','int','string|10']
    },
    PosPluStokGrupGetir:
    {
        query : "SELECT " +
                "ITEM_GRP AS ITEM_GRP, " +
                "NAME AS NAME, " +
                "ISNULL((SELECT TOP 1 BARCODE FROM ITEM_BARCODE WHERE ITEM_CODE = CODE),CODE) AS BARCODE, " +
                "ISNULL((SELECT TOP 1 IMAGE FROM ITEM_IMAGE WHERE ITEM_CODE = CODE),'') AS IMAGE, " +
                "ORGINS AS ORGINS, " +
                "dbo.FN_PRICE_SALE(CODE,1,GETDATE()) AS PRICE " +
                "FROM ITEMS WHERE ((ITEM_GRP = @ITEM_GRP) OR (@ITEM_GRP = '')) AND ((NAME LIKE @NAME + '%') OR (@NAME = '')) AND STATUS = 1 " +
                "ORDER BY NAME ASC",
        param : ['ITEM_GRP','NAME'],
        type : ['string|25','string|25']
    },
    PosPluInsert : 
    {
        query : "INSERT INTO [POS_PLU] " +
                "([CUSER] " +
                ",[LUSER] " +
                ",[CDATE] " +
                ",[LDATE] " +
                ",[NAME] " +
                ",[LOCATION] " +
                ",[TYPE] " +
                ",[ITEMS_CODE] " +
                ",[GRUP_INDEX] " +
                ") " +
                "VALUES " +
                "(@CUSER						--<CUSER, nvarchar(10),> \n" +  
                ",@LUSER						--<LUSER, nvarchar(10),> \n" +  
                ",@CDATE							--<CDATE, datetime,> \n" +  
                ",@LDATE							--<LDATE, datetime,> \n" +  
                ",@NAME							    --<NAME, nvarchar(50),> \n" +  
                ",@LOCATION							--<LOCATION, int,> \n" +  
                ",@TYPE                             --<TYPE, int,> \n" +
                ",@ITEMS_CODE                             --<ITEMS_CODE, int,> \n" +
                ",@GRUP_INDEX)                            --<ITEMS_CODE, int,> " ,
        param : ['CUSER','LUSER','CDATE','LDATE','NAME','LOCATION','TYPE','ITEMS_CODE','GRUP_INDEX'],
        type : ['string|10','string|10','date','date','string|50','int','int','string|25','int'] 
    },
    PosPluUpdate : 
    {
        query : "UPDATE POS_PLU SET NAME = @NAME,ITEMS_CODE = @ITEMS_CODE WHERE TYPE = @TYPE AND LOCATION = @LOCATION AND GRUP_INDEX = @GRUP_INDEX ",
        param : ['NAME','ITEMS_CODE','TYPE','LOCATION','GRUP_INDEX'],
        type : ['string|25','string|25','int','int','int']
    },
    PosSatisParkListe:
    {
        query:"SELECT MAX([LUSER]) AS [LUSER], [REF] AS [REF],[REF_NO] AS [REF_NO], ROUND(SUM([PRICE] * [QUANTITY]),2) AS [AMOUNT],MAX(CONVERT(nvarchar(20),LDATE, 120)) AS [DATE], " +
              "ISNULL((SELECT TOP 1 DESCRIPTION FROM POS_MASTER_EXTRA AS DES WHERE DES.REF = POS_SALES.REF AND DES.REF_NO = POS_SALES.REF_NO AND TABLE_NAME = 'POS_SALE' AND TAG = 'PARK DESC' ORDER BY LDATE DESC),'') AS DESCRIPTION " +
              "FROM POS_SALES WHERE (([DEPARTMENT] = @DEPARTMENT) OR (@DEPARTMENT = -1)) AND [TYPE] = @TYPE AND (([LUSER] = @LUSER) OR (@LUSER = '')) AND STATUS = @STATUS GROUP BY REF,REF_NO",
        param: ['DEPARTMENT','TYPE','LUSER','STATUS'],
        type:  ['int','int','string|25','int']  
    },
    MaxPosSatisSira : 
    {
        query: "SELECT ISNULL(MAX(REF_NO),0) + 1 AS MAXREFNO FROM POS_SALES " +
                "WHERE DEPARTMENT = @DEPARTMENT AND REF = @REF " ,
        param : ['DEPARTMENT','REF'],
        type : ['int','string|25']
    },
    StokGetirEvrak : 
    {
        query:  "SELECT ITEMS.CODE AS CODE, " +
                "ISNULL(CUSTOMER_ITEM_CODE,'') AS CUSTOMER_ITEM_CODE, " +
                "SPECIAL1 AS SPECIAL1, " +
                "dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) AS PRICE, " +
                "ITEMS.[NAME] AS [NAME], " +
                "ITEMS.SNAME AS SNAME, " +
                "ITEMS.VAT AS VAT, " +
                "'' AS BARCODE, " +
                "ISNULL(UNIT.FACTOR,1) AS FACTOR, " + 
                "ISNULL(CONVERT(NVARCHAR(50),UNIT.[GUID]),'') AS UNIT, " +
                "[MIN_PRICE] AS [MIN_PRICE], " +
                "[SALE_JOIN_LINE] AS [SALE_JOIN_LINE], " +
                "[TICKET_REST] AS [TICKET_REST], " +
                "[COST_PRICE] AS [COST_PRICE], " +
                "[WEIGHING] AS [WEIGHING] " +
                "FROM ITEMS AS ITEMS " +
                "LEFT OUTER JOIN ITEM_UNIT AS UNIT ON " +
                "UNIT.ITEM_CODE = ITEMS.CODE AND UNIT.TYPE = 0" +
                "LEFT OUTER JOIN ITEM_CUSTOMER ON " +
                "ITEM_CUSTOMER.ITEM_CODE = ITEMS.CODE " +
                "WHERE ((UPPER(ITEMS.CODE) LIKE UPPER(@CODE)) OR (UPPER(CUSTOMER_ITEM_CODE) LIKE UPPER(@CODE)) OR (UPPER(@CODE) = '')) AND ((UPPER(ITEMS.[NAME]) LIKE UPPER(@NAME)) OR (UPPER(@NAME) = '')) AND ITEMS.STATUS = 1 ORDER BY NAME ASC" ,
        param : ['CODE','NAME'],
        type : ['string|25','string|250']
    },
    StokGetir : 
    {
        query:  "SELECT ITEMS.CODE AS CODE, " +
                "SPECIAL1 AS SPECIAL1, " +
                "dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) AS PRICE, " +
                "ITEMS.[NAME] AS [NAME], " +
                "ITEMS.SNAME AS SNAME, " +
                "ITEMS.VAT AS VAT, " +
                "'' AS BARCODE, " +
                "ISNULL(UNIT.FACTOR,1) AS FACTOR, " + 
                "ISNULL(CONVERT(NVARCHAR(50),UNIT.[GUID]),'') AS UNIT, " +
                "[MIN_PRICE] AS [MIN_PRICE], " +
                "[SALE_JOIN_LINE] AS [SALE_JOIN_LINE], " +
                "[TICKET_REST] AS [TICKET_REST], " +
                "[COST_PRICE] AS [COST_PRICE], " +
                "[WEIGHING] AS [WEIGHING] " +
                "FROM ITEMS AS ITEMS " +
                "LEFT OUTER JOIN ITEM_UNIT AS UNIT ON " +
                "UNIT.ITEM_CODE = ITEMS.CODE AND UNIT.TYPE = 0" +
                "WHERE ((UPPER(ITEMS.CODE) LIKE UPPER(@CODE)) OR (UPPER(@CODE) = '')) AND ((UPPER(ITEMS.[NAME]) LIKE UPPER(@NAME)) OR (UPPER(@NAME) = '')) AND ITEMS.STATUS = 1 ORDER BY NAME ASC" ,
        param : ['CODE','NAME'],
        type : ['string|25','string|250']
    },
    StokGetirT : 
    {
        query:  "SELECT " +
                "ITEMS.CODE AS CODE, " +
                "ITEM_CUSTOMER.CUSTOMER_ITEM_CODE AS CUSTOMER_ITEM_CODE, " +
                "SPECIAL1 AS SPECIAL1, " +
                "dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) AS PRICE, " +
                "ITEMS.[NAME] AS [NAME], " +
                "SNAME AS SNAME, " +
                "ITEMS.VAT AS VAT, " +
                "ISNULL(BARCODE.BARCODE,'') AS BARCODE, " +
                "ISNULL(UNIT.FACTOR,1) AS FACTOR, " +
                "ISNULL(CONVERT(NVARCHAR(50),UNIT.[GUID]),'') AS UNIT, " +
                "[MIN_PRICE] AS [MIN_PRICE], " +
                "[SALE_JOIN_LINE] AS [SALE_JOIN_LINE], " +
                "[TICKET_REST] AS [TICKET_REST], " +
                "[COST_PRICE] AS [COST_PRICE], " +
                "[WEIGHING] AS [WEIGHING] " +
                "FROM ITEMS AS ITEMS " +
                "LEFT OUTER JOIN ITEM_UNIT AS UNIT ON " +
                "UNIT.ITEM_CODE = ITEMS.CODE " +
                "LEFT OUTER JOIN ITEM_BARCODE AS BARCODE ON " +
                "BARCODE.ITEM_CODE = ITEMS.CODE AND BARCODE.UNIT = UNIT.[GUID] " +
                "LEFT OUTER JOIN ITEM_CUSTOMER AS ITEM_CUSTOMER ON " +
                "ITEM_CUSTOMER.ITEM_CODE = ITEMS.CODE " +
                "WHERE ((UPPER(ITEMS.CODE) LIKE UPPER(@CODE)) OR (BARCODE.BARCODE = @CODE) OR " +
                "(ITEM_CUSTOMER.CUSTOMER_ITEM_CODE = @CODE) OR (UPPER(@CODE) = '')) AND " +
                "((UPPER(ITEMS.[NAME]) LIKE UPPER(@NAME)) OR (UPPER(@NAME) = '')) AND ITEMS.STATUS = 1 " ,
        param : ['CODE','NAME'],
        type : ['string|25','string|250']
    },
    BarkodGetir:
    {
        query : "SELECT ITEMS.CODE AS CODE, " +
                "SPECIAL1 AS SPECIAL1, " +
                "dbo.FN_PRICE_SALE(ITEMS.CODE,1,GETDATE()) AS PRICE, " +
                "ITEMS.[NAME] AS [NAME], " +
                "SNAME AS SNAME, " +
                "ITEMS.VAT AS VAT, " +
                "ISNULL(BARCODE.BARCODE,'') AS BARCODE, " + 
                "ISNULL(UNIT.FACTOR,1) AS FACTOR, " +
                "ISNULL(CONVERT(NVARCHAR(50),UNIT.[GUID]),'') AS UNIT, " +
                "[MIN_PRICE] AS [MIN_PRICE], " +
                "[SALE_JOIN_LINE] AS [SALE_JOIN_LINE], " +
                "[TICKET_REST] AS [TICKET_REST], " +
                "[COST_PRICE] AS [COST_PRICE], " +
                "[WEIGHING] AS [WEIGHING] " +
                "FROM ITEMS AS ITEMS " +
                "LEFT OUTER JOIN ITEM_UNIT AS UNIT ON " +
                "UNIT.ITEM_CODE = ITEMS.CODE " +
                "LEFT OUTER JOIN ITEM_BARCODE AS BARCODE ON " +
                "BARCODE.ITEM_CODE = ITEMS.CODE AND BARCODE.UNIT = UNIT.[GUID] " + 
                "WHERE BARCODE.BARCODE = @BARCODE AND ITEMS.STATUS = 1 " ,
        param : ['BARCODE'],
        type : ['string|50']
    },
    StokGrupGetir : 
    {
        query:  "SELECT CODE AS CODE,NAME AS NAME FROM ITEM_GROUP WHERE ((UPPER(NAME) LIKE UPPER(@NAME) + '%') OR (UPPER(@NAME) = '')) ORDER BY CODE ASC " ,
        param : ['NAME'],
        type : ['string|25']
    },
    PosSatisInsert : 
    {
        query : "INSERT INTO [dbo].[POS_SALES] ( " +
                "[CUSER] " +
                ",[CDATE] " +
                ",[LUSER] " + 
                ",[LDATE] " +
                ",[DEVICE] " +
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
                ",[LOYALTY] " +
                ",[VAT] " +
                ",[STATUS] " +
                ",[SUBTOTAL] " +
                ") VALUES ( " +
                "@CUSER                                 --<CUSER, nvarchar(25),> \n" +  
                ",GETDATE()                             --<CDATE, datetime,> \n" +
                ",@LUSER                                --<LUSER, nvarchar(25),> \n" +    
                ",GETDATE()                             --<LDATE, datetime,> \n" +
                ",@DEVICE                               --<DEVICE, nvarchar(20),> \n" +
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
                ",@LOYALTY                             --<LOYALTY, float,> \n" +
                ",@VAT                                  --<VAT, float,> \n" +
                ",@STATUS                               --<STATUS, int,> \n" +
                ",@SUBTOTAL                             --<SUBTOTAL, int,> \n" +            
                ") ",
        param : ['CUSER:string','LUSER:string','DEVICE:string|25','DEPARTMENT:int','TYPE:int','DOC_DATE:date','REF:string|25','REF_NO:int','CUSTOMER_CODE:string|25','ITEM_CODE:string|25',
                 'BARCODE:string|50','QUANTITY:float','UNIT:string','PRICE:float','DISCOUNT:float','LOYALTY:float','VAT:float',"STATUS:int","SUBTOTAL:int"]
    },
    PosSatisGetir : 
    {
        query:  "SELECT " +
                "ROW_NUMBER() OVER (ORDER BY LDATE ASC) AS NO, " +
                "GUID AS GUID, " +
                "CUSER AS CUSER, " +
                "DEVICE AS DEVICE, " +
                "REF AS REF, " +
                "REF_NO AS REF_NO, " +
                "LINE_NO AS LINE_NO, " +
                "CUSTOMER_CODE AS CUSTOMER_CODE, " +
                "ISNULL((SELECT LAST_NAME + ' ' + NAME FROM CUSTOMERS WHERE CODE = CUSTOMER_CODE),'') AS CUSTOMER_NAME, " +
                "dbo.FN_CUSTOMER_TOTAL_POINT(CUSTOMER_CODE,GETDATE()) AS CUSTOMER_POINT, " +
                "ITEM_CODE AS ITEM_CODE, " +
                "ISNULL((SELECT TOP 1 [NAME] FROM ITEMS WHERE CODE = ITEM_CODE),'') AS ITEM_NAME, " +
                "ISNULL((SELECT TOP 1 [SNAME] FROM ITEMS WHERE CODE = ITEM_CODE),'') AS SNAME, " +
                "ISNULL((SELECT TOP 1 [TICKET_REST] FROM ITEMS WHERE CODE = ITEM_CODE),'') AS TICKET_REST, " +
                "BARCODE AS BARCODE, " +
                "QUANTITY AS QUANTITY, " +
                "UNIT AS UNIT_ID, " +
                "(SELECT UNIT.[NAME] FROM ITEM_UNIT AS UNIT WHERE UNIT.GUID = POS.UNIT) AS UNIT, " +
                "(SELECT UNIT.[SHORT] FROM UNIT WHERE UNIT.NAME = (SELECT UNIT.[NAME] FROM ITEM_UNIT AS UNIT WHERE UNIT.GUID = POS.UNIT)) AS UNIT_SHORT, " +
                "ISNULL((SELECT TOP 1 [MIN_PRICE] FROM ITEMS WHERE CODE = ITEM_CODE),'') AS MIN_PRICE, " +
                "PRICE AS PRICE, " +
                "DISCOUNT AS DISCOUNT, " +
                "LOYALTY AS LOYALTY, " +
                "VAT AS VAT, " +
                "VAT_TYPE AS VAT_TYPE, " + 
                "HT AS HT, " + 
                "TVA AS TVA, " + 
                "TTC AS TTC, " + 
                "ROUND(AMOUNT,2) AS AMOUNT, " +
                "ROUND(AMOUNT,2) AS CAMOUNT, " +
                "SUBTOTAL AS SUBTOTAL " +
                "FROM POS_SALES_VW_01 AS POS WHERE DEPARTMENT = @DEPARTMENT AND TYPE = @TYPE AND REF = @REF AND REF_NO = @REF_NO AND STATUS >= 0 ORDER BY ROW_NUMBER() OVER (ORDER BY LDATE ASC) DESC" ,
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
                "ROUND(PRICE,2) AS PRICE, " +
                "SUM(DISCOUNT) * ((VAT / 100) + 1) AS DISCOUNT, " +
                "SUM(LOYALTY) * ((VAT / 100) + 1) AS LOYALTY, " +
                "VAT AS VAT, " +
                "MAX(CONVERT(NVARCHAR, CDATE, 104)) AS CDATE, " +
                "MAX(CONVERT(NVARCHAR, CDATE, 108)) AS CHOUR, " +
                "ROUND(SUM(QUANTITY * PRICE),2) AS AMOUNT " +
                "FROM POS_SALES AS POS WHERE DEPARTMENT = @DEPARTMENT AND TYPE = @TYPE AND REF = @REF AND REF_NO = @REF_NO AND STATUS >= 0 GROUP BY REF,REF_NO,ITEM_CODE,BARCODE,UNIT,PRICE,VAT ",
        param:   ['DEPARTMENT','TYPE','REF','REF_NO'],
        type:    ['int','int','string|25','int']
    },
    PosSatisBelgeIptal : 
    {
        query: "UPDATE POS_SALES SET STATUS = -2 WHERE REF = @REF AND REF_NO = @REF_NO AND TYPE = @TYPE " + 
               "UPDATE POS_PAYMENT SET STATUS = -2 WHERE REF = @REF AND REF_NO = @REF_NO AND DOC_TYPE = @TYPE " +
               "DELETE FROM TICKET WHERE REF = @REF AND REF_NO = @REF_NO ",
        param: ['REF','REF_NO','TYPE'],
        type:  ['string|25','int','int']
    },
    PosSatisSatirIptal : 
    {
        query: "UPDATE POS_SALES SET STATUS = -1 WHERE GUID = @GUID",
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
                ",[DEVICE] " +
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
                ",@DEVICE   	                        --<DEVICE, nvarchar(20),> \n" +
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
        param : ['CUSER:string','LUSER:string','DEVICE:string|25','DEPARTMENT:int','TYPE:int','DOC_TYPE:int','DOC_DATE:date','REF:string|25','REF_NO:int','CUSTOMER_CODE:string|25',
                 'CASE_CODE:string|25','AMOUNT:float','CHANGE:float','STATUS:int']
    },
    PosTahIptal : 
    {
        query:  "IF @TYPE = 3 OR @TYPE = 4" +
                "BEGIN " + 
                "DELETE FROM TICKET WHERE REF = @REF AND REF_NO = @REF_NO " +
                "END " +
                "UPDATE POS_PAYMENT SET STATUS = -2 WHERE REF = @REF AND REF_NO = @REF_NO AND TYPE = @TYPE",
        param: ['REF','REF_NO','TYPE'],
        type:  ['string|25','int','int']
    },
    PosTahSatirIptal : 
    {
        query:  "IF (SELECT TOP 1 POS_PAYMENT.TYPE FROM POS_PAYMENT WHERE POS_PAYMENT.GUID = @GUID) = 3 OR (SELECT TOP 1 POS_PAYMENT.TYPE FROM POS_PAYMENT WHERE POS_PAYMENT.GUID = @GUID) = 4" +
                "BEGIN " + 
                "DELETE FROM TICKET WHERE REF = (SELECT TOP 1 POS_PAYMENT.REF FROM POS_PAYMENT WHERE POS_PAYMENT.GUID = @GUID) AND REF_NO = (SELECT TOP 1 POS_PAYMENT.REF_NO FROM POS_PAYMENT WHERE POS_PAYMENT.GUID = @GUID) " +
                "END " +
                "UPDATE POS_PAYMENT SET STATUS = -1 WHERE GUID = @GUID",
        param: ['GUID'],
        type:  ['string|50']
    },
    PosMasterExtraInsert :
    {
        query:  "INSERT INTO [dbo].[POS_MASTER_EXTRA] ( " +
                " [CUSER] " +
                ",[CDATE] " +
                ",[LUSER] " +
                ",[LDATE] " +
                ",[TABLE_NAME] " +
                ",[TAG] " +
                ",[TYPE] " +
                ",[REF] " +
                ",[REF_NO] " +
                ",[LINE_NO] " +
                ",[DESCRIPTION] " +
                ") VALUES ( " +
                " @CUSER		--<CUSER, nvarchar(25),> \n" + 
                ",GETDATE()		--<CDATE, datetime,> \n" + 
                ",@LUSER		--<LUSER, nvarchar(25),> \n" + 
                ",GETDATE()		--<LDATE, datetime,> \n" + 
                ",@TABLE_NAME	--<TABLE_NAME, nvarchar(25),> \n" + 
                ",@TAG	        --<TAG, nvarchar(25),> \n" + 
                ",@TYPE			--<TYPE, tinyint,> \n" + 
                ",@REF			--<REF, nvarchar(25),> \n" + 
                ",@REF_NO		--<REF_NO, int,> \n" + 
                ",@LINE_NO		--<LINE_NO, int,> \n" + 
                ",@DESCRIPTION	--<DESCRIPTION, nvarchar(max),> \n" + 
                ")",
        param : ['CUSER:string|25','LUSER:string|25','TABLE_NAME:string|25','TAG:string|25','TYPE:int','REF:string|25','REF_NO:int','LINE_NO:int','DESCRIPTION:string|max']
    },
    PosMasterExtraDelete :
    {
        query : "DELETE FROM POS_MASTER_EXTRA WHERE TABLE_NAME = @TABLE_NAME AND TYPE = @TYPE AND REF = @REF AND REF_NO = @REF_NO",
        param : ['TABLE_NAME:string|25','TYPE:int','REF:string|25','REF_NO:int']
    },
    PosTahGetir : 
    {
        query:  "SELECT " +
                "GUID AS GUID, " +
                "DEVICE AS DEVICE, " +
                "REF AS REF, " +
                "REF_NO AS REF_NO, " +
                "CASE WHEN TYPE = 0 THEN " +
                "'ESC' " +
                "WHEN TYPE = 1 THEN " +
                "'CB' " +
                "WHEN TYPE = 2 THEN " + 
                "'CHQ' " +
                "WHEN TYPE = 3 THEN " + 
                "'T.R' " +
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
                "FROM POS_PAYMENT WHERE DEPARTMENT = @DEPARTMENT AND DOC_TYPE = @DOC_TYPE AND REF = @REF AND REF_NO = @REF_NO AND STATUS >= 0" ,
        param:   ['DEPARTMENT','DOC_TYPE','REF','REF_NO'],
        type:    ['int','int','string|25','int']
    },
    PosSatisIskonto :
    {
        query : "UPDATE [dbo].[POS_SALES] SET [DISCOUNT] = @DISCOUNT WHERE GUID = @GUID",
        param : ['DISCOUNT','GUID'],
        type : ['float','string|50']
    },
    PosSatisSadakat :
    {
        query : "UPDATE [dbo].[POS_SALES] SET [LOYALTY] = @LOYALTY WHERE REF = @REF AND REF_NO = @REF_NO AND STATUS >= 0",
        param : ['LOYALTY','REF','REF_NO'],
        type : ['float','string|50','int']
    },
    PosSatisKapatUpdate : 
    {
        query: "UPDATE [dbo].[POS_SALES] SET [STATUS] = 1,DOC_DATE = @DOC_DATE WHERE DEPARTMENT = @DEPARTMENT AND REF = @REF AND REF_NO = @REF_NO AND TYPE = @TYPE AND STATUS >= 0",
        param: ['DOC_DATE','DEPARTMENT','REF','REF_NO','TYPE'],
        type:  ['date','int','string|25','int','int']
    },
    PosSonSatisGetir : 
    {
        query:  "SELECT " +
                "MAX(GUID) AS GUID, " +
                "REF AS REF, " +
                "REF_NO AS REF_NO, " +
                "MAX(TYPE) AS TYPE, " +
                "COUNT(LINE_NO) AS LINE_NO, " +
                "MAX(CUSTOMER_CODE) AS CUSTOMER_CODE, " +
                "MAX(CUSER) AS [USER], " +
                "ROUND(SUM(AMOUNT),2) AS AMOUNT, " +
                "ROUND(SUM(DISCOUNT),2) AS DISCOUNT, " +
                "ROUND(SUM(LOYALTY_AMOUNT),2) AS LOYALTY_AMOUNT, " +
                "ROUND(SUM(TTC),2) AS TTC, " +                
                "CONVERT(VARCHAR(10), MAX(CDATE), 108) AS CHOUR, " +
                "CONVERT(VARCHAR(10), MAX(CDATE), 104) AS CDATE " +
                "FROM POS_SALES_VW_01 AS PS WHERE DEPARTMENT = @DEPARTMENT AND REF = @REF AND STATUS = 1 AND DOC_DATE >= @START_DATE AND DOC_DATE <= @END_DATE AND " +
                "((ISNULL((SELECT TOP 1 PAY.TYPE FROM POS_PAYMENT AS PAY WHERE PAY.REF = PS.REF AND PAY.REF_NO = PS.REF_NO AND PAY.DOC_TYPE = PS.TYPE),0) = @TYPE) OR (@TYPE = -1)) " +
                "GROUP BY REF,REF_NO ORDER BY REF_NO DESC " ,
        param: ['DEPARTMENT','REF','START_DATE','END_DATE','TYPE'],
        type: ['int','string|25','date','date','int']
    },
    PosSonSatisDetayGetir : 
    {
        query:  "SELECT " +
                "DEVICE AS DEVICE, " +
                "DEPARTMENT AS DEPARTMENT, " +
                "TYPE AS TYPE, " +
                "REF AS REF, " +
                "REF_NO AS REF_NO, " +
                "DOC_DATE AS DOC_DATE, " +
                "CUSTOMER_CODE AS CUSTOMER_CODE, " +
                "BARCODE AS BARCODE, " +   
                "ISNULL((SELECT [NAME] FROM ITEMS WHERE CODE = ITEM_CODE),'') AS [NAME], " +
                "CAST(QUANTITY AS decimal(10,2)) AS QUANTITY, " +
                "CAST(PRICE AS decimal(10,2))  AS PRICE, " +
                "CAST((QUANTITY * PRICE) AS decimal(10,2)) AS AMOUNT, " +
                "STATUS AS STATUS " +
                "FROM POS_SALES AS PS WHERE DEPARTMENT = @DEPARTMENT AND REF = @REF AND REF_NO = @REF_NO AND ((@STATUS = -1) OR (STATUS = @STATUS)) " ,
        param: ['DEPARTMENT','REF','REF_NO','STATUS'],
        type: ['int','string|25','int','bit']
    },
    PosSonSatisTahDetayGetir : 
    {
        query:  "SELECT " +
                "GUID AS GUID, " +
                "TYPE AS TYPENO, " + 
                "CASE WHEN TYPE = 0 THEN 'ESC' WHEN TYPE = 1 THEN 'CB' WHEN TYPE = 2 THEN 'Chq' WHEN TYPE = 3 THEN 'CHQe' WHEN TYPE = 4 THEN 'BON D AVOIR' END AS TYPE, " +
                "AMOUNT AS AMOUNT, " +
                "CHANGE AS CHANGE, " +
                "STATUS AS STATUS " +
                "FROM POS_PAYMENT AS PS WHERE DEPARTMENT = @DEPARTMENT AND REF = @REF AND REF_NO = @REF_NO AND ((@STATUS = -1) OR (STATUS = @STATUS)) " ,
        param: ['DEPARTMENT','REF','REF_NO','STATUS'],
        type: ['int','string|25','int','bit']
    },
    PosSatisFiyatGetir : 
    {
        query: "SELECT dbo.FN_PRICE_SALE(@ITEM_CODE,@QUANTITY,GETDATE()) AS PRICE",
        param: ['ITEM_CODE','QUANTITY'],
        type:  ['string|50','float']
    },
    PosSatisMiktarUpdate : 
    {
        query:  "UPDATE [dbo].[POS_SALES] SET [QUANTITY] = @QUANTITY,PRICE = CASE WHEN dbo.FN_PRICE_SALE(@ITEM_CODE,@QUANTITY,GETDATE()) = 0 THEN PRICE ELSE dbo.FN_PRICE_SALE(@ITEM_CODE,@QUANTITY,GETDATE()) END, LDATE = CASE WHEN SUBTOTAL > 0 THEN LDATE ELSE GETDATE() END WHERE GUID = @GUID",
        param: ['QUANTITY','ITEM_CODE','GUID'],
        type:  ['float','string|25','string|50']
    },
    PosSatisFiyatUpdate : 
    {
        query:  "UPDATE [dbo].[POS_SALES] SET [PRICE] = @PRICE,LDATE = CASE WHEN SUBTOTAL > 0 THEN LDATE ELSE GETDATE() END WHERE GUID = @GUID",
        param: ['PRICE','GUID'],
        type:  ['float','string|50']
    },
    PosTahTutarUpdate : 
    {
        query:  "UPDATE [dbo].[POS_PAYMENT] SET [AMOUNT] = @AMOUNT,[CHANGE] = @CHANGE,LDATE = GETDATE() WHERE GUID = @GUID",
        param: ['AMOUNT','CHANGE','GUID'],
        type:  ['float','float','string|50']
    },    
    TicketInsert :
    {
        query : "INSERT INTO [dbo].[TICKET] (  " +
            " [GUID] " +
            ",[CUSER] " +
            ",[CDATE] " +
            ",[LUSER] " +
            ",[LDATE] " +
            ",[CODE] " +
            ",[AMOUNT] " +
            ",[REF] " +
            ",[REF_NO] " +
            ",[TYPE] " +
            ") VALUES ( " + 
            " NEWID()                --<GUID, uniqueidentifier,> \n" + 
            ",@CUSER                 --<CUSER, nvarchar(25),> \n" + 
            ",GETDATE()              --<CDATE, datetime,> \n" + 
            ",@LUSER                 --<LUSER, nvarchar(25),> \n" + 
            ",GETDATE()              --<LDATE, datetime,> \n" + 
            ",@CODE                  --<CODE, nvarchar(50),> \n" + 
            ",@AMOUNT                --<AMOUNT, float,> \n" + 
            ",@REF                   --<REF, nvarchar(25),> \n" + 
            ",@REF_NO                --<REF_NO, int,> \n" + 
            ",@TYPE                  --<TYPE, smallint,> \n" + 
            " ) ",
        param : ['CUSER:string|25','LUSER:string|25','CODE:string|50','AMOUNT:float','REF:string|25','REF_NO:int','TYPE:int']
    },
    TicketControl :
    {
        query : "IF (SELECT CODE FROM TICKET_VW_01 WHERE REFERENCE = SUBSTRING(@CODE,1,9) AND TYPE = 4) IS NULL " +
                "SELECT CODE FROM TICKET_VW_01 WHERE CODE = @CODE AND TYPE IN (0,2) " +
                "ELSE " +
                "SELECT '001' AS CODE",
        param :['CODE:string']
    },
    TicketGetir:
    {
        query : "SELECT AMOUNT AS AMOUNT,COUNT(AMOUNT) AS COUNT FROM TICKET WHERE REF = @REF AND REF_NO = @REF_NO GROUP BY AMOUNT",
        param : ["REF:string|25",'REF_NO:int']
    },
    MusteriPuanInsert :
    {
        query : "INSERT INTO [dbo].[CUSTOMER_POINT] ( " +
                " [CUSER] " +
                ",[CDATE] " +
                ",[LUSER] " +
                ",[LDATE] " +
                ",[TYPE] " +
                ",[CUSTOMER] " +
                ",[REF] " +
                ",[REF_NO] " +
                ",[POINT] " +
                ",[DESCRIPTION] " +
                ") VALUES ( " +
                " @CUSER		--<CUSER, nvarchar(25),> \n" +
                ",@CDATE		--<CDATE, datetime,> \n" +
                ",@LUSER		--<LUSER, nvarchar(25),> \n" +
                ",@LDATE		--<LDATE, datetime,> \n" +
                ",@TYPE			--<TYPE, int,> \n" +
                ",@CUSTOMER		--<CUSTOMER, nvarchar(25),> \n" +
                ",@REF			--<REF, nvarchar(25),> \n" +
                ",@REF_NO		--<REF_NO, int,> \n" +
                ",@POINT		--<POINT, float,> \n" +
                ",@DESCRIPTION  --<DESCRIPTION, float,> \n" +
                ")",
        param : ['CUSER:string|25','CDATE:date','LUSER:string|25','LDATE:date','TYPE:int','CUSTOMER:string|25','REF:string|25','REF_NO:int','POINT:float','DESCRIPTION:string|250']
    },
    XRaporGetir :
    {
        query : "SELECT  " +
                "'Nombre de ticket' AS TITLE, " +
                "COUNT(TTC) AS COUNT, " +
                "ISNULL(SUM(TTC),0) AS AMOUNT  " +
                "FROM (SELECT SUM(TTC) AS TTC FROM POS_SALES_VW_01  " +
                "WHERE TYPE = 0 AND STATUS = 1 AND DOC_DATE >= CONVERT(NVARCHAR,GETDATE(),112) AND DOC_DATE <= CONVERT(NVARCHAR,GETDATE(),112) AND DEVICE = @DEVICE GROUP BY REF,REF_NO) AS TMP " +
                "UNION ALL " +
                "SELECT  " +
                "'Remoursements' AS TITLE, " +
                "COUNT(TTC) AS COUNT, " +
                "ISNULL(SUM(TTC) * -1,0) AS AMOUNT  " +
                "FROM (SELECT SUM(TTC) AS TTC FROM POS_SALES_VW_01  " +
                "WHERE TYPE = 1 AND STATUS = 1 AND DOC_DATE >= CONVERT(NVARCHAR,GETDATE(),112) AND DOC_DATE <= CONVERT(NVARCHAR,GETDATE(),112) AND DEVICE = @DEVICE GROUP BY REF,REF_NO) AS TMP " +
                "UNION ALL " +
                "SELECT  " +
                "'Lignes supprimees' AS TITLE,  " +
                "COUNT(TTC) AS COUNT, " +
                "ISNULL(SUM(TTC),0) AS AMOUNT  " +
                "FROM (SELECT SUM(TTC) AS TTC FROM POS_SALES_VW_01  " +
                "WHERE TYPE = 0 AND STATUS = -1 AND DOC_DATE >= CONVERT(NVARCHAR,GETDATE(),112) AND DOC_DATE <= CONVERT(NVARCHAR,GETDATE(),112) AND DEVICE = @DEVICE GROUP BY REF,REF_NO) AS TMP " +
                "UNION ALL " +
                "SELECT  " +
                "'Tickets annules' AS TITLE,  " +
                "COUNT(TTC) AS COUNT, " +
                "ISNULL(SUM(TTC),0) AS AMOUNT  " +
                "FROM (SELECT SUM(TTC) AS TTC FROM POS_SALES_VW_01  " +
                "WHERE TYPE = 0 AND STATUS = -2 AND DOC_DATE >= CONVERT(NVARCHAR,GETDATE(),112) AND DOC_DATE <= CONVERT(NVARCHAR,GETDATE(),112) AND DEVICE = @DEVICE GROUP BY REF,REF_NO) AS TMP " +
                "SELECT  " +
                "VAT AS VAT, " +
                "SUM(HT) AS HT, " +
                "SUM(TVA) AS TVA,  " +
                "SUM(TTC) AS TTC  " +
                "FROM POS_SALES_VW_01  " +
                "WHERE TYPE = 0 AND STATUS = 1 AND DOC_DATE >= CONVERT(NVARCHAR,GETDATE(),112) AND DOC_DATE <= CONVERT(NVARCHAR,GETDATE(),112) AND DEVICE = @DEVICE GROUP BY VAT " +
                "SELECT * FROM  " +
                "(SELECT  " +
                "CASE WHEN DOC_TYPE = 1 AND TYPE = 0 THEN 'Espece - Remboursement' WHEN DOC_TYPE = 1 AND TYPE = 4 THEN 'Bon D''Avoir - Remboursement' ELSE dbo.FN_POS_PAYMENT_TYPE_NAME(TYPE) END AS TYPE, " +
                "COUNT(TYPE) AS COUNT, " +
                "CASE WHEN DOC_TYPE = 1 THEN SUM(AMOUNT) * -1 ELSE SUM(AMOUNT) END AS AMOUNT  " +
                "FROM POS_PAYMENT  " +
                "WHERE DOC_DATE >= CONVERT(NVARCHAR,GETDATE(),112) AND DOC_DATE <= CONVERT(NVARCHAR,GETDATE(),112) AND STATUS = 1 AND DEVICE = @DEVICE " +
                "GROUP BY TYPE,DOC_TYPE) AS TMP " +
                "SELECT FORMAT(GETDATE(),'D','fr-FR') AS DATE, " +
                "(SELECT TOP 1 FORMAT(CDATE,'HH:mm') FROM POS_SALES WHERE STATUS = 1 AND DOC_DATE >= CONVERT(NVARCHAR,GETDATE(),112) AND DOC_DATE <= CONVERT(NVARCHAR,GETDATE(),112) AND DEVICE = @DEVICE ORDER BY CDATE ASC) AS START_TIME, " +
                "(SELECT TOP 1 FORMAT(CDATE,'HH:mm') FROM POS_SALES WHERE STATUS = 1 AND DOC_DATE >= CONVERT(NVARCHAR,GETDATE(),112) AND DOC_DATE <= CONVERT(NVARCHAR,GETDATE(),112) AND DEVICE = @DEVICE ORDER BY CDATE DESC) AS FINISH_TIME, " +
                "@DEVICE AS DEVICE ",
        param : ['DEVICE:string|25']
        
    },
    //SİPARİŞ 
    MaxSiparisNo :
    {
        query : "SELECT ISNULL(MAX(REF_NO),0) + 1 AS MAXSIRA FROM ORDERM WHERE REF = @REF AND DOC_TYPE = @DOC_TYPE",
        param : ['REF:string|25','DOC_TYPE:int']
    },
    SiparisInsert : 
    {
        query:  "DECLARE @TMP DATETIME " +
                "SET @TMP = GETDATE() " +
                "EXEC [dbo].[PRD_ORDER_INSERT] " + 
                "@CUSER = @PCUSER, " + 
                "@CDATE = @TMP, " + 
                "@LUSER = @PLUSER, " + 
                "@LDATE = @TMP, " + 
                "@TYPE = @PTYPE, " + 
                "@DOC_TYPE = @PDOC_TYPE, " + 
                "@REF = @PREF, " + 
                "@REF_NO = @PREF_NO, " + 
                "@DOC_DATE = @PDOC_DATE, " + 
                "@DOC_FROM = @PDOC_FROM, " + 
                "@DOC_TO = @PDOC_TO, " + 
                "@ITEM_CODE = @PITEM_CODE, " + 
                "@QUANTITY = @PQUANTITY, " + 
                "@PRICE = @PPRICE, " + 
                "@DISCOUNT = @PDISCOUNT, " + 
                "@VAT = @PVAT, " + 
                "@STATUS = @PSTATUS",
        param : ['PCUSER:string|25','PLUSER:string|25','PTYPE:int','PDOC_TYPE:int','PREF:string|25','PREF_NO:int','PDOC_DATE:date','PDOC_FROM:string|25',
                 'PDOC_TO:string|25','PITEM_CODE:string|25','PQUANTITY:float','PPRICE:float','PDISCOUNT:float','PVAT:float','PSTATUS:bit']
    },
    SiparisSatirUpdate :
    {
        query:  "DECLARE @TMP DATETIME " +
                "SET @TMP = GETDATE() " +
                "EXEC [dbo].[PRD_ORDER_LINE_UPDATE] " + 
                "@DGUID = @PDGUID, " + 
                "@LUSER = @PLUSER, " + 
                "@LDATE = @TMP, " + 
                "@ITEM_CODE = @PITEM_CODE, " + 
                "@QUANTITY = @PQUANTITY, " + 
                "@PRICE = @PPRICE, " + 
                "@DISCOUNT = @PDISCOUNT, " + 
                "@VAT = @PVAT, " +
                "@DESCRIPTION = @DESCRIPTION ",  
        param : ['PDGUID:string|50','PLUSER:string|25','PITEM_CODE:string|25','PQUANTITY:float','PPRICE:float','PDISCOUNT:float','PVAT:float','DESCRIPTION:string|250']
    },
    SiparisSatirDelete :
    {
        query:  "EXEC [dbo].[PRD_ORDER_DELETE] " + 
                "@DELTYPE = @PDELTYPE, " +
                "@DGUID = @PDGUID " , 
        param : ['PDELTYPE:int','PDGUID:string|50']
    },
    SiparisEvrakDelete :
    {
        query:  "EXEC [dbo].[PRD_ORDER_DELETE] " + 
                "@DELTYPE = @PDELTYPE, " +
                "@DOC_TYPE = @PDOC_TYPE, " +
                "@REF = @PREF, " +
                "@REF_NO = @PREF_NO " , 
        param : ['PDELTYPE:int','PDOC_TYPE:int','PREF:string|25','PREF_NO:int']
    },
    //FATURA 
    MaxFaturaNo :
    {
        query : "SELECT ISNULL(MAX(REF_NO),0) + 1 AS MAXSIRA FROM INVOICEM WHERE REF = @REF AND DOC_TYPE = @DOC_TYPE",
        param : ['REF:string|25','DOC_TYPE:int']
    },
    FaturaInsert : 
    {
        query:  "DECLARE @TMP DATETIME " +
                "SET @TMP = GETDATE() " +
                "EXEC [dbo].[PRD_INVOICE_INSERT] " + 
                "@CUSER = @PCUSER, " + 
                "@CDATE = @TMP, " + 
                "@LUSER = @PLUSER, " + 
                "@LDATE = @TMP, " + 
                "@TYPE = @PTYPE, " + 
                "@DOC_TYPE = @PDOC_TYPE, " + 
                "@REF = @PREF, " + 
                "@REF_NO = @PREF_NO, " + 
                "@DOC_DATE = @PDOC_DATE, " + 
                "@CUSTOMER = @PCUSTOMER, " + 
                "@DEPOT = @PDEPOT, " + 
                "@ITEM_CODE = @PITEM_CODE, " + 
                "@QUANTITY = @PQUANTITY, " + 
                "@PRICE = @PPRICE, " + 
                "@DISCOUNT = @PDISCOUNT, " + 
                "@VAT = @PVAT, " + 
                "@DESCRIPTION = @PDESCRIPTION",
        param : ['PCUSER:string|25','PLUSER:string|25','PTYPE:int','PDOC_TYPE:int','PREF:string|25','PREF_NO:bigint','PDOC_DATE:date','PCUSTOMER:string|25',
                 'PDEPOT:string|25','PITEM_CODE:string|25','PQUANTITY:float','PPRICE:float','PDISCOUNT:float','PVAT:float','PDESCRIPTION:string|500']
    },
    FaturaSatirUpdate :
    {
        query:  "DECLARE @TMP DATETIME " +
                "SET @TMP = GETDATE() " +
                "EXEC [dbo].[PRD_INVOICE_LINE_UPDATE] " + 
                "@DGUID = @PDGUID, " + 
                "@LUSER = @PLUSER, " + 
                "@LDATE = @TMP, " + 
                "@ITEM_CODE = @PITEM_CODE, " + 
                "@QUANTITY = @PQUANTITY, " + 
                "@PRICE = @PPRICE, " + 
                "@DISCOUNT = @PDISCOUNT, " + 
                "@VAT = @PVAT ",
        param : ['PDGUID:string|50','PLUSER:string|25','PITEM_CODE:string|25','PQUANTITY:float','PPRICE:float','PDISCOUNT:float','PVAT:float']
    },
    FaturaSatirDelete :
    {
        query:  "EXEC [dbo].[PRD_INVOICE_DELETE] " + 
                "@DELTYPE = @PDELTYPE, " +
                "@DGUID = @PDGUID " , 
        param : ['PDELTYPE:int','PDGUID:string|50']
    },
    FaturaEvrakDelete :
    {
        query:  "EXEC [dbo].[PRD_INVOICE_DELETE] " + 
                "@DELTYPE = @PDELTYPE, " +
                "@DOC_TYPE = @PDOC_TYPE, " +
                "@REF = @PREF, " +
                "@REF_NO = @PREF_NO " , 
        param : ['PDELTYPE:int','PDOC_TYPE:int','PREF:string|25','PREF_NO:bigint']
    },
    //KULLANICI PARAMETRE
    KullaniciGetir :
    {
        query : "SELECT *,CASE WHEN TAG = 0 THEN 'Kullanıcı' WHEN TAG = 1 THEN 'Yetkili' END AS YETKI,CASE WHEN STATUS = 1 THEN 'Aktif' ELSE 'Pasif' END AS DURUM FROM USERS WHERE ((CODE IN (@CODE)) OR (@CODE = '')) ORDER BY CONVERT(nvarchar(25),CODE) DESC ",
        param : ['CODE:string|25']
    },
    KullaniciInsert : 
    {
        query : "INSERT INTO [dbo].[USERS] " +
                "([CDATE] " +
                ",[LDATE] " +
                ",[CODE] " +
                ",[NAME] " +
                ",[PASSWORD] " +
                ",[TAG] " +
                ",[STATUS]) " +
                "VALUES " +
                "(GETDATE()						--<CDATE, datetime,>  \n" + 
                ",GETDATE()						--<LDATE, datetime,>  \n" + 
                ",@CODE							--<CODE, nvarchar(25),>  \n" + 
                ",@NAME							--<NAME, nvarchar(50),>  \n" + 
                ",@PASSWORD						--<PASSWORD, nvarchar(25),>  \n" + 
                ",@TAG							--<TAG, nvarchar(25),>  \n" + 
                ",@STATUS							--<STATUS, int,>  \n" + 
                ")",
        param : ['CODE:string|25','NAME:string|50','PASSWORD:string|25','TAG:string|25','STATUS:int']
    },
    KullaniciUpdate : 
    {
        query : "UPDATE USERS SET CODE = @CODE,NAME = @NAME, TAG = @TAG,PASSWORD = CASE WHEN @PASSWORD = '' THEN PASSWORD ELSE @PASSWORD END, STATUS = @STATUS,LDATE = GETDATE() WHERE GUID = @GUID " ,
        param : ['CODE:string|25','NAME:string|50','TAG:int','PASSWORD:string|25','STATUS:int','GUID:string|150']
    },
    KullaniciDelete : 
    {
        query : "DELETE FROM [POS_PLU] WHERE CUSER = ISNULL((SELECT TOP 1 CODE FROM USERS WHERE GUID = @GUID),'') " +
                "DELETE FROM USERS WHERE GUID = @GUID " ,
        param : ['GUID:string|150']
    },
    //PARAM
    ParamInsert : 
    {
        query : "INSERT INTO [dbo].[PARAMS] " +
                "([CUSER] " +
                ",[CDATE] " +
                ",[LUSER] " +
                ",[LDATE] " +
                ",[NAME] " +
                ",[VALUE] " +
                ",[TAG] " +
                ",[ID]) " +
                "VALUES " +
                "(@CUSER						--<CUSER, nvarchar(25),> \n " +
                ",GETDATE()					--<CDATE, datetime,> \n " +
                ",@LUSER						--<LUSER, nvarchar(25),> \n " +
                ",GETDATE()					--<LDATE, datetime,> \n " +
                ",@NAME						--<NAME, nvarchar(25),> \n " +
                ",@VALUE						--<VALUE, nvarchar(50),> \n " +
                ",@TAG						--<TAG, nvarchar(25),> \n " +
                ",@ID						--<ID, nvarchar(25),> \n " +
                ")",
        param : ['CUSER:string|25','LUSER:string|25','NAME:string|25','VALUE:string|50','TAG:string|25','ID:string|25']
    },
    ParamGetir : 
    {
        query : "SELECT * FROM PARAMS WHERE ID = @ID AND ((TAG = @TAG) OR (@TAG = ''))" ,
        param : ['ID:string|25','TAG:string|25']
    },
    ParamDelete : 
    {
        query : "DELETE FROM PARAMS WHERE ID = @ID AND ((TAG = @TAG) OR (@TAG = ''))" ,
        param : ['ID:string|150','TAG:string|25']
    },
    ParamUpdate : 
    {
        query : "UPDATE PARAMS SET VALUE = @VALUE,LDATE = GETDATE() WHERE NAME = @NAME AND ID = @ID AND ((TAG = @TAG) OR (@TAG = ''))",
        param : ['VALUE:string|25','NAME:string|25','ID:string|25','TAG:string|25']
    },
    //CİHAZ PARAMETRE
    CihazGetir :
    {
        query : "SELECT *,CASE WHEN DV.STATUS = 1 THEN 'Aktif' ELSE 'Pasif' END AS DURUM, " +
                "(SELECT VALUE FROM PARAMS AS PS WHERE PS.ID = DV.ID AND NAME = 'DepoNo') AS SUBENO " +
                "FROM DEVICE AS DV WHERE ((ID IN (@ID)) OR (@ID = '')) ORDER BY ID ASC " ,
        param : ['ID:string|25']
    },
    CihazInsert : 
    {
        query : "INSERT INTO [dbo].[DEVICE] " +
                "([CDATE]" +
                ",[LDATE] " +
                ",[ID] " +
                ",[NAME] " +
                ",[STATUS]) " +
                "VALUES " +
                "(GETDATE()						--<CDATE, datetime,>  \n" + 
                ",GETDATE()						--<LDATE, datetime,>  \n" + 
                ",@ID							--<ID, nvarchar(25),>  \n" + 
                ",@NAME							--<NAME, nvarchar(50),>  \n" + 
                ",@STATUS							--<STATUS, int,>  \n" + 
                ")",
        param : ['ID:string|25','NAME:string|50','STATUS:int']
    },
    CihazUpdate : 
    {
        query : "UPDATE DEVICE SET ID = @ID,NAME = @NAME, STATUS = @STATUS,LDATE = GETDATE() WHERE GUID = @GUID " ,
        param : ['ID:string|25','NAME:string|50','STATUS:int','GUID:string|150']
    },
    CihazDelete : 
    {
        query : "DELETE FROM DEVICE WHERE GUID = @GUID " ,
        param : ['GUID:string|150']
    },
};


