using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ArandaSoftCatalog.Infraestructure.Common.Entities;
public class Category
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int CategoryId { get; set; }

    [Required]
    [StringLength(255)]
    public string Description { get; set; }

    public virtual ICollection<Product> Products { get; set; }

    public Category() => Products = new HashSet<Product>();
}
