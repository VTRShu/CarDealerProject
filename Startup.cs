using CarDealerProject.Repositories.EFContext;
using CarDealerProject.Repositories.Entities;
using CarDealerProject.Services.AdminService;
using CarDealerProject.Services.AuthenticationService;
using CarDealerProject.Services.AuthenticationService.Implement;
using CarDealerProject.Services.BookingService;
using CarDealerProject.Services.BookingService.Implement;
using CarDealerProject.Services.CarService;
using CarDealerProject.Services.CarService.Implement;
using CarDealerProject.Services.CustomerService;
using CarDealerProject.Services.CustomerService.Implement;
using CarDealerProject.Services.DealerService;
using CarDealerProject.Services.DealerService.Implement;
using CarDealerProject.Services.EmailService;
using CarDealerProject.Services.EmailService.Implement;
using CarDealerProject.Services.ModelService;
using CarDealerProject.Services.ModelService.Implement;
using CarDealerProject.Services.TypeService;
using CarDealerProject.Services.TypeService.Implement;
using CarDealerProject.Services.ViewOwnSolvedBookService;
using CarDealerProject.Services.ViewOwnSolvedBookService.Implement;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.IO;
using System.Text;

namespace CarDealerProject
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
            services.AddDbContext<CarDealerDBContext>(options => options.UseSqlServer("name=ConnectionStrings:DefaultConnection"));
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Car_Dealer_Project", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please insert token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "bearer"
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement{
                {
                    new OpenApiSecurityScheme{
                        Reference = new OpenApiReference{
                            Type = ReferenceType.SecurityScheme,
                            Id="Bearer"
                        }
                    },
                    new string[]{}
                }});
            });
            services.AddControllersWithViews();

            services.AddIdentity<AppUser, AppRole>()
              .AddEntityFrameworkStores<CarDealerDBContext>()
              .AddDefaultTokenProviders();
            services.AddScoped<SignInManager<AppUser>, SignInManager<AppUser>>();
            services.AddScoped<RoleManager<AppRole>, RoleManager<AppRole>>();
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })

            // Adding Jwt Bearer
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration["Tokens:Issuer"],
                    ValidIssuer = Configuration["Tokens:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Tokens:Key"]))
                };
            });

            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<IAdminService, AdminService>();
            services.AddScoped<ICarService, CarService>();
            services.AddScoped<IDealerService, DealerService>();
            services.AddScoped<ITypeService, TypeService>();
            services.AddScoped<IModelService, ModelService>();
            services.AddScoped<IBookingService, BookingService>();
            services.AddScoped<ICarEquipmentService, CarEquipmentService>();
            services.AddScoped<ICustomerService, CustomerService>();
            services.AddScoped<IViewOwnSolvedBookService, ViewOwnSolvedBookService>();
            services.AddTransient<IEmailService, EmailService>();
            services.AddScoped<IBookWorkShopService, BookWorkshopService>();
            services.AddCors(
                     options =>
                     {
                         options.AddDefaultPolicy(
                                    builder =>
                                    {
                                        builder.AllowAnyOrigin()
                                               .AllowAnyHeader()
                                               .AllowAnyMethod();
                                    });
                     }
                 );
            // In production, the React files will be served from this directory
            services.AddControllers().AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "v1"));
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images")),
                RequestPath = "/Images"
            });
            app.UseSpaStaticFiles();
            app.UseCors();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}