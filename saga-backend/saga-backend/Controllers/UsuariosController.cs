using Aplicacion.Seguridad;
using Aplicacion.Usuarios;
using Dominio;
using MediatR;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace saga_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController:ControllerBase
    {
        private readonly IMediator _mediator;

        public UsuariosController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Usuario>>> Get()
        {
            return await _mediator.Send(new ConsultaUsuario.ListaUsuarios());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> FiltradoId(int id)
        {
            return await _mediator.Send(new ConsultaIdLibro.UsuarioUnico { IdUsuario = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CrearUsuario(NuevoUsuario.InsertarUsuario data)
        {
            return await _mediator.Send(data);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Editar(int id, EditarUsuario.Ejecuta data)
        {
            data.IdUsuario = id;
            return await _mediator.Send(data);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Eliminar(int id)
        {
            return await _mediator.Send(new EliminarUsuario.Ejecuta { IdUsuario = id });
        }

        [HttpPost("login")]
        public async Task<ActionResult<UsuarioData>> Login(Login.Ejecuta data)
        {
            return await _mediator.Send(data);
        }

        [HttpPost("validarUsuario")]
        public async Task<ActionResult<Usuario>> ExisteUsuario(ExisteUsuario.ExisteUsuarioValidacion data)
        {
            return await _mediator.Send(data);
        }
    }
}
