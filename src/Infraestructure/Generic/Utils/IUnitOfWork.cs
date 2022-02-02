namespace ArandaSoftCatalog.Infraestructure.Generic.Utils;

public interface IUnitOfWork<T> : IDisposable
{
    T Context { get; }

    void Commit();

    void Save();

    void Rollback();

    void CreateTransaction();
}