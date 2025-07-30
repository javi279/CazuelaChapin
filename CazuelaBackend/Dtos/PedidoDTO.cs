namespace CazuelaBackend.Dtos;

public class PedidoDTO
{
    public string Cliente { get; set; } = "";
    public string Estado { get; set; } = "Pendiente";

    public List<PedidoDetalleDTO> Detalles { get; set; } = new();
}

public class PedidoDetalleDTO
{
    public string Tipo { get; set; } = ""; // "Producto" o "Combo"
    public int ItemId { get; set; }
    public int Cantidad { get; set; }
}
