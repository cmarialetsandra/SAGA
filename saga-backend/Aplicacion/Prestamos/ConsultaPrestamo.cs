using Dominio;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Prestamos
{
    public class ConsultaPrestamo
    {
        public class ListaPrestamos: IRequest<List<Prestamo>> { }

        public class Manejador : IRequestHandler<ListaPrestamos, List<Prestamo>>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<List<Prestamo>> Handle(ListaPrestamos request, CancellationToken cancellationToken)
            {
                var prestamos = await _context.tblPrestamo.ToListAsync();
                return prestamos;
            }
        }
    }
}
