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

    public ProductsController(ILogger<object> logger, IUnitOfWork<BaseDbContext> unitOfWork)
    {
        _logger = logger;
        _unitOfWork = unitOfWork;
        _productRepository = new ProductRepository(_unitOfWork);
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
            var products = await _productRepository.GetAllProductsAsync(requestData);
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
            product.ProductId = 0;
            product.Category = null;
            product.Status = true;
            product = await _productRepository.InsertAsync(product);
            _unitOfWork.Save();
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
            currentProduct.Name = product.Name;
            currentProduct.Description = product.Description;
            currentProduct.Image = product.Image;
            currentProduct.CategoryId = product.CategoryId;
            currentProduct.Status = true;
            currentProduct.Category = null;
            _unitOfWork.Save();
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