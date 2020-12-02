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

namespace Aplicacion.Prestamos
{
    public class ConsultaIdCliente
    {
        public class ListaPrestamos : IRequest<List<Prestamo>> {
            public int IdUsuario { get; set; }
        }

        public class Manejador : IRequestHandler<ListaPrestamos, List<Prestamo>>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<List<Prestamo>> Handle(ListaPrestamos request, CancellationToken cancellationToken)
            {
                var prestamos = await _context.Set<Prestamo>().OrderBy(t => t.IdPrestamo)
                    .Where(e => e.IdUsuario == request.IdUsuario).ToListAsync();
                return prestamos;
            }
        }
    }
}
