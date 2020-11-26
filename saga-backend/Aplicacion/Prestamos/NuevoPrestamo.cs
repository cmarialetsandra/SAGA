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

namespace Aplicacion.Prestamos
{
    public class NuevoPrestamo
    {
        public class InsertarPrestamo : IRequest<Prestamo>
        {
            public int IdUsuario { get; set; }
            public DateTime FechaEmision { get; set; }
            public DateTime FechaVencimiento { get; set; }
            public DateTime FechaDevolucion { get; set; }
            public bool Estado { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<InsertarPrestamo>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.IdUsuario).NotEmpty();
                RuleFor(x => x.FechaEmision).NotEmpty();
                RuleFor(x => x.FechaVencimiento).NotEmpty();
                RuleFor(x => x.Estado).NotEmpty();
            }
        }

        public class Manejador : IRequestHandler<InsertarPrestamo,Prestamo>
        {
            private readonly SagaContext _context;
            
            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Prestamo> Handle(InsertarPrestamo request, CancellationToken cancellationToken)
            {
                var prestamo = new Prestamo
                {
                    IdUsuario = request.IdUsuario,
                    FechaEmision = request.FechaEmision,
                    FechaVencimiento = request.FechaVencimiento,
                    Estado = request.Estado
                };

                _context.tblPrestamo.Add(prestamo);

                var valor = await _context.SaveChangesAsync();

                if (valor > 0)
                {
                    return prestamo;
                }

                throw new Exception("No se pudo apregar el préstamo");
            }
        }
    }
}
