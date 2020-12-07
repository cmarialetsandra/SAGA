using Aplicacion.Editoriales;
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
    public class EditorialesController:ControllerBase
    {
        private readonly IMediator _mediator;

        public EditorialesController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Editorial>>> Get()
        {
            return await _mediator.Send(new ConsultaEditorial.ListaEditoriales());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Editorial>> FiltradoId(int id)
        {
            return await _mediator.Send(new ConsultaIdEditorial.EditorialUnico { IdEditorial = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CrearEditorial(NuevoEditorial.InsertarEditorial data)
        {
            return await _mediator.Send(data);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Editar(int id, EditarEditorial.Ejecuta data)
        {
            data.IdEditorial=id;
            return await _mediator.Send(data);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Eliminar(int id)
        {
            return await _mediator.Send(new EliminarEditorial.Ejecuta { IdEditorial = id });
        }

        [HttpPost("validarEditorial")]
        public async Task<ActionResult<Editorial>> ExisteEditorial(ExisteEditorial.ExisteEditorialValidacion data)
        {
            return await _mediator.Send(data);
        }
    }
}
