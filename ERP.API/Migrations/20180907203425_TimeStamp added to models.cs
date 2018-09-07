using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ERP.API.Migrations
{
    public partial class TimeStampaddedtomodels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "ItemSuppliers");

            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "Items");

            migrationBuilder.AddColumn<byte[]>(
                name: "Timestamp",
                table: "OrderItems",
                rowVersion: true,
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Timestamp",
                table: "ItemSuppliers",
                rowVersion: true,
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Timestamp",
                table: "Items",
                rowVersion: true,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Timestamp",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "Timestamp",
                table: "ItemSuppliers");

            migrationBuilder.DropColumn(
                name: "Timestamp",
                table: "Items");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "OrderItems",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "ItemSuppliers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "Items",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
