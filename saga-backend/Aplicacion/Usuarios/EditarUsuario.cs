using Aplicacion.ManejadorError;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
namespace Aplicacion.Usuarios
{
    public class EditarUsuario
    {
        public class Ejecuta : IRequest
        {
            public int IdUsuario { get; set; }
            public string User { get; set; }
            public string Contrasenia { get; set; }
            public string Nombres { get; set; }
            public string Apellidos { get; set; }
            public int Rol { get; set; }
        }

        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly SagaContext _context;

            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var usuario = await _context.tblUsuario.FindAsync(request.IdUsuario);

                if (usuario == null)
                {
                    throw new ManejadorException(HttpStatusCode.NotFound, new { usuario = "No se encontró el usuario" });
                }

                usuario.User = request.User ?? usuario.User;
                usuario.Contrasenia = request.Contrasenia ?? usuario.Contrasenia;
                usuario.Nombres = request.Nombres ?? usuario.Nombres;
                usuario.Apellidos = request.Apellidos ?? usuario.Apellidos;

                usuario.Rol = request.Rol != 0 ? request.Rol : usuario.Rol;
                
                var resultado = await _context.SaveChangesAsync();

                if (resultado > 0)
                {
                    return Unit.Value;
                }

                throw new Exception("No se actualizaron los cambios en la tabla Usuario");
            }
        }
    }
}
