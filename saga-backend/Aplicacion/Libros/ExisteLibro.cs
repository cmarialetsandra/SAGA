using Aplicacion.ManejadorError;
using Dominio;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;


namespace Aplicacion.Libros
{
    public class ExisteLibro
    {
        public class ExisteLibroValidacion : IRequest<Libro>
        {
            public string Titulo { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<ExisteLibroValidacion>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.Titulo).NotEmpty();
            }
        }
        public class Manejador : IRequestHandler<ExisteLibroValidacion, Libro>
        {
            private readonly SagaContext _context;

            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Libro> Handle(ExisteLibroValidacion request, CancellationToken cancellationToken)
            {
                var libro = await _context.Set<Libro>().OrderByDescending(t => t.IdLibro)
                     .Where(e => e.Titulo == request.Titulo)
                    .FirstOrDefaultAsync();

                if (libro != null)
                {
                    var errorMensaje = "No se puede guardar registros duplicados";
                    throw new ManejadorException(HttpStatusCode.MethodNotAllowed, new { errorMensaje });
                }
                else
                {
                    throw new ManejadorException(HttpStatusCode.OK);
                }

                throw new ManejadorException(HttpStatusCode.Unauthorized);
            }
        }
    }
}
