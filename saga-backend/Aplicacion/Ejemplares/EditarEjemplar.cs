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
namespace Aplicacion.Ejemplares
{
    public class EditarEjemplar
    {
        public class Ejecuta : IRequest
        {
            public int IdEjemplar { get; set; }
            public int IdLibro { get; set; }
            public int Stock { get; set; }
            public int Entrada { get; set; }
            public int Salida { get; set; }
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
                var ejemplar = await _context.tblEjemplar.FindAsync(request.IdEjemplar);

                if (ejemplar == null)
                {
                    throw new ManejadorException(HttpStatusCode.NotFound, new { ejemplar = "No se encontró el ejemplar" });
                }

                ejemplar.IdLibro = request.IdLibro;
                ejemplar.Stock = request.Stock;
                ejemplar.Entrada = request.Entrada;
                ejemplar.Salida = request.Salida;

                var resultado = await _context.SaveChangesAsync();

                if (resultado > 0)
                {
                    return Unit.Value;
                }

                throw new Exception("No se actualizaron los cambios en la tabla Ejemplar");
            }
        }
    }
}
