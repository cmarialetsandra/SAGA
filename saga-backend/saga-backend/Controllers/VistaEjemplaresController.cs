using Aplicacion.VistaEjemplares;
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
    public class VistaEjemplaresController : ControllerBase
    {
        private readonly IMediator _mediator;

        public VistaEjemplaresController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<VwEjemplar>>> FiltradoId(int id)
        {
            return await _mediator.Send(new ConsultaEjemplar.EjemplarUnico { IdLibro = id });
        }
    }
}
