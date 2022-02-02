using ArandaSoftCatalog.Infraestructure.Common.Entities;
using ArandaSoftCatalog.Infraestructure.Data.DataContext;
using ArandaSoftCatalog.Infraestructure.Generic.Utils;
using ArandaSoftCatalog.Infraestructure.Generic.Utils.BaseRepository;

namespace ArandaSoftCatalog.Infraestructure.Data.Repositories;

public class CategoryRepository : GenericRepository<BaseDbContext, Category>
{
    public CategoryRepository(IUnitOfWork<BaseDbContext> unitOfWork) : base(unitOfWork) { }
}