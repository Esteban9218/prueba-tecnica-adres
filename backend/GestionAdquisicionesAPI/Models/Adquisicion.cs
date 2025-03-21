using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Net.Http.Headers;

namespace GestionAdquisicionesAPI.Models
{
    public class Adquisicion
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] public int Id { get; set; }
        public required decimal Presupuesto { get; set; }
        public required string Unidad { get; set; }
        public required string Tipo { get; set; }
        public required decimal Cantidad { get; set; }
        public required decimal ValorUni { get; set; }
        public required decimal ValorTot { get; set; }
        public required string Proveedor { get; set; }
        public required DateTime? FechaAdq { get; set; }
        public DateTime? FechaMod { get; set; } = DateTime.UtcNow;
        public Boolean? Activo { get; set; } = true;
    }
}
