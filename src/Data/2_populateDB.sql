USE [Catalog];
GO

DECLARE @ResetIdentity INT = 0;

----------------------------------------Table dbo.Categorie----------------------------------------------

DECLARE @Categorie_temp TABLE
(
	[CategorieId] [int] NOT NULL,
	[Description] [varchar] (255) NOT NULL
);

INSERT INTO @Categorie_temp ([CategorieId], [Description]) VALUES (1, 'Vehiculos');
INSERT INTO @Categorie_temp ([CategorieId], [Description]) VALUES (2, 'Supermercados');
INSERT INTO @Categorie_temp ([CategorieId], [Description]) VALUES (3, 'Computación');
INSERT INTO @Categorie_temp ([CategorieId], [Description]) VALUES (4, 'Celulares');
INSERT INTO @Categorie_temp ([CategorieId], [Description]) VALUES (5, 'Cámaras');
INSERT INTO @Categorie_temp ([CategorieId], [Description]) VALUES (6, 'Televisores');
INSERT INTO @Categorie_temp ([CategorieId], [Description]) VALUES (7, 'Electrodomesticos');
INSERT INTO @Categorie_temp ([CategorieId], [Description]) VALUES (8, 'Deportes');
INSERT INTO @Categorie_temp ([CategorieId], [Description]) VALUES (9, 'Construcción');
INSERT INTO @Categorie_temp ([CategorieId], [Description]) VALUES (10, 'Moda');

SET IDENTITY_INSERT [dbo].[Categorie] ON;

MERGE INTO [dbo].[Categorie] AS [Des]
USING
	(
		SELECT
			[CategorieId],
			[Description]
		FROM @Categorie_temp
	) AS [Ori]
ON [Ori].[CategorieId] = [Des].[CategorieId]
WHEN NOT MATCHED BY TARGET
THEN INSERT
	(
		[CategorieId],
		[Description]
	)
	VALUES
	(
		[Ori].[CategorieId],
		[Ori].[Description]
	)
WHEN MATCHED AND TRIM([Des].[Description]) <> TRIM([Ori].[Description])
	THEN UPDATE SET
		[Des].[Description] = TRIM([Ori].[Description]);

SET IDENTITY_INSERT [dbo].[Categorie] OFF;

SELECT @ResetIdentity = MAX([CategorieId]) FROM [dbo].[Categorie] WITH(NOLOCK);
DBCC CHECKIDENT ('[dbo].[Categorie]', RESEED, @ResetIdentity);