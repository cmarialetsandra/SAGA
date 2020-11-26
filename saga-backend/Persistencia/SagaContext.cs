using Microsoft.EntityFrameworkCore;
using Dominio;
using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Text;

namespace Persistencia
{
    public class SagaContext: DbContext
    {
        public SagaContext(DbContextOptions options): base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Autor>().HasKey(ci => ci.IdAutor);
            modelBuilder.Entity<Categoria>().HasKey(ci => ci.IdCategoria);
            modelBuilder.Entity<Editorial>().HasKey(ci => ci.IdEditorial);
            modelBuilder.Entity<Libro>(ci => { ci.HasOne(d => d.tblAutor)
                     .WithMany(d => d.listaLibros)
                     .HasForeignKey(d => d.IdAutor);
                ci.HasOne(d => d.tblCategoria)
                .WithMany(d => d.listaLibros)
                .HasForeignKey(d => d.IdCategoria);
                ci.HasOne(d => d.tblEditorial)
                 .WithMany(d => d.listaLibros)
                 .HasForeignKey(d => d.IdEditorial);
                ci.HasKey(ci => ci.IdLibro);
            });
            modelBuilder.Entity<Ejemplar>(ci => { ci.HasOne(d => d.tblLibro)
                     .WithMany(d => d.listaEjemplares)
                     .HasForeignKey(d => d.IdLibro);
                    ci.HasKey(ci => ci.IdEjemplar);
            });
            modelBuilder.Entity<Usuario>().HasKey(ci => ci.IdUsuario);
            modelBuilder.Entity<Prestamo>(ci => { ci.HasOne(d => d.tblUsuario)
                     .WithMany(d => d.listaPrestamos)
                     .HasForeignKey(d => d.IdUsuario);
                ci.HasKey(ci => ci.IdPrestamo);
            });
            modelBuilder.Entity<DetallePrestamo>(ci => { ci.HasOne(d => d.tblPrestamo)
                     .WithMany(d => d.listaPrestamos)
                     .HasForeignKey(d => d.IdPrestamo);
                     ci.HasOne(d => d.tblLibro)
                     .WithMany(d => d.listaPrestamos)
                     .HasForeignKey(d => d.IdLibro);
                    ci.HasKey(ci => ci.IdDetallePrestamo);
            });
            modelBuilder.Entity<VwLibro>().HasKey(ci => ci.IdLibro);
            modelBuilder.Entity<VwTotalEjemplar>().HasKey(ci => ci.IdLibro);
            modelBuilder.Entity<VwEjemplar>().HasKey(ci => ci.IdLibro);
            modelBuilder.Entity<VwDetallePrestamo>().HasKey(ci => ci.IdDetallePrestamo);
            modelBuilder.Entity<VwPrestamo>().HasKey(ci => ci.IdPrestamo);
        }

        public DbSet<Autor> tblAutor { get; set; }
        public DbSet<Categoria> tblCategoria { get; set; }
        public DbSet<Editorial> tblEditorial { get; set; }
        public DbSet<Libro> tblLibro { get; set; }
        public DbSet<Ejemplar> tblEjemplar { get; set; }
        public DbSet<Usuario> tblUsuario { get; set; }
        public DbSet<Prestamo> tblPrestamo { get; set; }
        public DbSet<DetallePrestamo> tblDetallePrestamo { get; set; }
        public DbSet<VwLibro> VwLibro { get; set; }
        public DbSet<VwTotalEjemplar> VwTotalEjemplar { get; set; }
        public DbSet<VwEjemplar> VwEjemplar { get; set; }
        public DbSet<VwDetallePrestamo> VwDetallePrestamo { get; set; }
        public DbSet<VwPrestamo> VwPrestamo { get; set; }
    }
}
