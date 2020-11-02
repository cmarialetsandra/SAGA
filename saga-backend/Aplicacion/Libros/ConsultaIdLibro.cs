using Dominio;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Libros
{
    public class ConsultaIdLibro
    {
        public class LibroUnico : IRequest<Libro>
        {
            public int IdLibro { get; set; }
        }

        public class Manejador : IRequestHandler<LibroUnico, Libro>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Libro> Handle(LibroUnico request, CancellationToken cancellationToken)
            {
                var libro = await _context.tblLibro.FindAsync(request.IdLibro);
                return libro;
            }
        }
    }
}
