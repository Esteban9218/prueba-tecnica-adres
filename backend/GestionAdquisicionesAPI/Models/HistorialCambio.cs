using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Contracts;
using GestionAdquisicionesAPI.Models;

public class HistorialCambio
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
    public int Id { get; set; }
    [ForeignKey("Adquisicion")]
    public int AdqId { get; set; }
    public required string Usuario { get; set; }
    public required string Campo { get; set; }
    public required string Anterior { get; set; }
    public required string Nuevo { get; set; }
    public DateTime Fecha { get; set; } = DateTime.Now;
    // Relación con Adquisicion
    public virtual Adquisicion? Adquisicion { get; set; }
}
