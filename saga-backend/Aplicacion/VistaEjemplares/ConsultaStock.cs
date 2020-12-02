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

namespace Aplicacion.VistaEjemplares
{
    public class ConsultaStock
    {
        public class UltimoStock : IRequest<VwEjemplar>
        {
            public int IdLibro { get; set; }
        }

        public class Manejador : IRequestHandler<UltimoStock, VwEjemplar>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<VwEjemplar> Handle(UltimoStock request, CancellationToken cancellationToken)
            {
                var stock = await _context.Set<VwEjemplar>().OrderByDescending(t => t.IdEjemplar)
                    .Where(e => e.IdLibro == request.IdLibro)
                    .FirstOrDefaultAsync();
                return stock;
            }
        }
    }    
}
