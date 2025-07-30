using Microsoft.EntityFrameworkCore;
using CazuelaBackend.Data;
using CazuelaBackend.Models;

var builder = WebApplication.CreateBuilder(args);

// Configuración de servicios
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlite("Data Source=cazuela.db"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Habilitar servicios CORS
builder.Services.AddCors();

// Agregar soporte para controladores
builder.Services.AddControllers()
    .AddJsonOptions(x =>
        x.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles);

    
var app = builder.Build();

// Middleware
app.UseSwagger();
app.UseSwaggerUI();

// Usar CORS con política abierta (para pruebas)
app.UseCors(p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

// Mapear controladores
app.MapControllers();

// Endpoint raíz (opcional, lo puedes dejar o eliminar)
app.MapGet("/", () => "API La Cazuela Chapina");

// Puedes mantener otros endpoints minimalistas o moverlos a controladores si quieres
// Por ejemplo, para combos, pedidos, dashboard, etc. conviene hacer también controladores para esos.

// Ejecutar app
app.Run();

// Record para endpoint de prueba (puedes dejarlo o eliminarlo)
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
