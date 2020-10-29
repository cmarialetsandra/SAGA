using Dominio;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Usuarios
{
    public class ConsultaUsuario
    {
        public class ListaUsuarios : IRequest<List<Usuario>> { }

        public class Manejador : IRequestHandler<ListaUsuarios, List<Usuario>>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<List<Usuario>> Handle(ListaUsuarios request, CancellationToken cancellationToken)
            {
                var usuarios = await _context.tblUsuario.ToListAsync();
                return usuarios;
            }
        }
    }
}
