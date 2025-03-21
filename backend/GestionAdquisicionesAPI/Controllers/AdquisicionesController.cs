using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GestionAdquisicionesAPI.Data;
using GestionAdquisicionesAPI.Models;

[Route("api/[controller]")]
[ApiController]
public class AdquisicionesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AdquisicionesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Adquisicion>>> GetAdquisiciones()
    {
        return await _context.Adquisiciones.ToListAsync();
    }


    [HttpPost]
    public async Task<ActionResult<Adquisicion>> PostAdquisicion([FromBody] Adquisicion adquisicion)
    {
        if (adquisicion == null)
        {
            return BadRequest("Los datos de la adquisición son requeridos.");
        }

        adquisicion.FechaMod ??= DateTime.UtcNow;
        adquisicion.Activo = adquisicion.Activo != false;

        _context.Adquisiciones.Add(adquisicion);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAdquisiciones), new { id = adquisicion.Id }, adquisicion);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> ActualizarAdquisicion(int id, [FromBody] Adquisicion adquisicionActualizada)
    {
        var adquisicion = await _context.Adquisiciones.FindAsync(id);
        if (adquisicion == null)
        {
            return NotFound();
        }

        var historial = new List<HistorialCambio>();

        void AgregarHistorial(string campo, object anterior, object nuevo)
        {
            if (!Equals(anterior, nuevo)) // Solo registrar si hay cambios
            {
                historial.Add(new HistorialCambio
                {
                    AdqId = id,
                    Usuario = "Usuario 1",
                    Campo = campo,
                    Anterior = anterior?.ToString() ?? "null",
                    Nuevo = nuevo?.ToString() ?? "null",
                    Fecha = DateTime.UtcNow
                });
            }
        }

        // Actualizar los valores solo si el nuevo dato es diferente de null
        AgregarHistorial("Presupuesto", adquisicion.Presupuesto, adquisicionActualizada.Presupuesto);
        adquisicion.Presupuesto = adquisicionActualizada.Presupuesto >= 0 ? adquisicionActualizada.Presupuesto : adquisicion.Presupuesto;

        AgregarHistorial("Unidad", adquisicion.Unidad, adquisicionActualizada.Unidad);
        adquisicion.Unidad = adquisicionActualizada.Unidad ?? adquisicion.Unidad;

        AgregarHistorial("Tipo", adquisicion.Tipo, adquisicionActualizada.Tipo);
        adquisicion.Tipo = adquisicionActualizada.Tipo ?? adquisicion.Tipo;

        AgregarHistorial("Cantidad", adquisicion.Cantidad, adquisicionActualizada.Cantidad);
        adquisicion.Cantidad = adquisicionActualizada.Cantidad >= 0 ? adquisicionActualizada.Cantidad : adquisicion.Cantidad;

        AgregarHistorial("ValorUni", adquisicion.ValorUni, adquisicionActualizada.ValorUni);
        adquisicion.ValorUni = adquisicionActualizada.ValorUni >= 0 ? adquisicionActualizada.ValorUni : adquisicion.ValorUni;

        AgregarHistorial("ValorTot", adquisicion.ValorTot, adquisicionActualizada.ValorTot);
        adquisicion.ValorTot = adquisicionActualizada.ValorTot >= 0 ? adquisicionActualizada.ValorTot : adquisicion.ValorTot;

        AgregarHistorial("Proveedor", adquisicion.Proveedor, adquisicionActualizada.Proveedor);
        adquisicion.Proveedor = adquisicionActualizada.Proveedor ?? adquisicion.Proveedor;

        AgregarHistorial("FechaAdq", adquisicion.FechaAdq, adquisicionActualizada.FechaAdq);
        adquisicion.FechaAdq = adquisicionActualizada.FechaAdq ?? adquisicion.FechaAdq;

        //AgregarHistorial("FechaMod", adquisicion.FechaMod, DateTime.UtcNow);
        adquisicion.FechaMod = DateTime.UtcNow;

        AgregarHistorial("Activo", adquisicion.Activo, adquisicionActualizada.Activo);
        adquisicion.Activo = adquisicionActualizada.Activo ?? adquisicion.Activo;


        // Guardar cambios en adquisiciones
        await _context.SaveChangesAsync();

        // Guardar historial solo si hubo cambios
        if (historial.Count > 0)
        {
            _context.HistorialCambios.AddRange(historial);
            await _context.SaveChangesAsync();
        }

        return NoContent(); // Retorna 204 si todo salió bien

    }


    [HttpPut("{id}/activo")]
    public async Task<IActionResult> CambiarActivo(int id, [FromBody] Boolean nuevoEstado)
    {
        var adquisicion = await _context.Adquisiciones.FindAsync(id);
        if (adquisicion == null)
        {
            return NotFound();
        }

        adquisicion.Activo = nuevoEstado;
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
