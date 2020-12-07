using Aplicacion.ManejadorError;
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
    public class EliminarEditorial
    {
        public class Ejecuta : IRequest
        {
            public int IdEditorial { get; set; }
        }
        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly SagaContext _context;

            public Manejador(SagaContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var editorial = await _context.tblEditorial.FindAsync(request.IdEditorial);
                if (editorial == null)
                {
                    //throw new Exception("No se pudo eliminar curso");
                    throw new ManejadorException(HttpStatusCode.NotFound, new { editorial = "No se encontró la editorial" });
                }

                _context.Remove(editorial);
                var resultado = await _context.SaveChangesAsync();
                if (resultado > 0)
                {
                    return Unit.Value;
                }
                throw new Exception("No se pudieron guardar los cambios");
            }
        }
    }
}
