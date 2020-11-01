using Dominio;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Categorias
{
    public class NuevaCategoria
    {
        public class InsertarCategoria: IRequest
        {
            public string NombreCategoria { get; set; }
        }

        public class Manejador : IRequestHandler<InsertarCategoria>
        {
            private readonly SagaContext _context;

            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(InsertarCategoria request, CancellationToken cancellationToken)
            {
                var categoria = new Categoria
                {
                    NombreCategoria = request.NombreCategoria
                };

                _context.tblCategoria.Add(categoria);

                var valor = await _context.SaveChangesAsync();

                if (valor > 0)
                {
                    return Unit.Value;
                }

                throw new Exception("No se pudo apregar la categoría");
            }
        }
    }
}
