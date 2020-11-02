using Dominio;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Usuarios
{
    public class NuevoUsuario
    {
        public class InsertarUsuario : IRequest
        {
            public string User { get; set; }
            public string Contrasenia { get; set; }
            public string Nombres { get; set; }
            public string Apellidos { get; set; }
            public int Rol { get; set; }
        }

        public class Manejador : IRequestHandler<InsertarUsuario>
        {
            private readonly SagaContext _context;

            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(InsertarUsuario request, CancellationToken cancellationToken)
            {
                var usuario = new Usuario
                {
                    User = request.User,
                    Contrasenia = request.Contrasenia,
                    Nombres = request.Nombres,
                    Apellidos = request.Apellidos,
                    Rol = request.Rol
                };

                _context.tblUsuario.Add(usuario);

                var valor = await _context.SaveChangesAsync();

                if (valor > 0)
                {
                    return Unit.Value;
                }

                throw new Exception("No se pudo agregar el usuario");
            }
        }
    }
}
