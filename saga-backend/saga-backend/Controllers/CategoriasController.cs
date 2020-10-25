﻿using Dominio;
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

    public class CategoriasController:ControllerBase
    {
        private readonly SagaContext context;

        public CategoriasController(SagaContext _context)
        {
            this.context = _context;
        }

        [HttpGet]
        public IEnumerable<Categoria> Get()
        {
            return context.tblCategoria.ToList();
        }
    }
}
