using Aplicacion.Prestamos;
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
    public class PrestamosController:ControllerBase
    {
        private readonly IMediator _mediator;

        public PrestamosController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Prestamo>>> Get()
        {
            return await _mediator.Send(new ConsultaPrestamo.ListaPrestamos());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Prestamo>> FiltradoId(int id)
        {
            return await _mediator.Send(new ConsultaIdPrestamo.PrestamoUnico { IdPrestamo = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CrearPrestamo(NuevoPrestamo.InsertarPrestamo data)
        {
            var prestamo = await _mediator.Send(data);
            return CreatedAtAction("FiltradoId", new { id = prestamo.IdPrestamo}, prestamo);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Editar(int id, EditarPrestamo.Ejecuta data)
        {
            data.IdPrestamo = id;
            return await _mediator.Send(data);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Eliminar(int id)
        {
            return await _mediator.Send(new EliminarPrestamo.Ejecuta { IdPrestamo = id });
        }
    }
}
