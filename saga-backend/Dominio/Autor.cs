using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dominio
{
    public class Autor
    {
        [Key]
        public int IdAutor { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public ICollection<Libro> listaLibros { get; set; } = new HashSet<Libro>();
    }
}
