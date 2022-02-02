using Microsoft.EntityFrameworkCore;

namespace ArandaSoftCatalog.Infraestructure.Generic.Utils.BaseRepository;

public interface IGenericRepository<TContext, TModel>
    where TModel : class
    where TContext : DbContext
{
    IEnumerable<TModel> GetAll(bool isNoTracking = false);
    Task<IEnumerable<TModel>> GetAllAsync(bool isNoTracking = false);
    TModel Get(object id, bool isAsNoTracking = false);
    Task<TModel> GetAsync(object id, bool isAsNoTracking = false);
    TModel Insert(TModel entity);
    void InsertRange(params TModel[] entities);
    Task<TModel> InsertAsync(TModel entity);
    Task InsertRangeAsync(params TModel[] entities);
    TModel Update(TModel entity);
    void UpdateRange(params TModel[] entities);
    TModel Delete(TModel entity);
    void DeleteRange(params TModel[] entities);
}