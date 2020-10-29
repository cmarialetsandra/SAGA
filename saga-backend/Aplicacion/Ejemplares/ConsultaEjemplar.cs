using Dominio;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Ejemplares
{
    public class ConsultaEjemplar
    {
        public class ListaEjemplares : IRequest<List<Ejemplar>> { }

        public class Manejador : IRequestHandler<ListaEjemplares, List<Ejemplar>>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<List<Ejemplar>> Handle(ListaEjemplares request, CancellationToken cancellationToken)
            {
                var ejemplares = await _context.tblEjemplar.ToListAsync();
                return ejemplares;
            }
        }
    }
}
