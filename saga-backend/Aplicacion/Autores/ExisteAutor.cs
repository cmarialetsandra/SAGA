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


namespace Aplicacion.Autores
{
    public class ExisteAutor
    {
        public class ExisteAutorValidacion : IRequest<Autor>
        {
            public int IdAutor { get; set; }
            public string Nombres { get; set; }
            public string Apellidos { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<ExisteAutorValidacion>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.Nombres).NotEmpty();
                RuleFor(x => x.Apellidos).NotEmpty();
            }
        }
        public class Manejador : IRequestHandler<ExisteAutorValidacion, Autor>
        {
            private readonly SagaContext _context;

            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Autor> Handle(ExisteAutorValidacion request, CancellationToken cancellationToken)
            {
                var autor = await _context.Set<Autor>().OrderByDescending(t => t.IdAutor)
                     .Where(e => e.Nombres == request.Nombres || e.Apellidos == request.Apellidos)
                    .FirstOrDefaultAsync();


                if (autor != null)
                {
                    var errorMensaje = "No se puede guardar registros duplicados";
                    throw new ManejadorException(HttpStatusCode.OK, new { errorMensaje });
                }
                else
                {
                    throw new ManejadorException(HttpStatusCode.Forbidden);
                }

                throw new ManejadorException(HttpStatusCode.Unauthorized);
            }
        }
    }
}
