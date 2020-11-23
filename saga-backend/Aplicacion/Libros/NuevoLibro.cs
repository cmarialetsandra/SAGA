using Dominio;
using FluentValidation;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Libros
{
    public class NuevoLibro
    {
        public class InsertarLibro : IRequest
        {
            public string Titulo { get; set; }
            public string Descripcion { get; set; }
            public int CantidadPaginas { get; set; }
            public string ISBN { get; set; }
            public int AnioPublicacion { get; set; }
            public int IdAutor { get; set; }
            public int IdEditorial { get; set; }
            public int IdCategoria { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<InsertarLibro>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.Titulo).NotEmpty();
                RuleFor(x => x.Descripcion).NotEmpty();
                RuleFor(x => x.CantidadPaginas).NotEmpty();
                RuleFor(x => x.ISBN).NotEmpty();
                RuleFor(x => x.AnioPublicacion).NotEmpty();
                RuleFor(x => x.IdAutor).NotEmpty();
                RuleFor(x => x.IdEditorial).NotEmpty();
                RuleFor(x => x.IdCategoria).NotEmpty();
            }
        }

        public class Manejador : IRequestHandler<InsertarLibro>
        {
            private readonly SagaContext _context;

            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public  async Task<Unit> Handle(InsertarLibro request, CancellationToken cancellationToken)
            {
                var libro = new Libro
                {
                    Titulo = request.Titulo,
                    Descripcion = request.Descripcion,
                    CantidadPaginas = request.CantidadPaginas,
                    ISBN = request.ISBN,
                    AnioPublicacion = request.AnioPublicacion,
                    IdAutor = request.IdAutor,
                    IdEditorial = request.IdEditorial,
                    IdCategoria = request.IdCategoria
                };

                _context.tblLibro.Add(libro);

                var valor = await _context.SaveChangesAsync();

                if (valor > 0)
                {
                    return Unit.Value;
                }

                throw new Exception("No se pudo agregar el libro");
            }
        }


    }
}
