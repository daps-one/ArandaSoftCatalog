using System;
using System.Reflection;
using System.Threading.Tasks;
using ArandaSoftCatalog.Infraestructure.Common.Entities;
using ArandaSoftCatalog.Infraestructure.Common.Entities.NoMapped;
using ArandaSoftCatalog.Infraestructure.Data.DataContext;
using ArandaSoftCatalog.Infraestructure.Data.Repositories;
using ArandaSoftCatalog.Infraestructure.Generic.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ArandaSoftCatalog.Services.Products.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ILogger _logger;
    private readonly IUnitOfWork<BaseDbContext> _unitOfWork;
    private readonly ProductRepository _productRepository;
    private readonly IWebHostEnvironment _env;
    private readonly string _folder = "Resources\\Images";
    private readonly string _fullPath = string.Empty;

    public ProductsController(ILogger<object> logger, IUnitOfWork<BaseDbContext> unitOfWork, IWebHostEnvironment env)
    {
        _logger = logger;
        _unitOfWork = unitOfWork;
        _productRepository = new ProductRepository(_unitOfWork);
        _env = env;
        _fullPath = Path.Combine(_env.ContentRootPath, _folder);
    }

    [HttpGet]
    [Route("")]
    public async Task<IActionResult> GetAllAsync([FromQuery]RequestData requestData)
    {
        if (!ModelState.IsValid)
            return BadRequest();

        if (requestData.OrderingName != "Name" && requestData.OrderingName != "Category" && requestData.OrderingName != null)
            return BadRequest();

        try
        {
            requestData.Page = requestData.Page == 0 ? 1 : requestData.Page;
            var products = await _productRepository.GetAllProductsAsync(requestData);
            foreach (Product product in products.Data)
            {
                byte[] imageArray = System.IO.File.ReadAllBytes(Path.Combine(_fullPath, $"{product.Image}"));
                product.Image = Convert.ToBase64String(imageArray);
            }
            return Ok(products);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error: Controller: {nameof(ProductsController)}; Method: {nameof(GetAllAsync)}");
            return BadRequest();
        }
    }

    [HttpGet]
    [Route("{productId:int}")]
    public async Task<IActionResult> GetAsync(int productId)
    {
        try
        {
            var product = await _productRepository.GetAsync(productId, true);
            if (product is null)
                return NotFound();

            byte[] imageArray = System.IO.File.ReadAllBytes(Path.Combine(_fullPath, $"{product.Image}"));
            product.Image = Convert.ToBase64String(imageArray);
            return Ok(product);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error: Controller: {nameof(ProductsController)}; Method: {nameof(GetAsync)}");
            return BadRequest();
        }
    }

    [HttpPost]
    [Route("")]
    public async Task<IActionResult> InsertAsync([FromBody]Product product)
    {
        if (!ModelState.IsValid)
            return BadRequest();
        try
        {
            var tempImage = product.Image;
            _unitOfWork.CreateTransaction();
            product.ProductId = 0;
            product.Category = null;
            product.Status = true;
            product.Image = string.Empty;
            product = await _productRepository.InsertAsync(product);
            _unitOfWork.Save();

            var filePath = Path.Combine(_fullPath, $"{product.ProductId}.png");
            try
            {
                System.IO.File.WriteAllBytes(filePath, Convert.FromBase64String(tempImage));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error: Controller: {nameof(ProductsController)}; Method: {nameof(InsertAsync)}");
                _unitOfWork.Rollback();
                return BadRequest();
            }
            product.Image = $"{product.ProductId}.png";
            _unitOfWork.Save();
            _unitOfWork.Commit();

            return Ok(product);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error: Controller: {nameof(ProductsController)}; Method: {nameof(InsertAsync)}");
            return BadRequest();
        }
    }

    [HttpPut]
    [Route("{productId:int}")]
    public async Task<IActionResult> UpdateAsync([FromBody]Product product, int productId)
    {
        if (!ModelState.IsValid)
            return BadRequest();
        try
        {
            var currentProduct = await _productRepository.GetAsync(productId);
            if (currentProduct is null)
            {
                return NotFound();
            }
            _unitOfWork.CreateTransaction();
            var tempImage = product.Image;
            currentProduct.Name = product.Name;
            currentProduct.Description = product.Description;
            currentProduct.CategoryId = product.CategoryId;
            currentProduct.Status = true;
            currentProduct.Category = null;
            _unitOfWork.Save();

            var filePath = Path.Combine(_fullPath, $"{currentProduct.Image}");
            try
            {
                System.IO.File.WriteAllBytes(filePath, Convert.FromBase64String(tempImage));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error: Controller: {nameof(ProductsController)}; Method: {nameof(InsertAsync)}");
                _unitOfWork.Rollback();
                return BadRequest();
            }
            _unitOfWork.Commit();

            return Ok(currentProduct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error: Controller: {nameof(ProductsController)}; Method: {nameof(UpdateAsync)}");
            return BadRequest();
        }
    }

    [HttpDelete]
    [Route("{productId:int}")]
    public async Task<IActionResult> DeleteAsync(int productId)
    {
        try
        {
            var currentProduct = await _productRepository.GetAsync(productId);
            if (currentProduct is null)
            {
                return NotFound();
            }
            _productRepository.Delete(currentProduct);
            _unitOfWork.Save();
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error: Controller: {nameof(ProductsController)}; Method: {nameof(DeleteAsync)}");
            return BadRequest();
        }
    }
}