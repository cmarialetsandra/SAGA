using MediatR;
using Persistencia;
using Dominio;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using Aplicacion.ManejadorError;
using System.Net;

namespace Aplicacion.VistaLibros
{
    public class ConsultaVistaIdLibro
    {
        public class LibroUnico : IRequest<VwLibro>
        {
            public int IdLibro { get; set; }
        }

        public class Manejador : IRequestHandler<LibroUnico, VwLibro>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<VwLibro> Handle(LibroUnico request, CancellationToken cancellationToken)
            {
                var libro = await _context.VwLibro.FindAsync(request.IdLibro);
                if (libro == null)
                {
                    throw new ManejadorException(HttpStatusCode.NotFound, new { libro = "No se encontró el libro" });
                }
                return libro;
            }
        }
    }
}
