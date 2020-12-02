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
       // [Required(ErrorMessage ="Favor ingrese el nombre")]
        public string Nombre { get; set; }
        public ICollection<Libro> listaLibros { get; set; } = new HashSet<Libro>();
    }
}
