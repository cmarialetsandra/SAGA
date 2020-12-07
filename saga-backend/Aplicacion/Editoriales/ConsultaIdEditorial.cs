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
                if (editorial == null)
                {
                    throw new ManejadorException(HttpStatusCode.NotFound, new { editorial = "No se encontró la editorial" });
                }
                return editorial;
            }
        }
    }
}
