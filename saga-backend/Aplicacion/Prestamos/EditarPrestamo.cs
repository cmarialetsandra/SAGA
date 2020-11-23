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

namespace Aplicacion.Prestamos
{
    public class EditarPrestamo
    {
        public class Ejecuta : IRequest
        {
            public int IdPrestamo { get; set; }
            public int IdUsuario { get; set; }
            public DateTime FechaEmision { get; set; }
            public DateTime FechaVencimiento { get; set; }
            public DateTime FechaDevolucion { get; set; }
            public bool Estado { get; set; }
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
                    throw new ManejadorException(HttpStatusCode.NotFound, new { prestamo = "No se encontró el prèstamo" });
                }

                //prestamo.IdUsuario = request.IdUsuario;
                //prestamo.FechaEmision = request.FechaEmision;
                //prestamo.FechaVencimiento = request.FechaVencimiento;
                //prestamo.FechaDevolucion = request.FechaDevolucion;
                //prestamo.Estado = request.Estado ;

                prestamo.IdUsuario = request.IdUsuario != 0 ? request.IdUsuario : prestamo.IdUsuario;
                prestamo.FechaEmision = request.FechaEmision;
                prestamo.FechaVencimiento = request.FechaVencimiento;
                prestamo.FechaDevolucion = request.FechaDevolucion;
                prestamo.Estado = request.Estado != true || false ? request.Estado : prestamo.Estado;

                var resultado = await _context.SaveChangesAsync();

                if (resultado > 0)
                {
                    return Unit.Value;
                }

                throw new Exception("No se actualizaron los cambios en la tabla Prestamo");
            }
        }

    }
}
