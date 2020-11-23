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

namespace Aplicacion.Autores
{
    public class EditarAutor
    {
        public class Ejecuta : IRequest
        {
            public int IdAutor { get; set; }
            public string Nombres { get; set; }
            public string Apellidos { get; set; }
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
                var autor = await _context.tblAutor.FindAsync(request.IdAutor);

                if (autor == null)
                {
                    throw new ManejadorException(HttpStatusCode.NotFound, new { autor = "No se encontró el autor" });
                }

                autor.Nombres = request.Nombres ?? autor.Nombres;
                autor.Apellidos = request.Apellidos ?? autor.Apellidos;

                var resultado = await _context.SaveChangesAsync();

                if (resultado > 0)
                {
                    return Unit.Value;
                }

                throw new Exception("No se actualizaron los cambios en la tabla Autor");
            }
        }

    }
}
