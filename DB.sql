USE [master]
GO
/****** Object:  Database [PIQPOS]    Script Date: 24.11.2020 13:59:33 ******/
CREATE DATABASE [PIQPOS]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'XPOS', FILENAME = N'C:\Piqpos\data\piqpos.mdf' , SIZE = 180160KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'XPOS_log', FILENAME = N'C:\Piqpos\data\piqpos_log.ldf' , SIZE = 204800KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [PIQPOS] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [PIQPOS].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [PIQPOS] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [PIQPOS] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [PIQPOS] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [PIQPOS] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [PIQPOS] SET ARITHABORT OFF 
GO
ALTER DATABASE [PIQPOS] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [PIQPOS] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [PIQPOS] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [PIQPOS] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [PIQPOS] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [PIQPOS] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [PIQPOS] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [PIQPOS] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [PIQPOS] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [PIQPOS] SET  DISABLE_BROKER 
GO
ALTER DATABASE [PIQPOS] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [PIQPOS] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [PIQPOS] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [PIQPOS] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [PIQPOS] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [PIQPOS] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [PIQPOS] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [PIQPOS] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [PIQPOS] SET  MULTI_USER 
GO
ALTER DATABASE [PIQPOS] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [PIQPOS] SET DB_CHAINING OFF 
GO
ALTER DATABASE [PIQPOS] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [PIQPOS] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [PIQPOS] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [PIQPOS] SET QUERY_STORE = OFF
GO
USE [PIQPOS]
GO
/****** Object:  UserDefinedFunction [dbo].[FN_CUSTOMER_TOTAL_POINT]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[FN_CUSTOMER_TOTAL_POINT] 
(
	-- Add the parameters for the function here
	@CUSTOMER AS NVARCHAR(25),
	@DATE AS DATETIME
)
RETURNS INT
AS
BEGIN
	-- Declare the return variable here
	DECLARE @POINT AS INT

	IF MONTH(@DATE) = 1 
	BEGIN
	SELECT @POINT = ISNULL(SUM(CASE WHEN TYPE = 0 THEN POINT ELSE POINT * -1 END),0) FROM CUSTOMER_POINT WHERE CUSTOMER = @CUSTOMER AND CDATE >= CONVERT(NVARCHAR(4),YEAR(@DATE) - 1) + '0101' AND CDATE <= CONVERT(NVARCHAR(4),YEAR(@DATE)) + '1230'
	END
	ELSE
	BEGIN
	SELECT @POINT = ISNULL(SUM(CASE WHEN TYPE = 0 THEN POINT ELSE POINT * -1 END),0) FROM CUSTOMER_POINT WHERE CUSTOMER = @CUSTOMER AND CDATE >= CONVERT(NVARCHAR(4),YEAR(@DATE)) + '0101' AND CDATE <= CONVERT(NVARCHAR(4),YEAR(@DATE)) + '1230'
	END


	-- Return the result of the function
	RETURN @POINT

END
GO
/****** Object:  UserDefinedFunction [dbo].[FN_POS_PAYMENT_TYPE_NAME]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[FN_POS_PAYMENT_TYPE_NAME]
(
	-- Add the parameters for the function here
	@TYPE AS INT
)
RETURNS NVARCHAR(25)
AS
BEGIN
	-- Declare the return variable here
	DECLARE @TYPENAME AS NVARCHAR(25)

	-- Add the T-SQL statements to compute the return value here
	IF @TYPE = 0 
	SET @TYPENAME = 'Espece' 
	ELSE IF @TYPE = 1
	SET @TYPENAME = 'Carte Bancaire TPE' 
	ELSE IF @TYPE = 2
	SET @TYPENAME = 'Cheque' 
	ELSE IF @TYPE = 3
	SET @TYPENAME = 'CHEQue' 
	ELSE IF @TYPE = 4
	SET @TYPENAME = 'Bon D''Avoir' 
	ELSE
	SET @TYPENAME = ''
	-- Return the result of the function
	RETURN @TYPENAME

END
GO
/****** Object:  UserDefinedFunction [dbo].[FN_PRICE_SALE]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[FN_PRICE_SALE] 
(
	@ITEM_CODE AS NVARCHAR(25),
	@QUANTITY AS FLOAT,
	@DATE AS DATETIME
)
RETURNS FLOAT
AS
BEGIN
	-- Declare the return variable here
	DECLARE @PRICE AS FLOAT
	SET @PRICE = 0

	SELECT TOP 1 @PRICE =  PRICE FROM ITEM_PRICE WHERE ITEM_CODE = @ITEM_CODE AND TYPE = 0 AND QUANTITY BETWEEN 1 AND @QUANTITY AND START_DATE <= CONVERT(NVARCHAR(10),@DATE,112) AND FINISH_DATE >= CONVERT(NVARCHAR(10),@DATE,112) ORDER BY QUANTITY DESC

	IF @PRICE = 0
	BEGIN
	SELECT TOP 1 @PRICE =  PRICE FROM ITEM_PRICE WHERE ITEM_CODE = @ITEM_CODE AND TYPE = 0 AND QUANTITY BETWEEN 1 AND @QUANTITY AND START_DATE <= '19700101' AND FINISH_DATE >= '19700101'  ORDER BY QUANTITY DESC
	END

	-- Return the result of the function
	RETURN @PRICE

END
GO
/****** Object:  Table [dbo].[POS_SALES]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[POS_SALES](
	[GUID] [uniqueidentifier] NOT NULL,
	[CUSER] [nvarchar](25) NULL,
	[CDATE] [datetime] NULL,
	[LUSER] [nvarchar](25) NULL,
	[LDATE] [datetime] NULL,
	[DEVICE] [nvarchar](20) NULL,
	[DEPARTMENT] [int] NULL,
	[TYPE] [tinyint] NULL,
	[DOC_DATE] [datetime] NULL,
	[REF] [nvarchar](25) NULL,
	[REF_NO] [int] NULL,
	[LINE_NO] [int] NULL,
	[CUSTOMER_CODE] [nvarchar](25) NULL,
	[ITEM_CODE] [nvarchar](25) NULL,
	[BARCODE] [nvarchar](50) NULL,
	[QUANTITY] [float] NULL,
	[UNIT] [nvarchar](50) NULL,
	[PRICE] [float] NULL,
	[DISCOUNT] [float] NULL,
	[LOYALTY] [float] NULL,
	[VAT] [float] NULL,
	[STATUS] [int] NULL,
 CONSTRAINT [PK_POS_SALES] PRIMARY KEY CLUSTERED 
(
	[GUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[POS_SALES_VW_01]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






CREATE VIEW [dbo].[POS_SALES_VW_01]
AS
SELECT
*,
CASE WHEN VAT = 20 THEN 'B' WHEN VAT = 5.5 THEN 'C' END AS VAT_TYPE, 
CASE WHEN AMOUNT = 0 THEN 0 ELSE (AMOUNT - (LOYALTY_AMOUNT + DISCOUNT)) / ((VAT / 100) + 1) END AS HT,
CASE WHEN AMOUNT = 0 THEN 0 ELSE (AMOUNT - (LOYALTY_AMOUNT + DISCOUNT)) - ((AMOUNT - (LOYALTY_AMOUNT + DISCOUNT)) / ((VAT / 100) + 1)) END AS TVA,
CASE WHEN AMOUNT = 0 THEN 0 ELSE AMOUNT - (LOYALTY_AMOUNT + DISCOUNT) END AS TTC
FROM 
(SELECT
*,
ROUND(ROUND(QUANTITY * PRICE,3),2) AS AMOUNT,
(QUANTITY * PRICE) * ((POS.LOYALTY / (SELECT SUM(CASE WHEN POSSUM.QUANTITY = 0 OR POSSUM.PRICE = 0 THEN 1 ELSE POSSUM.QUANTITY * POSSUM.PRICE END) FROM POS_SALES AS POSSUM WHERE POSSUM.DEPARTMENT = POS.DEPARTMENT AND POSSUM.TYPE = POS.TYPE AND POSSUM.REF = POS.REF AND POSSUM.REF_NO = POS.REF_NO))) AS LOYALTY_AMOUNT
FROM dbo.POS_SALES AS POS) AS TMP 
GO
/****** Object:  Table [dbo].[POS_PAYMENT]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[POS_PAYMENT](
	[GUID] [uniqueidentifier] NOT NULL,
	[CUSER] [nvarchar](25) NULL,
	[CDATE] [datetime] NULL,
	[LUSER] [nvarchar](25) NULL,
	[LDATE] [datetime] NULL,
	[DEVICE] [nvarchar](20) NULL,
	[DEPARTMENT] [int] NULL,
	[TYPE] [tinyint] NULL,
	[DOC_TYPE] [tinyint] NULL,
	[DOC_DATE] [datetime] NULL,
	[REF] [nvarchar](25) NULL,
	[REF_NO] [int] NULL,
	[LINE_NO] [int] NULL,
	[CUSTOMER_CODE] [nvarchar](25) NULL,
	[CASE_CODE] [nvarchar](25) NULL,
	[AMOUNT] [float] NULL,
	[CHANGE] [float] NULL,
	[STATUS] [int] NULL,
 CONSTRAINT [PK_POS_PAYMENT] PRIMARY KEY CLUSTERED 
(
	[GUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[POS_MASTER_EXTRA]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[POS_MASTER_EXTRA](
	[GUID] [uniqueidentifier] NOT NULL,
	[CUSER] [nvarchar](25) NULL,
	[CDATE] [datetime] NULL,
	[LUSER] [nvarchar](25) NULL,
	[LDATE] [datetime] NULL,
	[TABLE_NAME] [nvarchar](25) NULL,
	[TYPE] [tinyint] NULL,
	[REF] [nvarchar](25) NULL,
	[REF_NO] [int] NULL,
	[DESCRIPTION] [nvarchar](max) NULL,
 CONSTRAINT [PK_POS_EXTRA] PRIMARY KEY CLUSTERED 
(
	[GUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[POS_PAYMENT_VW_01]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO







CREATE VIEW [dbo].[POS_PAYMENT_VW_01]
AS
SELECT
*,
ISNULL((SELECT DESCRIPTION FROM POS_MASTER_EXTRA AS EXTRA WHERE EXTRA.REF = PAYMENT.REF AND EXTRA.REF_NO = PAYMENT.REF_NO AND EXTRA.TYPE = PAYMENT.TYPE AND EXTRA.TABLE_NAME = 'POS_PAYMENT'),'') AS DESCRIPTION
FROM POS_PAYMENT AS PAYMENT
GO
/****** Object:  Table [dbo].[CUSTOMER_ADRESS]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CUSTOMER_ADRESS](
	[GUID] [uniqueidentifier] NOT NULL,
	[CUSER] [nvarchar](25) NOT NULL,
	[CDATE] [datetime] NULL,
	[LUSER] [nvarchar](25) NULL,
	[LDATE] [datetime] NULL,
	[TYPE] [smallint] NULL,
	[CUSTOMER] [nvarchar](25) NULL,
	[ADRESS] [nvarchar](500) NULL,
	[ZIPCODE] [nvarchar](10) NULL,
	[CITY] [nvarchar](25) NULL,
	[COUNTRY] [nvarchar](3) NULL,
 CONSTRAINT [PK_CUSTOMER_ADRESS] PRIMARY KEY CLUSTERED 
(
	[GUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CUSTOMER_GROUP]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CUSTOMER_GROUP](
	[GUID] [uniqueidentifier] NOT NULL,
	[CUSER] [nvarchar](25) NULL,
	[CDATE] [datetime] NULL,
	[LUSER] [nvarchar](25) NULL,
	[LDATE] [datetime] NULL,
	[CODE] [nvarchar](25) NULL,
	[NAME] [nvarchar](100) NULL,
 CONSTRAINT [PK_CUSTOMER_GROUP] PRIMARY KEY CLUSTERED 
(
	[GUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CUSTOMER_POINT]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CUSTOMER_POINT](
	[GUID] [uniqueidentifier] NOT NULL,
	[CUSER] [nvarchar](25) NULL,
	[CDATE] [datetime] NULL,
	[LUSER] [nvarchar](25) NULL,
	[LDATE] [datetime] NULL,
	[TYPE] [int] NULL,
	[CUSTOMER] [nvarchar](25) NULL,
	[REF] [nvarchar](25) NULL,
	[REF_NO] [int] NULL,
	[POINT] [float] NULL,
	[DESCRIPTION] [nvarchar](250) NULL,
 CONSTRAINT [PK_CUSTOMER_POINT] PRIMARY KEY CLUSTERED 
(
	[GUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CUSTOMERS]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CUSTOMERS](
	[GUID] [uniqueidentifier] NOT NULL,
	[CUSER] [nvarchar](25) NULL,
	[CDATE] [datetime] NULL,
	[LUSER] [nvarchar](25) NULL,
	[LDATE] [datetime] NULL,
	[CODE] [nvarchar](25) NULL,
	[TYPE] [smallint] NULL,
	[GENUS] [smallint] NULL,
	[NAME] [nvarchar](100) NULL,
	[LAST_NAME] [nvarchar](100) NULL,
	[CUSTOMER_GRP] [nvarchar](25) NULL,
	[PHONE1] [nvarchar](20) NULL,
	[PHONE2] [nvarchar](20) NULL,
	[GSM_PHONE] [nvarchar](20) NULL,
	[OTHER_PHONE] [nvarchar](20) NULL,
	[EMAIL] [nvarchar](100) NULL,
	[WEB] [nvarchar](100) NULL,
	[NOTE] [nvarchar](max) NULL,
	[SIRET_ID] [nvarchar](20) NULL,
	[APE_CODE] [nvarchar](10) NULL,
	[TAX_OFFICE] [nvarchar](25) NULL,
	[TAX_NO] [nvarchar](30) NULL,
	[INT_VAT_NO] [nvarchar](30) NULL,
	[TAX_TYPE] [smallint] NULL,
 CONSTRAINT [PK_CUSTOMERS] PRIMARY KEY CLUSTERED 
(
	[GUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DEPOT]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DEPOT](
	[GUID] [uniqueidentifier] NOT NULL,
	[CUSER] [nvarchar](25) NULL,
	[CDATE] [datetime] NULL,
	[LUSER] [nvarchar](25) NULL,
	[LDATE] [datetime] NULL,
	[TYPE] [int] NULL,
	[CODE] [nvarchar](25) NULL,
	[NAME] [nvarchar](50) NULL,
 CONSTRAINT [PK_DEPOT] PRIMARY KEY CLUSTERED 
(
	[GUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DEVICE]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DEVICE](
	[GUID] [uniqueidentifier] NOT NULL,
	[CDATE] [datetime] NULL,
	[LDATE] [datetime] NULL,
	[ID] [nvarchar](25) NULL,
	[NAME] [nvarchar](50) NULL,
	[STATUS] [int] NULL,
 CONSTRAINT [PK_DEVICE] PRIMARY KEY CLUSTERED 
(
	[GUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ITEM_BARCODE]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ITEM_BARCODE](
	[GUID] [uniqueidentifier] NOT NULL,
	[CUSER] [nvarchar](25) NULL,
	[CDATE] [datetime] NULL,
	[LUSER] [nvarchar](25) NULL,
	[LDATE] [datetime] NULL,
	[ITEM_CODE] [nvarchar](25) NULL,
	[BARCODE] [nvarchar](50) NULL,
	[UNIT] [uniqueidentifier] NULL,
	[TYPE] [int] NULL,
 CONSTRAINT [PK_ITEM_BARCODE] PRIMARY KEY CLUSTERED 
(
	[GUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ITEM_CUSTOMER]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ITEM_CUSTOMER](
	[GUID] [uniqueidentifier] NOT NULL,
	[CUSER] [nvarchar](25) NULL,
	[CDATE] [datetime] NULL,
	[LUSER] [nvarchar](25) NULL,
	[LDATE] [datetime] NULL,
	[ITEM_CODE] [nvarchar](25) NULL,
	[CUSTOMER_CODE] [nvarchar](25) NULL,
	[CUSTOMER_ITEM_CODE] [nvarchar](25) NULL,
 CONSTRAINT [PK_ITEM_CUSTOMER] PRIMARY KEY CLUSTERED 
(
	[GUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ITEM_GROUP]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ITEM_GROUP](
	[GUID] [uniqueidentifier] NOT NULL,
	[CUSER] [nvarchar](25) NULL,
	[CDATE] [datetime] NULL,
	[LUSER] [nvarchar](25) NULL,
	[LDATE] [datetime] NULL,
	[CODE] [nvarchar](25) NULL,
	[NAME] [nvarchar](100) NULL,
 CONSTRAINT [PK_ITEM_GROUP] PRIMARY KEY CLUSTERED 
(
	[GUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ITEM_IMAGE]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ITEM_IMAGE](
	[GUID] [uniqueidentifier] NOT NULL,
	[CUSER] [nvarchar](25) NULL,
	[CDATE] [datetime] NULL,
	[LUSER] [nvarchar](25) NULL,
	[LDATE] [datetime] NULL,
	[ITEM_CODE] [nvarchar](25) NULL,
	[IMAGE] [nvarchar](max) NULL,
 CONSTRAINT [PK_ITEM_IMAGE] PRIMARY KEY CLUSTERED 
(
	[GUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ITEM_PRICE]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ITEM_PRICE](
	[GUID] [uniqueidentifier] NOT NULL,
	[CUSER] [nvarchar](25) NULL,
	[CDATE] [datetime] NULL,
	[LUSER] [nvarchar](25) NULL,
	[LDATE] [datetime] NULL,
	[ITEM_CODE] [nvarchar](25) NULL,
	[TYPE] [int] NULL,
	[DEPOT] [nvarchar](25) NULL,
	[START_DATE] [datetime] NULL,
	[FINISH_DATE] [datetime] NULL,
	[PRICE] [float] NULL,
	[QUANTITY] [float] NULL,
	[CUSTOMER] [nvarchar](25) NULL,
 CONSTRAINT [PK_ITEMS_PRICES] PRIMARY KEY CLUSTERED 
(
	[GUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ITEM_UNIT]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ITEM_UNIT](
	[GUID] [uniqueidentifier] NOT NULL,
	[CUSER] [nvarchar](25) NULL,
	[CDATE] [datetime] NULL,
	[LUSER] [nvarchar](25) NULL,
	[LDATE] [datetime] NULL,
	[ITEM_CODE] [nvarchar](25) NULL,
	[TYPE] [int] NULL,
	[NAME] [nvarchar](50) NULL,
	[FACTOR] [float] NULL,
	[WEIGHT] [float] NULL,
	[VOLUME] [float] NULL,
	[WIDTH] [float] NULL,
	[HEIGHT] [float] NULL,
	[SIZE] [float] NULL,
 CONSTRAINT [PK_ITEMS_UNIT] PRIMARY KEY CLUSTERED 
(
	[GUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ITEMS]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ITEMS](
	[GUID] [uniqueidentifier] NOT NULL,
	[CUSER] [nvarchar](25) NULL,
	[CDATE] [datetime] NULL,
	[LUSER] [nvarchar](25) NULL,
	[LDATE] [datetime] NULL,
	[CODE] [nvarchar](25) NULL,
	[NAME] [nvarchar](250) NULL,
	[SNAME] [nvarchar](20) NULL,
	[ITEM_GRP] [nvarchar](25) NULL,
	[TYPE] [int] NULL,
	[VAT] [float] NULL,
	[COST_PRICE] [float] NULL,
	[MIN_PRICE] [float] NULL,
	[MAX_PRICE] [float] NULL,
	[STATUS] [bit] NULL,
	[PLU] [bit] NULL,
	[WEIGHING] [bit] NULL,
	[SPECIAL1] [nvarchar](50) NULL,
 CONSTRAINT [PK_ITEMS] PRIMARY KEY CLUSTERED 
(
	[GUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LABEL_QUEUE]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LABEL_QUEUE](
	[GUID] [uniqueidentifier] NOT NULL,
	[CUSER] [nvarchar](25) NULL,
	[CDATE] [datetime] NULL,
	[LUSER] [nvarchar](25) NULL,
	[LDATE] [datetime] NULL,
	[DATA] [nvarchar](max) NULL,
	[DESIGN] [nvarchar](50) NULL,
	[PRINT_COUNT] [int] NULL,
	[STATUS] [smallint] NULL,
 CONSTRAINT [PK_LABEL_QUEUE] PRIMARY KEY CLUSTERED 
(
	[GUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PARAMS]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PARAMS](
	[GUID] [uniqueidentifier] NOT NULL,
	[CUSER] [nvarchar](25) NULL,
	[CDATE] [datetime] NULL,
	[LUSER] [nvarchar](25) NULL,
	[LDATE] [datetime] NULL,
	[NAME] [nvarchar](25) NULL,
	[VALUE] [nvarchar](50) NULL,
	[TAG] [nvarchar](25) NULL,
	[ID] [nvarchar](25) NULL,
 CONSTRAINT [PK_PARAM] PRIMARY KEY CLUSTERED 
(
	[GUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[POS_PLU]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[POS_PLU](
	[UID] [uniqueidentifier] NOT NULL,
	[CUSER] [nvarchar](10) NULL,
	[LUSER] [nvarchar](10) NULL,
	[CDATE] [datetime] NULL,
	[LDATE] [datetime] NULL,
	[NAME] [nvarchar](50) NULL,
	[LOCATION] [int] NULL,
	[TYPE] [int] NULL,
	[ITEMS_CODE] [nvarchar](50) NULL,
	[GRUP_INDEX] [int] NULL,
 CONSTRAINT [PK_POS_PLU] PRIMARY KEY CLUSTERED 
(
	[UID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TICKET]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TICKET](
	[GUID] [uniqueidentifier] NOT NULL,
	[CUSER] [nvarchar](25) NULL,
	[CDATE] [datetime] NULL,
	[LUSER] [nvarchar](25) NULL,
	[LDATE] [datetime] NULL,
	[CODE] [nvarchar](50) NULL,
	[AMOUNT] [float] NULL,
	[REF] [nvarchar](25) NULL,
	[REF_NO] [int] NULL,
	[TYPE] [smallint] NULL,
 CONSTRAINT [PK_TICKET] PRIMARY KEY CLUSTERED 
(
	[GUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UNIT]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UNIT](
	[GUID] [uniqueidentifier] NOT NULL,
	[CDATE] [datetime] NULL,
	[CUSER] [nvarchar](25) NULL,
	[LDATE] [datetime] NULL,
	[LUSER] [nvarchar](25) NULL,
	[SHORT] [nvarchar](10) NULL,
	[NAME] [nvarchar](25) NULL,
 CONSTRAINT [PK_UNIT] PRIMARY KEY CLUSTERED 
(
	[GUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USERS]    Script Date: 24.11.2020 13:59:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USERS](
	[GUID] [uniqueidentifier] NOT NULL,
	[CDATE] [datetime] NULL,
	[LDATE] [datetime] NULL,
	[CODE] [nvarchar](25) NULL,
	[NAME] [nvarchar](50) NULL,
	[PASSWORD] [nvarchar](25) NULL,
	[TAG] [nvarchar](25) NULL,
	[STATUS] [int] NULL,
 CONSTRAINT [PK_USERS] PRIMARY KEY CLUSTERED 
(
	[GUID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [CUSTOMER_ADRESS_INX_001]    Script Date: 24.11.2020 13:59:33 ******/
