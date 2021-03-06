﻿using Aplicacion.VistaLibros;
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
    public class VistaLibrosController : ControllerBase
    {
        private readonly IMediator _mediator;

        public VistaLibrosController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<VwLibro>>> Get()
        {
            return await _mediator.Send(new ConsultaVistaTotalLibros.ListaVistaLibros());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VwLibro>> FiltradoId(int id)
        {
            return await _mediator.Send(new ConsultaVistaIdLibro.LibroUnico { IdLibro = id });
        }
    }
}
