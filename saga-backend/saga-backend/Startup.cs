using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Aplicacion.Autores;
using Aplicacion.Categorias;
using Aplicacion.DetallesPrestamos;
using Aplicacion.Editoriales;
using Aplicacion.Ejemplares;
using Aplicacion.Libros;
using Aplicacion.Prestamos;
using Aplicacion.Usuarios;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistencia;

namespace saga_backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<SagaContext>(opt => {
                opt.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddMediatR(typeof(ConsultaAutor.Manejador).Assembly);
            services.AddMediatR(typeof(ConsultaCategoria.Manejador).Assembly);
            services.AddMediatR(typeof(ConsultaDetallePrestamo.Manejador).Assembly);
            services.AddMediatR(typeof(ConsultaEditorial.Manejador).Assembly);
            services.AddMediatR(typeof(ConsultaEjemplar.Manejador).Assembly);
            services.AddMediatR(typeof(ConsultaLibro.Manejador).Assembly);
            services.AddMediatR(typeof(ConsultaPrestamo.Manejador).Assembly);
            services.AddMediatR(typeof(ConsultaUsuario.Manejador).Assembly);
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
