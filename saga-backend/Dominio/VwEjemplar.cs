using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dominio
{
    public class VwEjemplar
    {
        public int IdLibro { get; set; }
        public string Titulo { get; set; }
        public int IdEjemplar { get; set; }
        public int Entrada { get; set; }
        public int Salida { get; set; }
        public int Stock { get; set; }
    }
}
