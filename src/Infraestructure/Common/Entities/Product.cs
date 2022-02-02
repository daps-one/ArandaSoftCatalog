using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ArandaSoftCatalog.Infraestructure.Common.Entities;
public class Product
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int ProductId { get; set; }

    [Required]
    [StringLength(255)]
    public string Name { get; set; }

    [StringLength(1024)]
    public string Description { get; set; }

    public bool Status { get; set; }

    [Required]
    public string Image { get; set; }

    [Required]
    [ForeignKey("Category")]
    public int CategoryId { get; set; }

    public virtual Category Category { get; set; }
}