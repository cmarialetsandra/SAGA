using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dominio
{
    public class DetallePrestamo
    {
        [Key]
        public int IdDetallePrestamo { get; set; }
        public int Cantidad { get; set; }
        public int IdPrestamo { get; set; }
        public Prestamo tblPrestamo { get; set; }
        public int IdLibro { get; set; }
        public Libro tblLibro { get; set; }
    }
}
