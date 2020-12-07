using Dominio;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.VistaEjemplares
{
    public class ConsultaVistaTotalEjemplar
    {
        public class ListaVistaTotalEjemplar : IRequest<List<VwTotalEjemplar>> { }

        public class Manejador : IRequestHandler<ListaVistaTotalEjemplar, List<VwTotalEjemplar>>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<List<VwTotalEjemplar>> Handle(ListaVistaTotalEjemplar request, CancellationToken cancellationToken)
            {
                var ejemplares = await _context.VwTotalEjemplar.ToListAsync();
                return ejemplares;
            }
        }
    }
}
