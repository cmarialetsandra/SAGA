using Aplicacion.ManejadorError;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Prestamos
{
    public class EliminarPrestamo
    {
        public class Ejecuta : IRequest
        {
            public int IdPrestamo { get; set; }
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
                var prestamo = await _context.tblPrestamo.FindAsync(request.IdPrestamo);
                if (prestamo == null)
                {
                    //throw new Exception("No se pudo eliminar curso");
                    throw new ManejadorException(HttpStatusCode.NotFound, new { detalle = "No se encontró el préstamo" });
                }

                _context.Remove(prestamo);
                var resultado = await _context.SaveChangesAsync();
                if (resultado > 0)
                {
                    return Unit.Value;
                }
                throw new Exception("No se pudieron guardar los cambios");
            }
        }
    }
}
