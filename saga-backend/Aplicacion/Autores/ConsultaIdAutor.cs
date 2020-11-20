using Aplicacion.ManejadorError;
using Dominio;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Autores
{
    public class ConsultaIdAutor
    {
        public class AutorUnico : IRequest<Autor>
        {
            public int IdAutor { get; set; }
        }

        public class Manejador : IRequestHandler<AutorUnico, Autor>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }
        
            public async Task<Autor> Handle(AutorUnico request, CancellationToken cancellationToken)
            {
                var autor = await _context.tblAutor.FindAsync(request.IdAutor);
                if (autor == null)
                {
                    throw new ManejadorException(HttpStatusCode.NotFound, new { autor = "No se encontró el autor" });
                }
                return autor;
            }
        }
    }
}
