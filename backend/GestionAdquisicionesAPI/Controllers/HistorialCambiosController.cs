using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GestionAdquisicionesAPI.Models;
using GestionAdquisicionesAPI.Data;

[Route("api/[controller]")]
[ApiController]
public class HistorialCambiosController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public HistorialCambiosController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/HistorialCambios
    [HttpGet]
    public async Task<ActionResult<IEnumerable<HistorialCambio>>> ObtenerHistorial()
    {
        return await _context.HistorialCambios.ToListAsync();
    }

    // GET: api/HistorialCambios/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<HistorialCambio>>> ObtenerHistorialPorAdquisicion(int id)
    {
        var historial = await _context.HistorialCambios
            .Where(h => h.AdqId == id)
            .ToListAsync();

        if (historial == null || historial.Count == 0)
        {
            return NotFound(new { mensaje = "No hay historial para esta adquisición." });
        }

        return historial;
    }
}
