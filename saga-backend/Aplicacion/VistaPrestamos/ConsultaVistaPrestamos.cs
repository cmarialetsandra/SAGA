using Dominio;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.VistaPrestamos
{
    public class ConsultaVistaPrestamos
    {
        public class ListaVistaPrestamos : IRequest<List<VwPrestamo>> { }

        public class Manejador : IRequestHandler<ListaVistaPrestamos, List<VwPrestamo>>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<List<VwPrestamo>> Handle(ListaVistaPrestamos request, CancellationToken cancellationToken)
            {
                var prestamos = await _context.VwPrestamo.ToListAsync();
                return prestamos;
            }
        }
    }
}
