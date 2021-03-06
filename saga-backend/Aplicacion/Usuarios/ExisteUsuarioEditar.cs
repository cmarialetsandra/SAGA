﻿using Aplicacion.ManejadorError;
using Dominio;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Usuarios
{
    public class ExisteUsuarioEditar
    {
        public class ExisteUsuarioValidacion : IRequest<Usuario>
        {
            public int IdUsuario { get; set; }
            public string User { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<ExisteUsuarioValidacion>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.User).NotEmpty();
                RuleFor(x => x.IdUsuario).NotEmpty();
            }
        }
        public class Manejador : IRequestHandler<ExisteUsuarioValidacion, Usuario>
        {
            private readonly SagaContext _context;

            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Usuario> Handle(ExisteUsuarioValidacion request, CancellationToken cancellationToken)
            {
                var usuario = await _context.Set<Usuario>().OrderByDescending(t => t.IdUsuario)
                     .Where(e => e.User == request.User && e.IdUsuario != request.IdUsuario)
                    .FirstOrDefaultAsync();

                if (usuario != null)
                {
                    var errorMensaje = "No se puede guardar registros duplicados";
                    throw new ManejadorException(HttpStatusCode.MethodNotAllowed, new { errorMensaje });
                }
                else
                {
                    throw new ManejadorException(HttpStatusCode.OK);
                }

                throw new ManejadorException(HttpStatusCode.Unauthorized);
            }

        }
    }
}
