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

namespace Aplicacion.DetallesPrestamos
{
    public class EditarDetallePrestamo
    {
        public class Ejecuta : IRequest
        {
            public int IdDetallePrestamo { get; set; }
            public int Cantidad { get; set; }
            public int IdPrestamo { get; set; }
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
                var detalle = await _context.tblDetallePrestamo.FindAsync(request.IdDetallePrestamo);

                if (detalle == null)
                {
                    throw new ManejadorException(HttpStatusCode.NotFound, new { detalle = "No se encontró el detalle de préstamo" });
                }

                detalle.Cantidad = request.Cantidad;
                detalle.IdPrestamo = request.IdPrestamo;
                detalle.IdLibro = request.IdLibro;

                var resultado = await _context.SaveChangesAsync();

                if (resultado > 0)
                {
                    return Unit.Value;
                }

                throw new Exception("No se actualizaron los cambios en la tabla Detalle Préstamo");
            }
        }
    }
}
