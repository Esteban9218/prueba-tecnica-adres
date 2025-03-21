﻿// <auto-generated />
using System;
using GestionAdquisicionesAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace GestionAdquisicionesAPI.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20250320152447_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.3");

            modelBuilder.Entity("GestionAdquisicionesAPI.Models.Adquisicion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Fecha")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<decimal>("Presupuesto")
                        .HasColumnType("TEXT");

                    b.Property<string>("Proveedor")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Unidad")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Adquisiciones");
                });
#pragma warning restore 612, 618
        }
    }
}
