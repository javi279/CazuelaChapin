namespace CazuelaBackend.Models;

public class Producto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = "";
    public string Tipo { get; set; } = ""; // "Tamales" o "Bebidas"
    public decimal PrecioUnidad { get; set; }
    public string Atributos { get; set; } = ""; // JSON string de atributos si es necesario
}
