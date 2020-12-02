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
    public class ExisteLibroEditar
    {
        public class ExisteLibroEditarValidacion : IRequest<Libro>
        {
            public string Titulo { get; set; }
            public int IdAutor { get; set; }
            public int IdLibro { get; set; }
            public string ISBN { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<ExisteLibroEditarValidacion>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.Titulo).NotEmpty();
                RuleFor(x => x.IdAutor).NotEmpty();
                RuleFor(x => x.IdLibro).NotEmpty();
                RuleFor(x => x.ISBN).NotEmpty();
            }
        }
        public class Manejador : IRequestHandler<ExisteLibroEditarValidacion, Libro>
        {
            private readonly SagaContext _context;

            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Libro> Handle(ExisteLibroEditarValidacion request, CancellationToken cancellationToken)
            {
                var libro = await _context.Set<Libro>().OrderByDescending(t => t.IdLibro)
                     .Where(e => (e.Titulo == request.Titulo && e.IdAutor == request.IdAutor && e.IdLibro != request.IdLibro) || (e.ISBN == request.ISBN && e.IdLibro != request.IdLibro)  )
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