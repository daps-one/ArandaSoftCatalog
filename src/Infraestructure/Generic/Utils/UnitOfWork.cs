using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace ArandaSoftCatalog.Infraestructure.Generic.Utils;

public class UnitOfWork<T> : IUnitOfWork<T> where T : DbContext
{
    private IDbContextTransaction _transaction = null;
    public T Context { get; }

    public UnitOfWork(T context)
    {
        Context = context;
    }

    public void Commit()
    {
        if (_transaction != null)
        {
            _transaction.Commit();
        }
    }

    public void CreateTransaction()
    {
        _transaction = Context.Database.BeginTransaction();
    }

    public void Dispose()
    {
        Context.Dispose();
    }

    public void Rollback()
    {
        if (_transaction != null)
        {
            _transaction.Rollback();
        }
    }

    public void Save()
    {
        Context.SaveChanges();
    }
}