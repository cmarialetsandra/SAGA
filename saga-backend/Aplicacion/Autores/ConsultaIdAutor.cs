using Dominio;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
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
                return autor;
            }
        }
    }
}
