using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dominio
{
    public class Libro
    {
        [Key]
        public int IdLibro { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public int CantidadPaginas { get; set; }
        public string ISBN { get; set; }
        public int AnioPublicacion { get; set; }
        public int IdAutor { get; set; }
        public Autor tblAutor { get; set; }
        public int IdEditorial { get; set; }
        public Editorial tblEditorial { get; set; }
        public int IdCategoria { get; set; }
        public Categoria tblCategoria { get; set; }
        public ICollection<DetallePrestamo> listaPrestamos { get; set; } = new HashSet<DetallePrestamo>();
        public ICollection<Ejemplar> listaEjemplares { get; set; } = new HashSet<Ejemplar>();
    }
}
