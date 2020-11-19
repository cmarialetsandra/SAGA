using Aplicacion.Categorias;
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
    public class CategoriasController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CategoriasController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Categoria>>> Get()
        {
            return await _mediator.Send(new ConsultaCategoria.ListaCategorias());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Categoria>> FiltradoId(int id)
        {
            return await _mediator.Send(new ConsultaIdCategoria.CategoriaUnica { IdCategoria = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CrearEditorial(NuevaCategoria.InsertarCategoria data)
        {
            return await _mediator.Send(data);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Editar(int id, EditarCategoria.Ejecuta data)
        {
            data.IdCategoria = id;
            return await _mediator.Send(data);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Eliminar(int id)
        {
            return await _mediator.Send(new EliminarCategoria.Ejecuta { IdCategoria = id });
        }
    }
}
