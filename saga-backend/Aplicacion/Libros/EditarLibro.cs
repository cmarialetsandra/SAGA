using Aplicacion.ManejadorError;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
namespace Aplicacion.Libros
{
    public class EditarLibro
    {
        public class Ejecuta : IRequest
        {
            public int IdLibro { get; set; }
            public string Titulo { get; set; }
            public string Descripcion { get; set; }
            public int CantidadPaginas { get; set; }
            public string ISBN { get; set; }
            public int AnioPublicacion { get; set; }
            public int IdAutor { get; set; }
            public int IdEditorial { get; set; }
            public int IdCategoria { get; set; }
        }

        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly SagaContext _context;

            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var libro = await _context.tblLibro.FindAsync(request.IdLibro);

                if (libro == null)
                {
                    throw new ManejadorException(HttpStatusCode.NotFound, new { editorial = "No se encontró el libro" });
                }

                libro.Titulo = request.Titulo ?? libro.Titulo;
                libro.Descripcion = request.Descripcion ?? libro.Descripcion;
                libro.CantidadPaginas = request.CantidadPaginas != 0 ? request.CantidadPaginas : libro.CantidadPaginas;
                libro.ISBN = request.ISBN ?? libro.ISBN;
                libro.AnioPublicacion = request.AnioPublicacion != 0 ? request.AnioPublicacion : libro.AnioPublicacion;
                libro.IdAutor = request.IdAutor != 0 ? request.IdAutor : libro.IdAutor;
                libro.IdEditorial = request.IdEditorial != 0 ? request.IdEditorial : libro.IdEditorial;
                libro.IdCategoria = request.IdCategoria != 0 ? request.IdCategoria : libro.IdCategoria;

                var resultado = await _context.SaveChangesAsync();

                if (resultado > 0)
                {
                    return Unit.Value;
                }

                throw new Exception("No se actualizaron los cambios en la tabla Libro");
            }
        }
    }
}
