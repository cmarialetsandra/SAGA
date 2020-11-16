using Dominio;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Usuarios
{
    public class ConsultaIdLibro
    {
        public class UsuarioUnico : IRequest<Usuario>
        {
            public int IdUsuario { get; set; }
        }

        public class Manejador : IRequestHandler<UsuarioUnico, Usuario>
        {
            private readonly SagaContext _context;
            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Usuario> Handle(UsuarioUnico request, CancellationToken cancellationToken)
            {
                var usuario = await _context.tblUsuario.FindAsync(request.IdUsuario);
                return usuario;
            }
        }
    }    
}
