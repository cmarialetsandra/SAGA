using Dominio;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.VistaLibros
{
    public class ConsultaVistaTotalLibros
    {
        public class ListaVistaLibros : IRequest<List<VwLibro>> { }

        public class Manejador : IRequestHandler<ListaVistaLibros, List<VwLibro>>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<List<VwLibro>> Handle(ListaVistaLibros request, CancellationToken cancellationToken)
            {
                var libros = await _context.VwLibro.ToListAsync();
                return libros;
            }
        }
    }
}
