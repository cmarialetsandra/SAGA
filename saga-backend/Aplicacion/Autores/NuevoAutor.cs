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

namespace Aplicacion.Autores
{
    public class NuevoAutor
    {
        public class InsertarAutor : IRequest
        {
            public string Nombres { get; set; }
            public string Apellidos { get; set; }
        }

        public class Manejador : IRequestHandler<InsertarAutor>
        {
            private readonly SagaContext _context;

            public class EjecutaValidacion : AbstractValidator<InsertarAutor>
            {
                public EjecutaValidacion()
                {
                    RuleFor(x => x.Nombres).NotEmpty();
                    RuleFor(x => x.Apellidos).NotEmpty();
                }
            }

            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(InsertarAutor request, CancellationToken cancellationToken)
            {
                var autor = new Autor
                {
                    Nombres = request.Nombres,
                    Apellidos = request.Apellidos
                };

                _context.tblAutor.Add(autor);

                var valor = await _context.SaveChangesAsync();
                
                if(valor > 0)
                {
                    return Unit.Value;
                }

                throw new Exception("No se pudo apregar el autor");
            }
        }
    }
}
