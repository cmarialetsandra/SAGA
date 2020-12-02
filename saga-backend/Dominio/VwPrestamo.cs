using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio
{
    public class VwPrestamo
    {
        public int IdPrestamo { get; set; }
        public int IdUsuario { get; set; }
        public DateTime FechaEmision { get; set; }
        public DateTime FechaVencimiento { get; set; }
        public DateTime? FechaDevolucion { get; set; }
        public int Estado { get; set; }
        public string User { get; set; }
        public string NombreCompleto { get; set; }
    }
}
