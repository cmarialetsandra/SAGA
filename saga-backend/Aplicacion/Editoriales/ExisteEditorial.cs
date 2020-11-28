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


namespace Aplicacion.Editoriales
{
    public class ExisteEditorial
    {
        public class ExisteEditorialValidacion : IRequest<Editorial>
        {
            public string Nombre { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<ExisteEditorialValidacion>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.Nombre).NotEmpty();
            }
        }
        public class Manejador : IRequestHandler<ExisteEditorialValidacion, Editorial>
        {
            private readonly SagaContext _context;

            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Editorial> Handle(ExisteEditorialValidacion request, CancellationToken cancellationToken)
            {
                var editorial = await _context.Set<Editorial>().OrderByDescending(t => t.IdEditorial)
                     .Where(e => e.Nombre == request.Nombre)
                    .FirstOrDefaultAsync();

                if (editorial != null)
                {
                    var errorMensaje = "No se puede guardar registros duplicados";
                    throw new ManejadorException(HttpStatusCode.Forbidden, new { errorMensaje });
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
