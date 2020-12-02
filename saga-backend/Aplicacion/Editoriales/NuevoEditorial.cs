using Dominio;
using FluentValidation;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Editoriales
{
    public class NuevoEditorial
    {
        public class InsertarEditorial : IRequest
        {
            public string Nombre { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<InsertarEditorial>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.Nombre).NotEmpty();
            }
        }

        public class Manejador : IRequestHandler<InsertarEditorial>
        {
            private readonly SagaContext _context;

            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(InsertarEditorial request, CancellationToken cancellationToken)
            {
                var editorial = new Editorial
                {
                    Nombre = request.Nombre,
                };

                _context.tblEditorial.Add(editorial);

                var valor = await _context.SaveChangesAsync();

                if (valor > 0)
                {
                    return Unit.Value;
                }

                throw new Exception("No se pudo agregar la editorial");
            }
        }
    }
}
