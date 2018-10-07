using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ERP.API.Data;
using ERP.API.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace ERP.API
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
            var key = Encoding.ASCII.GetBytes("super secret key");
            services.AddMvc();
            services.AddAutoMapper();
            var connection = @"Server=DESKTOP-U2AMBJE\SQLEXPRESS;Database=erp;Trusted_Connection=True;ConnectRetryCount=0;MultipleActiveResultSets=True";
            // var connection = @"Data Source=SQL6006.site4now.net;Initial Catalog=DB_A4165E_jordanrigo;User Id=DB_A4165E_jordanrigo_admin;Password=Simsons51b1993;"
;
            services.AddDbContext<DataContext>(options => options.UseSqlServer(connection));
            services.AddScoped<IDataRepository, DataRepository>();
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddCors();
             services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
            services.AddMvc().AddJsonOptions(opt => 
            {
                opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().AllowCredentials());
            app.UseAuthentication();
        //    app.UseDefaultFiles(); // build
        //    app.UseStaticFiles(); // build
            app.UseMvc( routes => {
                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new {controller = "Fallback", action = "Index"}
                );
            });
        }
    }
}
