using Dominio;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.VistaDetalles
{
    public class ConsultaDetalleIdPrestamo
    {
        public class ListaDetallesPrestamos : IRequest<List<VwDetallePrestamo>>
        {
            public int IdPrestamo { get; set; }
        }

        public class Manejador : IRequestHandler<ListaDetallesPrestamos, List<VwDetallePrestamo>>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<List<VwDetallePrestamo>> Handle(ListaDetallesPrestamos request, CancellationToken cancellationToken)
            {
                var prestamos = await _context.Set<VwDetallePrestamo>().OrderBy(t => t.IdDetallePrestamo)
                    .Where(e => e.IdPrestamo == request.IdPrestamo).ToListAsync();
                return prestamos;
            }
        }
    }
}
