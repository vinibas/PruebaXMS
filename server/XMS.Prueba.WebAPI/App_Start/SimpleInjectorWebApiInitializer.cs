[assembly: WebActivator.PostApplicationStartMethod(typeof(XMS.Prueba.WebAPI.App_Start.SimpleInjectorWebApiInitializer), "Initialize")]

namespace XMS.Prueba.WebAPI.App_Start
{
    using System.Web.Http;
    using SimpleInjector;
    using SimpleInjector.Integration.WebApi;
    using XMS.Prueba.WebAPI.Data;
    using XMS.Prueba.WebAPI.Models;

    public static class SimpleInjectorWebApiInitializer
    {
        /// <summary>Initialize the container and register it as Web API Dependency Resolver.</summary>
        public static void Initialize()
        {
            var container = new Container();
            container.Options.DefaultScopedLifestyle = new SimpleInjector.Lifestyles.AsyncScopedLifestyle();// new WebApiRequestLifestyle();
            
            InitializeContainer(container);

            container.RegisterWebApiControllers(GlobalConfiguration.Configuration);
       
            container.Verify();
            
            GlobalConfiguration.Configuration.DependencyResolver =
                new SimpleInjectorWebApiDependencyResolver(container);
        }
     
        private static void InitializeContainer(Container container)
        {
            container.Register<PruebaDbContext>(Lifestyle.Scoped);
            container.Register<IRepository<Usuario>, UsuarioRepository>(Lifestyle.Scoped);
        }
    }
}