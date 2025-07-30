namespace CazuelaBackend.Models;

public class Pedido
{
    public int Id { get; set; }
    public string Cliente { get; set; } = "";
    public string Estado { get; set; } = "Pendiente";
    public DateTime Fecha { get; set; }

    public List<PedidoDetalle> Detalles { get; set; } = new();
}
