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
    public class ConsultaEjemplar
    {
        public class EjemplarUnico : IRequest<List<VwEjemplar>>
        {
            public int IdLibro { get; set; }
        }

        public class Manejador : IRequestHandler<EjemplarUnico, List<VwEjemplar>>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<List<VwEjemplar>> Handle(EjemplarUnico request, CancellationToken cancellationToken)
            {
                var ejemplar = await (from x in _context.VwEjemplar select new VwEjemplar { IdLibro = x.IdLibro, Titulo = x.Titulo,
                    IdEjemplar = x.IdEjemplar, Entrada = x.Entrada, Salida = x.Salida, Stock = x.Stock})
                    .Where(e => e.IdLibro == request.IdLibro).ToListAsync();
                return ejemplar;
            }
        }
    }    
}
