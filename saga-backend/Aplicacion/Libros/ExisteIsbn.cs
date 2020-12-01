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
    public class ExisteIsbn
    {
        public class ExisteLibroIsbnValidacion : IRequest<Libro>
        {
            public string ISBN { get; set; }

        }

        public class EjecutaValidacion : AbstractValidator<ExisteLibroIsbnValidacion>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.ISBN).NotEmpty();
            }
        }
        public class Manejador : IRequestHandler<ExisteLibroIsbnValidacion, Libro>
        {
            private readonly SagaContext _context;

            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Libro> Handle(ExisteLibroIsbnValidacion request, CancellationToken cancellationToken)
            {
                var isbn = await _context.Set<Libro>().OrderByDescending(t => t.IdLibro)
                     .Where(e => e.ISBN == request.ISBN)
                    .FirstOrDefaultAsync();

                if (isbn != null)
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
