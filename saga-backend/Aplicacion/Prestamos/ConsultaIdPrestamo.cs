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

namespace Aplicacion.Prestamos
{
    public class ConsultaIdPrestamo
    {
        public class PrestamoUnico : IRequest<Prestamo>
        {
            public int IdPrestamo { get; set; }
        }

        public class Manejador : IRequestHandler<PrestamoUnico, Prestamo>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Prestamo> Handle(PrestamoUnico request, CancellationToken cancellationToken)
            {
                var prestamo = await _context.tblPrestamo.FindAsync(request.IdPrestamo);
                if (prestamo == null)
                {
                    throw new ManejadorException(HttpStatusCode.NotFound, new { prestamo = "No se encontró el prestamo" });
                }
                return prestamo;
            }
        }
    }
}
