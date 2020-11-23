using Aplicacion.ManejadorError;
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
    public class EliminarAutor
    {
        public class Ejecuta : IRequest
        {
            public int IdAutor { get; set; }
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
                var autor = await _context.tblAutor.FindAsync(request.IdAutor);
                if (autor == null)
                {
                    //throw new Exception("No se pudo eliminar el autor");
                    throw new ManejadorException(HttpStatusCode.NotFound, new { autor = "No se encontró el autor" });
                }

                _context.Remove(autor);
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
