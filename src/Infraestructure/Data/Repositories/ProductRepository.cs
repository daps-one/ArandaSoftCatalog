using ArandaSoftCatalog.Infraestructure.Common.Entities;
using ArandaSoftCatalog.Infraestructure.Common.Entities.NoMapped;
using ArandaSoftCatalog.Infraestructure.Data.DataContext;
using ArandaSoftCatalog.Infraestructure.Generic.Utils;
using ArandaSoftCatalog.Infraestructure.Generic.Utils.BaseRepository;
using Microsoft.EntityFrameworkCore;

namespace ArandaSoftCatalog.Infraestructure.Data.Repositories;

public class ProductRepository : GenericRepository<BaseDbContext, Product>
{
    public ProductRepository(IUnitOfWork<BaseDbContext> unitOfWork) : base(unitOfWork) { }

    public async Task<ResponseData<Product>> GetAllProductsAsync(RequestData requestData)
    {
        try
        {
            var productsQuery = _unitOfWork.Context.Products.AsNoTracking()
                .Include(x => x.Category)
                .Where(x => EF.Functions.Like(x.Name, $"%{requestData.Search}%") || EF.Functions.Like(x.Description, $"%{requestData.Search}%") || EF.Functions.Like(x.Category.Description, $"%{requestData.Search}%"))
                .Skip((requestData.Page - 1) * 10)
                .Take(10);

            if (requestData.OrderingName != null)
                productsQuery = requestData.OrderingAsc 
                    ? productsQuery.OrderBy(x => requestData.OrderingName == "Name" ? x.Name : x.Category.Description)
                    : productsQuery.OrderByDescending(x => requestData.OrderingName == "Name" ? x.Name : x.Category.Description);
            
            var products = await productsQuery.ToListAsync();
            var totalProducts = await _unitOfWork.Context.Products.CountAsync();

            return new ResponseData<Product>
            {
                Data = products,
                FilteredRecords = products.Count,
                TotalRecords = totalProducts
            };
        }
        catch (Exception)
        {
            throw;
        }
    }
}