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
namespace Aplicacion.Categorias
{
    public class EditarCategoria
    {
        public class Ejecuta : IRequest
        {
            public int IdCategoria { get; set; }
            public string NombreCategoria { get; set; }
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
                var categoria = await _context.tblCategoria.FindAsync(request.IdCategoria);

                if (categoria == null)
                {
                    throw new ManejadorException(HttpStatusCode.NotFound, new { categoria = "No se encontró la categoría" });
                }

                categoria.NombreCategoria = request.NombreCategoria ?? categoria.NombreCategoria;

                var resultado = await _context.SaveChangesAsync();

                if (resultado > 0)
                {
                    return Unit.Value;
                }

                throw new Exception("No se guardaron los cambios en la tabla Categoría");
            }
        }
    }
}
