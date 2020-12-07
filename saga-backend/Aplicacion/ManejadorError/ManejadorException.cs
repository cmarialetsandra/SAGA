using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace Aplicacion.ManejadorError
{
    public class ManejadorException:Exception
    {
        public HttpStatusCode Codigo { get; }
        public object Errores { get; }
        public ManejadorException(HttpStatusCode codigo, object errores = null)
        {
            Codigo = codigo;
            Errores = errores;
        }
    }
}
