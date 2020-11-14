using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio
{
    public class VwLibro
    {
        public int IdLibro { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public int CantidadPaginas { get; set; }
        public string ISBN { get; set; }
        public int AnioPublicacion { get; set; }
        public int IdAutor { get; set; }
        public int IdEditorial { get; set; }
        public int IdCategoria { get; set; }
        public int AutorId { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public int EditorialId { get; set; }
        public string Nombre { get; set; }
        public int CategoriaId { get; set; }
        public string NombreCategoria { get; set; }
    }
}
