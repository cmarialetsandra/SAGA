using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dominio
{
    public class Ejemplar
    {
        [Key]
        public int IdEjemplar { get; set; }
        public int IdLibro { get; set; }
        public Libro tblLibro { get; set; }
        public int Stock { get; set; }
        public int Entrada { get; set; }
        public int Salida { get; set; }
    }
}
