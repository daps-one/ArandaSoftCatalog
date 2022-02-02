using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ArandaSoftCatalog.Infraestructure.Data.DataContext;
using ArandaSoftCatalog.Infraestructure.Generic.Utils;

namespace ArandaSoftCatalog.Infraestructure.Configuration.Middlewares;
public static class SqlServerServiceCollectionExtensions
{
    public static IServiceCollection AddSqlServerContext(this IServiceCollection services, string connectionString)
    {
        
        services.AddDbContext<BaseDbContext>(options => options.UseSqlServer(connectionString));
        return services;
    }

    public static IServiceCollection AddUnitOfWork(this IServiceCollection services)
    {
        services.AddScoped(typeof(IUnitOfWork<>), typeof(UnitOfWork<>));
        return services;
    }
}
