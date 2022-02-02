using ArandaSoftCatalog.Infraestructure.Common.Entities;
using ArandaSoftCatalog.Infraestructure.Data.EntityConfiguration;
using Microsoft.EntityFrameworkCore;

namespace ArandaSoftCatalog.Infraestructure.Data.DataContext;

public class BaseDbContext : DbContext
{
    public BaseDbContext() { }

    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }

    public BaseDbContext(DbContextOptions<BaseDbContext> options) : base(options) { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfiguration(new ProductEntityTypeConfiguration());
        builder.ApplyConfiguration(new CategoryEntityTypeConfiguration());
    }
}
