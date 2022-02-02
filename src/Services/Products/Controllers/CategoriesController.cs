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
public class CategoriesController : ControllerBase
{
    private readonly ILogger _logger;
    private readonly IUnitOfWork<BaseDbContext> _unitOfWork;
    private readonly CategoryRepository _categoryRepository;

    public CategoriesController(ILogger<object> logger, IUnitOfWork<BaseDbContext> unitOfWork)
    {
        _logger = logger;
        _unitOfWork = unitOfWork;
        _categoryRepository = new CategoryRepository(_unitOfWork);
    }

    [HttpGet]
    [Route("")]
    public async Task<IActionResult> GetAllAsync()
    {
        try
        {
            var categories = await _categoryRepository.GetAllAsync();
            return Ok(categories);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error: Controller: {nameof(CategoriesController)}; Method: {nameof(GetAllAsync)}");
            return BadRequest();
        }
    }
}