CREATE NONCLUSTERED INDEX [CUSTOMER_ADRESS_INX_001] ON [dbo].[CUSTOMER_ADRESS]
(
	[TYPE] ASC,
	[CUSTOMER] ASC
)
INCLUDE([ADRESS],[ZIPCODE],[CITY],[COUNTRY]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [CUSTOMER_POINT_INX_001]    Script Date: 24.11.2020 13:59:33 ******/
CREATE NONCLUSTERED INDEX [CUSTOMER_POINT_INX_001] ON [dbo].[CUSTOMER_POINT]
(
	[CDATE] ASC,
	[CUSTOMER] ASC
)
INCLUDE([POINT]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [CUSTOMER_POINT_INX_002]    Script Date: 24.11.2020 13:59:33 ******/
CREATE NONCLUSTERED INDEX [CUSTOMER_POINT_INX_002] ON [dbo].[CUSTOMER_POINT]
(
	[CUSTOMER] ASC,
	[CDATE] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [CUSTOMERS_INX_001]    Script Date: 24.11.2020 13:59:33 ******/
CREATE NONCLUSTERED INDEX [CUSTOMERS_INX_001] ON [dbo].[CUSTOMERS]
(
	[CODE] ASC,
	[NAME] ASC
)
INCLUDE([GENUS],[LAST_NAME],[CUSTOMER_GRP],[PHONE1],[PHONE2],[GSM_PHONE],[OTHER_PHONE],[EMAIL],[WEB],[NOTE],[SIRET_ID],[APE_CODE],[TAX_OFFICE],[TAX_NO],[INT_VAT_NO],[TAX_TYPE]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [ITEM_BARCODE_INX_001]    Script Date: 24.11.2020 13:59:33 ******/
CREATE NONCLUSTERED INDEX [ITEM_BARCODE_INX_001] ON [dbo].[ITEM_BARCODE]
(
	[ITEM_CODE] ASC,
	[UNIT] ASC
)
INCLUDE([BARCODE]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [ITEMS_INX_001]    Script Date: 24.11.2020 13:59:33 ******/
CREATE NONCLUSTERED INDEX [ITEMS_INX_001] ON [dbo].[ITEM_IMAGE]
(
	[ITEM_CODE] ASC
)
INCLUDE([IMAGE]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [ITEM_PRICE_INX_001]    Script Date: 24.11.2020 13:59:33 ******/
CREATE NONCLUSTERED INDEX [ITEM_PRICE_INX_001] ON [dbo].[ITEM_PRICE]
(
	[ITEM_CODE] ASC,
	[TYPE] ASC,
	[QUANTITY] ASC,
	[START_DATE] ASC,
	[FINISH_DATE] ASC
)
INCLUDE([PRICE]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [ITEM_UNIT_INX_001]    Script Date: 24.11.2020 13:59:33 ******/
CREATE NONCLUSTERED INDEX [ITEM_UNIT_INX_001] ON [dbo].[ITEM_UNIT]
(
	[TYPE] ASC
)
INCLUDE([ITEM_CODE],[FACTOR]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [ITEMS_INX_001]    Script Date: 24.11.2020 13:59:33 ******/
CREATE NONCLUSTERED INDEX [ITEMS_INX_001] ON [dbo].[ITEMS]
(
	[CODE] ASC,
	[NAME] ASC
)
INCLUDE([SNAME],[ITEM_GRP],[TYPE],[VAT],[STATUS],[WEIGHING]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [LABEL_QUEUE_INX_001]    Script Date: 24.11.2020 13:59:33 ******/
CREATE NONCLUSTERED INDEX [LABEL_QUEUE_INX_001] ON [dbo].[LABEL_QUEUE]
(
	[DESIGN] ASC,
	[STATUS] ASC
)
INCLUDE([DATA],[PRINT_COUNT]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[CUSTOMER_ADRESS] ADD  CONSTRAINT [DF_CUSTOMER_ADRESS_GUID]  DEFAULT (newid()) FOR [GUID]
GO
ALTER TABLE [dbo].[CUSTOMER_GROUP] ADD  CONSTRAINT [DF_CUSTOMER_GROUP_GUID]  DEFAULT (newid()) FOR [GUID]
GO
ALTER TABLE [dbo].[CUSTOMER_POINT] ADD  CONSTRAINT [DF_CUSTOMER_POINT_GUID]  DEFAULT (newid()) FOR [GUID]
GO
ALTER TABLE [dbo].[CUSTOMERS] ADD  CONSTRAINT [DF_CUSTOMERS_GUID]  DEFAULT (newid()) FOR [GUID]
GO
ALTER TABLE [dbo].[DEPOT] ADD  CONSTRAINT [DF_DEPOT_GUID]  DEFAULT (newid()) FOR [GUID]
GO
ALTER TABLE [dbo].[DEVICE] ADD  CONSTRAINT [DF_DEVICE_GUID]  DEFAULT (newid()) FOR [GUID]
GO
ALTER TABLE [dbo].[ITEM_BARCODE] ADD  CONSTRAINT [DF_ITEM_BARCODE_GUID]  DEFAULT (newid()) FOR [GUID]
GO
ALTER TABLE [dbo].[ITEM_CUSTOMER] ADD  CONSTRAINT [DF_ITEM_CUSTOMER_GUID]  DEFAULT (newid()) FOR [GUID]
GO
ALTER TABLE [dbo].[ITEM_GROUP] ADD  CONSTRAINT [DF_ITEM_GROUP_GUID]  DEFAULT (newid()) FOR [GUID]
GO
ALTER TABLE [dbo].[ITEM_IMAGE] ADD  CONSTRAINT [DF_ITEM_IMAGE_GUID]  DEFAULT (newid()) FOR [GUID]
GO
ALTER TABLE [dbo].[ITEM_PRICE] ADD  CONSTRAINT [DF_ITEMS_PRICES_GUID]  DEFAULT (newid()) FOR [GUID]
GO
ALTER TABLE [dbo].[ITEM_UNIT] ADD  CONSTRAINT [DF_ITEMS_UNIT_GUID]  DEFAULT (newid()) FOR [GUID]
GO
ALTER TABLE [dbo].[ITEMS] ADD  CONSTRAINT [DF_ITEMS_GUID]  DEFAULT (newid()) FOR [GUID]
GO
ALTER TABLE [dbo].[LABEL_QUEUE] ADD  CONSTRAINT [DF_LABEL_QUEUE_GUID]  DEFAULT (newid()) FOR [GUID]
GO
ALTER TABLE [dbo].[PARAMS] ADD  CONSTRAINT [DF_PARAM_GUID]  DEFAULT (newid()) FOR [GUID]
GO
ALTER TABLE [dbo].[POS_MASTER_EXTRA] ADD  CONSTRAINT [DF_POS_EXTRA_GUID]  DEFAULT (newid()) FOR [GUID]
GO
ALTER TABLE [dbo].[POS_PAYMENT] ADD  CONSTRAINT [DF_POS_PAYMENT_GUID]  DEFAULT (newid()) FOR [GUID]
GO
ALTER TABLE [dbo].[POS_PLU] ADD  CONSTRAINT [DF_POS_PLU_UID]  DEFAULT (newid()) FOR [UID]
GO
ALTER TABLE [dbo].[POS_SALES] ADD  CONSTRAINT [DF_POS_SALES_GUID]  DEFAULT (newid()) FOR [GUID]
GO
ALTER TABLE [dbo].[TICKET] ADD  CONSTRAINT [DF_TICKET_GUID]  DEFAULT (newid()) FOR [GUID]
GO
ALTER TABLE [dbo].[UNIT] ADD  CONSTRAINT [DF_UNIT_GUID]  DEFAULT (newid()) FOR [GUID]
GO
ALTER TABLE [dbo].[USERS] ADD  CONSTRAINT [DF_USERS_GUID]  DEFAULT (newid()) FOR [GUID]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "POS_SALES"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
               Right = 224
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'POS_SALES_VW_01'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'POS_SALES_VW_01'
GO
USE [master]
GO
ALTER DATABASE [PIQPOS] SET  READ_WRITE 
GO
