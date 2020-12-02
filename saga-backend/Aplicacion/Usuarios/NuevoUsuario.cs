using Dominio;
using FluentValidation;
using MediatR;
using Persistencia;
using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Usuarios
{
    public class NuevoUsuario
    {
        public class InsertarUsuario : IRequest
        {
            public string User { get; set; }
            public string Contrasenia { get; set; }
            public string Nombres { get; set; }
            public string Apellidos { get; set; }
            public int Rol { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<InsertarUsuario>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.User).NotEmpty();
                RuleFor(x => x.Contrasenia).NotEmpty();
                RuleFor(x => x.Nombres).NotEmpty();
                RuleFor(x => x.Apellidos).NotEmpty();
                RuleFor(x => x.Rol).NotEmpty();
            }
        }
        public class Manejador : IRequestHandler<InsertarUsuario>
        {
            private readonly SagaContext _context;

            public Manejador(SagaContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(InsertarUsuario request, CancellationToken cancellationToken)
            {
                var usuario = new Usuario
                {
                    User = request.User,
                    Contrasenia = HashPassword(request.Contrasenia),
                    Nombres = request.Nombres,
                    Apellidos = request.Apellidos,
                    Rol = request.Rol
                };

                _context.tblUsuario.Add(usuario);

                var valor = await _context.SaveChangesAsync();

                if (valor > 0)
                {
                    return Unit.Value;
                }

                throw new Exception("No se pudo agregar el usuario");
            }

            public static string HashPassword(string password)
            {
                //Declarations
                Byte[] originalBytes;
                Byte[] encodedBytes;
                MD5 md5;

                //Instantiate MD5CryptoServiceProvider, get bytes for original password and compute hash    (encoded password)
                md5 = new MD5CryptoServiceProvider();
                originalBytes = ASCIIEncoding.Default.GetBytes(password);
                encodedBytes = md5.ComputeHash(originalBytes);

                //Convert encoded bytes back to a 'readable' string
                return BitConverter.ToString(encodedBytes);
            }
        }
    }
}
