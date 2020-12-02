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


namespace Aplicacion.Categorias   
{
    public class ExisteCategoria
    {
        public class ExisteCategoriaValidacion : IRequest<Categoria>
        {
            public string NombreCategoria { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<ExisteCategoriaValidacion>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.NombreCategoria).NotEmpty();
            }
        }
        public class Manejador : IRequestHandler<ExisteCategoriaValidacion, Categoria>
        {
            private readonly SagaContext _context;

            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Categoria> Handle(ExisteCategoriaValidacion request, CancellationToken cancellationToken)
            {
                var categoria = await _context.Set<Categoria>().OrderByDescending(t => t.IdCategoria)
                     .Where(e => e.NombreCategoria == request.NombreCategoria)
                    .FirstOrDefaultAsync();

                if (categoria != null)
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
