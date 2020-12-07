using Aplicacion.ManejadorError;
using Dominio;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Ejemplares
{
    public class ConsultaIdEjemplar
    {
        public class EjemplarUnico : IRequest<Ejemplar>
        {
            public int IdEjemplar { get; set; }
        }

        public class Manejador : IRequestHandler<EjemplarUnico, Ejemplar>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Ejemplar> Handle(EjemplarUnico request, CancellationToken cancellationToken)
            {
                var ejemplar = await _context.tblEjemplar.FindAsync(request.IdEjemplar);
                if (ejemplar == null)
                {
                    throw new ManejadorException(HttpStatusCode.NotFound, new { ejemplar = "No se encontró el ejemplar" });
                }
                return ejemplar;
            }
        }
    }
}
