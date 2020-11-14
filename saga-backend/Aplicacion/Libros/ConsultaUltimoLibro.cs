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
    public class ConsultaUltimoLibro
    {
        public class LibroUltimo : IRequest<Libro>
        {
            public int IdLibro { get; set; }
        }

        public class Manejador : IRequestHandler<LibroUltimo, Libro>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Libro> Handle(LibroUltimo request, CancellationToken cancellationToken)
            {
                var libro = await _context.tblLibro.FindAsync();
                return libro;
            }
        }
    }
}
