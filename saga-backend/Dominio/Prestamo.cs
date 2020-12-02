using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dominio
{
    public class Prestamo
    {
        [Key]
        public int IdPrestamo { get; set; }
        public int IdUsuario { get; set; }
        public Usuario tblUsuario { get; set; }
        public DateTime FechaEmision { get; set; }
        public DateTime FechaVencimiento { get; set; }
        public DateTime? FechaDevolucion { get; set; }
        public int Estado { get; set; }
        public ICollection<DetallePrestamo> listaPrestamos { get; set; } = new HashSet<DetallePrestamo>();
    }
}
