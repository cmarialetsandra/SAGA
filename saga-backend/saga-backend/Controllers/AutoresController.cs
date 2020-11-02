using Aplicacion.Autores;
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
    public class AutoresController:ControllerBase
    {
        private readonly IMediator _mediator;

        public AutoresController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Autor>>> Get()
        {
            return await _mediator.Send(new ConsultaAutor.ListaAutores());
        }

        [HttpGet ("{id}")]
        public async Task<ActionResult<Autor>> FiltradoId(int id)
        {
            return await _mediator.Send(new ConsultaIdAutor.AutorUnico { IdAutor = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CrearAutor(NuevoAutor.InsertarAutor data)
        {
            return await _mediator.Send(data);
        }
    }
}
