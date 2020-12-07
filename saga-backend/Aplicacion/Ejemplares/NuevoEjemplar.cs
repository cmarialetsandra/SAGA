using Dominio;
using FluentValidation;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Ejemplares
{
    public class NuevoEjemplar
    {
        public class InsertarEjemplar : IRequest
        {
            public int IdLibro { get; set; }
            public int Stock { get; set; }
            public int Entrada { get; set; }
            public int Salida { get; set; }
        }

        /*public class EjecutaValidacion : AbstractValidator<InsertarEjemplar>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.IdLibro).NotEmpty();
                RuleFor(x => x.Stock).NotEmpty();
                RuleFor(x => x.Entrada).NotEmpty();
                RuleFor(x => x.Salida).NotEmpty();
            }
        }*/

        public class Manejador : IRequestHandler<InsertarEjemplar>
        {
            private readonly SagaContext _context;

            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(InsertarEjemplar request, CancellationToken cancellationToken)
            {
                var ejemplar = new Ejemplar
                {
                    IdLibro = request.IdLibro,
                    Stock = request.Stock,
                    Entrada = request.Entrada,
                    Salida = request.Salida
                };

                _context.tblEjemplar.Add(ejemplar);

                var valor = await _context.SaveChangesAsync();

                if (valor > 0)
                {
                    return Unit.Value;
                }

                throw new Exception("No se pudo agregar el ejemplar");
            }
        }
    }
}
