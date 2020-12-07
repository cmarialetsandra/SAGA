using Dominio;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Editoriales
{
    public class ConsultaEditorial
    {
        public class ListaEditoriales : IRequest<List<Editorial>> { }

        public class Manejador : IRequestHandler<ListaEditoriales, List<Editorial>>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<List<Editorial>> Handle(ListaEditoriales request, CancellationToken cancellationToken)
            {
                var editoriales = await _context.tblEditorial.ToListAsync();
                return editoriales;
            }
        }
    }
}
