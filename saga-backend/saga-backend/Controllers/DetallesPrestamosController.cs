using Aplicacion.DetallesPrestamos;
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

    public class DetallesPrestamosController:ControllerBase
    {
        private readonly IMediator _mediator;

        public DetallesPrestamosController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<DetallePrestamo>>> Get()
        {
            return await _mediator.Send(new ConsultaDetallePrestamo.ListaDetallePrestamo());
        }
    }
}
