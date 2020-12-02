using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio
{
    public class VwDetallePrestamo
    {
        public int IdDetallePrestamo { get; set; }
        public int Cantidad { get; set; }
        public int IdPrestamo { get; set; }
        public int IdLibro { get; set; }
        public string Titulo { get; set; }
        public int IdAutor { get; set; }
        public string NombreCompleto { get; set; }
        public int IdCategoria { get; set; }
        public string NombreCategoria { get; set; }
    }
}
