using Aplicacion.ManejadorError;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
namespace Aplicacion.Ejemplares
{
    public class EliminarEjemplar
    {
        public class Ejecuta : IRequest
        {
            public int IdEjemplar { get; set; }
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
                var ejemplar = await _context.tblEjemplar.FindAsync(request.IdEjemplar);
                if (ejemplar == null)
                {
                    throw new ManejadorException(HttpStatusCode.NotFound, new { ejemplar = "No se encontró el ejemplar" });
                }

                _context.Remove(ejemplar);
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
