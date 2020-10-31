using Dominio;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Prestamos
{
    public class NuevoPrestamo
    {
        public class InsertarPrestamo : IRequest
        {
            public int IdUsuario { get; set; }
            public DateTime FechaEmision { get; set; }
            public DateTime FechaVencimiento { get; set; }
            public DateTime FechaDevolucion { get; set; }
            public bool Estado { get; set; }
        }

        public class Manejador : IRequestHandler<InsertarPrestamo>
        {
            private readonly SagaContext _context;

            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(InsertarPrestamo request, CancellationToken cancellationToken)
            {
                var prestamo = new Prestamo
                {
                    IdUsuario = request.IdUsuario,
                    FechaEmision = request.FechaEmision,
                    FechaVencimiento = request.FechaVencimiento,
                    FechaDevolucion = request.FechaDevolucion,
                    Estado = request.Estado
                };

                _context.tblPrestamo.Add(prestamo);

                var valor = await _context.SaveChangesAsync();

                if (valor > 0)
                {
                    return Unit.Value;
                }

                throw new Exception("No se pudo apregar el préstamo");
            }
        }
    }
}
