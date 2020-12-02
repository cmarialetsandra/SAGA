using Aplicacion.VistaDetalles;
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
    public class VistaDetallesPrestamosController : ControllerBase
    {
        private readonly IMediator _mediator;

        public VistaDetallesPrestamosController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<VwDetallePrestamo>>> FiltradoId(int id)
        {
            return await _mediator.Send(new ConsultaDetalleIdPrestamo.ListaDetallesPrestamos { IdPrestamo = id });
        }
    }
}
