using Aplicacion.ManejadorError;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
namespace Aplicacion.Libros
{
    public class EliminarLibro
    {
        public class Ejecuta : IRequest
        {
            public int IdLibro { get; set; }
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
                var libro = await _context.tblLibro.FindAsync(request.IdLibro);
                if (libro == null)
                {
                    throw new ManejadorException(HttpStatusCode.NotFound, new { libro = "No se encontró el libro" });
                }

                _context.Remove(libro);
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
