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
    [ApiController]
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

        [HttpGet("{id}")]
        public async Task<ActionResult<DetallePrestamo>> FiltradoId(int id)
        {
            return await _mediator.Send(new ConsultaIdDetallePrestamo.DetallePrestamoUnico { IdDetallePrestamo = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CrearDetallePrestamo(NuevoDetallePrestamo.InsertarDetallePrestamo data)
        {
            return await _mediator.Send(data);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Editar(int id, EditarDetallePrestamo.Ejecuta data)
        {
            data.IdDetallePrestamo = id;
            return await _mediator.Send(data);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Eliminar(int id)
        {
            return await _mediator.Send(new EliminarDetallePrestamo.Ejecuta { IdDetallePrestamo = id });
        }
    }
}
