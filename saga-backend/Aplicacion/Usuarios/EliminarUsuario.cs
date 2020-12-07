using Aplicacion.ManejadorError;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
namespace Aplicacion.Usuarios
{
    public class EliminarUsuario
    {
        public class Ejecuta : IRequest
        {
            public int IdUsuario { get; set; }
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

                _context.Remove(usuario);
                var resultado = await _context.SaveChangesAsync();
                if (resultado > 0)
                {
                    return Unit.Value;
                }
                throw new Exception("No se pudieron guardar los cambios");
            }
        }
    }
}
