using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dominio
{
    public class Editorial
    {
        [Key]
        public int IdEditorial { get; set; }
        public string Nombre { get; set; }
    }
}
