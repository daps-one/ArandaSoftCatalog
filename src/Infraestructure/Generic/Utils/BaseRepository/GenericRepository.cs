using Microsoft.EntityFrameworkCore;

namespace ArandaSoftCatalog.Infraestructure.Generic.Utils.BaseRepository;

public class GenericRepository<TContext, TModel> : IGenericRepository<TContext, TModel>
    where TModel : class
    where TContext : DbContext
{
    protected readonly IUnitOfWork<TContext> _unitOfWork;

    public GenericRepository(IUnitOfWork<TContext> unitOfWork) => _unitOfWork = unitOfWork;

    protected void QueryTracking(bool isAsNoTracking)
    {
        _unitOfWork.Context.ChangeTracker.QueryTrackingBehavior = isAsNoTracking ? QueryTrackingBehavior.NoTracking : QueryTrackingBehavior.TrackAll;
    }

    public TModel Delete(TModel entity)
    {
        try
        {
            return _unitOfWork.Context.Set<TModel>().Remove(entity).Entity;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public TModel Get(object id, bool isAsNoTracking = false)
    {
        try
        {
            QueryTracking(isAsNoTracking);
            return _unitOfWork.Context.Set<TModel>().Find(id);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public IEnumerable<TModel> GetAll(bool isAsNoTracking = false)
    {
        try
        {
            QueryTracking(isAsNoTracking);
            return _unitOfWork.Context.Set<TModel>().ToList();
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<IEnumerable<TModel>> GetAllAsync(bool isAsNoTracking = false)
    {
        try
        {
            QueryTracking(isAsNoTracking);
            return await _unitOfWork.Context.Set<TModel>().ToListAsync();
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<TModel> GetAsync(object id, bool isAsNoTracking = false)
    {
        try
        {
            QueryTracking(isAsNoTracking);
            return await _unitOfWork.Context.Set<TModel>().FindAsync(id);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public TModel Insert(TModel entity)
    {
        try
        {
            return _unitOfWork.Context.Set<TModel>().Add(entity).Entity;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<TModel> InsertAsync(TModel entity)
    {
        try
        {
            return (await _unitOfWork.Context.Set<TModel>().AddAsync(entity)).Entity;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public TModel Update(TModel entity)
    {
        try
        {
            return _unitOfWork.Context.Set<TModel>().Update(entity).Entity;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public void InsertRange(params TModel[] entities)
    {
        try
        {
            _unitOfWork.Context.Set<TModel>().AddRange(entities);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task InsertRangeAsync(params TModel[] entities)
    {
        try
        {
            await _unitOfWork.Context.Set<TModel>().AddRangeAsync(entities);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public void UpdateRange(params TModel[] entities)
    {
        try
        {
            _unitOfWork.Context.Set<TModel>().UpdateRange(entities);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public void DeleteRange(params TModel[] entities)
    {
        try
        {
            _unitOfWork.Context.Set<TModel>().RemoveRange(entities);
        }
        catch (Exception)
        {
            throw;
        }
    }
}