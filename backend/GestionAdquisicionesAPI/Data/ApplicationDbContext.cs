using Microsoft.EntityFrameworkCore;
using GestionAdquisicionesAPI.Models;

namespace GestionAdquisicionesAPI.Data 
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Adquisicion> Adquisiciones { get; set; }

        public DbSet<HistorialCambio> HistorialCambios { get; set; }

    }
}
