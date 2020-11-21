using Aplicacion.ManejadorError;
using Dominio;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Seguridad
{
    public class Login
    {
        public class Ejecuta : IRequest<UsuarioData>
        {
            public string User { get; set; }
            public string Contrasenia { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<Ejecuta>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.User).NotEmpty();
                RuleFor(x => x.Contrasenia).NotEmpty();
            }
        }

        public class Manejador : IRequestHandler<Ejecuta, UsuarioData>
        {
            private readonly SagaContext _context;

            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<UsuarioData> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var user = await _context.Set<Usuario>().OrderByDescending(t => t.IdUsuario)
                    .Where(e => e.User == request.User && e.Contrasenia == request.Contrasenia)
                    .FirstOrDefaultAsync();

                if (user != null)
                {
                    return new UsuarioData
                    {
                        User = user.User,
                        Nombres = user.Nombres,
                        Apellidos = user.Apellidos,
                        Rol = user.Rol
                    };
                }
                else
                {
                    throw new ManejadorException(HttpStatusCode.NotFound, new { usuario = "No se encontró el usuario" });
                }

                throw new ManejadorException(HttpStatusCode.Unauthorized);
            }
        }
    }
}
