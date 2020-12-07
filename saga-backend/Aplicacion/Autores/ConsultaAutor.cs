using Dominio;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Autores
{
    public class ConsultaAutor
    {
        public class ListaAutores : IRequest<List<Autor>> { }

        public class Manejador : IRequestHandler<ListaAutores, List<Autor>>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }
            public async Task<List<Autor>> Handle(ListaAutores request, CancellationToken cancellationToken)
            {
                var autores = await _context.tblAutor.ToListAsync();
                return autores;
            }
        }
    }
}
