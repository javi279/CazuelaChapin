namespace CazuelaBackend.Models;

using System.Text.Json.Serialization;

public class PedidoDetalle
{
    public int Id { get; set; }

    public int PedidoId { get; set; } //  Clave foránea obligatoria
    [JsonIgnore]
    public Pedido Pedido { get; set; } = null!;

    public string Tipo { get; set; } = ""; // "Producto" o "Combo"
    public int ItemId { get; set; }
    public int Cantidad { get; set; }


    
}
