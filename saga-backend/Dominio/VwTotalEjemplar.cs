using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio
{
    public class VwTotalEjemplar
    {
        public int IdLibro { get; set; }
        public string Titulo { get; set; }
        public int TotalEntradas { get; set; }
        public int TotalSalida { get; set; }
        public int TotalStock { get; set; }
    }
}
