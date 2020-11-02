using Dominio;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.DetallesPrestamos
{
    public class ConsultaDetallePrestamo
    {
        public class ListaDetallePrestamo : IRequest<List<DetallePrestamo>> { }

        public class Manejador : IRequestHandler<ListaDetallePrestamo, List<DetallePrestamo>>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }
            public async Task<List<DetallePrestamo>> Handle(ListaDetallePrestamo request, CancellationToken cancellationToken)
            {                
                var detallesPrestamos = await _context.tblDetallePrestamo.ToListAsync();
                return detallesPrestamos;
            }
        }
    }
}
