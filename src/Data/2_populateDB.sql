USE [Catalog];
GO

DECLARE @ResetIdentity INT = 0;

----------------------------------------Table dbo.Category----------------------------------------------

DECLARE @Category_temp TABLE
(
	[CategoryId] [int] NOT NULL,
	[Description] [varchar] (255) NOT NULL
);

INSERT INTO @Category_temp ([CategoryId], [Description]) VALUES (1, 'Vehiculos');
INSERT INTO @Category_temp ([CategoryId], [Description]) VALUES (2, 'Supermercados');
INSERT INTO @Category_temp ([CategoryId], [Description]) VALUES (3, 'Computación');
INSERT INTO @Category_temp ([CategoryId], [Description]) VALUES (4, 'Celulares');
INSERT INTO @Category_temp ([CategoryId], [Description]) VALUES (5, 'Cámaras');
INSERT INTO @Category_temp ([CategoryId], [Description]) VALUES (6, 'Televisores');
INSERT INTO @Category_temp ([CategoryId], [Description]) VALUES (7, 'Electrodomesticos');
INSERT INTO @Category_temp ([CategoryId], [Description]) VALUES (8, 'Deportes');
INSERT INTO @Category_temp ([CategoryId], [Description]) VALUES (9, 'Construcción');
INSERT INTO @Category_temp ([CategoryId], [Description]) VALUES (10, 'Moda');

SET IDENTITY_INSERT [dbo].[Category] ON;

MERGE INTO [dbo].[Category] AS [Des]
USING
	(
		SELECT
			[CategoryId],
			[Description]
		FROM @Category_temp
	) AS [Ori]
ON [Ori].[CategoryId] = [Des].[CategoryId]
WHEN NOT MATCHED BY TARGET
THEN INSERT
	(
		[CategoryId],
		[Description]
	)
	VALUES
	(
		[Ori].[CategoryId],
		[Ori].[Description]
	)
WHEN MATCHED AND TRIM([Des].[Description]) <> TRIM([Ori].[Description])
	THEN UPDATE SET
		[Des].[Description] = TRIM([Ori].[Description]);

SET IDENTITY_INSERT [dbo].[Category] OFF;

SELECT @ResetIdentity = MAX([CategoryId]) FROM [dbo].[Category] WITH(NOLOCK);
DBCC CHECKIDENT ('[dbo].[Category]', RESEED, @ResetIdentity);