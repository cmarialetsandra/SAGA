using Dominio;
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

    public class AutoresController:ControllerBase
    {
        private readonly SagaContext context;

        public AutoresController(SagaContext _context)
        {
            this.context = _context;
        }

        [HttpGet]
        public IEnumerable<Autor> Get()
        {
            return context.tblAutor.ToList();
        }
    }
}
