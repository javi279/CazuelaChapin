using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CazuelaBackend.Data;
using CazuelaBackend.Models;
using CazuelaBackend.Dtos;

namespace CazuelaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PedidosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PedidosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CrearPedido([FromBody] PedidoDTO dto)
        {
            if (dto.Detalles == null || !dto.Detalles.Any())
            {
                return BadRequest("El pedido debe tener al menos un detalle.");
            }

            var pedido = new Pedido
            {
                Cliente = dto.Cliente,
                Estado = dto.Estado,
                Fecha = DateTime.Now,
                Detalles = dto.Detalles.Select(d => new PedidoDetalle
                {
                    Tipo = d.Tipo,
                    ItemId = d.ItemId,
                    Cantidad = d.Cantidad
                    // PedidoId se asignará automáticamente por EF
                }).ToList()
            };

            _context.Pedidos.Add(pedido);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                pedido.Id,
                pedido.Cliente,
                pedido.Estado,
                pedido.Fecha,
                Detalles = pedido.Detalles.Select(d => new
                {
                    d.Id,
                    d.Tipo,
                    d.ItemId,
                    d.Cantidad
                })
            });
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerPedidos()
        {
            var pedidos = await _context.Pedidos
                .Include(p => p.Detalles)
                .ToListAsync();

            return Ok(pedidos);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> ActualizarPedido(int id, [FromBody] PedidoDTO dto)
        {
            var pedidoExistente = await _context.Pedidos
                .Include(p => p.Detalles)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (pedidoExistente == null)
                return NotFound();

            // Actualizar campos del pedido
            pedidoExistente.Cliente = dto.Cliente;
            pedidoExistente.Estado = dto.Estado;
            pedidoExistente.Fecha = DateTime.Now;

            // Si vienen nuevos detalles, reemplazamos los existentes
            if (dto.Detalles != null && dto.Detalles.Any())
            {
                // Eliminar detalles anteriores
                _context.PedidoDetalles.RemoveRange(pedidoExistente.Detalles);

                // Agregar nuevos detalles
                pedidoExistente.Detalles = dto.Detalles.Select(d => new PedidoDetalle
                {
                    Tipo = d.Tipo,
                    ItemId = d.ItemId,
                    Cantidad = d.Cantidad
                }).ToList();
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensaje = "Pedido actualizado correctamente",
                pedidoExistente.Id
            });

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarPedido(int id)
        {   
            var pedido = await _context.Pedidos
            .Include(p => p.Detalles)
            .FirstOrDefaultAsync(p => p.Id == id);

            if (pedido == null)
            return NotFound();

            _context.PedidoDetalles.RemoveRange(pedido.Detalles);
            _context.Pedidos.Remove(pedido);
            await _context.SaveChangesAsync();

        return Ok(new { mensaje = "Pedido eliminado correctamente" });
        }

}

}