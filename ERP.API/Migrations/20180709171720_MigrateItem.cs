using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ERP.API.Migrations
{
    public partial class MigrateItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "AvgCost",
                table: "Items",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "QuantityOnHand",
                table: "Items",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "QuantityOrdered",
                table: "Items",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "UnitCost",
                table: "Items",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvgCost",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "QuantityOnHand",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "QuantityOrdered",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "UnitCost",
                table: "Items");
        }
    }
}
