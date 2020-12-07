using Aplicacion.ManejadorError;
using Dominio;
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
    public class ConsultaIdDetallePrestamo
    {
        public class DetallePrestamoUnico : IRequest<DetallePrestamo>
        {
            public int IdDetallePrestamo { get; set; }
        }

        public class Manejador : IRequestHandler<DetallePrestamoUnico, DetallePrestamo>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<DetallePrestamo> Handle(DetallePrestamoUnico request, CancellationToken cancellationToken)
            {
                var detallePrestamo = await _context.tblDetallePrestamo.FindAsync(request.IdDetallePrestamo);
                if (detallePrestamo == null)
                {
                    throw new ManejadorException(HttpStatusCode.NotFound, new { detallePrestamos = "No se encontró el detalle del prestamo" });
                }
                return detallePrestamo;
            }
        }
    }
}
