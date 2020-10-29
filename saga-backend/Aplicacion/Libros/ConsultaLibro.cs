using Dominio;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Libros
{
    public class ConsultaLibro
    {
        public class ListaLibros : IRequest<List<Libro>> { }

        public class Manejador : IRequestHandler<ListaLibros, List<Libro>>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<List<Libro>> Handle(ListaLibros request, CancellationToken cancellationToken)
            {
                var libros = await _context.tblLibro.ToListAsync();
                return libros;
            }
        }
    }
}
