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
            modelBuilder.Entity<Libro>().HasKey(ci => new { ci.IdLibro, ci.IdAutor, ci.IdCategoria, ci.IdEditorial });
            modelBuilder.Entity<Ejemplar>().HasKey(ci => new { ci.IdEjemplar, ci.IdLibro });
            modelBuilder.Entity<Usuario>().HasKey(ci => ci.IdUsuario);
            modelBuilder.Entity<Prestamo>().HasKey(ci => new { ci.IdPrestamo, ci.IdUsuario });
            modelBuilder.Entity<DetallePrestamo>().HasKey(ci => new {ci.IdDetallePrestamo, ci.IdPrestamo, ci.IdLibro});

            /*modelBuilder.Entity<DetallePrestamo>(ci => { ci.HasOne(d => d.tblPrestamo)
                     .WithMany(p => p.listaPrestamos)
                     .HasForeignKey(d => d.IdPrestamo)
                     .HasConstraintName("FK_tblDetallePrestamo_tblPrestamo");
                     ci.HasOne(d => d.tblLibro)
                     .WithMany(p => p.listaPrestamos)
                     .HasForeignKey(d => d.IdLibro)
                     .HasConstraintName("FK_tblDetallePrestamo_tblLibro");
                    ci.HasKey(ci => ci.IdDetallePrestamo);
            });*/
        }

        public DbSet<Autor> tblAutor { get; set; }
        public DbSet<Categoria> tblCategoria { get; set; }
        public DbSet<Editorial> tblEditorial { get; set; }
        public DbSet<Libro> tblLibro { get; set; }
        public DbSet<Ejemplar> tblEjemplar { get; set; }
        public DbSet<Usuario> tblUsuario { get; set; }
        public DbSet<Prestamo> tblPrestamo { get; set; }
        public DbSet<DetallePrestamo> tblDetallePrestamo { get; set; }

    }
}
