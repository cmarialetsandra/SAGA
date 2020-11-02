using Dominio;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using static Aplicacion.Categorias.ConsultaIdCategoria;

namespace Aplicacion.Categorias
{
    public class ConsultaIdCategoria
    {
        public class CategoriaUnica: IRequest<Categoria>
        {
           public int IdCategoria { get; set; }

        }

    }

    public class Manejador : IRequestHandler<CategoriaUnica, Categoria>
    {
        private readonly SagaContext _context;

        public Manejador (SagaContext context)
        {
            _context = context;
        }
        public async Task<Categoria> Handle(CategoriaUnica request, CancellationToken cancellationToken)
        {
            var categoria = await _context.tblCategoria.FindAsync(request.IdCategoria);
            return categoria;
        }
    }
}
