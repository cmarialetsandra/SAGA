using Dominio;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Categorias
{
    public class ConsultaCategoria
    {
        public class ListaCategorias : IRequest<List<Categoria>> { }

        public class Manejador : IRequestHandler<ListaCategorias, List<Categoria>>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }
            public async Task<List<Categoria>> Handle(ListaCategorias request, CancellationToken cancellationToken)
            {
                var categorias = await _context.tblCategoria.ToListAsync();
                return categorias;
            }
        }
    }
}