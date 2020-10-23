USE [master]
GO
/****** Object:  Database [SAGA]    Script Date: 23/10/2020 15:46:18 ******/
CREATE DATABASE [SAGA]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'PrestamoLibros', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\PrestamoLibros.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'PrestamoLibros_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\PrestamoLibros_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
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
/****** Object:  Table [dbo].[tblAutor]    Script Date: 23/10/2020 15:46:19 ******/
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
/****** Object:  Table [dbo].[tblCategoria]    Script Date: 23/10/2020 15:46:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblCategoria](
	[IdCategoria] [int] IDENTITY(1,1) NOT NULL,
	[Categoria] [varchar](50) NOT NULL,
 CONSTRAINT [PK_tblCategoria] PRIMARY KEY CLUSTERED 
(
	[IdCategoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblDetallePrestamo]    Script Date: 23/10/2020 15:46:19 ******/
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
/****** Object:  Table [dbo].[tblEditorial]    Script Date: 23/10/2020 15:46:19 ******/
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
/****** Object:  Table [dbo].[tblEjemplar]    Script Date: 23/10/2020 15:46:19 ******/
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
/****** Object:  Table [dbo].[tblLibro]    Script Date: 23/10/2020 15:46:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblLibro](
	[IdLibro] [int] IDENTITY(1,1) NOT NULL,
	[Titulo] [varchar](50) NOT NULL,
	[Descripcion] [varchar](100) NOT NULL,
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
/****** Object:  Table [dbo].[tblPrestamo]    Script Date: 23/10/2020 15:46:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPrestamo](
	[IdPrestamo] [int] IDENTITY(1,1) NOT NULL,
	[IdUsuario] [int] NOT NULL,
	[FechaEmision] [datetime] NOT NULL,
	[FechaVencimiento] [datetime] NOT NULL,
	[FechaDevolucion] [datetime] NOT NULL,
	[Estado] [bit] NOT NULL,
 CONSTRAINT [PK_tblPrestamo] PRIMARY KEY CLUSTERED 
(
	[IdPrestamo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblUsuario]    Script Date: 23/10/2020 15:46:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUsuario](
	[IdUsuario] [int] IDENTITY(1,1) NOT NULL,
	[Usuario] [varchar](50) NOT NULL,
	[Contrasenia] [varchar](50) NOT NULL,
	[Nombres] [varchar](75) NOT NULL,
	[Apellidos] [varchar](75) NOT NULL,
	[Rol] [int] NOT NULL,
 CONSTRAINT [PK_tblUsuario] PRIMARY KEY CLUSTERED 
(
	[IdUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[tblAutor] ON 

INSERT [dbo].[tblAutor] ([IdAutor], [Nombres], [Apellidos]) VALUES (1, N'Oscar', N'Wilde')
SET IDENTITY_INSERT [dbo].[tblAutor] OFF
GO
SET IDENTITY_INSERT [dbo].[tblCategoria] ON 

INSERT [dbo].[tblCategoria] ([IdCategoria], [Categoria]) VALUES (1, N'Programación')
SET IDENTITY_INSERT [dbo].[tblCategoria] OFF
GO
SET IDENTITY_INSERT [dbo].[tblDetallePrestamo] ON 

INSERT [dbo].[tblDetallePrestamo] ([IdDetallePrestamo], [IdPrestamo], [Cantidad], [IdLibro]) VALUES (1, 1, 1, 1)
SET IDENTITY_INSERT [dbo].[tblDetallePrestamo] OFF
GO
SET IDENTITY_INSERT [dbo].[tblEditorial] ON 

INSERT [dbo].[tblEditorial] ([IdEditorial], [Nombre]) VALUES (1, N'Grupo Editorial Patria')
SET IDENTITY_INSERT [dbo].[tblEditorial] OFF
GO
SET IDENTITY_INSERT [dbo].[tblEjemplar] ON 

INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (1, 1, 2, 2, 0)
INSERT [dbo].[tblEjemplar] ([IdEjemplar], [IdLibro], [Stock], [Entrada], [Salida]) VALUES (2, 1, 1, 0, 1)
SET IDENTITY_INSERT [dbo].[tblEjemplar] OFF
GO
SET IDENTITY_INSERT [dbo].[tblLibro] ON 

INSERT [dbo].[tblLibro] ([IdLibro], [Titulo], [Descripcion], [CantidadPaginas], [ISBN], [AnioPublicacion], [IdAutor], [IdEditorial], [IdCategoria]) VALUES (1, N'El Retrato de Dorian Gray', N'Un hombre obsesionado con su juventud y belleza', 500, N'9781511359658', 2015, 1, 1, 1)
SET IDENTITY_INSERT [dbo].[tblLibro] OFF
GO
SET IDENTITY_INSERT [dbo].[tblPrestamo] ON 

INSERT [dbo].[tblPrestamo] ([IdPrestamo], [IdUsuario], [FechaEmision], [FechaVencimiento], [FechaDevolucion], [Estado]) VALUES (1, 2, CAST(N'2020-10-23T00:00:00.000' AS DateTime), CAST(N'2020-10-30T00:00:00.000' AS DateTime), CAST(N'2020-10-27T00:00:00.000' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[tblPrestamo] OFF
GO
SET IDENTITY_INSERT [dbo].[tblUsuario] ON 

INSERT [dbo].[tblUsuario] ([IdUsuario], [Usuario], [Contrasenia], [Nombres], [Apellidos], [Rol]) VALUES (1, N'admin', N'123', N'Administrador', N'SAGA', 1)
INSERT [dbo].[tblUsuario] ([IdUsuario], [Usuario], [Contrasenia], [Nombres], [Apellidos], [Rol]) VALUES (2, N'ggomez', N'usuario1', N'Gloria María', N'Gómez López', 2)
SET IDENTITY_INSERT [dbo].[tblUsuario] OFF
GO
ALTER TABLE [dbo].[tblDetallePrestamo]  WITH CHECK ADD  CONSTRAINT [FK_tblDetallePrestamo_tblLibro] FOREIGN KEY([IdLibro])
REFERENCES [dbo].[tblLibro] ([IdLibro])
GO
ALTER TABLE [dbo].[tblDetallePrestamo] CHECK CONSTRAINT [FK_tblDetallePrestamo_tblLibro]
GO
ALTER TABLE [dbo].[tblDetallePrestamo]  WITH CHECK ADD  CONSTRAINT [FK_tblDetallePrestamo_tblPrestamo] FOREIGN KEY([IdPrestamo])
REFERENCES [dbo].[tblPrestamo] ([IdPrestamo])
GO
ALTER TABLE [dbo].[tblDetallePrestamo] CHECK CONSTRAINT [FK_tblDetallePrestamo_tblPrestamo]
GO
ALTER TABLE [dbo].[tblEjemplar]  WITH CHECK ADD  CONSTRAINT [FK_tblEjemplar_tblLibro] FOREIGN KEY([IdLibro])
REFERENCES [dbo].[tblLibro] ([IdLibro])
GO
ALTER TABLE [dbo].[tblEjemplar] CHECK CONSTRAINT [FK_tblEjemplar_tblLibro]
GO
ALTER TABLE [dbo].[tblLibro]  WITH CHECK ADD  CONSTRAINT [FK_tblLibro_tblAutor] FOREIGN KEY([IdAutor])
REFERENCES [dbo].[tblAutor] ([IdAutor])
GO
ALTER TABLE [dbo].[tblLibro] CHECK CONSTRAINT [FK_tblLibro_tblAutor]
GO
ALTER TABLE [dbo].[tblLibro]  WITH CHECK ADD  CONSTRAINT [FK_tblLibro_tblCategoria] FOREIGN KEY([IdCategoria])
REFERENCES [dbo].[tblCategoria] ([IdCategoria])
GO
ALTER TABLE [dbo].[tblLibro] CHECK CONSTRAINT [FK_tblLibro_tblCategoria]
GO
ALTER TABLE [dbo].[tblLibro]  WITH CHECK ADD  CONSTRAINT [FK_tblLibro_tblEditorial] FOREIGN KEY([IdEditorial])
REFERENCES [dbo].[tblEditorial] ([IdEditorial])
GO
ALTER TABLE [dbo].[tblLibro] CHECK CONSTRAINT [FK_tblLibro_tblEditorial]
GO
ALTER TABLE [dbo].[tblPrestamo]  WITH CHECK ADD  CONSTRAINT [FK_tblPrestamo_tblUsuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[tblUsuario] ([IdUsuario])
GO
ALTER TABLE [dbo].[tblPrestamo] CHECK CONSTRAINT [FK_tblPrestamo_tblUsuario]
GO
USE [master]
GO
ALTER DATABASE [SAGA] SET  READ_WRITE 
GO
