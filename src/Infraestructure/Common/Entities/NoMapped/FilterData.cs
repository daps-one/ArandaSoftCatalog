using System.ComponentModel.DataAnnotations;

namespace ArandaSoftCatalog.Infraestructure.Common.Entities.NoMapped;

public class ResponseData<T>
{
    public int TotalRecords { get; set; }

    public int FilteredRecords { get; set; }

    public IEnumerable<T> Data { get; set; }
}

public class RequestData
{
    [Required]
    public int Skip { get; set; }

    public string Search { get; set; }

    public string OrderingName { get; set; } 

    public bool OrderingAsc { get; set; } = true;
}