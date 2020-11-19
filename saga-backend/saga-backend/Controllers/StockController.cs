using Aplicacion.Libros;
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
    public class StockController : ControllerBase
    {
        private readonly IMediator _mediator;

        public StockController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<Libro>> Get()
        {
            return await _mediator.Send(new ConsultaUltimoLibro.LibroUltimo());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VwEjemplar>> FiltradoId(int id)
        {
            return await _mediator.Send(new ConsultaStock.UltimoStock { IdLibro = id });
        }
    }
}
