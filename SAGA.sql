USE [master]
GO
/****** Object:  Database [SAGA]    Script Date: 27/11/2020 17:45:40 ******/
CREATE DATABASE [SAGA]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SAGA', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\SAGA.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SAGA_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\SAGA_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [SAGA] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SAGA].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SAGA] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SAGA] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SAGA] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SAGA] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SAGA] SET ARITHABORT OFF 
GO
ALTER DATABASE [SAGA] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SAGA] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SAGA] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SAGA] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SAGA] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SAGA] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SAGA] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SAGA] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SAGA] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SAGA] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SAGA] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SAGA] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SAGA] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SAGA] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SAGA] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SAGA] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SAGA] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SAGA] SET RECOVERY FULL 
GO
ALTER DATABASE [SAGA] SET  MULTI_USER 
GO
ALTER DATABASE [SAGA] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SAGA] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SAGA] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SAGA] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SAGA] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'SAGA', N'ON'
GO
ALTER DATABASE [SAGA] SET QUERY_STORE = OFF
GO
USE [SAGA]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
USE [SAGA]
GO
/****** Object:  Table [dbo].[tblAutor]    Script Date: 27/11/2020 17:45:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblAutor](
	[IdAutor] [int] IDENTITY(1,1) NOT NULL,
	[Nombres] [varchar](75) NOT NULL,
	[Apellidos] [varchar](75) NOT NULL,
 CONSTRAINT [PK_tblAutor] PRIMARY KEY CLUSTERED 
(
	[IdAutor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblCategoria]    Script Date: 27/11/2020 17:45:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblCategoria](
	[IdCategoria] [int] IDENTITY(1,1) NOT NULL,
	[NombreCategoria] [varchar](50) NOT NULL,
 CONSTRAINT [PK_tblCategoria] PRIMARY KEY CLUSTERED 
(
	[IdCategoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblEditorial]    Script Date: 27/11/2020 17:45:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblEditorial](
	[IdEditorial] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
 CONSTRAINT [PK_tblEditorial] PRIMARY KEY CLUSTERED 
(
	[IdEditorial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblLibro]    Script Date: 27/11/2020 17:45:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblLibro](
	[IdLibro] [int] IDENTITY(1,1) NOT NULL,
	[Titulo] [varchar](50) NOT NULL,
	[Descripcion] [varchar](250) NOT NULL,
	[CantidadPaginas] [int] NOT NULL,
	[ISBN] [varchar](50) NOT NULL,
	[AnioPublicacion] [int] NOT NULL,
	[IdAutor] [int] NOT NULL,
	[IdEditorial] [int] NOT NULL,
	[IdCategoria] [int] NOT NULL,
 CONSTRAINT [PK_tblLibro] PRIMARY KEY CLUSTERED 
(
	[IdLibro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[VwLibro]    Script Date: 27/11/2020 17:45:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[VwLibro]
AS
SELECT        dbo.tblLibro.*, dbo.tblAutor.IdAutor AS AutorId, dbo.tblAutor.Nombres, dbo.tblAutor.Apellidos, dbo.tblCategoria.IdCategoria AS CategoriaId, dbo.tblCategoria.NombreCategoria, dbo.tblEditorial.IdEditorial AS EditorialId, 
                         dbo.tblEditorial.Nombre
FROM            dbo.tblLibro INNER JOIN
                         dbo.tblAutor ON dbo.tblLibro.IdAutor = dbo.tblAutor.IdAutor INNER JOIN
                         dbo.tblCategoria ON dbo.tblLibro.IdCategoria = dbo.tblCategoria.IdCategoria INNER JOIN
                         dbo.tblEditorial ON dbo.tblLibro.IdEditorial = dbo.tblEditorial.IdEditorial
GO
/****** Object:  Table [dbo].[tblEjemplar]    Script Date: 27/11/2020 17:45:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblEjemplar](
	[IdEjemplar] [int] IDENTITY(1,1) NOT NULL,
	[IdLibro] [int] NOT NULL,
	[Stock] [int] NOT NULL,
	[Entrada] [int] NOT NULL,
	[Salida] [int] NOT NULL,
 CONSTRAINT [PK_tblEjemplar] PRIMARY KEY CLUSTERED 
(
	[IdEjemplar] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[VwTotalEjemplar]    Script Date: 27/11/2020 17:45:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[VwTotalEjemplar]
AS
SELECT dbo.tblLibro.IdLibro, dbo.tblLibro.Titulo, SUM(dbo.tblEjemplar.Entrada) AS TotalEntradas, SUM(dbo.tblEjemplar.Salida) AS TotalSalida, SUM(dbo.tblEjemplar.Entrada) - SUM(dbo.tblEjemplar.Salida) AS TotalStock
FROM     dbo.tblLibro INNER JOIN
                  dbo.tblEjemplar ON dbo.tblLibro.IdLibro = dbo.tblEjemplar.IdLibro
GROUP BY dbo.tblLibro.IdLibro, dbo.tblLibro.Titulo
GO
/****** Object:  View [dbo].[VwEjemplar]    Script Date: 27/11/2020 17:45:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[VwEjemplar]
AS
SELECT dbo.tblLibro.IdLibro, dbo.tblLibro.Titulo, dbo.tblEjemplar.IdEjemplar, dbo.tblEjemplar.Entrada, dbo.tblEjemplar.Salida, dbo.tblEjemplar.Stock
FROM     dbo.tblEjemplar INNER JOIN
                  dbo.tblLibro ON dbo.tblEjemplar.IdLibro = dbo.tblLibro.IdLibro
GO
/****** Object:  Table [dbo].[tblPrestamo]    Script Date: 27/11/2020 17:45:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPrestamo](
	[IdPrestamo] [int] IDENTITY(1,1) NOT NULL,
	[IdUsuario] [int] NOT NULL,
	[FechaEmision] [datetime] NOT NULL,
	[FechaVencimiento] [datetime] NOT NULL,
	[FechaDevolucion] [datetime] NULL,
	[Estado] [int] NOT NULL,
 CONSTRAINT [PK_tblPrestamo] PRIMARY KEY CLUSTERED 
(
	[IdPrestamo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblUsuario]    Script Date: 27/11/2020 17:45:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUsuario](
	[IdUsuario] [int] IDENTITY(1,1) NOT NULL,
	[User] [varchar](50) NOT NULL,
	[Contrasenia] [varchar](200) NOT NULL,
	[Nombres] [varchar](75) NOT NULL,
	[Apellidos] [varchar](75) NOT NULL,
	[Rol] [int] NOT NULL,
 CONSTRAINT [PK_tblUsuario] PRIMARY KEY CLUSTERED 
(
	[IdUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[VwPrestamo]    Script Date: 27/11/2020 17:45:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[VwPrestamo] AS
SELECT        dbo.tblPrestamo.*, dbo.tblUsuario.[User], CONCAT (dbo.tblUsuario.Nombres,' ', dbo.tblUsuario.Apellidos) AS NombreCompleto
FROM            dbo.tblPrestamo INNER JOIN
                         dbo.tblUsuario ON dbo.tblPrestamo.IdUsuario = dbo.tblUsuario.IdUsuario
GO
/****** Object:  Table [dbo].[tblDetallePrestamo]    Script Date: 27/11/2020 17:45:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblDetallePrestamo](
	[IdDetallePrestamo] [int] IDENTITY(1,1) NOT NULL,
	[IdPrestamo] [int] NOT NULL,
	[Cantidad] [int] NOT NULL,
	[IdLibro] [int] NOT NULL,
 CONSTRAINT [PK_tblDetallePrestamo] PRIMARY KEY CLUSTERED 
(
	[IdDetallePrestamo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[VwDetallePrestamo]    Script Date: 27/11/2020 17:45:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[VwDetallePrestamo] AS
SELECT dbo.tblDetallePrestamo.IdDetallePrestamo, dbo.tblDetallePrestamo.Cantidad, dbo.tblDetallePrestamo.IdPrestamo, 
dbo.tblDetallePrestamo.IdLibro, dbo.tblLibro.Titulo, dbo.tblLibro.IdAutor, CONCAT(dbo.tblAutor.Nombres, ' ', dbo.tblAutor.Apellidos) AS NombreCompleto, 
                  dbo.tblLibro.IdCategoria, dbo.tblCategoria.NombreCategoria
FROM     dbo.tblDetallePrestamo INNER JOIN
                  dbo.tblLibro ON dbo.tblDetallePrestamo.IdLibro = dbo.tblLibro.IdLibro INNER JOIN
                  dbo.tblAutor ON dbo.tblLibro.IdAutor = dbo.tblAutor.IdAutor INNER JOIN
                  dbo.tblCategoria ON dbo.tblLibro.IdCategoria = dbo.tblCategoria.IdCategoria
GO
SET IDENTITY_INSERT [dbo].[tblAutor] ON 

INSERT [dbo].[tblAutor] ([IdAutor], [Nombres], [Apellidos]) VALUES (1, N'Oscar', N'Wilde')
INSERT [dbo].[tblAutor] ([IdAutor], [Nombres], [Apellidos]) VALUES (2, N'Cassandra', N'Clare')
INSERT [dbo].[tblAutor] ([IdAutor], [Nombres], [Apellidos]) VALUES (3, N'C.S.', N'Pacat')
INSERT [dbo].[tblAutor] ([IdAutor], [Nombres], [Apellidos]) VALUES (4, N'T.J.', N'Klune')
INSERT [dbo].[tblAutor] ([IdAutor], [Nombres], [Apellidos]) VALUES (5, N'Rubén', N'Darío')
INSERT [dbo].[tblAutor] ([IdAutor], [Nombres], [Apellidos]) VALUES (6, N'Bill', N'Gates')
SET IDENTITY_INSERT [dbo].[tblAutor] OFF
GO
SET IDENTITY_INSERT [dbo].[tblCategoria] ON 

INSERT [dbo].[tblCategoria] ([IdCategoria], [NombreCategoria]) VALUES (1, N'Programación')
INSERT [dbo].[tblCategoria] ([IdCategoria], [NombreCategoria]) VALUES (2, N'Fantasía')
INSERT [dbo].[tblCategoria] ([IdCategoria], [NombreCategoria]) VALUES (3, N'Novela')
INSERT [dbo].[tblCategoria] ([IdCategoria], [NombreCategoria]) VALUES (4, N'Ficción')
INSERT [dbo].[tblCategoria] ([IdCategoria], [NombreCategoria]) VALUES (5, N'Poesía')
INSERT [dbo].[tblCategoria] ([IdCategoria], [NombreCategoria]) VALUES (6, N'Misterio')
INSERT [dbo].[tblCategoria] ([IdCategoria], [NombreCategoria]) VALUES (7, N'Terror')
SET IDENTITY_INSERT [dbo].[tblCategoria] OFF
GO
SET IDENTITY_INSERT [dbo].[tblDetallePrestamo] ON 

INSERT [dbo].[tblDetallePrestamo] ([IdDetallePrestamo], [IdPrestamo], [Cantidad], [IdLibro]) VALUES (1, 1, 1, 1)
INSERT [dbo].[tblDetallePrestamo] ([IdDetallePrestamo], [IdPrestamo], [Cantidad], [IdLibro]) VALUES (2, 1, 2, 2)
INSERT [dbo].[tblDetallePrestamo] ([IdDetallePrestamo], [IdPrestamo], [Cantidad], [IdLibro]) VALUES (3, 2, 1, 3)
INSERT [dbo].[tblDetallePrestamo] ([IdDetallePrestamo], [IdPrestamo], [Cantidad], [IdLibro]) VALUES (4, 3, 1, 1)
INSERT [dbo].[tblDetallePrestamo] ([IdDetallePrestamo], [IdPrestamo], [Cantidad], [IdLibro]) VALUES (5, 4, 1, 12)
INSERT [dbo].[tblDetallePrestamo] ([IdDetallePrestamo], [IdPrestamo], [Cantidad], [IdLibro]) VALUES (6, 4, 1, 2)
INSERT [dbo].[tblDetallePrestamo] ([IdDetallePrestamo], [IdPrestamo], [Cantidad], [IdLibro]) VALUES (7, 5, 2, 8)
INSERT [dbo].[tblDetallePrestamo] ([IdDetallePrestamo], [IdPrestamo], [Cantidad], [IdLibro]) VALUES (8, 5, 1, 11)
INSERT [dbo].[tblDetallePrestamo] ([IdDetallePrestamo], [IdPrestamo], [Cantidad], [IdLibro]) VALUES (9, 6, 2, 12)
INSERT [dbo].[tblDetallePrestamo] ([IdDetallePrestamo], [IdPrestamo], [Cantidad], [IdLibro]) VALUES (10, 6, 1, 10)
INSERT [dbo].[tblDetallePrestamo] ([IdDetallePrestamo], [IdPrestamo], [Cantidad], [IdLibro]) VALUES (11, 6, 1, 7)
SET IDENTITY_INSERT [dbo].[tblDetallePrestamo] OFF
GO
SET IDENTITY_INSERT [dbo].[tblEditorial] ON 

INSERT [dbo].[tblEditorial] ([IdEditorial], [Nombre]) VALUES (1, N'Grupo Editorial Patria')
INSERT [dbo].[tblEditorial] ([IdEditorial], [Nombre]) VALUES (2, N'Planeta')
INSERT [dbo].[tblEditorial] ([IdEditorial], [Nombre]) VALUES (3, N'Oz Nébula')
INSERT [dbo].[tblEditorial] ([IdEditorial], [Nombre]) VALUES (4, N'Tor Books')
INSERT [dbo].[tblEditorial] ([IdEditorial], [Nombre]) VALUES (5, N'Susaeta')
INSERT [dbo].[tblEditorial] ([IdEditorial], [Nombre]) VALUES (6, N'Oceano')
SET IDENTITY_INSERT [dbo].[tblEditorial] OFF
GO
SET IDENTITY_INSERT [dbo].[tblEjemplar] ON 

INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (1, 1, 2, 2, 0)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (2, 1, 1, 0, 1)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (3, 1, 2, 1, 0)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (4, 2, 4, 4, 0)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (5, 2, 2, 0, 2)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (6, 2, 3, 1, 0)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (7, 2, 4, 1, 0)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (8, 2, 6, 2, 0)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (9, 3, 10, 10, 0)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (10, 3, 9, 0, 1)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (11, 4, 10, 10, 0)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (12, 5, 10, 10, 0)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (13, 6, 10, 10, 0)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (14, 7, 10, 10, 0)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (15, 8, 10, 10, 0)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (16, 9, 10, 10, 0)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (17, 10, 10, 10, 0)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (18, 11, 10, 10, 0)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (19, 12, 20, 20, 0)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (20, 1, 3, 1, 0)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (21, 2, 8, 2, 0)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (22, 2, 7, 0, 1)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (23, 12, 19, 0, 1)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (24, 8, 8, 0, 2)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (25, 11, 9, 0, 1)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (26, 10, 9, 0, 1)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (27, 12, 17, 0, 2)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (28, 7, 9, 0, 1)
SET IDENTITY_INSERT [dbo].[tblEjemplar] OFF
GO
SET IDENTITY_INSERT [dbo].[tblLibro] ON 

INSERT [dbo].[tblLibro] ([IdLibro], [Titulo], [Descripcion], [CantidadPaginas], [ISBN], [AnioPublicacion], [IdAutor], [IdEditorial], [IdCategoria]) VALUES (1, N'El Retrato de Dorian Gray', N'Un hombre obsesionado con su juventud y belleza', 500, N'9781511359658', 2015, 1, 1, 3)
INSERT [dbo].[tblLibro] ([IdLibro], [Titulo], [Descripcion], [CantidadPaginas], [ISBN], [AnioPublicacion], [IdAutor], [IdEditorial], [IdCategoria]) VALUES (2, N'Ciudad de Hueso', N'Primer libro de la saga TMI', 500, N'CDHTMI5002007', 2007, 2, 2, 2)
INSERT [dbo].[tblLibro] ([IdLibro], [Titulo], [Descripcion], [CantidadPaginas], [ISBN], [AnioPublicacion], [IdAutor], [IdEditorial], [IdCategoria]) VALUES (3, N'Ciudad de Ceniza', N'Segundo libro de la saga TMI', 500, N'CDCTMI5002008', 2008, 2, 2, 2)
INSERT [dbo].[tblLibro] ([IdLibro], [Titulo], [Descripcion], [CantidadPaginas], [ISBN], [AnioPublicacion], [IdAutor], [IdEditorial], [IdCategoria]) VALUES (4, N'Ciudad de Cristal', N'Tercer libro de la saga TMI', 500, N'CDCTMI5002009', 2009, 2, 2, 2)
INSERT [dbo].[tblLibro] ([IdLibro], [Titulo], [Descripcion], [CantidadPaginas], [ISBN], [AnioPublicacion], [IdAutor], [IdEditorial], [IdCategoria]) VALUES (5, N'Ciudad de los Ángeles Caídos', N'Cuarto libro de la saga TMI', 500, N'CDCTMI5002010', 2010, 2, 2, 2)
INSERT [dbo].[tblLibro] ([IdLibro], [Titulo], [Descripcion], [CantidadPaginas], [ISBN], [AnioPublicacion], [IdAutor], [IdEditorial], [IdCategoria]) VALUES (6, N'Ciudad de las Almas Pérdidas', N'Quinto libro de la saga TMI', 500, N'CDCTMI5002011', 2011, 2, 2, 2)
INSERT [dbo].[tblLibro] ([IdLibro], [Titulo], [Descripcion], [CantidadPaginas], [ISBN], [AnioPublicacion], [IdAutor], [IdEditorial], [IdCategoria]) VALUES (7, N'Ciudad del Fuego Celestial', N'Sexto libro de la saga TMI', 500, N'CDCTMI5002012', 2012, 2, 2, 2)
INSERT [dbo].[tblLibro] ([IdLibro], [Titulo], [Descripcion], [CantidadPaginas], [ISBN], [AnioPublicacion], [IdAutor], [IdEditorial], [IdCategoria]) VALUES (8, N'Príncipe Cautivo', N' La historia de Damen, un heroico guerrero y el legítimo heredero del trono de Akielos.', 224, N'9788416224982', 2014, 3, 3, 4)
INSERT [dbo].[tblLibro] ([IdLibro], [Titulo], [Descripcion], [CantidadPaginas], [ISBN], [AnioPublicacion], [IdAutor], [IdEditorial], [IdCategoria]) VALUES (9, N'El juego del príncipe', N'El regente de Vere está decidido a acabar con su sobrino, el príncipe Laurent.', 287, N'9781543643398', 2015, 3, 3, 4)
INSERT [dbo].[tblLibro] ([IdLibro], [Titulo], [Descripcion], [CantidadPaginas], [ISBN], [AnioPublicacion], [IdAutor], [IdEditorial], [IdCategoria]) VALUES (10, N'La rebelión del rey', N'Damen ha desvelado su identidad: es Damianos de Akielos.', 267, N'9781543643404', 2016, 3, 3, 4)
INSERT [dbo].[tblLibro] ([IdLibro], [Titulo], [Descripcion], [CantidadPaginas], [ISBN], [AnioPublicacion], [IdAutor], [IdEditorial], [IdCategoria]) VALUES (11, N'La Casa en el Mar Cerúleo', N'Una isla mágica. Una tarea peligrosa. Un ardiente secreto.', 400, N'9781250217288', 2020, 4, 4, 2)
INSERT [dbo].[tblLibro] ([IdLibro], [Titulo], [Descripcion], [CantidadPaginas], [ISBN], [AnioPublicacion], [IdAutor], [IdEditorial], [IdCategoria]) VALUES (12, N'Azul', N'Obras más relevante del modernismo hispánico', 156, N'AORDSU-1888-156', 1888, 5, 5, 5)
SET IDENTITY_INSERT [dbo].[tblLibro] OFF
GO
SET IDENTITY_INSERT [dbo].[tblPrestamo] ON 

INSERT [dbo].[tblPrestamo] ([IdPrestamo], [IdUsuario], [FechaEmision], [FechaVencimiento], [FechaDevolucion], [Estado]) VALUES (1, 2, CAST(N'2020-10-23T00:00:00.000' AS DateTime), CAST(N'2020-10-30T00:00:00.000' AS DateTime), CAST(N'2020-11-27T00:00:00.000' AS DateTime), 2)
INSERT [dbo].[tblPrestamo] ([IdPrestamo], [IdUsuario], [FechaEmision], [FechaVencimiento], [FechaDevolucion], [Estado]) VALUES (2, 2, CAST(N'2020-11-26T00:00:00.000' AS DateTime), CAST(N'2020-12-11T00:00:00.000' AS DateTime), CAST(N'2020-11-27T00:00:00.000' AS DateTime), 2)
INSERT [dbo].[tblPrestamo] ([IdPrestamo], [IdUsuario], [FechaEmision], [FechaVencimiento], [FechaDevolucion], [Estado]) VALUES (3, 3, CAST(N'2020-11-27T00:00:00.000' AS DateTime), CAST(N'2020-12-12T00:00:00.000' AS DateTime), CAST(N'2020-11-27T00:00:00.000' AS DateTime), 2)
INSERT [dbo].[tblPrestamo] ([IdPrestamo], [IdUsuario], [FechaEmision], [FechaVencimiento], [FechaDevolucion], [Estado]) VALUES (4, 4, CAST(N'2020-11-27T00:00:00.000' AS DateTime), CAST(N'2020-12-12T00:00:00.000' AS DateTime), NULL, 1)
INSERT [dbo].[tblPrestamo] ([IdPrestamo], [IdUsuario], [FechaEmision], [FechaVencimiento], [FechaDevolucion], [Estado]) VALUES (5, 5, CAST(N'2020-11-27T00:00:00.000' AS DateTime), CAST(N'2020-12-12T00:00:00.000' AS DateTime), NULL, 1)
INSERT [dbo].[tblPrestamo] ([IdPrestamo], [IdUsuario], [FechaEmision], [FechaVencimiento], [FechaDevolucion], [Estado]) VALUES (6, 6, CAST(N'2020-11-27T00:00:00.000' AS DateTime), CAST(N'2020-12-12T00:00:00.000' AS DateTime), NULL, 1)
SET IDENTITY_INSERT [dbo].[tblPrestamo] OFF
GO
SET IDENTITY_INSERT [dbo].[tblUsuario] ON 

INSERT [dbo].[tblUsuario] ([IdUsuario], [User], [Contrasenia], [Nombres], [Apellidos], [Rol]) VALUES (1, N'admin', N'20-2C-B9-62-AC-59-07-5B-96-4B-07-15-2D-23-4B-70', N'Administrador', N'SAGA', 1)
INSERT [dbo].[tblUsuario] ([IdUsuario], [User], [Contrasenia], [Nombres], [Apellidos], [Rol]) VALUES (2, N'cmari', N'20-2C-B9-62-AC-59-07-5B-96-4B-07-15-2D-23-4B-70', N'Marialetsandra', N'Carrazco', 2)
INSERT [dbo].[tblUsuario] ([IdUsuario], [User], [Contrasenia], [Nombres], [Apellidos], [Rol]) VALUES (3, N'byola', N'20-2C-B9-62-AC-59-07-5B-96-4B-07-15-2D-23-4B-70', N'Yolanda', N'Bustamante', 2)
INSERT [dbo].[tblUsuario] ([IdUsuario], [User], [Contrasenia], [Nombres], [Apellidos], [Rol]) VALUES (4, N'dagabu', N'20-2C-B9-62-AC-59-07-5B-96-4B-07-15-2D-23-4B-70', N'Dagmara', N'Aburto', 2)
INSERT [dbo].[tblUsuario] ([IdUsuario], [User], [Contrasenia], [Nombres], [Apellidos], [Rol]) VALUES (5, N'heicu', N'20-2C-B9-62-AC-59-07-5B-96-4B-07-15-2D-23-4B-70', N'Hazel', N'Acuña', 2)
INSERT [dbo].[tblUsuario] ([IdUsuario], [User], [Contrasenia], [Nombres], [Apellidos], [Rol]) VALUES (6, N'jmorales', N'20-2C-B9-62-AC-59-07-5B-96-4B-07-15-2D-23-4B-70', N'Jorge', N'Morales', 2)
SET IDENTITY_INSERT [dbo].[tblUsuario] OFF
GO
ALTER TABLE [dbo].[tblDetallePrestamo]  WITH CHECK ADD  CONSTRAINT [FK_tblDetallePrestamo_tblLibro] FOREIGN KEY([IdLibro])
REFERENCES [dbo].[tblLibro] ([IdLibro])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblDetallePrestamo] CHECK CONSTRAINT [FK_tblDetallePrestamo_tblLibro]
GO
ALTER TABLE [dbo].[tblDetallePrestamo]  WITH CHECK ADD  CONSTRAINT [FK_tblDetallePrestamo_tblPrestamo] FOREIGN KEY([IdPrestamo])
REFERENCES [dbo].[tblPrestamo] ([IdPrestamo])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblDetallePrestamo] CHECK CONSTRAINT [FK_tblDetallePrestamo_tblPrestamo]
GO
ALTER TABLE [dbo].[tblEjemplar]  WITH CHECK ADD  CONSTRAINT [FK_tblEjemplar_tblLibro] FOREIGN KEY([IdLibro])
REFERENCES [dbo].[tblLibro] ([IdLibro])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblEjemplar] CHECK CONSTRAINT [FK_tblEjemplar_tblLibro]
GO
ALTER TABLE [dbo].[tblLibro]  WITH CHECK ADD  CONSTRAINT [FK_tblLibro_tblAutor] FOREIGN KEY([IdAutor])
REFERENCES [dbo].[tblAutor] ([IdAutor])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblLibro] CHECK CONSTRAINT [FK_tblLibro_tblAutor]
GO
ALTER TABLE [dbo].[tblLibro]  WITH CHECK ADD  CONSTRAINT [FK_tblLibro_tblCategoria] FOREIGN KEY([IdCategoria])
REFERENCES [dbo].[tblCategoria] ([IdCategoria])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblLibro] CHECK CONSTRAINT [FK_tblLibro_tblCategoria]
GO
ALTER TABLE [dbo].[tblLibro]  WITH CHECK ADD  CONSTRAINT [FK_tblLibro_tblEditorial] FOREIGN KEY([IdEditorial])
REFERENCES [dbo].[tblEditorial] ([IdEditorial])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblLibro] CHECK CONSTRAINT [FK_tblLibro_tblEditorial]
GO
ALTER TABLE [dbo].[tblPrestamo]  WITH CHECK ADD  CONSTRAINT [FK_tblPrestamo_tblUsuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[tblUsuario] ([IdUsuario])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tblPrestamo] CHECK CONSTRAINT [FK_tblPrestamo_tblUsuario]
GO
/****** Object:  StoredProcedure [dbo].[SPCIdLibro]    Script Date: 27/11/2020 17:45:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SPCIdLibro]
AS
BEGIN
	SELECT TOP 1 IdLibro FROM tblLibro ORDER BY IdLibro DESC
END
GO
USE [master]
GO
ALTER DATABASE [SAGA] SET  READ_WRITE 
GO
