using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dominio
{
    public class Usuario
    {
        [Key]
        public int IdUsuario { get; set; }
        public string User { get; set; }
        public string Contrasenia { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public int Rol { get; set; }
    }
}
