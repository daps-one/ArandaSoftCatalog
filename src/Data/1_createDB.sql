USE [master];
GO

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'Catalog')
BEGIN
	CREATE DATABASE [Catalog]
END
GO

USE [Catalog];
GO



----------------------------------------Table dbo.Category----------------------------------------------
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Category]') AND type IN (N'U'))
BEGIN
	IF NOT EXISTS (SELECT * FROM [dbo].[Category])
	BEGIN
		DROP TABLE [dbo].[Category];
	END
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Category]') AND type IN (N'U'))
BEGIN
	CREATE TABLE [dbo].[Category] (
		[CategoryId] [int] IDENTITY(1, 1) NOT NULL,
		[Description] [varchar](255) NOT NULL,
		CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED
		(
			[CategoryId] ASC
		)
	);
END
GO

----------------------------------------Table dbo.Product----------------------------------------------
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Product]') AND type IN (N'U'))
BEGIN
	IF NOT EXISTS (SELECT * FROM [dbo].[Product])
	BEGIN
		DROP TABLE [dbo].[Product];
	END
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Product]') AND type IN (N'U'))
BEGIN
	CREATE TABLE [dbo].[Product] (
		[ProductId]		[int] IDENTITY(1, 1) NOT NULL,
		[Name]			[varchar] (255) NOT NULL,
		[Description]	[varchar](1024) NULL,
		[CategoryId]	[int] NOT NULL,
		[Image]			[varchar] (1024) NOT NULL,
		[Status]		[bit] NOT NULL
		CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED
		(
			[ProductId] ASC
		)
	);
END
GO

----------------------------------------          Keys        ----------------------------------------------

IF NOT EXISTS (SELECT * FROM sys.objects o WHERE o.object_id = object_id(N'[dbo].[FK_Product_CategoryId_Category_CategoryId]') AND OBJECTPROPERTY(o.object_id, N'IsForeignKey') = 1)
BEGIN
    ALTER TABLE [dbo].[Product] WITH CHECK ADD CONSTRAINT [FK_Product_CategoryId_Category_CategoryId] FOREIGN KEY([CategoryId]) REFERENCES [dbo].[Category] ([CategoryId]);
END
GO