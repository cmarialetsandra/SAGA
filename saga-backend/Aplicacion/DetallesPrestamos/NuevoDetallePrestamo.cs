using Dominio;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.DetallesPrestamos
{
    public class NuevoDetallePrestamo
    {
        public class InsertarDetallePrestamo : IRequest
        {
            public int Cantidad { get; set; }
            public int IdPrestamo { get; set; }
            public int IdLibro { get; set; }
        }

        public class Manejador : IRequestHandler<InsertarDetallePrestamo>
        {
            private readonly SagaContext _context;

            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(InsertarDetallePrestamo request, CancellationToken cancellationToken)
            {
                var detallePrestamo = new DetallePrestamo
                {
                    Cantidad = request.Cantidad,
                    IdPrestamo = request.IdPrestamo,
                    IdLibro = request.IdLibro
                };

                _context.tblDetallePrestamo.Add(detallePrestamo);

                var valor = await _context.SaveChangesAsync();

                if (valor > 0)
                {
                    return Unit.Value;
                }

                throw new Exception("No se pudo apregar el detalle de préstamo");
            }
        }
    }
}
