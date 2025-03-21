using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestionAdquisicionesAPI.Migrations
{
    /// <inheritdoc />
    public partial class MakeIdAutoIncrement : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Nombre",
                table: "Adquisiciones",
                newName: "ValorUni");

            migrationBuilder.RenameColumn(
                name: "Fecha",
                table: "Adquisiciones",
                newName: "ValorTot");

            migrationBuilder.AddColumn<bool>(
                name: "Activo",
                table: "Adquisiciones",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "Cantidad",
                table: "Adquisiciones",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaAdq",
                table: "Adquisiciones",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaMod",
                table: "Adquisiciones",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Tipo",
                table: "Adquisiciones",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Activo",
                table: "Adquisiciones");

            migrationBuilder.DropColumn(
                name: "Cantidad",
                table: "Adquisiciones");

            migrationBuilder.DropColumn(
                name: "FechaAdq",
                table: "Adquisiciones");

            migrationBuilder.DropColumn(
                name: "FechaMod",
                table: "Adquisiciones");

            migrationBuilder.DropColumn(
                name: "Tipo",
                table: "Adquisiciones");

            migrationBuilder.RenameColumn(
                name: "ValorUni",
                table: "Adquisiciones",
                newName: "Nombre");

            migrationBuilder.RenameColumn(
                name: "ValorTot",
                table: "Adquisiciones",
                newName: "Fecha");
        }
    }
}
