using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dominio
{
    public class Categoria
    {
        [Key]
        public int IdCategoria { get; set; }
        public string NombreCategoria { get; set; }
        public ICollection<Libro> listaLibros { get; set; } = new HashSet<Libro>();
    }
}
