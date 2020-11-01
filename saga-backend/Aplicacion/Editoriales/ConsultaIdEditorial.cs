using Dominio;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Editoriales
{
    public class ConsultaIdEditorial
    {
        public class EditorialUnico : IRequest<Editorial>
        {
            public int IdEditorial { get; set; }
        }

        public class Manejador : IRequestHandler<EditorialUnico, Editorial>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }
            public async Task<Editorial> Handle(EditorialUnico request, CancellationToken cancellationToken)
            {
                var editorial = await _context.tblEditorial.FindAsync(request.IdEditorial);
                return editorial;
            }
        }
    }
}
