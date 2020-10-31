using Aplicacion.Ejemplares;
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
    public class EjemplaresController:ControllerBase
    {
        private readonly IMediator _mediator;

        public EjemplaresController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Ejemplar>>> Get()
        {
            return await _mediator.Send(new ConsultaEjemplar.ListaEjemplares());
        }
    }
}
