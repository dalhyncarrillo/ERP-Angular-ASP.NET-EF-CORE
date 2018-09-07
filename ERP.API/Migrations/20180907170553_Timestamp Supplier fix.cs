using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ERP.API.Migrations
{
    public partial class TimestampSupplierfix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "Suppliers");

            migrationBuilder.AddColumn<byte[]>(
                name: "Timestamp",
                table: "Suppliers",
                rowVersion: true,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Timestamp",
                table: "Suppliers");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "Suppliers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
