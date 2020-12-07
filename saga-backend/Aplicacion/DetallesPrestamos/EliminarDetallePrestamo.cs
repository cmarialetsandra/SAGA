using Aplicacion.ManejadorError;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.DetallesPrestamos
{
    public class EliminarDetallePrestamo
    {
        public class Ejecuta : IRequest
        {
            public int IdDetallePrestamo { get; set; }
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
                var detalle = await _context.tblDetallePrestamo.FindAsync(request.IdDetallePrestamo);
                if (detalle == null)
                {
                    //throw new Exception("No se pudo eliminar curso");
                    throw new ManejadorException(HttpStatusCode.NotFound, new { detalle = "No se encontró el detalle de préstamo" });
                }

                _context.Remove(detalle);
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
